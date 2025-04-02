
import React from 'react';
import Navigation from '@/components/Navigation';
import CourseCard from '@/components/CourseCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, CheckCircle2 } from 'lucide-react';

// Mock data for courses
const courses = [
  {
    id: '1',
    title: 'Introduction to Computer Science',
    instructor: 'Dr. Ramesh Kumar',
    subject: 'Computer Science',
    color: '#4285F4', // Google blue
    pendingAssignments: 2,
  },
  {
    id: '2',
    title: 'Business Administration',
    instructor: 'Prof. Sanjay Patel',
    subject: 'Management',
    color: '#0F9D58', // Google green
    pendingAssignments: 0,
  },
  {
    id: '3',
    title: 'Financial Accounting',
    instructor: 'Dr. Priya Sharma',
    subject: 'Finance',
    color: '#DB4437', // Google red
    pendingAssignments: 1,
  },
  {
    id: '4',
    title: 'Marketing Fundamentals',
    instructor: 'Prof. Ajay Singh',
    subject: 'Marketing',
    color: '#F4B400', // Google yellow
    pendingAssignments: 0,
  },
  {
    id: '5',
    title: 'Data Structures & Algorithms',
    instructor: 'Dr. Neha Gupta',
    subject: 'Computer Science',
    color: '#4285F4', // Google blue
    pendingAssignments: 3,
  },
  {
    id: '6',
    title: 'Human Resource Management',
    instructor: 'Prof. Anita Desai',
    subject: 'Management',
    color: '#0F9D58', // Google green
    pendingAssignments: 0,
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-6 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Hello, Student</h1>
              <p className="text-muted-foreground">Welcome to your ASBM University classroom</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-2">
              <Button className="hidden sm:flex">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                View Calendar
              </Button>
            </div>
          </div>

          <Tabs defaultValue="enrolled" className="mb-8">
            <TabsList>
              <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
              <TabsTrigger value="todo">To Do</TabsTrigger>
            </TabsList>
            <TabsContent value="enrolled">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {courses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="todo">
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Upcoming Assignments</h3>
                </div>
                <div className="divide-y">
                  {courses
                    .filter((course) => course.pendingAssignments > 0)
                    .map((course) => (
                      <div key={course.id} className="p-4 hover:bg-gray-50 assignment-item">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{course.title}</h4>
                            <p className="text-sm text-muted-foreground">Assignment due tomorrow</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark Done
                          </Button>
                        </div>
                      </div>
                    ))}
                  {courses.filter((course) => course.pendingAssignments > 0).length === 0 && (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">No pending assignments</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
