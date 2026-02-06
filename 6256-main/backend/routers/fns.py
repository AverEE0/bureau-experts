"""ФНС: проверка ИНН/ОГРН (заглушка; реальный API — при наличии ключа)."""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/api/fns", tags=["fns"])


class FnsCheckRequest(BaseModel):
    inn: Optional[str] = None
    ogrn: Optional[str] = None


class FnsCheckResponse(BaseModel):
    valid: bool
    message: str
    name: Optional[str] = None
    address: Optional[str] = None


@router.post("/check", response_model=FnsCheckResponse)
def check_inn_ogrn(body: FnsCheckRequest):
    """Заглушка: проверка по ИНН/ОГРН. В проде — запрос к API ФНС."""
    inn = (body.inn or "").replace(" ", "")
    ogrn = (body.ogrn or "").replace(" ", "")
    if not inn and not ogrn:
        return FnsCheckResponse(valid=False, message="Укажите ИНН или ОГРН")
    # Симуляция: считаем валидным если длина ИНН 10/12 или ОГРН 13/15
    if inn:
        if len(inn) in (10, 12):
            return FnsCheckResponse(valid=True, message="Данные найдены (заглушка)", name="Организация по ИНН")
        return FnsCheckResponse(valid=False, message="Неверная длина ИНН (ожидается 10 или 12 цифр)")
    if ogrn:
        if len(ogrn) in (13, 15):
            return FnsCheckResponse(valid=True, message="Данные найдены (заглушка)", name="Организация по ОГРН")
        return FnsCheckResponse(valid=False, message="Неверная длина ОГРН (13 или 15 цифр)")
    return FnsCheckResponse(valid=False, message="Укажите ИНН или ОГРН")
