
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/types';
import PageTransition from '@/components/PageTransition';

const LoginPage: React.FC = () => {
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState({
    admin: 'admin@xavier.edu',
    teacher: 'teacher@xavier.edu',
    student: 'student@xavier.edu'
  });
  
  const [password, setPassword] = useState({
    admin: 'password',
    teacher: 'password',
    student: 'password'
  });

  const handleLogin = async (role: UserRole) => {
    await login(email[role], password[role], role);
    navigate('/dashboard');
  };

  return (
    <PageTransition className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-xavier-50 to-white">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-xavier-500 to-xavier-700 text-white font-semibold text-xl shadow-lg animate-scale-in">
              X
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Xavier Connect</h1>
          <p className="text-muted-foreground mt-1">Sign in to your account</p>
        </div>
        
        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="teacher">Teacher</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          
          {['student', 'teacher', 'admin'].map((role) => (
            <TabsContent key={role} value={role} className="animate-fade-in">
              <Card className="border-xavier-100 shadow-sm">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">{role.charAt(0).toUpperCase() + role.slice(1)} Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to sign in as a {role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${role}-email`}>Email</Label>
                    <Input 
                      id={`${role}-email`} 
                      type="email" 
                      placeholder="name@xavier.edu" 
                      value={email[role as keyof typeof email]} 
                      onChange={(e) => setEmail({...email, [role]: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${role}-password`}>Password</Label>
                      <Button variant="link" className="p-0 h-auto text-xs text-xavier-600">
                        Forgot password?
                      </Button>
                    </div>
                    <Input 
                      id={`${role}-password`} 
                      type="password" 
                      value={password[role as keyof typeof password]} 
                      onChange={(e) => setPassword({...password, [role]: e.target.value})} 
                    />
                  </div>
                  
                  {error && (
                    <div className="text-destructive text-sm">{error}</div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-xavier-600 hover:bg-xavier-700"
                    onClick={() => handleLogin(role as UserRole)}
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : `Sign in as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Demo credentials are pre-filled for demonstration purposes</p>
        </div>
      </div>
    </PageTransition>
  );
};

export default LoginPage;
