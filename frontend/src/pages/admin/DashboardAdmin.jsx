import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  DollarSign,
  Package,
  Users,
  Tag,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle2,
  Sliders
} from 'lucide-react';

export function DashboardAdmin() {
  const { orders, users, clients, services, settings, navigateTo } = useApp();

  const totalBilling = orders.reduce((acc, o) => acc + (o.totalValue || 0), 0);
  const activeOrders = orders.filter(o => o.status !== 'FINALIZADO');
  const finishedOrders = orders.filter(o => o.status === 'FINALIZADO');

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-brand-navy rounded-2xl p-6 text-white shadow-md border border-purple-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2 border border-purple-500/30">
            <Shield className="w-3.5 h-3.5" />
            <span>Painel Administrativo Master</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Gestão Estratégica da PrintPro Gráfica
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            Controle de usuários, carteira de clientes de Delmiro Gouveia, catálogo de serviços e formação de preços.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('admin-precos')}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition shadow-sm flex items-center gap-1.5"
          >
            <Sliders className="w-4 h-4" />
            <span>Configurar Preços</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Faturamento Estimado */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Faturamento Total</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 mt-2">
            R$ {totalBilling.toFixed(2).replace('.', ',')}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Margem média: {settings.markupPercentage}%</p>
        </div>

        {/* Pedidos em Andamento */}
        <div
          onClick={() => navigateTo('resp-pedidos')}
          className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs cursor-pointer hover:border-brand-navy transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Pedidos Ativos</span>
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-brand-navy mt-2">
            {activeOrders.length}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">{finishedOrders.length} pedidos já entregues</p>
        </div>

        {/* Clientes Cadastrados */}
        <div
          onClick={() => navigateTo('admin-clientes')}
          className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs cursor-pointer hover:border-brand-navy transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Clientes Cadastrados</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-purple-900 mt-2">
            {clients.length}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Empresas e pessoas físicas</p>
        </div>

        {/* Serviços no Catálogo */}
        <div
          onClick={() => navigateTo('admin-servicos')}
          className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs cursor-pointer hover:border-brand-navy transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Serviços Ativos</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
              <Tag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 mt-2">
            {services.length}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Com requisitos dinâmicos</p>
        </div>

      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Module 1: Usuários */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">Gerenciar Usuários & Equipe</h3>
            <p className="text-xs text-gray-500 mt-1">
              Controle de acessos, cadastro de operadores de pré-impressão e administradores do sistema.
            </p>
          </div>
          <button
            onClick={() => navigateTo('admin-usuarios')}
            className="mt-4 w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-xs transition flex items-center justify-center gap-1.5"
          >
            <span>Acessar Usuários</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Module 2: Serviços e Requisitos */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-brand-navy flex items-center justify-center mb-3">
              <Tag className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">Catálogo & Requisitos de Serviços</h3>
            <p className="text-xs text-gray-500 mt-1">
              Adicione novos produtos, altere prazos de entrega e configure quais campos são exigidos no formulário.
            </p>
          </div>
          <button
            onClick={() => navigateTo('admin-servicos')}
            className="mt-4 w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-xs transition flex items-center justify-center gap-1.5"
          >
            <span>Acessar Serviços</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Module 3: Preços e Margens */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">Formação de Preços & Margens</h3>
            <p className="text-xs text-gray-500 mt-1">
              Configure tabelas por m² de lona, milheiro de couché, taxas de acabamentos e margem de lucro padrão.
            </p>
          </div>
          <button
            onClick={() => navigateTo('admin-precos')}
            className="mt-4 w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-xs transition flex items-center justify-center gap-1.5"
          >
            <span>Ajustar Preços</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
