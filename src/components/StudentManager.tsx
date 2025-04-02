
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { toast } from "@/hooks/use-toast";
import { Search, Plus, Trash2, Edit2, BarChart, UserPlus, CheckCircle2, Book, Medal, Award, Brain, Activity, PieChart } from 'lucide-react';

interface StudentFormData {
  name: string;
  rollNumber: string;
  course: string;
  semester: number;
  email: string;
  attendance: number;
  behaviorScore: number;
  academicScore: number;
  avatar: string;
}

const initialFormData: StudentFormData = {
  name: '',
  rollNumber: '',
  course: '',
  semester: 1,
  email: '',
  attendance: 85,
  behaviorScore: 80,
  academicScore: 75,
  avatar: '',
};

// Sample avatar options
const avatarOptions = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Abby',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Midnight',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
];

// Sample courses
const courseOptions = [
  'Introduction to Computer Science',
  'Business Administration',
  'Financial Accounting',
  'Marketing Fundamentals',
  'Mechanical Engineering',
  'Database Systems',
];

const StudentManager: React.FC = () => {
  const [students, setStudents] = useState([
    {
      id: '1',
      name: 'Aditya Sharma',
      rollNumber: 'ASBM2023001',
      course: 'Introduction to Computer Science',
      semester: 2,
      email: 'aditya.s@asbm.ac.in',
      attendance: 92,
      behaviorScore: 88,
      academicScore: 85,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      behavioralIncidents: [],
    },
    {
      id: '2',
      name: 'Priya Patel',
      rollNumber: 'ASBM2023045',
      course: 'Business Administration',
      semester: 3,
      email: 'priya.p@asbm.ac.in',
      attendance: 78,
      behaviorScore: 92,
      academicScore: 89,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abby',
      behavioralIncidents: [],
    },
    {
      id: '3',
      name: 'Rahul Verma',
      rollNumber: 'ASBM2023078',
      course: 'Financial Accounting',
      semester: 1,
      email: 'rahul.v@asbm.ac.in',
      attendance: 65,
      behaviorScore: 72,
      academicScore: 68,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
      behavioralIncidents: [],
    },
  ]);

  const [formData, setFormData] = useState<StudentFormData>(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [name]: value[0] }));
  };

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    setFormData(prev => ({ ...prev, avatar }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setIsEditing(false);
    setCurrentStudentId(null);
    setSelectedAvatar(avatarOptions[0]);
  };

  const handleEdit = (student: any) => {
    setFormData({
      name: student.name,
      rollNumber: student.rollNumber,
      course: student.course,
      semester: student.semester,
      email: student.email,
      attendance: student.attendance,
      behaviorScore: student.behaviorScore,
      academicScore: student.academicScore,
      avatar: student.avatar,
    });
    setSelectedAvatar(student.avatar);
    setIsEditing(true);
    setCurrentStudentId(student.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
    toast({
      title: "Student Removed",
      description: "Student record has been removed successfully.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && currentStudentId) {
      // Update existing student
      setStudents(students.map(student => 
        student.id === currentStudentId 
          ? { 
              ...student, 
              ...formData, 
              avatar: selectedAvatar 
            } 
          : student
      ));
      
      toast({
        title: "Student Updated",
        description: "Student profile has been updated successfully.",
      });
    } else {
      // Add new student
      const newStudent = {
        id: `${Date.now()}`,
        ...formData,
        avatar: selectedAvatar,
        behavioralIncidents: [],
      };
      
      setStudents([...students, newStudent]);
      
      toast({
        title: "Student Added",
        description: "New student has been added successfully.",
      });
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const getStatusBadge = (attendance: number, behaviorScore: number) => {
    if (attendance < 75 || behaviorScore < 70) {
      return <Badge variant="destructive">At Risk</Badge>;
    }
    return <Badge variant="outline">Good Standing</Badge>;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <CardTitle>Student Management</CardTitle>
            <CardDescription>Add, edit or remove student records</CardDescription>
          </div>
          
          <div className="flex gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => {
                    resetForm();
                    setIsDialogOpen(true);
                  }}
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{isEditing ? 'Edit Student' : 'Add New Student'}</DialogTitle>
                  <DialogDescription>
                    {isEditing 
                      ? 'Update the student information below.' 
                      : 'Enter the details of the new student below.'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {avatarOptions.map(avatar => (
                        <div 
                          key={avatar} 
                          className={`cursor-pointer p-1 rounded-full transition-all ${
                            selectedAvatar === avatar ? 'ring-2 ring-primary scale-105' : ''
                          }`}
                          onClick={() => handleAvatarSelect(avatar)}
                        >
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={avatar} />
                            <AvatarFallback>?</AvatarFallback>
                          </Avatar>
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="rollNumber">Roll Number</Label>
                        <Input
                          id="rollNumber"
                          name="rollNumber"
                          value={formData.rollNumber}
                          onChange={handleInputChange}
                          placeholder="ASBM2023XXX"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="student@asbm.ac.in"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Select 
                          value={formData.course} 
                          onValueChange={(value) => handleSelectChange('course', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Course" />
                          </SelectTrigger>
                          <SelectContent>
                            {courseOptions.map(course => (
                              <SelectItem key={course} value={course}>
                                {course}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="semester">Semester</Label>
                        <Select 
                          value={formData.semester.toString()} 
                          onValueChange={(value) => handleSelectChange('semester', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Semester" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                              <SelectItem key={sem} value={sem.toString()}>
                                Semester {sem}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="attendance">Attendance ({formData.attendance}%)</Label>
                      </div>
                      <Slider
                        id="attendance"
                        min={0}
                        max={100}
                        step={1}
                        value={[formData.attendance]}
                        onValueChange={(value) => handleSliderChange('attendance', value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="behaviorScore">Behavior Score ({formData.behaviorScore}/100)</Label>
                      </div>
                      <Slider
                        id="behaviorScore"
                        min={0}
                        max={100}
                        step={1}
                        value={[formData.behaviorScore]}
                        onValueChange={(value) => handleSliderChange('behaviorScore', value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="academicScore">Academic Score ({formData.academicScore}%)</Label>
                      </div>
                      <Slider
                        id="academicScore"
                        min={0}
                        max={100}
                        step={1}
                        value={[formData.academicScore]}
                        onValueChange={(value) => handleSliderChange('academicScore', value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" type="button" onClick={() => {
                      resetForm();
                      setIsDialogOpen(false);
                    }}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {isEditing ? 'Save Changes' : 'Add Student'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="mt-4 relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students by name, roll number or course..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      
      <Tabs defaultValue="list" className="w-full">
        <div className="px-6">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="list" className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
              List View
            </TabsTrigger>
            <TabsTrigger value="cards" className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
              Card View
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="list" className="p-0 m-0">
          <CardContent>
            {filteredStudents.length > 0 ? (
              <motion.div 
                className="border rounded-md divide-y"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredStudents.map((student) => (
                  <motion.div 
                    key={student.id} 
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 p-4 hover:bg-muted/50 transition-all"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4">
                            <span className="inline-flex items-center gap-1">
                              <span>{student.rollNumber}</span>
                            </span>
                            <span>{student.course}</span>
                          </div>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          {getStatusBadge(student.attendance, student.behaviorScore)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1 flex items-center">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Attendance
                          </div>
                          <Progress 
                            value={student.attendance} 
                            className="h-2" 
                            indicatorClassName={
                              student.attendance < 75 
                                ? "bg-destructive" 
                                : student.attendance > 90 
                                  ? "bg-green-500" 
                                  : undefined
                            }
                          />
                          <span className="text-xs">{student.attendance}%</span>
                        </div>
                        
                        <div>
                          <div className="text-xs text-muted-foreground mb-1 flex items-center">
                            <Brain className="h-3 w-3 mr-1" /> Behavior
                          </div>
                          <Progress 
                            value={student.behaviorScore} 
                            className="h-2"
                            indicatorClassName={
                              student.behaviorScore < 70 
                                ? "bg-destructive" 
                                : student.behaviorScore > 85 
                                  ? "bg-green-500" 
                                  : undefined
                            }
                          />
                          <span className="text-xs">{student.behaviorScore}/100</span>
                        </div>
                        
                        <div>
                          <div className="text-xs text-muted-foreground mb-1 flex items-center">
                            <Book className="h-3 w-3 mr-1" /> Academic
                          </div>
                          <Progress 
                            value={student.academicScore} 
                            className="h-2"
                            indicatorClassName={
                              student.academicScore < 60 
                                ? "bg-destructive" 
                                : student.academicScore > 85 
                                  ? "bg-green-500" 
                                  : undefined
                            }
                          />
                          <span className="text-xs">{student.academicScore}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex sm:flex-col gap-2 mt-2 sm:mt-0 sm:justify-center">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 sm:flex-initial"
                        onClick={() => handleEdit(student)}
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only sm:ml-2">Edit</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 sm:flex-initial text-destructive hover:text-destructive"
                        onClick={() => handleDelete(student.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only sm:ml-2">Delete</span>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto opacity-20" />
                <h3 className="mt-4 text-lg font-medium">No students found</h3>
                <p className="text-muted-foreground">Try adjusting your search or add new students.</p>
              </div>
            )}
          </CardContent>
        </TabsContent>
        
        <TabsContent value="cards" className="p-0 m-0">
          <CardContent>
            {filteredStudents.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredStudents.map((student) => (
                  <motion.div key={student.id} variants={itemVariants}>
                    <Card className="hover:shadow-md transition-shadow h-full">
                      <CardHeader className="flex flex-row items-start gap-4 pb-2">
                        <Avatar className="h-14 w-14 border-2 border-primary/10">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                          <CardTitle className="text-base">{student.name}</CardTitle>
                          <CardDescription className="flex flex-col sm:flex-row gap-1 sm:items-center text-xs">
                            {student.rollNumber}
                            <span className="hidden sm:inline">•</span>
                            {`Semester ${student.semester}`}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="text-sm mb-4">
                          <Badge variant="outline">{student.course}</Badge>
                          <div className="mt-2 text-xs text-muted-foreground">
                            {student.email}
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                              <span className="flex items-center">
                                <CheckCircle2 className="h-3 w-3 mr-1" /> Attendance
                              </span>
                              <span>{student.attendance}%</span>
                            </div>
                            <Progress 
                              value={student.attendance} 
                              className="h-2"
                              indicatorClassName={
                                student.attendance < 75 
                                  ? "bg-destructive" 
                                  : student.attendance > 90 
                                    ? "bg-green-500" 
                                    : undefined
                              }
                            />
                          </div>
                          
                          <div>
                            <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                              <span className="flex items-center">
                                <Brain className="h-3 w-3 mr-1" /> Behavior
                              </span>
                              <span>{student.behaviorScore}/100</span>
                            </div>
                            <Progress 
                              value={student.behaviorScore} 
                              className="h-2"
                              indicatorClassName={
                                student.behaviorScore < 70 
                                  ? "bg-destructive" 
                                  : student.behaviorScore > 85 
                                    ? "bg-green-500" 
                                    : undefined
                              }
                            />
                          </div>
                          
                          <div>
                            <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                              <span className="flex items-center">
                                <Book className="h-3 w-3 mr-1" /> Academic
                              </span>
                              <span>{student.academicScore}%</span>
                            </div>
                            <Progress 
                              value={student.academicScore} 
                              className="h-2"
                              indicatorClassName={
                                student.academicScore < 60 
                                  ? "bg-destructive" 
                                  : student.academicScore > 85 
                                    ? "bg-green-500" 
                                    : undefined
                              }
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2 border-t flex justify-between">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEdit(student)}
                        >
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(student.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto opacity-20" />
                <h3 className="mt-4 text-lg font-medium">No students found</h3>
                <p className="text-muted-foreground">Try adjusting your search or add new students.</p>
              </div>
            )}
          </CardContent>
        </TabsContent>
        
        <TabsContent value="analytics" className="p-0 m-0">
          <CardContent className="py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Academic Performance Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg w-full h-full">
                    <PieChart className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-center text-muted-foreground">
                      Interactive academic performance charts will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Attendance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg w-full h-full">
                    <BarChart className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-center text-muted-foreground">
                      Attendance trend visualization will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Student Progress Summary</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Medal className="h-4 w-4 mr-2" /> 
                    Top Performing Students
                  </h4>
                  <div className="bg-muted/30 rounded-lg p-4">
                    {filteredStudents
                      .sort((a, b) => b.academicScore - a.academicScore)
                      .slice(0, 3)
                      .map((student, index) => (
                        <div 
                          key={student.id} 
                          className={`flex items-center justify-between py-2 ${
                            index !== 2 ? 'border-b' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
                              {index + 1}
                            </div>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{student.name}</div>
                              <div className="text-xs text-muted-foreground">{student.course}</div>
                            </div>
                          </div>
                          <div className="text-sm font-medium">{student.academicScore}%</div>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" /> 
                    Students Needing Attention
                  </h4>
                  <div className="bg-muted/30 rounded-lg p-4">
                    {filteredStudents
                      .filter(student => student.attendance < 75 || student.behaviorScore < 70)
                      .slice(0, 3)
                      .map((student, index) => (
                        <div 
                          key={student.id} 
                          className={`flex items-center justify-between py-2 ${
                            index !== 2 && index !== filteredStudents.filter(s => s.attendance < 75 || s.behaviorScore < 70).slice(0, 3).length - 1 
                              ? 'border-b' 
                              : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{student.name}</div>
                              <div className="text-xs text-muted-foreground">{student.rollNumber}</div>
                            </div>
                          </div>
                          <div>
                            {student.attendance < 75 && (
                              <div className="text-xs text-destructive flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" /> 
                                Low Attendance ({student.attendance}%)
                              </div>
                            )}
                            {student.behaviorScore < 70 && (
                              <div className="text-xs text-destructive flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" /> 
                                Behavior Issues ({student.behaviorScore}/100)
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                    {filteredStudents.filter(student => student.attendance < 75 || student.behaviorScore < 70).length === 0 && (
                      <div className="text-center py-4 text-muted-foreground text-sm">
                        <CheckCircle2 className="h-10 w-10 mx-auto mb-2 opacity-20" />
                        All students are in good standing
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default StudentManager;
