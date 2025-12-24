
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
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const triggerAlert = useCallback((type: 'temp' | 'soil') => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotif: AppNotification = type === 'temp' ? {
      id,
      type: 'critical',
      title: 'NHIỆT ĐỘ QUÁ CAO',
      message: 'Khu A ghi nhận 38.5°C. Cần kích hoạt hệ thống phun sương ngay.',
      icon: 'device_thermostat',
      timestamp: new Date(),
      targetPage: 'area-details'
    } : {
      id,
      type: 'critical',
      title: 'ĐỘ ẨM ĐẤT THẤP',
      message: 'Block 2 - Khu B: Độ ẩm giảm xuống 28%. Khởi động máy bơm?',
      icon: 'water_drop',
      timestamp: new Date(),
      targetPage: 'tasks'
    };

    setNotifications(prev => [newNotif, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 8000);
  }, []);

  useEffect(() => {
    if (currentPage === 'splash') {
      const timer = setTimeout(() => setCurrentPage('onboarding'), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'splash': return <SplashScreen />;
      case 'onboarding': return <Onboarding onComplete={() => navigate('login')} />;
      case 'login': return <Login onLogin={() => navigate('dashboard')} onSignup={() => navigate('signup')} onForgotPassword={() => navigate('forgot-password')} />;
      case 'signup': return <Signup onSignup={() => navigate('dashboard')} onLogin={() => navigate('login')} />;
      case 'forgot-password': return <ForgotPassword onBack={() => navigate('login')} onResetSuccess={() => navigate('login')} />;
      case 'dashboard': return <Dashboard onNavigate={navigate} />;
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
      case 'chat-detail': return <ChatDetail chatId={selectedChatId || '1'} onBack={() => navigate('messages')} />;
      case 'scan': return <AIScan onBack={() => navigate('dashboard')} onDiagnose={(data) => { setDiagnosisData(data); navigate('diagnosis'); }} />;
      case 'diagnosis': return <Diagnosis data={diagnosisData} onBack={() => navigate('scan')} onDone={() => navigate('dashboard')} onFindNearby={() => navigate('nearby')} onNavigate={navigate} onDiagnose={(data) => setDiagnosisData(data)} />;
      case 'marketplace': return <Marketplace onBack={() => navigate('dashboard')} onFindNearby={() => navigate('nearby')} />;
      case 'wallet': return <Wallet onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'areas': return <Areas onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'nearby': return <NearbySuppliers onBack={() => navigate('marketplace')} />;
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
      default: return <Dashboard onNavigate={navigate} />;
    }
  };

  const currentThemeClass = 'light'; // In a real app this would be state or from context

  return (
    <div className={`min-h-screen bg-background-light dark:bg-background-dark max-w-md mx-auto relative shadow-2xl overflow-x-hidden transition-colors duration-200 ${currentThemeClass}`}>
      <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none flex flex-col items-center gap-2 p-4">
        {notifications.map((notif) => (
          <div key={notif.id} onClick={() => { if (notif.targetPage) navigate(notif.targetPage); removeNotification(notif.id); }} className="w-full max-w-[340px] pointer-events-auto cursor-pointer animate-[slideInDown_0.5s_ease-out] active:scale-95 transition-transform">
            <div className={`relative overflow-hidden rounded-[1.75rem] border p-4 shadow-2xl backdrop-blur-xl ${notif.type === 'critical' ? 'bg-red-600/90 border-red-400/30 text-white' : 'bg-white/90 dark:bg-surface-dark/95 border-gray-200 dark:border-gray-800'}`}>
              <div className="flex gap-4 relative z-10">
                <div className={`size-11 rounded-2xl flex items-center justify-center shrink-0 border ${notif.type === 'critical' ? 'bg-white/20 border-white/30' : 'bg-primary/10 border-primary/20 text-primary'}`}>
                  <span className={`material-symbols-outlined !text-2xl`}>{notif.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black uppercase tracking-widest leading-none mb-1">{notif.title}</h4>
                  <p className="text-[11px] font-bold leading-tight line-clamp-2">{notif.message}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {renderPage()}
    </div>
  );
};

export default App;
