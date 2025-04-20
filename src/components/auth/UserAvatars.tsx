// src/components/auth/UserAvatars.tsx
import { motion } from 'framer-motion';

const UserAvatars: React.FC = () => {
  return (
    <div className="flex -space-x-2">
      <motion.div
        className="w-8 h-8 rounded-full bg-pink-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        JD
      </motion.div>
      <motion.div
        className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        SK
      </motion.div>
      <motion.div
        className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        MR
      </motion.div>
      <motion.div
        className="w-8 h-8 rounded-full bg-green-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        +7K
      </motion.div>
    </div>
  );
};

export default UserAvatars;