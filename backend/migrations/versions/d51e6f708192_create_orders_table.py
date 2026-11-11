"""Create orders table for full persistence.

Revision ID: d51e6f708192
Revises: c41d5e6f7081
Create Date: 2026-11-11
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.engine.reflection import Inspector

revision = "d51e6f708192"
down_revision = "c41d5e6f7081"
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()
    inspector = Inspector.from_engine(conn)
    tables = inspector.get_table_names()

    if "orders" not in tables:
        op.create_table(
            "orders",
            sa.Column("id", sa.Integer(), nullable=False, primary_key=True),
            sa.Column("code", sa.String(length=50), nullable=False, unique=True),
            sa.Column("client_id", sa.Integer(), nullable=True),
            sa.Column("client_name", sa.String(length=150), nullable=False),
            sa.Column("client_email", sa.String(length=255), nullable=False, server_default=""),
            sa.Column("client_phone", sa.String(length=30), nullable=False, server_default=""),
            sa.Column("client_company", sa.String(length=150), nullable=True),
            sa.Column("service_id", sa.Integer(), nullable=True),
            sa.Column("service_name", sa.String(length=150), nullable=False),
            sa.Column("status", sa.String(length=50), nullable=False, server_default="EM_ANALISE"),
            sa.Column("deadline", sa.String(length=50), nullable=True),
            sa.Column("total_value", sa.Float(), nullable=False, server_default="0"),
            sa.Column("specs", sa.JSON(), nullable=False),
            sa.Column("timeline", sa.JSON(), nullable=False),
            sa.Column("art_versions", sa.JSON(), nullable=False),
            sa.Column("quotation", sa.JSON(), nullable=False),
            sa.Column("observations", sa.String(length=1000), nullable=False, server_default=""),
            sa.Column("production_stage", sa.String(length=100), nullable=True),
            sa.Column("created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False),
            sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
        )
        op.create_index("ix_orders_code", "orders", ["code"], unique=True)


def downgrade():
    conn = op.get_bind()
    inspector = Inspector.from_engine(conn)
    tables = inspector.get_table_names()
    if "orders" in tables:
        op.drop_table("orders")

