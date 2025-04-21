// src/components/layout/navbar/NavLinks.tsx
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../hooks/useTheme';
import { useAuth } from '../../../context/AuthContext';

const NavLinks: React.FC = () => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();

  // Links for the navigation
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

  // Define the hover effect for links
  const linkStyle = `relative px-3 py-2 rounded-md transition-colors ${
    theme === 'dark' 
      ? 'text-gray-300 hover:text-white' 
      : 'text-gray-700 hover:text-purple-600'
  }`;

  // Animation for the links
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="flex items-center space-x-1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {links.map((link, index) => (
        <motion.div key={link.path} variants={itemVariants}>
          <NavLink 
            to={link.path} 
            className={({ isActive }) => `
              ${linkStyle} 
              ${isActive 
                ? theme === 'dark' 
                  ? 'bg-gray-800 text-white font-medium' 
                  : 'bg-gray-100 text-purple-600 font-medium'
                : ''
              }
            `}
          >
            {({ isActive }) => (
              <>
                {link.label}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500"
                    layoutId="activeNavIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </>
            )}
          </NavLink>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default NavLinks;