import React, { useState } from 'react';
import { Copy, Check, MapPin, Sparkles } from 'lucide-react';
import { RoleSwitcher } from '../common/RoleSwitcher';

export function GivTopBar() {
  const [copied, setCopied] = useState(false);
  const couponCode = 'BEMVINDOPRINT10';

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#ffdd00] border-b border-amber-300/80 text-gray-900 py-1.5 px-3 sm:px-6 text-xs font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Location & highlight */}
        <div className="hidden lg:flex items-center gap-2 text-gray-800 font-medium text-[11px]">
          <span className="inline-flex items-center gap-1 font-semibold text-gray-900">
            <MapPin className="w-3.5 h-3.5 text-brand-navy" />
            Delmiro Gouveia - AL
          </span>
          <span className="text-gray-400">|</span>
          <span>Balcão de Retirada Central & Entrega Rápida</span>
        </div>

        {/* Center: Promo Coupon */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-center">
          <span className="flex items-center gap-1 text-xs text-gray-900 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-brand-navy" />
            Ganhe <strong>10% OFF</strong> na sua <b>primeira compra</b>!
          </span>

          <button
            onClick={handleCopyCoupon}
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all shadow-sm ${
              copied
                ? 'bg-emerald-600 text-white scale-105'
                : 'bg-white hover:bg-gray-100 text-gray-900 hover:scale-105'
            }`}
            title="Clique para copiar cupom de desconto"
          >
            <span className="bg-[#651bac] text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
              CUPOM
            </span>
            <span className="tracking-wide">{couponCode}</span>
            {copied ? (
              <Check className="w-3 h-3 text-white" />
            ) : (
              <Copy className="w-3 h-3 text-gray-500" />
            )}
          </button>
          {copied && (
            <span className="text-[10px] text-emerald-800 font-bold animate-pulse">
              Copiado!
            </span>
          )}
        </div>

        {/* Right: Quick Role Switcher */}
        <div className="flex items-center gap-2">
          <RoleSwitcher />
        </div>
      </div>
    </div>
  );
}
