// Set VITE_API_URL to the public API tunnel when frontend and API use separate
// ngrok URLs. The /api default keeps the local Vite proxy working.
const API_URL = (import.meta.env?.VITE_API_URL || '/api').replace(/\/$/, '');
const TOKEN_KEY = 'printpro_token';
let expiryTimer;

export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export function clearToken() {
  clearTimeout(expiryTimer);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem('printpro_token_expiry');
}

function expire() {
  clearToken();
  window.dispatchEvent(new Event('auth:expired'));
}

export function saveToken(token, expiresIn) {
  clearTimeout(expiryTimer);
  sessionStorage.setItem(TOKEN_KEY, token);
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
  if (authenticated && getToken()) headers.Authorization = `Bearer ${getToken()}`;
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method, headers, body: body === undefined ? undefined : JSON.stringify(body),
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
  me: async () => {
    const user = await apiRequest('/auth/me');
    const remaining = Number(sessionStorage.getItem('printpro_token_expiry')) - Date.now();
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
