import test from 'node:test';
import assert from 'node:assert/strict';
import { authApi, apiRequest, mapUser, saveToken, getToken, clearToken } from './auth.js';

const storage = new Map();
globalThis.sessionStorage = {
  getItem: key => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: key => storage.delete(key)
};
globalThis.window = new EventTarget();

test('login sends credentials to API and preserves server errors', async () => {
  globalThis.fetch = async (url, options) => {
    assert.equal(url, '/api/auth/login');
    assert.deepEqual(JSON.parse(options.body), { email: 'a@example.com', password: 'wrong' });
    assert.equal(options.headers.Authorization, undefined);
    return new Response(JSON.stringify({ detail: 'Credenciais inválidas' }), { status: 401 });
  };
  await assert.rejects(authApi.login({ email: 'a@example.com', password: 'wrong' }), /Credenciais inválidas/);
});

test('session restoration sends bearer token and 401 clears it', async () => {
  saveToken('test-token', 60);
  globalThis.fetch = async (_url, options) => {
    assert.equal(options.headers.Authorization, 'Bearer test-token');
    return new Response('{}', { status: 401 });
  };
  let expired = false;
  window.addEventListener('auth:expired', () => { expired = true; }, { once: true });
  await assert.rejects(authApi.me());
  assert.equal(getToken(), null);
  assert.equal(expired, true);
});

test('maps all server roles and refuses unknown or disabled accounts', () => {
  for (const [role, expected] of Object.entries({ admin: 'ADMINISTRADOR', employee: 'RESPONSAVEL_GRAFICA', client: 'CLIENTE' })) {
    assert.equal(mapUser({ role, is_active: true }).role, expected);
  }
  assert.throws(() => mapUser({ role: 'unknown', is_active: true }));
  assert.throws(() => mapUser({ role: 'client', is_active: false }));
});

test('network failure gives actionable feedback; logout clears storage', async () => {
  globalThis.fetch = async () => { throw new TypeError('offline'); };
  await assert.rejects(apiRequest('/auth/me'), /conectar à API/);
  saveToken('test-token', 60);
  clearToken();
  assert.equal(getToken(), null);
});
