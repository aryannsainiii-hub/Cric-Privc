from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class VenueBase(BaseModel):
    id: str
    name: str
    city: str
    state: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

    average_first_innings_score: int = Field(ge=0)
    average_second_innings_score: int = Field(ge=0)

    batting_index: int = Field(ge=0, le=100)
    pace_index: int = Field(ge=0, le=100)
    spin_index: int = Field(ge=0, le=100)
    chasing_advantage: int = Field(ge=0, le=100)


class VenueCreate(VenueBase):
    pass


class VenueOut(VenueBase):
    model_config = ConfigDict(from_attributes=True)

    created_at: datetime
