import { Shield } from 'lucide-react';
import { Button } from './ui/button';

interface SplashScreenProps {
  onStart: () => void;
}

export function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <div className="h-full bg-gradient-to-br from-red-700 via-red-600 to-red-800 flex flex-col items-center justify-between p-8 pt-16">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-2xl">
          <Shield className="w-20 h-20 text-red-700" />
        </div>
        <h1 className="text-white text-3xl mb-2 text-center">CBMPE</h1>
        <h2 className="text-white text-xl mb-4 text-center">Corpo de Bombeiros</h2>
        <p className="text-white/90 text-center px-4 mb-2">
          Pernambuco
        </p>
        <div className="mt-8 text-center">
          <p className="text-white/80 text-sm">Assistente Virtual</p>
          <p className="text-white text-center px-4 mt-2">
            Emissão de Certificados
          </p>
        </div>
      </div>

      <div className="w-full space-y-3 pb-8">
        <Button 
          onClick={onStart}
          className="w-full bg-white text-red-700 hover:bg-gray-100"
          size="lg"
        >
          Iniciar Atendimento
        </Button>
        <p className="text-white/70 text-xs text-center">
          Atendimento automatizado 24h
        </p>
      </div>
    </div>
  );
}