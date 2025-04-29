// src/config/index.ts

interface Config {
    API_BASE_URL: string;
    APP_NAME: string;
    APP_VERSION: string;
    IS_DEVELOPMENT: boolean;
  }
  
  // Set different configurations based on environment
  const isDevelopment = import.meta.env.MODE === 'development';
  const localUrl = 'https://rouge-believes-suggested-hydrocodone.trycloudflare.com/api';
  const productionUrl = 'https://api.telusko.com/api';
  const config: Config = {
    // Base URL for API calls
    API_BASE_URL: isDevelopment 
      ? localUrl // Local development API URL
      : productionUrl // Production API URL
      ,   
    // Application information
    APP_NAME: 'Telusko Learning Platform',
    APP_VERSION: '1.0.0',
    
    // Environment flag
    IS_DEVELOPMENT: isDevelopment,
  };
  
  export default config;