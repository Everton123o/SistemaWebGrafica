"""Create the first administrator safely and idempotently.

Run from the backend directory with:
    python -m scripts.create_initial_admin
"""

from getpass import getpass
import os

from sqlalchemy import select

from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models.user import User


def create_initial_admin(
    email: str = "admin@grafica.com",
    name: str = "Administrador Geral",
    password: str | None = None,
) -> bool:
    """Create an active admin when its email is not already registered."""
    if SessionLocal is None:
        raise RuntimeError("DATABASE_URL não está configurada.")

    email = email.strip().lower()
    if not email:
        raise ValueError("O e-mail do administrador é obrigatório.")

    supplied_password = password is not None
    password = password or getpass("Senha do administrador: ")
    confirmation = password if supplied_password else getpass("Confirme a senha: ")
    if not password or password != confirmation:
        raise ValueError("As senhas não coincidem ou estão vazias.")
    if len(password) < 8:
        raise ValueError("A senha deve ter pelo menos 8 caracteres.")

    with SessionLocal() as db:
        exists = db.scalar(select(User).where(User.email == email))
        if exists:
            print("Admin já existe; nenhuma alteração foi feita.")
            return False

        admin = User(
            name=name.strip() or "Administrador Geral",
            email=email,
            password_hash=hash_password(password),
            role="admin",
            is_active=True,
        )
        db.add(admin)
        db.commit()

    print(f"Administrador criado com sucesso: {email}")
    return True


if __name__ == "__main__":
    # Environment variables make this usable in CI, while interactive use
    # keeps the password out of shell history and source control.
    create_initial_admin(
        email=os.getenv("INITIAL_ADMIN_EMAIL", "admin@grafica.com"),
        name=os.getenv("INITIAL_ADMIN_NAME", "Administrador Geral"),
        password=os.getenv("INITIAL_ADMIN_PASSWORD"),
    )
