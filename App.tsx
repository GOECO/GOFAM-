
import React, { useState, useEffect } from 'react';
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

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('splash');
  const [diagnosisData, setDiagnosisData] = useState<any>(null);

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
      {renderPage()}
    </div>
  );
};

export default App;
