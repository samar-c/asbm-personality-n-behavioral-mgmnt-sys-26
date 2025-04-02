
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import GoogleAuthProvider from '@/components/GoogleAuthProvider';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      login(email, password, role);
      setLoading(false);
    }, 1000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.5,
        staggerChildren: 0.15
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img 
          src="/lovable-uploads/7afce98d-f21c-40c0-a054-0b0431ca10c9.png" 
          alt="ASBM University Campus" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-primary/30 backdrop-blur-sm"></div>
      </div>
      
      <motion.div 
        className="max-w-md w-full space-y-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center" variants={itemVariants}>
          <div className="flex justify-center">
            <motion.img 
              src="/lovable-uploads/e837c76a-f20c-4215-b385-a87dd3a9f7ee.png" 
              alt="ASBM University" 
              className="h-16 mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20, 
                delay: 0.2 
              }}
            />
          </div>
          <motion.p 
            className="mt-1 text-white text-lg font-semibold"
            variants={itemVariants}
          >
            Student Behavior Analysis System
          </motion.p>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="w-full bg-white/95 backdrop-blur-md shadow-xl transition-all duration-300 hover:shadow-2xl">
            <CardHeader>
              <CardTitle className="text-xl text-center">Sign in to your account</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="student" className="w-full mb-6" onValueChange={(value) => setRole(value as 'student' | 'teacher' | 'admin')}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger 
                    value="student" 
                    className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Student
                  </TabsTrigger>
                  <TabsTrigger 
                    value="teacher"
                    className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Teacher
                  </TabsTrigger>
                  <TabsTrigger 
                    value="admin"
                    className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Admin
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={`${role}@asbm.ac.in`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full transition-all duration-500 hover:bg-primary/90 hover:shadow-md transform hover:-translate-y-1"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
                
                <div className="relative mt-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                <GoogleAuthProvider />
                
                <div className="text-center text-sm text-gray-500 mt-6 bg-gray-50 p-3 rounded-md border border-gray-100">
                  <p className="font-semibold">Demo accounts (any password works):</p>
                  <div className="mt-1 space-y-1">
                    <p className="hover:text-primary transition-colors cursor-pointer" onClick={() => setEmail('student@asbm.ac.in')}>student@asbm.ac.in</p>
                    <p className="hover:text-primary transition-colors cursor-pointer" onClick={() => setEmail('teacher@asbm.ac.in')}>teacher@asbm.ac.in</p>
                    <p className="hover:text-primary transition-colors cursor-pointer" onClick={() => setEmail('admin@asbm.ac.in')}>admin@asbm.ac.in</p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
