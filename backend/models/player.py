from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database.connection import Base


class Player(Base):
    __tablename__ = "players"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    team_id = Column(String, ForeignKey("teams.id", ondelete="CASCADE"), nullable=False, index=True)
    role = Column(String, nullable=False)  # Batter | Bowler | All-rounder | Wicketkeeper
    batting_style = Column(String, nullable=True)
    bowling_style = Column(String, nullable=True)
    nationality = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    active_status = Column(Boolean, nullable=False, default=True)
    is_captain = Column(Boolean, nullable=False, default=False)
    is_wicketkeeper = Column(Boolean, nullable=False, default=False)
    form_score = Column(Integer, nullable=True)
    impact_score = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    team = relationship("Team", back_populates="players")
