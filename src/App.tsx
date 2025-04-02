
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { routes } from "./routes";
import { AnimatePresence } from "framer-motion";

// Custom router component that uses the routes configuration
const AppRoutes: React.FC = () => {
  const routeElements = useRoutes(routes);
  return <AnimatePresence mode="wait">{routeElements}</AnimatePresence>;
};

const App: React.FC = () => {
  // Create a new QueryClient instance inside the component
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="relative min-h-screen">
          {/* Global background image with overlay */}
          <div className="fixed inset-0 -z-10">
            <img 
              src="/lovable-uploads/7afce98d-f21c-40c0-a054-0b0431ca10c9.png" 
              alt="ASBM University Campus" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-background/5"></div>
          </div>
          
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <NotificationProvider>
                <AppRoutes />
              </NotificationProvider>
            </AuthProvider>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
