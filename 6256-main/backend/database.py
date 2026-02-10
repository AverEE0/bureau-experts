"""SQLite database and session."""
import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SQLITE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'bureau.db')}"

engine = create_engine(SQLITE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def _ensure_document_columns():
    """Добавить новые колонки в documents для существующих БД (SQLite)."""
    adds = [
        ("documents", "client_id", "INTEGER"),
        ("documents", "deal_id", "INTEGER"),
        ("documents", "retention_years", "INTEGER"),
        ("documents", "ocr_text", "TEXT"),
    ]
    with engine.connect() as conn:
        for table, col, ctype in adds:
            try:
                conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {col} {ctype}"))
                conn.commit()
            except Exception:
                conn.rollback()


def _ensure_deal_columns():
    """Добавить колонки реестра в deals для существующих БД (SQLite)."""
    adds = [
        ("deals", "number", "TEXT"),
        ("deals", "contacts", "TEXT"),
        ("deals", "service_name", "TEXT"),
        ("deals", "object_address", "TEXT"),
        ("deals", "inspection", "TEXT"),
        ("deals", "court_assigned", "TEXT"),
        ("deals", "petition", "TEXT"),
    ]
    with engine.connect() as conn:
        for table, col, ctype in adds:
            try:
                conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {col} {ctype}"))
                conn.commit()
            except Exception:
                conn.rollback()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
