
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, Calendar, ChevronLeft, FileText, GraduationCap, MessageCircle, PlusCircle, User, Users } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCourseById, getNotesByCourseId, addNote } = useData();
  const { user } = useAuth();
  
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const course = getCourseById(id || '');
  const notes = getNotesByCourseId(id || '');
  
  if (!course) {
    return (
      <div className="container px-6 py-8 mx-auto">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Course not found</h2>
          <Button variant="link" onClick={() => navigate('/courses')}>
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }
  
  const isTeacher = user?.role === 'teacher' && course.teacherId === user.id;
  
  const handleAddNote = () => {
    if (noteTitle && noteContent) {
      addNote({
        title: noteTitle,
        content: noteContent,
        courseId: course.id
      });
      
      setNoteTitle('');
      setNoteContent('');
      setDialogOpen(false);
    }
  };
  
  return (
    <PageTransition>
      <div className="container px-4 py-6 sm:px-8 mx-auto max-w-7xl">
        <Button 
          variant="ghost" 
          className="mb-4 flex items-center text-muted-foreground hover:text-foreground" 
          onClick={() => navigate('/courses')}
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Courses
        </Button>
        
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-xavier-100 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-xavier-400 to-xavier-600" />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-2xl font-bold">{course.name}</CardTitle>
                      <Badge className="bg-xavier-100 text-xavier-800 hover:bg-xavier-200">
                        {course.code}
                      </Badge>
                    </div>
                    <CardDescription className="mt-2">{course.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <Separator className="mb-0" />
              
              <Tabs defaultValue="notes" className="w-full">
                <TabsList className="w-full rounded-none border-b bg-transparent h-auto p-0">
                  {["notes", "announcements", "assignments", "discussions"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-xavier-600 
                                data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4 capitalize"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value="notes" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Course Notes</h3>
                    
                    {isTeacher && (
                      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-xavier-600 hover:bg-xavier-700">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Note
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Note</DialogTitle>
                            <DialogDescription>
                              Create a new note for your students. Notes can include text content and attachments.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="title">Title</Label>
                              <Input 
                                id="title" 
                                value={noteTitle}
                                onChange={(e) => setNoteTitle(e.target.value)}
                                placeholder="Enter note title"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="content">Content</Label>
                              <Textarea 
                                id="content" 
                                value={noteContent}
                                onChange={(e) => setNoteContent(e.target.value)}
                                placeholder="Enter note content"
                                rows={6}
                              />
                            </div>
                          </div>
                          
                          <DialogFooter>
                            <Button
                              className="bg-xavier-600 hover:bg-xavier-700"
                              onClick={handleAddNote}
                              disabled={!noteTitle || !noteContent}
                            >
                              Save Note
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                  
                  {notes.length > 0 ? (
                    <div className="space-y-4">
                      {notes.map((note, index) => (
                        <Card 
                          key={note.id} 
                          className="border-xavier-100 card-hover animate-slide-in overflow-hidden"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="h-1 bg-xavier-100" />
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg font-medium">{note.title}</CardTitle>
                              <Badge variant="outline" className="text-xs">
                                {new Date(note.createdAt).toLocaleDateString()}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">{note.content}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <FileText size={24} className="text-muted-foreground" />
                      </div>
                      <h3 className="text-base font-medium">No notes yet</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-4">
                        {isTeacher 
                          ? 'Start by adding a new note for your students' 
                          : 'Your teacher hasn\'t posted any notes yet'}
                      </p>
                      
                      {isTeacher && (
                        <Button 
                          className="bg-xavier-600 hover:bg-xavier-700"
                          onClick={() => setDialogOpen(true)}
                        >
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add First Note
                        </Button>
                      )}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="announcements" className="p-6">
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <MessageCircle size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-base font-medium">No announcements yet</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Check back later for course announcements
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="assignments" className="p-6">
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <BookOpen size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-base font-medium">No assignments yet</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Check back later for course assignments
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="discussions" className="p-6">
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <MessageCircle size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-base font-medium">No discussions yet</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Start or join a discussion about this course
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="border-xavier-100">
              <CardHeader>
                <CardTitle className="text-lg">Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Instructor</div>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://ui-avatars.com/api/?name=Teacher+One&background=2563EB&color=fff" />
                      <AvatarFallback>TO</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{course.teacherName}</div>
                      <div className="text-xs text-muted-foreground">Professor</div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      Semester
                    </div>
                    <span className="text-sm font-medium">{course.semester}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      Students
                    </div>
                    <span className="text-sm font-medium">{course.students.length}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Notes
                    </div>
                    <span className="text-sm font-medium">{notes.length}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Students Enrolled
                  </div>
                  
                  <div className="max-h-48">
                    <ScrollArea className="h-40">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 py-1">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://ui-avatars.com/api/?name=Student+One&background=6366F1&color=fff" />
                            <AvatarFallback>S1</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">Student One</div>
                            <div className="text-xs text-muted-foreground">student@xavier.edu</div>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-xavier-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Course Schedule</CardTitle>
                <CardDescription>Upcoming classes and events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="bg-muted rounded-md p-3 flex gap-3 animate-pulse-slow">
                    <div className="w-12 h-12 bg-xavier-100 rounded-md flex flex-col items-center justify-center text-xavier-800">
                      <span className="text-xs font-medium">OCT</span>
                      <span className="text-lg font-bold leading-none mt-1">23</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Lecture: Data Structures</h4>
                      <div className="text-xs text-muted-foreground mt-1">10:30 AM - 12:00 PM</div>
                      <div className="text-xs text-muted-foreground">Room 305, Science Building</div>
                    </div>
                  </div>
                  
                  <div className="rounded-md p-3 flex gap-3">
                    <div className="w-12 h-12 bg-muted rounded-md flex flex-col items-center justify-center">
                      <span className="text-xs font-medium">OCT</span>
                      <span className="text-lg font-bold leading-none mt-1">25</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Lab Session</h4>
                      <div className="text-xs text-muted-foreground mt-1">2:00 PM - 4:00 PM</div>
                      <div className="text-xs text-muted-foreground">Computer Lab B</div>
                    </div>
                  </div>
                  
                  <div className="rounded-md p-3 flex gap-3">
                    <div className="w-12 h-12 bg-muted rounded-md flex flex-col items-center justify-center">
                      <span className="text-xs font-medium">OCT</span>
                      <span className="text-lg font-bold leading-none mt-1">30</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Quiz 2</h4>
                      <div className="text-xs text-muted-foreground mt-1">10:30 AM - 11:30 AM</div>
                      <div className="text-xs text-muted-foreground">Room 305, Science Building</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CourseDetail;
