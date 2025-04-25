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
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();

  // Check viewport width on mount and resize
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false); // Close mobile menu when resizing to desktop
      }
    };

    checkWidth(); // Initial check
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Open mobile menu (hamburger icon click)
  const openMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    console.log('Opening mobile menu');
    setIsMenuOpen(true);
  };

  // Close mobile menu (cross icon click)
  const closeMobileMenu = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Prevent event bubbling if event exists
    setIsMenuOpen(false);
  };

  // Navbar container animation variants
  const navVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
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
          <div className="hidden md:flex items-center">
            <NavLinks />
          </div>

          {/* Right Side - Auth or User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />

            {/* Auth Section */}
            {isAuthenticated ? (
              <UserMenu user={user ?? {}} />
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            {isMenuOpen ? (
              // Cross icon when menu is open
              <button
                className={`ml-2 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${theme === 'dark' ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                onClick={(e)=>closeMobileMenu(e)}
                aria-label="Close mobile menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ) : (
              // Hamburger icon when menu is closed
              <button
                className={`ml-2 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${theme === 'dark' ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                onClick={(e)=>openMobileMenu(e)}
                aria-label="Open mobile menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            isAuthenticated={isAuthenticated}
            user={user}
            onClose={() => closeMobileMenu()}
            logout={logout} // Pass the logout function to MobileMenu
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;