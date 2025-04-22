// src/components/layout/navbar/UserAvatar.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../hooks/useTheme';

interface UserAvatarProps {
  user: {
    username?: string;
    email?: string;
    avatar?: string;
  };
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 'md' }) => {
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);
  
  // Get initials from user name
  const getInitials = () => {
    if (!user?.username) return 'U';
    
    const nameParts = user?.username.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };
  
  // Animation variants
  const avatarVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      whileHover="hover"
      whileTap="tap"
      variants={avatarVariants}
      className={`flex-shrink-0 rounded-full overflow-hidden ${sizeClasses[size]}`}
    >
      {user?.avatar && !imageError ? (
        <img
          src={user?.avatar}
          alt={user?.username || 'User'}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={`
          w-full h-full flex items-center justify-center 
          bg-gradient-to-br from-purple-600 to-pink-500
          text-white font-semibold
          ${sizeClasses[size]}
        `}>
          {getInitials()}
        </div>
      )}
    </motion.div>
  );
};

export default UserAvatar;