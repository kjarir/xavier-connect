
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import PageTransition from '@/components/PageTransition';
import DashboardStats from '@/components/DashboardStats';
import CourseCard from '@/components/CourseCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { courses } = useData();
  
  // Filter courses based on user role
  const userCourses = user?.role === 'teacher' 
    ? courses.filter(course => course.teacherId === user.id)
    : user?.role === 'student'
    ? courses.filter(course => course.students.includes(user.id))
    : courses;
  
  // Get recent and upcoming events (normally would be from an API)
  const recentAnnouncements = [
    { id: '1', title: 'Midterm Schedule Posted', date: '2 hours ago', course: 'CS101' },
    { id: '2', title: 'New Assignment Added', date: '1 day ago', course: 'MATH202' },
    { id: '3', title: 'Campus Event Next Week', date: '2 days ago', course: 'General' }
  ];
  
  const upcomingEvents = [
    { id: '1', title: 'CS101 Lecture', date: 'Today, 10:30 AM', course: 'CS101' },
    { id: '2', title: 'Assignment Deadline', date: 'Tomorrow, 11:59 PM', course: 'MATH202' },
    { id: '3', title: 'Study Group Meeting', date: 'Oct 28, 3:00 PM', course: 'PHYS101' }
  ];
  
  return (
    <PageTransition>
      <div className="container px-4 py-6 sm:px-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome, {user?.name.split(' ')[0]}
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your courses
            </p>
          </div>
          
          {user?.role !== 'student' && (
            <Button className="bg-xavier-600 hover:bg-xavier-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              {user?.role === 'admin' ? 'Add New Course' : 'Create Class'}
            </Button>
          )}
        </div>
        
        <div className="mb-8">
          <DashboardStats />
        </div>
        
        <div className="grid gap-6 md:grid-cols-7">
          <div className="md:col-span-4 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">My Courses</h2>
                <Link to="/courses">
                  <Button variant="link" className="text-xavier-600 p-0 h-auto">View All</Button>
                </Link>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {userCourses.slice(0, 4).map((course, index) => (
                  <div 
                    key={course.id} 
                    className="animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3 space-y-6">
            <Card className="border-xavier-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
              </CardHeader>
              
              <Tabs defaultValue="announcements">
                <div className="px-6">
                  <TabsList className="w-full">
                    <TabsTrigger value="announcements" className="flex-1">Announcements</TabsTrigger>
                    <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="announcements" className="m-0">
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {recentAnnouncements.map((item, i) => (
                        <div 
                          key={item.id} 
                          className="py-3 px-6 hover:bg-muted/50 transition-colors cursor-pointer flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium text-sm">{item.title}</p>
                            <p className="text-muted-foreground text-xs">{item.course}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </TabsContent>
                
                <TabsContent value="upcoming" className="m-0">
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {upcomingEvents.map((item) => (
                        <div 
                          key={item.id} 
                          className="py-3 px-6 hover:bg-muted/50 transition-colors cursor-pointer flex justify-between items-start"
                        >
                          <div>
                            <p className="font-medium text-sm">{item.title}</p>
                            <p className="text-muted-foreground text-xs">{item.course}</p>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <CalendarDays size={12} className="mr-1" />
                            <span>{item.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
