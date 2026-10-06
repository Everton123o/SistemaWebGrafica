import React from 'react';
import { HeroCarousel } from '../../components/store/HeroCarousel';
import { CategoryMiniBanners } from '../../components/store/CategoryMiniBanners';
import { PriceCalculatorWidget } from '../../components/store/PriceCalculatorWidget';
import { ProductShowcase } from '../../components/store/ProductShowcase';
import { TrustSection } from '../../components/store/TrustSection';
import { Sparkles, Shield, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function LojaHome() {
  const { navigateTo } = useApp();

  return (
    <div className="space-y-6">
      {/* 1. Main Hero Carousel */}
      <HeroCarousel />

      {/* 2. Quick Mini-Banners Categories */}
      <CategoryMiniBanners />

      {/* 3. Promotional Strip / Tarja GIV Online style */}
      <div className="w-full bg-gradient-to-r from-brand-navy via-slate-900 to-brand-dark rounded-2xl p-4 sm:p-5 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 border border-brand-cyan/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ffdd00] text-gray-950 flex items-center justify-center font-black flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-white">
              Checagem Pré-Impressão Inclusa em Todos os Pedidos
            </h3>
            <p className="text-xs text-gray-300">
              Não se preocupe com erros de sangria, CMYK ou cortes: nossos técnicos revisam tudo antes de imprimir.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('catalogo')}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition whitespace-nowrap flex items-center gap-1.5"
        >
          <span>Explorar Catálogo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4. Real-time Price Calculator Simulator Widget */}
      <PriceCalculatorWidget />

      {/* 5. Product Showcase Grid (Mais Vendidos, Banners, Adesivos, Brindes) */}
      <ProductShowcase />

      {/* 6. Trust Section ("Precisou? Achou!") */}
      <TrustSection />
    </div>
  );
}
