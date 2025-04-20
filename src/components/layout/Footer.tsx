// src/components/layout/Footer.tsx
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className={`${theme === 'dark' ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-white text-gray-500 border-gray-200'} border-t transition-colors duration-200`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm">
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Copyright © {currentYear} TELUSKO
          </motion.p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;