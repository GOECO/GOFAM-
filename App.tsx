
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
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Simulation: Trigger a critical alert periodically
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

    // Native Browser Notification
    if (Notification.permission === 'granted') {
      new Notification(`GOFAM Pro: ${newNotif.title}`, {
        body: newNotif.message,
        icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACxjCARwZguIjcD19cnutCCwwJqHXNHKWt6Y_eQxBtD7r9FQ3S7B0DnkLV3Qb1A3k2Dxups7e1PFFKfMw7GaiI_zZ2XgjIqeePdR_ZAiXjoNs2GcivhKG1wJirp0JcAR78kUHFYeM-466uN3nvwKj2rYsy92nAmtIPF90ic_OpLyKANGpa3O_clJ92LZDOLPdzy76iKNhyTNGZbZbkpscQAhlu-6Bo337dkw5N3mnTX6QsEpmM8a8j8wk9gXZ-pgdJRgyZuqHgvvQ_'
      });
    }

    // Auto-remove after 8 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 8000);
  }, []);

  useEffect(() => {
    if (currentPage === 'splash') {
      const timer = setTimeout(() => setCurrentPage('onboarding'), 3000);
      return () => clearTimeout(timer);
    }
    
    // Request notification permission after onboarding
    if (currentPage === 'login' && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Start simulation loop once user is in dashboard
    if (currentPage === 'dashboard') {
      const interval = setInterval(() => {
        const shouldTrigger = Math.random() > 0.7;
        if (shouldTrigger) {
          triggerAlert(Math.random() > 0.5 ? 'temp' : 'soil');
        }
      }, 25000);
      return () => clearInterval(interval);
    }
  }, [currentPage, triggerAlert]);

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
      case 'add-task': return <AddTask onBack={() => navigate('tasks')} />;
      case 'area-details': return <AreaDetails onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'reports': return <Reports onBack={() => navigate('dashboard')} />;
      case 'weather': return <Weather onBack={() => navigate('dashboard')} />;
      case 'tasks': return <Tasks onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'inventory': return <Inventory onBack={() => navigate('dashboard')} />;
      case 'scan': return <AIScan onBack={() => navigate('dashboard')} onDiagnose={(data) => { setDiagnosisData(data); navigate('diagnosis'); }} />;
      case 'diagnosis': return <Diagnosis data={diagnosisData} onBack={() => navigate('scan')} onDone={() => navigate('dashboard')} onFindNearby={() => navigate('nearby')} />;
      case 'marketplace': return <Marketplace onBack={() => navigate('dashboard')} onFindNearby={() => navigate('nearby')} />;
      case 'wallet': return <Wallet onBack={() => navigate('dashboard')} />;
      case 'areas': return <Areas onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'nearby': return <NearbySuppliers onBack={() => navigate('marketplace')} />;
      case 'settings': return <FarmSettings onBack={() => navigate('dashboard')} />;
      case 'adoption': return <Adoption onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      default: return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark max-w-md mx-auto relative shadow-2xl overflow-x-hidden transition-colors duration-200">
      {/* Push Notification Overlay */}
      <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none flex flex-col items-center gap-2 p-4">
        {notifications.map((notif) => (
          <div 
            key={notif.id}
            onClick={() => {
              if (notif.targetPage) navigate(notif.targetPage);
              removeNotification(notif.id);
            }}
            className="w-full max-w-[340px] pointer-events-auto cursor-pointer animate-[slideInDown_0.5s_ease-out] active:scale-95 transition-transform"
          >
            <div className={`relative overflow-hidden rounded-[1.75rem] border p-4 shadow-2xl backdrop-blur-xl ${
              notif.type === 'critical' 
                ? 'bg-red-600/90 border-red-400/30 text-white' 
                : 'bg-white/90 dark:bg-surface-dark/95 border-gray-200 dark:border-gray-800'
            }`}>
              {/* Background Glow Pulse for Critical */}
              {notif.type === 'critical' && (
                <div className="absolute inset-0 bg-red-500 animate-pulse opacity-20"></div>
              )}
              
              <div className="flex gap-4 relative z-10">
                <div className={`size-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                  notif.type === 'critical' 
                    ? 'bg-white/20 border-white/30' 
                    : 'bg-primary/10 border-primary/20 text-primary'
                }`}>
                  <span className={`material-symbols-outlined !text-2xl ${notif.type === 'critical' ? 'animate-bounce' : ''}`}>
                    {notif.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-black uppercase tracking-widest leading-none mb-1">
                      {notif.title}
                    </h4>
                    <span className={`text-[8px] font-bold uppercase opacity-60`}>Bây giờ</span>
                  </div>
                  <p className="text-[11px] font-bold leading-tight line-clamp-2">
                    {notif.message}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${
                      notif.type === 'critical'
                        ? 'bg-white text-red-600 border-white'
                        : 'bg-primary text-black border-primary'
                    }`}>
                      Xử lý ngay
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeNotification(notif.id); }}
                      className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-current opacity-40`}
                    >
                      Bỏ qua
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {renderPage()}

      <style>{`
        @keyframes slideInDown {
          from { transform: translateY(-100%) scale(0.9); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .material-symbols-outlined { font-variation-settings: 'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 24; }
      `}</style>
    </div>
  );
};

export default App;
