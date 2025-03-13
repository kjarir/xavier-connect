
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, GraduationCap, Calendar } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  description 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  description?: string 
}) => (
  <Card className="overflow-hidden card-hover">
    <div className="h-1 bg-gradient-to-r from-xavier-400 to-xavier-600" />
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-8 w-8 rounded-full bg-xavier-50 flex items-center justify-center text-xavier-700">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </CardContent>
  </Card>
);

const DashboardStats: React.FC = () => {
  const { courses } = useData();
  const { user } = useAuth();
  
  const userRole = user?.role || 'student';
  const currentDate = new Date();
  
  let stats = [];
  
  if (userRole === 'admin') {
    stats = [
      { 
        title: 'Total Courses', 
        value: courses.length, 
        icon: <BookOpen size={18} />,
        description: 'Active courses this semester'
      },
      { 
        title: 'Total Students', 
        value: 120, 
        icon: <GraduationCap size={18} />,
        description: 'Enrolled in current semester'
      },
      { 
        title: 'Total Faculty', 
        value: 25, 
        icon: <Users size={18} />,
        description: 'Active teaching staff'
      },
      { 
        title: 'Next Event', 
        value: 'Oct 30', 
        icon: <Calendar size={18} />,
        description: 'Faculty meeting'
      }
    ];
  } else if (userRole === 'teacher') {
    // Filter courses taught by this teacher
    const teacherCourses = courses.filter(course => course.teacherId === user?.id);
    
    stats = [
      { 
        title: 'My Courses', 
        value: teacherCourses.length, 
        icon: <BookOpen size={18} />,
        description: 'Courses you are teaching'
      },
      { 
        title: 'Total Students', 
        value: teacherCourses.reduce((acc, course) => acc + course.students.length, 0), 
        icon: <GraduationCap size={18} />,
        description: 'Students in your courses'
      },
      { 
        title: 'Upcoming Classes', 
        value: 2, 
        icon: <Calendar size={18} />,
        description: 'In the next 7 days'
      },
      { 
        title: 'Pending Reviews', 
        value: 5, 
        icon: <BookOpen size={18} />,
        description: 'Assignments to review'
      }
    ];
  } else {
    // Student dashboard
    // Filter courses the student is enrolled in
    const studentCourses = courses.filter(course => course.students.includes(user?.id || ''));
    
    stats = [
      { 
        title: 'My Courses', 
        value: studentCourses.length, 
        icon: <BookOpen size={18} />,
        description: 'Courses you are enrolled in'
      },
      { 
        title: 'Due Assignments', 
        value: 3, 
        icon: <BookOpen size={18} />,
        description: 'In the next 7 days'
      },
      { 
        title: 'Upcoming Classes', 
        value: 4, 
        icon: <Calendar size={18} />,
        description: 'In the next 7 days'
      },
      { 
        title: 'Current GPA', 
        value: '3.8', 
        icon: <GraduationCap size={18} />,
        description: 'For current semester'
      }
    ];
  }
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={index} className="animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
