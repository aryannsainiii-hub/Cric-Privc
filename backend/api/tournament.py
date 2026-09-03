"""
Tournament standings and championship odds.

No dedicated database table exists for these yet (Phase 2 scope only covers
teams/players/venues/matches/predictions per the spec). This module returns
clearly labelled demonstration data derived from the same shape the Phase 1
frontend already used, so the frontend's Tournament pages can optionally
switch to fetching from here without a visual change. A `points_table` table
can be introduced in a later phase without altering this response contract.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.connection import get_db
from schemas.common import ApiResponse
from services import team_service

router = APIRouter(prefix="/api/tournament", tags=["Tournament"])

_DEMO_STANDINGS = [
    {"team_id": "kkr", "played": 12, "won": 8, "lost": 3, "nrr": 1.25, "points": 17, "playoff_probability": 92},
    {"team_id": "rr", "played": 12, "won": 8, "lost": 4, "nrr": 0.62, "points": 16, "playoff_probability": 78},
    {"team_id": "csk", "played": 12, "won": 7, "lost": 5, "nrr": 0.35, "points": 15, "playoff_probability": 65},
    {"team_id": "srh", "played": 12, "won": 7, "lost": 5, "nrr": -0.10, "points": 14, "playoff_probability": 48},
    {"team_id": "mi", "played": 12, "won": 6, "lost": 6, "nrr": -0.10, "points": 12, "playoff_probability": 30},
    {"team_id": "gt", "played": 12, "won": 6, "lost": 6, "nrr": -0.22, "points": 12, "playoff_probability": 27},
    {"team_id": "rcb", "played": 12, "won": 5, "lost": 7, "nrr": -0.30, "points": 10, "playoff_probability": 14},
    {"team_id": "lsg", "played": 12, "won": 5, "lost": 7, "nrr": -0.45, "points": 10, "playoff_probability": 11},
    {"team_id": "dc", "played": 12, "won": 4, "lost": 8, "nrr": -0.55, "points": 8, "playoff_probability": 4},
    {"team_id": "pbks", "played": 12, "won": 3, "lost": 9, "nrr": -0.70, "points": 6, "playoff_probability": 1},
]

_DEMO_CHAMPIONSHIP_ODDS = [
    {"team_id": "kkr", "probability": 26},
    {"team_id": "csk", "probability": 22},
    {"team_id": "rcb", "probability": 18},
    {"team_id": "rr", "probability": 15},
    {"team_id": "srh", "probability": 8},
    {"team_id": "mi", "probability": 6},
    {"team_id": "gt", "probability": 3},
    {"team_id": "lsg", "probability": 1},
    {"team_id": "dc", "probability": 0.6},
    {"team_id": "pbks", "probability": 0.4},
]


@router.get("/points-table", summary="Get the demonstration IPL points table")
def get_points_table(db: Session = Depends(get_db)):
    known_team_ids = {t.id for t in team_service.get_all_teams(db)}
    rows = [row for row in _DEMO_STANDINGS if row["team_id"] in known_team_ids] or _DEMO_STANDINGS
    return ApiResponse(data=rows, message="Demonstration points table retrieved successfully")


@router.get("/championship-odds", summary="Get the demonstration championship odds")
def get_championship_odds(db: Session = Depends(get_db)):
    known_team_ids = {t.id for t in team_service.get_all_teams(db)}
    rows = [row for row in _DEMO_CHAMPIONSHIP_ODDS if row["team_id"] in known_team_ids] or _DEMO_CHAMPIONSHIP_ODDS
    return ApiResponse(data=rows, message="Demonstration championship odds retrieved successfully")
