// src/components/profile/PreferencesSection.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const PreferencesSection: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [success, setSuccess] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [timeFormat, setTimeFormat] = useState('12h');
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  
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

  // Available languages
  const languages: Language[] = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
    { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
    { code: 'de-DE', name: 'German', flag: '🇩🇪' },
    { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
    { code: 'zh-CN', name: 'Chinese (Simplified)', flag: '🇨🇳' },
  ];

  // Handle language change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
    showSuccessMessage();
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    toggleTheme();
    showSuccessMessage();
  };

  // Toggle time format
  const handleTimeFormatChange = (format: '12h' | '24h') => {
    setTimeFormat(format);
    showSuccessMessage();
  };

  // Toggle animations
  const handleAnimationsToggle = () => {
    setEnableAnimations(!enableAnimations);
    showSuccessMessage();
  };

  // Toggle compact mode
  const handleCompactModeToggle = () => {
    setCompactMode(!compactMode);
    showSuccessMessage();
  };

  // Show success message helper
  const showSuccessMessage = () => {
    setSuccess('Preferences updated successfully!');
    
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
        <h2 className="text-2xl font-bold mb-4">Preferences</h2>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
          Customize your experience with your preferred settings
        </p>
      </motion.div>
      
      {/* Success Message */}
      {success && (
        <motion.div 
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {success}
        </motion.div>
      )}
      
      {/* Theme Preferences */}
      <motion.section variants={itemVariants} className="mt-6">
        <h3 className="text-lg font-medium mb-4">Appearance</h3>
        
        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Theme</h4>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Choose between light and dark theme
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className={`p-2 rounded-md flex items-center justify-center ${
                  theme === 'light' 
                    ? 'bg-purple-100 text-purple-600 ring-2 ring-purple-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => { 
                  if (theme === 'dark') handleThemeToggle(); 
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
                <span className="ml-1">Light</span>
              </button>
              
              <button 
                className={`p-2 rounded-md flex items-center justify-center ${
                  theme === 'dark' 
                    ? 'bg-purple-100 text-purple-600 ring-2 ring-purple-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => {
                  if (theme === 'light') handleThemeToggle();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                <span className="ml-1">Dark</span>
              </button>
            </div>
          </div>
          
          {/* Animations Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">UI Animations</h4>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Enable or disable UI animations
              </p>
            </div>
            
            <button
              onClick={handleAnimationsToggle}
              type="button"
              className={`
                relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                ${enableAnimations ? 'bg-purple-600' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}
              `}
              role="switch"
              aria-checked={enableAnimations}
            >
              <span className="sr-only">Enable animations</span>
              <span 
                className={`
                  pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                  ${enableAnimations ? 'translate-x-5' : 'translate-x-0'}
                `}
              >
                <span
                  className={`
                    absolute inset-0 h-full w-full flex items-center justify-center transition-opacity
                    ${enableAnimations ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'}
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
                    ${enableAnimations ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'}
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
          
          {/* Compact Mode Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Compact Mode</h4>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Use more condensed UI elements
              </p>
            </div>
            
            <button
              onClick={handleCompactModeToggle}
              type="button"
              className={`
                relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                ${compactMode ? 'bg-purple-600' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}
              `}
              role="switch"
              aria-checked={compactMode}
            >
              <span className="sr-only">Enable compact mode</span>
              <span 
                className={`
                  pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                  ${compactMode ? 'translate-x-5' : 'translate-x-0'}
                `}
              >
                <span
                  className={`
                    absolute inset-0 h-full w-full flex items-center justify-center transition-opacity
                    ${compactMode ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'}
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
                    ${compactMode ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'}
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
        </div>
      </motion.section>
      
      {/* Language Preferences */}
      <motion.section variants={itemVariants} className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">Language</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="language" className="block text-sm font-medium mb-2">
              Display Language
            </label>
            <select
              id="language"
              name="language"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className={`
                block w-full rounded-md shadow-sm
                ${theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
                }
                focus:ring-purple-500 focus:border-purple-500
              `}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              This will change the language across the entire application
            </p>
          </div>
        </div>
      </motion.section>
      
      {/* Time & Date Preferences */}
      <motion.section variants={itemVariants} className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">Time & Date Format</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Time Format
            </label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => handleTimeFormatChange('12h')}
                className={`
                  px-4 py-2 rounded-md
                  ${timeFormat === '12h'
                    ? 'bg-purple-100 text-purple-600 ring-2 ring-purple-600'
                    : theme === 'dark' 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                12-hour (1:30 PM)
              </button>
              
              <button
                type="button"
                onClick={() => handleTimeFormatChange('24h')}
                className={`
                  px-4 py-2 rounded-md
                  ${timeFormat === '24h'
                    ? 'bg-purple-100 text-purple-600 ring-2 ring-purple-600'
                    : theme === 'dark' 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                24-hour (13:30)
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default PreferencesSection;