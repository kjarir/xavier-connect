
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Course } from '@/types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link to={`/course/${course.id}`} className="block">
      <Card className="overflow-hidden h-full card-hover border border-xavier-100">
        <div className="h-2 bg-gradient-to-r from-xavier-400 to-xavier-600" />
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-medium">{course.name}</CardTitle>
              <CardDescription className="text-sm mt-1">{course.code}</CardDescription>
            </div>
            <Badge variant="outline" className="bg-xavier-50 text-xavier-800 hover:bg-xavier-100">
              {course.semester}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground pb-2">
          <p className="line-clamp-2">{course.description}</p>
        </CardContent>
        <CardFooter className="pt-0 text-xs text-muted-foreground flex items-center gap-2">
          <Book size={14} className="text-xavier-500" />
          <span>By {course.teacherName}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
