"""
One-shot database setup script.

Usage (from the backend/ directory, with DATABASE_URL configured in .env):

    python -m scripts.initialize_database

Creates all tables (if they don't already exist) and seeds them with the
initial IPL teams, players, venues and matches.
"""
import sys
from pathlib import Path

# Allow running as `python scripts/initialize_database.py` from backend/.
sys.path.append(str(Path(__file__).resolve().parent.parent))

from database.connection import Base, engine, SessionLocal
from database.seed import run_seed
import models  # noqa: F401  (ensures all models are registered on Base.metadata)


def main() -> None:
    print("Creating tables (if they do not already exist)...")
    Base.metadata.create_all(bind=engine)

    print("Seeding database...")
    db = SessionLocal()
    try:
        counts = run_seed(db)
    finally:
        db.close()

    print("Done. Seeded:")
    for key, value in counts.items():
        print(f"  {key}: {value}")


if __name__ == "__main__":
    main()
