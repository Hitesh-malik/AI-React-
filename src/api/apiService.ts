// src/api/apiService.ts
import { showToast } from '../utils/toastUtils';
import endpoints from './endpoints';

// Types for authentication
interface LoginData {
  username: string;
  password: string;
}
interface RequestHeaders {
  'Content-Type': string;
  'Authorization'?: string;
  [key: string]: string | undefined;
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

// Types for AI Course learning
interface CourseData {
  id: string;
  title: string;
  description: string;
  difficultyLevel: number;
  createdAt: string;
}

interface ModuleData {
  id: string;
  title: string;
  description: string;
  sequenceOrder?: number;
}

interface LessonData {
  id: string;
  title: string;
  content: string;
  sequenceOrder?: number;
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
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
      }
      
      // Make the request
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (response?.status === 401) {
        // Check if the current API call is for login or signup
        console.log('Unauthorized access detected. Logging out...');
        showToast.error('Session expired. Please log in again.');
        const currentUrl = window.location.pathname;
        const isAuthRoute = currentUrl.includes('/login') || currentUrl.includes('/signup');

        // Only proceed with logout and redirect if not on auth routes
        if (!isAuthRoute) {
          // Handle unauthorized access (e.g., redirect to login)
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          // Optionally, you can show a message to the user

          window.location.href = '/login'; // Redirect to login page
        }
      }
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
    login: async (data: LoginData): Promise<ApiResponse<{ token: string; user: any }>> => {
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

    

    forgotPassword: async (email: string): Promise<ApiResponse<null>> => {
      return apiService.fetchAPI(endpoints.auth.forgotPassword, {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    },

    resetPassword: async (token: string, password: string): Promise<ApiResponse<null>> => {
      return apiService.fetchAPI(endpoints.auth.resetPassword, {
        method: 'POST',
        body: JSON.stringify({ token, password }),
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

    changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse<null>> => {
      return apiService.fetchAPI(endpoints.user.changePassword, {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
    },
  },

  /**
   * Learning paths methods
   */
  learningPaths: {
    getAll: async (): Promise<ApiResponse<any[]>> => {
      return apiService.fetchAPI(endpoints.learningPaths.getAll);
    },

    getById: async (id: string): Promise<ApiResponse<any>> => {
      return apiService.fetchAPI(endpoints.learningPaths.getById(id));
    },

    create: async (data: any): Promise<ApiResponse<any>> => {
      return apiService.fetchAPI(endpoints.learningPaths.create, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update: async (id: string, data: any): Promise<ApiResponse<any>> => {
      return apiService.fetchAPI(endpoints.learningPaths.update(id), {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: async (id: string): Promise<ApiResponse<null>> => {
      return apiService.fetchAPI(endpoints.learningPaths.delete(id), {
        method: 'DELETE',
      });
    },

    generate: async (requirements: any): Promise<ApiResponse<any>> => {
      return apiService.fetchAPI(endpoints.learningPaths.generate, {
        method: 'POST',
        body: JSON.stringify(requirements),
      });
    },
  },

  /**
   * AI Course Generation methods
   */
  aiCourses: {
    createCourse: async (topic: string): Promise<ApiResponse<CourseData>> => {
      return apiService.fetchAPI(endpoints.aiCourses.create, {
        method: 'POST',
        body: JSON.stringify({ topic }),
      });
    },

    getAllCourses: async (): Promise<ApiResponse<CourseData[]>> => {
      return apiService.fetchAPI(endpoints.aiCourses.getAll);
    },

    getCourseById: async (id: string): Promise<ApiResponse<CourseData>> => {
      return apiService.fetchAPI(endpoints.aiCourses.getById(id));
    },

    getModules: async (courseId: string): Promise<ApiResponse<ModuleData[]>> => {
      return apiService.fetchAPI(endpoints.aiCourses.getModules(courseId));
    },

    getLessons: async (moduleId: string): Promise<ApiResponse<LessonData[]>> => {
      return apiService.fetchAPI(endpoints.aiCourses.getLessons(moduleId));
    },
    getLessonsById: async (lessonId: string): Promise<ApiResponse<LessonData>> => {
      return apiService.fetchAPI(endpoints.aiCourses.getLessonsById(lessonId));
    },

    completeLesson: async (lessonId: string, quizScore?: number): Promise<ApiResponse<any>> => {
      try {
        // Create URL with the lesson ID
        const url = new URL(endpoints.aiCourses.completeLesson(lessonId));

        // Add quiz score as a query parameter if provided
        if (quizScore !== undefined && quizScore !== null) {
          console.log(`Adding quiz score to request: ${quizScore}`);
          url.searchParams.append('quizScore', quizScore.toString());
        }

        console.log(`Complete lesson request URL: ${url.toString()}`);

        return apiService.fetchAPI(url.toString(), {
          method: 'POST'
        });
      } catch (error) {
        console.error('Error in completeLesson:', error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Error processing lesson completion'
        };
      }
    },
    userProgress: async (): Promise<ApiResponse<LessonData>> => {
      return apiService.fetchAPI(endpoints.aiCourses.userProgress());
    },
    userDashboard: async (): Promise<ApiResponse<LessonData>> => {
      return apiService.fetchAPI(endpoints.aiCourses.userDashboard());
    },
    askAi: async (question: string): Promise<ApiResponse<CourseData>> => {
      return apiService.fetchAPI(endpoints.aiCourses.askAi(), {
        method: 'POST',
        body: JSON.stringify({ question }),
      });
    },

  },
};

export default apiService;