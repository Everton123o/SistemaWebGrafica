"""Authentication contracts; public registration cannot assign privileges."""
import re
from datetime import date
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

from app.schemas.user import UserRead


class LoginRequest(BaseModel):
    email: str = Field(min_length=3, max_length=255)
    password: str = Field(min_length=1, max_length=128)

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value):
        value = value.strip().lower()
        if not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", value):
            raise ValueError("E-mail inválido.")
        return value


class Address(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    cep: str = Field(pattern=r"^\d{5}-?\d{3}$")
    street: str = Field(min_length=1, max_length=120)
    number: str = Field(min_length=1, max_length=20)
    complement: str = Field(default="", max_length=60)
    district: str = Field(min_length=1, max_length=80)
    city: str = Field(min_length=1, max_length=100)
    state: Literal['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']


class RegisterRequest(LoginRequest):
    model_config = ConfigDict(extra="forbid")
    password: str = Field(min_length=8, max_length=128)
    name: str = Field(min_length=1, max_length=120)
    personType: Literal["PF", "PJ"]
    document: str = Field(max_length=18)
    company: str = Field(default="", max_length=150)
    birthDate: date | None = None
    phone: str = Field(default="", max_length=30)
    address: Address

    @field_validator("name", "company")
    @classmethod
    def strip_name(cls, value):
        return value.strip()

    @model_validator(mode="after")
    def validate_profile(self):
        digits = re.sub(r"\D", "", self.document)
        length = 11 if self.personType == "PF" else 14
        if len(digits) != length or len(set(digits)) == 1:
            raise ValueError("CPF/CNPJ inválido.")
        for size in ([9, 10] if length == 11 else [12, 13]):
            weights = list(range(size + 1, 1, -1)) if length == 11 else [((size - i - 1) % 8) + 2 for i in range(size)]
            total = sum(int(digits[i]) * weights[i] for i in range(size))
            check = ((total * 10) % 11) % 10 if length == 11 else (0 if total % 11 < 2 else 11 - total % 11)
            if check != int(digits[size]):
                raise ValueError("CPF/CNPJ inválido.")
        self.document = digits
        if not self.name or (self.personType == "PJ" and not self.company):
            raise ValueError("Informe nome e razão social quando aplicável.")
        if self.birthDate and self.birthDate > date.today():
            raise ValueError("Data de nascimento inválida.")
        if self.phone and len(re.sub(r"\D", "", self.phone)) not in (10, 11):
            raise ValueError("Celular inválido.")
        return self


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserRead
