import React from 'react';
import { ArrowLeft, FileText, Search, Clock, Phone, MapPin, AlertCircle } from 'lucide-react';
import { Screen } from '../App';

interface MenuScreenProps {
  onNavigate: (screen: Screen) => void;
}

const menuItems = [
  {
    icon: FileText,
    title: 'Certificados',
    description: 'AVCB, CLCB e outros documentos',
    color: 'bg-red-100 text-red-700',
  },
  {
    icon: Search,
    title: 'Consultar Protocolo',
    description: 'Acompanhe sua solicitação',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    icon: Clock,
    title: 'Histórico',
    description: 'Veja suas solicitações anteriores',
    color: 'bg-green-100 text-green-700',
  },
  {
    icon: MapPin,
    title: 'Unidades',
    description: 'Encontre o posto mais próximo',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    icon: AlertCircle,
    title: 'Emergência',
    description: 'Informações de segurança',
    color: 'bg-red-100 text-red-700',
  },
  {
    icon: Phone,
    title: 'Contato',
    description: 'Fale conosco',
    color: 'bg-purple-100 text-purple-700',
  },
];

export function MenuScreen({ onNavigate }: MenuScreenProps) {
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-600 px-6 py-6 pt-12">
        <button onClick={() => onNavigate('chat')} className="mb-4">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-2xl mb-2">Menu</h1>
        <p className="text-white/80 text-sm">
          Corpo de Bombeiros de Pernambuco
        </p>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-3`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-gray-600">{item.description}</p>
            </button>
          ))}
        </div>

        {/* Emergency Contact */}
        <div className="mt-6 bg-red-700 rounded-xl p-6 text-white text-center">
          <h3 className="text-lg mb-2">Emergência</h3>
          <p className="text-4xl mb-2">193</p>
          <p className="text-sm text-white/80">
            Disque em caso de incêndio ou emergência
          </p>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-xs text-gray-500 pb-4">
          <p>CBMPE - Corpo de Bombeiros Militar de Pernambuco</p>
          <p className="mt-1">Versão 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
