import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatusBadge, ArtStatusBadge } from '../../components/common/Badge';
import { OrderTimeline } from '../../components/shared/OrderTimeline';
import { FileUploadZone } from '../../components/shared/FileUploadZone';
import {
  ArrowLeft,
  AlertTriangle,
  UploadCloud,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Send,
  Download,
  Info
} from 'lucide-react';

export function DetalhesPedidoCliente() {
  const { orders, selectedOrderId, navigateTo, submitClientCorrection, addToast } = useApp();

  const order = orders.find(o => o.id === selectedOrderId) || orders[0];

  // Correction submission state
  const [newCorrectionFile, setNewCorrectionFile] = useState(null);
  const [correctionNote, setCorrectionNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!order) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-gray-200">
        <p className="text-gray-600">Pedido não encontrado.</p>
        <button
          onClick={() => navigateTo('meus-pedidos')}
          className="mt-3 px-4 py-2 bg-brand-navy text-white rounded-xl text-xs font-bold"
        >
          Voltar para meus pedidos
        </button>
      </div>
    );
  }

  const isAwaitingCorrection = order.status === 'AGUARDANDO_CORRECAO';
  const latestArt = order.artVersions[order.artVersions.length - 1];

  const handleSubmitCorrection = (e) => {
    e.preventDefault();
    if (!newCorrectionFile) {
      addToast('Por favor, anexe o arquivo com as correções solicitadas.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitClientCorrection(order.id, newCorrectionFile, correctionNote);
      setNewCorrectionFile(null);
      setCorrectionNote('');
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('meus-pedidos')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-brand-navy transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Meus Pedidos</span>
        </button>

        <span className="text-xs text-gray-400">
          Pedido: <strong className="text-gray-800">#{order.id}</strong>
        </span>
      </div>

      {/* Main Order Header */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono font-black text-lg text-gray-900 bg-gray-100 px-3 py-1 rounded-xl border border-gray-200">
                #{order.id}
              </span>
              <OrderStatusBadge status={order.status} size="lg" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 mt-2">
              {order.serviceName}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Solicitado em {new Date(order.createdAt).toLocaleString('pt-BR')} por {order.clientName}
            </p>
          </div>

          <div className="text-left sm:text-right bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-[10px] text-gray-400 uppercase font-bold block">
              Valor Total do Pedido
            </span>
            <span className="text-2xl font-black text-brand-navy block">
              R$ {order.totalValue?.toFixed(2).replace('.', ',')}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold">
              {order.quotation?.status || 'Orçamento Aprovado'}
            </span>
          </div>
        </div>

        {/* Specifications Grid */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
            Especificações Contratadas
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {Object.entries(order.specs || {}).map(([key, val]) => (
              <div key={key} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-semibold capitalize">
                  {key}
                </span>
                <span className="font-bold text-gray-800 block mt-0.5">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {order.observations && (
          <div className="bg-blue-50/60 border border-blue-100 p-3.5 rounded-xl text-xs text-gray-700">
            <strong className="text-brand-navy block mb-0.5">Observações do Cliente:</strong>
            {order.observations}
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* CRITICAL FEATURE: CORRECTION REQUEST BOX & SUBMISSION FORM */}
      {/* ============================================================ */}
      {isAwaitingCorrection && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-6 shadow-md space-y-5 animate-in fade-in duration-300">
          
          {/* Header of Correction */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                Pendência Técnica Identificada
              </span>
              <h2 className="text-base sm:text-lg font-black text-rose-950 mt-1">
                A pré-impressão solicitou correção no arquivo da arte gráfica
              </h2>
              <p className="text-xs text-rose-800 mt-0.5">
                Para que o seu material saia com a melhor qualidade sem cortes indesejados, ajuste seu arquivo e envie uma nova versão abaixo.
              </p>
            </div>
          </div>

          {/* Operator's Feedback & Motivo */}
          <div className="bg-white rounded-xl p-4 border border-rose-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-rose-900 border-b border-rose-100 pb-2">
              <span>Motivo: <strong className="text-rose-700">{latestArt?.rejectionReason || 'Arquivo fora dos padrões de impressão'}</strong></span>
              <span className="text-[11px] text-gray-400 font-normal">
                Analisado por {latestArt?.reviewedBy || 'Equipe Técnica'}
              </span>
            </div>

            <p className="text-xs text-gray-800 leading-relaxed font-medium">
              "{latestArt?.correctionNote || 'Por favor, revise a sangria e o espaço de cores do arquivo.'}"
            </p>
          </div>

          {/* Form to submit Arte v2 / v3 */}
          <form onSubmit={handleSubmitCorrection} className="bg-white rounded-xl p-5 border border-rose-200 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
              <UploadCloud className="w-4 h-4 text-rose-600" />
              <span>Enviar Nova Versão da Arte (Arte v{order.artVersions.length + 1})</span>
            </h3>

            <FileUploadZone
              selectedFile={newCorrectionFile}
              onFileSelect={(file) => setNewCorrectionFile(file)}
              onRemoveFile={() => setNewCorrectionFile(null)}
              label="Selecione o arquivo corrigido"
            />

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                O que foi alterado nesta versão? (Observação para a gráfica)
              </label>
              <textarea
                rows={2}
                value={correctionNote}
                onChange={(e) => setCorrectionNote(e.target.value)}
                placeholder="Ex: Converti as fontes para curvas, adicionei a sangria de 3mm e converti as cores para CMYK."
                className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-none focus:border-rose-500 transition"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !newCorrectionFile}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs text-white transition flex items-center gap-2 shadow-sm ${
                  isSubmitting || !newCorrectionFile
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-rose-600 hover:bg-rose-700 hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Enviando nova versão...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirmar e Reenviar Arte Corrigida</span>
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      )}

      {/* ============================================================ */}
      {/* ARTWORK VERSIONS HISTORY TABLE & PREVIEWS */}
      {/* ============================================================ */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-cyan" />
              Histórico de Versões da Arte Gráfica
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Todas as versões enviadas permanecem registradas para controle de qualidade e auditoria.
            </p>
          </div>
          <span className="text-xs font-semibold text-gray-500">
            Total: {order.artVersions.length} versão(ões)
          </span>
        </div>

        <div className="space-y-3">
          {order.artVersions.map((art) => (
            <div
              key={art.version}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                art.status === 'APROVADA'
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : art.status === 'REPROVADA'
                  ? 'bg-rose-50/40 border-rose-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-black text-xs text-gray-800 shadow-2xs">
                  v{art.version}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs text-gray-900 font-mono">
                      {art.filename}
                    </span>
                    <ArtStatusBadge status={art.status} />
                    <span className="text-[11px] text-gray-400">
                      ({art.fileSize})
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-500 mt-1">
                    Enviado em: {new Date(art.uploadedAt).toLocaleString('pt-BR')}
                    {art.reviewedBy && ` • Revisado por ${art.reviewedBy}`}
                  </p>

                  {art.rejectionReason && (
                    <p className="text-xs text-rose-700 font-semibold mt-1">
                      Motivo da reprovação: {art.rejectionReason}
                    </p>
                  )}
                  {art.clientCorrectionNote && (
                    <p className="text-xs text-gray-600 italic mt-0.5">
                      Nota do cliente: "{art.clientCorrectionNote}"
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="text-[11px] text-gray-400 font-medium">
                  {art.status === 'APROVADA' ? 'Versão Final Aprovada' : 'Arquivo Arquivado'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* TIMELINE OF ORDER PROGRESS */}
      {/* ============================================================ */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-2xs">
        <OrderTimeline timeline={order.timeline} />
      </div>

    </div>
  );
}
