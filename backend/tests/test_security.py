from app.core.security import hash_password, verify_password


def test_password_hash_can_be_verified() -> None:
    password_hash = hash_password("senha-segura")

    assert password_hash != "senha-segura"
    assert verify_password("senha-segura", password_hash)
    assert not verify_password("senha-incorreta", password_hash)
