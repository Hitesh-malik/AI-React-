// src/components/layout/Layout.tsx
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;