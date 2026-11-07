import React, { useState } from 'react';
<<<<<<< Updated upstream
=======
import { useApp } from '../../context/AppContext';
>>>>>>> Stashed changes
import {
  MessageCircle,
  Mail,
  MapPin,
<<<<<<< Updated upstream
  ArrowUp,
  CheckCircle2,
  HelpCircle,
  X,
  FileCheck,
  ChevronRight,
  Phone
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function GivFooter() {
  const { navigateTo, currentRole } = useApp();
  const [techGuideModalOpen, setTechGuideModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (view) => {
    navigateTo(view);
  };

  return (
    <footer className="w-full bg-[#0b1120] text-gray-400 text-xs border-t border-gray-800 mt-16 font-sans">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Col 1: About, Brand & Social */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-black p-1 flex items-center justify-center border border-gray-800 shadow-sm">
                <img src="/logo-printpro.jpg" alt="PrintPro Gráfica" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  PRINT<span className="text-brand-cyan">PRO</span>
                </span>
                <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Gráfica Rápida & Comunicação Visual
                </span>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed text-[12px] max-w-sm">
              Sua gráfica rápida de confiança em Delmiro Gouveia - Alagoas. Soluções completas em impressos comerciais, promocionais, comunicação visual e brindes corporativos com validação profissional de arquivos.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
=======
  Clock,
  ShieldCheck,
  Award,
  Zap,
  CreditCard,
  FileCheck2,
  ExternalLink,
  ChevronRight,
  Info,
  X,
  Printer,
  Sparkles
} from 'lucide-react';

export function GivFooter() {
  const { navigateTo, settings } = useApp();
  const [modalContent, setModalContent] = useState(null);

  const currentYear = new Date().getFullYear();
  const whatsappNumber = settings?.whatsappNumber || '(82) 99999-9999';
  const cleanPhone = whatsappNumber.replace(/\D/g, '');
  const storeEmail = settings?.contactEmail || 'contato@printprografica.com.br';
  const storeAddress = settings?.storeAddress || 'Delmiro Gouveia - AL';

  // Informações para o modal de instruções técnicas
  const techGuides = {
    pdf: {
      title: 'Como Enviar seu Arquivo em PDF/X-1a',
      content: (
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            O formato <strong>PDF/X-1a</strong> é o padrão mundial da indústria gráfica para impressão sem perdas ou distorções.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Exporte seu arquivo do CorelDRAW, Illustrator, Photoshop ou Canva em <strong>PDF para Impressão</strong>.</li>
            <li>Certifique-se de <strong>converter todas as fontes em curvas (vetores)</strong> antes de fechar o arquivo.</li>
            <li>Mantenha a resolução das imagens fotográficas em no mínimo <strong>300 DPI</strong>.</li>
          </ul>
        </div>
      )
    },
    sangria: {
      title: 'Guia de Sangria & Margens de Segurança',
      content: (
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            Para evitar bordas brancas indesejadas no corte da guilhotina:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Sangria externa:</strong> Estenda as cores de fundo em <strong>2mm a 3mm</strong> além da linha de corte do impresso.</li>
            <li><strong>Margem de segurança interna:</strong> Mantenha textos e logotipos a pelo menos <strong>3mm</strong> de distância da linha de corte.</li>
          </ul>
        </div>
      )
    },
    cmyk: {
      title: 'Conversão de Cores: RGB vs CMYK',
      content: (
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            Monitores e celulares usam luz (<strong>RGB</strong>), enquanto máquinas de impressão usam pigmento (<strong>CMYK</strong>).
          </p>
          <p>
            Sempre trabalhe ou converta sua arte para o modo de cor <strong>CMYK (FOGRA39 ou Coated GRACol)</strong> para garantir que as cores impressas fiquem fiéis ao esperado.
          </p>
        </div>
      )
    },
    prazos: {
      title: 'Prazos de Produção & Balcão de Retirada',
      content: (
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            Nosso prazo de produção se inicia após a <strong>aprovação formal da arte pela equipe de pré-impressão</strong> e a confirmação do pagamento.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Balcão Delmiro Gouveia:</strong> Você recebe notificação imediata assim que o pedido for finalizado para retirada presencial.</li>
            <li>Pedidos com urgência contam com atendimento prioritário mediante taxa informada no orçamento.</li>
          </ul>
        </div>
      )
    },
    garantia: {
      title: 'Garantia de Qualidade & Reimpressão PrintPro',
      content: (
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            Garantimos a excelência dos materiais entregues. Caso identifique qualquer inconformidade comprovada de produção ou corte:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Envie foto/vídeo do material em até <strong>7 dias corridos</strong> após o recebimento.</li>
            <li>Nossa equipe técnica avaliará o lote e providenciará a reimpressão imediata sem custo adicional.</li>
          </ul>
        </div>
      )
    }
  };

  return (
    <footer className="w-full bg-[#090d16] text-gray-400 text-xs border-t border-gray-800/80 mt-16 font-sans">
      
      {/* 1. Faixa Superior de Diferenciais / Credibilidade */}
      <div className="border-b border-gray-800/60 bg-[#0d1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center flex-shrink-0 text-brand-cyan">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xs">Produção Ágil Local</h4>
                <p className="text-gray-400 text-[11px]">Balcão de retirada em Delmiro Gouveia</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xs">Revisão Pré-Impressão</h4>
                <p className="text-gray-400 text-[11px]">Conferência técnica antes de rodar o impresso</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 text-purple-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xs">Garantia de Qualidade</h4>
                <p className="text-gray-400 text-[11px]">Compromisso com acabamento de alta definição</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xs">Atendimento Dedicado</h4>
                <p className="text-gray-400 text-[11px]">Suporte direto via WhatsApp para o seu projeto</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Grid Principal com 4 Colunas Equilibradas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Coluna 1: Sobre & Redes Sociais */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-black p-1 flex items-center justify-center border border-gray-700 shadow-sm">
                <img src="/logo-printpro.jpg" alt="PrintPro Gráfica" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight flex items-center gap-1">
                  PRINT<span className="text-brand-cyan">PRO</span>
                </span>
                <span className="text-[10px] text-gray-400 block -mt-1 font-medium">Gráfica & Comunicação Visual</span>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed text-[11px]">
              Sua gráfica rápida parceira em Delmiro Gouveia e região do Alto Sertão de Alagoas. Especialistas em cartões, banners, adesivos, lacres e brindes personalizados.
            </p>

            {/* Botão de Instagram */}
            <div className="pt-1">
>>>>>>> Stashed changes
              <a
                href="https://www.instagram.com/printpro_grafica.dg?stkn=dzZpaWY0NnY5dHgy"
                target="_blank"
                rel="noopener noreferrer"
<<<<<<< Updated upstream
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 text-white font-medium hover:opacity-95 transition text-[11px] shadow-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram @printpro</span>
              </a>

              <a
                href="https://wa.me/5582999999999?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20pedidos%20na%20PrintPro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition text-[11px] font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Comercial</span>
=======
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-semibold hover:opacity-95 transition text-xs shadow-md group"
              >
                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@printpro_grafica.dg</span>
                <ExternalLink className="w-3 h-3 text-white/70 ml-0.5" />
>>>>>>> Stashed changes
              </a>
            </div>
          </div>

<<<<<<< Updated upstream
          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
              Navegação
            </h4>
            <ul className="space-y-2 text-gray-400 text-[12px]">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition flex items-center gap-1 hover:translate-x-1 duration-150"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600" />
                  <span>Início</span>
=======
          {/* Coluna 2: Navegação & Acesso Rápido */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
              Navegação da Loja
            </h4>
            <ul className="space-y-2.5 text-gray-400">
              <li>
                <button
                  onClick={() => navigateTo('catalogo')}
                  className="hover:text-brand-cyan transition flex items-center gap-1.5 text-left group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-brand-cyan transition" />
                  <span>Catálogo de Produtos & Serviços</span>
>>>>>>> Stashed changes
                </button>
              </li>
              <li>
                <button
<<<<<<< Updated upstream
                  onClick={() => handleNav('catalogo')}
                  className="hover:text-white transition flex items-center gap-1 hover:translate-x-1 duration-150"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600" />
                  <span>Catálogo de Serviços</span>
                </button>
              </li>
              {currentRole === 'CLIENTE' && (
                <>
                  <li>
                    <button
                      onClick={() => handleNav('novo-pedido')}
                      className="hover:text-white transition flex items-center gap-1 hover:translate-x-1 duration-150"
                    >
                      <ChevronRight className="w-3 h-3 text-gray-600" />
                      <span>Fazer Pedido / Orçamento</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNav('meus-pedidos')}
                      className="hover:text-white transition flex items-center gap-1 hover:translate-x-1 duration-150"
                    >
                      <ChevronRight className="w-3 h-3 text-gray-600" />
                      <span>Meus Pedidos</span>
                    </button>
                  </li>
                </>
              )}
              {currentRole === 'RESPONSAVEL_GRAFICA' && (
                <>
                  <li>
                    <button
                      onClick={() => handleNav('resp-dashboard')}
                      className="hover:text-white transition flex items-center gap-1 hover:translate-x-1 duration-150"
                    >
                      <ChevronRight className="w-3 h-3 text-gray-600" />
                      <span>Painel de Análise</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNav('resp-producao')}
                      className="hover:text-white transition flex items-center gap-1 hover:translate-x-1 duration-150"
                    >
                      <ChevronRight className="w-3 h-3 text-gray-600" />
                      <span>Fila de Produção</span>
                    </button>
                  </li>
                </>
              )}
              {currentRole === 'ADMINISTRADOR' && (
                <>
                  <li>
                    <button
                      onClick={() => handleNav('admin-dashboard')}
                      className="hover:text-white transition flex items-center gap-1 hover:translate-x-1 duration-150"
                    >
                      <ChevronRight className="w-3 h-3 text-gray-600" />
                      <span>Painel Administrativo</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNav('admin-servicos')}
                      className="hover:text-white transition flex items-center gap-1 hover:translate-x-1 duration-150"
                    >
                      <ChevronRight className="w-3 h-3 text-gray-600" />
                      <span>Gerenciar Serviços</span>
                    </button>
                  </li>
                </>
              )}
              <li>
                <button
                  onClick={() => handleNav('carrinho')}
                  className="hover:text-white transition flex items-center gap-1 hover:translate-x-1 duration-150"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600" />
                  <span>Carrinho de Pedidos</span>
=======
                  onClick={() => navigateTo('novo-pedido')}
                  className="hover:text-brand-cyan transition flex items-center gap-1.5 text-left group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-brand-cyan transition" />
                  <span>Novo Pedido / Orçamento</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('meus-pedidos')}
                  className="hover:text-brand-cyan transition flex items-center gap-1.5 text-left group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-brand-cyan transition" />
                  <span>Acompanhar Meus Pedidos</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('carrinho')}
                  className="hover:text-brand-cyan transition flex items-center gap-1.5 text-left group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-brand-cyan transition" />
                  <span>Carrinho de Compras</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-brand-cyan transition flex items-center gap-1.5 text-left group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-brand-cyan transition" />
                  <span>Página Inicial</span>
>>>>>>> Stashed changes
                </button>
              </li>
            </ul>
          </div>

<<<<<<< Updated upstream
          {/* Col 3: Dúvidas & Instruções Técnicas */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow"></span>
              Instruções Técnicas
            </h4>
            <ul className="space-y-2 text-gray-400 text-[12px]">
              <li>
                <button
                  onClick={() => setTechGuideModalOpen(true)}
                  className="hover:text-white text-left transition flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-brand-yellow" />
                  <span>Fechamento de Arquivo em PDF</span>
=======
          {/* Coluna 3: Guia do Cliente & Instruções Técnicas */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              Instruções Técnicas
            </h4>
            <ul className="space-y-2.5 text-gray-400">
              <li>
                <button
                  onClick={() => setModalContent(techGuides.pdf)}
                  className="hover:text-white transition flex items-center gap-1.5 text-left group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-purple-400 transition" />
                  <span>Como Enviar em PDF/X-1a</span>
>>>>>>> Stashed changes
                </button>
              </li>
              <li>
                <button
<<<<<<< Updated upstream
                  onClick={() => setTechGuideModalOpen(true)}
                  className="hover:text-white text-left transition flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-brand-yellow" />
                  <span>Margem de Sangria & Segurança</span>
=======
                  onClick={() => setModalContent(techGuides.sangria)}
                  className="hover:text-white transition flex items-center gap-1.5 text-left group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-purple-400 transition" />
                  <span>Guia de Sangria & Margens</span>
>>>>>>> Stashed changes
                </button>
              </li>
              <li>
                <button
<<<<<<< Updated upstream
                  onClick={() => setTechGuideModalOpen(true)}
                  className="hover:text-white text-left transition flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-brand-yellow" />
                  <span>Conversão RGB para CMYK</span>
=======
                  onClick={() => setModalContent(techGuides.cmyk)}
                  className="hover:text-white transition flex items-center gap-1.5 text-left group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-purple-400 transition" />
                  <span>Padrão de Cores CMYK vs RGB</span>
>>>>>>> Stashed changes
                </button>
              </li>
              <li>
                <button
<<<<<<< Updated upstream
                  onClick={() => setTechGuideModalOpen(true)}
                  className="hover:text-white text-left transition flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-brand-yellow" />
                  <span>Resolução Mínima (300 DPI)</span>
=======
                  onClick={() => setModalContent(techGuides.prazos)}
                  className="hover:text-white transition flex items-center gap-1.5 text-left group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-purple-400 transition" />
                  <span>Prazos & Balcão de Retirada</span>
>>>>>>> Stashed changes
                </button>
              </li>
              <li>
                <button
<<<<<<< Updated upstream
                  onClick={() => setTechGuideModalOpen(true)}
                  className="text-brand-cyan hover:underline font-semibold flex items-center gap-1 text-[11px] pt-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Ver Guia Técnico Completo</span>
=======
                  onClick={() => setModalContent(techGuides.garantia)}
                  className="hover:text-white transition flex items-center gap-1.5 text-left group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-purple-400 transition" />
                  <span>Garantia de Qualidade & Reimpressão</span>
>>>>>>> Stashed changes
                </button>
              </li>
            </ul>
          </div>

<<<<<<< Updated upstream
          {/* Col 4: Contatos & Localização Unificados */}
          <div className="space-y-3.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Atendimento & Local
=======
          {/* Coluna 4: Atendimento & Localização */}
          <div className="space-y-3.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Atendimento PrintPro
>>>>>>> Stashed changes
            </h4>

            {/* Endereço / Local */}
            <div className="flex items-start gap-2.5 text-gray-300">
              <MapPin className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
              <div>
<<<<<<< Updated upstream
                <p className="font-semibold text-white text-[12px]">Delmiro Gouveia - AL</p>
=======
                <p className="font-semibold text-white text-xs">{storeAddress}</p>
>>>>>>> Stashed changes
                <p className="text-gray-400 text-[11px]">Balcão de Retirada & Atendimento Presencial</p>
              </div>
            </div>

<<<<<<< Updated upstream
            <div className="flex items-start gap-2.5 text-gray-300">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <a
                  href="tel:82999999999"
                  className="font-bold text-white hover:text-emerald-400 transition text-[12px] block"
                >
                  (82) 99999-9999
                </a>
                <p className="text-gray-400 text-[10px] leading-tight">
=======
            {/* WhatsApp com link direto */}
            <div className="flex items-start gap-2.5 text-gray-300">
              <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <a
                  href={`https://wa.me/55${cleanPhone || '82999999999'}?text=Ol%C3%A1%2C+PrintPro%21+Gostaria+de+tirar+uma+d%C3%BAvida.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white hover:text-emerald-400 transition text-xs inline-flex items-center gap-1.5"
                >
                  <span>{whatsappNumber}</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
                <p className="text-gray-400 text-[10px] mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-500" />
>>>>>>> Stashed changes
                  Seg a Sex: 08h às 18h | Sáb: 08h às 12h
                </p>
              </div>
            </div>

            {/* E-mail */}
            <div className="flex items-center gap-2.5 text-gray-300">
<<<<<<< Updated upstream
              <Mail className="w-4 h-4 text-brand-yellow flex-shrink-0" />
              <a
                href="mailto:contato@printprografica.com.br"
                className="text-gray-300 hover:text-white transition text-[11px] truncate"
              >
                contato@printprografica.com.br
              </a>
            </div>

            {/* Quick Status Pill */}
            <div className="pt-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Balcão Aberto em Horário Comercial
              </div>
            </div>
=======
              <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <a
                href={`mailto:${storeEmail}`}
                className="text-gray-300 hover:text-white transition text-[11px] truncate"
              >
                {storeEmail}
              </a>
            </div>

>>>>>>> Stashed changes
          </div>

        </div>

<<<<<<< Updated upstream
        {/* Bottom Copyright & Back to Top */}
        <div className="border-t border-gray-800/80 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-[11px]">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left">
            <p>© 2026 PrintPro Gráfica. Delmiro Gouveia - AL.</p>
            <span className="hidden sm:inline text-gray-700">•</span>
            <p>Todos os direitos reservados.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <p className="text-gray-400">Sistema Web de Pré-Produção e Validação de Pedidos</p>
            </div>

            <button
              onClick={scrollToTop}
              title="Voltar ao topo da página"
              className="p-1.5 rounded-lg bg-gray-850 hover:bg-gray-800 text-gray-400 hover:text-white transition flex items-center justify-center border border-gray-800"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
=======
        {/* 3. Seção de Formas de Pagamento & Segurança */}
        <div className="mt-12 pt-8 border-t border-gray-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
            <span className="text-[11px] text-gray-400 font-semibold flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-brand-cyan" />
              Formas de Pagamento:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-bold text-[10px]">
                ⚡ PIX Instantâneo
              </span>
              <span className="px-2.5 py-1 rounded bg-gray-800/80 border border-gray-700/60 text-gray-300 text-[10px] font-medium">
                Cartão de Crédito
              </span>
              <span className="px-2.5 py-1 rounded bg-gray-800/80 border border-gray-700/60 text-gray-300 text-[10px] font-medium">
                Cartão de Débito
              </span>
              <span className="px-2.5 py-1 rounded bg-gray-800/80 border border-gray-700/60 text-gray-300 text-[10px] font-medium">
                Boleto Bancário
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-400 text-[11px]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Ambiente 100% Seguro</span>
            </div>
            <span className="text-gray-700">|</span>
            <div className="flex items-center gap-1.5">
              <Printer className="w-4 h-4 text-brand-cyan" />
              <span>Impressão Própria</span>
            </div>
          </div>
        </div>

        {/* 4. Barra Inferior de Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-500 text-[11px]">
          <p className="text-center sm:text-left">
            © {currentYear} <strong>PrintPro Gráfica</strong> — Delmiro Gouveia / AL. Todos os direitos reservados.
          </p>
          <p className="text-gray-400 text-center sm:text-right flex items-center gap-1">
            <span>Sistema Web de Pré-Produção e Gestão de Pedidos</span>
          </p>
>>>>>>> Stashed changes
        </div>

      </div>

<<<<<<< Updated upstream
      {/* Technical Guide Modal */}
      {techGuideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-gray-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setTechGuideModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Guia de Pré-Impressão PrintPro</h3>
                <p className="text-xs text-gray-400">Recomendações técnicas para aprovação de arte de primeira</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <div className="flex items-center gap-2 font-semibold text-white mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Padrão de Cores CMYK</span>
                </div>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Crie seus arquivos sempre em modo CMYK. Imagens em RGB serão convertidas automaticamente, podendo sofrer variações de tonalidade.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <div className="flex items-center gap-2 font-semibold text-white mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Sangria e Margens de Segurança</span>
                </div>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Deixe pelo menos <strong>3 mm de sangria</strong> externa além da linha de corte e mantenha textos e logotipos a pelo menos <strong>3 mm para dentro</strong> da margem de segurança.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <div className="flex items-center gap-2 font-semibold text-white mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Resolução Mínima (300 DPI)</span>
                </div>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Para impressos de pequeno formato (cartões, panfletos, folders), envie imagens com no mínimo 300 DPI em tamanho real 1:1.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <div className="flex items-center gap-2 font-semibold text-white mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Formato Recomendado: PDF/X-1a</span>
                </div>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Exporte seu arquivo final em <strong>PDF/X-1a</strong> com todos os textos convertidos em curvas (vetores) e imagens incorporadas.
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setTechGuideModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-brand-cyan hover:bg-brand-cyan-hover text-white font-semibold text-xs transition"
              >
                Entendi, fechar guia
=======
      {/* Modal de Instruções Técnicas & Dúvidas */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white text-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-200 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5 mb-4 text-[#263C75]">
              <Info className="w-5 h-5 text-brand-cyan" />
              <h3 className="font-bold text-base leading-tight">{modalContent.title}</h3>
            </div>
            <div className="mb-6 leading-relaxed">
              {modalContent.content}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setModalContent(null)}
                className="px-4 py-2 bg-[#263C75] hover:bg-[#1e2f5c] text-white font-semibold rounded-lg text-xs transition shadow-sm"
              >
                Entendi
>>>>>>> Stashed changes
              </button>
            </div>
          </div>
        </div>
      )}
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    </footer>
  );
}