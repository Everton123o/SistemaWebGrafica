import { onlyDigits, isValidEmail } from './brazilianFormats.js';

export const ROLE_HOME_VIEW = {
  CLIENTE: 'home',
  RESPONSAVEL_GRAFICA: 'resp-dashboard',
  ADMINISTRADOR: 'admin-dashboard'
};

/**
 * Validates and resolves a user login against the registered users list.
 * Keeps no plain-text password in storage, in accordance with .harness/guard-rules.md.
 */
export function authenticateUser({ email = '', password = '', users = [] }) {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password) {
    return { ok: false, error: 'Informe seu e-mail e sua senha.' };
  }
  if (!isValidEmail(normalizedEmail)) {
    return { ok: false, error: 'Digite um e-mail válido.' };
  }

  const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user) {
    return { ok: false, error: 'Não encontramos uma conta com este e-mail.' };
  }
  if (user.status !== 'ATIVO') {
    return { ok: false, error: 'Esta conta está desativada. Entre em contato com a gráfica.' };
  }

  const session = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone || ''
  };

  return {
    ok: true,
    user,
    session,
    targetView: ROLE_HOME_VIEW[user.role] || 'home'
  };
}

/**
 * Validates and builds new user + client records for self-service registration.
 * Never persists the raw password in client-side state/storage.
 */
export function buildRegistrationRecords(payload, { users = [], clients = [], now = new Date() } = {}) {
  const {
    personType = 'PF',
    document = '',
    name = '',
    company = '',
    email = '',
    birthDate = '',
    phone = '',
    address = {}
  } = payload || {};

  const normalizedEmail = email.trim().toLowerCase();
  if (!name.trim()) {
    return { ok: false, error: 'Informe seu nome completo.' };
  }
  if (!isValidEmail(normalizedEmail)) {
    return { ok: false, error: 'Informe um e-mail válido.' };
  }
  if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
    return { ok: false, error: 'Já existe um usuário com este e-mail.' };
  }

  const documentDigits = onlyDigits(document);
  if (documentDigits && clients.some(c => onlyDigits(c.document || '') === documentDigits)) {
    return { ok: false, error: 'Já existe um cliente cadastrado com este documento.' };
  }

  const id = now.getTime();
  const today = now.toISOString().split('T')[0];

  const newUser = {
    id,
    name: name.trim(),
    email: normalizedEmail,
    role: 'CLIENTE',
    status: 'ATIVO',
    phone: phone || '',
    createdAt: today
  };

  const street = [address?.street?.trim(), address?.number?.trim()].filter(Boolean).join(', ');
  const newClient = {
    id,
    name: name.trim(),
    company: company?.trim() || '',
    document: document || '',
    documentType: personType === 'PJ' ? 'CNPJ' : 'CPF',
    email: normalizedEmail,
    phone: phone || '',
    birthDate: birthDate || '',
    cep: address?.cep || '',
    city: address?.city?.trim() || '',
    state: address?.state || '',
    address: [street, address?.complement?.trim(), address?.district?.trim()].filter(Boolean).join(' - '),
    totalOrders: 0,
    totalSpent: 0,
    status: 'ATIVO'
  };

  const session = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    phone: newUser.phone
  };

  return {
    ok: true,
    newUser,
    newClient,
    session,
    targetView: ROLE_HOME_VIEW[newUser.role]
  };
}

/**
 * Checks if an order belongs to a given authenticated user.
 */
export function doesOrderBelongToUser(order, user) {
  if (!order || !user) return false;
  if (user.id && order.clientId && String(order.clientId) === String(user.id)) {
    return true;
  }
  if (user.email && order.clientEmail) {
    return order.clientEmail.trim().toLowerCase() === user.email.trim().toLowerCase();
  }
  if (user.name && order.clientName) {
    return order.clientName.trim().toLowerCase() === user.name.trim().toLowerCase();
  }
  return false;
}

/**
 * Filters the global orders list so that a logged-in CLIENTE only sees their own orders.
 * Staff roles (RESPONSAVEL_GRAFICA, ADMINISTRADOR) or unauthenticated demo mode see all orders.
 */
export function getOrdersForUser(orders = [], currentUser = null) {
  if (!Array.isArray(orders)) return [];
  if (currentUser && currentUser.role === 'CLIENTE') {
    return orders.filter(order => doesOrderBelongToUser(order, currentUser));
  }
  return orders;
}
