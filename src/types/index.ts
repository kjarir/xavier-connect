
export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  teacherId: string;
  teacherName: string;
  semester: string;
  students: string[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  courseId: string;
  createdAt: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  courseId: string;
  createdAt: string;
  createdBy: string;
}
