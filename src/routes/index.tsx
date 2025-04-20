// src/routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import GeneratePath from '../pages/GeneratePath';
import About from '../pages/About';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';

// Define all application routes
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'generate-path',
        element: <GeneratePath />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
]);