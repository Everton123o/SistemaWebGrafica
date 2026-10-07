import React from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatusBadge } from '../../components/common/Badge';
import {
  Wrench,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Layers,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Package
} from 'lucide-react';

export function DashboardResponsavel() {
  const { orders, navigateTo } = useApp();

  const emAnalise = orders.filter(o => o.status === 'EM_ANALISE');
  const aguardandoCorrecao = orders.filter(o => o.status === 'AGUARDANDO_CORRECAO');
  const aprovados = orders.filter(o => o.status === 'APROVADO');
  const emProducao = orders.filter(o => o.status === 'EM_PRODUCAO');
  const finalizados = orders.filter(o => o.status === 'FINALIZADO');

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-dark to-brand-navy rounded-2xl p-6 text-white shadow-md border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/30">
            <Wrench className="w-3.5 h-3.5" />
            <span>Setor de Pré-Impressão & Produção Gráfica</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Painel Técnico do Responsável da Gráfica
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            Validação técnica de arquivos, análise de sangria/CMYK, orçamentos e liberação para produção.
          </p>
        </div>

        <button
          onClick={() => navigateTo('resp-pedidos')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-black text-xs transition shadow-sm self-start md:self-auto flex items-center gap-2"
        >
          <span>Ver Fila Completa de Pedidos</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Em Análise */}
        <div
          onClick={() => navigateTo('resp-pedidos', { filter: 'EM_ANALISE' })}
          className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs hover:border-amber-400 cursor-pointer transition transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Aguardando Análise</span>
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 mt-2">
            {emAnalise.length}
          </div>
          <p className="text-[10px] text-gray-500 mt-1">Arquivos novos para checagem</p>
        </div>

        {/* Aguardando Correção */}
        <div
          onClick={() => navigateTo('resp-pedidos', { filter: 'AGUARDANDO_CORRECAO' })}
          className="bg-white rounded-2xl border border-rose-200 p-4 shadow-2xs hover:border-rose-400 cursor-pointer transition transform hover:-translate-y-1 ring-1 ring-rose-50"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-rose-500 tracking-wider">Aguardando Cliente</span>
            <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-600 mt-2">
            {aguardandoCorrecao.length}
          </div>
          <p className="text-[10px] text-rose-700 mt-1">Correções solicitadas</p>
        </div>

        {/* Aprovados */}
        <div
          onClick={() => navigateTo('resp-pedidos', { filter: 'APROVADO' })}
          className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs hover:border-emerald-400 cursor-pointer transition transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Artes Aprovadas</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 mt-2">
            {aprovados.length}
          </div>
          <p className="text-[10px] text-gray-500 mt-1">Prontos p/ liberação</p>
        </div>

        {/* Em Produção */}
        <div
          onClick={() => navigateTo('resp-producao')}
          className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs hover:border-blue-400 cursor-pointer transition transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Em Produção</span>
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-blue-600 mt-2">
            {emProducao.length}
          </div>
          <p className="text-[10px] text-gray-500 mt-1">Na impressora / acabamento</p>
        </div>

        {/* Finalizados */}
        <div
          onClick={() => navigateTo('resp-pedidos', { filter: 'FINALIZADO' })}
          className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs hover:border-purple-400 cursor-pointer transition transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Finalizados</span>
            <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-purple-600 mt-2">
            {finalizados.length}
          </div>
          <p className="text-[10px] text-gray-500 mt-1">Disponíveis no balcão</p>
        </div>

      </div>

      {/* Main Action Sections: Pedidos que exigem ação imediata */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Fila de Análise Prioritária */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-amber-500" />
              Fila de Análise Técnica Imediata
            </h2>
            <span className="text-xs font-semibold text-amber-600">
              {emAnalise.length} aguardando
            </span>
          </div>

          <div className="space-y-3">
            {emAnalise.length > 0 ? (
              emAnalise.map(order => (
                <div
                  key={order.id}
                  className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 flex items-center justify-between gap-4 hover:bg-amber-50 transition"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200">
                        #{order.id}
                      </span>
                      <span className="text-xs font-bold text-gray-800">{order.serviceName}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Cliente: <strong>{order.clientName}</strong> ({order.clientCompany})
                    </p>
                    <span className="text-[11px] text-amber-700 font-semibold block mt-0.5">
                      Arquivo: {order.artVersions[order.artVersions.length - 1]?.filename}
                    </span>
                  </div>

                  <button
                    onClick={() => navigateTo('resp-analise', { orderId: order.id })}
                    className="px-4 py-2 bg-brand-navy hover:bg-brand-dark text-white rounded-xl text-xs font-bold whitespace-nowrap shadow-xs transition"
                  >
                    Analisar Arte
                  </button>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400 text-xs">
                Nenhum pedido aguardando análise no momento. Todos em dia!
              </div>
            )}
          </div>
        </div>

        {/* Right: Prontos para Produção (Necessitam do botão "Liberar para Produção") */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Prontos para Produção
            </h2>
            <span className="text-xs font-semibold text-emerald-600">
              {aprovados.length} aprovado(s)
            </span>
          </div>

          <div className="space-y-3">
            {aprovados.length > 0 ? (
              aprovados.map(order => (
                <div
                  key={order.id}
                  className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/30 flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="font-mono font-bold text-xs text-gray-900">
                      #{order.id}
                    </span>
                    <p className="text-xs font-bold text-gray-800 leading-snug">
                      {order.serviceName}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {order.clientName} • R$ {order.totalValue?.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => navigateTo('resp-analise', { orderId: order.id })}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold whitespace-nowrap shadow-xs transition"
                  >
                    Liberar
                  </button>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400 text-xs">
                Nenhum pedido aprovado pendente de liberação.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
