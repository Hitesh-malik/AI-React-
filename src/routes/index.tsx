// src/routes/index.tsx
import { createBrowserRouter, createRoutesFromElements, Route, Outlet } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Pricing from '../pages/Pricing';

// Learning path components
import LearningPath from '../components/learning/LearningPath';
import Course from '../components/learning/Course';
import Modules from '../components/learning/Modules';
import Lessons from '../components/learning/Lessons';
import LessonContent from '../components/learning/LessonContent';
import Contact from '../pages/Contact';
import AskAi from '../components/learning/AskAi';

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
        {/* <Route path="pricing" element={<Pricing />} /> */}
        <Route path="contact" element={<Contact />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="generatepath" element={<LearningPath />} />
          <Route path="askai" element={<AskAi />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          
          {/* AI Course Learning routes */}
          <Route path="course/:title" element={<Course />} />
          <Route path="course/:title/modules" element={<Modules />} />
          <Route path="course/:title/modules/:moduleId" element={<Lessons />} />
          <Route path="course/:title/modules/:moduleId/lessons/:lessonId" element={<LessonContent />} />
        </Route>
        
        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

export default router;