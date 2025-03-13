
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import PageTransition from '@/components/PageTransition';
import { ArrowRight, BookOpen, Laptop, Users, Shield } from 'lucide-react';

const Index: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // If user is logged in, redirect to dashboard
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-white to-xavier-50 py-20 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          
          <div className="relative container px-4 sm:px-8 mx-auto max-w-6xl z-10">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <div className="inline-block">
                <div className="flex items-center justify-center gap-2 px-3 py-1 text-sm rounded-full bg-xavier-100 text-xavier-800 mb-6 animate-fade-in">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-xavier-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-xavier-500"></span>
                  </span>
                  Welcome to Xavier College ERP System
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
                The digital hub for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-xavier-600 to-xavier-800"> Xavier's College</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
                A comprehensive educational platform for students, teachers, and administrators to manage courses, share notes, and collaborate effectively.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <Button 
                  size="lg" 
                  className="bg-xavier-600 hover:bg-xavier-700 h-12 px-8"
                  onClick={() => navigate('/login')}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              {[
                {
                  title: 'For Students',
                  description: 'Access course materials, submit assignments, and engage with instructors all in one place.',
                  icon: <BookOpen className="h-8 w-8 text-xavier-600" />
                },
                {
                  title: 'For Teachers',
                  description: 'Create and manage courses, share resources, and track student progress efficiently.',
                  icon: <Laptop className="h-8 w-8 text-xavier-600" />
                },
                {
                  title: 'For Administrators',
                  description: 'Oversee all academic activities, manage users, and ensure smooth operation of the institution.',
                  icon: <Shield className="h-8 w-8 text-xavier-600" />
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-xavier-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-xavier-50 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-white py-16">
          <div className="container px-4 sm:px-8 mx-auto max-w-6xl">
            <div className="bg-gradient-to-r from-xavier-600 to-xavier-800 rounded-2xl overflow-hidden animate-scale-in">
              <div className="px-6 py-10 sm:px-10 sm:py-16 md:p-16 text-white">
                <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <h2 className="text-3xl font-bold mb-4">Ready to transform your educational experience?</h2>
                    <p className="text-xavier-100 mb-6">
                      Join Xavier Connect to experience a seamless and innovative approach to learning and teaching.
                    </p>
                    <Button 
                      size="lg" 
                      variant="secondary" 
                      className="bg-white text-xavier-800 hover:bg-xavier-50"
                      onClick={() => navigate('/login')}
                    >
                      Sign In Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
                      <Users size={48} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-xavier-50 border-t border-xavier-100 py-8">
          <div className="container px-4 sm:px-8 mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-xavier-500 to-xavier-700 text-white font-semibold">
                  X
                </div>
                <span className="font-semibold text-lg">Xavier Connect</span>
              </div>
              
              <div className="flex gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground">About</a>
                <a href="#" className="hover:text-foreground">Privacy Policy</a>
                <a href="#" className="hover:text-foreground">Terms of Service</a>
                <a href="#" className="hover:text-foreground">Contact</a>
              </div>
            </div>
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Xavier College. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Index;
