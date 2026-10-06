import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, Circle } from 'lucide-react';

export function OrderTimeline({ timeline = [] }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="py-4">
      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
        Linha do Tempo & Histórico de Andamento
      </h4>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
        {timeline.map((step, idx) => {
          let Icon = Circle;
          let iconColor = 'text-gray-300 bg-white ring-4 ring-gray-100';

          if (step.alert) {
            Icon = AlertTriangle;
            iconColor = 'text-rose-600 bg-rose-50 ring-4 ring-rose-100';
          } else if (step.done) {
            Icon = CheckCircle2;
            iconColor = 'text-emerald-600 bg-emerald-50 ring-4 ring-emerald-100';
          } else if (step.active) {
            Icon = Clock;
            iconColor = 'text-amber-500 bg-amber-50 ring-4 ring-amber-100 animate-pulse';
          }

          return (
            <div key={idx} className="relative flex items-start gap-3 text-xs">
              {/* Dot / Icon */}
              <div className={`absolute -left-6 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${iconColor}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Text info */}
              <div className="flex-1 bg-white p-3 rounded-xl border border-gray-100 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className={`font-bold ${step.alert ? 'text-rose-700' : step.done ? 'text-gray-900' : 'text-gray-600'}`}>
                    {step.step}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {step.date}
                  </span>
                </div>
                {step.author && (
                  <p className="text-[11px] text-gray-500 mt-1">
                    Responsável / Solicitante: <strong className="text-gray-700">{step.author}</strong>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
