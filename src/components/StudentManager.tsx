import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { mockStudents } from '@/utils/mockData';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const StudentManager: React.FC = () => {
  const [students, setStudents] = useState(mockStudents);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNumber: '',
    course: '',
    semester: 1,
    attendance: 80,
    behaviorScore: 75,
    academicScore: 85,
    avatar: '',
    behavioralIncidents: [],
  });
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedStudent, setEditedStudent] = useState({
      id: '',
      name: '',
      rollNumber: '',
      course: '',
      semester: 1,
      attendance: 80,
      behaviorScore: 75,
      academicScore: 85,
      avatar: '',
      behavioralIncidents: [],
  });
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const navigate = useNavigate();
  const { userRole } = useAuth();

  const courses = Array.from(new Set(students.map(student => student.course)));

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse ? student.course === selectedCourse : true;
    return matchesSearch && matchesCourse;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (nameA > nameB) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleAddStudent = () => {
    const newId = Math.random().toString(36).substring(2, 15);
    const studentToAdd = { ...newStudent, id: newId };
    setStudents([...students, studentToAdd]);
    setNewStudent({
      name: '',
      rollNumber: '',
      course: '',
      semester: 1,
      attendance: 80,
      behaviorScore: 75,
      academicScore: 85,
      avatar: '',
      behavioralIncidents: [],
    });
    setIsAddStudentOpen(false);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedStudent({ ...editedStudent, [e.target.name]: e.target.value });
  };

  const handleOpenEditModal = (studentId: string) => {
    const studentToEdit = students.find(student => student.id === studentId);
    if (studentToEdit) {
      setEditedStudent({ ...studentToEdit });
      setSelectedStudentId(studentId);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEditedStudent = () => {
    const updatedStudents = students.map(student => {
      if (student.id === editedStudent.id) {
        return { ...editedStudent };
      }
      return student;
    });
    setStudents(updatedStudents);
    setIsEditModalOpen(false);
    setSelectedStudentId(null);
  };

  const handleDeleteStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDeleteStudent = () => {
    const updatedStudents = students.filter(student => student.id !== selectedStudentId);
    setStudents(updatedStudents);
    setIsDeleteConfirmationOpen(false);
    setSelectedStudentId(null);
  };

  const cancelDeleteStudent = () => {
    setIsDeleteConfirmationOpen(false);
    setSelectedStudentId(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Student Management</h1>
          <p className="text-muted-foreground">
            Manage student records, view performance, and track behavior
          </p>
        </motion.div>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search students by name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant={selectedCourse === null ? "default" : "outline"}
              onClick={() => setSelectedCourse(null)}
            >
              All Courses
            </Button>
            {courses.map(course => (
              <Button
                key={course}
                variant={selectedCourse === course ? "default" : "outline"}
                onClick={() => setSelectedCourse(course)}
              >
                {course}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Student List</h2>
          <div className="flex gap-2">
            <Button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
              Sort by Name ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default">Add Student</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the new student.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input type="text" id="name" name="name" value={newStudent.name} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="rollNumber" className="text-right">
                      Roll Number
                    </Label>
                    <Input type="text" id="rollNumber" name="rollNumber" value={newStudent.rollNumber} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="course" className="text-right">
                      Course
                    </Label>
                    <Input type="text" id="course" name="course" value={newStudent.course} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="semester" className="text-right">
                      Semester
                    </Label>
                    <Input type="number" id="semester" name="semester" value={newStudent.semester} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="attendance" className="text-right">
                      Attendance
                    </Label>
                    <Input type="number" id="attendance" name="attendance" value={newStudent.attendance} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="behaviorScore" className="text-right">
                      Behavior Score
                    </Label>
                    <Input type="number" id="behaviorScore" name="behaviorScore" value={newStudent.behaviorScore} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="academicScore" className="text-right">
                      Academic Score
                    </Label>
                    <Input type="number" id="academicScore" name="academicScore" value={newStudent.academicScore} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="avatar" className="text-right">
                      Avatar URL
                    </Label>
                    <Input type="text" id="avatar" name="avatar" value={newStudent.avatar} onChange={handleInputChange} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="secondary" onClick={() => setIsAddStudentOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" onClick={handleAddStudent}>Add Student</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sortedStudents.length > 0 ? (
            sortedStudents.map(student => (
              <motion.div key={student.id} variants={itemVariants}>
                <Card className="transition-all hover:shadow-md hover:scale-[1.01]">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                        <p className="text-sm">{student.course}, Sem {student.semester}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Attendance</span>
                        <span className="text-sm font-medium">{student.attendance}%</span>
                      </div>
                      <Progress value={student.attendance} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Behavior Score</span>
                        <span className="text-sm font-medium">{student.behaviorScore}/100</span>
                      </div>
                      <Progress value={student.behaviorScore} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Academic Score</span>
                        <span className="text-sm font-medium">{student.academicScore}/100</span>
                      </div>
                      <Progress value={student.academicScore} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-6">
                    <Button variant="secondary" size="sm" onClick={() => navigate(`/student/${student.id}`)}>
                      View Details
                    </Button>
                    {userRole === 'admin' && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleOpenEditModal(student.id)}>
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteStudent(student.id)}>
                          Delete
                        </Button>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No students found matching your search.</p>
            </div>
          )}
        </motion.div>
      </main>
      
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              Make changes to the student's details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input type="text" id="name" name="name" value={editedStudent.name} onChange={handleEditInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rollNumber" className="text-right">
                Roll Number
              </Label>
              <Input type="text" id="rollNumber" name="rollNumber" value={editedStudent.rollNumber} onChange={handleEditInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course" className="text-right">
                Course
              </Label>
              <Input type="text" id="course" name="course" value={editedStudent.course} onChange={handleEditInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="semester" className="text-right">
                Semester
              </Label>
              <Input type="number" id="semester" name="semester" value={editedStudent.semester} onChange={handleEditInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="attendance" className="text-right">
                Attendance
              </Label>
              <Input type="number" id="attendance" name="attendance" value={editedStudent.attendance} onChange={handleEditInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="behaviorScore" className="text-right">
                Behavior Score
              </Label>
              <Input type="number" id="behaviorScore" name="behaviorScore" value={editedStudent.behaviorScore} onChange={handleEditInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="academicScore" className="text-right">
                Academic Score
              </Label>
              <Input type="number" id="academicScore" name="academicScore" value={editedStudent.academicScore} onChange={handleEditInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="avatar" className="text-right">
                Avatar URL
              </Label>
              <Input type="text" id="avatar" name="avatar" value={editedStudent.avatar} onChange={handleEditInputChange} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSaveEditedStudent}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteConfirmationOpen} onOpenChange={setIsDeleteConfirmationOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this student? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={cancelDeleteStudent}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive" onClick={confirmDeleteStudent}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentManager;
