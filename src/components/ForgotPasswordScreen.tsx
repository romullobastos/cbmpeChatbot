import { useState } from 'react';
import { ArrowLeft, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Screen } from '../App';

interface ForgotPasswordScreenProps {
  onNavigate: (screen: Screen) => void;
}

const validateEmail = (email: string): { valid: boolean; message?: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Email inválido.' };
  }
  return { valid: true };
};

export function ForgotPasswordScreen({ onNavigate }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = () => {
    const emailValidation = validateEmail(email);

    if (!emailValidation.valid) {
      setError(emailValidation.message || '');
      return;
    }

    setError('');
    setIsLoading(true);

    // Simular envio de email
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
    }, 1500);
  };

  const handleResendEmail = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  if (emailSent) {
    return (
      <div className="h-full bg-white flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-600 px-6 py-4 pt-12 flex items-center gap-4">
          <button onClick={() => onNavigate('login')}>
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-white text-xl">Email Enviado</h1>
          </div>
        </div>

        {/* Success Message */}
        <div className="flex-1 px-6 py-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h2 className="text-2xl mb-3">Email enviado!</h2>
          <p className="text-gray-600 mb-2">
            Enviamos um link de redefinição de senha para:
          </p>
          <p className="text-red-700 mb-8">{email}</p>
          
          <p className="text-gray-600 text-sm mb-8">
            Verifique sua caixa de entrada e spam. O link expira em 1 hora.
          </p>

          <Button
            onClick={() => onNavigate('login')}
            className="w-full bg-red-700 hover:bg-red-800 mb-3"
            size="lg"
          >
            Voltar ao Login
          </Button>

          <button
            onClick={handleResendEmail}
            disabled={isLoading}
            className="text-red-700 text-sm hover:underline"
          >
            {isLoading ? 'Reenviando...' : 'Não recebeu? Reenviar email'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-600 px-6 py-4 pt-12 flex items-center gap-4">
        <button onClick={() => onNavigate('login')}>
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div>
          <h1 className="text-white text-xl">Redefinir Senha</h1>
          <p className="text-white/80 text-xs">Recupere seu acesso</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-8 flex flex-col">
        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-2xl mb-3">Esqueceu sua senha?</h2>
            <p className="text-gray-600">
              Digite seu email cadastrado e enviaremos um link para redefinir sua senha.
            </p>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleResetPassword()}
                  className={`pl-11 ${error ? 'border-red-300' : ''}`}
                />
              </div>
              {error && (
                <div className="flex items-center gap-1 text-red-600 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleResetPassword}
              disabled={isLoading}
              className="w-full bg-red-700 hover:bg-red-800"
              size="lg"
            >
              {isLoading ? 'Enviando...' : 'Enviar Link de Redefinição'}
            </Button>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center pt-6">
          <button
            onClick={() => onNavigate('login')}
            className="text-red-700 hover:underline"
          >
            Voltar ao login
          </button>
        </div>
      </div>
    </div>
  );
}
