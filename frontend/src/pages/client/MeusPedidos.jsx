import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatusBadge } from '../../components/common/Badge';
import { Package, Clock, AlertTriangle, ArrowRight, CheckCircle2, Search, Filter } from 'lucide-react';

export function MeusPedidos() {
  const { orders, navigateTo } = useApp();
  const [filterStatus, setFilterStatus] = useState('TODOS');
  const [searchTerm, setSearchTerm] = useState('');

  // Status Filter Tabs
  const statusTabs = [
    { id: 'TODOS', label: 'Todos os Pedidos' },
    { id: 'AGUARDANDO_CORRECAO', label: 'Aguardando Correção ⚠️', alert: true },
    { id: 'EM_ANALISE', label: 'Em Análise Técnica' },
    { id: 'EM_PRODUCAO', label: 'Em Produção' },
    { id: 'FINALIZADO', label: 'Finalizados / Entregues' }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'TODOS' || order.status === filterStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Count pending corrections
  const correctionCount = orders.filter(o => o.status === 'AGUARDANDO_CORRECAO').length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Header */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <Package className="w-6 h-6 text-brand-navy" />
              Meus Pedidos & Acompanhamento
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Acompanhe a validação técnica, aprovação de arte e etapas de produção gráfica.
            </p>
          </div>

          {/* Quick New Order Button */}
          <button
            onClick={() => navigateTo('catalogo')}
            className="px-5 py-2.5 rounded-xl bg-[#ffdd00] hover:bg-[#ffe633] text-gray-950 font-bold text-xs transition shadow-sm self-start md:self-auto"
          >
            + Iniciar Novo Pedido
          </button>
        </div>

        {/* Urgent Warning if any order requires correction! */}
        {correctionCount > 0 && (
          <div className="mt-5 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between gap-3 text-rose-900">
            <div className="flex items-center gap-2.5 text-xs font-semibold">
              <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 animate-bounce" />
              <div>
                <span>Atenção: Você possui <strong>{correctionCount} pedido(s)</strong> aguardando correção de arte gráfica!</span>
                <p className="text-[11px] text-rose-700 font-normal mt-0.5">
                  A equipe de pré-impressão identificou pendências no arquivo enviado para impressão.
                </p>
              </div>
            </div>
            <button
              onClick={() => setFilterStatus('AGUARDANDO_CORRECAO')}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs whitespace-nowrap transition"
            >
              Ver Pendências
            </button>
          </div>
        )}

        {/* Filter Tabs & Search */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
            {statusTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  filterStatus === tab.id
                    ? tab.alert ? 'bg-rose-600 text-white shadow-xs' : 'bg-brand-navy text-white shadow-xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por código ou serviço..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-none focus:border-brand-navy"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
          </div>
        </div>

      </div>

      {/* Orders List / Cards */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => {
            const hasCorrection = order.status === 'AGUARDANDO_CORRECAO';

            return (
              <div
                key={order.id}
                className={`bg-white rounded-2xl border p-5 shadow-2xs hover:shadow-md transition-all ${
                  hasCorrection
                    ? 'border-rose-300 ring-2 ring-rose-100'
                    : 'border-gray-200/90'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left: Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono font-black text-sm text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded-lg border border-gray-200">
                        #{order.id}
                      </span>
                      <OrderStatusBadge status={order.status} />
                      <span className="text-xs text-gray-400">
                        Criado em: {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 leading-snug">
                      {order.serviceName}
                    </h3>

                    {/* Specs Summary */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                      {Object.entries(order.specs || {}).slice(0, 3).map(([k, v]) => (
                        <span key={k} className="bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                          <strong className="capitalize">{k}:</strong> {v}
                        </span>
                      ))}
                    </div>

                    {/* Alert text if pending */}
                    {hasCorrection && (
                      <div className="mt-2 text-xs text-rose-700 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                        <strong>Motivo da Correção:</strong> {order.artVersions[order.artVersions.length - 1]?.rejectionReason}
                      </div>
                    )}
                  </div>

                  {/* Right: Value & Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                    <div className="text-left lg:text-right">
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">
                        Valor Total
                      </span>
                      <span className="text-lg font-black text-brand-navy">
                        R$ {order.totalValue?.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {hasCorrection ? (
                        <button
                          onClick={() => navigateTo('detalhes-pedido-cliente', { orderId: order.id })}
                          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition shadow-sm flex items-center gap-1.5 animate-pulse"
                        >
                          <span>Enviar Correção Agora</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => navigateTo('detalhes-pedido-cliente', { orderId: order.id })}
                          className="px-4 py-2 rounded-xl bg-brand-navy hover:bg-brand-dark text-white font-bold text-xs transition shadow-2xs flex items-center gap-1.5"
                        >
                          <span>Ver Detalhes</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-base font-bold text-gray-800">Nenhum pedido encontrado nesta aba.</p>
            <p className="text-xs text-gray-400 mt-1">
              Todos os seus pedidos cadastrados e atualizados aparecerão aqui.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
