
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Bell, Check, Info, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter,
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  course: string;
  timestamp: Date;
  read: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Assignment Due Soon',
    message: 'Your Python programming assignment is due in 24 hours.',
    course: 'Introduction to Programming',
    timestamp: new Date(new Date().getTime() - 30 * 60000),
    read: false
  },
  {
    id: '2',
    type: 'info',
    title: 'New Course Material Available',
    message: 'New reading materials for Business Analytics have been uploaded.',
    course: 'Business Analytics',
    timestamp: new Date(new Date().getTime() - 2 * 3600000),
    read: false
  },
  {
    id: '3',
    type: 'success',
    title: 'Assignment Graded',
    message: 'Your Marketing Strategy assignment has been graded. You received an A!',
    course: 'Marketing Fundamentals',
    timestamp: new Date(new Date().getTime() - 5 * 3600000),
    read: true
  },
  {
    id: '4',
    type: 'error',
    title: 'Attendance Warning',
    message: 'Your attendance in Financial Accounting is below 75%. Please improve your attendance.',
    course: 'Financial Accounting',
    timestamp: new Date(new Date().getTime() - 1 * 86400000),
    read: false
  }
];

const ClassroomAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [showAll, setShowAll] = useState(false);
  
  const unreadCount = alerts.filter(alert => !alert.read).length;
  const displayAlerts = showAll ? alerts : alerts.slice(0, 3);
  
  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, read: true } : alert
    ));
  };
  
  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };
  
  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })));
  };
  
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'success': return <Check className="h-5 w-5 text-green-500" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };
  
  const getTimeString = (date: Date) => {
    const minutes = Math.floor((new Date().getTime() - date.getTime()) / 60000);
    
    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };

  return (
    <Card className="w-full shadow-lg animate-fade-in">
      <CardHeader className="bg-primary/5 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Classroom Alerts
          </CardTitle>
          <CardDescription>Stay updated with your courses</CardDescription>
        </div>
        {unreadCount > 0 && (
          <Badge variant="secondary" className="animate-pulse">
            {unreadCount} unread
          </Badge>
        )}
      </CardHeader>
      
      <CardContent className="pt-6 px-6 max-h-[500px] overflow-y-auto">
        {displayAlerts.length > 0 ? (
          <div className="space-y-4">
            {displayAlerts.map((alert) => (
              <motion.div 
                key={alert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg border ${
                  alert.read ? 'bg-muted/30' : 'bg-card shadow-md'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                    <div>
                      <div className="flex items-center">
                        <h4 className={`font-medium ${!alert.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {alert.title}
                        </h4>
                        {!alert.read && (
                          <span className="ml-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>
                      <p className={`text-sm ${!alert.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {alert.message}
                      </p>
                      <div className="mt-1 flex items-center text-xs text-muted-foreground">
                        <Badge variant="outline" className="mr-2 text-xs">
                          {alert.course}
                        </Badge>
                        <span>{getTimeString(alert.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {!alert.read && (
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-6 w-6" 
                        onClick={() => markAsRead(alert.id)}
                      >
                        <Check className="h-3 w-3" />
                        <span className="sr-only">Mark as read</span>
                      </Button>
                    )}
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-6 w-6" 
                      onClick={() => dismissAlert(alert.id)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Dismiss</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            <Bell className="mx-auto h-12 w-12 mb-3 opacity-20" />
            <p>No alerts at the moment</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between bg-muted/20 border-t">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={markAllAsRead}
          disabled={!alerts.some(alert => !alert.read)}
        >
          Mark all as read
        </Button>
        {alerts.length > 3 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show less' : `Show all (${alerts.length})`}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ClassroomAlerts;
