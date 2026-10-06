import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatusBadge, ArtStatusBadge } from '../../components/common/Badge';
import { OrderTimeline } from '../../components/shared/OrderTimeline';
import { Modal } from '../../components/common/Modal';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  DollarSign,
  Play,
  Layers,
  Eye,
  Sliders,
  Send,
  Printer,
  ShieldAlert,
  Info,
  Clock
} from 'lucide-react';

export function AnalisePedido() {
  const {
    orders,
    selectedOrderId,
    navigateTo,
    requestCorrection,
    approveArtwork,
    releaseToProduction,
    updateQuotation,
    addToast
  } = useApp();

  const order = orders.find(o => o.id === selectedOrderId) || orders[0];

  // Modals state
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);

  // Correction modal form
  const [correctionReasonPreset, setCorrectionReasonPreset] = useState('Resolução da imagem insuficiente (< 150 DPI)');
  const [correctionDetailNote, setCorrectionDetailNote] = useState('');

  // Quotation edit form
  const [costMaterial, setCostMaterial] = useState(order?.quotation?.materialCost || '30.00');
  const [costPrint, setCostPrint] = useState(order?.quotation?.printCost || '20.00');
  const [costFinishing, setCostFinishing] = useState(order?.quotation?.finishingCost || '15.00');
  const [costMarkup, setCostMarkup] = useState(order?.quotation?.markup || '20.00');

  // Preflight checklist items (interactive inspection)
  const [checklist, setChecklist] = useState({
    cmyk: true,
    bleed: false,
    dpi: false,
    curves: true,
    safetyMargin: false
  });

  if (!order) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-gray-200">
        <p className="text-gray-600">Pedido não encontrado.</p>
        <button
          onClick={() => navigateTo('resp-pedidos')}
          className="mt-3 px-4 py-2 bg-brand-navy text-white rounded-xl text-xs font-bold"
        >
          Voltar para pedidos
        </button>
      </div>
    );
  }

  const latestArt = order.artVersions[order.artVersions.length - 1];
  const isArtApproved = latestArt?.status === 'APROVADA';
  const hasPendingCorrections = order.status === 'AGUARDANDO_CORRECAO';
  const canReleaseToProduction = order.status === 'APROVADO' && isArtApproved && !hasPendingCorrections;

  // Handle Correction Submission
  const handleConfirmRequestCorrection = (e) => {
    e.preventDefault();
    if (!correctionReasonPreset) {
      addToast('Selecione ou informe o motivo da correção.', 'warning');
      return;
    }
    requestCorrection(order.id, correctionReasonPreset, correctionDetailNote);
    setIsCorrectionModalOpen(false);
    setCorrectionDetailNote('');
  };

  // Handle Approval
  const handleConfirmApproval = () => {
    approveArtwork(order.id, 'Arte aprovada tecnicamente: resolução, sangria e CMYK validados.');
    setIsApprovalModalOpen(false);
  };

  // Handle Release
  const handleConfirmRelease = () => {
    releaseToProduction(order.id);
    setIsReleaseModalOpen(false);
  };

  // Handle Save Quotation
  const handleSaveQuotation = (e) => {
    e.preventDefault();
    const total = (
      parseFloat(costMaterial || 0) +
      parseFloat(costPrint || 0) +
      parseFloat(costFinishing || 0) +
      parseFloat(costMarkup || 0)
    );

    updateQuotation(order.id, {
      materialCost: parseFloat(costMaterial).toFixed(2),
      printCost: parseFloat(costPrint).toFixed(2),
      finishingCost: parseFloat(costFinishing).toFixed(2),
      markup: parseFloat(costMarkup).toFixed(2),
      total: parseFloat(total.toFixed(2))
    });
    setIsQuotationModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('resp-pedidos')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-brand-navy transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para fila de pedidos</span>
        </button>

        <span className="text-xs text-gray-500">
          Estação de Análise Técnica: <strong className="text-brand-navy">#{order.id}</strong>
        </span>
      </div>

      {/* Main Order Header & Action Bar */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-2xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono font-black text-lg text-gray-900 bg-gray-100 px-3 py-1 rounded-xl border border-gray-200">
                #{order.id}
              </span>
              <OrderStatusBadge status={order.status} size="lg" />
              <span className="text-xs text-gray-400">
                Solicitado em {new Date(order.createdAt).toLocaleDateString('pt-BR')}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-gray-900 mt-2">
              {order.serviceName}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Cliente: <strong>{order.clientName}</strong> ({order.clientCompany}) • Tel: {order.clientPhone}
            </p>
          </div>

          {/* Action Buttons: Aprovar, Solicitar Correção, Liberar Produção */}
          <div className="flex items-center gap-2 flex-wrap">
            
            {/* Solicitar Correção */}
            <button
              onClick={() => setIsCorrectionModalOpen(true)}
              className="px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center gap-1.5 transition shadow-2xs"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Solicitar Correção</span>
            </button>

            {/* Aprovar Arte */}
            <button
              onClick={() => setIsApprovalModalOpen(true)}
              className="px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs flex items-center gap-1.5 transition shadow-2xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Aprovar Arte</span>
            </button>

            {/* Orçamento */}
            <button
              onClick={() => setIsQuotationModalOpen(true)}
              className="px-3.5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center gap-1.5 transition"
            >
              <DollarSign className="w-4 h-4 text-gray-600" />
              <span>Orçamento (R$ {order.totalValue?.toFixed(2)})</span>
            </button>

            {/* LIBERAR PARA PRODUÇÃO (Highlight Button) */}
            <button
              onClick={() => setIsReleaseModalOpen(true)}
              disabled={!canReleaseToProduction}
              className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all ${
                canReleaseToProduction
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white scale-102 hover:scale-105 animate-pulse'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              title={
                !canReleaseToProduction
                  ? 'Ação bloqueada: É necessário aprovar a arte técnica e sanar pendências antes de liberar.'
                  : 'Liberar pedido para impressão na gráfica'
              }
            >
              <Printer className="w-4 h-4" />
              <span>LIBERAR PARA PRODUÇÃO</span>
            </button>

          </div>
        </div>

        {/* Warning if cannot release yet */}
        {!canReleaseToProduction && order.status !== 'EM_PRODUCAO' && order.status !== 'FINALIZADO' && (
          <div className="flex items-center gap-2 text-xs bg-amber-50 text-amber-800 p-3 rounded-xl border border-amber-200">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Trava de Segurança:</strong> A liberação para produção só fica disponível após a aprovação técnica da arte (status Aprovado) e ausência de pendências de correção.
            </span>
          </div>
        )}

        {/* Order Specifications Breakdown */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Requisitos Preenchidos pelo Cliente
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {Object.entries(order.specs || {}).map(([key, val]) => (
              <div key={key} className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <span className="text-gray-400 text-[10px] uppercase font-bold block capitalize">
                  {key}
                </span>
                <span className="font-bold text-gray-800 block mt-0.5">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Technical Inspection & History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Technical File Preflight (Verificar Arquivo) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* File Metadata Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-navy" />
                Verificação Técnica do Arquivo (Versão Atual: v{latestArt?.version || 1})
              </h3>
              <ArtStatusBadge status={latestArt?.status} />
            </div>

            {/* File specs */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Nome do Arquivo:</span>
                <span className="font-mono font-bold text-gray-900">{latestArt?.filename}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tamanho:</span>
                <span className="font-semibold text-gray-800">{latestArt?.fileSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Data de Envio:</span>
                <span className="text-gray-800">{new Date(latestArt?.uploadedAt).toLocaleString('pt-BR')}</span>
              </div>
              {latestArt?.technicalDetails && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Espaço de Cor:</span>
                    <span className="font-bold text-brand-navy">{latestArt.technicalDetails.colorSpace}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Resolução:</span>
                    <span className="font-bold text-emerald-600">{latestArt.technicalDetails.dpi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dimensões Técnicas:</span>
                    <span className="text-gray-800">{latestArt.technicalDetails.dimensionsMm}</span>
                  </div>
                </>
              )}
            </div>

            {/* Visual Preview */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-950 text-white flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent opacity-20 pointer-events-none"></div>
              
              <div className="w-36 h-36 border-2 border-dashed border-brand-cyan/60 rounded-lg flex items-center justify-center bg-gray-900 shadow-xl relative">
                <span className="absolute top-1 left-1 text-[9px] text-brand-cyan font-mono">Linha de Sangria (+3mm)</span>
                <div className="w-28 h-28 border border-white/40 rounded flex flex-col items-center justify-center text-center p-2">
                  <span className="text-[10px] font-bold text-white uppercase">{order.serviceName}</span>
                  <span className="text-[9px] text-gray-400 mt-1">Área Segura de Impressão</span>
                </div>
              </div>

              <div className="mt-3 text-center">
                <p className="text-xs font-semibold text-gray-200">
                  Visualização da Arte Digital
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  Verifique se textos e logotipos estão dentro da margem de segurança.
                </p>
              </div>
            </div>

            {/* Preflight Interactive Checklist */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2.5">
                Checklist Técnico do Operador
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { id: 'cmyk', label: 'Cores em modo CMYK (Sem RGB / Pantone não convertido)' },
                  { id: 'bleed', label: 'Sangria de corte mínima de 1.5mm a 3mm conferida' },
                  { id: 'dpi', label: 'Resolução de imagem adequada (mínimo 150 DPI / 300 DPI ideal)' },
                  { id: 'curves', label: 'Textos convertidos em curvas / fontes incorporadas' },
                  { id: 'safetyMargin', label: 'Margem de segurança interna de corte respeitada' }
                ].map(item => (
                  <label key={item.id} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist[item.id]}
                      onChange={(e) => setChecklist({ ...checklist, [item.id]: e.target.checked })}
                      className="rounded text-brand-navy focus:ring-brand-cyan"
                    />
                    <span className={checklist[item.id] ? 'text-gray-900 font-semibold' : 'text-gray-500'}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Artwork Version History */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-100 pb-2">
              Histórico de Versões da Arte (Controle de Auditoria)
            </h3>

            <div className="space-y-3">
              {order.artVersions.map(art => (
                <div
                  key={art.version}
                  className={`p-3.5 rounded-xl border text-xs ${
                    art.status === 'APROVADA'
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : art.status === 'REPROVADA'
                      ? 'bg-rose-50/50 border-rose-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 font-mono">Arte v{art.version}</span>
                      <ArtStatusBadge status={art.status} />
                      <span className="text-[11px] text-gray-500">({art.filename})</span>
                    </div>
                    <span className="text-[10px] text-gray-400">
                      {new Date(art.uploadedAt).toLocaleString('pt-BR')}
                    </span>
                  </div>

                  {art.rejectionReason && (
                    <div className="mt-2 text-rose-700 bg-rose-100/50 p-2 rounded-lg">
                      <strong>Motivo:</strong> {art.rejectionReason}
                      {art.correctionNote && <p className="mt-0.5">"{art.correctionNote}"</p>}
                    </div>
                  )}

                  {art.clientCorrectionNote && (
                    <div className="mt-2 text-gray-700 bg-white p-2 rounded-lg border border-gray-200">
                      <strong>Nota do Cliente:</strong> "{art.clientCorrectionNote}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Timeline & Budget breakdown */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Detailed Budget Breakdown Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                Formação de Orçamento
              </h3>
              <button
                onClick={() => setIsQuotationModalOpen(true)}
                className="text-xs text-brand-navy hover:underline font-bold"
              >
                Editar Custos
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 text-gray-600">
                <span>Custo de Matéria-Prima:</span>
                <span className="font-semibold">R$ {order.quotation?.materialCost || '30.00'}</span>
              </div>
              <div className="flex justify-between py-1 text-gray-600">
                <span>Custo de Impressão (Tinta/Energia):</span>
                <span className="font-semibold">R$ {order.quotation?.printCost || '20.00'}</span>
              </div>
              <div className="flex justify-between py-1 text-gray-600">
                <span>Custo de Acabamento & Refile:</span>
                <span className="font-semibold">R$ {order.quotation?.finishingCost || '15.00'}</span>
              </div>
              <div className="flex justify-between py-1 text-gray-600">
                <span>Margem de Lucro da Gráfica:</span>
                <span className="font-semibold text-emerald-700">R$ {order.quotation?.markup || '20.00'}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline font-bold">
                <span className="text-xs uppercase text-gray-800">Total do Orçamento:</span>
                <span className="text-xl font-black text-brand-navy">
                  R$ {order.totalValue?.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline of Order */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
            <OrderTimeline timeline={order.timeline} />
          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* MODAL: SOLICITAR CORREÇÃO */}
      {/* ============================================================ */}
      <Modal
        isOpen={isCorrectionModalOpen}
        onClose={() => setIsCorrectionModalOpen(false)}
        title="Solicitar Correção de Arquivo ao Cliente"
      >
        <form onSubmit={handleConfirmRequestCorrection} className="space-y-4">
          <div className="bg-amber-50 text-amber-900 p-3 rounded-xl border border-amber-200 text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p>
              O pedido será colocado em <strong>Aguardando Correção</strong> e o cliente receberá esta notificação no portal dele com a área para enviar a versão corrigida (Arte v{order.artVersions.length + 1}).
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Motivo Padrão da Inconformidade
            </label>
            <select
              value={correctionReasonPreset}
              onChange={(e) => setCorrectionReasonPreset(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-brand-navy"
            >
              <option value="Resolução da imagem insuficiente (< 150 DPI)">
                Resolução da imagem insuficiente (&lt; 150 DPI)
              </option>
              <option value="Arquivo sem sangria de corte (necessário 1.5mm a 3mm)">
                Arquivo sem sangria de corte (necessário 1.5mm a 3mm)
              </option>
              <option value="Textos ou logotipos fora da margem de segurança (risco de corte)">
                Textos ou logotipos fora da margem de segurança (risco de corte)
              </option>
              <option value="Espaço de cores em RGB (conversão causará distorção de tom)">
                Espaço de cores em RGB (conversão causará distorção de tom)
              </option>
              <option value="Fontes não incorporadas ou não convertidas em curvas">
                Fontes não incorporadas ou não convertidas em curvas
              </option>
              <option value="Dimensão do arquivo incompatível com o produto contratado">
                Dimensão do arquivo incompatível com o produto contratado
              </option>
              <option value="Outro motivo específico">Outro motivo específico</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Orientações Detalhadas para o Cliente
            </label>
            <textarea
              rows={4}
              value={correctionDetailNote}
              onChange={(e) => setCorrectionDetailNote(e.target.value)}
              placeholder="Ex: Por favor, aumente a sangria na parte inferior e converta as cores para CMYK. O texto do rodapé está a apenas 1mm da linha de corte."
              className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:border-brand-navy"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsCorrectionModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Confirmar e Notificar Cliente</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* ============================================================ */}
      {/* MODAL: APROVAR ARTE */}
      {/* ============================================================ */}
      <Modal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        title="Confirmar Aprovação Técnica da Arte Gráfica"
      >
        <div className="space-y-4">
          <div className="bg-emerald-50 text-emerald-900 p-4 rounded-xl border border-emerald-200 text-xs space-y-2">
            <p className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Você está aprovando a arte técnica do Pedido #{order.id}
            </p>
            <p className="text-emerald-800">
              Ao confirmar a aprovação, o arquivo será classificado como <strong>APROVADO</strong> e o pedido estará pronto para a Liberação de Produção.
            </p>
          </div>

          <p className="text-xs text-gray-600">
            Confirma que verificou as dimensões, resolução, sangria e espaço de cor do arquivo <strong>{latestArt?.filename}</strong>?
          </p>

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button
              onClick={() => setIsApprovalModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50"
            >
              Voltar
            </button>
            <button
              onClick={handleConfirmApproval}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirmar Aprovação da Arte</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* ============================================================ */}
      {/* MODAL: LIBERAR PARA PRODUÇÃO */}
      {/* ============================================================ */}
      <Modal
        isOpen={isReleaseModalOpen}
        onClose={() => setIsReleaseModalOpen(false)}
        title="Liberar Pedido para Produção no Chão de Fábrica"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 text-blue-900 p-4 rounded-xl border border-blue-200 text-xs space-y-1.5">
            <p className="font-bold flex items-center gap-1.5 text-brand-navy">
              <Printer className="w-4 h-4 text-brand-cyan" />
              Envio para a Fila de Impressão & Acabamento
            </p>
            <p className="text-blue-800">
              O status do pedido #{order.id} mudará para <strong>EM PRODUÇÃO</strong>. A equipe de impressão receberá as ordens de serviço.
            </p>
          </div>

          <div className="space-y-1.5 text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <p><strong>Produto:</strong> {order.serviceName}</p>
            <p><strong>Cliente:</strong> {order.clientName}</p>
            <p><strong>Arquivo Aprovado:</strong> {latestArt?.filename} (Arte v{latestArt?.version})</p>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button
              onClick={() => setIsReleaseModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmRelease}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md flex items-center gap-1.5"
            >
              <Play className="w-4 h-4" />
              <span>Confirmar Liberação para Produção</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* ============================================================ */}
      {/* MODAL: ORÇAMENTO & CUSTOS */}
      {/* ============================================================ */}
      <Modal
        isOpen={isQuotationModalOpen}
        onClose={() => setIsQuotationModalOpen(false)}
        title="Ajustar / Registrar Orçamento do Pedido"
      >
        <form onSubmit={handleSaveQuotation} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Custo Matéria-Prima (R$)</label>
              <input
                type="number"
                step="0.01"
                value={costMaterial}
                onChange={(e) => setCostMaterial(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Custo Impressão (R$)</label>
              <input
                type="number"
                step="0.01"
                value={costPrint}
                onChange={(e) => setCostPrint(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Custo Acabamentos (R$)</label>
              <input
                type="number"
                step="0.01"
                value={costFinishing}
                onChange={(e) => setCostFinishing(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Margem de Lucro (R$)</label>
              <input
                type="number"
                step="0.01"
                value={costMarkup}
                onChange={(e) => setCostMarkup(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsQuotationModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand-navy hover:bg-brand-dark text-white text-xs font-bold shadow-sm"
            >
              Salvar Orçamento
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
