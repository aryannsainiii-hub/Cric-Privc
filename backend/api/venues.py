from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.connection import get_db
from schemas.common import ApiResponse
from schemas.venue import VenueOut
from services import venue_service

router = APIRouter(prefix="/api/venues", tags=["Venues"])


@router.get("", response_model=ApiResponse[list[VenueOut]], summary="List all venues")
def list_venues(db: Session = Depends(get_db)):
    venues = venue_service.get_all_venues(db)
    return ApiResponse(data=[VenueOut.model_validate(v) for v in venues], message="Venues retrieved successfully")


@router.get("/{venue_id}", response_model=ApiResponse[VenueOut], summary="Get a single venue by id")
def get_venue(venue_id: str, db: Session = Depends(get_db)):
    venue = venue_service.get_venue_by_id(db, venue_id)
    if not venue:
        raise HTTPException(status_code=404, detail=f"Venue '{venue_id}' was not found")
    return ApiResponse(data=VenueOut.model_validate(venue), message="Venue retrieved successfully")
