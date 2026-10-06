import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DollarSign, Sliders, Save, CheckCircle2, Percent, Layers, ShieldCheck } from 'lucide-react';

export function AdminPrecos() {
  const { settings, updateSettings } = useApp();

  const [markupPercentage, setMarkupPercentage] = useState(settings.markupPercentage || 45);
  const [squareMeterLonaRate, setSquareMeterLonaRate] = useState(settings.squareMeterLonaRate || 38.00);
  const [thousandCoucheRate, setThousandCoucheRate] = useState(settings.thousandCoucheRate || 48.00);
  const [uvVarnishFee, setUvVarnishFee] = useState(settings.uvVarnishFee || 35.00);
  const [minUrgencyHours, setMinUrgencyHours] = useState(settings.minUrgencyHours || 24);
  const [freeFileCheck, setFreeFileCheck] = useState(settings.freeFileCheck !== false);

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings({
      markupPercentage: Number(markupPercentage),
      squareMeterLonaRate: Number(squareMeterLonaRate),
      thousandCoucheRate: Number(thousandCoucheRate),
      uvVarnishFee: Number(uvVarnishFee),
      minUrgencyHours: Number(minUrgencyHours),
      freeFileCheck
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-emerald-600" />
              Configuração de Preços, Insumos e Margens
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Defina os parâmetros globais utilizados pelo simulador da loja e pela formação de orçamentos da gráfica.
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <Percent className="w-4 h-4" />
            <span>Margem Padrão: {markupPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Card 1: Margem de Lucro Geral */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs space-y-4">
          <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-brand-navy" />
            <span>1. Margem de Lucro Padrão da Operação Gráfica</span>
          </h2>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 font-semibold">Percentual de Margem Aplicada:</span>
              <span className="text-base font-black text-emerald-600">{markupPercentage}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={150}
              step={5}
              value={markupPercentage}
              onChange={(e) => setMarkupPercentage(e.target.value)}
              className="w-full accent-brand-navy h-2 bg-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>10% (Preço de Custo)</span>
              <span>45% (Equilibrado)</span>
              <span>150% (Alta Margem)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Custos de Insumos Base */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs space-y-4">
          <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-cyan" />
            <span>2. Tabela Base de Insumos & Matéria-Prima</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Lona 440g - Custo por Metro Quadrado (R$/m²)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400 font-bold">R$</span>
                <input
                  type="number"
                  step="0.01"
                  value={squareMeterLonaRate}
                  onChange={(e) => setSquareMeterLonaRate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  required
                />
              </div>
              <span className="text-[10px] text-gray-400 mt-0.5 block">Utilizado no cálculo de Banners e Fachadas</span>
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Papel Couché 300g - Custo Milheiro Base (R$)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400 font-bold">R$</span>
                <input
                  type="number"
                  step="0.01"
                  value={thousandCoucheRate}
                  onChange={(e) => setThousandCoucheRate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  required
                />
              </div>
              <span className="text-[10px] text-gray-400 mt-0.5 block">Utilizado para Cartões de Visita e Folhetos</span>
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Taxa de Acabamento Verniz Localizado UV (R$)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400 font-bold">R$</span>
                <input
                  type="number"
                  step="0.01"
                  value={uvVarnishFee}
                  onChange={(e) => setUvVarnishFee(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  required
                />
              </div>
              <span className="text-[10px] text-gray-400 mt-0.5 block">Adicional fixo por lote</span>
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Prazo Mínimo de Urgência (Horas)
              </label>
              <input
                type="number"
                value={minUrgencyHours}
                onChange={(e) => setMinUrgencyHours(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                required
              />
              <span className="text-[10px] text-gray-400 mt-0.5 block">Produção expressa em Delmiro Gouveia</span>
            </div>
          </div>
        </div>

        {/* Card 3: Políticas Comerciais */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs space-y-3 text-xs">
          <h2 className="font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>3. Políticas de Pré-Impressão & Checagem</span>
          </h2>

          <label className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              checked={freeFileCheck}
              onChange={(e) => setFreeFileCheck(e.target.checked)}
              className="rounded text-brand-navy focus:ring-brand-cyan"
            />
            <span className="font-semibold text-gray-800">
              Checagem profissional técnica gratuita para todos os pedidos (Política PrintPro)
            </span>
          </label>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-brand-navy hover:bg-brand-dark text-white font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Configurações de Preços e Margens</span>
          </button>
        </div>

      </form>
    </div>
  );
}
