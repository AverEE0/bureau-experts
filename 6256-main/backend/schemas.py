"""Pydantic schemas for API."""
from pydantic import BaseModel
from typing import Optional, List
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
    assignee_id: Optional[int] = None
    number: Optional[str] = None
    contacts: Optional[str] = None
    service_name: Optional[str] = None
    object_address: Optional[str] = None
    inspection: Optional[str] = None
    court_assigned: Optional[str] = None
    petition: Optional[str] = None


class DealCreate(DealBase):
    pass


class DealUpdate(BaseModel):
    client_name: Optional[str] = None
    stage: Optional[str] = None
    sum_rub: Optional[float] = None
    date: Optional[str] = None
    client_id: Optional[int] = None
    assignee_id: Optional[int] = None
    number: Optional[str] = None
    contacts: Optional[str] = None
    service_name: Optional[str] = None
    object_address: Optional[str] = None
    inspection: Optional[str] = None
    court_assigned: Optional[str] = None
    petition: Optional[str] = None


class DealResponse(DealBase):
    id: int
    created_at: Optional[datetime] = None
    assignee_name: Optional[str] = None

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
    client_id: Optional[int] = None
    deal_id: Optional[int] = None
    retention_years: Optional[int] = None
    ocr_text: Optional[str] = None

    class Config:
        from_attributes = True


class CommunicationBase(BaseModel):
    channel: str
    direction: str = "out"
    subject: Optional[str] = None
    body: Optional[str] = None


class CommunicationCreate(CommunicationBase):
    client_id: int


class CommunicationResponse(CommunicationBase):
    id: int
    client_id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ClientCardResponse(ClientResponse):
    deals: List[DealResponse] = []
    documents: List[DocumentResponse] = []
    communications: List[CommunicationResponse] = []


class UserBase(BaseModel):
    email: str
    role: str = "manager"
    full_name: Optional[str] = None


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    """Обновление роли и Ф.И.О. (только админ)."""
    role: Optional[str] = None
    full_name: Optional[str] = None


class UserResponse(UserBase):
    id: int
    is_active: int = 1
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    email: str
    password: str


class UserRegister(BaseModel):
    """Регистрация первого пользователя (только когда в БД 0 пользователей)."""
    email: str
    password: str
    full_name: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class NotificationCreate(BaseModel):
    user_id: int
    message: str


class NotificationResponse(BaseModel):
    id: int
    user_id: int
    message: str
    created_at: Optional[datetime] = None
    read_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class UserStatsResponse(BaseModel):
    user_id: int
    full_name: Optional[str] = None
    email: str
    deals_completed: int
    period_start: str
    period_end: str


class ChatMessageCreate(BaseModel):
    body: str


class ChatMessageResponse(BaseModel):
    id: int
    room_key: str
    sender_id: int
    sender_name: Optional[str] = None
    body: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ChatRoomResponse(BaseModel):
    id: str
    name: str
    type: str  # "general" | "dm"
    other_user_id: Optional[int] = None


class IntegrationConfigResponse(BaseModel):
    id: int
    key: str
    enabled: bool
    config_json: Optional[str] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
