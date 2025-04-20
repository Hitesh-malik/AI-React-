// src/api/endpoints.ts
import config from '../config';

/**
 * Object containing all API endpoints used in the application
 */
const endpoints = {
  // Authentication endpoints
  auth: {
    login: `${config.API_BASE_URL}/auth/login`,
    signup: `${config.API_BASE_URL}/auth/signup`,
    refreshToken: `${config.API_BASE_URL}/auth/refresh`,
    forgotPassword: `${config.API_BASE_URL}/auth/forgot-password`,
    resetPassword: `${config.API_BASE_URL}/auth/reset-password`,
    logout: `${config.API_BASE_URL}/auth/logout`,
  },
  
  // User related endpoints
  user: {
    profile: `${config.API_BASE_URL}/user/profile`,
    updateProfile: `${config.API_BASE_URL}/user/profile`,
    changePassword: `${config.API_BASE_URL}/user/change-password`,
  },
  
  // Learning paths endpoints
  learningPaths: {
    getAll: `${config.API_BASE_URL}/learning-paths`,
    getById: (id: string) => `${config.API_BASE_URL}/learning-paths/${id}`,
    create: `${config.API_BASE_URL}/learning-paths`,
    update: (id: string) => `${config.API_BASE_URL}/learning-paths/${id}`,
    delete: (id: string) => `${config.API_BASE_URL}/learning-paths/${id}`,
    generate: `${config.API_BASE_URL}/learning-paths/generate`,
  },
};

export default endpoints;