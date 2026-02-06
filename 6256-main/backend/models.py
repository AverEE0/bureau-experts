"""SQLAlchemy models."""
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime

from database import Base


class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    type = Column(String(64), default="Физ. лицо")  # Физ. лицо / Юр. лицо
    inn = Column(String(32), nullable=True)
    phone = Column(String(64), nullable=True)
    email = Column(String(255), nullable=True)
    status = Column(String(64), default="Новый")
    segment = Column(String(64), nullable=True)
    manager = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    deals = relationship("Deal", back_populates="client", foreign_keys="Deal.client_id")
    communications = relationship("Communication", back_populates="client", order_by="Communication.created_at.desc()")


class Deal(Base):
    __tablename__ = "deals"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=True)
    client_name = Column(String(255), nullable=False)  # denormalized for list
    stage = Column(String(128), nullable=False)
    sum_rub = Column(Float, nullable=True)
    date = Column(String(32), nullable=True)  # YYYY-MM-DD
    created_at = Column(DateTime, default=datetime.utcnow)

    client = relationship("Client", back_populates="deals", foreign_keys=[client_id])


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    doc_type = Column(String(64), default="Договор")
    file_path = Column(String(512), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    note = Column(Text, nullable=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=True)
    deal_id = Column(Integer, ForeignKey("deals.id"), nullable=True)
    retention_years = Column(Integer, nullable=True)  # 3, 5, 10, 75 по ФЗ-125
    ocr_text = Column(Text, nullable=True)  # результат OCR


class Communication(Base):
    __tablename__ = "communications"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    channel = Column(String(64), nullable=False)  # Telegram, Email, Phone, etc.
    direction = Column(String(16), default="out")  # in / out
    subject = Column(String(255), nullable=True)
    body = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    client = relationship("Client", back_populates="communications", foreign_keys=[client_id])


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(64), default="manager")  # admin, manager, appraiser, expert, client
    full_name = Column(String(255), nullable=True)
    is_active = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.utcnow)


class IntegrationConfig(Base):
    __tablename__ = "integration_config"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(64), unique=True, nullable=False)  # fns, gas, rosreestr, ofd, edo, 1c, bank, telegram, ...
    enabled = Column(Integer, default=0)
    config_json = Column(Text, nullable=True)  # ключи, URL — хранить зашифрованно в проде
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)