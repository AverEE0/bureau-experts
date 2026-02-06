/**
 * API клиент для бэкенда БЮРО ЭКСПЕРТОВ.
 * Базовый URL: REACT_APP_API_URL или http://localhost:8000
 */
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
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
  async updateClient(id, body) {
    return request(`/api/clients/${id}`, { method: 'PATCH', body: JSON.stringify(body) });
  },
  async deleteClient(id) {
    return request(`/api/clients/${id}`, { method: 'DELETE' });
  },
  async getDeals(stage) {
    const q = stage ? `?stage=${encodeURIComponent(stage)}` : '';
    return request(`/api/deals${q}`);
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
  async uploadDocument(file, docType, note, clientId, dealId) {
    const form = new FormData();
    form.append('file', file);
    form.append('doc_type', docType || 'Договор');
    if (note) form.append('note', note);
    if (clientId != null) form.append('client_id', clientId);
    if (dealId != null) form.append('deal_id', dealId);
    const url = `${API_BASE}/api/documents`;
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
  async getMe(token) {
    const res = await fetch(`${API_BASE}/api/auth/me`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
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
    const url = `${API_BASE}/api/generate/document`;
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
    return `${API_BASE}/api/archive/export/xml`;
  },
  getArchiveExportCsvUrl() {
    return `${API_BASE}/api/archive/export/csv`;
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
};

export default api;
