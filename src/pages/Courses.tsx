
import React from 'react';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import PageTransition from '@/components/PageTransition';
import CourseCard from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const CoursesPage: React.FC = () => {
  const { courses } = useData();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // Filter courses based on user role
  const userCourses = user?.role === 'teacher' 
    ? courses.filter(course => course.teacherId === user.id)
    : user?.role === 'student'
    ? courses.filter(course => course.students.includes(user.id))
    : courses;
  
  // Filter by search term
  const filteredCourses = userCourses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group courses by semester
  const coursesBySemester = filteredCourses.reduce((acc, course) => {
    if (!acc[course.semester]) {
      acc[course.semester] = [];
    }
    acc[course.semester].push(course);
    return acc;
  }, {} as Record<string, typeof courses>);
  
  return (
    <PageTransition>
      <div className="container px-4 py-6 sm:px-8 mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
            <p className="text-muted-foreground mt-1">
              {user?.role === 'teacher' 
                ? 'Courses you are teaching' 
                : user?.role === 'student' 
                ? 'Courses you are enrolled in' 
                : 'All active courses'}
            </p>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {user?.role !== 'student' && (
              <Button className="shrink-0 bg-xavier-600 hover:bg-xavier-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            )}
          </div>
        </div>
        
        {Object.keys(coursesBySemester).length > 0 ? (
          <div className="space-y-8">
            {Object.entries(coursesBySemester).map(([semester, semesterCourses], semesterIndex) => (
              <div key={semester} className="space-y-3">
                <h2 className="text-lg font-semibold flex items-center">
                  <Badge variant="outline" className="mr-2 bg-xavier-50 text-xavier-700">
                    {semester}
                  </Badge>
                  <span>{semesterCourses.length} course{semesterCourses.length !== 1 ? 's' : ''}</span>
                </h2>
                
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {semesterCourses.map((course, courseIndex) => (
                    <div 
                      key={course.id} 
                      className="animate-slide-in" 
                      style={{ animationDelay: `${courseIndex * 0.05 + semesterIndex * 0.1}s` }}
                    >
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <BookOpen size={40} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No courses found</h3>
            <p className="text-muted-foreground mt-1 mb-4">
              {searchTerm 
                ? `No courses match your search for "${searchTerm}"`
                : 'You don\'t have any courses yet'}
            </p>
            {user?.role !== 'student' && (
              <Button className="bg-xavier-600 hover:bg-xavier-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                {user?.role === 'admin' ? 'Create New Course' : 'Create Class'}
              </Button>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default CoursesPage;
