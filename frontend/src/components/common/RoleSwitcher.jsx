import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Shield, Wrench, ChevronDown, Check, Sparkles } from 'lucide-react';

export function RoleSwitcher() {
  const { currentRole, switchRole } = useApp();
  const [open, setOpen] = useState(false);

  const roles = [
    {
      id: 'CLIENTE',
      label: 'Visão do Cliente',
      desc: 'Catálogo estilo GIV Online, Novo Pedido, Meus Pedidos e Envio de Correção',
      icon: Users,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'RESPONSAVEL_GRAFICA',
      label: 'Responsável da Gráfica',
      desc: 'Análise de Pré-impressão, Validação técnica, Solicitar Correção e Produção',
      icon: Wrench,
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'ADMINISTRADOR',
      label: 'Administrador Master',
      desc: 'Gestão de Usuários, Clientes, Catálogo de Serviços, Requisitos e Preços',
      icon: Shield,
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  ];

  const current = roles.find(r => r.id === currentRole) || roles[0];
  const CurrentIcon = current.icon;

  return (
    <div className="relative inline-block text-left z-40">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 border border-brand-cyan/40 shadow-sm hover:shadow-md hover:border-brand-cyan transition text-xs font-semibold text-gray-800"
        title="Alternar perfil de demonstração"
      >
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <CurrentIcon className="w-3.5 h-3.5 text-brand-navy" />
        <span className="hidden sm:inline font-bold text-brand-navy">{current.label}</span>
        <ChevronDown className="w-3 h-3 text-gray-500" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 p-2 z-50 border border-gray-100">
            <div className="px-3 py-2 border-b border-gray-100 mb-1">
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
                Alternar Visão do Sistema
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Conforme definido nas regras do .harness:
              </p>
            </div>

            <div className="space-y-1">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = currentRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => {
                      switchRole(role.id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition ${
                      isSelected
                        ? 'bg-brand-navy text-white shadow-sm'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                          {role.label}
                        </p>
                        {isSelected && <Check className="w-3.5 h-3.5 text-brand-cyan" />}
                      </div>
                      <p className={`text-[11px] mt-0.5 line-clamp-2 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                        {role.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
