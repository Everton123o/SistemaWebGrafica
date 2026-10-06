import React from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatusBadge } from '../../components/common/Badge';
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  Printer,
  Scissors,
  Award,
  PackageCheck,
  Eye
} from 'lucide-react';

export function ProducaoResponsavel() {
  const { orders, advanceProductionStage, navigateTo, addToast } = useApp();

  const productionStages = [
    {
      id: 'Impressão',
      label: '1. Fila de Impressão',
      desc: 'Plotters, offset e sublimação',
      icon: Printer,
      color: 'border-blue-400 bg-blue-50/20'
    },
    {
      id: 'Corte e Acabamento',
      label: '2. Corte & Acabamento',
      desc: 'Refile, ilhós, verniz e dobras',
      icon: Scissors,
      color: 'border-amber-400 bg-amber-50/20'
    },
    {
      id: 'Controle de Qualidade',
      label: '3. Controle de Qualidade',
      desc: 'Inspeção de cores e conferência',
      icon: Award,
      color: 'border-purple-400 bg-purple-50/20'
    },
    {
      id: 'Finalizado / Disponível para Retirada',
      label: '4. Pronto para Retirada',
      desc: 'Disponível no balcão central Delmiro',
      icon: PackageCheck,
      color: 'border-emerald-400 bg-emerald-50/20'
    }
  ];

  // Orders that are in production or finalized
  const productionOrders = orders.filter(o => o.status === 'EM_PRODUCAO' || o.status === 'FINALIZADO');

  const getNextStage = (currentStage) => {
    if (currentStage === 'Impressão') return 'Corte e Acabamento';
    if (currentStage === 'Corte e Acabamento') return 'Controle de Qualidade';
    if (currentStage === 'Controle de Qualidade') return 'Finalizado / Disponível para Retirada';
    return null;
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <Layers className="w-6 h-6 text-brand-navy" />
              Acompanhamento do Chão de Fábrica & Produção
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Controle o fluxo operacional das máquinas de impressão, acabamento e expedição para o balcão.
            </p>
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 px-3.5 py-2 rounded-xl border border-gray-200">
            Total em fluxo produtivo: <strong className="text-gray-900">{productionOrders.length} pedido(s)</strong>
          </div>
        </div>
      </div>

      {/* Production Stages Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {productionStages.map((stage) => {
          const Icon = stage.icon;
          const stageOrders = productionOrders.filter(o => {
            if (stage.id === 'Finalizado / Disponível para Retirada') {
              return o.status === 'FINALIZADO' || o.productionStage === stage.id;
            }
            return o.status === 'EM_PRODUCAO' && (o.productionStage || 'Impressão') === stage.id;
          });

          return (
            <div
              key={stage.id}
              className={`rounded-2xl border ${stage.color} p-4 bg-white shadow-2xs flex flex-col min-h-[480px]`}
            >
              {/* Column Header */}
              <div className="border-b border-gray-100 pb-3 mb-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-brand-navy" />
                    {stage.label}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-gray-100 text-gray-700">
                    {stageOrders.length}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">{stage.desc}</p>
              </div>

              {/* Cards in this stage */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {stageOrders.length > 0 ? (
                  stageOrders.map(order => {
                    const next = getNextStage(order.productionStage || 'Impressão');

                    return (
                      <div
                        key={order.id}
                        className="bg-white rounded-xl border border-gray-200 p-3.5 shadow-2xs hover:shadow-sm transition space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-xs text-gray-900">
                            #{order.id}
                          </span>
                          <OrderStatusBadge status={order.status} size="sm" />
                        </div>

                        <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                          {order.serviceName}
                        </h4>

                        <div className="text-[11px] text-gray-500">
                          <p>Cliente: <strong>{order.clientName}</strong></p>
                          <p>Qtd: {order.specs?.quantidade || '1'}</p>
                        </div>

                        {/* Stage Action */}
                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => navigateTo('resp-analise', { orderId: order.id })}
                            className="p-1 text-gray-400 hover:text-brand-navy"
                            title="Ver análise técnica"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {next && order.status !== 'FINALIZADO' && (
                            <button
                              onClick={() => advanceProductionStage(order.id, next)}
                              className="px-2.5 py-1 bg-brand-navy hover:bg-brand-dark text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                            >
                              <span>Avançar etapa</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}

                          {order.status === 'FINALIZADO' && (
                            <span className="text-[10px] text-purple-700 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Pronto no Balcão
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-gray-300 text-xs italic">
                    Nenhum pedido nesta etapa
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
