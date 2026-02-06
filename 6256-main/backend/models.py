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
