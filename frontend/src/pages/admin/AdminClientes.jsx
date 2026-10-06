import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';
import { OrderStatusBadge } from '../../components/common/Badge';
import {
  Users,
  Search,
  UserPlus,
  Edit2,
  Building2,
  Phone,
  Mail,
  MapPin,
  History,
  Package,
  Calendar
} from 'lucide-react';

export function AdminClientes() {
  const { clients, orders, addClient, updateClient } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [document, setDocument] = useState('');
  const [documentType, setDocumentType] = useState('CNPJ');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.document.includes(searchTerm) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreate = () => {
    setSelectedClient(null);
    setName('');
    setCompany('');
    setDocument('');
    setDocumentType('CNPJ');
    setEmail('');
    setPhone('');
    setAddress('Delmiro Gouveia - AL');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (client) => {
    setSelectedClient(client);
    setName(client.name);
    setCompany(client.company || '');
    setDocument(client.document || '');
    setDocumentType(client.documentType || 'CNPJ');
    setEmail(client.email);
    setPhone(client.phone || '');
    setAddress(client.address || '');
    setIsModalOpen(true);
  };

  const handleOpenHistory = (client) => {
    setSelectedClient(client);
    setIsHistoryModalOpen(true);
  };

  const handleSaveClient = (e) => {
    e.preventDefault();
    if (selectedClient) {
      updateClient(selectedClient.id, {
        name,
        company,
        document,
        documentType,
        email,
        phone,
        address
      });
    } else {
      addClient({
        name,
        company,
        document,
        documentType,
        email,
        phone,
        address,
        city: 'Delmiro Gouveia',
        state: 'AL'
      });
    }
    setIsModalOpen(false);
  };

  // Find client orders for history modal
  const clientOrders = selectedClient
    ? orders.filter(o => o.clientEmail === selectedClient.email || o.clientName === selectedClient.name)
    : [];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <Users className="w-6 h-6 text-brand-navy" />
              Carteira de Clientes da Gráfica
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Consulte cadastro, dados de faturamento e histórico completo de pedidos de cada cliente.
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-dark text-white font-bold text-xs transition shadow-xs flex items-center gap-1.5 self-start md:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Cadastrar Cliente</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar por nome, empresa ou CNPJ/CPF..."
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-none focus:border-brand-navy"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
          </div>
          <span className="text-xs text-gray-500 hidden sm:inline">
            Total cadastrado: <strong>{filtered.length} cliente(s)</strong>
          </span>
        </div>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs hover:shadow-sm transition space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug">
                    {client.name}
                  </h3>
                  {client.company && (
                    <span className="text-xs text-brand-navy font-semibold flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-gray-400" />
                      {client.company}
                    </span>
                  )}
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600">
                  {client.documentType || 'DOC'}: {client.document}
                </span>
              </div>

              <div className="mt-3 space-y-1.5 text-xs text-gray-600 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span className="truncate">{client.address || 'Delmiro Gouveia - AL'}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
              <button
                onClick={() => handleOpenHistory(client)}
                className="text-xs font-bold text-brand-navy hover:text-brand-cyan flex items-center gap-1 transition"
              >
                <History className="w-3.5 h-3.5" />
                <span>Histórico de Pedidos</span>
              </button>

              <button
                onClick={() => handleOpenEdit(client)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                title="Editar cadastro"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Client Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedClient ? 'Editar Cadastro do Cliente' : 'Novo Cliente'}
      >
        <form onSubmit={handleSaveClient} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Nome do Responsável
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Razão Social / Nome Fantasia
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Tipo Documento
              </label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
              >
                <option value="CNPJ">CNPJ</option>
                <option value="CPF">CPF</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Número do Documento
              </label>
              <input
                type="text"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                placeholder="00.000.000/0000-00"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Telefone / WhatsApp
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              Endereço / Cidade
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
            />
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
              Salvar Cliente
            </button>
          </div>
        </form>
      </Modal>

      {/* History Modal */}
      <Modal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        title={`Histórico de Pedidos de ${selectedClient?.name}`}
      >
        <div className="space-y-4 text-xs">
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
            <p><strong>Empresa:</strong> {selectedClient?.company || 'Pessoa Física'}</p>
            <p className="text-gray-500">Documento: {selectedClient?.document}</p>
          </div>

          {clientOrders.length > 0 ? (
            <div className="space-y-2.5">
              {clientOrders.map(o => (
                <div key={o.id} className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-gray-900">#{o.id}</span>
                      <OrderStatusBadge status={o.status} size="sm" />
                    </div>
                    <p className="font-semibold text-gray-800 mt-0.5">{o.serviceName}</p>
                    <span className="text-[10px] text-gray-400">
                      Data: {new Date(o.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <span className="font-bold text-brand-navy">
                    R$ {o.totalValue?.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-6">
              Nenhum pedido registrado para este cliente até o momento.
            </p>
          )}

          <div className="flex justify-end pt-2 border-t border-gray-100">
            <button
              onClick={() => setIsHistoryModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold"
            >
              Fechar
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
