import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../../components/store/ProductCard';
import { Filter, Search, Tag, ArrowUpDown, Sparkles } from 'lucide-react';

export function Catalogo() {
  const { services, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('TODOS');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('destaque');

  const categories = ['TODOS', ...Array.from(new Set(services.map(s => s.category)))];

  const filtered = services.filter(service => {
    const matchesCategory = selectedCategory === 'TODOS' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase()) ||
                          service.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'menor-preco') return a.priceFrom - b.priceFrom;
    if (sortBy === 'maior-preco') return b.priceFrom - a.priceFrom;
    if (sortBy === 'prazo') return a.deliveryDays - b.deliveryDays;
    return b.reviewCount - a.reviewCount; // destaque
  });

  return (
    <div className="space-y-6">
      {/* Catalog Header */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-cyan" />
              Catálogo de Produtos & Serviços Gráficos
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Escolha seu material gráfico e personalize suas especificações com orçamento na hora.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filtrar por nome do serviço..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-none focus:border-brand-navy"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Filter bar: Categories and Sorting */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-brand-navy text-white shadow-xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {cat === 'TODOS' ? 'Todos os Produtos' : cat}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs text-gray-500 self-end md:self-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <span>Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 focus:outline-none"
            >
              <option value="destaque">Mais Populares</option>
              <option value="menor-preco">Menor Preço</option>
              <option value="maior-preco">Maior Preço</option>
              <option value="prazo">Prazo Mais Rápido</option>
            </select>
          </div>

        </div>
      </div>

      {/* Grid of Results */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((service) => (
            <ProductCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500 space-y-3">
          <p className="text-base font-bold text-gray-800">
            Nenhum produto gráfico encontrado com os filtros selecionados.
          </p>
          <p className="text-xs text-gray-400">
            Tente buscar por termos mais genéricos ou limpe a busca.
          </p>
          <button
            onClick={() => { setSelectedCategory('TODOS'); setSearch(''); }}
            className="px-4 py-2 bg-brand-navy text-white text-xs font-bold rounded-xl"
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  );
}
