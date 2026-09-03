"""
Deterministic, explainable "demonstration" prediction engine.

This mirrors the logic already shipped in the Phase 1 frontend
(frontend/src/data/predictions.ts) so that predictions computed here are
consistent with what users saw in Phase 1, while now living server-side.

IMPORTANT: this is NOT a machine learning model. Every prediction returned
by this service is clearly labelled prediction_status="demonstration".
Phase 4 will replace compute_win_probability() with a call into a trained
model service — the function signature and PredictionResponse contract are
designed to stay stable across that change.
"""
import uuid
from typing import Optional
from sqlalchemy.orm import Session

from models.team import Team
from models.venue import Venue
from models.player import Player
from models.prediction import Prediction
from schemas.prediction import PredictionRequest, PredictionResponse, KeyInsightOut


def _seed(*parts: str) -> int:
    return sum(ord(c) for c in "".join(parts))


def _jitter(seed: int, offset: int) -> int:
    return 60 + ((seed + offset) % 30)


def _team_strength_score(db: Session, team_id: str, venue: Venue, opponent_id: str) -> float:
    seed = _seed(team_id, venue.id, opponent_id)
    batting = _jitter(seed, 1)
    bowling = _jitter(seed, 7)

    xi_strength = _jitter(seed, 11)
    players = db.query(Player).filter(Player.team_id == team_id).all()
    if players:
        scored = [p.form_score for p in players if p.form_score is not None]
        recent_form = round(sum(scored) / len(scored)) if scored else 60
    else:
        recent_form = 60

    venue_record = round((venue.batting_index + venue.chasing_advantage) / 2)

    return (
        batting * 0.25
        + bowling * 0.25
        + recent_form * 0.20
        + venue_record * 0.15
        + xi_strength * 0.15
    )


def compute_win_probability(db: Session, team_a_id: str, team_b_id: str, venue: Venue):
    score_a = _team_strength_score(db, team_a_id, venue, team_b_id)
    score_b = _team_strength_score(db, team_b_id, venue, team_a_id)
    total = score_a + score_b

    team_a_probability = round((score_a / total) * 100)
    team_b_probability = 100 - team_a_probability
    spread = abs(team_a_probability - team_b_probability)
    confidence_score = min(96, 55 + round(spread * 0.9))

    return team_a_probability, team_b_probability, confidence_score


def build_insights(team_a: Team, team_b: Team, venue: Venue, team_a_probability: int) -> list[KeyInsightOut]:
    favoured = team_a if team_a_probability >= 50 else team_b
    chase_favoured = venue.chasing_advantage > 50

    return [
        KeyInsightOut(id="i1", text=f"Strong recent form favours {favoured.name}."),
        KeyInsightOut(
            id="i2",
            text=f"{venue.name} historically offers a slight edge to teams batting "
            f"{'second' if chase_favoured else 'first'}.",
        ),
        KeyInsightOut(
            id="i3",
            text=f"Conditions at {venue.city} could bring both pace and spin into play depending on the match phase.",
        ),
    ]


def generate_prediction(db: Session, payload: PredictionRequest, venue: Venue, team_a: Team, team_b: Team) -> PredictionResponse:
    team_a_probability, team_b_probability, confidence_score = compute_win_probability(
        db, payload.team_a_id, payload.team_b_id, venue
    )
    predicted_winner_id = payload.team_a_id if team_a_probability >= team_b_probability else payload.team_b_id
    insights = build_insights(team_a, team_b, venue, team_a_probability)

    response = PredictionResponse(
        match_id=payload.match_id,
        team_a_id=payload.team_a_id,
        team_b_id=payload.team_b_id,
        team_a_probability=team_a_probability,
        team_b_probability=team_b_probability,
        confidence_score=confidence_score,
        predicted_winner_id=predicted_winner_id,
        insights=insights,
    )

    # Persist only when this prediction is tied to a real match record.
    if payload.match_id:
        existing = db.query(Prediction).filter(Prediction.match_id == payload.match_id).first()
        if existing:
            existing.team_a_probability = team_a_probability
            existing.team_b_probability = team_b_probability
            existing.confidence_score = confidence_score
            existing.predicted_winner_id = predicted_winner_id
        else:
            db.add(
                Prediction(
                    id=str(uuid.uuid4()),
                    match_id=payload.match_id,
                    team_a_probability=team_a_probability,
                    team_b_probability=team_b_probability,
                    confidence_score=confidence_score,
                    predicted_winner_id=predicted_winner_id,
                    prediction_type="demonstration",
                )
            )
        db.commit()

    return response


def get_prediction_for_match(db: Session, match_id: str) -> Optional[Prediction]:
    return db.query(Prediction).filter(Prediction.match_id == match_id).first()
