// src/pages/Dashboard.tsx
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  
  return (
    <div className={`container mx-auto px-4 py-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          {/* <button 
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button> */}
        </div>
        
        <div className={`p-6 rounded-lg shadow-lg mb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.fullName || 'User'}!</h2>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
            This is your personal dashboard. Here you'll find your learning paths and progress.
          </p>
          
          <div className="border-t border-b py-4 my-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="font-bold text-2xl text-purple-600">0</div>
              <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Learning Paths</div>
            </div>
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="font-bold text-2xl text-green-600">0%</div>
              <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Average Completion</div>
            </div>
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="font-bold text-2xl text-blue-600">0</div>
              <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Days Active</div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
              Create Your First Learning Path
            </button>
          </div>
        </div>
        
        <div className={`p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-2">
            <div className="grid grid-cols-3">
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Username:</span>
              <span className="col-span-2">{user?.username || 'N/A'}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Email:</span>
              <span className="col-span-2">{user?.email || 'N/A'}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Full Name:</span>
              <span className="col-span-2">{user?.fullName || 'N/A'}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Role:</span>
              <span className="col-span-2">{user?.role || 'User'}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;