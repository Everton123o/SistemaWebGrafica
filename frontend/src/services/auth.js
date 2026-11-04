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

export async function apiRequest(path, { method = 'GET', body, authenticated = true } = {}) {
  const headers = { 'Content-Type': 'application/json' };
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
