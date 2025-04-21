// src/components/layout/navbar/UserMenu.tsx
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../hooks/useTheme';
import { useAuth } from '../../../context/AuthContext';
import UserAvatar from './UserAvatar';

interface UserMenuProps {
  user: {
    id: string;
    username: string;
    fullName?: string;
    email: string;
  };
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const { theme } = useTheme();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle logout
  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      y: -5, 
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    }
  };

  return (
    <div ref={menuRef} className="relative ml-4">
      <motion.button
        className="flex items-center space-x-2 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <UserAvatar user={user} />
        <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
          {user.fullName || user.username}
        </span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute right-0 mt-2 w-48 py-2 rounded-md shadow-lg z-50 ${
              theme === 'dark' 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-gray-200'
            }`}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={`px-4 py-2 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>{user.fullName || user.username}</p>
              <p className={`text-xs truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
            </div>
            
            <div className="py-1">
              <Link 
                to="/dashboard" 
                className={`block px-4 py-2 text-sm ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/profile" 
                className={`block px-4 py-2 text-sm ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Profile Settings
              </Link>
            </div>
            
            <div className={`py-1 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <button 
                className={`w-full text-left block px-4 py-2 text-sm ${
                  theme === 'dark' 
                    ? 'text-red-400 hover:bg-gray-700 hover:text-red-300' 
                    : 'text-red-600 hover:bg-gray-100 hover:text-red-700'
                }`}
                onClick={handleLogout}
              >
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;