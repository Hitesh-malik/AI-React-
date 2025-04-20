// src/components/auth/TestimonialCard.tsx
import { motion } from 'framer-motion';

const TestimonialCard: React.FC = () => {
  return (
    <motion.div
      className="mt-auto bg-white bg-opacity-10 rounded-xl p-4 border border-white border-opacity-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6 }}
    >
      <div className="flex items-start">
        <svg className="w-8 h-8 text-pink-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        <div>
          <p className="text-white text-opacity-90 text-sm italic">
            "The structured learning paths helped me transition from a complete beginner to a professional developer in just 8 months!"
          </p>
          <p className="text-white text-opacity-70 text-xs mt-2">
            — Jamie Chen, Software Developer
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;