"""Add per-user token version for server-side session revocation."""
from alembic import op
import sqlalchemy as sa

revision = "a51b6c7d8e9f"
down_revision = "f41a5b6c7d8e"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("users", sa.Column("token_version", sa.Integer(), nullable=False, server_default="0"))


def downgrade():
    op.drop_column("users", "token_version")
