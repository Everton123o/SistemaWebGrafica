import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';
import { Users, UserPlus, Edit2, Shield, Wrench, User, Power, Search, CheckCircle2 } from 'lucide-react';

export function AdminUsuarios() {
  const { users, addUser, updateUser, toggleUserStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  // Form state
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('CLIENTE');
  const [userPhone, setUserPhone] = useState('');

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingUserId(null);
    setUserName('');
    setUserEmail('');
    setUserRole('CLIENTE');
    setUserPhone('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUserId(user.id);
    setUserName(user.name);
    setUserEmail(user.email);
    setUserRole(user.role);
    setUserPhone(user.phone || '');
    setIsModalOpen(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (editingUserId) {
      updateUser(editingUserId, {
        name: userName,
        email: userEmail,
        role: userRole,
        phone: userPhone
      });
    } else {
      addUser({
        name: userName,
        email: userEmail,
        role: userRole,
        phone: userPhone
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <Users className="w-6 h-6 text-brand-navy" />
              Gerenciamento de Usuários do Sistema
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Cadastre e gerencie operadores de pré-impressão, administradores e clientes.
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-dark text-white font-bold text-xs transition shadow-xs flex items-center gap-1.5 self-start md:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Novo Usuário</span>
          </button>
        </div>

        {/* Search */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar por nome, e-mail ou perfil..."
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-none focus:border-brand-navy"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
          </div>
          <span className="text-xs text-gray-500 hidden sm:inline">
            Total: <strong>{filteredUsers.length} usuário(s)</strong>
          </span>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Nome & Contato</th>
                <th className="py-3.5 px-4">E-mail</th>
                <th className="py-3.5 px-4">Papel / Perfil</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Data Cadastro</th>
                <th className="py-3.5 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => {
                const isActive = user.status === 'ATIVO';

                return (
                  <tr key={user.id} className="hover:bg-gray-50/60 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-brand-navy/10 text-brand-navy flex items-center justify-center font-bold text-xs flex-shrink-0">
                          {user.name[0]}
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 block">{user.name}</span>
                          <span className="text-[11px] text-gray-400">{user.phone || 'Sem telefone'}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-gray-700 font-mono">
                      {user.email}
                    </td>

                    <td className="py-3.5 px-4">
                      {user.role === 'ADMINISTRADOR' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                          <Shield className="w-3 h-3" />
                          Administrador
                        </span>
                      ) : user.role === 'RESPONSAVEL_GRAFICA' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          <Wrench className="w-3 h-3" />
                          Responsável Gráfica
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                          <User className="w-3 h-3" />
                          Cliente
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                        {user.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-gray-500">
                      {user.createdAt || '01/01/2026'}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(user)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-brand-navy hover:bg-gray-100 transition"
                          title="Editar dados"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`p-1.5 rounded-lg transition ${
                            isActive
                              ? 'text-gray-400 hover:text-rose-600 hover:bg-rose-50'
                              : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={isActive ? 'Desativar usuário' : 'Ativar usuário'}
                        >
                          <Power className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUserId ? 'Editar Usuário' : 'Cadastrar Novo Usuário'}
      >
        <form onSubmit={handleSaveUser} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              E-mail de Acesso
            </label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Papel / Perfil no Sistema
              </label>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold"
              >
                <option value="CLIENTE">CLIENTE</option>
                <option value="RESPONSAVEL_GRAFICA">RESPONSAVEL_GRAFICA (Técnico)</option>
                <option value="ADMINISTRADOR">ADMINISTRADOR (Master)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Telefone / WhatsApp
              </label>
              <input
                type="text"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                placeholder="(82) 99999-9999"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand-navy hover:bg-brand-dark text-white text-xs font-bold shadow-sm"
            >
              Salvar Usuário
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
