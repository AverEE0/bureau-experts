"""Pydantic schemas for API."""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ClientBase(BaseModel):
    name: str
    type: str = "Физ. лицо"
    inn: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    status: str = "Новый"
    segment: Optional[str] = None
    manager: Optional[str] = None


class ClientCreate(ClientBase):
    pass


class ClientUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    inn: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    status: Optional[str] = None
    segment: Optional[str] = None
    manager: Optional[str] = None


class ClientResponse(ClientBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class DealBase(BaseModel):
    client_name: str
    stage: str
    sum_rub: Optional[float] = None
    date: Optional[str] = None
    client_id: Optional[int] = None


class DealCreate(DealBase):
    pass


class DealUpdate(BaseModel):
    client_name: Optional[str] = None
    stage: Optional[str] = None
    sum_rub: Optional[float] = None
    date: Optional[str] = None
    client_id: Optional[int] = None


class DealResponse(DealBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class DocumentBase(BaseModel):
    name: str
    doc_type: str = "Договор"
    note: Optional[str] = None


class DocumentResponse(DocumentBase):
    id: int
    file_path: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
