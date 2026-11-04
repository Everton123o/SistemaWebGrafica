import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AuthLayout } from '../../components/auth/AuthLayout';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LoaderCircle,
  CircleAlert,
  ArrowLeft,
  MailCheck
} from 'lucide-react';

function AppleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.365 1.43c0 1.14-.42 2.2-1.13 3.01-.85.97-2.24 1.72-3.37 1.63-.14-1.1.42-2.27 1.1-3.03.77-.86 2.1-1.52 3.4-1.61zM20.94 17.34c-.55 1.27-.82 1.84-1.53 2.96-.99 1.56-2.39 3.5-4.12 3.51-1.54.02-1.94-1-4.03-.99-2.09.01-2.53 1.01-4.07.99-1.73-.02-3.05-1.77-4.04-3.33C.38 16.13.1 11.04 1.86 8.35c1.25-1.91 3.22-3.03 5.08-3.03 1.89 0 3.08 1.04 4.64 1.04 1.52 0 2.44-1.04 4.63-1.04 1.65 0 3.4.9 4.65 2.45-4.09 2.24-3.42 8.07.08 9.57z" />
    </svg>
  );
}

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.88-3.02c-1.07.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.72-4.95H1.27v3.11A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.28 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.38-2.28V6.61H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.39l4.01-3.11z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.27 6.61l4.01 3.11C6.22 6.88 8.87 4.77 12 4.77z" />
    </svg>
  );
}

function TextField({ icon: Icon, type = 'text', value, onChange, placeholder, autoComplete, rightSlot, hasError }) {
  return (
    <div
      className={`flex items-center gap-2.5 h-12 px-3 rounded-md border bg-white transition focus-within:ring-2 ${
        hasError
          ? 'border-rose-300 focus-within:border-rose-400 focus-within:ring-rose-100'
          : 'border-gray-200 focus-within:border-giv-purple focus-within:ring-giv-purple/15'
      }`}
    >
      <Icon className="w-4 h-4 text-gray-400 shrink-0" />
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="flex-1 min-w-0 h-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none"
      />
      {rightSlot}
    </div>
  );
}

function PrimaryButton({ loading, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full h-12 rounded-full bg-giv-purple hover:bg-[#5a1699] active:scale-[0.99] disabled:opacity-70 disabled:cursor-wait text-white text-sm font-semibold shadow-sm transition flex items-center justify-center gap-2"
    >
      {loading && <LoaderCircle className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}

function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div role="alert" className="flex items-start gap-2 rounded-md bg-rose-50 border border-rose-200 px-3 py-2 text-xs text-rose-700">
      <CircleAlert className="w-4 h-4 shrink-0 mt-px" />
      <span>{message}</span>
    </div>
  );
}

export function Login() {
  const { login, navigateTo, addToast } = useApp();

  // 'login' | 'recover'
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError('');
    setPassword('');
    setShowPassword(false);
    setRecoverySent(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!isValidEmail(email)) return setError('Digite um e-mail válido.');
    if (!password) return setError('Digite sua senha.');
    setLoading(true);
    setError('');
    try {
      const result = await login(email, password);
      if (!result.ok) setError(result.error);
    } finally { setLoading(false); }
  };

  const handleRecover = (e) => {
    e.preventDefault();
    setError('Recuperação de senha ainda indisponível. Entre em contato com a gráfica.');
  };

  const handleSocialLogin = (provider) => {
    addToast(`Login com ${provider} ainda não está disponível. Use seu e-mail e senha.`, 'warning');
  };

  const passwordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword(v => !v)}
      className="p-1 text-gray-400 hover:text-gray-600 transition"
      title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
    >
      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );

  return (
    <AuthLayout onLogoClick={() => navigateTo('home')}>
      <main className="flex-1 w-full max-w-[434px] mx-auto px-4 py-10 sm:py-12">
        {mode === 'login' && (
          <>
            <h1 className="text-center text-lg font-semibold text-gray-900 mb-5">Acesse sua conta</h1>

            {/* Social logins */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleSocialLogin('Apple')}
                className="w-full h-11 rounded-full bg-black hover:bg-gray-900 text-white text-sm font-semibold flex items-center justify-center gap-2 transition"
              >
                <AppleIcon className="w-4 h-4" />
                Entrar com a Apple
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="w-full h-11 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 text-sm font-semibold flex items-center justify-center gap-2 transition"
              >
                <GoogleIcon className="w-4 h-4" />
                Entrar com Google
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6 px-6">
              <span className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">ou</span>
              <span className="flex-1 h-px bg-gray-100" />
            </div>

            <h2 className="text-center text-sm font-medium text-gray-800 mb-4">Sua conta PrintPro</h2>

            <form onSubmit={handleLogin} className="space-y-3" noValidate>
              <TextField
                icon={Mail}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu E-mail"
                autoComplete="email"
                hasError={!!error}
              />
              <TextField
                icon={Lock}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua Senha"
                autoComplete="current-password"
                rightSlot={passwordToggle}
                hasError={!!error}
              />

              <ErrorMessage message={error} />

              <div className="pt-1">
                <PrimaryButton loading={loading}>{loading ? 'Acessando...' : 'Acessar'}</PrimaryButton>
              </div>
            </form>

            <div className="text-center mt-5">
              <button
                type="button"
                onClick={() => switchMode('recover')}
                className="text-sm text-gray-500 hover:text-gray-800 hover:underline transition"
              >
                Esqueci minha senha
              </button>
            </div>

            <p className="text-center text-sm text-gray-700 mt-8">
              Novo por aqui?{' '}
              <button
                type="button"
                onClick={() => navigateTo('cadastro')}
                className="font-semibold text-giv-purple hover:underline"
              >
                Criar minha conta
              </button>
            </p>


          </>
        )}

        {mode === 'recover' && (
          <>
            <button
              type="button"
              onClick={() => switchMode('login')}
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o login
            </button>

            {recoverySent ? (
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4">
                  <MailCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <h1 className="text-lg font-semibold text-gray-900 mb-2">Verifique seu e-mail</h1>
                <p className="text-sm text-gray-500 mb-6">
                  Se <strong className="text-gray-800">{email.trim()}</strong> estiver cadastrado, você receberá um link
                  para redefinir sua senha.
                </p>
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="w-full h-12 rounded-full bg-giv-purple hover:bg-[#5a1699] text-white text-sm font-semibold transition"
                >
                  Voltar para o login
                </button>
              </div>
            ) : (
              <>
                <h1 className="text-center text-lg font-semibold text-gray-900 mb-1">Esqueceu sua senha?</h1>
                <p className="text-center text-sm text-gray-500 mb-6">
                  Informe o e-mail da sua conta e enviaremos as instruções para redefinir a senha.
                </p>

                <form onSubmit={handleRecover} className="space-y-3" noValidate>
                  <TextField
                    icon={Mail}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu E-mail"
                    autoComplete="email"
                    hasError={!!error}
                  />

                  <ErrorMessage message={error} />

                  <div className="pt-1">
                    <PrimaryButton loading={loading}>{loading ? 'Enviando...' : 'Enviar instruções'}</PrimaryButton>
                  </div>
                </form>
              </>
            )}
          </>
        )}
      </main>
    </AuthLayout>
  );
}
