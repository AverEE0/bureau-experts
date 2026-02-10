/**
 * API клиент для бэкенда БЮРО ЭКСПЕРТОВ.
 * Режим: локальная база (127.0.0.1:8765) или общая база на сервере (URL из настроек).
 * При отключении интернета запросы автоматически идут в локальную БД; при появлении связи — снова на сервер.
 */
const LOCAL_API_BASE = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8765';

const STORAGE_USE_SERVER = 'bureau_use_server';
const STORAGE_SERVER_URL = 'bureau_server_url';

function getToken() {
  try {
    return localStorage.getItem('bureau_token') || '';
  } catch {
    return '';
  }
}

/** Текущий базовый URL API: сервер из настроек или локальный. */
function getApiBase() {
  try {
    const useServer = localStorage.getItem(STORAGE_USE_SERVER) === '1';
    const serverUrl = (localStorage.getItem(STORAGE_SERVER_URL) || '').trim().replace(/\/+$/, '');
    if (useServer && serverUrl) return serverUrl;
  } catch (_) {}
  return LOCAL_API_BASE;
}

/** Используется ли сейчас локальная база из-за отсутствия связи с сервером. */
let _offlineFallback = false;
export function isOfflineFallback() {
  return _offlineFallback;
}
export function setOfflineFallback(value) {
  _offlineFallback = !!value;
}

/** Сохранить настройки подключения к серверу (вызывается из Настроек). */
export function setServerConnection(useServer, serverUrl) {
  try {
    localStorage.setItem(STORAGE_USE_SERVER, useServer ? '1' : '0');
    localStorage.setItem(STORAGE_SERVER_URL, (serverUrl || '').trim());
  } catch (_) {}
  _offlineFallback = false;
}

/** Прочитать настройки: { useServer, serverUrl }. */
export function getServerConnection() {
  try {
    return {
      useServer: localStorage.getItem(STORAGE_USE_SERVER) === '1',
      serverUrl: (localStorage.getItem(STORAGE_SERVER_URL) || '').trim(),
    };
  } catch (_) {
    return { useServer: false, serverUrl: '' };
  }
}

function isNetworkError(err) {
  if (!err || typeof err !== 'object') return false;
  const msg = (err.message || '').toLowerCase();
  return err.name === 'TypeError' || msg.includes('failed to fetch') || msg.includes('network');
}

/** Режим без сервера: тестовые доступы admin/админ, expert/expert — никуда не подключаемся. */
function isDemoToken(t) {
  return t === 'demo-admin' || t === 'demo-expert';
}

function mockDemoResponse(path, method = 'GET') {
  if (path.includes('unread-count') || path.includes('unread_count')) return { count: 0 };
  if (path.includes('stats/me')) return { deals_completed: 0, revenue: 0 };
  if (path.includes('stats/all')) return [];
  if (path.includes('admin/users') && method === 'GET') return [];
  if (path.includes('chat/rooms')) return [];
  if (path.includes('notifications') && method === 'GET') return [];
  if (path.includes('can-register')) return { can_register: true };
  if (method === 'GET' && (path.includes('/api/') && !path.includes('auth/login'))) return [];
  if (method === 'POST' || method === 'PATCH') return { id: 1 };
  return null;
}

async function request(path, options = {}, token = getToken()) {
  if (isDemoToken(token)) {
    const mock = mockDemoResponse(path, (options.method || 'GET').toUpperCase());
    return Promise.resolve(mock === undefined ? [] : mock);
  }
  const base = getApiBase();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const doFetch = (baseUrl) => {
    const u = `${baseUrl}${path}`;
    return fetch(u, { ...options, headers });
  };

  let res;
  try {
    res = await doFetch(base);
  } catch (err) {
    if (base !== LOCAL_API_BASE && isNetworkError(err)) {
      _offlineFallback = true;
      try {
        res = await doFetch(LOCAL_API_BASE);
      } catch (_) {
        throw err;
      }
    } else {
      if (isNetworkError(err)) {
        throw new Error('Не удалось подключиться к серверу. Проверьте: 1) Запущен ли бэкенд на этом компьютере (порт 8765)? 2) На телефоне — укажите адрес сервера на первом экране.');
      }
      throw err;
    }
  }

  if (res && res.ok && base !== LOCAL_API_BASE) {
    _offlineFallback = false;
  }

  if (!res) throw new Error('Ошибка запроса');
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || res.statusText || 'Ошибка запроса');
  return data;
}

export const api = {
  async getClients(search, status) {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status) params.set('status', status);
    const q = params.toString();
    return request(`/api/clients${q ? `?${q}` : ''}`);
  },
  async createClient(body) {
    return request('/api/clients', { method: 'POST', body: JSON.stringify(body) });
  },
  async getClient(id) {
    return request(`/api/clients/${id}`);
  },
  async getClientCard(id) {
    return request(`/api/clients/${id}/card`);
  },
  async getDashboardLastClients(limit = 10) {
    return request(`/api/dashboard/last-clients?limit=${limit}`);
  },
  async updateClient(id, body) {
    return request(`/api/clients/${id}`, { method: 'PATCH', body: JSON.stringify(body) });
  },
  async deleteClient(id) {
    return request(`/api/clients/${id}`, { method: 'DELETE' });
  },
  async getDeals(stage, assigneeId, myOnly) {
    const params = new URLSearchParams();
    if (stage) params.set('stage', stage);
    if (assigneeId != null) params.set('assignee_id', assigneeId);
    if (myOnly) params.set('my_only', '1');
    const q = params.toString();
    return request(`/api/deals${q ? `?${q}` : ''}`);
  },
  async createDeal(body) {
    return request('/api/deals', { method: 'POST', body: JSON.stringify(body) });
  },
  async getDeal(id) {
    return request(`/api/deals/${id}`);
  },
  async updateDeal(id, body) {
    return request(`/api/deals/${id}`, { method: 'PATCH', body: JSON.stringify(body) });
  },
  async deleteDeal(id) {
    return request(`/api/deals/${id}`, { method: 'DELETE' });
  },
  async getDocuments() {
    return request('/api/documents');
  },
  async suggestDocumentType(file) {
    if (isDemoToken(getToken())) return { doc_type: 'Другое', provider: 'demo' };
    const form = new FormData();
    form.append('file', file);
    const base = getApiBase();
    const res = await fetch(`${base}/api/documents/suggest-type`, { method: 'POST', body: form });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || res.statusText);
    return data;
  },
  async uploadDocument(file, docType, note, clientId, dealId) {
    if (isDemoToken(getToken())) return { id: 1 };
    const form = new FormData();
    form.append('file', file);
    form.append('doc_type', docType || 'Договор');
    if (note) form.append('note', note);
    if (clientId != null) form.append('client_id', clientId);
    if (dealId != null) form.append('deal_id', dealId);
    const url = `${getApiBase()}/api/documents`;
    const res = await fetch(url, { method: 'POST', body: form });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || res.statusText);
    }
    return res.json();
  },
  async deleteDocument(id) {
    return request(`/api/documents/${id}`, { method: 'DELETE' });
  },
  async createCommunication(body) {
    return request('/api/communications', { method: 'POST', body: JSON.stringify(body) });
  },
  async login(email, password) {
    return request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  },
  async register(email, password, full_name) {
    return request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name: full_name || null }),
    });
  },
  async canRegister() {
    const r = await request('/api/auth/can-register');
    return r && r.can_register === true;
  },
  async getMe(token) {
    const t = token || getToken();
    if (isDemoToken(t)) {
      return t === 'demo-admin'
        ? { id: 1, email: 'admin', role: 'admin', full_name: 'Администратор' }
        : { id: 2, email: 'expert', role: 'manager', full_name: 'Эксперт' };
    }
    const res = await fetch(`${getApiBase()}/api/auth/me`, { headers: t ? { Authorization: `Bearer ${t}` } : {} });
    if (res.status === 404 || res.status === 401) return null;
    return res.json();
  },
  async fnsCheck(inn, ogrn) {
    return request('/api/fns/check', { method: 'POST', body: JSON.stringify({ inn: inn || undefined, ogrn: ogrn || undefined }) });
  },
  async ocrDocument(docId) {
    return request(`/api/ocr/document/${docId}`);
  },
  async generateDocument(templateKey, dealId, clientId) {
    if (isDemoToken(getToken())) throw new Error('В демо-режиме генерация документов недоступна');
    const url = `${getApiBase()}/api/generate/document`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ template_key: templateKey, deal_id: dealId || undefined, client_id: clientId || undefined }),
    });
    if (!res.ok) throw new Error('Ошибка генерации');
    const blob = await res.blob();
    return blob;
  },
  getArchiveExportXmlUrl() {
    return `${getApiBase()}/api/archive/export/xml`;
  },
  getArchiveExportCsvUrl() {
    return `${getApiBase()}/api/archive/export/csv`;
  },
  async getIntegrations() {
    return request('/api/integrations');
  },
  async updateIntegration(key, enabled, configJson) {
    return request(`/api/integrations/${key}`, {
      method: 'PATCH',
      body: JSON.stringify({ enabled: !!enabled, config_json: configJson }),
    });
  },
  async requestSignature(documentId) {
    return request('/api/signatures/request', { method: 'POST', body: JSON.stringify({ document_id: documentId }) });
  },
  // Уведомления
  async getNotifications(unreadOnly = false) {
    return request(`/api/notifications?unread_only=${unreadOnly}`);
  },
  async markNotificationRead(id) {
    return request(`/api/notifications/${id}/read`, { method: 'POST' });
  },
  async markAllNotificationsRead() {
    return request('/api/notifications/mark-all-read', { method: 'POST' });
  },
  async getUnreadCount() {
    return request('/api/notifications/unread-count');
  },
  async createNotification(userId, message) {
    return request('/api/notifications', { method: 'POST', body: JSON.stringify({ user_id: userId, message }) });
  },
  // Статистика (личный кабинет)
  async getStatsMe(period = 'month') {
    return request(`/api/stats/me?period=${encodeURIComponent(period)}`);
  },
  async getStatsAll(period = 'month') {
    return request(`/api/stats/all?period=${encodeURIComponent(period)}`);
  },
  // Админ
  async getAdminUsers() {
    return request('/api/admin/users');
  },
  async createUser(body) {
    return request('/api/admin/users', { method: 'POST', body: JSON.stringify(body) });
  },
  async updateUser(userId, body) {
    return request(`/api/admin/users/${userId}`, { method: 'PATCH', body: JSON.stringify(body) });
  },
  async blockUser(userId) {
    return request(`/api/admin/users/${userId}/block`, { method: 'PATCH' });
  },
  async unblockUser(userId) {
    return request(`/api/admin/users/${userId}/unblock`, { method: 'PATCH' });
  },
  // Внутренний чат (общий + личные переписки)
  async getChatRooms() {
    return request('/api/chat/rooms');
  },
  async getChatMessages(roomKey) {
    return request(`/api/chat/rooms/${encodeURIComponent(roomKey)}/messages`);
  },
  async sendChatMessage(roomKey, body) {
    return request(`/api/chat/rooms/${encodeURIComponent(roomKey)}/messages`, {
      method: 'POST',
      body: JSON.stringify({ body }),
    });
  },
};

export default api;
export { getToken };