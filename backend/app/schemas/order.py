"""Order API contracts."""

from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class OrderWrite(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    clientName: str = Field(alias="client_name")
    clientEmail: str = Field(default="", alias="client_email")
    clientPhone: str = Field(default="", alias="client_phone")
    clientCompany: str | None = Field(default=None, alias="client_company")
    serviceId: int | None = Field(default=None, alias="service_id")
    serviceName: str = Field(alias="service_name")
    status: str = "EM_ANALISE"
    deadline: str | None = None
    totalValue: float = Field(default=0.0, alias="total_value")
    specs: dict = Field(default_factory=dict)
    timeline: list = Field(default_factory=list)
    artVersions: list = Field(default_factory=list, alias="art_versions")
    quotation: dict = Field(default_factory=dict)
    observations: str = ""
    productionStage: str | None = Field(default=None, alias="production_stage")

    def to_model_dict(self) -> dict:
        return {
            "client_name": self.clientName,
            "client_email": self.clientEmail,
            "client_phone": self.clientPhone,
            "client_company": self.clientCompany,
            "service_id": self.serviceId,
            "service_name": self.serviceName,
            "status": self.status,
            "deadline": self.deadline,
            "total_value": self.totalValue,
            "specs": self.specs,
            "timeline": self.timeline,
            "art_versions": self.artVersions,
            "quotation": self.quotation,
            "observations": self.observations,
            "production_stage": self.productionStage,
        }


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
        data["clientName"] = data.pop("client_name")
        data["clientEmail"] = data.pop("client_email")
        data["clientPhone"] = data.pop("client_phone")
        data["clientCompany"] = data.pop("client_company")
        data["serviceId"] = data.pop("service_id")
        data["serviceName"] = data.pop("service_name")
        data["totalValue"] = data.pop("total_value")
        data["artVersions"] = data.pop("art_versions")
        data["productionStage"] = data.pop("production_stage")
        data["createdAt"] = data.pop("created_at")
        data["updatedAt"] = data.pop("updated_at")
        return data

