from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database.connection import Base


class Team(Base):
    __tablename__ = "teams"

    id = Column(String, primary_key=True, index=True)  # e.g. "mi", "csk"
    name = Column(String, nullable=False)
    short_name = Column(String, nullable=False)
    primary_color = Column(String, nullable=False)
    secondary_color = Column(String, nullable=False)
    logo_url = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    players = relationship("Player", back_populates="team", cascade="all, delete-orphan")
    matches_as_team_a = relationship("Match", foreign_keys="Match.team_a_id", back_populates="team_a")
    matches_as_team_b = relationship("Match", foreign_keys="Match.team_b_id", back_populates="team_b")
