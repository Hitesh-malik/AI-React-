// src/components/profile/SecuritySection.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import PasswordStrengthMeter from '../auth/PasswordStrengthMeter';

const SecuritySection: React.FC = () => {
  const { theme } = useTheme();
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
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

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Check password strength if newPassword field changes
    if (name === 'newPassword') {
      // Calculate password strength (simple version)
      let strength = 0;
      
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[a-z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      
      setPasswordStrength(strength);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    
    // Validate form
    if (!form.currentPassword) {
      setError('Please enter your current password');
      return;
    }
    
    if (!form.newPassword) {
      setError('Please enter a new password');
      return;
    }
    
    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (passwordStrength < 3) {
      setError('Please choose a stronger password');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call to change password
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form
      setForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setPasswordStrength(0);
      setSuccess('Password changed successfully!');
      setLoading(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to change password. Please try again.');
      setLoading(false);
    }
  };

  // Handle 2FA toggle (simulated)
  const handleToggle2FA = async () => {
    const newStatus = !twoFactorEnabled;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setTwoFactorEnabled(newStatus);
    setSuccess(`Two-factor authentication ${newStatus ? 'enabled' : 'disabled'} successfully!`);
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold mb-4">Security Settings</h2>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
          Manage your password and account security
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
      
      {/* Change Password Form */}
      <motion.section variants={itemVariants} className="mt-6">
        <h3 className="text-lg font-medium mb-4">Change Password</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword.current ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                className={`
                  w-full rounded-md border-gray-300 shadow-sm pr-10
                  ${theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                  }
                  focus:ring-purple-500 focus:border-purple-500
                `}
              />
              <button
                type="button"
                className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                onClick={() => togglePasswordVisibility('current')}
              >
                {showPassword.current ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className={`
                  w-full rounded-md border-gray-300 shadow-sm pr-10
                  ${theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                  }
                  focus:ring-purple-500 focus:border-purple-500
                `}
              />
              <button
                type="button"
                className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                onClick={() => togglePasswordVisibility('new')}
              >
                {showPassword.new ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Password Strength Meter */}
            {form.newPassword && (
              <div className="mt-2">
                <PasswordStrengthMeter strength={passwordStrength} />
                <div className="text-xs mt-1">
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`
                  w-full rounded-md border-gray-300 shadow-sm pr-10
                  ${theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                  }
                  focus:ring-purple-500 focus:border-purple-500
                  ${form.newPassword && form.confirmPassword && form.newPassword !== form.confirmPassword
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : ''
                  }
                `}
              />
              <button
                type="button"
                className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {showPassword.confirm ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
            {form.newPassword && form.confirmPassword && form.newPassword !== form.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
            )}
          </div>
          
          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                ${loading
                  ? 'bg-purple-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                }
              `}
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading ? 'Changing Password...' : 'Change Password'}
            </button>
          </div>
        </form>
      </motion.section>
      
      {/* Two-Factor Authentication */}
      <motion.section variants={itemVariants} className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
            <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Add an extra layer of security to your account
            </p>
          </div>
          
          {/* Toggle Switch */}
          <button
            onClick={handleToggle2FA}
            type="button"
            className={`
              relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
              ${twoFactorEnabled ? 'bg-purple-600' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}
            `}
            role="switch"
            aria-checked={twoFactorEnabled}
          >
            <span className="sr-only">Toggle two-factor authentication</span>
            <span 
              className={`
                pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                ${twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'}
              `}
            >
              <span
                className={`
                  absolute inset-0 h-full w-full flex items-center justify-center transition-opacity
                  ${twoFactorEnabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'}
                `}
                aria-hidden="true"
              >
                <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                  <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span
                className={`
                  absolute inset-0 h-full w-full flex items-center justify-center transition-opacity
                  ${twoFactorEnabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'}
                `}
                aria-hidden="true"
              >
                <svg className="h-3 w-3 text-purple-600" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414zM5 8l-1.293 1.293a1 1 0 101.414 1.414l1.414-1.414a1 1 0 00-1.414-1.414L5 8zm6.707-3.293a1 1 0 00-1.414-1.414L9 4.586l-1.293-1.293a1 1 0 00-1.414 1.414l1.414 1.414a1 1 0 001.414 0l1.586-1.586z" />
                </svg>
              </span>
            </span>
          </button>
        </div>
        
        {/* 2FA Info */}
        <div className="mt-4">
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {twoFactorEnabled ? 
              'Two-factor authentication is currently enabled. This adds an extra layer of security to your account by requiring more than just a password to log in.' : 
              'When two-factor authentication is enabled, you will be prompted for a secure, random code when you try to log in. You can get this code from an authenticator app like Google Authenticator or Authy.'}
          </p>
        </div>
      </motion.section>
      
 
    </motion.div>
  );
};

export default SecuritySection;