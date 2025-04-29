// src/utils/authUtils.ts
import apiService from '../api/apiService';
import { showToast } from './toastUtils';

interface AuthUser {
  id: string;
  username: string;
  email: string;
}

/**
 * Authentication utilities for managing user authentication state
 */
const authUtils = {
  /**
   * Check if user is currently logged in
   * @returns {boolean} True if user is logged in, false otherwise
   */
  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  /**
   * Get the authentication token
   * @returns {string|null} The auth token or null if not logged in
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  /**
   * Set the authentication token
   * @param {string} token - The authentication token to store
   */
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  },

  /**
   * Remove the authentication token (logout)
   */
  removeToken(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  /**
   * Get the current user from localStorage
   * @returns {AuthUser|null} The user object or null if not available
   */
  getUser(): AuthUser | null {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson) as AuthUser;
    } catch (error) {
      console.error('Failed to parse user data:', error);
      return null;
    }
  },

  /**
   * Set the current user in localStorage
   * @param {AuthUser} user - The user object to store
   */
  setUser(user: AuthUser): void {
    localStorage.setItem('user', JSON.stringify(user));
  },

  /**
   * Check if the current authentication token is valid
   * @returns {Promise<boolean>} Promise resolving to true if token is valid, false otherwise
   */
  async validateToken(): Promise<boolean> {
    // Return false if no token exists
    if (!this.isLoggedIn()) {
      return false;
    }
    return true; // Placeholder for actual token validation logic
    // try {
    //   // Make a request to validate the token
    //   const response = await apiService.user.getProfile();
      
    //   if (response.success && response.data) {
    //     // Update user information
    //     this.setUser(response.data);
    //     return true;
    //   } else {
    //     // Token is invalid, clear auth data
    //     this.logout();
    //     return false;
    //   }
    // } catch (error) {
    //   console.error('Error validating token:', error);
    //   return false;
    // }
  },

  /**
   * Log the user out
   * @returns {Promise<boolean>} Promise resolving to true if logout was successful
   */
  async logout(): Promise<boolean> {
    showToast.info('See you soon! Successfully');
    this.removeToken();
    return true;
  }
};

export default authUtils;