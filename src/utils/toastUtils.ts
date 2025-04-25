// src/utils/toastUtils.ts
import toast, {  ToastOptions } from 'react-hot-toast';

// For consistent toast styling across the app
export const showToast = {
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, {
      duration: 3000,
      ...options,
    });
  },
  
  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, {
      duration: 4000,
      ...options,
    });
  },
  
  info: (message: string, options?: ToastOptions) => {
    return toast(message, {
      icon: 'ℹ️',
      duration: 3000,
      ...options,
    });
  },
  
  loading: (message: string, options?: ToastOptions) => {
    return toast.loading(message, {
      ...options,
    });
  },
  
  // For AI-related notifications
  ai: (message: string, options?: ToastOptions) => {
    return toast(message, {
      icon: '🤖',
      duration: 3000,
      ...options,
    });
  },
};