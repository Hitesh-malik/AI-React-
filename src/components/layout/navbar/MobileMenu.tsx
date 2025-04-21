// src/components/layout/navbar/MobileMenu.tsx
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../hooks/useTheme';
import { useAuth } from '../../../context/AuthContext';
import UserAvatar from './UserAvatar';

interface MobileMenuProps {
  isAuthenticated: boolean;
  user: any;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isAuthenticated, 
  user, 
  onClose 
}) => {
  const { theme } = useTheme();
  const { logout } = useAuth();

  // Handle logout
  const handleLogout = async () => {
    await logout();
    onClose();
  };
  
  // Create base navigation links
  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/Pricing', label: 'Pricing' },
    { path: '/Contact', label: 'Contact' },
  ];
  
  // Add dashboard link if authenticated
  if (isAuthenticated) {
    links.push({ path: '/dashboard', label: 'Dashboard' });
    links.push({ path: '/profile', label: 'My Profile' });
    links.push({ path: '/generate-path', label: 'Generate Path' });    
  }
  
  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className={`md:hidden overflow-hidden ${
        theme === 'dark' 
          ? 'bg-gray-900/95 backdrop-blur-md' 
          : 'bg-white/95 backdrop-blur-md'
      }`}
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="px-4 py-2">
        {/* User info section if authenticated */}
        {isAuthenticated && user && (
          <motion.div 
            variants={itemVariants}
            className={`p-4 mb-2 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <UserAvatar user={user} size="md" />
              <div>
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {user.fullName || user.username}
                </p>
                <p className={`text-xs truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {user.email}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      
        {/* Navigation links */}
        <div className="py-2">
          {links.map((link) => (
            <motion.div key={link.path} variants={itemVariants}>
              <NavLink
                to={link.path}
                className={({ isActive }) => `
                  block px-4 py-3 mb-1 rounded-lg text-base font-medium transition-colors
                  ${isActive
                    ? theme === 'dark'
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-100 text-purple-600'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-purple-600'
                  }
                `}
                onClick={onClose}
              >
                {link.label}
              </NavLink>
            </motion.div>
          ))}
        </div>
        
        {/* Auth buttons section */}
        <div className="py-2 border-t border-gray-200 dark:border-gray-700">
          {isAuthenticated ? (
            <motion.button
              variants={itemVariants}
              onClick={handleLogout}
              className={`
                w-full flex items-center justify-center px-4 py-3 rounded-lg text-base font-medium
                ${theme === 'dark'
                  ? 'text-red-400 hover:bg-gray-800'
                  : 'text-red-600 hover:bg-gray-100'
                }
              `}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </motion.button>
          ) : (
            <>
              <motion.div variants={itemVariants}>
                <Link
                  to="/login"
                  className={`
                    block w-full px-4 py-3 mb-2 rounded-lg text-center text-base font-medium transition-colors
                    ${theme === 'dark'
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }
                  `}
                  onClick={onClose}
                >
                  Login
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  to="/signup"
                  className="block w-full px-4 py-3 rounded-lg text-center text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors"
                  onClick={onClose}
                >
                  Sign Up
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMenu;