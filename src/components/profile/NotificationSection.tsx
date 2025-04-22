// src/components/profile/NotificationSection.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

const NotificationSection: React.FC = () => {
  const { theme } = useTheme();
  const [success, setSuccess] = useState('');
  
  // Default notification settings
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: 'account',
      title: 'Account Activity',
      description: 'Get notified about sign-ins, security updates and account changes',
      email: true,
      push: true,
      sms: false
    },
    {
      id: 'updates',
      title: 'App Updates',
      description: 'Get notified about new features and improvements',
      email: true,
      push: false,
      sms: false
    },
    {
      id: 'comments',
      title: 'Comments',
      description: 'Get notified when someone comments on your content',
      email: false,
      push: true,
      sms: false
    },
    {
      id: 'mentions',
      title: 'Mentions',
      description: 'Get notified when someone mentions you',
      email: true,
      push: true,
      sms: false
    },
    {
      id: 'marketing',
      title: 'Marketing',
      description: 'Get notified about promotions, events, and new products',
      email: false,
      push: false,
      sms: false
    }
  ]);
  
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

  // Toggle notification setting
  const toggleNotification = (id: string, type: 'email' | 'push' | 'sms') => {
    setNotificationSettings(settings => 
      settings.map(setting => 
        setting.id === id
          ? { ...setting, [type]: !setting[type] }
          : setting
      )
    );
    
    // Show success message
    setSuccess('Notification preference updated!');
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccess(''), 3000);
  };

  // Toggle all notifications for a specific method
  const toggleAllForType = (type: 'email' | 'push' | 'sms', value: boolean) => {
    setNotificationSettings(settings => 
      settings.map(setting => ({ ...setting, [type]: value }))
    );
    
    // Show success message
    setSuccess(`All ${type} notifications ${value ? 'enabled' : 'disabled'}`);
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccess(''), 3000);
  };

  // Check if all settings for a type are enabled
  const allEnabled = (type: 'email' | 'push' | 'sms') => {
    return notificationSettings.every(setting => setting[type]);
  };

  // Check if all settings for a type are disabled
  const allDisabled = (type: 'email' | 'push' | 'sms') => {
    return notificationSettings.every(setting => !setting[type]);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold mb-4">Notification Settings</h2>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
          Manage how and when you receive notifications
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
      
      {/* Table Header */}
      <motion.div 
        variants={itemVariants}
        className={`grid grid-cols-5 gap-4 py-3 px-4 rounded-t-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
      >
        <div className="col-span-2">
          <h3 className="text-sm font-medium">Notification Type</h3>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center">
            <h3 className="text-sm font-medium">Email</h3>
            <button
              onClick={() => toggleAllForType('email', allEnabled('email') ? false : true)}
              className={`ml-2 text-xs px-2 py-1 rounded ${
                allEnabled('email')
                  ? theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                  : allDisabled('email')
                    ? theme === 'dark' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'
                    : theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {allEnabled('email') ? 'Disable all' : 'Enable all'}
            </button>
          </div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center">
            <h3 className="text-sm font-medium">Push</h3>
            <button
              onClick={() => toggleAllForType('push', allEnabled('push') ? false : true)}
              className={`ml-2 text-xs px-2 py-1 rounded ${
                allEnabled('push')
                  ? theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                  : allDisabled('push')
                    ? theme === 'dark' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'
                    : theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {allEnabled('push') ? 'Disable all' : 'Enable all'}
            </button>
          </div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center">
            <h3 className="text-sm font-medium">SMS</h3>
            <button
              onClick={() => toggleAllForType('sms', allEnabled('sms') ? false : true)}
              className={`ml-2 text-xs px-2 py-1 rounded ${
                allEnabled('sms')
                  ? theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                  : allDisabled('sms')
                    ? theme === 'dark' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'
                    : theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {allEnabled('sms') ? 'Disable all' : 'Enable all'}
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Notification Settings */}
      <motion.div 
        variants={itemVariants}
        className={`rounded-b-md border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}
      >
        {notificationSettings.map((setting, index) => (
          <div 
            key={setting.id}
            className={`
              grid grid-cols-5 gap-4 py-4 px-4
              ${index !== notificationSettings.length - 1 ? `border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}` : ''}
              ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}
            `}
          >
            <div className="col-span-2">
              <h4 className="text-sm font-medium">{setting.title}</h4>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {setting.description}
              </p>
            </div>
            
            {/* Email Toggle */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => toggleNotification(setting.id, 'email')}
                type="button"
                className={`
                  relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                  ${setting.email ? 'bg-purple-600' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}
                `}
                role="switch"
                aria-checked={setting.email}
              >
                <span className="sr-only">Toggle email notifications for {setting.title}</span>
                <span 
                  className={`
                    pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                    ${setting.email ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>
            
            {/* Push Toggle */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => toggleNotification(setting.id, 'push')}
                type="button"
                className={`
                  relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                  ${setting.push ? 'bg-purple-600' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}
                `}
                role="switch"
                aria-checked={setting.push}
              >
                <span className="sr-only">Toggle push notifications for {setting.title}</span>
                <span 
                  className={`
                    pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                    ${setting.push ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>
            
            {/* SMS Toggle */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => toggleNotification(setting.id, 'sms')}
                type="button"
                className={`
                  relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                  ${setting.sms ? 'bg-purple-600' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}
                `}
                role="switch"
                aria-checked={setting.sms}
              >
                <span className="sr-only">Toggle SMS notifications for {setting.title}</span>
                <span 
                  className={`
                    pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                    ${setting.sms ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>
          </div>
        ))}
      </motion.div>
      
      {/* Notification Schedule */}
      <motion.section variants={itemVariants} className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">Notification Schedule</h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
          Set quiet hours when you don't want to receive non-critical notifications
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="quiet-start" className="block text-sm font-medium mb-2">
              Start Time
            </label>
            <input
              type="time"
              id="quiet-start"
              defaultValue="22:00"
              className={`
                block w-full rounded-md shadow-sm
                ${theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
                }
                focus:ring-purple-500 focus:border-purple-500
              `}
              onChange={() => {
                setSuccess('Quiet hours updated!');
                setTimeout(() => setSuccess(''), 3000);
              }}
            />
          </div>
          
          <div>
            <label htmlFor="quiet-end" className="block text-sm font-medium mb-2">
              End Time
            </label>
            <input
              type="time"
              id="quiet-end"
              defaultValue="07:00"
              className={`
                block w-full rounded-md shadow-sm
                ${theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
                }
                focus:ring-purple-500 focus:border-purple-500
              `}
              onChange={() => {
                setSuccess('Quiet hours updated!');
                setTimeout(() => setSuccess(''), 3000);
              }}
            />
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center">
            <input
              id="weekend-mute"
              name="weekend-mute"
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              onChange={() => {
                setSuccess('Weekend settings updated!');
                setTimeout(() => setSuccess(''), 3000);
              }}
            />
            <label htmlFor="weekend-mute" className="ml-2 block text-sm">
              Mute notifications on weekends
            </label>
          </div>
        </div>
      </motion.section>
      
      {/* Email Digest Settings */}
      <motion.section variants={itemVariants} className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">Email Digest</h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
          Receive a summary of your notifications instead of individual emails
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Digest Frequency
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                className={`
                  px-4 py-2 rounded-md text-center
                  ${theme === 'dark'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-600 ring-2 ring-purple-600'
                  }
                `}
              >
                Daily
              </button>
              
              <button
                type="button"
                className={`
                  px-4 py-2 rounded-md text-center
                  ${theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
                onClick={() => {
                  setSuccess('Email digest frequency updated to weekly!');
                  setTimeout(() => setSuccess(''), 3000);
                }}
              >
                Weekly
              </button>
              
              <button
                type="button"
                className={`
                  px-4 py-2 rounded-md text-center
                  ${theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
                onClick={() => {
                  setSuccess('Email digest frequency updated to monthly!');
                  setTimeout(() => setSuccess(''), 3000);
                }}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default NotificationSection;