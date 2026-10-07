import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { GivTopBar } from './components/layout/GivTopBar';
import { GivHeader } from './components/layout/GivHeader';
import { GivNavbar } from './components/layout/GivNavbar';
import { GivFooter } from './components/layout/GivFooter';
import { ToastContainer } from './components/common/Toast';

// Client Pages
import { LojaHome } from './pages/client/LojaHome';
import { Catalogo } from './pages/client/Catalogo';
import { NovoPedido } from './pages/client/NovoPedido';
import { MeusPedidos } from './pages/client/MeusPedidos';
import { DetalhesPedidoCliente } from './pages/client/DetalhesPedidoCliente';
import { Carrinho } from './pages/client/Carrinho';

// Responsável Pages
import { DashboardResponsavel } from './pages/responsavel/DashboardResponsavel';
import { PedidosResponsavel } from './pages/responsavel/PedidosResponsavel';
import { AnalisePedido } from './pages/responsavel/AnalisePedido';
import { ProducaoResponsavel } from './pages/responsavel/ProducaoResponsavel';

// Admin Pages
import { DashboardAdmin } from './pages/admin/DashboardAdmin';
import { AdminUsuarios } from './pages/admin/AdminUsuarios';
import { AdminClientes } from './pages/admin/AdminClientes';
import { AdminServicos } from './pages/admin/AdminServicos';
import { AdminPrecos } from './pages/admin/AdminPrecos';

function MainRouter() {
  const { currentView } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      // Client views
      case 'home':
        return <LojaHome />;
      case 'catalogo':
        return <Catalogo />;
      case 'novo-pedido':
        return <NovoPedido />;
      case 'meus-pedidos':
        return <MeusPedidos />;
      case 'detalhes-pedido-cliente':
        return <DetalhesPedidoCliente />;
      case 'carrinho':
        return <Carrinho />;

      // Responsável da Gráfica views
      case 'resp-dashboard':
        return <DashboardResponsavel />;
      case 'resp-pedidos':
        return <PedidosResponsavel />;
      case 'resp-analise':
        return <AnalisePedido />;
      case 'resp-producao':
        return <ProducaoResponsavel />;

      // Administrador views
      case 'admin-dashboard':
        return <DashboardAdmin />;
      case 'admin-usuarios':
        return <AdminUsuarios />;
      case 'admin-clientes':
        return <AdminClientes />;
      case 'admin-servicos':
        return <AdminServicos />;
      case 'admin-precos':
        return <AdminPrecos />;

      default:
        return <LojaHome />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-gray-900 font-sans selection:bg-brand-cyan selection:text-white">
      {/* 1. Yellow Promotional Top Bar (GIV Online style) */}
      <GivTopBar />

      {/* 2. Main Header with Brand Logo and Search */}
      <GivHeader />

      {/* 3. Navigation Bar with Mega Menu and Role links */}
      <GivNavbar />

      {/* 4. Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {renderCurrentView()}
      </main>

      {/* 5. Complete Footer */}
      <GivFooter />

      {/* 6. Toast Notification Manager */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
