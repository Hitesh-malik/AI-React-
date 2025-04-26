// src/components/layout/navbar/MobileMenu.tsx
import { useRef, useEffect, JSX } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../hooks/useTheme';
import UserAvatar from './UserAvatar';

interface NavItem {
  name: string;
  path: string;
  requiresAuth: boolean;
  icon?: JSX.Element;
}

interface MobileMenuProps {
  isAuthenticated: boolean;
  user: any | null;
  onClose: () => void;
  logout: () => void; // Add logout function to props
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isAuthenticated, user, onClose, logout }) => {
  const { theme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);


  // Define navigation links with authentication requirements
  const navLinks: NavItem[] = [
    {
      name: 'Home',
      path: '/',
      requiresAuth: false,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    },
    {
      name: 'About',
      path: '/about',
      requiresAuth: false,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    },
    {
      name: 'Contact',
      path: '/contact',
      requiresAuth: false,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    },
    {
      name: 'Pricing',
      path: '/pricing',
      requiresAuth: false,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
      </svg>
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      requiresAuth: true,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    },
    {
      name: 'Generate Path',
      path: '/generatepath',
      requiresAuth: true,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
      </svg>
    },
  ];

  // Filter links based on authentication status
  const filteredLinks = navLinks.filter(link => !link.requiresAuth || isAuthenticated);

  // Handle sign out button click
  const handleSignOut = () => {
    logout(); // First logout the user
    onClose(); // Then close the menu
  };

  // Mobile menu animation variants
  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut", staggerChildren: 0.05 }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <motion.div
      className={`lg:hidden w-full ${theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md shadow-lg`}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={menuVariants}
      ref={menuRef}
    >
      <div className="container mx-auto px-4 py-4 max-h-[85vh] overflow-y-auto">
        {/* User Profile Section (if authenticated) */}
        {isAuthenticated && user && (
          <motion.div
            className={`mb-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/80'} flex items-center`}
            variants={itemVariants}
          >
            <UserAvatar user={user} size="md" />
            <div className="ml-3">
              <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {user.username || 'User'}
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {user.email || ''}
              </p>
            </div>
          </motion.div>
        )}

        {/* Navigation Links */}
        <nav className="space-y-1">
          {filteredLinks.map((link) => (
            <motion.div
              key={link.path}
              variants={itemVariants}
            >
              <NavLink
                to={link.path}
                className={({ isActive }) => `
                  flex items-center px-4 py-3 rounded-md text-base font-medium
                  ${isActive
                    ? theme === 'dark'
                      ? 'text-purple-400 bg-gray-800/70'
                      : 'text-purple-600 bg-gray-100'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-gray-100/80'
                  }
                  transition-colors duration-200
                `}
                onClick={onClose}
              >
                <span className="mr-3">{link.icon}</span>
                {link.name}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Auth Buttons (if not authenticated) */}
        {!isAuthenticated && (
          <motion.div
            className="mt-6 space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700"
            variants={itemVariants}
          >
            <Link
              to="/login"
              className={`
                block w-full text-center px-4 py-3 rounded-md font-medium
                ${theme === 'dark'
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
                transition-colors duration-200
              `}
              onClick={onClose}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="block w-full text-center px-4 py-3 rounded-md font-medium bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md hover:shadow-lg transition-shadow duration-200"
              onClick={onClose}
            >
              Sign up
            </Link>
          </motion.div>
        )}

        {/* Profile Actions (if authenticated) */}
        {isAuthenticated && (
          <motion.div
            className="mt-6 space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700"
            variants={itemVariants}
          >
            <Link
              to="/profile"
              className={`
                flex items-center px-4 py-3 rounded-md font-medium
                ${theme === 'dark'
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  : 'text-gray-700 hover:text-purple-600 hover:bg-gray-100/80'}
                transition-colors duration-200
              `}
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Profile
            </Link>
            <button
              className={`
                w-full flex items-center px-4 py-3 rounded-md font-medium
                ${theme === 'dark'
                  ? 'text-red-400 hover:text-red-300 hover:bg-gray-800/50'
                  : 'text-red-600 hover:text-red-500 hover:bg-gray-100/80'}
                transition-colors duration-200
              `}
              onClick={handleSignOut} // Changed to use our new handler
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              Sign out
            </button>
          </motion.div>   
        )
        }
      </div >
    </motion.div >
  );
};

export default MobileMenu;