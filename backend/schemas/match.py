from datetime import date, time, datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, field_validator, model_validator


class MatchBase(BaseModel):
    team_a_id: str
    team_b_id: str
    venue_id: str
    match_date: date
    match_time: time
    match_type: str = "IPL League Match"
    day_night: str = "Night"

    @model_validator(mode="after")
    def teams_must_differ(self):
        if self.team_a_id == self.team_b_id:
            raise ValueError("team_a_id and team_b_id must be different teams")
        return self

    @field_validator("day_night")
    @classmethod
    def validate_day_night(cls, v: str) -> str:
        allowed = {"Day", "Night", "Day/Night"}
        if v not in allowed:
            raise ValueError(f"day_night must be one of {allowed}")
        return v


class MatchCreate(MatchBase):
    pass


class MatchOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    team_a_id: str
    team_b_id: str
    venue_id: str
    match_date: date
    match_time: time
    match_type: str
    day_night: str
    toss_winner_id: Optional[str] = None
    toss_decision: Optional[str] = None
    winner_id: Optional[str] = None
    status: str
    created_at: datetime


class PlayingXISubmission(BaseModel):
    team_id: str
    player_ids: List[str]

    @field_validator("player_ids")
    @classmethod
    def exactly_eleven(cls, v: List[str]) -> List[str]:
        if len(v) != 11:
            raise ValueError("player_ids must contain exactly 11 players")
        if len(set(v)) != len(v):
            raise ValueError("player_ids must not contain duplicates")
        return v


class PlayingXIRequest(BaseModel):
    team_a: PlayingXISubmission
    team_b: PlayingXISubmission

    @model_validator(mode="after")
    def teams_must_differ(self):
        if self.team_a.team_id == self.team_b.team_id:
            raise ValueError("team_a and team_b must be different teams")
        return self


class PlayingXIEntryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    match_id: str
    team_id: str
    player_id: str


class PlayingXIOut(BaseModel):
    match_id: str
    team_a_id: str
    team_b_id: str
    team_a_player_ids: List[str]
    team_b_player_ids: List[str]
