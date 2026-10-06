import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from './ProductCard';
import { Flame, Sparkles, Trophy, Heart } from 'lucide-react';

export function ProductShowcase() {
  const { services } = useApp();
  const [activeTab, setActiveTab] = useState('mais-vendidos');

  const tabs = [
    { id: 'mais-vendidos', label: 'Mais Vendidos', icon: Trophy },
    { id: 'destaques-insta', label: 'Destaques Instagram @printpro', icon: Flame },
    { id: 'comunicacao-visual', label: 'Comunicação Visual & Banners', icon: Sparkles },
    { id: 'adesivos', label: 'Adesivos & Lacres', icon: Heart }
  ];

  const getFilteredServices = () => {
    if (activeTab === 'mais-vendidos') {
      return services.filter(s => s.popular);
    } else if (activeTab === 'destaques-insta') {
      return services.filter(s => s.category === 'Brindes & Copos' || s.category === 'Adesivos & Rótulos');
    } else if (activeTab === 'comunicacao-visual') {
      return services.filter(s => s.category === 'Comunicação Visual');
    } else if (activeTab === 'adesivos') {
      return services.filter(s => s.category === 'Adesivos & Rótulos');
    }
    return services;
  };

  const displayedServices = getFilteredServices();

  return (
    <section className="w-full my-12">
      {/* Title & Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Produtos em Destaque
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Os materiais gráficos mais solicitados em Delmiro Gouveia e região
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-2xl overflow-x-auto max-w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-brand-navy shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-magenta' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedServices.map((service) => (
          <ProductCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
