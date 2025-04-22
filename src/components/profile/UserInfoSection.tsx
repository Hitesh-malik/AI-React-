// src/components/profile/UserInfoSection.tsx
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';

const UserInfoSection: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
    avatar: user?.avatar || ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle avatar upload click
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Verify file is an image and under 5MB
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setError('');
    
    try {
      // Simulate uploading image to server (would be replaced with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Read the file and convert to data URL for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setForm(prev => ({ ...prev, avatar: dataUrl }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      setIsUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    
    try {
      // Simulate API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user profile in context (would call updateUserProfile from AuthContext)
      // updateUserProfile(form);
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setSuccess('');
    setError('');
  };

  // Get user initials for avatar placeholder
  const getUserInitials = () => {
    if (!form.name) return 'U';
    
    const nameParts = form.name.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
          Manage your personal information and how it is displayed
        </p>
      </motion.div>

      {/* Success and Error Messages */}
      {success && (
        <motion.div 
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {success}
        </motion.div>
      )}
      
      {error && (
        <motion.div 
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Profile Picture Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <label className="block text-sm font-medium mb-2">Profile Picture</label>
          <div className="flex items-center">
            {/* Profile Avatar */}
            <div 
              className="relative cursor-pointer group"
              onClick={handleAvatarClick}
            >
              {form.avatar ? (
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img 
                    src={form.avatar} 
                    alt={form.name || 'User'} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                  {getUserInitials()}
                </div>
              )}
              
              {/* Overlay for hover effect */}
              <div className={`
                absolute inset-0 rounded-full flex items-center justify-center
                bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity
                ${isUploading ? 'opacity-100' : ''}
              `}>
                {isUploading ? (
                  <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </div>
            </div>
            
            <div className="ml-5">
              <h3 className="text-sm font-medium">Change Profile Picture</h3>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Click the avatar to upload a new image.<br />
                JPG, PNG or GIF. Max size 5MB.
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`
                w-full rounded-md border-gray-300 shadow-sm
                ${theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
                }
                ${!isEditing ? 'opacity-75' : ''}
                focus:ring-purple-500 focus:border-purple-500
              `}
            />
          </motion.div>
          
          {/* Email Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`
                w-full rounded-md border-gray-300 shadow-sm
                ${theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
                }
                ${!isEditing ? 'opacity-75' : ''}
                focus:ring-purple-500 focus:border-purple-500
              `}
            />
          </motion.div>
          
          {/* Location Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="City, Country"
              className={`
                w-full rounded-md border-gray-300 shadow-sm
                ${theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
                }
                ${!isEditing ? 'opacity-75' : ''}
                focus:ring-purple-500 focus:border-purple-500
              `}
            />
          </motion.div>
          
          {/* Website Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="website" className="block text-sm font-medium mb-2">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={form.website}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="https://example.com"
              className={`
                w-full rounded-md border-gray-300 shadow-sm
                ${theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
                }
                ${!isEditing ? 'opacity-75' : ''}
                focus:ring-purple-500 focus:border-purple-500
              `}
            />
          </motion.div>
          
          {/* Bio Field - Full Width */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <label htmlFor="bio" className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={form.bio}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Tell us a little about yourself"
              className={`
                w-full rounded-md border-gray-300 shadow-sm
                ${theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
                }
                ${!isEditing ? 'opacity-75' : ''}
                focus:ring-purple-500 focus:border-purple-500
              `}
            />
          </motion.div>
        </div>
        
        {/* Form Actions */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-end space-x-3 mt-8"
        >
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={toggleEdit}
                className={`
                  px-4 py-2 rounded-md border
                  ${theme === 'dark'
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }
                  transition-colors
                `}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={toggleEdit}
              className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </motion.div>
      </form>
    </motion.div>
  );
};

export default UserInfoSection;