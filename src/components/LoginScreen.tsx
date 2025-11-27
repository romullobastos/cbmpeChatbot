import { useState } from 'react';
import { Shield, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Screen } from '../App';

interface LoginScreenProps {
  onNavigate: (screen: Screen) => void;
}

const validateEmail = (email: string): { valid: boolean; message?: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Email inválido.' };
  }
  return { valid: true };
};

const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 6) {
    return { valid: false, message: 'Senha deve ter no mínimo 6 caracteres.' };
  }
  return { valid: true };
};

export function LoginScreen({ onNavigate }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    // Validar campos
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (!emailValidation.valid || !passwordValidation.valid) {
      setErrors({
        email: emailValidation.message || '',
        password: passwordValidation.message || '',
      });
      return;
    }

    setErrors({ email: '', password: '' });
    setIsLoading(true);

    // Simular login
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('chat');
    }, 1500);
  };

  const handleGovLogin = () => {
    setIsLoading(true);
    // Simular login com gov.br
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('chat');
    }, 1500);
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-700 via-red-600 to-red-800 px-6 pt-16 pb-12 text-center">
        <div className="w-20 h-20 bg-white rounded-full overflow-hidden flex items-center justify-center mx-auto mb-4">
          <img
            src="https://soge.bombeiros.pe.gov.br/assets/logo_cbmpe-0b92da2a2895c00fe13b07d9fe5a97e63fe87bf662dc310e8215944764735104.png"
            alt="CBMPE"
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
          />
        </div>
        <h1 className="text-white text-2xl mb-2">CBMPE Digital</h1>
        <p className="text-white/80 text-sm">Corpo de Bombeiros de Pernambuco</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <h2 className="text-2xl mb-2">Entrar</h2>
        <p className="text-gray-600 mb-6">Acesse sua conta</p>

        <div className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email ou CPF</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="text"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: '' }));
                }}
                className={`pl-11 ${errors.email ? 'border-red-300' : ''}`}
              />
            </div>
            {errors.email && (
              <div className="flex items-center gap-1 text-red-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: '' }));
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className={`pl-11 pr-11 ${errors.password ? 'border-red-300' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <div className="flex items-center gap-1 text-red-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              onClick={() => onNavigate('forgot-password')}
              className="text-red-700 text-sm hover:underline"
            >
              Esqueci minha senha
            </button>
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-red-700 hover:bg-red-800"
            size="lg"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">ou</span>
            </div>
          </div>

          {/* Gov.br Login */}
          <Button
            onClick={handleGovLogin}
            disabled={isLoading}
            variant="outline"
            className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
            size="lg"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs">BR</span>
              </div>
              <span>Entrar com Gov.br</span>
            </div>
          </Button>

          {/* Register Link */}
          <div className="text-center pt-4">
            <span className="text-gray-600">Não tem uma conta? </span>
            <button
              onClick={() => onNavigate('register')}
              className="text-red-700 hover:underline"
            >
              Cadastre-se
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
