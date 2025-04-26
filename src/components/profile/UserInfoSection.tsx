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
    name: user?.username || '',
    email: user?.email || '',
    username: user?.username || '',
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
    >
      <motion.div variants={itemVariants} className="mb-6">
        <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Personal Information</h2>
        <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage your personal information and how it is displayed
        </p>
      </motion.div>

      {/* Success and Error Messages */}
      {success && (
        <motion.div 
          className={`mb-6 p-4 rounded-lg flex items-center ${theme === 'dark' ? 'bg-green-900/20 text-green-400 border border-green-800/30' : 'bg-green-100 text-green-700 border border-green-400'}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </motion.div>
      )}
      
      {error && (
        <motion.div 
          className={`mb-6 p-4 rounded-lg flex items-center ${theme === 'dark' ? 'bg-red-900/20 text-red-400 border border-red-800/30' : 'bg-red-100 text-red-700 border border-red-400'}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Profile Picture Section */}
        <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4">
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Profile Picture</label>
          <div 
            className="relative cursor-pointer group"
            // onClick={handleAvatarClick}
          >
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 opacity-70 blur-md transition-opacity group-hover:opacity-100`}></div>
            
            {form?.avatar ? (
              <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-gray-800">
                <img 
                  src={""} 
                  alt={form.name || 'User'} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-purple-600/80 to-blue-600/80 flex items-center justify-center text-white text-3xl font-bold border-4 border-gray-800">
                {getUserInitials()}
              </div>
            )}
            
            {/* Change overlay
            <div className={`
              absolute inset-0 rounded-full flex flex-col items-center justify-center
              bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200
              ${isUploading ? 'opacity-100' : ''}
            `}>
              {isUploading ? (
                <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-white text-sm font-medium mt-1">Change</span>
                </>
              )}
            </div> */}
          </div>
          <p className={`text-xs max-w-[160px] text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            Click to upload a new image.<br />
            JPG, PNG or GIF. Max 5MB.
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </motion.div>
        
        {/* Form Fields */}
        <div className="md:col-span-2 space-y-6">
          {/* Name Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`
                w-full rounded-lg px-4 py-3 border bg-opacity-10
                ${theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 text-gray-200 focus:border-violet-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-violet-500'
                }
                ${!isEditing ? 'opacity-70' : ''}
                focus:outline-none focus:ring-2 focus:ring-violet-500/30 transition duration-200
              `}
              placeholder="John Doe"
            />
          </motion.div>
          
          {/* Username Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="username" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
              Username
            </label>
            <div className={`
              w-full rounded-lg px-4 py-3 border bg-opacity-10 flex items-center
              ${theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 text-gray-200 focus-within:border-violet-500' 
                : 'bg-white border-gray-300 text-gray-900 focus-within:border-violet-500'
              }
              ${!isEditing ? 'opacity-70' : ''}
              focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-500/30 transition duration-200
            `}>
              <span className={`mr-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>@</span>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                disabled={!isEditing}
                className={`
                  flex-grow bg-transparent border-none p-0 focus:outline-none focus:ring-0
                  ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}
                `}
                placeholder="username"
              />
            </div>
          </motion.div>
          
          {/* Email Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`
                w-full rounded-lg px-4 py-3 border bg-opacity-10
                ${theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 text-gray-200 focus:border-violet-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-violet-500'
                }
                ${!isEditing ? 'opacity-70' : ''}
                focus:outline-none focus:ring-2 focus:ring-violet-500/30 transition duration-200
              `}
              placeholder="john@example.com"
            />
          </motion.div>
          
          {/* Form Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-end space-x-3 mt-8 pt-4"
          >
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={toggleEdit}
                  className={`
                    px-5 py-2.5 rounded-lg border text-sm font-medium transition-colors duration-200
                    ${theme === 'dark'
                      ? 'border-gray-700 text-gray-400 hover:bg-gray-800'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`
                    px-6 py-2.5 rounded-lg text-sm font-medium text-white 
                    bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700
                    transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                  `}
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={toggleEdit}
                className={`
                  px-6 py-2.5 rounded-lg text-sm font-medium text-white 
                  bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700
                  transition-all duration-200 shadow-md hover:shadow-lg
                  flex items-center
                `}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Profile
              </button>
            )}
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
};

export default UserInfoSection;