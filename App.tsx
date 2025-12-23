
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import SplashScreen from './pages/SplashScreen';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Signup from './pages/Signup';
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
      case 'login': return <Login onLogin={() => navigate('dashboard')} onSignup={() => navigate('signup')} />;
      case 'signup': return <Signup onSignup={() => navigate('dashboard')} onLogin={() => navigate('login')} />;
      case 'dashboard': return <Dashboard onNavigate={navigate} />;
      case 'weather': return <Weather onBack={() => navigate('dashboard')} />;
      case 'tasks': return <Tasks onBack={() => navigate('dashboard')} />;
      case 'inventory': return <Inventory onBack={() => navigate('dashboard')} />;
      case 'scan': return <AIScan onBack={() => navigate('dashboard')} onDiagnose={(data) => { setDiagnosisData(data); navigate('diagnosis'); }} />;
      case 'diagnosis': return <Diagnosis data={diagnosisData} onBack={() => navigate('scan')} onDone={() => navigate('dashboard')} onFindNearby={() => navigate('nearby')} />;
      case 'marketplace': return <Marketplace onBack={() => navigate('dashboard')} onFindNearby={() => navigate('nearby')} />;
      case 'wallet': return <Wallet onBack={() => navigate('dashboard')} />;
      case 'areas': return <Areas onBack={() => navigate('dashboard')} />;
      case 'nearby': return <NearbySuppliers onBack={() => navigate('marketplace')} />;
      case 'settings': return <FarmSettings onBack={() => navigate('dashboard')} />;
      default: return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark max-w-md mx-auto relative shadow-2xl overflow-x-hidden">
      {renderPage()}
    </div>
  );
};

export default App;
