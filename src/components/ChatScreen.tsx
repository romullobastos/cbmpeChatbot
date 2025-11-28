import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Send, Menu, Shield, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Screen, ChatAction } from '../App';

interface ChatScreenProps {
  onNavigate: (screen: Screen) => void;
  isDesktop?: boolean;
  initialAction?: ChatAction;
  onActionHandled?: () => void;
  onLogout?: () => void;
}

type MessageType = 'bot' | 'user' | 'error';

interface Message {
  id: number;
  type: MessageType;
  text: string;
  options?: string[];
  timestamp: Date;
}

const certificateTypes = [
  'AVCB - Auto de Vistoria do Corpo de Bombeiros',
  'CLCB - Certificado de Licenciamento do Corpo de Bombeiros',
  'Projeto Técnico de Segurança Contra Incêndio',
  'Vistoria Técnica',
];

// Funções de validação
const validateCPF = (cpf: string): { valid: boolean; message?: string } => {
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');
  
  if (cleanCPF.length !== 11) {
    return { valid: false, message: 'CPF deve conter 11 dígitos.' };
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) {
    return { valid: false, message: 'CPF inválido.' };
  }

  // Validação dos dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(9))) {
    return { valid: false, message: 'CPF inválido.' };
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(10))) {
    return { valid: false, message: 'CPF inválido.' };
  }

  return { valid: true };
};

const validateName = (name: string): { valid: boolean; message?: string } => {
  const trimmedName = name.trim();
  
  if (trimmedName.length < 3) {
    return { valid: false, message: 'Nome deve ter pelo menos 3 caracteres.' };
  }

  if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(trimmedName)) {
    return { valid: false, message: 'Nome deve conter apenas letras.' };
  }

  const nameParts = trimmedName.split(' ').filter(part => part.length > 0);
  if (nameParts.length < 2) {
    return { valid: false, message: 'Por favor, informe nome e sobrenome.' };
  }

  return { valid: true };
};

const validateAddress = (address: string): { valid: boolean; message?: string } => {
  const trimmedAddress = address.trim();
  
  if (trimmedAddress.length < 10) {
    return { valid: false, message: 'Endereço deve ter pelo menos 10 caracteres.' };
  }

  if (!/\d/.test(trimmedAddress)) {
    return { valid: false, message: 'Endereço deve conter número.' };
  }

  return { valid: true };
};

const validatePhone = (phone: string): { valid: boolean; message?: string } => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 11) {
    return { valid: false, message: 'Telefone deve conter 10 ou 11 dígitos.' };
  }
  return { valid: true };
};

const validateDate = (date: string): { valid: boolean; message?: string } => {
  const trimmedDate = date.trim();
  
  if (trimmedDate.length < 10) {
    return { valid: false, message: 'Data deve ter pelo menos 10 caracteres.' };
  }

  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!datePattern.test(trimmedDate)) {
    return { valid: false, message: 'Data deve estar no formato DD/MM/AAAA.' };
  }

  return { valid: true };
};

const validateProtocol = (protocol: string): { valid: boolean; message?: string } => {
  const digitsOnly = protocol.replace(/\D/g, '');
  if (digitsOnly.length !== 10) {
    return { valid: false, message: 'Protocolo deve conter 10 dígitos.' };
  }
  return { valid: true };
};

const formatCPF = (cpf: string): string => {
  const cleanCPF = cpf.replace(/\D/g, '');
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const formatPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  return cleanPhone;
};

const generateProtocolDigits = (length: number = 10): string => {
  let digits = '';
  for (let i = 0; i < length; i++) {
    digits += Math.floor(Math.random() * 10).toString();
  }
  return digits;
};

export function ChatScreen({ onNavigate, isDesktop = false, initialAction, onActionHandled, onLogout }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      text: 'Olá! Bem-vindo ao atendimento do CBMPE. 👋\n\nSou o assistente virtual e estou aqui para ajudar com a emissão de certificados.\n\nQual tipo de certificado você precisa?',
      options: certificateTypes,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState('certificate-type');
  const [userData, setUserData] = useState({
    certificateType: '',
    name: '',
    cpf: '',
    address: '',
    buildingType: '',
    phone: '',
    visitDate: '',
    visitTime: '',
    protocolNumber: '',
    contactReason: '',
  });
  const [validationError, setValidationError] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle mobile viewport changes (keyboard)
  useEffect(() => {
    if (!isDesktop) {
      const handleResize = () => {
        // Force scroll to bottom when keyboard appears/disappears
        setTimeout(scrollToBottom, 100);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isDesktop]);

  // Processar ação inicial do menu
  useEffect(() => {
    if (initialAction && onActionHandled) {
      setTimeout(() => {
        if (initialAction === 'certificates') {
          // Já está na tela de certificados por padrão
        } else if (initialAction === 'protocol') {
          setMessages([{
            id: 1,
            type: 'bot',
            text: 'Para consultar seu protocolo, por favor informe o número:\n\n(Formato: CBMPE-XXXXXXXXXX)',
            timestamp: new Date(),
          }]);
          setCurrentStep('protocol-number');
        } else if (initialAction === 'contact') {
          setMessages([{
            id: 1,
            type: 'bot',
            text: 'Para solicitar contato com um atendente, primeiro preciso de seu telefone:\n\n(Formato: (00) 00000-0000)',
            timestamp: new Date(),
          }]);
          setCurrentStep('phone-for-contact');
        }
        onActionHandled();
      }, 100);
    }
  }, [initialAction, onActionHandled]);

  const addMessage = (text: string, type: MessageType, options?: string[]) => {
    const newMessage: Message = {
      id: messages.length + 1,
      type,
      text,
      options,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addBotMessageWithTyping = (text: string, options?: string[], delay: number = 1200) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(text, 'bot', options);
    }, delay);
  };

  const handleCertificateTypeSelect = (type: string) => {
    addMessage(type, 'user');
    setUserData((prev) => ({ ...prev, certificateType: type }));
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      addMessage(
        'Ótimo! Para prosseguir, preciso de algumas informações.\n\nPor favor, informe seu nome completo:',
        'bot'
      );
      setCurrentStep('name');
    }, 1200);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Validar antes de enviar
    const validation = validateInput(inputValue, currentStep);
    
    if (!validation.valid) {
      setValidationError(validation.message || 'Entrada inválida');
      return;
    }

    setValidationError('');
    addMessage(inputValue, 'user');
    const value = inputValue;
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      processUserInput(value);
    }, 1200);
  };

  const validateInput = (value: string, step: string): { valid: boolean; message?: string } => {
    switch (step) {
      case 'name':
        return validateName(value);
      case 'cpf':
        return validateCPF(value);
      case 'address':
        return validateAddress(value);
      case 'phone':
      case 'phone-for-contact':
        return validatePhone(value);
      case 'visit-date':
        return validateDate(value);
      case 'protocol-number':
        return validateProtocol(value);
      case 'contact-reason':
        return value.trim().length >= 10 
          ? { valid: true } 
          : { valid: false, message: 'Por favor, descreva melhor sua necessidade (mínimo 10 caracteres).' };
      default:
        return { valid: true };
    }
  };

  const processUserInput = (value: string) => {
    switch (currentStep) {
      case 'name':
        setUserData((prev) => ({ ...prev, name: value }));
        addMessage('Agora, informe seu CPF:\n\n(Formato: 000.000.000-00 ou somente números)', 'bot');
        setCurrentStep('cpf');
        break;

      case 'cpf':
        const cleanCPF = value.replace(/\D/g, '');
        setUserData((prev) => ({ ...prev, cpf: formatCPF(cleanCPF) }));
        addMessage('Qual o endereço completo do imóvel/estabelecimento?\n\n(Incluir rua, número, bairro e cidade)', 'bot');
        setCurrentStep('address');
        break;

      case 'address':
        setUserData((prev) => ({ ...prev, address: value }));
        addMessage(
          'Qual o tipo de edificação?',
          'bot',
          ['Residencial', 'Comercial', 'Industrial', 'Misto', 'Outro']
        );
        setCurrentStep('building-type');
        break;

      case 'building-type':
        setUserData((prev) => ({ ...prev, buildingType: value }));
        showSummary(value);
        break;

      case 'phone':
        const cleanPhone = value.replace(/\D/g, '');
        setUserData((prev) => ({ ...prev, phone: formatPhone(cleanPhone) }));
        addMessage(
          'Qual data você prefere para a vistoria?\n\n(Formato: DD/MM/AAAA)',
          'bot'
        );
        setCurrentStep('visit-date');
        break;
      
      case 'phone-for-contact':
        {
          const cleanPhoneForContact = value.replace(/\D/g, '');
          setUserData((prev) => ({ ...prev, phone: formatPhone(cleanPhoneForContact) }));
          addMessage(
            'Por favor, descreva brevemente o motivo do contato:',
            'bot'
          );
          setCurrentStep('contact-reason');
        }
        break;

      case 'visit-date':
        setUserData((prev) => ({ ...prev, visitDate: value }));
        addMessage(
          'Qual o melhor horário?',
          'bot',
          ['08:00 - 10:00', '10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00']
        );
        setCurrentStep('visit-time');
        break;

      case 'visit-time':
        setUserData((prev) => ({ ...prev, visitTime: value }));
        showVisitSummary(value);
        break;

      case 'protocol-number':
        setUserData((prev) => ({ ...prev, protocolNumber: value.toUpperCase() }));
        showProtocolDetails(value.toUpperCase());
        break;

      case 'contact-reason':
        setUserData((prev) => ({ ...prev, contactReason: value }));
        addMessage(
          'Qual o melhor horário para entrarmos em contato?',
          'bot',
          ['Manhã (8h-12h)', 'Tarde (13h-17h)', 'Qualquer horário']
        );
        setCurrentStep('contact-time');
        break;

      case 'contact-time':
        showContactConfirmation(value);
        break;

      default:
        addMessage('Desculpe, não entendi. Pode reformular?', 'bot');
    }
  };

  const showSummary = (buildingType: string) => {
    const summary = `Perfeito! Aqui está o resumo da sua solicitação:\n\n📋 Certificado: ${userData.certificateType}\n👤 Nome: ${userData.name}\n🆔 CPF: ${userData.cpf}\n📍 Endereço: ${userData.address}\n🏢 Tipo: ${buildingType}\n\n✅ Sua solicitação foi registrada com sucesso!\n\nNúmero do protocolo: CBMPE-${generateProtocolDigits(10)}\n\nO que deseja fazer agora?`;
    
    addMessage(summary, 'bot', [
      'Agendar vistoria',
      'Consultar protocolo',
      'Novo certificado',
      'Falar com atendente',
    ]);
    setCurrentStep('menu');
  };

  const showVisitSummary = (visitTime: string) => {
    const protocolNumber = `CBMPE-${generateProtocolDigits(10)}`;
    const summary = `✅ Vistoria agendada com sucesso!\n\n📋 Protocolo original: CBMPE-${generateProtocolDigits(10)}\n📅 Agendamento: ${protocolNumber}\n\n👤 Nome: ${userData.name}\n📞 Telefone: ${userData.phone}\n📍 Endereço: ${userData.address}\n📆 Data: ${userData.visitDate}\n🕐 Horário: ${visitTime}\n\nVocê receberá uma confirmação por SMS em até 24h.\n\n⚠️ Importante: Tenha em mãos todos os documentos do imóvel e projetos aprovados.\n\nO que deseja fazer agora?`;
    
    addMessage(summary, 'bot', [
      'Novo certificado',
      'Consultar protocolo',
      'Voltar ao início',
    ]);
    setCurrentStep('menu-after-visit');
  };

  const showProtocolDetails = (protocolNumber: string) => {
    const details = `🔍 Detalhes do protocolo ${protocolNumber}:\n\n📋 Certificado: ${userData.certificateType}\n👤 Nome: ${userData.name}\n🆔 CPF: ${userData.cpf}\n📍 Endereço: ${userData.address}\n🏢 Tipo: ${userData.buildingType}\n📅 Data da vistoria: ${userData.visitDate}\n🕐 Horário: ${userData.visitTime}\n\nO que deseja fazer agora?`;
    
    addMessage(details, 'bot', [
      'Novo certificado',
      'Falar com atendente',
      'Voltar ao início',
    ]);
    setCurrentStep('menu-after-protocol');
  };

  const showContactConfirmation = (contactTime: string) => {
    const confirmation = `✅ Solicitação de contato registrada com sucesso!\n\n👤 Nome: ${userData.name}\n📞 Telefone: ${userData.phone}\n📍 Endereço: ${userData.address}\n📅 Data da vistoria: ${userData.visitDate}\n🕐 Horário: ${userData.visitTime}\n⏰ Melhor horário para contato: ${contactTime}\n\nMotivo do contato: ${userData.contactReason}\n\nO que deseja fazer agora?`;
    
    addMessage(confirmation, 'bot', [
      'Novo certificado',
      'Consultar protocolo',
      'Voltar ao início',
    ]);
    setCurrentStep('menu-after-contact');
  };

  const handleOptionClick = (option: string) => {
    setValidationError('');
    
    if (currentStep === 'certificate-type') {
      handleCertificateTypeSelect(option);
    } else if (currentStep === 'building-type') {
      addMessage(option, 'user');
      setInputValue('');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        processUserInput(option);
      }, 1200);
    } else if (currentStep === 'visit-time') {
      addMessage(option, 'user');
      setInputValue('');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        processUserInput(option);
      }, 1200);
    } else if (currentStep === 'contact-time') {
      addMessage(option, 'user');
      setInputValue('');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        processUserInput(option);
      }, 1200);
    } else if (currentStep === 'menu') {
      addMessage(option, 'user');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        if (option === 'Novo certificado') {
          setCurrentStep('certificate-type');
          setUserData({
            certificateType: '',
            name: '',
            cpf: '',
            address: '',
            buildingType: '',
            phone: '',
            visitDate: '',
            visitTime: '',
            protocolNumber: '',
            contactReason: '',
          });
          addMessage(
            'Claro! Qual tipo de certificado você precisa?',
            'bot',
            certificateTypes
          );
        } else if (option === 'Agendar vistoria') {
          addMessage(
            'Ótimo! Vamos agendar a vistoria.\n\nPor favor, informe seu telefone para contato:\n\n(Formato: (00) 00000-0000)',
            'bot'
          );
          setCurrentStep('phone');
        } else if (option === 'Consultar protocolo') {
          addMessage(
            'Para consultar seu protocolo, por favor informe o número:\n\n(Formato: CBMPE-XXXXXXXXXX)',
            'bot'
          );
          setCurrentStep('protocol-number');
        } else if (option === 'Falar com atendente') {
          if (!userData.phone) {
            addMessage(
              'Para solicitar contato com um atendente, primeiro preciso de seu telefone:\n\n(Formato: (00) 00000-0000)',
              'bot'
            );
            setCurrentStep('phone-for-contact');
          } else {
            addMessage(
              'Por favor, descreva brevemente o motivo do contato:',
              'bot'
            );
            setCurrentStep('contact-reason');
          }
        } else if (option === 'Voltar ao menu') {
          addMessage(
            'Como posso ajudar?',
            'bot',
            [
              'Agendar vistoria',
              'Consultar protocolo',
              'Novo certificado',
              'Falar com atendente',
            ]
          );
        } else {
          addMessage(
            'Esta funcionalidade estará disponível em breve. Como posso ajudar?',
            'bot',
            ['Agendar vistoria', 'Novo certificado', 'Voltar ao menu']
          );
        }
      }, 1200);
    } else if (currentStep === 'menu-after-visit') {
      addMessage(option, 'user');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        if (option === 'Novo certificado') {
          resetToNewCertificate();
        } else if (option === 'Consultar protocolo') {
          addMessage(
            'Para consultar seu protocolo, por favor informe o número:\n\n(Formato: CBMPE-XXXXXXXXXX)',
            'bot'
          );
          setCurrentStep('protocol-number');
        } else if (option === 'Voltar ao início') {
          resetToStart();
        } else {
          addMessage(
            'Esta funcionalidade estará disponível em breve. Como posso ajudar?',
            'bot',
            ['Novo certificado', 'Voltar ao início']
          );
        }
      }, 1200);
    } else if (currentStep === 'menu-after-protocol') {
      addMessage(option, 'user');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        if (option === 'Novo certificado') {
          resetToNewCertificate();
        } else if (option === 'Falar com atendente') {
          if (!userData.phone) {
            addMessage(
              'Para solicitar contato com um atendente, primeiro preciso de seu telefone:\n\n(Formato: (00) 00000-0000)',
              'bot'
            );
            setCurrentStep('phone-for-contact');
          } else {
            addMessage(
              'Por favor, descreva brevemente o motivo do contato:',
              'bot'
            );
            setCurrentStep('contact-reason');
          }
        } else if (option === 'Voltar ao início') {
          resetToStart();
        } else {
          addMessage(
            'Esta funcionalidade estará disponível em breve. Como posso ajudar?',
            'bot',
            ['Novo certificado', 'Voltar ao início']
          );
        }
      }, 1200);
    } else if (currentStep === 'menu-after-contact') {
      addMessage(option, 'user');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        if (option === 'Novo certificado') {
          resetToNewCertificate();
        } else if (option === 'Consultar protocolo') {
          addMessage(
            'Para consultar seu protocolo, por favor informe o número:\n\n(Formato: CBMPE-XXXXXXXXXX)',
            'bot'
          );
          setCurrentStep('protocol-number');
        } else if (option === 'Voltar ao início') {
          resetToStart();
        } else {
          addMessage(
            'Esta funcionalidade estará disponível em breve. Como posso ajudar?',
            'bot',
            ['Novo certificado', 'Voltar ao início']
          );
        }
      }, 1200);
    }
  };

  const resetToNewCertificate = () => {
    setCurrentStep('certificate-type');
    setUserData({
      certificateType: '',
      name: '',
      cpf: '',
      address: '',
      buildingType: '',
      phone: '',
      visitDate: '',
      visitTime: '',
      protocolNumber: '',
      contactReason: '',
    });
    addMessage(
      'Claro! Qual tipo de certificado você precisa?',
      'bot',
      certificateTypes
    );
  };

  const resetToStart = () => {
    setCurrentStep('certificate-type');
    setMessages([
      {
        id: 1,
        type: 'bot',
        text: 'Olá! Bem-vindo ao atendimento do CBMPE. 👋\n\nSou o assistente virtual e estou aqui para ajudar com a emissão de certificados.\n\nQual tipo de certificado você precisa?',
        options: certificateTypes,
        timestamp: new Date(),
      },
    ]);
    setUserData({
      certificateType: '',
      name: '',
      cpf: '',
      address: '',
      buildingType: '',
      phone: '',
      visitDate: '',
      visitTime: '',
      protocolNumber: '',
      contactReason: '',
    });
  };

  const getPlaceholder = () => {
    switch (currentStep) {
      case 'name':
        return 'Ex: João Silva Santos';
      case 'cpf':
        return 'Ex: 000.000.000-00';
      case 'address':
        return 'Ex: Rua das Flores, 123, Boa Vista, Recife-PE';
      case 'phone':
        return 'Ex: (81) 98765-4321';
      case 'phone-for-contact':
        return 'Ex: (81) 98765-4321';
      case 'visit-date':
        return 'Ex: 25/12/2024';
      default:
        return 'Digite sua mensagem...';
    }
  };

  return (
    <div className={`${isDesktop ? 'h-full' : 'min-h-screen'} flex flex-col bg-gray-50 ${isDesktop ? 'relative' : 'fixed inset-0'} overflow-hidden`}>
      {/* Header */}
      <div className={`flex-shrink-0 bg-gradient-to-r from-red-700 to-red-600 px-4 flex items-center justify-between shadow-lg ${isDesktop ? 'py-4' : 'py-16'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-red-700" />
          </div>
          <div>
            <h1 className="text-white">Assistente CBMPE</h1>
            <p className="text-white/80 text-xs">Online</p>
          </div>
        </div>
        {!isDesktop && (
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('menu')}>
              <Menu className="w-6 h-6 text-white" />
            </button>
            <button onClick={onLogout} title="Sair">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDesktop ? 'pb-4' : 'pb-24'}`}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.type === 'user'
                  ? 'bg-red-700 text-white rounded-br-sm'
                  : message.type === 'error'
                  ? 'bg-red-100 text-red-700 rounded-bl-sm border border-red-300'
                  : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
              }`}
            >
              {message.type === 'bot' && (
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-red-700" />
                  <span className="text-xs text-red-700">CBMPE Bot</span>
                </div>
              )}
              <p className="whitespace-pre-line text-sm">{message.text}</p>
              {message.options && (
                <div className="mt-3 space-y-2">
                  {message.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm border border-gray-200 transition-colors active:bg-gray-200"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              <p className="text-xs mt-2 opacity-70">
                {message.timestamp.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow-sm px-4 py-3">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-red-700" />
                <span className="text-xs text-red-700">CBMPE Bot</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#dc2626', borderRadius: '50%', animation: 'typing 1s infinite', animationDelay: '0s' }}></span>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#dc2626', borderRadius: '50%', animation: 'typing 1s infinite', animationDelay: '0.2s' }}></span>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#dc2626', borderRadius: '50%', animation: 'typing 1s infinite', animationDelay: '0.4s' }}></span>
              </div>
              <style>{`
                @keyframes typing {
                  0%, 100% { opacity: 0.3; transform: scale(0.8); }
                  50% { opacity: 1; transform: scale(1); }
                }
              `}</style>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {currentStep !== 'certificate-type' && currentStep !== 'building-type' && currentStep !== 'menu' && currentStep !== 'visit-time' && currentStep !== 'menu-after-visit' && currentStep !== 'contact-time' && currentStep !== 'menu-after-protocol' && currentStep !== 'menu-after-contact' && (
        <div className={`${isDesktop ? 'sticky' : 'fixed'} bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-3 flex-shrink-0`} style={{ paddingBottom: isDesktop ? '12px' : 'calc(12px + env(safe-area-inset-bottom))' }}>
          {validationError && (
            <div className="mb-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <p className="text-xs text-red-700">{validationError}</p>
            </div>
          )}
          <div className="flex gap-2 items-end">
            <Input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setValidationError('');
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              onFocus={() => {
                // Scroll to bottom when input is focused on mobile
                if (!isDesktop) {
                  setTimeout(scrollToBottom, 300);
                }
              }}
              placeholder={getPlaceholder()}
              className={`flex-1 min-w-0 ${validationError ? 'border-red-300 focus:border-red-500' : ''}`}
              style={{ fontSize: '16px' }} // Prevents zoom on iOS
            />
            <Button
              onClick={handleSendMessage}
              className="bg-red-700 hover:bg-red-800 flex-shrink-0"
              size="icon"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}