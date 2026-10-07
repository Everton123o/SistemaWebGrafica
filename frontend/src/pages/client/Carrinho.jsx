import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingCart, Trash2, ArrowRight, ArrowLeft, Tag, ShieldCheck, MapPin, Check } from 'lucide-react';

export function Carrinho() {
  const { cart, removeFromCart, clearCart, navigateTo, addToast } = useApp();
  const [coupon, setCoupon] = useState('BEMVINDOPRINT10');
  const [appliedCoupon, setAppliedCoupon] = useState(true);

  const subtotal = cart.reduce((acc, item) => acc + (item.price || 43.90), 0);
  const discount = appliedCoupon ? subtotal * 0.10 : 0;
  const total = subtotal - discount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'BEMVINDOPRINT10') {
      setAppliedCoupon(true);
      addToast('Cupom BEMVINDOPRINT10 de 10% aplicado com sucesso!', 'success');
    } else {
      addToast('Cupom inválido ou expirado.', 'error');
    }
  };

  const handleFinalizeOrders = () => {
    addToast('Redirecionando para envio e validação das artes...', 'info');
    navigateTo('catalogo');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('catalogo')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-brand-navy transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continuar comprando</span>
        </button>
        <h1 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-brand-navy" />
          Meu Carrinho de Compras
        </h1>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-7 space-y-3">
            {cart.map(item => (
              <div
                key={item.cartId}
                className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=120'}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-100 flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.specsSummary || '500 unidades • Couché 300g • Verniz Total'}
                    </p>
                    <span className="text-xs font-bold text-brand-navy block mt-1">
                      R$ {(item.price || 43.90).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartId)}
                  className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                  title="Remover item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <div className="flex justify-end pt-2">
              <button
                onClick={clearCart}
                className="text-xs text-gray-500 hover:text-rose-600 underline font-medium"
              >
                Esvaziar carrinho
              </button>
            </div>
          </div>

          {/* Checkout Summary Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
                Resumo da Compra
              </h3>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Cupom de desconto"
                  className="flex-1 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold uppercase text-gray-800 focus:bg-white focus:outline-none focus:border-brand-navy"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-brand-navy hover:bg-brand-dark text-white text-xs font-bold rounded-xl transition"
                >
                  Aplicar
                </button>
              </form>

              {/* Price details */}
              <div className="space-y-2 text-xs pt-2 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Desconto (BEMVINDOPRINT10 - 10%):</span>
                    <span>- R$ {discount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    Balcão Delmiro Gouveia:
                  </span>
                  <span className="font-bold text-emerald-600">Grátis</span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                <span className="text-xs font-bold uppercase text-gray-500">Total a Pagar:</span>
                <span className="text-2xl font-black text-brand-navy">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleFinalizeOrders}
                className="w-full py-3.5 px-4 rounded-xl bg-[#ffdd00] hover:bg-[#ffe633] text-gray-950 font-black text-xs sm:text-sm transition-all transform hover:scale-102 shadow-md flex items-center justify-center gap-2"
              >
                <span>Finalizar Pedido com Envio de Arte</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500 space-y-3">
          <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <h2 className="text-base font-bold text-gray-800">Seu carrinho está vazio no momento.</h2>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Acesse nosso catálogo com preços calculados em tempo real e adicione cartões, banners, copos e adesivos.
          </p>
          <button
            onClick={() => navigateTo('catalogo')}
            className="px-6 py-2.5 bg-brand-navy hover:bg-brand-dark text-white text-xs font-bold rounded-xl transition"
          >
            Navegar no Catálogo
          </button>
        </div>
      )}
    </div>
  );
}
