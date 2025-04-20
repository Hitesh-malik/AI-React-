// src/components/auth/LoginForm.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FormInput from './FormInput';
import BrandLogo from './BrandLogo';
import apiService from '../../api/apiService';

interface LoginFormProps {
  onSubmit: (formData: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  isSubmitting: boolean;
  generalError: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isSubmitting,
  generalError
}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: {
      username?: string;
      email?: string;
      password?: string;
    } = {};

    // Username validation
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Call the API service for login
      const response = await apiService.auth.login({
        username,
        email,
        password
      });
      
      if (response.success && response.data) {
        // Store the authentication token in localStorage
        localStorage.setItem('authToken', response.data.token);
        
        // Redirect to dashboard or home page
        navigate('/');
      } else {
        // Handle error response
        setErrors({ 
          general: response.error || 'Invalid username/email or password'
        });
      }
    } catch (error) {
      setErrors({ 
        general: 'An unexpected error occurred. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <BrandLogo />
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-white text-opacity-80">Sign in to continue your learning journey</p>
      </motion.div>

      {(errors.general || generalError) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-3 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-lg"
        >
          <p className="text-red-100">{errors.general || generalError}</p>
        </motion.div>
      )}

      <motion.form variants={containerVariants} onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={setUsername}
          error={errors.username}
          placeholder="Your username"
          icon={
            <svg className="h-5 w-5 text-white text-opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          }
          variants={itemVariants}
        />

        <FormInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
          placeholder="your@email.com"
          icon={
            <svg className="h-5 w-5 text-white text-opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          }
          variants={itemVariants}
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          placeholder="••••••••"
          icon={
            <svg className="h-5 w-5 text-white text-opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          }
          variants={itemVariants}
        />

        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <Link to="/forgot-password" className="text-sm text-white hover:text-purple-200 transition-colors">
            Forgot Password?
          </Link>
        </motion.div>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading || isSubmitting}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {(loading || isSubmitting) ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </div>
          ) : 'Sign in'}
        </motion.button>

        <motion.div variants={itemVariants} className="mt-6 text-center">
          <p className="text-white text-opacity-70">
            Don't have an account?{' '}
            <Link to="/signup" className="text-white font-medium hover:text-purple-200 transition-colors">
              Sign up now
            </Link>
          </p>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default LoginForm;