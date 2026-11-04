import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_SERVICES,
  INITIAL_ORDERS,
  INITIAL_USERS,
  INITIAL_CLIENTS,
  INITIAL_SETTINGS
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Authenticated user session (mock until the backend exposes an auth endpoint)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('printpro_session');
    return saved ? JSON.parse(saved) : null;
  });

  // Roles: 'CLIENTE', 'RESPONSAVEL_GRAFICA', 'ADMINISTRADOR'
  const [currentRole, setCurrentRole] = useState(() => currentUser?.role || 'CLIENTE');
  
  // Navigation
  const [currentView, setCurrentView] = useState('home');
  const [selectedOrderId, setSelectedOrderId] = useState('PRP-1042');
  const [selectedServiceId, setSelectedServiceId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data states
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('printpro_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('printpro_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('printpro_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('printpro_clients');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('printpro_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [cart, setCart] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Persist changes
  useEffect(() => {
    localStorage.setItem('printpro_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('printpro_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('printpro_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('printpro_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('printpro_settings', JSON.stringify(settings));
  }, [settings]);

  // Toast helper
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Navigation helpers
  const navigateTo = (view, extraParams = {}) => {
    if (extraParams.orderId) setSelectedOrderId(extraParams.orderId);
    if (extraParams.serviceId) setSelectedServiceId(extraParams.serviceId);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch Role
  const switchRole = (newRole) => {
    setCurrentRole(newRole);
    if (newRole === 'CLIENTE') {
      setCurrentView('home');
      addToast('Alternado para visão do CLIENTE (Loja & Meus Pedidos)', 'info');
    } else if (newRole === 'RESPONSAVEL_GRAFICA') {
      setCurrentView('resp-dashboard');
      addToast('Alternado para visão do RESPONSÁVEL DA GRÁFICA (Pré-Impressão & Validação)', 'info');
    } else if (newRole === 'ADMINISTRADOR') {
      setCurrentView('admin-dashboard');
      addToast('Alternado para visão do ADMINISTRADOR (Gestão & Configurações)', 'info');
    }
  };

  // ==================== AUTH ACTIONS (MOCK) ====================

  const ROLE_HOME_VIEW = {
    CLIENTE: 'home',
    RESPONSAVEL_GRAFICA: 'resp-dashboard',
    ADMINISTRADOR: 'admin-dashboard'
  };

  const startSession = (user) => {
    const session = { id: user.id, name: user.name, email: user.email, role: user.role };
    setCurrentUser(session);
    localStorage.setItem('printpro_session', JSON.stringify(session));
    setCurrentRole(user.role);
    navigateTo(ROLE_HOME_VIEW[user.role] || 'home');
  };

  // TODO: substituir pela chamada ao endpoint de autenticação quando estiver disponível no backend.
  // Enquanto isso, valida apenas se o e-mail pertence a um usuário cadastrado e ativo.
  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      return { ok: false, error: 'Informe seu e-mail e sua senha.' };
    }

    const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
    if (!user) {
      return { ok: false, error: 'Não encontramos uma conta com este e-mail.' };
    }
    if (user.status !== 'ATIVO') {
      return { ok: false, error: 'Esta conta está desativada. Entre em contato com a gráfica.' };
    }

    startSession(user);
    addToast(`Bem-vindo(a), ${user.name.split(' ')[0]}!`, 'success');
    return { ok: true };
  };

  // Self-service sign-up: creates the CLIENTE user and its client record.
  // TODO: integrar com POST /users (e cadastro de cliente) quando o frontend consumir a API.
  const register = ({ personType, document, name, company, email, birthDate, phone, address }) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
      return { ok: false, error: 'Já existe um usuário com este e-mail.' };
    }

    const documentDigits = (document || '').replace(/\D/g, '');
    if (documentDigits && clients.some(c => (c.document || '').replace(/\D/g, '') === documentDigits)) {
      return { ok: false, error: 'Já existe um cliente cadastrado com este documento.' };
    }

    const id = Date.now();
    const today = new Date().toISOString().split('T')[0];

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

    setUsers(prev => [newUser, ...prev]);
    setClients(prev => [newClient, ...prev]);
    startSession(newUser);
    addToast('Conta criada com sucesso! Bem-vindo(a) à PrintPro.', 'success');
    return { ok: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('printpro_session');
    setCurrentRole('CLIENTE');
    setCart([]);
    navigateTo('login');
    addToast('Você saiu da sua conta.', 'info');
  };

  // ==================== ORDER ACTIONS ====================

  // Client creates an order
  const createOrder = (orderData) => {
    const newId = `PRP-${1047 + orders.length}`;
    const newOrder = {
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'EM_ANALISE',
      timeline: [
        { step: 'Pedido Criado', date: new Date().toLocaleString('pt-BR'), author: orderData.clientName, done: true },
        { step: 'Arte v1 Enviada', date: new Date().toLocaleString('pt-BR'), author: orderData.clientName, done: true },
        { step: 'Em Análise de Pré-Impressão', date: 'Aguardando fila técnica', author: 'Operador', done: false, active: true },
        { step: 'Aprovação Final da Arte', date: 'Pendente', author: 'Operador', done: false },
        { step: 'Liberado para Produção', date: 'Pendente', author: 'Responsável', done: false },
        { step: 'Finalizado para Retirada', date: 'Pendente', author: 'Expedição', done: false }
      ],
      artVersions: [
        {
          version: 1,
          filename: orderData.file?.name || 'arte_enviada.pdf',
          fileSize: orderData.file ? `${(orderData.file.size / (1024 * 1024)).toFixed(1)} MB` : '3.5 MB',
          uploadedAt: new Date().toISOString(),
          status: 'EM_ANALISE',
          previewUrl: orderData.filePreview || null
        }
      ],
      quotation: {
        materialCost: (orderData.totalValue * 0.4).toFixed(2),
        printCost: (orderData.totalValue * 0.3).toFixed(2),
        finishingCost: (orderData.totalValue * 0.1).toFixed(2),
        markup: (orderData.totalValue * 0.2).toFixed(2),
        total: orderData.totalValue,
        status: 'Calculado automaticamente'
      },
      ...orderData
    };

    setOrders(prev => [newOrder, ...prev]);
    setSelectedOrderId(newId);
    addToast(`Pedido #${newId} criado com sucesso! Arte enviada para pré-impressão.`, 'success');
    navigateTo('detalhes-pedido-cliente', { orderId: newId });
    return newId;
  };

  // Client submits correction (Arte v2 / v3)
  const submitClientCorrection = (orderId, newFile, note = '') => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const newVersionNum = order.artVersions.length + 1;
      const newVersion = {
        version: newVersionNum,
        filename: newFile?.name || `arte_corrigida_v${newVersionNum}.pdf`,
        fileSize: newFile ? `${(newFile.size / (1024 * 1024)).toFixed(1)} MB` : '4.2 MB',
        uploadedAt: new Date().toISOString(),
        status: 'EM_ANALISE',
        clientCorrectionNote: note,
        previewUrl: newFile?.preview || null
      };

      const updatedTimeline = [
        ...order.timeline,
        {
          step: `Correção Enviada (Arte v${newVersionNum})`,
          date: new Date().toLocaleString('pt-BR'),
          author: order.clientName,
          done: true
        },
        {
          step: 'Reanálise Técnica de Pré-Impressão',
          date: new Date().toLocaleString('pt-BR'),
          author: 'Lucas Ferreira',
          done: false,
          active: true
        }
      ];

      return {
        ...order,
        status: 'EM_ANALISE',
        artVersions: [...order.artVersions, newVersion],
        timeline: updatedTimeline
      };
    }));

    addToast(`Correção da Arte para o pedido #${orderId} enviada com sucesso! Pedido voltou para análise.`, 'success');
  };

  // Responsável requests correction
  const requestCorrection = (orderId, reason, note) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const updatedVersions = order.artVersions.map((v, idx) => {
        if (idx === order.artVersions.length - 1) {
          return {
            ...v,
            status: 'REPROVADA',
            rejectionReason: reason,
            correctionNote: note,
            reviewedBy: 'Lucas Ferreira (Pré-Impressão)',
            reviewDate: new Date().toISOString()
          };
        }
        return v;
      });

      const updatedTimeline = [
        ...order.timeline,
        {
          step: 'Correção Solicitada pelo Operador',
          date: new Date().toLocaleString('pt-BR'),
          author: 'Lucas Ferreira',
          done: true,
          alert: true
        },
        {
          step: 'Aguardando Envio de Nova Arte pelo Cliente',
          date: 'Pendente',
          author: order.clientName,
          done: false,
          active: true
        }
      ];

      return {
        ...order,
        status: 'AGUARDANDO_CORRECAO',
        artVersions: updatedVersions,
        timeline: updatedTimeline
      };
    }));

    addToast(`Correção solicitada para o pedido #${orderId}. Cliente foi notificado!`, 'warning');
  };

  // Responsável approves artwork
  const approveArtwork = (orderId, approvalNote = 'Arte em conformidade técnica com o padrão gráfico.') => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const updatedVersions = order.artVersions.map((v, idx) => {
        if (idx === order.artVersions.length - 1) {
          return {
            ...v,
            status: 'APROVADA',
            reviewedBy: 'Lucas Ferreira (Pré-Impressão)',
            reviewDate: new Date().toISOString(),
            approvalNote
          };
        }
        return v;
      });

      const updatedTimeline = [
        ...order.timeline,
        {
          step: 'Arte Aprovada pela Pré-Impressão',
          date: new Date().toLocaleString('pt-BR'),
          author: 'Lucas Ferreira',
          done: true
        },
        {
          step: 'Pronto para Liberação de Produção',
          date: new Date().toLocaleString('pt-BR'),
          author: 'Sistema',
          done: true,
          active: true
        }
      ];

      return {
        ...order,
        status: 'APROVADO',
        artVersions: updatedVersions,
        timeline: updatedTimeline
      };
    }));

    addToast(`Arte do pedido #${orderId} aprovada com sucesso! Pronto para liberação.`, 'success');
  };

  // Responsável releases order for production
  const releaseToProduction = (orderId) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      // Safety check: Cannot release if pending correction
      if (order.status === 'AGUARDANDO_CORRECAO') {
        addToast('Não é possível liberar para produção: pedido possui arte reprovada aguardando correção!', 'error');
        return order;
      }

      const updatedTimeline = [
        ...order.timeline,
        {
          step: 'Liberado para Produção',
          date: new Date().toLocaleString('pt-BR'),
          author: 'Lucas Ferreira (Responsável)',
          done: true
        },
        {
          step: 'Impressão & Acabamento em Andamento',
          date: new Date().toLocaleString('pt-BR'),
          author: 'Chão de Fábrica',
          done: true,
          active: true
        }
      ];

      return {
        ...order,
        status: 'EM_PRODUCAO',
        productionStage: 'Impressão',
        timeline: updatedTimeline
      };
    }));

    addToast(`Pedido #${orderId} liberado para a produção gráfica com sucesso!`, 'success');
  };

  // Responsável advances production stage
  const advanceProductionStage = (orderId, newStage) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const isFinal = newStage === 'Finalizado / Disponível para Retirada';

      const updatedTimeline = [
        ...order.timeline,
        {
          step: `Etapa: ${newStage}`,
          date: new Date().toLocaleString('pt-BR'),
          author: 'Equipe de Produção',
          done: true,
          active: !isFinal
        }
      ];

      return {
        ...order,
        status: isFinal ? 'FINALIZADO' : 'EM_PRODUCAO',
        productionStage: newStage,
        timeline: updatedTimeline
      };
    }));

    addToast(`Pedido #${orderId} avançou para a etapa: ${newStage}!`, 'info');
  };

  // Responsável updates quotation
  const updateQuotation = (orderId, quotationData) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      return {
        ...order,
        quotation: {
          ...order.quotation,
          ...quotationData,
          status: 'Atualizado pela gráfica'
        },
        totalValue: quotationData.total || order.totalValue
      };
    }));
    addToast(`Orçamento do pedido #${orderId} registrado com sucesso!`, 'success');
  };

  // ==================== ADMIN SERVICES ACTIONS ====================

  const addService = (newService) => {
    const id = Date.now();
    const serviceWithId = {
      ...newService,
      id,
      slug: newService.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: 5.0,
      reviewCount: 0,
      badge: 'Novo'
    };
    setServices(prev => [serviceWithId, ...prev]);
    addToast(`Serviço "${newService.name}" adicionado com sucesso!`, 'success');
  };

  const updateService = (serviceId, patch) => {
    setServices(prev => prev.map(s => (s.id === serviceId ? { ...s, ...patch } : s)));
    addToast('Serviço atualizado com sucesso!', 'success');
  };

  const toggleServiceStatus = (serviceId) => {
    setServices(prev => prev.map(s => {
      if (s.id === serviceId) {
        const nextActive = s.inactive ? false : true;
        addToast(`Serviço ${s.name} ${nextActive ? 'desativado' : 'ativado'}!`, 'info');
        return { ...s, inactive: nextActive };
      }
      return s;
    }));
  };

  const updateServiceRequirements = (serviceId, requirements) => {
    setServices(prev => prev.map(s => (s.id === serviceId ? { ...s, requirements } : s)));
    addToast('Requisitos do serviço atualizados com sucesso!', 'success');
  };

  // ==================== ADMIN USERS ACTIONS ====================

  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now(),
      status: 'ATIVO',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [newUser, ...prev]);
    addToast(`Usuário ${userData.name} cadastrado com sucesso!`, 'success');
  };

  const updateUser = (userId, patch) => {
    setUsers(prev => prev.map(u => (u.id === userId ? { ...u, ...patch } : u)));
    addToast('Usuário atualizado com sucesso!', 'success');
  };

  const toggleUserStatus = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';
        addToast(`Usuário ${u.name} agora está ${newStatus}!`, 'info');
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  // ==================== ADMIN CLIENTS ACTIONS ====================

  const addClient = (clientData) => {
    const newClient = {
      ...clientData,
      id: Date.now(),
      totalOrders: 0,
      totalSpent: 0,
      status: 'ATIVO'
    };
    setClients(prev => [newClient, ...prev]);
    addToast(`Cliente ${clientData.name} cadastrado com sucesso!`, 'success');
  };

  const updateClient = (clientId, patch) => {
    setClients(prev => prev.map(c => (c.id === clientId ? { ...c, ...patch } : c)));
    addToast('Cliente atualizado com sucesso!', 'success');
  };

  // ==================== ADMIN PRICING ACTIONS ====================

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addToast('Configurações de preços e margens salvas com sucesso!', 'success');
  };

  // ==================== CART ACTIONS ====================

  const addToCart = (item) => {
    setCart(prev => [...prev, { ...item, cartId: Date.now() }]);
    addToast(`Item "${item.name}" adicionado ao carrinho!`, 'success');
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
    addToast('Item removido do carrinho.', 'info');
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        currentRole,
        switchRole,
        currentView,
        navigateTo,
        selectedOrderId,
        setSelectedOrderId,
        selectedServiceId,
        setSelectedServiceId,
        searchQuery,
        setSearchQuery,
        services,
        orders,
        users,
        clients,
        settings,
        cart,
        toasts,
        addToast,
        removeToast,
        createOrder,
        submitClientCorrection,
        requestCorrection,
        approveArtwork,
        releaseToProduction,
        advanceProductionStage,
        updateQuotation,
        addService,
        updateService,
        toggleServiceStatus,
        updateServiceRequirements,
        addUser,
        updateUser,
        toggleUserStatus,
        addClient,
        updateClient,
        updateSettings,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
