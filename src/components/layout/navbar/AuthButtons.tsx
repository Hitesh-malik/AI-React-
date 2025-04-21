// src/components/layout/navbar/AuthButtons.tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../hooks/useTheme';

const AuthButtons: React.FC = () => {
  const { theme } = useTheme();
  
  // Simplified animation variants
  const buttonVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  // Background animation variants
  const backgroundVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 }
  };

  // Sign up button arrow animation
  const arrowVariants = {
    initial: { x: -5, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    hover: { x: 3 }
  };

  return (
    <div className="flex items-center space-x-3 ml-3">
      {/* Login Button */}
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5 }}
        variants={buttonVariants}
      >
        <Link 
          to="/login" 
          className={`
            relative overflow-hidden inline-flex items-center justify-center px-5 py-2 rounded-md
            ${theme === 'dark' 
              ? 'bg-gray-800 text-white border border-gray-700 hover:border-purple-500' 
              : 'bg-white text-gray-800 border border-gray-300 hover:border-purple-500'
            }
            transition-all duration-300 hover:shadow-sm
          `}
          aria-label="Login"
        >
          <span className="relative z-10 font-medium">Login</span>
          
          <motion.div 
            className={`
              absolute inset-0 bg-gradient-to-r 
              ${theme === 'dark'
                ? 'from-purple-600/30 to-pink-500/30'
                : 'from-purple-500/20 to-pink-400/20'
              }
              rounded-md
            `}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
      </motion.div>
      
      {/* Sign Up Button */}
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ delay: 0.6 }}
        variants={buttonVariants}
      >
        <Link 
          to="/signup" 
          className="relative overflow-hidden inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md shadow-md hover:shadow-lg"
          aria-label="Sign up"
        >
          <span className="relative z-10 flex items-center font-medium">
            <span>Sign up</span>
            <motion.svg 
              className="w-4 h-4 ml-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
              variants={arrowVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </motion.svg>
          </span>
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-pink-500/90 to-purple-600/90 rounded-md"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
      </motion.div>
    </div>
  );
};

export default AuthButtons;