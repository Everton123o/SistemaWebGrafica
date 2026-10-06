import React from 'react';

export function OrderStatusBadge({ status, size = 'md' }) {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs font-semibold';

  switch (status) {
    case 'AGUARDANDO_CORRECAO':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 font-bold animate-pulse ${sizeClasses}`}>
          <span className="w-2 h-2 rounded-full bg-rose-600"></span>
          Aguardando Correção
        </span>
      );
    case 'EM_ANALISE':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-medium ${sizeClasses}`}>
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
          Em Análise Técnica
        </span>
      );
    case 'APROVADO':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-medium ${sizeClasses}`}>
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          Arte Aprovada
        </span>
      );
    case 'EM_PRODUCAO':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300 font-medium ${sizeClasses}`}>
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          Em Produção
        </span>
      );
    case 'FINALIZADO':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-purple-100 text-purple-800 border border-purple-300 font-medium ${sizeClasses}`}>
          <span className="w-2 h-2 rounded-full bg-purple-600"></span>
          Pronto / Finalizado
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-700 border border-gray-300 ${sizeClasses}`}>
          {status}
        </span>
      );
  }
}

export function ArtStatusBadge({ status }) {
  switch (status) {
    case 'APROVADA':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-300">
          ✓ Aprovada
        </span>
      );
    case 'REPROVADA':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-300">
          ✕ Reprovada
        </span>
      );
    case 'EM_ANALISE':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-300">
          ⏳ Em Análise
        </span>
      );
  }
}
