from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from database.connection import get_db
from schemas.common import ApiResponse
from schemas.player import PlayerOut
from services import player_service, team_service

router = APIRouter(prefix="/api/players", tags=["Players"])
teams_nested_router = APIRouter(prefix="/api/teams", tags=["Players"])


@router.get("", response_model=ApiResponse[list[PlayerOut]], summary="List all players")
def list_players(
    role: Optional[str] = Query(None, description="Filter by role, e.g. Batter, Bowler, All-rounder, Wicketkeeper"),
    team_id: Optional[str] = Query(None, description="Filter by team id"),
    db: Session = Depends(get_db),
):
    players = player_service.get_all_players(db, role=role, team_id=team_id)
    return ApiResponse(data=[PlayerOut.model_validate(p) for p in players], message="Players retrieved successfully")


@router.get("/{player_id}", response_model=ApiResponse[PlayerOut], summary="Get a single player by id")
def get_player(player_id: str, db: Session = Depends(get_db)):
    player = player_service.get_player_by_id(db, player_id)
    if not player:
        raise HTTPException(status_code=404, detail=f"Player '{player_id}' was not found")
    return ApiResponse(data=PlayerOut.model_validate(player), message="Player retrieved successfully")


@teams_nested_router.get(
    "/{team_id}/players",
    response_model=ApiResponse[list[PlayerOut]],
    summary="List players belonging to a team",
)
def get_players_for_team(team_id: str, db: Session = Depends(get_db)):
    if not team_service.team_exists(db, team_id):
        raise HTTPException(status_code=404, detail=f"Team '{team_id}' was not found")
    players = player_service.get_players_by_team(db, team_id)
    return ApiResponse(data=[PlayerOut.model_validate(p) for p in players], message="Players retrieved successfully")
