import uuid
from datetime import date as date_type
from typing import List, Optional
from sqlalchemy.orm import Session

from models.match import Match, PlayingXI
from schemas.match import MatchCreate, PlayingXIRequest


def get_all_matches(db: Session) -> List[Match]:
    return db.query(Match).order_by(Match.match_date, Match.match_time).all()


def get_upcoming_matches(db: Session) -> List[Match]:
    today = date_type.today()
    return (
        db.query(Match)
        .filter(Match.match_date >= today, Match.status == "upcoming")
        .order_by(Match.match_date, Match.match_time)
        .all()
    )


def get_match_by_id(db: Session, match_id: str) -> Optional[Match]:
    return db.query(Match).filter(Match.id == match_id).first()


def create_match(db: Session, payload: MatchCreate) -> Match:
    match = Match(
        id=str(uuid.uuid4()),
        team_a_id=payload.team_a_id,
        team_b_id=payload.team_b_id,
        venue_id=payload.venue_id,
        match_date=payload.match_date,
        match_time=payload.match_time,
        match_type=payload.match_type,
        day_night=payload.day_night,
        status="upcoming",
    )
    db.add(match)
    db.commit()
    db.refresh(match)
    return match


def get_playing_xi(db: Session, match_id: str) -> List[PlayingXI]:
    return db.query(PlayingXI).filter(PlayingXI.match_id == match_id).all()


def set_playing_xi(db: Session, match_id: str, payload: PlayingXIRequest) -> List[PlayingXI]:
    """Replaces any existing Playing XI rows for this match with the submitted selections.

    Caller is responsible for validating that each player belongs to the
    claimed team (see player_service.players_belong_to_team) before calling
    this — this function assumes the submission has already passed validation.
    """
    db.query(PlayingXI).filter(PlayingXI.match_id == match_id).delete()

    entries: List[PlayingXI] = []
    for submission in (payload.team_a, payload.team_b):
        for player_id in submission.player_ids:
            entry = PlayingXI(
                id=str(uuid.uuid4()),
                match_id=match_id,
                team_id=submission.team_id,
                player_id=player_id,
            )
            db.add(entry)
            entries.append(entry)

    db.commit()
    return entries
