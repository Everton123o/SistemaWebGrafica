import React from 'react';
import { ShieldCheck, MessageCircle, MapPin, FileCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function TrustSection() {
  const { navigateTo } = useApp();

  return (
    <section className="w-full my-12">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Por que a PrintPro Gráfica é a Sua Melhor Escolha?
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto mt-1">
          Combinamos agilidade local em Delmiro Gouveia com tecnologia gráfica de ponta e checagem técnica rigorosa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Checagem */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-3xl p-6 border border-blue-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-brand-navy text-brand-cyan flex items-center justify-center shadow-md mb-4">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Checagem Profissional de Arquivo
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Nossa equipe de pré-impressão analisa minuciosamente seu PDF ou imagem: resolução (DPI), sangrias de corte, conversão CMYK e fontes em curvas antes de enviar para as máquinas.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-blue-200/60">
            <span className="text-[11px] font-bold text-brand-navy flex items-center gap-1">
              <span>Evite erros e reimpressões</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </span>
          </div>
        </div>

        {/* Card 2: Balcão Local */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50/50 rounded-3xl p-6 border border-amber-200/60 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#ffdd00] text-gray-950 flex items-center justify-center shadow-md mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Balcão de Retirada em Delmiro Gouveia
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Economize no frete e receba seu material com extrema rapidez. Retire diretamente no nosso balcão central ou receba via entrega expressa em Alagoas e estados vizinhos.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-amber-200/60">
            <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
              <span>Retirada sem custo de frete</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Card 3: WhatsApp Direto */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-3xl p-6 border border-emerald-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Atendimento Consultivo Direto
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Dúvidas sobre o melhor papel para o seu cardápio, a melhor lona para sua fachada ou a tiragem ideal para copos de formatura? Nossa equipe ajuda você pelo WhatsApp.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-emerald-200/60">
            <a
              href="https://wa.me/5582999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>Conversar com consultor agora</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
