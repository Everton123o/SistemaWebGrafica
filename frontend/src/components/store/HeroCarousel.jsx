import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import fotosImage from '../../../img/WhatsApp Image 2026-10-06 at 22.45.01.jpeg';
import calendariosImage from '../../../img/WhatsApp Image 2026-10-06 at 22.45.01 (1).jpeg';
import impressoraImage from '../../../img/WhatsApp Image 2026-10-06 at 22.45.01 (2).jpeg';
import marcadoresImage from '../../../img/WhatsApp Image 2026-10-06 at 22.45.01 (3).jpeg';

export function HeroCarousel() {
  const { navigateTo } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      // badge: 'PROMOÇÃO DE LANÇAMENTO',
      title: 'Sua Gráfica Rápida e Parceira em Delmiro Gouveia',
      subtitle: 'Cartões de visita, folhetos, adesivos e banners com cores fiéis, checagem técnica e entrega expressa.',
      cta: 'Ver Produtos em Oferta',
      serviceId: 1,
      bgGradient: 'from-slate-900 via-brand-dark to-brand-navy',
      tagline: '10% OFF na Primeira Compra com cupom BEMVINDOPRINT10',
      accentColor: 'text-brand-yellow',
      image: impressoraImage
    },
    {
      id: 2,
      // badge: 'EXCLUSIVIDADE PRINTPRO',
      title: 'Copos & Taças Personalizadas para Eventos',
      subtitle: 'Long Drink, Taças de Gin e Copos Twister com estampa colorida de alta fixação para aniversários, formaturas e casamentos.',
      cta: 'Personalizar Meus Copos',
      serviceId: 4,
      bgGradient: 'from-slate-900 via-purple-950 to-pink-950',
      tagline: 'Destaque no Instagram @printpro_grafica.dg',
      accentColor: 'text-pink-400',
      image: calendariosImage
    },
    {
      id: 3,
      // badge: 'SEGURANÇA & DELIVERY',
      title: 'Lacres de Segurança e Rótulos em Adesivo Vinil',
      subtitle: 'Proteja suas caixas de pizza, potes e sacolas. Transmita higiene e confiança aos seus clientes.',
      cta: 'Configurar Adesivos',
      serviceId: 2,
      bgGradient: 'from-slate-900 via-sky-950 to-blue-900',
      tagline: 'Vinil Brilho, Fosco e Anti-Violação (Casca de Ovo)',
      accentColor: 'text-brand-cyan',
      image: marcadoresImage
    },
    {
      id: 4,
      badge: 'PRODUÇÃO EM ATÉ 24H',
      title: 'Banners, Lonas e Wind Banners para Fachadas',
      subtitle: 'Comunicação visual de grande impacto para comércios e eventos em Delmiro Gouveia e região.',
      cta: 'Calcular Meu Banner',
      serviceId: 3,
      bgGradient: 'from-slate-900 via-gray-900 to-amber-950',
      tagline: 'Acabamento completo com bastão, cordão e ilhós reforçado',
      accentColor: 'text-brand-yellow',
      image: fotosImage
    }
  ];

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const current = slides[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-gray-950 text-white rounded-2xl shadow-xl border border-gray-800">
      <div className={`relative min-h-[360px] sm:min-h-[420px] flex items-center bg-gradient-to-r ${current.bgGradient} transition-all duration-700 ease-in-out px-6 sm:px-12 py-10`}>
        
        {/* Background Decorative Graphic Elements */}
        <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-30 pointer-events-none"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-brand-magenta/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-4">
            {/*<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider">*/}
            {/*  <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />*/}
            {/*  <span>{current.badge}</span>*/}
            {/*</div>*/}

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {current.title}
            </h1>

            <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed max-w-xl">
              {current.subtitle}
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
              {/*<Zap className="w-4 h-4 text-emerald-400" />*/}
              <span>{current.tagline}</span>
            </div>

            <div className="pt-3 flex items-center gap-3 flex-wrap">
              <button
                onClick={() => navigateTo('novo-pedido', { serviceId: current.serviceId })}
                className="px-6 py-3 rounded-xl bg-[#ffdd00] hover:bg-[#ffe633] text-gray-950 font-black text-sm transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <span>{current.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('catalogo')}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition"
              >
                Ver Todo o Catálogo
              </button>
            </div>
          </div>

          {/* Featured Image Thumbnail */}
          <div className="lg:col-span-5 hidden sm:flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-cyan to-brand-magenta opacity-30 blur-lg group-hover:opacity-60 transition duration-500"></div>
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-gray-900">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-xs text-white font-medium flex items-center justify-between">
                  <span>Qualidade PrintPro</span>
                  <span className="text-[10px] text-emerald-400 font-bold">100% Garantida</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition border border-white/10"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition border border-white/10"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Dots */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-8 bg-[#ffdd00]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
