// src/components/layout/navbar/UserAvatar.tsx
import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface UserAvatarProps {
  user: {
    id: string;
    username: string;
    fullName?: string;
    email: string;
  };
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 'md' }) => {
  // Generate avatar background color based on user id
  const avatarColor = useMemo(() => {
    const colors = [
      'from-pink-500 to-purple-500',
      'from-purple-500 to-indigo-500',
      'from-indigo-500 to-blue-500',
      'from-blue-500 to-cyan-500',
      'from-cyan-500 to-teal-500',
      'from-teal-500 to-green-500',
      'from-green-500 to-lime-500',
      'from-orange-500 to-amber-500',
      'from-red-500 to-pink-500',
    ];
    
    const hash = user.id.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    return colors[hash % colors.length];
  }, [user.id]);
  
  // Get user initials
  const initials = useMemo(() => {
    if (user.fullName) {
      const names = user.fullName.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return user.fullName.substring(0, 2).toUpperCase();
    }
    return user.username.substring(0, 2).toUpperCase();
  }, [user.fullName, user.username]);
  
  // Determine size classes
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };
  
  return (
    <motion.div 
      className={`${sizeClasses[size]} bg-gradient-to-br ${avatarColor} rounded-full flex items-center justify-center text-white font-semibold shadow-sm`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {initials}
      </motion.div>
      
      {/* Animated ring */}
      <motion.div 
        className="absolute inset-0 rounded-full border-2 border-white opacity-0"
        animate={{ 
          opacity: [0, 0.2, 0],
          scale: [0.8, 1.2, 1.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};

export default UserAvatar;