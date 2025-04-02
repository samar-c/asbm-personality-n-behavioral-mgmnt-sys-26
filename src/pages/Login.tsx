
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

  const handleGoogleLogin = () => {
    setLoading(true);
    // Simulate network request for Google login
    setTimeout(() => {
      login('student@asbm.ac.in', 'password', role);
      toast({
        title: "Google Sign-in Successful",
        description: "You've been logged in through Google.",
      });
      setLoading(false);
    }, 1500);
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
      
      <div className="max-w-md w-full space-y-8 relative z-10 animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/e837c76a-f20c-4215-b385-a87dd3a9f7ee.png" 
              alt="ASBM University" 
              className="h-16 mb-4 animate-scale-in" 
            />
          </div>
          <p className="mt-1 text-white text-lg font-semibold">Student Behavior Analysis System</p>
        </div>
        
        <Card className="w-full bg-white/95 backdrop-blur-md shadow-xl animate-scale-in">
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
                className="w-full transition-all duration-300 hover:bg-primary/90 hover:shadow-md transform hover:-translate-y-1"
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
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full mt-4 transition-all duration-300 hover:bg-gray-50 hover:shadow-md transform hover:-translate-y-1"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Sign in with Google
              </Button>
              
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
      </div>
    </div>
  );
};

export default Login;
