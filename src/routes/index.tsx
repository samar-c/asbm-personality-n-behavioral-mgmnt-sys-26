
import React from 'react';
import { Navigate } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Course from '@/pages/Course';
import AdminPanel from '@/pages/AdminPanel';
import Calendar from '@/pages/Calendar';

export const routes = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/course/:courseId',
    element: <Course />,
  },
  {
    path: '/admin',
    element: <AdminPanel />,
  },
  {
    path: '/calendar',
    element: <Calendar />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
