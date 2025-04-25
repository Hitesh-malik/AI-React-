// src/components/layout/navbar/NavLinks.tsx
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../hooks/useTheme';
import { useAuth } from '../../../context/AuthContext';

interface NavLinkItem {
  name: string;
  path: string;
  requiresAuth: boolean;
}

const NavLinks: React.FC = () => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  
  // Define navigation links with authentication requirements
  const navLinks: NavLinkItem[] = [
    { name: 'Home', path: '/', requiresAuth: false },
    { name: 'About', path: '/about', requiresAuth: false },
    { name: 'Contact', path: '/contact', requiresAuth: false },
    { name: 'Dashboard', path: '/dashboard', requiresAuth: true },
    {name : "pricing", path: "/pricing", requiresAuth: false},    
    {name : "GeneratePath", path: "/GeneratePath", requiresAuth: true},
  ];

  // Filter links based on authentication status
  const filteredLinks = navLinks.filter(link => !link.requiresAuth || isAuthenticated);
  
  // Animation variants
  const linkVariants = {
    hover: { 
      y: -2,
      transition: { type: "spring", stiffness: 300 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="flex items-center space-x-1 overflow-x-auto hide-scrollbar">
      {filteredLinks.map((link) => (
        <motion.div
          key={link.path}
          whileHover="hover"
          whileTap="tap"
          variants={linkVariants}
        >
          <NavLink
            to={link.path}
            className={({ isActive }) => `
              relative px-3 py-2 text-sm font-medium rounded-md
              ${isActive 
                ? theme === 'dark'
                  ? 'text-purple-400 bg-gray-800/40'
                  : 'text-purple-600 bg-gray-100/80'
                : theme === 'dark'
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800/40'
                  : 'text-gray-700 hover:text-purple-600 hover:bg-gray-100/80'
              }
              transition duration-200 flex items-center
              group
            `}
          >
            <span>{link.name}</span>
            
            {/* Animated underline indicator */}
            <span 
              className={`
                absolute bottom-0 left-0 w-full h-0.5 transform origin-left scale-x-0 
                group-hover:scale-x-100 transition-transform duration-300
                ${theme === 'dark' ? 'bg-purple-400' : 'bg-purple-600'}
              `}
            />
          </NavLink>
        </motion.div>
      ))}
    </div>
  );
};

export default NavLinks;