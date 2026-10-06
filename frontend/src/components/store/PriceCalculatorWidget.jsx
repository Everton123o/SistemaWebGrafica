import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, ArrowRight, Clock, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export function PriceCalculatorWidget() {
  const { navigateTo, services } = useApp();

  const [selectedProductId, setSelectedProductId] = useState(1); // Cartão por padrão
  const [selectedQuantity, setSelectedQuantity] = useState(500);
  const [selectedFinishing, setSelectedFinishing] = useState('Verniz Total Brilho');
  const [selectedPaper, setSelectedPaper] = useState('Couché 300g');
  const [selectedColor, setSelectedColor] = useState('4x4 (Frente e Verso Colorido)');

  // Dynamic price calculation
  const getCalculatedPrice = () => {
    let base = 0;
    if (selectedProductId === 1) {
      // Cartão
      base = selectedQuantity === 100 ? 25.00 :
             selectedQuantity === 250 ? 35.00 :
             selectedQuantity === 500 ? 43.90 :
             selectedQuantity === 1000 ? 69.90 : 140.00;
      if (selectedFinishing.includes('Verniz Localizado')) base += 35.00;
      if (selectedFinishing.includes('Cantos')) base += 10.00;
    } else if (selectedProductId === 2) {
      // Adesivo
      base = (selectedQuantity * 0.18) + 15.00;
    } else if (selectedProductId === 3) {
      // Banner
      base = 38.00 * (selectedQuantity || 1);
    } else if (selectedProductId === 4) {
      // Copos
      base = selectedQuantity * 2.80;
    } else {
      base = 49.90;
    }
    return Math.max(15, base);
  };

  const totalPrice = getCalculatedPrice();
  const unitPrice = (totalPrice / selectedQuantity).toFixed(2).replace('.', ',');

  const handleStartOrder = () => {
    navigateTo('novo-pedido', {
      serviceId: selectedProductId,
      prefill: {
        quantidade: String(selectedQuantity),
        acabamento: selectedFinishing,
        papel: selectedPaper,
        cores: selectedColor
      }
    });
  };

  return (
    <section className="w-full my-10 bg-gradient-to-br from-gray-900 via-brand-dark to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-gray-800 relative overflow-hidden">
      {/* Decorative CMYK drop glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-gray-800 pb-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Simulador Online em Tempo Real</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Calcule o Valor do Seu Material Gráfico Agora
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Personalize tiragem, papel e acabamento. Preço transparente e checagem profissional grátis.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-300 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="font-bold text-white block">Garantia PrintPro</span>
              <span className="text-[11px] text-gray-400">Verificação de arte em Delmiro Gouveia</span>
            </div>
          </div>
        </div>

        {/* Interactive Calculator Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Select Product */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
              1. Produto Gráfico
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs font-semibold focus:outline-none focus:border-brand-cyan transition"
            >
              {services.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Select Material */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
              2. Material / Papel
            </label>
            <select
              value={selectedPaper}
              onChange={(e) => setSelectedPaper(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs font-semibold focus:outline-none focus:border-brand-cyan transition"
            >
              <option value="Couché 300g">Couché 300g (Padrão Premium)</option>
              <option value="Couché 250g">Couché 250g (Econômico)</option>
              <option value="Lona 440g">Lona 440g Brilho / Fosca</option>
              <option value="Vinil Branco">Vinil Adesivo 120g</option>
              <option value="Acrílico / Plástico">Acrílico Cristal p/ Copos</option>
            </select>
          </div>

          {/* Select Finishing */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
              3. Acabamento
            </label>
            <select
              value={selectedFinishing}
              onChange={(e) => setSelectedFinishing(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs font-semibold focus:outline-none focus:border-brand-cyan transition"
            >
              <option value="Verniz Total Brilho">Verniz Total Brilho Frente</option>
              <option value="Laminação Fosca">Laminação Fosca Frente e Verso</option>
              <option value="Laminação Fosca + Verniz Localizado">Laminação Fosca + Verniz Localizado</option>
              <option value="Cantos Arredondados">Cantos Arredondados (4 cantos)</option>
              <option value="Bastão e Ilhós">Bastão de Madeira + Cordão + Ilhós</option>
            </select>
          </div>

          {/* Select Quantity */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
              4. Quantidade
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[100, 250, 500, 1000].map(qty => (
                <button
                  key={qty}
                  type="button"
                  onClick={() => setSelectedQuantity(qty)}
                  className={`py-2 rounded-xl text-xs font-bold transition border ${
                    selectedQuantity === qty
                      ? 'bg-brand-cyan text-gray-950 border-brand-cyan shadow-sm'
                      : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                  }`}
                >
                  {qty}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Calculation Result Summary Bar */}
        <div className="mt-6 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/30 p-4 rounded-2xl">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block">
                Valor Total Estimado
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-brand-yellow">
                  R$ {totalPrice.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-xs text-gray-400">
                  (~ R$ {unitPrice}/un)
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs text-gray-300 pl-4 border-l border-gray-800">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Prazo de produção: <strong>1 a 2 dias úteis</strong></span>
            </div>
          </div>

          <div className="w-full sm:w-auto">
            <button
              onClick={handleStartOrder}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-cyan hover:bg-brand-cyan-hover text-gray-950 font-black text-xs sm:text-sm transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <span>Personalizar & Enviar Arte</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
