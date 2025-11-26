import { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, AlertCircle, Phone, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Screen } from '../App';

interface RegisterScreenProps {
  onNavigate: (screen: Screen) => void;
}

const validateEmail = (email: string): { valid: boolean; message?: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Email inválido.' };
  }
  return { valid: true };
};

const validateCPF = (cpf: string): { valid: boolean; message?: string } => {
  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length !== 11) {
    return { valid: false, message: 'CPF deve conter 11 dígitos.' };
  }
  if (/^(\d)\1{10}$/.test(cleanCPF)) {
    return { valid: false, message: 'CPF inválido.' };
  }
  return { valid: true };
};

const validatePhone = (phone: string): { valid: boolean; message?: string } => {
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length < 10 || cleanPhone.length > 11) {
    return { valid: false, message: 'Telefone inválido.' };
  }
  return { valid: true };
};

const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 8) {
    return { valid: false, message: 'Senha deve ter no mínimo 8 caracteres.' };
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return { valid: false, message: 'Senha deve conter maiúsculas, minúsculas e números.' };
  }
  return { valid: true };
};

export function RegisterScreen({ onNavigate }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleRegister = () => {
    const newErrors: Record<string, string> = {};

    // Validações
    if (formData.name.trim().length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres.';
    }

    const cpfValidation = validateCPF(formData.cpf);
    if (!cpfValidation.valid) {
      newErrors.cpf = cpfValidation.message || '';
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
      newErrors.email = emailValidation.message || '';
    }

    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.valid) {
      newErrors.phone = phoneValidation.message || '';
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.message || '';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.';
    }

    if (!acceptedTerms) {
      newErrors.terms = 'Você deve aceitar os termos.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // Simular cadastro
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('login');
    }, 1500);
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-600 px-6 py-4 pt-12 flex items-center gap-4">
        <button onClick={() => onNavigate('login')}>
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div>
          <h1 className="text-white text-xl">Criar Conta</h1>
          <p className="text-white/80 text-xs">Preencha seus dados</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="name"
                type="text"
                placeholder="João Silva Santos"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`pl-11 ${errors.name ? 'border-red-300' : ''}`}
              />
            </div>
            {errors.name && (
              <div className="flex items-center gap-1 text-red-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.name}</span>
              </div>
            )}
          </div>

          {/* CPF */}
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={(e) => handleChange('cpf', e.target.value)}
                className={`pl-11 ${errors.cpf ? 'border-red-300' : ''}`}
              />
            </div>
            {errors.cpf && (
              <div className="flex items-center gap-1 text-red-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.cpf}</span>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
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

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="(81) 98765-4321"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`pl-11 ${errors.phone ? 'border-red-300' : ''}`}
              />
            </div>
            {errors.phone && (
              <div className="flex items-center gap-1 text-red-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.phone}</span>
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
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
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

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className={`pl-11 pr-11 ${errors.confirmPassword ? 'border-red-300' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <div className="flex items-center gap-1 text-red-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.confirmPassword}</span>
              </div>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 pt-2">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => {
                setAcceptedTerms(checked as boolean);
                setErrors((prev) => ({ ...prev, terms: '' }));
              }}
            />
            <label htmlFor="terms" className="text-sm text-gray-600 leading-tight cursor-pointer">
              Aceito os{' '}
              <span className="text-red-700 hover:underline">termos de uso</span> e a{' '}
              <span className="text-red-700 hover:underline">política de privacidade</span>
            </label>
          </div>
          {errors.terms && (
            <div className="flex items-center gap-1 text-red-600 text-xs">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.terms}</span>
            </div>
          )}

          {/* Register Button */}
          <Button
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full bg-red-700 hover:bg-red-800 mt-4"
            size="lg"
          >
            {isLoading ? 'Cadastrando...' : 'Criar Conta'}
          </Button>

          {/* Login Link */}
          <div className="text-center pt-2 pb-4">
            <span className="text-gray-600">Já tem uma conta? </span>
            <button
              onClick={() => onNavigate('login')}
              className="text-red-700 hover:underline"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
