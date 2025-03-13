
import React, { createContext, useContext, useState } from 'react';
import { Course, Note, Announcement } from '@/types';

interface DataContextType {
  courses: Course[];
  notes: Note[];
  announcements: Announcement[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt'>) => void;
  getCourseById: (id: string) => Course | undefined;
  getNotesByCourseId: (courseId: string) => Note[];
  getAnnouncementsByCourseId: (courseId: string) => Announcement[];
}

// Mock data
const MOCK_COURSES: Course[] = [
  {
    id: '1',
    name: 'Introduction to Computer Science',
    code: 'CS101',
    description: 'A foundational course covering basic concepts in computer science',
    teacherId: '2',
    teacherName: 'Teacher One',
    semester: 'Fall 2023',
    students: ['3']
  },
  {
    id: '2',
    name: 'Advanced Mathematics',
    code: 'MATH202',
    description: 'Advanced mathematical concepts and theories',
    teacherId: '2',
    teacherName: 'Teacher One',
    semester: 'Fall 2023',
    students: ['3']
  },
  {
    id: '3',
    name: 'Physics Fundamentals',
    code: 'PHYS101',
    description: 'Introduction to physics and natural sciences',
    teacherId: '2',
    teacherName: 'Teacher One',
    semester: 'Fall 2023',
    students: ['3']
  }
];

const MOCK_NOTES: Note[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    content: 'This lecture covers the basics of algorithm design and analysis...',
    courseId: '1',
    createdAt: '2023-10-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Calculus Review',
    content: 'A comprehensive review of calculus concepts covered so far...',
    courseId: '2',
    createdAt: '2023-10-12T14:15:00Z'
  }
];

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Midterm Exam Schedule',
    content: 'The midterm exam will be held on November 15th. Please prepare accordingly.',
    courseId: '1',
    createdAt: '2023-10-20T09:00:00Z',
    createdBy: 'Teacher One'
  },
  {
    id: '2',
    title: 'Assignment Deadline Extension',
    content: 'Due to technical issues, the deadline for Assignment 3 has been extended to October 25th.',
    courseId: '2',
    createdAt: '2023-10-18T16:30:00Z',
    createdBy: 'Teacher One'
  }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);

  const addCourse = (course: Omit<Course, 'id'>) => {
    const newCourse = {
      ...course,
      id: Math.random().toString(36).substr(2, 9)
    };
    setCourses(prev => [...prev, newCourse]);
  };

  const addNote = (note: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote = {
      ...note,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    setNotes(prev => [...prev, newNote]);
  };

  const addAnnouncement = (announcement: Omit<Announcement, 'id' | 'createdAt'>) => {
    const newAnnouncement = {
      ...announcement,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    setAnnouncements(prev => [...prev, newAnnouncement]);
  };

  const getCourseById = (id: string) => {
    return courses.find(course => course.id === id);
  };

  const getNotesByCourseId = (courseId: string) => {
    return notes.filter(note => note.courseId === courseId);
  };

  const getAnnouncementsByCourseId = (courseId: string) => {
    return announcements.filter(announcement => announcement.courseId === courseId);
  };

  return (
    <DataContext.Provider value={{
      courses,
      notes,
      announcements,
      addCourse,
      addNote,
      addAnnouncement,
      getCourseById,
      getNotesByCourseId,
      getAnnouncementsByCourseId
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
