"""Client API schemas."""

from datetime import datetime
from typing import Optional, Any
import re

from pydantic import BaseModel, ConfigDict, Field, field_validator


class ClientCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")
    name: str = Field(min_length=1, max_length=150)
    cpf_cnpj: str = Field(min_length=11, max_length=18)
    phone: str = Field(min_length=1, max_length=30)
    email: str = Field(min_length=3, max_length=255)
    address: str = Field(min_length=1, max_length=255)

    @field_validator("email")
    @classmethod
    def valid_email(cls, value):
        value = value.strip().lower()
        if not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", value):
            raise ValueError("E-mail inválido.")
        return value

    @field_validator("cpf_cnpj")
    @classmethod
    def valid_document(cls, value):
        digits = re.sub(r"\D", "", value)
        if len(digits) not in (11, 14) or len(set(digits)) == 1:
            raise ValueError("CPF/CNPJ inválido.")
        sizes = (9, 10) if len(digits) == 11 else (12, 13)
        for size in sizes:
            weights = list(range(size + 1, 1, -1)) if len(digits) == 11 else [((size - i - 1) % 8) + 2 for i in range(size)]
            total = sum(int(digits[i]) * weights[i] for i in range(size))
            check = ((total * 10) % 11) % 10 if len(digits) == 11 else (0 if total % 11 < 2 else 11 - total % 11)
            if check != int(digits[size]):
                raise ValueError("CPF/CNPJ inválido.")
        return digits



class ClientRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: Optional[int]
    name: str
    cpf_cnpj: str
    phone: str
    email: str
    address: str
    registration_details: Optional[dict[str, Any]] = None
    created_at: datetime
