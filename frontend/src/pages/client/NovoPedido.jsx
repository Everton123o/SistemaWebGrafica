import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { FileUploadZone } from '../../components/shared/FileUploadZone';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Info,
  DollarSign
} from 'lucide-react';

export function NovoPedido() {
  const { services, selectedServiceId, navigateTo, createOrder, addToast } = useApp();

  const service = services.find(s => s.id === selectedServiceId) || services[0];

  // Dynamic requirements state
  const [formSpecs, setFormSpecs] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null);
  const [clientObservations, setClientObservations] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Client info (prefilled for convenience)
  const [clientName, setClientName] = useState('Carlos Eduardo Santos');
  const [clientCompany, setClientCompany] = useState('Hamburgueria Delmiro Gourmet');
  const [clientEmail, setClientEmail] = useState('carlos@hamburgueriadelmiro.com.br');
  const [clientPhone, setClientPhone] = useState('(82) 98845-1290');

  // Initialize specs from service requirements
  useEffect(() => {
    if (service && service.requirements) {
      const initial = {};
      Object.entries(service.requirements).forEach(([key, config]) => {
        if (config.type === 'select') {
          initial[key] = config.default || config.options[0];
        } else if (config.type === 'number') {
          initial[key] = config.default || 1;
        }
      });
      setFormSpecs(initial);
    }
  }, [service]);

  const handleSpecChange = (key, value) => {
    setFormSpecs(prev => ({ ...prev, [key]: value }));
  };

  // Dynamic price calculation
  const calculateTotal = () => {
    let base = service.priceFrom;
    const qty = parseInt(formSpecs.quantidade) || 1;

    if (service.category === 'Comunicação Visual' && formSpecs.largura && formSpecs.altura) {
      // Area based
      const m2 = (Number(formSpecs.largura) / 100) * (Number(formSpecs.altura) / 100);
      base = m2 * 45.00 * (parseInt(formSpecs.quantidade) || 1);
    } else if (service.category === 'Brindes & Copos') {
      base = qty * 2.80;
    } else if (qty > 1) {
      // Scale pricing
      if (qty >= 1000) base = service.priceFrom * 1.6;
      else if (qty >= 500) base = service.priceFrom;
      else if (qty >= 250) base = service.priceFrom * 0.75;
      else base = service.priceFrom * 0.5;
    }

    // Finishing surcharge
    if (formSpecs.acabamento?.includes('Verniz Localizado')) {
      base += 35.00;
    }
    return Math.max(15, base);
  };

  const totalCalculated = calculateTotal();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required artwork if configured
    if (service.requirements?.uploadArte?.required && !uploadedFile) {
      addToast('Por favor, faça o upload do arquivo de arte gráfica antes de finalizar.', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      createOrder({
        clientName,
        clientCompany,
        clientEmail,
        clientPhone,
        serviceId: service.id,
        serviceName: service.name,
        specs: formSpecs,
        totalValue: Number(totalCalculated.toFixed(2)),
        observations: clientObservations,
        file: uploadedFile,
        deadline: new Date(Date.now() + service.deliveryDays * 86400000).toISOString().split('T')[0]
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Back Button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('catalogo')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-brand-navy transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o catálogo</span>
        </button>

        <span className="text-xs text-gray-400">
          Categoria: <strong className="text-gray-700">{service.category}</strong>
        </span>
      </div>

      {/* Main Order Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form & Requirements */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Service Header Info */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
            <div className="flex items-start gap-4">
              <img
                src={service.image}
                alt={service.name}
                className="w-20 h-20 rounded-xl object-cover border border-gray-100 flex-shrink-0"
              />
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-navy bg-brand-navy/10 px-2.5 py-0.5 rounded-full">
                  {service.category}
                </span>
                <h1 className="text-lg sm:text-xl font-black text-gray-900 mt-1 leading-snug">
                  {service.name}
                </h1>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-600 mt-2 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-yellow" />
                    Produção em {service.deliveryDays} dias úteis
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Checagem técnica inclusa
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Requirements Form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs space-y-5">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-cyan" />
                Especificações & Requisitos do Serviço
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Estes campos adaptam-se dinamicamente conforme os requisitos deste produto.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(service.requirements || {}).map(([key, config]) => {
                if (key === 'uploadArte') return null; // handled separately below

                if (config.type === 'select') {
                  return (
                    <div key={key} className={config.options.length > 4 ? 'sm:col-span-2' : ''}>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        {config.label}
                      </label>
                      <select
                        value={formSpecs[key] || config.default}
                        onChange={(e) => handleSpecChange(key, e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:bg-white focus:outline-none focus:border-brand-navy transition"
                      >
                        {config.options.map(opt => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }

                if (config.type === 'number') {
                  return (
                    <div key={key}>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        {config.label}
                      </label>
                      <input
                        type="number"
                        min={config.min || 1}
                        max={config.max || 10000}
                        value={formSpecs[key] || config.default}
                        onChange={(e) => handleSpecChange(key, e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:bg-white focus:outline-none focus:border-brand-navy transition"
                      />
                    </div>
                  );
                }

                return null;
              })}
            </div>

            {/* Observations / Technical Notes */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Observações Especiais para a Impressão (Opcional)
              </label>
              <textarea
                rows={3}
                value={clientObservations}
                onChange={(e) => setClientObservations(e.target.value)}
                placeholder="Ex: Favor dar atenção especial à logo dourada; deixar margem extra de 10mm; etc."
                className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-none focus:border-brand-navy transition"
              />
            </div>
          </div>

          {/* Artwork Upload Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
            <FileUploadZone
              selectedFile={uploadedFile}
              onFileSelect={(file) => setUploadedFile(file)}
              onRemoveFile={() => setUploadedFile(null)}
              label="Envio de Arte Gráfica (PDF, CDR, AI, PSD, PNG)"
            />
          </div>

        </div>

        {/* Right Column: Order Summary & Customer Info */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Summary Box */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md sticky top-24 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              Resumo do Pedido & Orçamento
            </h3>

            {/* Spec breakdown */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Produto:</span>
                <span className="font-bold text-gray-900">{service.name}</span>
              </div>
              {Object.entries(formSpecs).map(([k, val]) => (
                <div key={k} className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500 capitalize">{k}:</span>
                  <span className="font-medium text-gray-800 text-right max-w-[200px] truncate">{val}</span>
                </div>
              ))}
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Arquivo de Arte:</span>
                <span className={`font-bold ${uploadedFile ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {uploadedFile ? uploadedFile.name : 'Pendente de anexo'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Checagem de Arquivo:</span>
                <span className="font-bold text-emerald-600">Grátis (Inclusa)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Balcão de Retirada:</span>
                <span className="font-bold text-gray-800">Delmiro Gouveia - AL (Grátis)</span>
              </div>
            </div>

            {/* Customer Details Box */}
            <div className="pt-2 border-t border-gray-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                Dados do Solicitante
              </span>
              <div className="space-y-1.5 text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p><strong>{clientName}</strong> ({clientCompany})</p>
                <p className="text-gray-500 text-[11px]">{clientEmail} • {clientPhone}</p>
              </div>
            </div>

            {/* Total Price Display */}
            <div className="pt-3 border-t border-gray-200">
              <span className="text-xs text-gray-400 block font-bold uppercase">
                Total do Pedido
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl sm:text-3xl font-black text-brand-navy">
                  R$ {totalCalculated.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  PIX 5% OFF à vista
                </span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-3.5 px-4 rounded-xl font-black text-sm text-gray-950 transition-all shadow-md flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                  : 'bg-[#ffdd00] hover:bg-[#ffe633] hover:scale-[1.02]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Enviando Pedido & Arte...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Finalizar Pedido & Enviar para Análise</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-gray-400 text-center leading-tight">
              Após o envio, a equipe de pré-impressão da PrintPro revisará seu arquivo. Você poderá acompanhar o status em tempo real.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
