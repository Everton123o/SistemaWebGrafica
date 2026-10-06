import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatusBadge } from '../../components/common/Badge';
import { Search, Filter, Eye, ArrowUpDown, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export function PedidosResponsavel() {
  const { orders, navigateTo } = useApp();
  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyWithPendencies, setOnlyWithPendencies] = useState(false);

  const filtered = orders.filter(order => {
    const matchesStatus = statusFilter === 'TODOS' || order.status === statusFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.clientCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPendencies = !onlyWithPendencies || order.status === 'AGUARDANDO_CORRECAO';
    return matchesStatus && matchesSearch && matchesPendencies;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <FileText className="w-6 h-6 text-brand-navy" />
              Gestão & Fila Geral de Pedidos
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Filtre pedidos por status, pesquise por cliente ou código e abra para análise de pré-impressão.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition">
              <input
                type="checkbox"
                checked={onlyWithPendencies}
                onChange={(e) => setOnlyWithPendencies(e.target.checked)}
                className="rounded text-rose-600 focus:ring-rose-500"
              />
              <span className="flex items-center gap-1 text-rose-700">
                <AlertTriangle className="w-3.5 h-3.5" />
                Apenas com pendências
              </span>
            </label>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Status chips */}
          <div className="md:col-span-8 flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'TODOS', label: 'Todos' },
              { id: 'EM_ANALISE', label: 'Em Análise' },
              { id: 'AGUARDANDO_CORRECAO', label: 'Aguardando Correção' },
              { id: 'APROVADO', label: 'Aprovados' },
              { id: 'EM_PRODUCAO', label: 'Em Produção' },
              { id: 'FINALIZADO', label: 'Finalizados' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  statusFilter === tab.id
                    ? 'bg-brand-navy text-white shadow-xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="md:col-span-4 relative">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por cliente, empresa ou código..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-none focus:border-brand-navy"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
          </div>

        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Código / Data</th>
                <th className="py-3 px-4">Cliente & Empresa</th>
                <th className="py-3 px-4">Serviço / Produto</th>
                <th className="py-3 px-4">Arquivo / Versão</th>
                <th className="py-3 px-4">Status & Situação</th>
                <th className="py-3 px-4 text-right">Valor Total</th>
                <th className="py-3 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length > 0 ? (
                filtered.map(order => {
                  const latestArt = order.artVersions[order.artVersions.length - 1];
                  const hasPending = order.status === 'AGUARDANDO_CORRECAO';

                  return (
                    <tr
                      key={order.id}
                      className={`hover:bg-gray-50/60 transition ${
                        hasPending ? 'bg-rose-50/20' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-gray-900 block">
                          #{order.id}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-gray-900 block">
                          {order.clientName}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          {order.clientCompany}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-medium text-gray-800 block">
                          {order.serviceName}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          Qtd: {order.specs?.quantidade || '1'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-mono text-gray-700 block truncate max-w-[150px]">
                          {latestArt?.filename || 'Sem arquivo'}
                        </span>
                        <span className="text-[10px] font-bold text-brand-navy">
                          Arte v{latestArt?.version || 1}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <OrderStatusBadge status={order.status} size="sm" />
                        {hasPending && (
                          <span className="text-[10px] text-rose-600 font-semibold block mt-1">
                            Aguardando cliente
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right font-bold text-gray-900">
                        R$ {order.totalValue?.toFixed(2).replace('.', ',')}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => navigateTo('resp-analise', { orderId: order.id })}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-navy hover:bg-brand-dark text-white font-bold text-xs shadow-2xs transition"
                          title="Abrir estação de análise e validação técnica"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Analisar</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    Nenhum pedido encontrado para os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
