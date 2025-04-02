
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Course from '@/pages/Course';
import AdminPanel from '@/pages/AdminPanel';
import Calendar from '@/pages/Calendar';
import Faculty from '@/pages/Faculty';
import Login from '@/pages/Login';
import { useAuth } from '@/context/AuthContext';

// Protected route component
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

export const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'course/:courseId',
        element: <Course />,
      },
      {
        path: 'admin',
        element: <AdminPanel />,
      },
      {
        path: 'calendar',
        element: <Calendar />,
      },
      {
        path: 'faculty',
        element: <Faculty />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
