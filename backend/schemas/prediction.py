from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, model_validator


class PlayingXIInput(BaseModel):
    team_id: str
    player_ids: List[str] = []


class PredictionRequest(BaseModel):
    match_id: Optional[str] = None
    team_a_id: str
    team_b_id: str
    venue_id: str
    playing_xi_a: Optional[PlayingXIInput] = None
    playing_xi_b: Optional[PlayingXIInput] = None

    @model_validator(mode="after")
    def teams_must_differ(self):
        if self.team_a_id == self.team_b_id:
            raise ValueError("team_a_id and team_b_id must be different teams")
        return self


class KeyInsightOut(BaseModel):
    id: str
    text: str


class PredictionResponse(BaseModel):
    prediction_status: str = "demonstration"
    match_id: Optional[str] = None
    team_a_id: str
    team_b_id: str
    team_a_probability: int
    team_b_probability: int
    confidence_score: int
    predicted_winner_id: str
    insights: List[KeyInsightOut] = []
    disclaimer: str = (
        "This is a demonstration prediction generated from deterministic mock logic. "
        "The machine learning model will be integrated in Phase 4."
    )


class PredictionOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    match_id: str
    team_a_probability: int
    team_b_probability: int
    confidence_score: int
    predicted_winner_id: Optional[str] = None
    prediction_type: str
    created_at: datetime
