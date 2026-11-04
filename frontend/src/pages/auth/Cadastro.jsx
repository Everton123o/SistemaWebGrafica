import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { ChevronsLeft, Eye, EyeOff, LoaderCircle, CircleAlert, Check, Pencil } from 'lucide-react';
import {
  onlyDigits,
  maskCPF,
  maskCNPJ,
  maskPhone,
  maskCEP,
  isValidEmail,
  isValidCPF,
  isValidCNPJ,
  isValidPhone
} from '../../utils/brazilianFormats';

const STEPS = ['Seus dados', 'Endereço', 'Senha', 'Confirmação'];

const MIN_PASSWORD_LENGTH = 8;

const UF_OPTIONS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
  'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const INITIAL_FORM = {
  personType: 'PF',
  cpf: '',
  name: '',
  cnpj: '',
  company: '',
  email: '',
  birthDate: '',
  phone: '',
  cep: '',
  street: '',
  number: '',
  complement: '',
  district: '',
  city: '',
  state: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
};

const inputClass = (hasError) =>
  `w-full h-10 px-3 rounded-md border bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:ring-2 ${
    hasError
      ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
      : 'border-gray-300 focus:border-giv-purple focus:ring-giv-purple/15'
  }`;

function Field({ label, required, optional, error, className = '', children }) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-gray-800 mb-1.5">
        {label}
        {optional && <span className="font-normal"> (opcional)</span>}
        {required && <span className="text-rose-600"> *</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-[11px] text-rose-600">{error}</p>}
    </div>
  );
}

function StepIndicator({ current }) {
  return (
    <div className="flex flex-col items-center gap-2 mb-6">
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {STEPS.map((step, index) => (
          <span
            key={step}
            className={`h-[3px] w-6 rounded-full transition-colors ${index <= current ? 'bg-giv-purple' : 'bg-gray-200'}`}
          />
        ))}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-giv-purple">
        {STEPS[current]}
        <span className="sr-only"> — etapa {current + 1} de {STEPS.length}</span>
      </span>
    </div>
  );
}

function SummarySection({ title, onEdit, rows }) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 text-xs font-semibold text-giv-purple hover:underline"
        >
          <Pencil className="w-3 h-3" />
          Editar
        </button>
      </div>
      <dl className="space-y-1.5">
        {rows.filter(([, value]) => value).map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 text-sm">
            <dt className="text-gray-500 shrink-0">{label}</dt>
            <dd className="text-gray-900 font-medium text-right break-all">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Cadastro() {
  const { register, navigateTo, users, clients } = useApp();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [today] = useState(() => new Date().toISOString().split('T')[0]);

  const isPF = form.personType === 'PF';

  const setField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const switchPersonType = (personType) => {
    setForm(prev => ({ ...prev, personType }));
    setErrors({});
  };

  // ==================== VALIDATION PER STEP ====================

  const validateStep = (stepIndex) => {
    const e = {};

    if (stepIndex === 0) {
      if (isPF) {
        if (!form.cpf) e.cpf = 'Informe seu CPF.';
        else if (!isValidCPF(form.cpf)) e.cpf = 'CPF inválido.';
        if (!form.name.trim()) e.name = 'Informe seu nome completo.';
        else if (form.name.trim().split(/\s+/).length < 2) e.name = 'Informe nome e sobrenome.';
        if (form.birthDate && new Date(form.birthDate) > new Date()) {
          e.birthDate = 'Data de nascimento inválida.';
        }
      } else {
        if (!form.cnpj) e.cnpj = 'Informe o CNPJ.';
        else if (!isValidCNPJ(form.cnpj)) e.cnpj = 'CNPJ inválido.';
        if (!form.company.trim()) e.company = 'Informe a razão social.';
        if (!form.name.trim()) e.name = 'Informe o nome do responsável.';
      }

      const documentDigits = onlyDigits(isPF ? form.cpf : form.cnpj);
      const documentField = isPF ? 'cpf' : 'cnpj';
      if (!e[documentField] && clients.some(c => onlyDigits(c.document) === documentDigits)) {
        e[documentField] = `Já existe uma conta com este ${isPF ? 'CPF' : 'CNPJ'}.`;
      }

      if (!form.email.trim()) e.email = 'Informe seu e-mail.';
      else if (!isValidEmail(form.email)) e.email = 'E-mail inválido.';
      else if (users.some(u => u.email.toLowerCase() === form.email.trim().toLowerCase())) {
        e.email = 'Já existe uma conta com este e-mail.';
      }

      if (form.phone && !isValidPhone(form.phone)) e.phone = 'Celular inválido.';
    }

    if (stepIndex === 1) {
      if (onlyDigits(form.cep).length !== 8) e.cep = 'CEP inválido.';
      if (!form.street.trim()) e.street = 'Informe o endereço.';
      if (!form.number.trim()) e.number = 'Informe o número.';
      if (!form.district.trim()) e.district = 'Informe o bairro.';
      if (!form.city.trim()) e.city = 'Informe a cidade.';
      if (!form.state) e.state = 'Selecione a UF.';
    }

    if (stepIndex === 2) {
      if (form.password.length < MIN_PASSWORD_LENGTH) {
        e.password = `A senha deve ter no mínimo ${MIN_PASSWORD_LENGTH} caracteres.`;
      }
      if (!form.confirmPassword) e.confirmPassword = 'Confirme sua senha.';
      else if (form.confirmPassword !== form.password) e.confirmPassword = 'As senhas não coincidem.';
      if (!form.acceptTerms) e.acceptTerms = 'Você precisa aceitar os termos para continuar.';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ==================== NAVIGATION ====================

  const handleContinue = (event) => {
    event.preventDefault();
    if (!validateStep(step)) return;
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSubmitError('');
    if (step === 0) navigateTo('login');
    else setStep(s => s - 1);
  };

  const goToStep = (target) => {
    setSubmitError('');
    setErrors({});
    setStep(target);
  };

  const handleCreateAccount = (event) => {
    event.preventDefault();

    // Revalida todas as etapas antes de concluir
    for (let i = 0; i < 3; i++) {
      if (!validateStep(i)) {
        setStep(i);
        return;
      }
    }

    setLoading(true);
    setSubmitError('');
    // Simula a latência de uma requisição enquanto a API de cadastro não está integrada
    setTimeout(() => {
      const result = register({
        personType: form.personType,
        document: isPF ? form.cpf : form.cnpj,
        name: form.name,
        company: isPF ? '' : form.company,
        email: form.email,
        birthDate: isPF ? form.birthDate : '',
        phone: form.phone,
        address: {
          cep: form.cep,
          street: form.street,
          number: form.number,
          complement: form.complement,
          district: form.district,
          city: form.city,
          state: form.state
        },
        password: form.password
      });
      setLoading(false);
      if (!result.ok) setSubmitError(result.error);
    }, 700);
  };

  const passwordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword(v => !v)}
      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition"
      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
      title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
    >
      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );

  const formattedBirthDate = form.birthDate
    ? new Date(`${form.birthDate}T00:00:00`).toLocaleDateString('pt-BR')
    : '';

  return (
    <AuthLayout
      onLogoClick={() => navigateTo('home')}
      topLeft={
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-0.5 text-sm text-gray-800 hover:text-giv-purple transition"
        >
          <ChevronsLeft className="w-4 h-4" />
          Voltar
        </button>
      }
    >
      <main className="flex-1 w-full max-w-[360px] mx-auto px-4 pt-4 pb-10">
        <div className="text-center mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Crie sua conta</h1>
          <p className="text-xs text-gray-500 mt-1">Leva menos de dois minutos</p>
        </div>

        <StepIndicator current={step} />

        {/* ==================== STEP 1: SEUS DADOS ==================== */}
        {step === 0 && (
          <form onSubmit={handleContinue} className="space-y-4" noValidate>
            <div className="inline-flex p-1 rounded-full bg-gray-100" role="tablist">
              {[
                { value: 'PF', label: 'Pessoa Física' },
                { value: 'PJ', label: 'Pessoa Jurídica' }
              ].map(option => (
                <button
                  key={option.value}
                  type="button"
                  role="tab"
                  aria-selected={form.personType === option.value}
                  onClick={() => switchPersonType(option.value)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition ${
                    form.personType === option.value
                      ? 'bg-white text-giv-purple shadow-sm'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {isPF ? (
              <>
                <Field label="CPF" required error={errors.cpf} className="w-1/2 pr-1.5">
                  <input
                    inputMode="numeric"
                    value={form.cpf}
                    onChange={(e) => setField('cpf', maskCPF(e.target.value))}
                    placeholder="000.000.000-00"
                    className={inputClass(errors.cpf)}
                  />
                </Field>
                <Field label="Nome Completo" required error={errors.name}>
                  <input
                    value={form.name}
                    onChange={(e) => setField('name', e.target.value)}
                    autoComplete="name"
                    className={inputClass(errors.name)}
                  />
                </Field>
              </>
            ) : (
              <>
                <Field label="CNPJ" required error={errors.cnpj} className="w-2/3">
                  <input
                    inputMode="numeric"
                    value={form.cnpj}
                    onChange={(e) => setField('cnpj', maskCNPJ(e.target.value))}
                    placeholder="00.000.000/0000-00"
                    className={inputClass(errors.cnpj)}
                  />
                </Field>
                <Field label="Razão Social" required error={errors.company}>
                  <input
                    value={form.company}
                    onChange={(e) => setField('company', e.target.value)}
                    autoComplete="organization"
                    className={inputClass(errors.company)}
                  />
                </Field>
                <Field label="Nome do Responsável" required error={errors.name}>
                  <input
                    value={form.name}
                    onChange={(e) => setField('name', e.target.value)}
                    autoComplete="name"
                    className={inputClass(errors.name)}
                  />
                </Field>
              </>
            )}

            <Field label="E-mail" required error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                autoComplete="email"
                className={inputClass(errors.email)}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              {isPF ? (
                <Field label="Data de nascimento" optional error={errors.birthDate}>
                  <input
                    type="date"
                    value={form.birthDate}
                    max={today}
                    onChange={(e) => setField('birthDate', e.target.value)}
                    autoComplete="bday"
                    className={inputClass(errors.birthDate)}
                  />
                </Field>
              ) : null}
              <Field label="Celular" error={errors.phone}>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={form.phone}
                  onChange={(e) => setField('phone', maskPhone(e.target.value))}
                  placeholder="(00) 00000-0000"
                  autoComplete="tel"
                  className={inputClass(errors.phone)}
                />
              </Field>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full h-12 rounded-full bg-giv-purple hover:bg-[#5a1699] active:scale-[0.99] text-white text-sm font-semibold shadow-sm transition"
              >
                Continuar
              </button>
            </div>
          </form>
        )}

        {/* ==================== STEP 2: ENDEREÇO ==================== */}
        {step === 1 && (
          <form onSubmit={handleContinue} className="space-y-4" noValidate>
            <Field label="CEP" required error={errors.cep} className="w-1/2 pr-1.5">
              <input
                inputMode="numeric"
                value={form.cep}
                onChange={(e) => setField('cep', maskCEP(e.target.value))}
                placeholder="00000-000"
                autoComplete="postal-code"
                className={inputClass(errors.cep)}
              />
            </Field>

            <Field label="Endereço" required error={errors.street}>
              <input
                value={form.street}
                onChange={(e) => setField('street', e.target.value)}
                placeholder="Rua, avenida..."
                autoComplete="address-line1"
                className={inputClass(errors.street)}
              />
            </Field>

            <div className="grid grid-cols-[1fr_1.6fr] gap-3">
              <Field label="Número" required error={errors.number}>
                <input
                  value={form.number}
                  onChange={(e) => setField('number', e.target.value)}
                  className={inputClass(errors.number)}
                />
              </Field>
              <Field label="Complemento" optional>
                <input
                  value={form.complement}
                  onChange={(e) => setField('complement', e.target.value)}
                  placeholder="Apto, sala..."
                  autoComplete="address-line2"
                  className={inputClass(false)}
                />
              </Field>
            </div>

            <Field label="Bairro" required error={errors.district}>
              <input
                value={form.district}
                onChange={(e) => setField('district', e.target.value)}
                className={inputClass(errors.district)}
              />
            </Field>

            <div className="grid grid-cols-[1fr_88px] gap-3">
              <Field label="Cidade" required error={errors.city}>
                <input
                  value={form.city}
                  onChange={(e) => setField('city', e.target.value)}
                  autoComplete="address-level2"
                  className={inputClass(errors.city)}
                />
              </Field>
              <Field label="UF" required error={errors.state}>
                <select
                  value={form.state}
                  onChange={(e) => setField('state', e.target.value)}
                  autoComplete="address-level1"
                  className={inputClass(errors.state)}
                >
                  <option value="">--</option>
                  {UF_OPTIONS.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full h-12 rounded-full bg-giv-purple hover:bg-[#5a1699] active:scale-[0.99] text-white text-sm font-semibold shadow-sm transition"
              >
                Continuar
              </button>
            </div>
          </form>
        )}

        {/* ==================== STEP 3: SENHA ==================== */}
        {step === 2 && (
          <form onSubmit={handleContinue} className="space-y-4" noValidate>
            <Field label="Senha" required error={errors.password}>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setField('password', e.target.value)}
                  autoComplete="new-password"
                  className={`${inputClass(errors.password)} pr-10`}
                />
                {passwordToggle}
              </div>
            </Field>

            <Field label="Confirmar senha" required error={errors.confirmPassword}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={(e) => setField('confirmPassword', e.target.value)}
                autoComplete="new-password"
                className={inputClass(errors.confirmPassword)}
              />
            </Field>

            <ul className="space-y-1 text-xs">
              {[
                { ok: form.password.length >= MIN_PASSWORD_LENGTH, label: `Mínimo de ${MIN_PASSWORD_LENGTH} caracteres` },
                { ok: !!form.password && form.password === form.confirmPassword, label: 'As senhas coincidem' }
              ].map(rule => (
                <li
                  key={rule.label}
                  className={`flex items-center gap-1.5 ${rule.ok ? 'text-emerald-600' : 'text-gray-400'}`}
                >
                  <Check className="w-3.5 h-3.5" />
                  {rule.label}
                </li>
              ))}
            </ul>

            <div>
              <label className="flex items-start gap-2 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.acceptTerms}
                  onChange={(e) => setField('acceptTerms', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-giv-purple"
                />
                <span>
                  Li e aceito os <span className="font-semibold text-giv-purple">Termos de Uso</span> e a{' '}
                  <span className="font-semibold text-giv-purple">Política de Privacidade</span>.
                </span>
              </label>
              {errors.acceptTerms && <p className="mt-1 text-[11px] text-rose-600">{errors.acceptTerms}</p>}
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full h-12 rounded-full bg-giv-purple hover:bg-[#5a1699] active:scale-[0.99] text-white text-sm font-semibold shadow-sm transition"
              >
                Continuar
              </button>
            </div>
          </form>
        )}

        {/* ==================== STEP 4: CONFIRMAÇÃO ==================== */}
        {step === 3 && (
          <form onSubmit={handleCreateAccount} className="space-y-3" noValidate>
            <p className="text-sm text-gray-600 text-center mb-2">Confira seus dados antes de criar a conta.</p>

            <SummarySection
              title="Seus dados"
              onEdit={() => goToStep(0)}
              rows={[
                ['Tipo', isPF ? 'Pessoa Física' : 'Pessoa Jurídica'],
                [isPF ? 'CPF' : 'CNPJ', isPF ? form.cpf : form.cnpj],
                ['Razão social', isPF ? '' : form.company],
                [isPF ? 'Nome' : 'Responsável', form.name.trim()],
                ['E-mail', form.email.trim()],
                ['Nascimento', isPF ? formattedBirthDate : ''],
                ['Celular', form.phone]
              ]}
            />

            <SummarySection
              title="Endereço"
              onEdit={() => goToStep(1)}
              rows={[
                ['CEP', form.cep],
                ['Endereço', `${form.street.trim()}, ${form.number.trim()}${form.complement.trim() ? ` - ${form.complement.trim()}` : ''}`],
                ['Bairro', form.district.trim()],
                ['Cidade', `${form.city.trim()} - ${form.state}`]
              ]}
            />

            {submitError && (
              <div role="alert" className="flex items-start gap-2 rounded-md bg-rose-50 border border-rose-200 px-3 py-2 text-xs text-rose-700">
                <CircleAlert className="w-4 h-4 shrink-0 mt-px" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-full bg-giv-purple hover:bg-[#5a1699] active:scale-[0.99] disabled:opacity-70 disabled:cursor-wait text-white text-sm font-semibold shadow-sm transition flex items-center justify-center gap-2"
              >
                {loading && <LoaderCircle className="w-4 h-4 animate-spin" />}
                {loading ? 'Criando conta...' : 'Criar minha conta'}
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-sm text-gray-700 mt-12">
          Já tem conta?{' '}
          <button
            type="button"
            onClick={() => navigateTo('login')}
            className="font-semibold text-giv-purple hover:underline"
          >
            Entrar
          </button>
        </p>
      </main>
    </AuthLayout>
  );
}
