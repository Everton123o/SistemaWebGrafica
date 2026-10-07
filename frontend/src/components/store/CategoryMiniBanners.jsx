import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CreditCard,
  FileSpreadsheet,
  Stamp,
  Coffee,
  Flag,
  Folder,
  IdCard,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export function CategoryMiniBanners() {
  const { navigateTo } = useApp();

  //rever depois para deixar mais bonito

  const categories = [
    {
      name: 'Cartões de Visita',
      icon: CreditCard,
      badge: 'A partir R$ 43,90',
      serviceId: 1,
      bg: 'from-blue-600 to-indigo-700'
    },
    {
      name: 'Adesivos & Lacres',
      icon: Stamp,
      badge: 'Anti-Violação',
      serviceId: 2,
      bg: 'from-cyan-600 to-teal-700'
    },
    {
      name: 'Banners & Lonas',
      icon: Flag,
      badge: 'Produção 24h',
      serviceId: 3,
      bg: 'from-amber-500 to-orange-600'
    },
    {
      name: 'Copos & Brindes',
      icon: Coffee,
      badge: 'Exclusivo DG',
      serviceId: 4,
      bg: 'from-pink-600 to-rose-700'
    },
    {
      name: 'Folhetos & Flyers',
      icon: FileSpreadsheet,
      badge: 'Milheiro Econômico',
      serviceId: 5,
      bg: 'from-emerald-600 to-teal-800'
    },
    {
      name: 'Wind Banners',
      icon: Flag,
      badge: 'Kit Completo',
      serviceId: 6,
      bg: 'from-purple-600 to-indigo-800'
    },
    {
      name: 'Pastas Corporativas',
      icon: Folder,
      badge: 'Com Orelha',
      serviceId: 7,
      bg: 'from-slate-700 to-gray-900'
    },
    {
      name: 'Crachás & PVC',
      icon: IdCard,
      badge: '0.76mm Rígido',
      serviceId: 8,
      bg: 'from-blue-700 to-cyan-800'
    }
  ];

  return (
    <section className="w-full my-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
            {/*<Sparkles className="w-4 h-4 text-brand-cyan" />*/}
            Navegue por Departamentos Rápidos
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Clique no produto desejado para simular e iniciar seu pedido
          </p>
        </div>

        <button
          onClick={() => navigateTo('catalogo')}
          className="text-xs font-bold text-brand-navy hover:text-brand-gold flex items-center gap-1 transition"
        >
          <span>Ver catálogo completo</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <button
              key={idx}
              onClick={() => navigateTo('novo-pedido', { serviceId: cat.serviceId })}
              className="group flex flex-col items-center p-3 rounded-2xl bg-white border border-gray-200/80 hover:border-brand-navy shadow-2xs hover:shadow-md transition-all transform hover:-translate-y-1 text-center"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.bg} text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition duration-300`}>
                <Icon className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-gray-800 mt-2.5 line-clamp-1 group-hover:text-brand-navy transition">
                {cat.name}
              </span>
              <span className="text-[10px] text-gray-400 font-medium mt-0.5">
                {cat.badge}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
