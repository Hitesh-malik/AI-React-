// src/pages/Profile.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';
import UserInfoSection from '../components/profile/UserInfoSection';
import SecuritySection from '../components/profile/SecuritySection';
import PreferencesSection from '../components/profile/PreferencesSection';
import NotificationSection from '../components/profile/NotificationSection';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('profile');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Sections for the profile page
  const sections = [
    { id: 'profile', label: 'Personal Info', icon: 'user' },
    { id: 'security', label: 'Security', icon: 'shield' },
    { id: 'preferences', label: 'Preferences', icon: 'settings' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' }
  ];

  // Icon mapping function
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'user':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        );
      case 'shield':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'settings':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        );
      case 'bell':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Render the active section content
  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <UserInfoSection />;
      case 'security':
        return <SecuritySection />;
      case 'preferences':
        return <PreferencesSection />;
      case 'notifications':
        return <NotificationSection />;
      default:
        return <UserInfoSection />;
    }
  };

  return (
      <motion.div
        className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
          </motion.div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Navigation */}
            <motion.div 
              className={`w-full md:w-64 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4`}
              variants={itemVariants}
            >
              <nav>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                          activeSection === section.id
                            ? theme === 'dark'
                              ? 'bg-purple-600 text-white'
                              : 'bg-purple-100 text-purple-700'
                            : theme === 'dark'
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="flex-shrink-0">{getIcon(section.icon)}</span>
                        <span className="font-medium">{section.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
            
            {/* Main Content */}
            <motion.div 
              className={`flex-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}
              variants={itemVariants}
            >
              {renderSection()}
            </motion.div>
          </div>
        </div>
      </motion.div>
  );
};

export default Profile;