// Set VITE_API_URL to the public API tunnel when frontend and API use separate
// ngrok URLs. The /api default keeps the local Vite proxy working.
const API_URL = (import.meta.env?.VITE_API_URL || '/api').replace(/\/$/, '');
const CSRF_KEY = 'printpro_csrf_token';
let expiryTimer;

export const getToken = () => {
  const cached = sessionStorage.getItem(CSRF_KEY);
  if (cached) return cached;
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(/(?:^|; )printpro_csrf=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  }
  return null;
};
export function clearToken() {
  clearTimeout(expiryTimer);
  sessionStorage.removeItem(CSRF_KEY);
  sessionStorage.removeItem('printpro_token_expiry');
  if (typeof localStorage !== 'undefined') {
    Object.keys(localStorage).filter((key) => key.startsWith('printpro_'))
      .forEach((key) => localStorage.removeItem(key));
  }
}

function expire() {
  clearToken();
  window.dispatchEvent(new Event('auth:expired'));
}

export function saveToken(token, expiresIn) {
  clearTimeout(expiryTimer);
  if (token) sessionStorage.setItem(CSRF_KEY, token);
  sessionStorage.setItem('printpro_token_expiry', String(Date.now() + expiresIn * 1000));
  expiryTimer = setTimeout(expire, expiresIn * 1000);
}

export function mapUser(user) {
  const roles = { client: 'CLIENTE', employee: 'RESPONSAVEL_GRAFICA', admin: 'ADMINISTRADOR' };
  if (!roles[user.role] || !user.is_active) throw new Error('Conta sem acesso ao sistema.');
  return { ...user, role: roles[user.role] };
}

export function mapClient(client) {
  const details = client.registration_details || {};
  return {
    id: client.id,
    userId: client.user_id,
    name: client.name,
    company: details.company || '',
    document: client.cpf_cnpj,
    documentType: details.person_type === 'PJ' ? 'CNPJ' : 'CPF',
    email: client.email,
    phone: client.phone,
    address: client.address,
    city: details.city || '',
    state: details.state || '',
    createdAt: client.created_at,
    status: 'ATIVO'
  };
}

export function mapAdminUser(user) {
  const roles = { client: 'CLIENTE', employee: 'RESPONSAVEL_GRAFICA', admin: 'ADMINISTRADOR' };
  return {
    ...user,
    role: roles[user.role] || user.role,
    status: user.is_active ? 'ATIVO' : 'INATIVO',
    createdAt: user.created_at,
    phone: user.phone || ''
  };
}

export async function apiRequest(path, { method = 'GET', body, authenticated = true } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (API_URL.includes('ngrok')) headers['ngrok-skip-browser-warning'] = 'true';
  if (authenticated && !['GET', 'HEAD', 'OPTIONS'].includes(method.toUpperCase()) && getToken()) {
    headers['X-CSRF-Token'] = getToken();
  }
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method, headers, body: body === undefined ? undefined : JSON.stringify(body),
      credentials: 'include',
      signal: AbortSignal.timeout(15000)
    });
  } catch { throw new Error('Não foi possível conectar à API. Tente novamente.'); }
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    if (response.status === 401 && authenticated) expire();
    const detail = data?.detail;
    throw new Error(response.status >= 500 ? 'Serviço indisponível. Tente novamente.' :
      typeof detail === 'string' ? detail : Array.isArray(detail) ?
        detail.map(item => `${item.loc.at(-1)}: ${item.msg}`).join(' • ') : 'Não foi possível concluir a solicitação.');
  }
  return data;
}

export const authApi = {
  login: body => apiRequest('/auth/login', { method: 'POST', body, authenticated: false }),
  register: body => apiRequest('/auth/register', { method: 'POST', body, authenticated: false }),
  logout: () => apiRequest('/auth/logout', { method: 'POST' }),
  me: async () => {
    const user = await apiRequest('/auth/me');
    let expiry = Number(sessionStorage.getItem('printpro_token_expiry'));
    if (!Number.isFinite(expiry)) {
      expiry = Date.now() + 15 * 60 * 1000;
      sessionStorage.setItem('printpro_token_expiry', String(expiry));
    }
    const remaining = expiry - Date.now();
    if (remaining <= 0) { expire(); throw new Error('Sessão expirada.'); }
    clearTimeout(expiryTimer);
    expiryTimer = setTimeout(expire, remaining);
    return user;
  }
};

export const clientApi = {
  list: async () => (await apiRequest('/clients')).map(mapClient)
};

export const userApi = {
  list: async () => (await apiRequest('/users')).map(mapAdminUser),
  create: async (user) => mapAdminUser(await apiRequest('/users', { method: 'POST', body: user })),
  update: async (id, user) => mapAdminUser(await apiRequest(`/users/${id}`, { method: 'PATCH', body: user }))
};

const mapService = (item) => ({ ...item, priceFrom: item.priceFrom ?? item.price_from, deliveryDays: item.deliveryDays ?? item.delivery_days, reviewCount: item.reviewCount ?? item.review_count, createdAt: item.createdAt ?? item.created_at, updatedAt: item.updatedAt ?? item.updated_at });
export const serviceApi = {
  list: async () => (await apiRequest('/services', { authenticated: false })).map(mapService),
  create: async (service) => mapService(await apiRequest('/services', { method: 'POST', body: service, authenticated: true })),
  update: async (id, service) => mapService(await apiRequest(`/services/${id}`, { method: 'PATCH', body: service, authenticated: true }))
};

const mapOrder = (item) => ({
  ...item,
  id: item.code || item.id,
  dbId: item.id,
  clientName: item.clientName ?? item.client_name,
  clientEmail: item.clientEmail ?? item.client_email,
  clientPhone: item.clientPhone ?? item.client_phone,
  clientCompany: item.clientCompany ?? item.client_company,
  serviceId: item.serviceId ?? item.service_id,
  serviceName: item.serviceName ?? item.service_name,
  totalValue: item.totalValue ?? item.total_value,
  artVersions: item.artVersions ?? item.art_versions ?? [],
  productionStage: item.productionStage ?? item.production_stage,
  createdAt: item.createdAt ?? item.created_at,
  updatedAt: item.updatedAt ?? item.updated_at
});

export const orderApi = {
  list: async () => (await apiRequest('/orders', { authenticated: true })).map(mapOrder),
  create: async (order) => mapOrder(await apiRequest('/orders', { method: 'POST', body: {
    service_id: order.serviceId, specs: order.specs || {}, observations: order.observations || ''
  }, authenticated: true })),
  update: async (id, patch) => mapOrder(await apiRequest(`/orders/${id}`, { method: 'PATCH', body: patch, authenticated: true }))
};
