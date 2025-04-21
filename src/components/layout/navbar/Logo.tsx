// src/components/layout/navbar/Logo.tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <motion.div 
        className="relative w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ rotate: -10, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span 
          className="text-white text-xl font-bold"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          TL
        </motion.span>
        
        {/* Animated dots in the background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" className="absolute inset-0">
            <pattern id="dotPattern" width="5" height="5" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
            <rect width="40" height="40" fill="url(#dotPattern)" />
          </svg>
        </motion.div>
      </motion.div>
      
      <motion.span 
        className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        TELUSKO
      </motion.span>
    </Link>
  );
};

export default Logo;