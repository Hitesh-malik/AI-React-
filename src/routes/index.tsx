// src/routes/index.tsx
import { createBrowserRouter, createRoutesFromElements, Route, Outlet } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import GeneratePath from '../pages/GeneratePath';
import About from '../pages/About';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';

// Root layout that provides the AuthProvider
const Root = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

// Define all application routes
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      {/* Public routes */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="generatepath" element={<GeneratePath />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* Add more protected routes here */}
        </Route>
        
        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);