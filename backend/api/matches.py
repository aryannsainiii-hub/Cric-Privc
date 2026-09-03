from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.connection import get_db
from schemas.common import ApiResponse
from schemas.match import MatchCreate, MatchOut, PlayingXIRequest, PlayingXIOut
from services import match_service, team_service, venue_service, player_service

router = APIRouter(prefix="/api/matches", tags=["Matches"])


def _validate_match_refs(db: Session, team_a_id: str, team_b_id: str, venue_id: str) -> None:
    if not team_service.team_exists(db, team_a_id):
        raise HTTPException(status_code=422, detail=f"team_a_id '{team_a_id}' is not a valid team")
    if not team_service.team_exists(db, team_b_id):
        raise HTTPException(status_code=422, detail=f"team_b_id '{team_b_id}' is not a valid team")
    if not venue_service.get_venue_by_id(db, venue_id):
        raise HTTPException(status_code=422, detail=f"venue_id '{venue_id}' is not a valid venue")


@router.get("", response_model=ApiResponse[list[MatchOut]], summary="List all matches")
def list_matches(db: Session = Depends(get_db)):
    matches = match_service.get_all_matches(db)
    return ApiResponse(data=[MatchOut.model_validate(m) for m in matches], message="Matches retrieved successfully")


@router.get("/upcoming", response_model=ApiResponse[list[MatchOut]], summary="List upcoming matches")
def list_upcoming_matches(db: Session = Depends(get_db)):
    matches = match_service.get_upcoming_matches(db)
    return ApiResponse(data=[MatchOut.model_validate(m) for m in matches], message="Upcoming matches retrieved successfully")


@router.get("/{match_id}", response_model=ApiResponse[MatchOut], summary="Get a single match by id")
def get_match(match_id: str, db: Session = Depends(get_db)):
    match = match_service.get_match_by_id(db, match_id)
    if not match:
        raise HTTPException(status_code=404, detail=f"Match '{match_id}' was not found")
    return ApiResponse(data=MatchOut.model_validate(match), message="Match retrieved successfully")


@router.post("", response_model=ApiResponse[MatchOut], status_code=201, summary="Create a match configuration")
def create_match(payload: MatchCreate, db: Session = Depends(get_db)):
    _validate_match_refs(db, payload.team_a_id, payload.team_b_id, payload.venue_id)
    match = match_service.create_match(db, payload)
    return ApiResponse(data=MatchOut.model_validate(match), message="Match created successfully")


@router.get("/{match_id}/playing-xi", response_model=ApiResponse[PlayingXIOut], summary="Get the Playing XI for a match")
def get_playing_xi(match_id: str, db: Session = Depends(get_db)):
    match = match_service.get_match_by_id(db, match_id)
    if not match:
        raise HTTPException(status_code=404, detail=f"Match '{match_id}' was not found")

    entries = match_service.get_playing_xi(db, match_id)
    team_a_ids = [e.player_id for e in entries if e.team_id == match.team_a_id]
    team_b_ids = [e.player_id for e in entries if e.team_id == match.team_b_id]

    return ApiResponse(
        data=PlayingXIOut(
            match_id=match_id,
            team_a_id=match.team_a_id,
            team_b_id=match.team_b_id,
            team_a_player_ids=team_a_ids,
            team_b_player_ids=team_b_ids,
        ),
        message="Playing XI retrieved successfully",
    )


@router.post("/{match_id}/playing-xi", response_model=ApiResponse[PlayingXIOut], summary="Submit the Playing XI for a match")
def submit_playing_xi(match_id: str, payload: PlayingXIRequest, db: Session = Depends(get_db)):
    match = match_service.get_match_by_id(db, match_id)
    if not match:
        raise HTTPException(status_code=404, detail=f"Match '{match_id}' was not found")

    valid_team_ids = {match.team_a_id, match.team_b_id}
    if payload.team_a.team_id not in valid_team_ids or payload.team_b.team_id not in valid_team_ids:
        raise HTTPException(status_code=422, detail="team_id in submission does not match this match's teams")

    for submission in (payload.team_a, payload.team_b):
        if not player_service.players_belong_to_team(db, submission.player_ids, submission.team_id):
            raise HTTPException(
                status_code=422,
                detail=f"One or more player_ids do not belong to team '{submission.team_id}'",
            )

    match_service.set_playing_xi(db, match_id, payload)
    entries = match_service.get_playing_xi(db, match_id)
    team_a_ids = [e.player_id for e in entries if e.team_id == match.team_a_id]
    team_b_ids = [e.player_id for e in entries if e.team_id == match.team_b_id]

    return ApiResponse(
        data=PlayingXIOut(
            match_id=match_id,
            team_a_id=match.team_a_id,
            team_b_id=match.team_b_id,
            team_a_player_ids=team_a_ids,
            team_b_player_ids=team_b_ids,
        ),
        message="Playing XI saved successfully",
    )
