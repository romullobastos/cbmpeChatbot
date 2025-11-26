import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { ChatScreen } from './components/ChatScreen';
import { MenuScreen } from './components/MenuScreen';
import { LandingPageDesktop } from './components/LandingPageDesktop';

export type Screen = 'splash' | 'login' | 'register' | 'forgot-password' | 'chat' | 'menu';
export type ChatAction = 'certificates' | 'protocol' | 'contact' | null;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesktop;
}

function getInitialScreen(): Screen {
  const saved = localStorage.getItem('cbmpe-screen');
  if (saved && ['splash', 'login', 'register', 'forgot-password', 'chat', 'menu'].includes(saved)) {
    return saved as Screen;
  }
  return 'splash';
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(getInitialScreen);
  const [chatAction, setChatAction] = useState<ChatAction>(null);
  const isDesktop = useIsDesktop();

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    localStorage.setItem('cbmpe-screen', screen);
    if (screen !== 'chat') {
      setChatAction(null);
    }
  };

  const navigateToChatWithAction = (action: ChatAction) => {
    setChatAction(action);
    setCurrentScreen('chat');
    localStorage.setItem('cbmpe-screen', 'chat');
  };

  // Telas que não precisam do layout com sidebar (pré-login)
  const isPreLoginScreen = ['splash', 'login', 'register', 'forgot-password'].includes(currentScreen);

  // Mobile: sempre tela cheia
  if (!isDesktop) {
    return (
      <div className="h-screen bg-white overflow-auto">
        {currentScreen === 'splash' && <SplashScreen onStart={() => navigateTo('login')} />}
        {currentScreen === 'login' && <LoginScreen onNavigate={navigateTo} />}
        {currentScreen === 'register' && <RegisterScreen onNavigate={navigateTo} />}
        {currentScreen === 'forgot-password' && <ForgotPasswordScreen onNavigate={navigateTo} />}
        {currentScreen === 'chat' && <ChatScreen onNavigate={navigateTo} initialAction={chatAction} onActionHandled={() => setChatAction(null)} />}
        {currentScreen === 'menu' && <MenuScreen onNavigate={navigateTo} onChatAction={navigateToChatWithAction} />}
      </div>
    );
  }

  // Desktop: Landing page para splash
  if (currentScreen === 'splash') {
    return <LandingPageDesktop onNavigate={navigateTo} />;
  }

  // Desktop: Telas de login/registro em card centralizado
  if (isPreLoginScreen) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
        <div style={{ width: '100%', maxWidth: '480px', backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden' }}>
          {currentScreen === 'login' && <LoginScreen onNavigate={navigateTo} />}
          {currentScreen === 'register' && <RegisterScreen onNavigate={navigateTo} />}
          {currentScreen === 'forgot-password' && <ForgotPasswordScreen onNavigate={navigateTo} />}
        </div>
      </div>
    );
  }

  // Desktop: Layout com sidebar para telas pós-login
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6' }}>
        {/* Sidebar */}
        <aside style={{ width: '240px', minWidth: '240px', background: 'linear-gradient(to bottom, #b91c1c, #dc2626, #991b1b)', color: 'white', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg style={{ width: '24px', height: '24px', color: '#b91c1c' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div style={{ minWidth: 0 }}>
                <h1 style={{ fontSize: '16px', fontWeight: 500 }}>CBMPE Digital</h1>
                <p style={{ fontSize: '12px', opacity: 0.7 }}>Bombeiros de PE</p>
              </div>
            </div>
          </div>

          <nav style={{ flex: 1, padding: '12px' }}>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li>
                <button
                  onClick={() => navigateTo('chat')}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', backgroundColor: currentScreen === 'chat' ? 'rgba(255,255,255,0.2)' : 'transparent', border: 'none', color: 'white', cursor: 'pointer', textAlign: 'left', fontSize: '14px' }}
                >
                  <svg style={{ width: '18px', height: '18px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Assistente</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('menu')}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', backgroundColor: currentScreen === 'menu' ? 'rgba(255,255,255,0.2)' : 'transparent', border: 'none', color: 'white', cursor: 'pointer', textAlign: 'left', fontSize: '14px' }}
                >
                  <svg style={{ width: '18px', height: '18px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span>Menu</span>
                </button>
              </li>
            </ul>
          </nav>

          <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <button
              onClick={() => navigateTo('login')}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', textAlign: 'left', fontSize: '14px' }}
            >
              <svg style={{ width: '18px', height: '18px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sair</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Header Desktop */}
          <header style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '20px', color: '#1f2937' }}>
              {currentScreen === 'splash' && 'Bem-vindo'}
              {currentScreen === 'login' && 'Entrar'}
              {currentScreen === 'register' && 'Cadastro'}
              {currentScreen === 'forgot-password' && 'Recuperar Senha'}
              {currentScreen === 'chat' && 'Assistente Virtual'}
              {currentScreen === 'menu' && 'Menu'}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>Atendimento 24h</span>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg style={{ width: '20px', height: '20px', color: '#b91c1c' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div style={{ flex: 1, padding: '32px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ maxWidth: '896px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                {currentScreen === 'chat' && <ChatScreen onNavigate={navigateTo} isDesktop initialAction={chatAction} onActionHandled={() => setChatAction(null)} />}
                {currentScreen === 'menu' && <MenuScreen onNavigate={navigateTo} onChatAction={navigateToChatWithAction} isDesktop />}
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}