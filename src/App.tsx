import { useState, useEffect } from 'react';
import { HomePage } from '@/pages/HomePage';
import { ServicesPage } from '@/pages/ServicesPage';
import { CleanerProfilePage } from '@/pages/CleanerProfilePage';
import { DashboardPage } from '@/pages/DashboardPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    } else if (currentPath === '/services') {
      return <ServicesPage />;
    } else if (currentPath.startsWith('/cleaner/')) {
      return <CleanerProfilePage />;
    } else if (currentPath === '/dashboard') {
      return <DashboardPage />;
    } else if (currentPath === '/login') {
      return <LoginPage />;
    } else if (currentPath === '/register') {
      return <RegisterPage />;
    } else {
      return <HomePage />;
    }
  };

  return renderPage();
}

export default App;
