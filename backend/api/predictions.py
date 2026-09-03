from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.connection import get_db
from schemas.common import ApiResponse
from schemas.prediction import PredictionRequest, PredictionResponse
from services import team_service, venue_service, prediction_service

router = APIRouter(prefix="/api/predictions", tags=["Predictions"])


@router.post(
    "/match",
    response_model=ApiResponse[PredictionResponse],
    summary="Generate a demonstration prediction for a match",
    description=(
        "Returns a clearly labelled DEMONSTRATION prediction computed from deterministic "
        "backend logic. This is not a machine learning prediction — that arrives in Phase 4."
    ),
)
def generate_match_prediction(payload: PredictionRequest, db: Session = Depends(get_db)):
    team_a = team_service.get_team_by_id(db, payload.team_a_id)
    if not team_a:
        raise HTTPException(status_code=422, detail=f"team_a_id '{payload.team_a_id}' is not a valid team")

    team_b = team_service.get_team_by_id(db, payload.team_b_id)
    if not team_b:
        raise HTTPException(status_code=422, detail=f"team_b_id '{payload.team_b_id}' is not a valid team")

    venue = venue_service.get_venue_by_id(db, payload.venue_id)
    if not venue:
        raise HTTPException(status_code=422, detail=f"venue_id '{payload.venue_id}' is not a valid venue")

    result = prediction_service.generate_prediction(db, payload, venue, team_a, team_b)
    return ApiResponse(data=result, message="Demonstration prediction generated successfully")
