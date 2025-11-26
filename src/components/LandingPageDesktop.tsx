import { Shield, FileText, ClipboardCheck, Building, Phone, Clock, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Screen } from '../App';

interface LandingPageDesktopProps {
  onNavigate: (screen: Screen) => void;
}

export function LandingPageDesktop({ onNavigate }: LandingPageDesktopProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '44px', height: '44px', backgroundColor: '#b91c1c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937' }}>CBMPE Digital</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <a href="#servicos" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px' }}>Serviços</a>
          <a href="#como-funciona" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px' }}>Como Funciona</a>
          <a href="#contato" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px' }}>Contato</a>
          <Button onClick={() => onNavigate('login')} className="bg-red-700 hover:bg-red-800">
            Entrar
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #991b1b 100%)', padding: '80px 48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '64px' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '48px', fontWeight: 700, color: 'white', marginBottom: '24px', lineHeight: 1.2 }}>
              Serviços do Corpo de Bombeiros na palma da sua mão
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '32px', lineHeight: 1.6 }}>
              Solicite certificados, agende vistorias e acompanhe seus processos de forma rápida e digital.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Button onClick={() => onNavigate('login')} size="lg" className="bg-white text-red-700 hover:bg-gray-100" style={{ padding: '16px 32px', fontSize: '16px' }}>
                Iniciar Atendimento
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button onClick={() => onNavigate('register')} size="lg" variant="outline" style={{ padding: '16px 32px', fontSize: '16px', borderColor: 'white', color: 'white', backgroundColor: 'transparent' }}>
                Criar Conta
              </Button>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '280px', height: '280px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '200px', height: '200px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                <Shield style={{ width: '100px', height: '100px', color: '#b91c1c' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" style={{ padding: '80px 48px', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 600, color: '#1f2937', textAlign: 'center', marginBottom: '16px' }}>Nossos Serviços</h2>
          <p style={{ fontSize: '18px', color: '#6b7280', textAlign: 'center', marginBottom: '48px' }}>Tudo que você precisa em um só lugar</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#fee2e2', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <FileText style={{ width: '32px', height: '32px', color: '#b91c1c' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '8px' }}>AVCB</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Auto de Vistoria do Corpo de Bombeiros</p>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#dbeafe', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <ClipboardCheck style={{ width: '32px', height: '32px', color: '#1d4ed8' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '8px' }}>CLCB</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Certificado de Licenciamento</p>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#dcfce7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Building style={{ width: '32px', height: '32px', color: '#15803d' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '8px' }}>Projetos</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Análise de Projetos Técnicos</p>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#ffedd5', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <ClipboardCheck style={{ width: '32px', height: '32px', color: '#c2410c' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '8px' }}>Vistorias</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Agendamento Online</p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" style={{ padding: '80px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 600, color: '#1f2937', textAlign: 'center', marginBottom: '16px' }}>Como Funciona</h2>
          <p style={{ fontSize: '18px', color: '#6b7280', textAlign: 'center', marginBottom: '48px' }}>Simples, rápido e sem burocracia</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px' }}>
            <div style={{ textAlign: 'center', maxWidth: '280px' }}>
              <div style={{ width: '80px', height: '80px', backgroundColor: '#b91c1c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px', fontWeight: 700, color: 'white' }}>1</div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937', marginBottom: '12px' }}>Faça seu cadastro</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>Crie sua conta gratuitamente ou entre com sua conta Gov.br</p>
            </div>
            
            <div style={{ textAlign: 'center', maxWidth: '280px' }}>
              <div style={{ width: '80px', height: '80px', backgroundColor: '#b91c1c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px', fontWeight: 700, color: 'white' }}>2</div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937', marginBottom: '12px' }}>Solicite o serviço</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>Escolha o certificado ou vistoria que você precisa</p>
            </div>
            
            <div style={{ textAlign: 'center', maxWidth: '280px' }}>
              <div style={{ width: '80px', height: '80px', backgroundColor: '#b91c1c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px', fontWeight: 700, color: 'white' }}>3</div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937', marginBottom: '12px' }}>Acompanhe online</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>Receba atualizações em tempo real sobre seu processo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section style={{ padding: '80px 48px', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '64px' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '36px', fontWeight: 600, color: '#1f2937', marginBottom: '24px' }}>Por que usar o CBMPE Digital?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <CheckCircle style={{ width: '24px', height: '24px', color: '#15803d', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', marginBottom: '4px' }}>Atendimento 24 horas</h4>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>Solicite serviços a qualquer hora, de qualquer lugar</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <CheckCircle style={{ width: '24px', height: '24px', color: '#15803d', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', marginBottom: '4px' }}>Sem filas</h4>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>Evite deslocamentos e esperas desnecessárias</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <CheckCircle style={{ width: '24px', height: '24px', color: '#15803d', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', marginBottom: '4px' }}>Acompanhamento em tempo real</h4>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>Saiba exatamente em que etapa está seu processo</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <CheckCircle style={{ width: '24px', height: '24px', color: '#15803d', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', marginBottom: '4px' }}>Integração com Gov.br</h4>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>Use sua conta do governo para acesso simplificado</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '400px', height: '300px', backgroundColor: '#fee2e2', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield style={{ width: '120px', height: '120px', color: '#b91c1c' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" style={{ padding: '80px 48px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 600, color: '#1f2937', marginBottom: '16px' }}>Precisa de ajuda?</h2>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '32px' }}>Entre em contato conosco</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
              <Phone style={{ width: '24px', height: '24px', color: '#b91c1c' }} />
              <span style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937' }}>193</span>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>Emergência</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
              <Clock style={{ width: '24px', height: '24px', color: '#b91c1c' }} />
              <span style={{ fontSize: '14px', color: '#6b7280' }}>Atendimento 24 horas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)', padding: '64px 48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 600, color: 'white', marginBottom: '16px' }}>Pronto para começar?</h2>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '32px' }}>Acesse agora e solicite seus serviços de forma digital</p>
        <Button onClick={() => onNavigate('login')} size="lg" className="bg-white text-red-700 hover:bg-gray-100" style={{ padding: '16px 48px', fontSize: '18px' }}>
          Acessar Sistema
        </Button>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1f2937', padding: '32px 48px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: '#9ca3af' }}>© 2024 CBMPE - Corpo de Bombeiros Militar de Pernambuco. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
