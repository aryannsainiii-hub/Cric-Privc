import uuid

from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database.connection import Base


def _uuid() -> str:
    return str(uuid.uuid4())


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(String, primary_key=True, default=_uuid, index=True)
    match_id = Column(String, ForeignKey("matches.id", ondelete="CASCADE"), nullable=False, unique=True, index=True)

    team_a_probability = Column(Integer, nullable=False)
    team_b_probability = Column(Integer, nullable=False)
    confidence_score = Column(Integer, nullable=False)

    predicted_winner_id = Column(String, ForeignKey("teams.id"), nullable=True)

    # Always "demonstration" until Phase 4 introduces a trained ML model.
    prediction_type = Column(String, nullable=False, default="demonstration")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    match = relationship("Match", back_populates="prediction")
