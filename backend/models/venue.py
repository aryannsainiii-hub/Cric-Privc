from sqlalchemy import Column, String, Float, Integer, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database.connection import Base


class Venue(Base):
    __tablename__ = "venues"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    average_first_innings_score = Column(Integer, nullable=False, default=0)
    average_second_innings_score = Column(Integer, nullable=False, default=0)

    batting_index = Column(Integer, nullable=False, default=50)  # 0-100
    pace_index = Column(Integer, nullable=False, default=50)
    spin_index = Column(Integer, nullable=False, default=50)
    chasing_advantage = Column(Integer, nullable=False, default=50)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    matches = relationship("Match", back_populates="venue")
