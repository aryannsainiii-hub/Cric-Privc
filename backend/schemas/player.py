from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class PlayerBase(BaseModel):
    id: str
    name: str
    team_id: str
    role: str
    batting_style: Optional[str] = None
    bowling_style: Optional[str] = None
    nationality: Optional[str] = None
    image_url: Optional[str] = None
    active_status: bool = True
    is_captain: bool = False
    is_wicketkeeper: bool = False
    form_score: Optional[int] = None
    impact_score: Optional[int] = None


class PlayerCreate(PlayerBase):
    pass


class PlayerOut(PlayerBase):
    model_config = ConfigDict(from_attributes=True)

    created_at: datetime
