// src/components/common/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  redirectPath?: string;
}

/**
 * A wrapper component for routes that require authentication
 * Redirects to login page if user is not authenticated
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  redirectPath = '/login' 
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  // While checking authentication status, show a loading indicator
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;