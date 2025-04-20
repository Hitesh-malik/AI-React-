// src/pages/Login.tsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import LoginForm from '../components/auth/LoginForm';
import TestimonialsShowcase from '../components/auth/TestimonialsShowcase'; 

const Login: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Check for success messages in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('registered') && params.get('registered') === 'true') {
      setSuccessMessage('Account created successfully! You can now log in with your credentials.');
    }
  }, [location]);

  const handleSubmit = async (formData: {
    username: string;
    email: string;
    password: string;
  }) => {
    // No need to handle submission here as it's handled in the LoginForm component directly
  };

  return (
    <div className={`min-h-screen pt-16 flex items-center justify-center ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600'} p-4 overflow-hidden`}>
      {/* Background animation elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply opacity-20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply opacity-20 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-40 right-1/3 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply opacity-20 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <motion.div
        className="w-full max-w-5xl bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left side: Login form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-green-500 bg-opacity-20 border border-green-500 border-opacity-30 rounded-lg"
            >
              <p className="text-green-100">{successMessage}</p>
            </motion.div>
          )}
          
          <LoginForm 
            onSubmit={handleSubmit} 
            isSubmitting={false} 
            generalError={generalError}
          />
        </div>

        {/* Right side: Testimonials & Info */}
        <div className="w-full md:w-1/2 bg-black bg-opacity-60 p-8 md:p-12 relative">
          <TestimonialsShowcase />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;