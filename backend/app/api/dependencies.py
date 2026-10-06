"""Shared API dependencies."""

from collections.abc import Generator

from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.database import get_db


def database_session() -> Generator[Session, None, None]:
    """Provide a database session to API handlers."""
    yield from get_db()


DatabaseSession = Depends(database_session)
