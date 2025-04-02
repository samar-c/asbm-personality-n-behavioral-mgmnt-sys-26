
import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Page imports
import Dashboard from './pages/Dashboard';
import Course from './pages/Course';
import Calendar from './pages/Calendar';
import Todo from './pages/Todo';
import Reports from './pages/Reports';
import AdminPanel from './pages/AdminPanel';
import StudentDetail from './pages/StudentDetail';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Protected route wrapper component
const ProtectedRoute: React.FC<{ 
  element: React.ReactNode; 
  allowedRoles?: Array<'student' | 'teacher' | 'admin'> 
}> = ({ element, allowedRoles = ['student', 'teacher', 'admin'] }) => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{element}</>;
};

// Route definitions
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedRoute element={<Dashboard />} />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/course/:courseId',
    element: <ProtectedRoute element={<Course />} />,
  },
  {
    path: '/calendar',
    element: <ProtectedRoute element={<Calendar />} />,
  },
  {
    path: '/todo',
    element: <ProtectedRoute element={<Todo />} />,
  },
  {
    path: '/reports',
    element: <ProtectedRoute element={<Reports />} />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute element={<AdminPanel />} allowedRoles={['admin', 'teacher']} />,
  },
  {
    path: '/admin/student/:studentId',
    element: <ProtectedRoute element={<StudentDetail />} allowedRoles={['admin', 'teacher']} />,
  },
  {
    path: '/profile',
    element: <ProtectedRoute element={<UserProfile />} />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
