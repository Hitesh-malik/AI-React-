// src/api/apiService.ts
import endpoints from './endpoints';

// Types for authentication
interface LoginData {
  username: string;
  // email: string;
  password: string;
}

interface SignupData {
  username: string;
  fullName: string;
  email: string;
  password: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Service for handling API requests
 */
const apiService = {
  /**
   * Generic fetch method with error handling
   */
  async fetchAPI<T>(
    url: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      // Set default headers
      const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };
      
      // Get token from localStorage if available
      const token = localStorage.getItem('authToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // Make the request
      const response = await fetch(url, {
        ...options,
        headers,
      });
      
      // Parse the JSON response
      const data = await response.json();
      
      // Handle non-2xx responses
      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Something went wrong',
        };
      }
      
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },
  
  /**
   * Authentication methods
   */
  auth: {
    login: async (data: LoginData): Promise<ApiResponse<{
      username(username: any): unknown; token: string; user: any 
}>> => {
      return apiService.fetchAPI(endpoints.auth.login, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    
    signup: async (data: SignupData): Promise<ApiResponse<{ token: string; user: any }>> => {
      return apiService.fetchAPI(endpoints.auth.signup, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    
    logout: async (): Promise<ApiResponse<null>> => {
      return apiService.fetchAPI(endpoints.auth.logout, {
        method: 'POST',
      });
    },
  },
  
  /**
   * User methods
   */
  user: {
    getProfile: async (): Promise<ApiResponse<any>> => {
      return apiService.fetchAPI(endpoints.user.profile);
    },
    
    updateProfile: async (data: any): Promise<ApiResponse<any>> => {
      return apiService.fetchAPI(endpoints.user.updateProfile, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
  },
  
  /**
   * Learning paths methods
   */
  learningPaths: {
    generatePath: async (requirements: any): Promise<ApiResponse<any>> => {
      return apiService.fetchAPI(endpoints.learningPaths.generate, {
        method: 'POST',
        body: JSON.stringify(requirements),
      });
    },
    
    getAllPaths: async (): Promise<ApiResponse<any[]>> => {
      return apiService.fetchAPI(endpoints.learningPaths.getAll);
    },
    
    getPathById: async (id: string): Promise<ApiResponse<any>> => {
      return apiService.fetchAPI(endpoints.learningPaths.getById(id));
    },
  },
};

export default apiService;