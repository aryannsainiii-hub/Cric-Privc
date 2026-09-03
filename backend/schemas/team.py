from datetime import datetime
from pydantic import BaseModel, ConfigDict


class TeamBase(BaseModel):
    id: str
    name: str
    short_name: str
    primary_color: str
    secondary_color: str
    logo_url: str | None = None


class TeamCreate(TeamBase):
    pass


class TeamOut(TeamBase):
    model_config = ConfigDict(from_attributes=True)

    created_at: datetime
