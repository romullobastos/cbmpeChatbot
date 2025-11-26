import { Shield, FileText, ClipboardCheck, Building, Phone, Clock, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface SplashScreenProps {
  onStart: () => void;
}

export function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <div className="h-full bg-white flex flex-col overflow-auto">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-lg font-medium text-gray-800">CBMPE Digital</span>
        </div>
        <Button onClick={onStart} size="sm" className="bg-red-700 hover:bg-red-800">
          Entrar
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-700 via-red-600 to-red-800 px-6 py-12 text-center text-white">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-12 h-12 text-red-700" />
        </div>
        <h1 className="text-2xl font-medium mb-2">CBMPE Digital</h1>
        <p className="text-white/80 mb-6">Corpo de Bombeiros Militar de Pernambuco</p>
        <Button onClick={onStart} size="lg" className="bg-white text-red-700 hover:bg-gray-100">
          Iniciar Atendimento
          <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </section>

      {/* Como Funciona */}
      <section className="px-6 py-10">
        <h2 className="text-xl font-medium text-gray-800 mb-6 text-center">Como Funciona</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-red-700 font-medium">1</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Faça seu cadastro</h3>
              <p className="text-sm text-gray-600">Crie sua conta ou entre com Gov.br</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-red-700 font-medium">2</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Solicite o serviço</h3>
              <p className="text-sm text-gray-600">Escolha o certificado ou vistoria desejada</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-red-700 font-medium">3</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Acompanhe</h3>
              <p className="text-sm text-gray-600">Receba atualizações em tempo real</p>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="px-6 py-10 bg-gray-50">
        <h2 className="text-xl font-medium text-gray-800 mb-6 text-center">Nossos Serviços</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-red-700" />
            </div>
            <h3 className="font-medium text-gray-800 text-sm">AVCB</h3>
            <p className="text-xs text-gray-500 mt-1">Auto de Vistoria</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ClipboardCheck className="w-6 h-6 text-blue-700" />
            </div>
            <h3 className="font-medium text-gray-800 text-sm">CLCB</h3>
            <p className="text-xs text-gray-500 mt-1">Certificado de Licenciamento</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Building className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="font-medium text-gray-800 text-sm">Projetos</h3>
            <p className="text-xs text-gray-500 mt-1">Análise Técnica</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ClipboardCheck className="w-6 h-6 text-orange-700" />
            </div>
            <h3 className="font-medium text-gray-800 text-sm">Vistorias</h3>
            <p className="text-xs text-gray-500 mt-1">Agendamento Online</p>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="px-6 py-10">
        <h2 className="text-xl font-medium text-gray-800 mb-6 text-center">Atendimento</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
              <Phone className="w-6 h-6 text-red-700" />
            </div>
            <p className="font-medium text-gray-800">193</p>
            <p className="text-xs text-gray-500">Emergência</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-red-700" />
            </div>
            <p className="font-medium text-gray-800">24 horas</p>
            <p className="text-xs text-gray-500">Todos os dias</p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6 py-8 bg-red-700 text-center">
        <p className="text-white/90 mb-4">Pronto para começar?</p>
        <Button onClick={onStart} size="lg" className="bg-white text-red-700 hover:bg-gray-100 w-full">
          Acessar Sistema
        </Button>
      </section>
    </div>
  );
}
