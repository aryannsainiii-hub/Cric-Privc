from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.connection import get_db
from schemas.common import ApiResponse
from schemas.team import TeamOut
from services import team_service

router = APIRouter(prefix="/api/teams", tags=["Teams"])


@router.get("", response_model=ApiResponse[list[TeamOut]], summary="List all IPL teams")
def list_teams(db: Session = Depends(get_db)):
    teams = team_service.get_all_teams(db)
    return ApiResponse(data=[TeamOut.model_validate(t) for t in teams], message="Teams retrieved successfully")


@router.get("/{team_id}", response_model=ApiResponse[TeamOut], summary="Get a single team by id")
def get_team(team_id: str, db: Session = Depends(get_db)):
    team = team_service.get_team_by_id(db, team_id)
    if not team:
        raise HTTPException(status_code=404, detail=f"Team '{team_id}' was not found")
    return ApiResponse(data=TeamOut.model_validate(team), message="Team retrieved successfully")
