import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
      {toasts.map(toast => {
        let bgClass = 'bg-gray-900 text-white';
        let Icon = Info;
        if (toast.type === 'success') {
          bgClass = 'bg-emerald-700 text-white border-l-4 border-emerald-400';
          Icon = CheckCircle2;
        } else if (toast.type === 'warning') {
          bgClass = 'bg-amber-600 text-white border-l-4 border-amber-300';
          Icon = AlertCircle;
        } else if (toast.type === 'error') {
          bgClass = 'bg-rose-700 text-white border-l-4 border-rose-300';
          Icon = XCircle;
        } else if (toast.type === 'info') {
          bgClass = 'bg-brand-navy text-white border-l-4 border-brand-cyan';
          Icon = Info;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl transition-all transform translate-y-0 opacity-100 ${bgClass}`}
          >
            <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-sm leading-snug font-medium">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/80 hover:text-white p-0.5 rounded-lg hover:bg-white/10 transition"
              aria-label="Fechar notificação"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
