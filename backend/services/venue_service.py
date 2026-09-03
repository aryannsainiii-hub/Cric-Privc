from typing import List, Optional
from sqlalchemy.orm import Session

from models.venue import Venue


def get_all_venues(db: Session) -> List[Venue]:
    return db.query(Venue).order_by(Venue.name).all()


def get_venue_by_id(db: Session, venue_id: str) -> Optional[Venue]:
    return db.query(Venue).filter(Venue.id == venue_id).first()
