import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import fotosImage from '../../../img/WhatsApp Image 2026-10-06 at 22.45.01.jpeg';
import calendariosImage from '../../../img/WhatsApp Image 2026-10-06 at 22.45.01 (1).jpeg';
import impressoraImage from '../../../img/WhatsApp Image 2026-10-06 at 22.45.01 (2).jpeg';
import marcadoresImage from '../../../img/WhatsApp Image 2026-10-06 at 22.45.01 (3).jpeg';

const slides = [
  {
    id: 1,
    title: 'Transforme suas memórias em fotos reais.',
    subtitle: 'Reviva seus melhores momentos com fotos impressas em cores vivas e acabamento de qualidade.',
    cta: 'Imprimir minhas fotos',
    serviceId: 5,
    carouselGradient: 'linear-gradient(110deg, #fffef3 0%, #ffe45c 56%, #f9a8d4 100%)',
    tagline: 'Papel fotográfico • cores que duram',
    textClass: 'text-slate-950',
    mutedTextClass: 'text-slate-700',
    textColor: '#0f172a',
    mutedTextColor: '#334155',
    buttonClass: 'bg-[#123a76] text-white hover:bg-[#0d2e60]',
    buttonBackground: '#123a76',
    buttonTextColor: '#ffffff',
    secondaryButtonClass: 'bg-white/70 text-slate-950 border-slate-900/15 hover:bg-white',
    navClass: 'bg-slate-950/80 hover:bg-slate-950 text-white',
    dotClass: 'bg-slate-950/35 hover:bg-slate-950/60',
    image: fotosImage,
    imageLabel: 'Fotos reais, memórias para guardar'
  },
  {
    id: 2,
    title: 'Sua marca presente o ano inteiro.',
    subtitle: 'Calendários de mesa e agendas corporativas para organizar a rotina e manter sua marca por perto.',
    cta: 'Ver calendários',
    serviceId: 5,
    carouselGradient: 'linear-gradient(110deg, #fff4a3 0%, #facc15 50%, #f472b6 82%, #2563eb 100%)',
    tagline: 'Personalização completa • presença todos os dias',
    textClass: 'text-slate-950',
    mutedTextClass: 'text-slate-700',
    textColor: '#0f172a',
    mutedTextColor: '#334155',
    buttonClass: 'bg-[#172554] text-white hover:bg-[#101b42]',
    buttonBackground: '#172554',
    buttonTextColor: '#ffffff',
    secondaryButtonClass: 'bg-white/65 text-slate-950 border-slate-900/15 hover:bg-white',
    navClass: 'bg-slate-950/80 hover:bg-slate-950 text-white',
    dotClass: 'bg-slate-950/35 hover:bg-slate-950/60',
    image: calendariosImage,
    imageLabel: 'Calendários e agendas corporativas'
  },
  {
    id: 3,
    title: 'Impressões gráficas de alta qualidade.',
    subtitle: 'Tecnologia e acabamento para entregar materiais nítidos, coloridos e prontos para destacar sua empresa.',
    cta: 'Fazer meu orçamento',
    serviceId: 1,
    carouselGradient: 'linear-gradient(110deg, #ffffff 0%, #dbeafe 42%, #60a5fa 72%, #facc15 100%)',
    tagline: 'Alta definição • resultado profissional',
    textClass: 'text-slate-950',
    mutedTextClass: 'text-slate-700',
    textColor: '#0f172a',
    mutedTextColor: '#334155',
    buttonClass: 'bg-[#0759d8] text-white hover:bg-[#064bb5]',
    buttonBackground: '#0759d8',
    buttonTextColor: '#ffffff',
    secondaryButtonClass: 'bg-white/70 text-slate-950 border-slate-900/15 hover:bg-white',
    navClass: 'bg-[#062866]/85 hover:bg-[#062866] text-white',
    dotClass: 'bg-slate-950/35 hover:bg-slate-950/60',
    image: impressoraImage,
    imageLabel: 'Impressão gráfica de alta qualidade'
  },
  {
    id: 4,
    title: 'Marcadores que destacam sua leitura.',
    subtitle: 'Crie marcadores de páginas com a identidade da sua marca, da sua escola ou do seu próximo evento.',
    cta: 'Personalizar marcadores',
    serviceId: 5,
    carouselGradient: 'linear-gradient(110deg, #ffffff 0%, #fbcfe8 46%, #ec4899 72%, #93c5fd 100%)',
    tagline: 'Cores marcantes • acabamento personalizado',
    textClass: 'text-slate-950',
    mutedTextClass: 'text-slate-700',
    textColor: '#0f172a',
    mutedTextColor: '#334155',
    buttonClass: 'bg-[#172554] text-white hover:bg-[#101b42]',
    buttonBackground: '#172554',
    buttonTextColor: '#ffffff',
    secondaryButtonClass: 'bg-white/65 text-slate-950 border-slate-900/15 hover:bg-white',
    navClass: 'bg-slate-950/80 hover:bg-slate-950 text-white',
    dotClass: 'bg-slate-950/35 hover:bg-slate-950/60',
    image: marcadoresImage,
    imageLabel: 'Marcadores de páginas personalizados'
  }
];

export function HeroCarousel() {
  const { navigateTo } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const current = slides[currentSlide];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((previousSlide) => (previousSlide + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((previousSlide) => (previousSlide - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((previousSlide) => (previousSlide + 1) % slides.length);
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-white/90 bg-white text-white"
      style={{ boxShadow: '0 18px 55px rgba(255, 255, 255, 0.5)' }}
    >
      <div
        className={`relative flex min-h-[360px] items-center px-6 py-10 transition-all duration-700 ease-in-out sm:min-h-[420px] sm:px-12 ${current.textClass}`}
        style={{ backgroundImage: current.carouselGradient, color: current.textColor }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_38%)] opacity-70" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-brand-cyan/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-brand-magenta/10 blur-3xl" />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-7">
            <h1 className="text-2xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {current.title}
            </h1>

            <p
              className={`max-w-xl text-sm font-normal leading-relaxed sm:text-base ${current.mutedTextClass}`}
              style={{ color: current.mutedTextColor }}
            >
              {current.subtitle}
            </p>

            <div
              className={`flex items-center gap-2 text-xs font-semibold ${current.mutedTextClass}`}
              style={{ color: current.mutedTextColor }}
            >
              <span>{current.tagline}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => navigateTo('novo-pedido', { serviceId: current.serviceId })}
                className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-black shadow-lg transition-all hover:scale-105 ${current.buttonClass}`}
                style={{ backgroundColor: current.buttonBackground, color: current.buttonTextColor }}
              >
                <span>{current.cta}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => navigateTo('catalogo')}
                className={`rounded-xl border px-5 py-3 text-sm font-bold transition ${current.secondaryButtonClass}`}
              >
                Ver todo o catálogo
              </button>
            </div>
          </div>

          <div className="hidden justify-center sm:flex lg:col-span-5">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-cyan to-brand-magenta opacity-30 blur-lg transition duration-500 group-hover:opacity-60" />
              <div className="relative h-80 w-72 overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl sm:h-96 sm:w-80">
                <img
                  src={current.image}
                  alt={current.imageLabel}
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className={`absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 backdrop-blur-sm transition ${current.navClass}`}
          aria-label="Slide anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={nextSlide}
          className={`absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 backdrop-blur-sm transition ${current.navClass}`}
          aria-label="Próximo slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${currentSlide === index ? 'w-8 bg-[#ffdd00]' : `w-2 ${current.dotClass}`}`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
