import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  onlyDigits,
  maskCPF,
  maskCNPJ,
  maskPhone,
  maskCEP,
  isValidEmail,
  isValidCPF,
  isValidCNPJ,
  isValidPhone
} from '../src/utils/brazilianFormats.js';
import {
  ROLE_HOME_VIEW,
  authenticateUser,
  buildRegistrationRecords,
  doesOrderBelongToUser,
  getOrdersForUser
} from '../src/utils/authLogic.js';
import { INITIAL_USERS, INITIAL_CLIENTS, INITIAL_ORDERS } from '../src/data/mockData.js';

describe('brazilianFormats — máscaras e validações', () => {
  it('remove caracteres não numéricos com onlyDigits', () => {
    assert.equal(onlyDigits('529.982.247-25'), '52998224725');
    assert.equal(onlyDigits('(82) 99933-0488'), '82999330488');
    assert.equal(onlyDigits(''), '');
  });

  it('aplica máscara de CPF e CNPJ corretamente', () => {
    assert.equal(maskCPF('52998224725'), '529.982.247-25');
    assert.equal(maskCNPJ('11222333000181'), '11.222.333/0001-81');
  });

  it('aplica máscara de telefone e CEP corretamente', () => {
    assert.equal(maskPhone('82999330488'), '(82) 99933-0488');
    assert.equal(maskPhone('8236421234'), '(82) 3642-1234');
    assert.equal(maskCEP('57480000'), '57480-000');
  });

  it('valida CPF pelos dígitos verificadores e rejeita sequências repetidas', () => {
    assert.equal(isValidCPF('529.982.247-25'), true);
    assert.equal(isValidCPF('52998224725'), true);
    assert.equal(isValidCPF('111.111.111-11'), false);
    assert.equal(isValidCPF('529.982.247-20'), false);
    assert.equal(isValidCPF('12345'), false);
  });

  it('valida CNPJ pelos dígitos verificadores e rejeita sequências repetidas', () => {
    assert.equal(isValidCNPJ('11.222.333/0001-81'), true);
    assert.equal(isValidCNPJ('11222333000181'), true);
    assert.equal(isValidCNPJ('00.000.000/0000-00'), false);
    assert.equal(isValidCNPJ('11.222.333/0001-80'), false);
  });

  it('valida e-mail e telefone celular/fixo', () => {
    assert.equal(isValidEmail('cliente@printpro.com.br'), true);
    assert.equal(isValidEmail('invalido@'), false);
    assert.equal(isValidPhone('(82) 99933-0488'), true);
    assert.equal(isValidPhone('(82) 3642-1234'), true);
    assert.equal(isValidPhone('82999'), false);
  });
});

describe('authLogic — autenticação (Login)', () => {
  it('autentica Cliente, Responsável e Administrador redirecionando para a view correta', () => {
    const clientAuth = authenticateUser({
      email: 'carlos@hamburgueriadelmiro.com.br',
      password: 'qualquer-senha-mock',
      users: INITIAL_USERS
    });
    assert.equal(clientAuth.ok, true);
    assert.equal(clientAuth.session.role, 'CLIENTE');
    assert.equal(clientAuth.targetView, ROLE_HOME_VIEW.CLIENTE);

    const respAuth = authenticateUser({
      email: 'lucas.preimpressao@printpro.com.br',
      password: 'qualquer-senha-mock',
      users: INITIAL_USERS
    });
    assert.equal(respAuth.ok, true);
    assert.equal(respAuth.session.role, 'RESPONSAVEL_GRAFICA');
    assert.equal(respAuth.targetView, ROLE_HOME_VIEW.RESPONSAVEL_GRAFICA);

    const adminAuth = authenticateUser({
      email: 'admin@printpro.com.br',
      password: 'qualquer-senha-mock',
      users: INITIAL_USERS
    });
    assert.equal(adminAuth.ok, true);
    assert.equal(adminAuth.session.role, 'ADMINISTRADOR');
    assert.equal(adminAuth.targetView, ROLE_HOME_VIEW.ADMINISTRADOR);
  });

  it('rejeita credenciais vazias, e-mail inexistente ou usuário inativo', () => {
    assert.equal(
      authenticateUser({ email: '', password: '', users: INITIAL_USERS }).ok,
      false
    );
    assert.equal(
      authenticateUser({ email: 'naoexiste@printpro.com.br', password: '123', users: INITIAL_USERS }).ok,
      false
    );

    const inactiveUsers = [
      { id: 99, name: 'Inativo', email: 'inativo@printpro.com.br', role: 'CLIENTE', status: 'INATIVO' }
    ];
    const res = authenticateUser({ email: 'inativo@printpro.com.br', password: '123', users: inactiveUsers });
    assert.equal(res.ok, false);
    assert.match(res.error, /desativada/i);
  });

  it('nunca armazena senha na sessão retornada (.harness/guard-rules.md §4)', () => {
    const res = authenticateUser({
      email: 'carlos@hamburgueriadelmiro.com.br',
      password: 'MinhaSenhaSuperSecreta123',
      users: INITIAL_USERS
    });
    assert.equal(res.ok, true);
    assert.equal('password' in res.session, false);
  });
});

describe('authLogic — cadastro de conta (Cadastro PF/PJ)', () => {
  const fixedNow = new Date('2026-11-03T12:00:00Z');

  it('cria usuário CLIENTE e registro de cliente PF sem armazenar senha em texto puro', () => {
    const result = buildRegistrationRecords(
      {
        personType: 'PF',
        document: '529.982.247-25',
        name: 'Maria Oliveira',
        email: 'Maria.Oliveira@Exemplo.com',
        birthDate: '1995-04-12',
        phone: '(82) 99988-7766',
        address: {
          cep: '57480-000',
          street: 'Rua Sete de Setembro',
          number: '120',
          complement: 'Sala 2',
          district: 'Centro',
          city: 'Delmiro Gouveia',
          state: 'AL'
        },
        password: 'SenhaForte123'
      },
      { users: INITIAL_USERS, clients: INITIAL_CLIENTS, now: fixedNow }
    );

    assert.equal(result.ok, true);
    assert.equal(result.newUser.role, 'CLIENTE');
    assert.equal(result.newUser.email, 'maria.oliveira@exemplo.com');
    assert.equal('password' in result.newUser, false);
    assert.equal('password' in result.newClient, false);
    assert.equal('password' in result.session, false);
    assert.equal(result.newClient.documentType, 'CPF');
    assert.equal(result.newClient.address, 'Rua Sete de Setembro, 120 - Sala 2 - Centro');
  });

  it('impede cadastro com e-mail ou CPF/CNPJ já existente', () => {
    const dupEmail = buildRegistrationRecords(
      {
        personType: 'PF',
        document: '529.982.247-25',
        name: 'Outro Nome',
        email: 'carlos@hamburgueriadelmiro.com.br'
      },
      { users: INITIAL_USERS, clients: INITIAL_CLIENTS }
    );
    assert.equal(dupEmail.ok, false);
    assert.match(dupEmail.error, /e-mail/i);

    const dupDoc = buildRegistrationRecords(
      {
        personType: 'PJ',
        document: '12.345.678/0001-90',
        name: 'Outro Responsável',
        company: 'Outra Empresa',
        email: 'novo@empresa.com.br'
      },
      { users: INITIAL_USERS, clients: INITIAL_CLIENTS }
    );
    assert.equal(dupDoc.ok, false);
    assert.match(dupDoc.error, /documento/i);
  });
});

describe('authLogic — isolamento de pedidos por cliente (Meus Pedidos)', () => {
  const pedroUser = {
    id: 777,
    name: 'Pedro Henrique',
    email: 'pedro@exemplo.com',
    role: 'CLIENTE'
  };

  const pedroOrder = {
    id: 'PRP-1052',
    clientId: 777,
    clientName: 'Pedro Henrique',
    clientEmail: 'pedro@exemplo.com',
    serviceName: 'Cartão de Visita Couché 300g',
    status: 'EM_ANALISE'
  };

  const allOrders = [pedroOrder, ...INITIAL_ORDERS];

  it('retorna apenas o(s) pedido(s) pertencente(s) ao cliente logado (ex.: Pedro)', () => {
    const pedroOrders = getOrdersForUser(allOrders, pedroUser);
    assert.equal(pedroOrders.length, 1);
    assert.equal(pedroOrders[0].id, 'PRP-1052');
    assert.equal(doesOrderBelongToUser(INITIAL_ORDERS[0], pedroUser), false);
  });

  it('retorna lista vazia para um cliente recém-cadastrado que ainda não possui pedidos', () => {
    const newClientUser = {
      id: 888,
      name: 'Cliente Novo',
      email: 'novo@cliente.com',
      role: 'CLIENTE'
    };
    const orders = getOrdersForUser(allOrders, newClientUser);
    assert.equal(orders.length, 0);
  });

  it('permite que Responsável e Administrador ou modo demonstração sem login vejam todos os pedidos', () => {
    const respUser = { id: 2, name: 'Lucas', email: 'lucas.preimpressao@printpro.com.br', role: 'RESPONSAVEL_GRAFICA' };
    const adminUser = { id: 1, name: 'Everton', email: 'admin@printpro.com.br', role: 'ADMINISTRADOR' };

    assert.equal(getOrdersForUser(allOrders, respUser).length, allOrders.length);
    assert.equal(getOrdersForUser(allOrders, adminUser).length, allOrders.length);
    assert.equal(getOrdersForUser(allOrders, null).length, allOrders.length);
  });
});
