import React from 'react';

/**
 * Standalone layout for authentication screens (login, cadastro):
 * yellow brand bar with the PrintPro logo and a white content area.
 */
export function AuthLayout({ onLogoClick, topLeft, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <header className="w-full bg-[#ffdd00] h-[88px] flex items-center justify-center border-b border-amber-300/80">
        <button
          type="button"
          onClick={onLogoClick}
          className="flex items-center gap-3 text-left group focus:outline-none"
          title="Voltar para a loja"
        >
          <div className="w-12 h-12 rounded-xl bg-black p-1 flex items-center justify-center shadow-md overflow-hidden border border-gray-800 group-hover:scale-105 transition-transform">
            <img
              src="/logo-printpro.jpg"
              alt="Logo PrintPro Gráfica"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-gray-900 leading-none">
              PRINT<span className="text-brand-navy">PRO</span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-800 mt-0.5">
              GRÁFICA
            </span>
          </div>
        </button>
      </header>

      {topLeft && <div className="w-full px-3 sm:px-4 pt-3">{topLeft}</div>}

      {children}
    </div>
  );
}
