import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ShoppingCart, MessageCircle, User, Bell, Package, ChevronRight } from 'lucide-react';

export function GivHeader() {
  const {
    currentRole,
    currentView,
    navigateTo,
    services,
    orders,
    cart
  } = useApp();

  const [localSearch, setLocalSearch] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Filter services for quick search
  const filteredServices = localSearch.trim()
    ? services.filter(s =>
        s.name.toLowerCase().includes(localSearch.toLowerCase()) ||
        s.category.toLowerCase().includes(localSearch.toLowerCase()) ||
        s.description.toLowerCase().includes(localSearch.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSelectSearchedService = (serviceId) => {
    setShowSearchDropdown(false);
    setLocalSearch('');
    navigateTo('novo-pedido', { serviceId });
  };

  // Pending corrections badge count for Client
  const pendingCorrectionsCount = orders.filter(o => o.status === 'AGUARDANDO_CORRECAO').length;

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo: PrintPro Gráfica */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="relative w-12 h-12 rounded-xl bg-black p-1 flex items-center justify-center shadow-md overflow-hidden border border-gray-800 group-hover:scale-105 transition-transform">
                <img
                  src="/logo-printpro.jpg"
                  alt="Logo PrintPro Gráfica"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to SVG CMYK diamond if file load fails
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 leading-none">
                  PRINT<span className="text-brand-cyan">PRO</span>
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-navy">
                    GRÁFICA
                  </span>
                  {/*<span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-magenta"></span>*/}
                  {/*<span className="text-[9px] text-gray-400 font-medium hidden sm:inline">*/}
                  {/*  Delmiro Gouveia - AL*/}
                  {/*</span>*/}
                </div>
              </div>
            </button>
          </div>

          {/* Central Search Bar (GIV Online style) */}
          <div className="flex-1 max-w-2xl relative hidden md:block">
            <div className="relative">
              <input
                type="search"
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="O que você precisa imprimir hoje? (ex: banner, cartão, lacre, copo...)"
                className="w-full pl-4 pr-12 py-2.5 rounded-full bg-gray-50 border border-gray-300 focus:bg-white focus:border-brand-navy focus:ring-2 focus:ring-brand-cyan/20 text-sm transition outline-none"
              />
              <button
                type="button"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-brand-navy hover:bg-brand-dark text-white rounded-full flex items-center justify-center transition shadow-xs"
                title="Buscar produtos"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Live Search Autocomplete Dropdown */}
            {showSearchDropdown && localSearch.trim() && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowSearchDropdown(false)}
                />
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-40 max-h-96 overflow-y-auto">
                  <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Produtos Encontrados
                  </div>
                  {filteredServices.length > 0 ? (
                    filteredServices.map(service => (
                      <button
                        key={service.id}
                        onClick={() => handleSelectSearchedService(service.id)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition text-left"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-100"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-900 leading-snug">
                              {service.name}
                            </p>
                            <span className="text-xs text-brand-navy/80 font-medium">
                              {service.category}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-400 block">A partir de</span>
                          <span className="text-sm font-bold text-emerald-600">
                            R$ {service.priceFrom.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                      Nenhum produto gráfico encontrado com "{localSearch}".
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* WhatsApp Contact */}
            <a
              href="https://wa.me/5582999330488?text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento%20na%20PrintPro%20Gr%C3%A1fica!%20sou%20marcolinha%20do%20x%20%2B18"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-semibold text-xs transition"
              title="Fale no WhatsApp da PrintPro"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <MessageCircle className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight">
                <span className="block text-[10px] text-emerald-600 font-normal">WhatsApp DG</span>
                <span className="font-bold text-xs">(82) 9 9933-0488</span>
              </div>
            </a>

            {/*/!* User / Orders Indicator *!/*/}
            {/*{currentRole === 'CLIENTE' ? (*/}
            {/*  <button*/}
            {/*    onClick={() => navigateTo('meus-pedidos')}*/}
            {/*    className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition relative"*/}
            {/*    title="Acompanhar meus pedidos"*/}
            {/*  >*/}
            {/*    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700">*/}
            {/*      <Package className="w-4 h-4 text-brand-navy" />*/}
            {/*    </div>*/}
            {/*    <div className="hidden sm:block text-left text-xs leading-tight">*/}
            {/*      <span className="text-gray-500 block text-[10px]">Área do Cliente</span>*/}
            {/*      <span className="font-bold text-gray-900">Meus Pedidos</span>*/}
            {/*    </div>*/}
            {/*    {pendingCorrectionsCount > 0 && (*/}
            {/*      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white animate-bounce">*/}
            {/*        {pendingCorrectionsCount}*/}
            {/*      </span>*/}
            {/*    )}*/}
            {/*  </button>*/}
            {/*) : currentRole === 'RESPONSAVEL_GRAFICA' ? (*/}
            {/*  <button*/}
            {/*    onClick={() => navigateTo('resp-dashboard')}*/}
            {/*    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-semibold text-xs"*/}
            {/*  >*/}
            {/*    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>*/}
            {/*    <span>Painel Técnico Operador</span>*/}
            {/*  </button>*/}
            {/*) : (*/}
            {/*  <button*/}
            {/*    onClick={() => navigateTo('admin-dashboard')}*/}
            {/*    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-900 font-semibold text-xs"*/}
            {/*  >*/}
            {/*    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>*/}
            {/*    <span>Painel Administrativo</span>*/}
            {/*  </button>*/}
            {/*)}*/}

            {/* Shopping Cart Pill */}
            <button
              onClick={() => navigateTo('carrinho')}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-brand-navy hover:bg-brand-dark text-white font-semibold text-xs shadow-sm hover:shadow transition relative"
              title="Ver meu carrinho de compras"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Carrinho</span>
              {cart.length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ffdd00] text-gray-900 font-black text-xs">
                  {cart.length}
                </span>
              )}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
