
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import UserAvatar from '@/components/UserAvatar';
import NotificationIcon from '@/components/NotificationIcon';
import NavigationHeader from '@/components/NavigationHeader';
import { Calendar, LayoutDashboard, BookOpen, UserCog, GraduationCap } from 'lucide-react';

const Navigation: React.FC = () => {
  const { isAuthenticated, userRole, logout } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  const navigationLinks = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <LayoutDashboard className="h-5 w-5" />,
      roles: ['student', 'teacher', 'admin'],
    },
    {
      name: 'Courses',
      path: '/course/1',
      icon: <BookOpen className="h-5 w-5" />,
      roles: ['student', 'teacher', 'admin'],
    },
    {
      name: 'Faculty',
      path: '/faculty',
      icon: <GraduationCap className="h-5 w-5" />,
      roles: ['student', 'teacher', 'admin'],
    },
    {
      name: 'Calendar',
      path: '/calendar',
      icon: <Calendar className="h-5 w-5" />,
      roles: ['student', 'teacher', 'admin'],
    },
    {
      name: 'Admin Panel',
      path: '/admin',
      icon: <UserCog className="h-5 w-5" />,
      roles: ['admin'],
    },
  ];

  const filteredLinks = navigationLinks.filter(link => 
    link.roles.includes(userRole || '')
  );

  // Animation variants for menu items
  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <NavigationHeader onMenuToggle={toggleMobileMenu} />
      
      {/* Mobile Menu Overlay */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, x: '-100%' }}
          animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.nav
            className="flex flex-col h-full w-3/4 max-w-xs bg-card shadow-xl p-4 space-y-6"
            onClick={(e) => e.stopPropagation()}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <UserAvatar />
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                <span className="sr-only">Close Menu</span>
              </Button>
            </div>
            
            <div className="space-y-1">
              {filteredLinks.map((link) => (
                <motion.div key={link.path} variants={menuItemVariants}>
                  <Link
                    to={link.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      location.pathname === link.path
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-auto border-t pt-4">
              <motion.div variants={menuItemVariants}>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  Logout
                </Button>
              </motion.div>
            </div>
          </motion.nav>
        </motion.div>
      )}
      
      {/* Desktop Navigation */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card/80 backdrop-blur-md border-b sticky top-0 z-30"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center h-16">
              <div className="flex-1 flex items-center justify-center sm:justify-start">
                <nav className="flex space-x-2">
                  {filteredLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`nav-link px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        location.pathname === link.path
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {link.icon}
                        {link.name}
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
              
              <div className="flex items-center space-x-4">
                <NotificationIcon />
                <UserAvatar />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navigation;
