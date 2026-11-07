"""Service API contracts."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ServiceWrite(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    name: str = Field(min_length=1, max_length=150)
    category: str = Field(min_length=1, max_length=100)
    description: str = Field(default="", max_length=1000)
    priceFrom: float = Field(alias="price_from", default=0.0, ge=0)
    unit: str = Field(min_length=1, max_length=50)
    deliveryDays: int = Field(alias="delivery_days", default=1, ge=1)
    image: str = Field(default="", max_length=2048)
    requirements: dict = Field(default_factory=dict)
    popular: bool = False
    inactive: bool = False
    badge: str | None = Field(default=None, max_length=80)

    def to_model_dict(self) -> dict:
        """Dump data formatted directly for the SQLAlchemy Service model."""
        return {
            "name": self.name,
            "category": self.category,
            "description": self.description,
            "price_from": self.priceFrom,
            "unit": self.unit,
            "delivery_days": self.deliveryDays,
            "image": self.image,
            "requirements": self.requirements,
            "popular": self.popular,
            "inactive": self.inactive,
            "badge": self.badge,
        }


class ServiceRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str
    category: str
    description: str
    price_from: float
    unit: str
    delivery_days: int
    image: str
    requirements: dict
    rating: float
    review_count: int
    badge: str | None
    popular: bool
    inactive: bool
    created_at: datetime
    updated_at: datetime

    @classmethod
    def from_service(cls, service):
        data = cls.model_validate(service).model_dump()
        data["priceFrom"] = data.pop("price_from")
        data["deliveryDays"] = data.pop("delivery_days")
        data["reviewCount"] = data.pop("review_count")
        data["createdAt"] = data.pop("created_at")
        data["updatedAt"] = data.pop("updated_at")
        return data
