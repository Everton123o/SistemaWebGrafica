import React from 'react';
import { Star, Clock, ArrowRight, ShieldCheck, ShoppingCart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ProductCard({ service }) {
  const { navigateTo } = useApp();

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-gray-200/90 hover:border-brand-cyan/60 shadow-2xs hover:shadow-card-hover transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      
      {/* Product Image & Badge */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100 cursor-pointer" onClick={() => navigateTo('novo-pedido', { serviceId: service.id })}>
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transform group-hover:scale-108 transition duration-500 ease-out"
          loading="lazy"
        />
        
        {/* Floating Tag */}
        {service.badge && (
          <div className="absolute top-2.5 left-2.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#ffdd00] text-gray-950 shadow-sm">
              {service.badge}
            </span>
          </div>
        )}

        <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
          <Clock className="w-3 h-3 text-brand-yellow" />
          <span>{service.deliveryDays}d úteis</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        
        {/* Category */}
        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-navy">
          {service.category}
        </span>

        {/* Title */}
        <h3
          onClick={() => navigateTo('novo-pedido', { serviceId: service.id })}
          className="font-bold text-sm text-gray-900 group-hover:text-brand-navy transition mt-1 line-clamp-2 cursor-pointer leading-snug"
          title={service.name}
        >
          {service.name}
        </h3>

        {/* Rating Stars */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
          </div>
          <span className="text-[11px] text-gray-500 font-medium">
            ({service.reviewCount})
          </span>
        </div>

        {/* Description snippet */}
        <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
          {service.description}
        </p>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Price & Action Box */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 font-semibold block leading-none">
              A partir de
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base sm:text-lg font-black text-emerald-700">
                R$ {service.priceFrom.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-[10px] text-gray-400">
                / {service.unit}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigateTo('novo-pedido', { serviceId: service.id })}
            className="px-3.5 py-2 rounded-xl bg-brand-navy hover:bg-brand-dark text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs group-hover:bg-brand-cyan group-hover:text-gray-950"
            title="Configurar especificações e fazer pedido"
          >
            <span>Configurar</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>

    </div>
  );
}
