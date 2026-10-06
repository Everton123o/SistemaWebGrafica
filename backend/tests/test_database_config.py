import pytest

from app.core.config import Settings


def test_database_url_is_required_when_requested() -> None:
    settings = Settings(database_url=None)

    with pytest.raises(RuntimeError, match="DATABASE_URL"):
        settings.database_url_or_raise


def test_database_url_is_returned_when_configured() -> None:
    database_url = "mysql+pymysql://user:password@localhost:3306/grafica"
    settings = Settings(database_url=database_url)

    assert settings.database_url_or_raise == database_url
