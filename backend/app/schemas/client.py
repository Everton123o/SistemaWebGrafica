"""Client API schemas."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class ClientCreate(BaseModel):
    name: str = Field(min_length=1, max_length=150)
    cpf_cnpj: str = Field(min_length=11, max_length=18)
    phone: str = Field(min_length=1, max_length=30)
    email: str = Field(min_length=3, max_length=255)
    address: str = Field(min_length=1, max_length=255)
    user_id: Optional[int] = None


class ClientRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: Optional[int]
    name: str
    cpf_cnpj: str
    phone: str
    email: str
    address: str
    created_at: datetime
