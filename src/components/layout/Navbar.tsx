// src/components/layout/Navbar.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import Logo from './navbar/Logo';
import NavLinks from './navbar/NavLinks';
import ThemeToggle from './navbar/ThemeToggle';
import AuthButtons from './navbar/AuthButtons';
import UserMenu from './navbar/UserMenu';
import MobileMenu from './navbar/MobileMenu';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { isAuthenticated, user } = useAuth();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navbar container animation variants
  const navVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? theme === 'dark' 
            ? 'bg-gray-900/90 backdrop-blur-md shadow-lg' 
            : 'bg-white/90 backdrop-blur-md shadow-lg' 
          : theme === 'dark' 
            ? 'bg-transparent' 
            : 'bg-transparent'
      }`}
      initial="initial"
      animate="animate"
      variants={navVariants}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLinks />
            <ThemeToggle />
            
            {/* Auth Section */}
            {isAuthenticated && user ? (
              <UserMenu user={user} />
            ) : (
              <AuthButtons />
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button 
              className={`ml-2 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                theme === 'dark' ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={toggleMenu}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu 
            isAuthenticated={isAuthenticated}
            user={user}
            onClose={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;