"""Environment-based application settings."""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Settings loaded from environment variables and an optional .env file."""

    database_url: str | None = None
    jwt_secret: str | None = None
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 30

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @property
    def database_url_or_raise(self) -> str:
        """Return the database URL or fail with an actionable message."""
        if not self.database_url:
            raise RuntimeError(
                "DATABASE_URL não está configurada. "
                "Defina essa variável no ambiente ou no arquivo .env."
            )
        return self.database_url


@lru_cache
def get_settings() -> Settings:
    """Return the cached application settings."""
    return Settings()
