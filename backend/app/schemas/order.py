"""Closed contracts for customer order creation and role-specific updates."""

from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class OrderCreate(BaseModel):
    model_config = ConfigDict(extra="forbid", populate_by_name=True)
    service_id: int = Field(gt=0)
    specs: dict[str, str | int | float] = Field(default_factory=dict)
    observations: str = Field(default="", max_length=1000)


class OrderClientUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")
    observations: str | None = Field(default=None, max_length=1000)
    art_versions: list[dict] | None = None


class OrderStaffUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")
    status: str | None = Field(default=None, max_length=50)
    production_stage: str | None = Field(default=None, max_length=100)
    timeline: list[dict] | None = None
    quotation: dict | None = None
    total_value: float | None = Field(default=None, ge=0)
    deadline: str | None = Field(default=None, max_length=50)


class OrderRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    code: str
    client_name: str
    client_email: str
    client_phone: str
    client_company: str | None
    service_id: int | None
    service_name: str
    status: str
    deadline: str | None
    total_value: float
    specs: dict
    timeline: list
    art_versions: list
    quotation: dict
    observations: str
    production_stage: str | None
    created_at: datetime
    updated_at: datetime

    @classmethod
    def from_order(cls, order):
        data = cls.model_validate(order).model_dump()
        for snake, camel in {
            "client_name": "clientName", "client_email": "clientEmail",
            "client_phone": "clientPhone", "client_company": "clientCompany",
            "service_id": "serviceId", "service_name": "serviceName",
            "total_value": "totalValue", "art_versions": "artVersions",
            "production_stage": "productionStage", "created_at": "createdAt",
            "updated_at": "updatedAt",
        }.items():
            data[camel] = data.pop(snake)
        return data
