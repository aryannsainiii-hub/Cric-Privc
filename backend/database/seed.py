"""
Seeds the database with initial IPL data.

The values in seed_data.json were generated directly from the Phase 1
frontend's mock data (frontend/src/data/teams.ts, venues.ts, players.ts,
matches.ts) so that the backend starts out consistent with what the UI
already showed. Safe to re-run: existing rows are upserted, not duplicated.
"""
import json
from datetime import datetime
from pathlib import Path

from sqlalchemy.orm import Session

from models.team import Team
from models.player import Player
from models.venue import Venue
from models.match import Match

SEED_FILE = Path(__file__).parent / "seed_data.json"


def _load_seed_data() -> dict:
    with open(SEED_FILE, "r") as f:
        return json.load(f)


def seed_teams(db: Session, teams_data: list[dict]) -> None:
    for row in teams_data:
        existing = db.query(Team).filter(Team.id == row["id"]).first()
        if existing:
            for key, value in row.items():
                setattr(existing, key, value)
        else:
            db.add(Team(**row))
    db.commit()


def seed_venues(db: Session, venues_data: list[dict]) -> None:
    for row in venues_data:
        existing = db.query(Venue).filter(Venue.id == row["id"]).first()
        if existing:
            for key, value in row.items():
                setattr(existing, key, value)
        else:
            db.add(Venue(**row))
    db.commit()


def seed_players(db: Session, players_data: list[dict]) -> None:
    for row in players_data:
        existing = db.query(Player).filter(Player.id == row["id"]).first()
        if existing:
            for key, value in row.items():
                setattr(existing, key, value)
        else:
            db.add(Player(**row))
    db.commit()


def seed_matches(db: Session, matches_data: list[dict]) -> None:
    for row in matches_data:
        existing = db.query(Match).filter(Match.id == row["id"]).first()
        match_date = datetime.strptime(row["match_date"], "%Y-%m-%d").date()
        match_time = datetime.strptime(row["match_time"], "%H:%M").time()

        values = {
            "team_a_id": row["team_a_id"],
            "team_b_id": row["team_b_id"],
            "venue_id": row["venue_id"],
            "match_date": match_date,
            "match_time": match_time,
            "day_night": row["day_night"],
            "match_type": row["match_type"],
            "status": "upcoming",
        }
        if existing:
            for key, value in values.items():
                setattr(existing, key, value)
        else:
            db.add(Match(id=row["id"], **values))
    db.commit()


def run_seed(db: Session) -> dict:
    data = _load_seed_data()
    seed_teams(db, data["teams"])
    seed_venues(db, data["venues"])
    seed_players(db, data["players"])
    seed_matches(db, data["matches"])
    return {
        "teams": len(data["teams"]),
        "venues": len(data["venues"]),
        "players": len(data["players"]),
        "matches": len(data["matches"]),
    }
