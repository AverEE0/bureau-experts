/**
 * Конфигурация услуг/направлений: у каждой услуги свой набор полей (выноски) для заполнения.
 * Хранится в localStorage, можно редактировать и добавлять новые в Настройках.
 */

const STORAGE_KEY = 'bureau_services_config';

/** Направления по умолчанию: оценка, экспертиза, перевод, юр. услуги, кадастр, геодезия, страхование, сертификация */
const DEFAULT_SERVICES = [
  {
    id: 'valuation',
    name: 'Оценка',
    items: [
      { id: 'object-address', label: 'Адрес объекта' },
      { id: 'cadastral', label: 'Кадастровый номер' },
      { id: 'purpose', label: 'Цель оценки' },
      { id: 'report-type', label: 'Вид отчёта (отчёт / выписка / справка)' },
    ],
  },
  {
    id: 'expertise',
    name: 'Экспертиза',
    items: [
      { id: 'expertise-type', label: 'Вид экспертизы' },
      { id: 'case-number', label: 'Номер судебного дела' },
      { id: 'court', label: 'Суд' },
      { id: 'question', label: 'Вопросы на разрешение' },
    ],
  },
  {
    id: 'translation',
    name: 'Перевод',
    items: [
      { id: 'translation-type', label: 'Вид перевода (нотариальный / обычный)' },
      { id: 'language', label: 'Языковая пара' },
      { id: 'doc-type', label: 'Тип документа' },
    ],
  },
  {
    id: 'legal',
    name: 'Юр. услуги',
    items: [
      { id: 'service-type', label: 'Вид услуги' },
      { id: 'case-number', label: 'Номер дела' },
      { id: 'deadlines', label: 'Ключевые сроки' },
    ],
  },
  {
    id: 'cadastral',
    name: 'Кадастровые работы',
    items: [
      { id: 'work-type', label: 'Вид кадастровых работ' },
      { id: 'address-plot', label: 'Адрес / участок' },
      { id: 'purpose', label: 'Цель работ' },
    ],
  },
  {
    id: 'geodesy',
    name: 'Геодезия',
    items: [
      { id: 'work-type', label: 'Вид геодезических работ' },
      { id: 'address-plot', label: 'Адрес участка' },
      { id: 'area', label: 'Площадь' },
    ],
  },
  {
    id: 'insurance',
    name: 'Страхование',
    items: [
      { id: 'insurance-type', label: 'Вид страхования' },
      { id: 'object', label: 'Объект страхования' },
      { id: 'period', label: 'Срок' },
    ],
  },
  {
    id: 'certification',
    name: 'Сертификация',
    items: [
      { id: 'cert-type', label: 'Вид сертификации' },
      { id: 'product', label: 'Продукт / объект' },
      { id: 'standard', label: 'Стандарт (при необходимости)' },
    ],
  },
];

function loadServices() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (_) {}
  return JSON.parse(JSON.stringify(DEFAULT_SERVICES));
}

function saveServices(services) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    return true;
  } catch (_) {
    return false;
  }
}

function getServiceById(services, id) {
  return services.find((s) => s.id === id) || null;
}

/** Генерирует уникальный id для новой услуги или пункта */
function nextId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export {
  loadServices,
  saveServices,
  getServiceById,
  nextId,
  DEFAULT_SERVICES,
  STORAGE_KEY,
};
