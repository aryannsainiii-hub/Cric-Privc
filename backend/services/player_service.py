from typing import List, Optional
from sqlalchemy.orm import Session

from models.player import Player


def get_all_players(db: Session, role: Optional[str] = None, team_id: Optional[str] = None) -> List[Player]:
    query = db.query(Player)
    if role:
        query = query.filter(Player.role == role)
    if team_id:
        query = query.filter(Player.team_id == team_id)
    return query.order_by(Player.name).all()


def get_player_by_id(db: Session, player_id: str) -> Optional[Player]:
    return db.query(Player).filter(Player.id == player_id).first()


def get_players_by_team(db: Session, team_id: str) -> List[Player]:
    return db.query(Player).filter(Player.team_id == team_id).order_by(Player.name).all()


def players_belong_to_team(db: Session, player_ids: List[str], team_id: str) -> bool:
    count = db.query(Player).filter(Player.team_id == team_id, Player.id.in_(player_ids)).count()
    return count == len(set(player_ids))
