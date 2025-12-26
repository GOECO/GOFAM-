
import React, { useState, useEffect, useCallback } from 'react';
import { Page } from './types';
import SplashScreen from './pages/SplashScreen';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Weather from './pages/Weather';
import Tasks from './pages/Tasks';
import Inventory from './pages/Inventory';
import AIScan from './pages/AIScan';
import Diagnosis from './pages/Diagnosis';
import Marketplace from './pages/Marketplace';
import Wallet from './pages/Wallet';
import Areas from './pages/Areas';
import NearbySuppliers from './pages/NearbySuppliers';
import FarmSettings from './pages/FarmSettings';
import AreaDetails from './pages/AreaDetails';
import Reports from './pages/Reports';
import AddTask from './pages/AddTask';
import Adoption from './pages/Adoption';
import VirtualGarden from './pages/VirtualGarden';
import VirtualFarm from './pages/VirtualFarm';
import AILabs from './pages/AILabs';
import APCheck from './pages/APCheck';
import Attendance from './pages/Attendance';
import Messages from './pages/Messages';
import ChatDetail from './pages/ChatDetail';
import CultivationLog from './pages/CultivationLog';
import Harvest from './pages/Harvest';
import BlockchainScanner from './pages/BlockchainScanner';
import Missions from './pages/Missions';
import Store from './pages/Store';
import AIFarmData from './pages/AIFarmData';
import Notifications from './pages/Notifications';
import AvatarProfile from './pages/AvatarProfile';
import AIChat from './pages/AIChat';
import AISettings from './pages/AISettings';
import LiveAssistant from './pages/LiveAssistant';

interface AppNotification {
  id: string;
  type: 'critical' | 'warning' | 'success';
  title: string;
  message: string;
  icon: string;
  timestamp: Date;
  targetPage?: Page;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('splash');
  const [diagnosisData, setDiagnosisData] = useState<any>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Tự động chuyển trang sau khi Splash Screen hoàn tất
  useEffect(() => {
    if (currentPage === 'splash') {
      const timer = setTimeout(() => {
        navigate('onboarding');
      }, 3500); // 3.5 giây để khớp với animation của thanh loading
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'splash': return <SplashScreen />;
      case 'onboarding': return <Onboarding onComplete={() => navigate('login')} />;
      case 'login': return <Login onLogin={() => navigate('dashboard')} onSignup={() => navigate('signup')} onForgotPassword={() => navigate('forgot-password')} />;
      case 'signup': return <Signup onSignup={() => navigate('dashboard')} onLogin={() => navigate('login')} />;
      case 'forgot-password': return <ForgotPassword onBack={() => navigate('login')} onResetSuccess={() => navigate('login')} />;
      case 'dashboard': return <Dashboard onNavigate={navigate} />;
      case 'adoption': return <Adoption onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'virtual-garden': return <VirtualGarden onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'virtual-farm': return <VirtualFarm onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'ai-labs': return <AILabs onBack={() => navigate('dashboard')} />;
      case 'ap-check': return <APCheck onBack={() => navigate('dashboard')} />;
      case 'add-task': return <AddTask onBack={() => navigate('tasks')} />;
      case 'area-details': return <AreaDetails onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'reports': return <Reports onBack={() => navigate('dashboard')} />;
      case 'weather': return <Weather onBack={() => navigate('dashboard')} />;
      case 'tasks': return <Tasks onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'inventory': return <Inventory onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'attendance': return <Attendance onBack={() => navigate('dashboard')} />;
      case 'messages': return <Messages onBack={() => navigate('dashboard')} onSelectChat={(id) => { setSelectedChatId(id); navigate('chat-detail'); }} onNavigate={navigate} />;
      case 'chat-detail': return <ChatDetail chatId={selectedChatId || '1'} onBack={() => navigate('messages')} onNavigate={navigate} />;
      case 'scan': return <AIScan onBack={() => navigate('dashboard')} onDiagnose={(data) => { setDiagnosisData(data); navigate('diagnosis'); }} />;
      case 'diagnosis': return <Diagnosis data={diagnosisData} onBack={() => navigate('scan')} onDone={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'marketplace': return <Marketplace onBack={() => navigate('dashboard')} onFindNearby={() => navigate('nearby')} />;
      case 'wallet': return <Wallet onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'areas': return <Areas onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'nearby': return <NearbySuppliers onBack={() => navigate('marketplace')} onNavigate={navigate} />;
      case 'settings': return <FarmSettings onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'cultivation-log': return <CultivationLog onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'harvest': return <Harvest onBack={() => navigate('virtual-farm')} onNavigate={navigate} />;
      case 'blockchain-scan': return <BlockchainScanner onBack={() => navigate('dashboard')} />;
      case 'missions': return <Missions onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'store': return <Store onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'ai-data': return <AIFarmData onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'notifications': return <Notifications onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'avatar-profile': return <AvatarProfile onBack={() => navigate('settings')} />;
      case 'ai-chat': return <AIChat onBack={() => navigate('dashboard')} />;
      case 'ai-settings': return <AISettings onBack={() => navigate('settings')} />;
      case 'live-assistant': return <LiveAssistant onBack={() => navigate('dashboard')} />;
      default: return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark max-w-md mx-auto relative shadow-2xl overflow-x-hidden transition-colors duration-200">
      {renderPage()}
    </div>
  );
};

export default App;
