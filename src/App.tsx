
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Course from "./pages/Course";
import Calendar from "./pages/Calendar";
import Todo from "./pages/Todo";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPanel";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Protected route component
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

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="/course/:courseId" element={<ProtectedRoute element={<Course />} />} />
      <Route path="/calendar" element={<ProtectedRoute element={<Calendar />} />} />
      <Route path="/todo" element={<ProtectedRoute element={<Todo />} />} />
      <Route path="/reports" element={<ProtectedRoute element={<Reports />} />} />
      <Route path="/admin" element={<ProtectedRoute element={<AdminPanel />} allowedRoles={['admin']} />} />
      <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
