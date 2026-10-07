import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';
import {
  Tag,
  Plus,
  Edit2,
  Sliders,
  Power,
  Layers,
  Sparkles,
  CheckCircle2,
  Trash2,
  PlusCircle,
  FileText
} from 'lucide-react';

export function AdminServicos() {
  const {
    services,
    addService,
    updateService,
    toggleServiceStatus,
    updateServiceRequirements
  } = useApp();

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Service form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Cartão de Visita');
  const [description, setDescription] = useState('');
  const [priceFrom, setPriceFrom] = useState(45.00);
  const [unit, setUnit] = useState('500 unidades');
  const [deliveryDays, setDeliveryDays] = useState(2);
  const [image, setImage] = useState('');

  // Requirements editor state
  const [currentRequirements, setCurrentRequirements] = useState({});
  const [newReqKey, setNewReqKey] = useState('');
  const [newReqLabel, setNewReqLabel] = useState('');
  const [newReqOptions, setNewReqOptions] = useState('');

  const handleOpenCreateService = () => {
    setSelectedService(null);
    setName('');
    setCategory('Cartão de Visita');
    setDescription('');
    setPriceFrom(45.00);
    setUnit('500 unidades');
    setDeliveryDays(2);
    setImage('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600');
    setIsServiceModalOpen(true);
  };

  const handleOpenEditService = (service) => {
    setSelectedService(service);
    setName(service.name);
    setCategory(service.category);
    setDescription(service.description);
    setPriceFrom(service.priceFrom);
    setUnit(service.unit);
    setDeliveryDays(service.deliveryDays);
    setImage(service.image);
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    if (selectedService) {
      updateService(selectedService.id, {
        name,
        category,
        description,
        priceFrom: Number(priceFrom),
        unit,
        deliveryDays: Number(deliveryDays),
        image
      });
    } else {
      addService({
        name,
        category,
        description,
        priceFrom: Number(priceFrom),
        unit,
        deliveryDays: Number(deliveryDays),
        image,
        requirements: {
          quantidade: {
            label: 'Quantidade',
            type: 'select',
            options: ['100', '250', '500', '1000'],
            default: '500'
          },
          uploadArte: {
            label: 'Arquivo de Arte',
            type: 'file',
            required: true
          }
        }
      });
    }
    setIsServiceModalOpen(false);
  };

  // Requirements Modal
  const handleOpenRequirements = (service) => {
    setSelectedService(service);
    setCurrentRequirements({ ...(service.requirements || {}) });
    setNewReqKey('');
    setNewReqLabel('');
    setNewReqOptions('');
    setIsRequirementsModalOpen(true);
  };

  const handleToggleRequirementRequired = (key) => {
    setCurrentRequirements(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        required: !prev[key]?.required
      }
    }));
  };

  const handleRemoveRequirement = (key) => {
    setCurrentRequirements(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const handleAddNewRequirement = (e) => {
    e.preventDefault();
    if (!newReqKey.trim() || !newReqLabel.trim()) return;

    const safeKey = newReqKey.toLowerCase().replace(/[^a-z0-9]/g, '');
    const optionsArray = newReqOptions
      ? newReqOptions.split(',').map(s => s.trim()).filter(Boolean)
      : ['Padrão'];

    setCurrentRequirements(prev => ({
      ...prev,
      [safeKey]: {
        label: newReqLabel,
        type: 'select',
        options: optionsArray,
        default: optionsArray[0],
        required: true
      }
    }));

    setNewReqKey('');
    setNewReqLabel('');
    setNewReqOptions('');
  };

  const handleSaveRequirements = () => {
    if (selectedService) {
      updateServiceRequirements(selectedService.id, currentRequirements);
    }
    setIsRequirementsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <Tag className="w-6 h-6 text-brand-navy" />
              Catálogo de Serviços & Definição de Requisitos
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Gerencie produtos gráficos e configure quais requisitos (campos de formulário) cada serviço exige.
            </p>
          </div>

          <button
            onClick={handleOpenCreateService}
            className="px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-dark text-white font-bold text-xs transition shadow-xs flex items-center gap-1.5 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Serviço</span>
          </button>
        </div>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const isInactive = service.inactive;
          const reqCount = Object.keys(service.requirements || {}).length;

          return (
            <div
              key={service.id}
              className={`bg-white rounded-2xl border p-5 shadow-2xs transition flex flex-col justify-between ${
                isInactive ? 'opacity-60 border-gray-200 bg-gray-50' : 'border-gray-200/90 hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-navy bg-brand-navy/10 px-2 py-0.5 rounded-full">
                    {service.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isInactive ? 'bg-gray-200 text-gray-600' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {isInactive ? 'Inativo' : 'Ativo'}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-gray-900 mt-2 leading-snug">
                  {service.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {service.description}
                </p>

                {/* Price & Turnaround */}
                <div className="mt-3 flex items-center justify-between text-xs py-2 border-y border-gray-100">
                  <span className="text-gray-500">A partir de:</span>
                  <span className="font-bold text-emerald-700">
                    R$ {service.priceFrom?.toFixed(2).replace('.', ',')} / {service.unit}
                  </span>
                </div>

                {/* Requirements Summary Badge */}
                <div className="mt-2.5 flex items-center justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1 font-semibold text-gray-700">
                    <Sliders className="w-3.5 h-3.5 text-brand-cyan" />
                    Requisitos configurados:
                  </span>
                  <span className="font-bold text-brand-navy bg-gray-100 px-2 py-0.5 rounded">
                    {reqCount} campo(s)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenRequirements(service)}
                  className="px-3 py-1.5 rounded-xl bg-brand-navy/10 hover:bg-brand-navy hover:text-white text-brand-navy font-bold text-xs transition flex items-center gap-1.5"
                  title="Configurar requisitos do formulário"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Configurar Requisitos</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditService(service)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                    title="Editar informações do serviço"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => toggleServiceStatus(service.id)}
                    className={`p-1.5 rounded-lg transition ${
                      isInactive
                        ? 'text-emerald-600 hover:bg-emerald-50'
                        : 'text-gray-400 hover:text-rose-600 hover:bg-rose-50'
                    }`}
                    title={isInactive ? 'Ativar serviço' : 'Desativar serviço'}
                  >
                    <Power className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* MODAL 1: EDIT/CREATE SERVICE DETAILS */}
      {/* ============================================================ */}
      <Modal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        title={selectedService ? 'Editar Serviço' : 'Cadastrar Novo Serviço'}
      >
        <form onSubmit={handleSaveService} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              Nome do Serviço / Produto
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Wind Banner Pena Dupla Face"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
              >
                <option value="Cartão de Visita">Cartão de Visita</option>
                <option value="Comunicação Visual">Comunicação Visual</option>
                <option value="Adesivos & Rótulos">Adesivos & Rótulos</option>
                <option value="Brindes & Copos">Brindes & Copos</option>
                <option value="Folhetos">Folhetos</option>
                <option value="Papelaria Corporativa">Papelaria Corporativa</option>
                <option value="Identificação & PVC">Identificação & PVC</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Prazo de Produção (Dias Úteis)
              </label>
              <input
                type="number"
                min={1}
                max={30}
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Preço Base (A partir de R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Unidade / Tiragem de Referência
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Ex: 500 unidades, 1 kit"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              Descrição Comercial
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              URL da Imagem de Destaque
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsServiceModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand-navy hover:bg-brand-dark text-white text-xs font-bold shadow-sm"
            >
              Salvar Serviço
            </button>
          </div>
        </form>
      </Modal>

      {/* ============================================================ */}
      {/* MODAL 2: CRITICAL FEATURE - DEFINIR REQUISITOS DO SERVIÇO */}
      {/* ============================================================ */}
      <Modal
        isOpen={isRequirementsModalOpen}
        onClose={() => setIsRequirementsModalOpen(false)}
        title={`Configurar Requisitos do Serviço: ${selectedService?.name}`}
        maxWidth="max-w-3xl"
      >
        <div className="space-y-5 text-xs">
          
          <div className="bg-blue-50 text-blue-900 p-3.5 rounded-xl border border-blue-200">
            <p className="font-bold">Regra de Requisitos Dinâmicos (.harness):</p>
            <p className="text-[11px] text-blue-800 mt-0.5">
              Os campos habilitados abaixo definirão exatamente quais opções o cliente precisará preencher ao solicitar este serviço (ex: Banner exige largura/altura/lona; Cartão exige papel/cantos; etc.).
            </p>
          </div>

          {/* Current Requirements List */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-gray-700 text-xs">
              Requisitos Atuais Habilitados
            </h4>

            {Object.entries(currentRequirements).map(([key, config]) => (
              <div
                key={key}
                className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between gap-4 shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={config.required !== false}
                    onChange={() => handleToggleRequirementRequired(key)}
                    className="rounded text-brand-navy focus:ring-brand-cyan"
                  />
                  <div>
                    <span className="font-bold text-gray-900 block">{config.label}</span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      Tipo: {config.type} {config.options ? `• [${config.options.join(', ')}]` : ''}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    config.required !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {config.required !== false ? 'Obrigatório' : 'Opcional'}
                  </span>

                  <button
                    onClick={() => handleRemoveRequirement(key)}
                    className="p-1 text-gray-400 hover:text-rose-600 transition"
                    title="Remover requisito"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Requirement Form */}
          <form onSubmit={handleAddNewRequirement} className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
            <h4 className="font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
              <PlusCircle className="w-4 h-4 text-brand-cyan" />
              <span>Adicionar Novo Requisito Customizado</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Identificador (sem espaço)</label>
                <input
                  type="text"
                  placeholder="ex: laminacao"
                  value={newReqKey}
                  onChange={(e) => setNewReqKey(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Nome de Exibição (Label)</label>
                <input
                  type="text"
                  placeholder="ex: Tipo de Laminação"
                  value={newReqLabel}
                  onChange={(e) => setNewReqLabel(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Opções (separadas por vírgula)</label>
                <input
                  type="text"
                  placeholder="ex: Fosca, Brilho, Holográfica"
                  value={newReqOptions}
                  onChange={(e) => setNewReqOptions(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-3 py-1.5 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Requisito</span>
            </button>
          </form>

          {/* Modal Actions */}
          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button
              onClick={() => setIsRequirementsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveRequirements}
              className="px-5 py-2 rounded-xl bg-brand-navy hover:bg-brand-dark text-white font-bold shadow-sm flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Salvar Configuração de Requisitos</span>
            </button>
          </div>

        </div>
      </Modal>

    </div>
  );
}
