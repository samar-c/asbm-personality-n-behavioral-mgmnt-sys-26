
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/context/NotificationContext';
import { toast } from '@/hooks/use-toast';
import { BellRing, BookOpen, Calendar, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { universityInfo } from '@/utils/mockData';

// Demo component to showcase notifications functionality with animations
const ClassroomNotificationDemo = () => {
  const { addNotification } = useNotifications();
  const [demoStarted, setDemoStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Sample notifications for demo
  const demoNotifications = [
    { 
      title: 'New Assignment', 
      message: 'Marketing Management: Case Study Analysis due in 7 days',
      type: 'info' as const,
      delay: 2000,
      icon: <BookOpen className="h-5 w-5" />
    },
    { 
      title: 'Attendance Alert', 
      message: 'Your attendance in Financial Accounting is below 75%',
      type: 'warning' as const,
      delay: 5000,
      icon: <Clock className="h-5 w-5" />
    },
    { 
      title: 'Feedback Available', 
      message: 'Your Business Ethics assignment has been graded',
      type: 'success' as const,
      delay: 8000,
      icon: <CheckCircle className="h-5 w-5" />
    },
    { 
      title: 'Upcoming Event', 
      message: `${universityInfo.name} - Guest lecture on Leadership tomorrow at 11 AM`,
      type: 'info' as const,
      delay: 11000,
      icon: <Calendar className="h-5 w-5" />
    },
  ];
  
  // Start demo notification sequence with progress tracking
  const startDemo = () => {
    if (demoStarted) return;
    
    setDemoStarted(true);
    setProgress(0);
    
    toast({
      title: "Notification Demo Started",
      description: "You'll receive classroom notifications over the next few seconds.",
    });
    
    // Set up progress increment
    const totalDuration = demoNotifications[demoNotifications.length - 1].delay + 3000;
    const intervalStep = 50; // Update every 50ms
    const progressIncrement = (intervalStep / totalDuration) * 100;
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + progressIncrement;
      });
    }, intervalStep);
    
    // Schedule notifications with delays
    demoNotifications.forEach((notification, index) => {
      setTimeout(() => {
        addNotification({
          title: notification.title,
          message: notification.message,
          type: notification.type,
        });
      }, notification.delay);
    });
    
    // Reset demo state after all notifications
    setTimeout(() => {
      setDemoStarted(false);
      setProgress(0);
      toast({
        title: "Demo Complete",
        description: "All notifications have been delivered.",
      });
    }, totalDuration);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center my-4 p-4 glass-effect rounded-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div 
        className="flex items-center justify-center gap-3 mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <BellRing className="h-6 w-6 text-primary animate-bounce-slow" />
        <h3 className="text-lg font-semibold gradient-text">Notification Demonstration</h3>
        <BellRing className="h-6 w-6 text-primary animate-bounce-slow" />
      </motion.div>
      
      <p className="text-sm text-center text-muted-foreground mb-4">
        Experience interactive notifications from the ASBM University Student Portal
      </p>
      
      <AnimatePresence mode="wait">
        {demoStarted ? (
          <motion.div 
            key="progress"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            exit={{ opacity: 0 }}
            className="w-full mb-4"
          >
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="mt-2 text-xs text-center text-muted-foreground">
              Sending notifications... {Math.round(progress)}%
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={startDemo} 
              disabled={demoStarted}
              className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-md shadow-md transition-all duration-300 hover:shadow-lg btn-hover-effect"
            >
              <BellRing className="mr-2 h-4 w-4" />
              Start Notification Demo
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {demoStarted && (
        <motion.div 
          className="mt-4 text-sm text-center text-primary font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, -5, 0]
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut", 
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            Watch for notifications to appear!
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ClassroomNotificationDemo;
