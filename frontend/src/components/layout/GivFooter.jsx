import React from 'react';
import { MessageCircle, Mail, MapPin, ShieldCheck, Clock, Award, CreditCard } from 'lucide-react';

export function GivFooter() {
  return (
    <footer className="w-full bg-[#0b1120] text-gray-400 text-xs border-t border-gray-800 pt-12 pb-8 mt-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Badges: GIV Online style trust bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-gray-800/80 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-navy/60 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white">Checagem Profissional Grátis</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Validamos sangria, CMYK e resolução antes de rodar.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-navy/60 border border-brand-cyan/20 flex items-center justify-center text-brand-yellow flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white">Produção Rápida 24h</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Agilidade garantida para o seu evento ou campanha.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-navy/60 border border-brand-cyan/20 flex items-center justify-center text-brand-magenta flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white">Qualidade Gráfica Impecável</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Parque gráfico moderno e cores ultra fiéis.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-navy/60 border border-brand-cyan/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white">Pix & Cartão até 12x</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Pague com segurança e parcelamento facilitado.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          
          {/* Col 1: About & Instagram */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-black p-0.5 flex items-center justify-center border border-gray-800">
                <img src="/logo-printpro.jpg" alt="PrintPro Gráfica" className="w-full h-full object-contain" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                PRINT<span className="text-brand-cyan">PRO</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-[11px]">
              Sua gráfica rápida parceira em Delmiro Gouveia - Alagoas. Especialistas em impressos promocionais, comunicação visual, adesivos de segurança e brindes personalizados.
            </p>
            
            <div className="pt-2">
              <a
                href="https://www.instagram.com/printpro_grafica.dg?stkn=dzZpaWY0NnY5dHgy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold hover:opacity-90 transition text-xs shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@printpro_grafica.dg</span>
              </a>
            </div>
          </div>

          {/* Col 2: Departamentos */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Produtos & Serviços
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><span className="hover:text-white cursor-pointer transition">Cartões de Visita Couché 300g</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Banners & Lonas com Acabamento</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Adesivos em Vinil & Lacres Delivery</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Copos Long Drink & Taças Personalizadas</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Wind Banners Promocionais</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Folhetos, Panfletos & Folders</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Pastas Corporativas & Envelopes</span></li>
            </ul>
          </div>

          {/* Col 3: Dúvidas & Instruções Técnicas */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Instruções Técnicas
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><span className="hover:text-white cursor-pointer transition">Como Enviar Arquivo em PDF/X-1a</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Guia de Sangria & Margens de Segurança</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Conversão de Cores RGB para CMYK</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Prazos de Produção & Balcão de Retirada</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Garantia de Qualidade & Reimpressão</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Termos de Uso e Política de Privacidade</span></li>
            </ul>
          </div>

          {/* Col 4: Atendimento & Localização */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Atendimento PrintPro
            </h4>
            
            <div className="flex items-start gap-2.5 text-gray-300">
              <MapPin className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Delmiro Gouveia - AL</p>
                <p className="text-gray-400 text-[11px]">Atendimento presencial & Balcão de Retirada</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-gray-300">
              <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-white">(82) 99999-9999</p>
                <p className="text-gray-400 text-[10px]">Segunda a Sexta, 08h às 18h | Sábado 08h às 12h</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-gray-300">
              <Mail className="w-4 h-4 text-brand-yellow flex-shrink-0" />
              <p className="text-gray-300">contato@printprografica.com.br</p>
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-gray-400 mb-1 font-semibold">Formas de Pagamento:</p>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 font-bold text-[10px]">PIX (5% OFF)</span>
                <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 text-[10px]">Mastercard</span>
                <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 text-[10px]">Visa</span>
                <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 text-[10px]">Elo</span>
                <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 text-[10px]">Boleto</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800/80 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-gray-500 text-[11px]">
          <p>© 2026 PrintPro Gráfica — Delmiro Gouveia / AL. Todos os direitos reservados.</p>
          <p className="text-gray-400">Sistema Web de Pré-Produção e Validação de Pedidos</p>
        </div>

      </div>
    </footer>
  );
}
