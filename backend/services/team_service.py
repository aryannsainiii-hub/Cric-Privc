from typing import List, Optional
from sqlalchemy.orm import Session

from models.team import Team


def get_all_teams(db: Session) -> List[Team]:
    return db.query(Team).order_by(Team.name).all()


def get_team_by_id(db: Session, team_id: str) -> Optional[Team]:
    return db.query(Team).filter(Team.id == team_id).first()


def team_exists(db: Session, team_id: str) -> bool:
    return get_team_by_id(db, team_id) is not None
