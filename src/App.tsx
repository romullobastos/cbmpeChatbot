import React, { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { ChatScreen } from './components/ChatScreen';
import { MenuScreen } from './components/MenuScreen';

export type Screen = 'splash' | 'login' | 'register' | 'forgot-password' | 'chat' | 'menu';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[812px] bg-white rounded-[3rem] shadow-2xl overflow-hidden relative border-8 border-gray-800">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-800 rounded-b-3xl z-50" />
        
        {/* Screen Content */}
        <div className="h-full overflow-y-auto">
          {currentScreen === 'splash' && <SplashScreen onStart={() => navigateTo('login')} />}
          {currentScreen === 'login' && <LoginScreen onNavigate={navigateTo} />}
          {currentScreen === 'register' && <RegisterScreen onNavigate={navigateTo} />}
          {currentScreen === 'forgot-password' && <ForgotPasswordScreen onNavigate={navigateTo} />}
          {currentScreen === 'chat' && <ChatScreen onNavigate={navigateTo} />}
          {currentScreen === 'menu' && <MenuScreen onNavigate={navigateTo} />}
        </div>
      </div>
    </div>
  );
}