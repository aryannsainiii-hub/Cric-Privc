import uuid

from sqlalchemy import Column, String, Date, Time, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database.connection import Base


def _uuid() -> str:
    return str(uuid.uuid4())


class Match(Base):
    __tablename__ = "matches"

    id = Column(String, primary_key=True, default=_uuid, index=True)
    team_a_id = Column(String, ForeignKey("teams.id"), nullable=False)
    team_b_id = Column(String, ForeignKey("teams.id"), nullable=False)
    venue_id = Column(String, ForeignKey("venues.id"), nullable=False)

    match_date = Column(Date, nullable=False)
    match_time = Column(Time, nullable=False)

    match_type = Column(String, nullable=False, default="IPL League Match")
    day_night = Column(String, nullable=False, default="Night")  # Day | Night | Day/Night

    toss_winner_id = Column(String, ForeignKey("teams.id"), nullable=True)
    toss_decision = Column(String, nullable=True)  # bat | bowl

    winner_id = Column(String, ForeignKey("teams.id"), nullable=True)
    status = Column(String, nullable=False, default="upcoming")  # upcoming | live | completed

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    team_a = relationship("Team", foreign_keys=[team_a_id], back_populates="matches_as_team_a")
    team_b = relationship("Team", foreign_keys=[team_b_id], back_populates="matches_as_team_b")
    venue = relationship("Venue", back_populates="matches")
    playing_xi_entries = relationship("PlayingXI", back_populates="match", cascade="all, delete-orphan")
    prediction = relationship("Prediction", back_populates="match", uselist=False, cascade="all, delete-orphan")


class PlayingXI(Base):
    __tablename__ = "playing_xi"
    __table_args__ = (UniqueConstraint("match_id", "player_id", name="uq_match_player"),)

    id = Column(String, primary_key=True, default=_uuid, index=True)
    match_id = Column(String, ForeignKey("matches.id", ondelete="CASCADE"), nullable=False, index=True)
    team_id = Column(String, ForeignKey("teams.id"), nullable=False)
    player_id = Column(String, ForeignKey("players.id"), nullable=False)

    match = relationship("Match", back_populates="playing_xi_entries")
