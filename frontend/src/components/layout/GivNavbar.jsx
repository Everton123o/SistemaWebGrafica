import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  ChevronDown,
  Sparkles,
  Layers,
  FileText,
  Tag,
  Coffee,
  CheckCircle,
  Shield,
  Wrench,
  DollarSign,
  Users,
  Grid
} from 'lucide-react';

// transformar em menu hamburguer para o celular

export function GivNavbar() {
  const { currentRole, currentView, navigateTo, services } = useApp();
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  // Group services by category for mega menu
  const categories = Array.from(new Set(services.map(s => s.category)));

  return (
    <nav className="w-full bg-[#263C75] text-white border-b border-gray-800 text-xs font-medium relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-1">
          
          {/* Main Category Mega-Menu Trigger */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-navy hover:bg-brand-navy/80 text-white font-bold transition whitespace-nowrap"
            >
              <Menu className="w-4 h-4 text-brand-cyan" />
              <span>Todos os Produtos</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {/* Client Mode Links */}
            {currentRole === 'CLIENTE' && (
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={() => navigateTo('home')}
                  className={`px-3 py-2 rounded-lg transition whitespace-nowrap ${
                    currentView === 'home'
                      ? 'text-brand-yellow font-bold bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                {/*  Início*/}
                {/*</button>*/}
                {/*<button*/}
                {/*  onClick={() => navigateTo('catalogo')}*/}
                {/*  className={`px-3 py-2 rounded-lg transition whitespace-nowrap ${*/}
                {/*    currentView === 'catalogo'*/}
                {/*      ? 'text-brand-yellow font-bold bg-white/10'*/}
                {/*      : 'text-gray-300 hover:text-white hover:bg-white/5'*/}
                {/*  }`}*/}
                {/*>*/}
                  Catálogo Completo
                </button>
                <button
                  onClick={() => navigateTo('meus-pedidos')}
                  className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                    currentView === 'meus-pedidos' || currentView === 'detalhes-pedido-cliente'
                      ? 'text-brand-yellow font-bold bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Meus Pedidos</span>
                </button>
                <button
                  onClick={() => navigateTo('catalogo', { category: 'Adesivos & Rótulos' })}
                  className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition whitespace-nowrap"
                >
                  Adesivos & Lacres
                </button>
                <button
                  onClick={() => navigateTo('catalogo', { category: 'Brindes & Copos' })}
                  className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition whitespace-nowrap flex items-center gap-1 text-pink-400 font-semibold"
                >
                  <Coffee className="w-3.5 h-3.5" />
                  <span>Copos & Brindes</span>
                </button>
                <button
                  onClick={() => navigateTo('catalogo', { category: 'Comunicação Visual' })}
                  className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition whitespace-nowrap"
                >
                  Banners & Fachadas
                </button>
                <button
                  onClick={() => navigateTo('catalogo', { category: 'Cartão de Visita' })}
                  className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition whitespace-nowrap"
                >
                  Cartões de Visita
                </button>
              </div>
            )}

            {/* Responsável Mode Navigation */}
            {currentRole === 'RESPONSAVEL_GRAFICA' && (
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={() => navigateTo('resp-dashboard')}
                  className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                    currentView === 'resp-dashboard'
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dashboard Operador</span>
                </button>
                <button
                  onClick={() => navigateTo('resp-pedidos')}
                  className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                    currentView === 'resp-pedidos'
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Fila de Pedidos & Validação</span>
                </button>
                <button
                  onClick={() => navigateTo('resp-analise', { orderId: 'PRP-1043' })}
                  className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                    currentView === 'resp-analise'
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>Análise de Pré-Impressão</span>
                </button>
                <button
                  onClick={() => navigateTo('resp-producao')}
                  className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                    currentView === 'resp-producao'
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Acompanhar Produção</span>
                </button>
              </div>
            )}

            {/* Administrador Mode Navigation */}
            {currentRole === 'ADMINISTRADOR' && (
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={() => navigateTo('admin-dashboard')}
                  className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                    currentView === 'admin-dashboard'
                      ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5 text-purple-400" />
                  <span>Dashboard Admin</span>
                </button>
                <button
                  onClick={() => navigateTo('admin-usuarios')}
                  className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                    currentView === 'admin-usuarios'
                      ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  <span>Gerenciar Usuários</span>
                </button>
                <button
                  onClick={() => navigateTo('admin-clientes')}
                  className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                    currentView === 'admin-clientes'
                      ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  <span>Gerenciar Clientes</span>
                </button>
                <button
                  onClick={() => navigateTo('admin-servicos')}
                  className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                    currentView === 'admin-servicos'
                      ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Tag className="w-3.5 h-3.5 text-purple-400" />
                  <span>Serviços & Requisitos</span>
                </button>
                <button
                  onClick={() => navigateTo('admin-precos')}
                  className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                    currentView === 'admin-precos'
                      ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5 text-purple-400" />
                  <span>Configurar Preços & Margens</span>
                </button>
              </div>
            )}

          </div>

          {/*/!* Quick Production Highlight *!/*/}
          {/*<div className="hidden xl:flex items-center gap-2 text-gray-400 text-[11px] whitespace-nowrap pl-4">*/}
          {/*  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>*/}
          {/*  <span>Produção Rápida em Delmiro Gouveia: Banners em 24h</span>*/}
          {/*</div>*/}

        </div>
      </div>

      {/* Mega Menu Dropdown */}
      {megaMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-20"
            onClick={() => setMegaMenuOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 bg-white text-gray-900 border-b border-gray-200 shadow-2xl p-6 z-30">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-cyan" />
                  Todos os Departamentos Gráficos
                </h3>
                <span className="text-xs text-gray-500">
                  Impressão Digital, Offset e Brindes Personalizados
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((category) => {
                  const catServices = services.filter(s => s.category === category);
                  return (
                    <div key={category} className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy border-b border-gray-100 pb-1">
                        {category}
                      </h4>
                      <ul className="space-y-1.5">
                        {catServices.map(service => (
                          <li key={service.id}>
                            <button
                              onClick={() => {
                                setMegaMenuOpen(false);
                                navigateTo('novo-pedido', { serviceId: service.id });
                              }}
                              className="text-xs text-gray-600 hover:text-brand-navy hover:font-bold transition text-left flex items-center justify-between w-full group"
                            >
                              <span>{service.name}</span>
                              <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition">
                                A partir de R$ {service.priceFrom.toFixed(2).replace('.', ',')}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
