
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import CourseCard from '@/components/CourseCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Calendar, CheckCircle2, AlertTriangle, TrendingUp, Users, FilePieChart } from 'lucide-react';
import { mockCourses, mockStudents } from '@/utils/mockData';
import { useAuth } from '@/context/AuthContext';
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const { userRole, userName } = useAuth();
  const courses = mockCourses.slice(0, 6);
  
  // Helper function to get pending assignments count
  const getPendingAssignmentsCount = () => {
    return courses.reduce((total, course) => total + course.pendingAssignments, 0);
  };
  
  // Calculate average student metrics for teacher/admin dashboards
  const calculateStudentMetrics = () => {
    const avgAttendance = mockStudents.reduce((sum, student) => sum + student.attendance, 0) / mockStudents.length;
    const avgBehaviorScore = mockStudents.reduce((sum, student) => sum + student.behaviorScore, 0) / mockStudents.length;
    const avgAcademicScore = mockStudents.reduce((sum, student) => sum + student.academicScore, 0) / mockStudents.length;
    
    // Count incidents by type
    const incidentsByType = mockStudents.reduce((acc, student) => {
      student.behavioralIncidents.forEach(incident => {
        acc[incident.type] = (acc[incident.type] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
    
    return { avgAttendance, avgBehaviorScore, avgAcademicScore, incidentsByType };
  };
  
  const { avgAttendance, avgBehaviorScore, avgAcademicScore, incidentsByType } = calculateStudentMetrics();
  
  // Find at-risk students (low attendance or behavior scores)
  const atRiskStudents = mockStudents
    .filter(student => student.attendance < 75 || student.behaviorScore < 70)
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-6 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Hello, {userName || (userRole === 'admin' ? 'Administrator' : userRole === 'teacher' ? 'Professor' : 'Student')}
              </h1>
              <p className="text-muted-foreground">
                Welcome to your ASBM University {userRole === 'admin' ? 'administration panel' : userRole === 'teacher' ? 'teaching portal' : 'classroom'}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-2">
              <Button className="hidden sm:flex">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="outline" asChild>
                <Link to="/calendar">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Calendar
                </Link>
              </Button>
            </div>
          </div>

          {/* Dashboard Stats - Different for each role */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {userRole === 'student' && (
              <>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{getPendingAssignmentsCount()}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {getPendingAssignmentsCount() === 0 ? "All caught up!" : `${getPendingAssignmentsCount()} tasks need attention`}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Your Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStudents[0].attendance}%</div>
                    <Progress value={mockStudents[0].attendance} className="h-2 mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {mockStudents[0].attendance >= 80 ? "Excellent attendance" : "Room for improvement"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Behavior Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStudents[0].behaviorScore}</div>
                    <Progress value={mockStudents[0].behaviorScore} className="h-2 mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {mockStudents[0].behaviorScore >= 90 ? "Outstanding" : mockStudents[0].behaviorScore >= 70 ? "Good" : "Needs improvement"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Academic Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStudents[0].academicScore}%</div>
                    <Progress value={mockStudents[0].academicScore} className="h-2 mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {mockStudents[0].academicScore >= 85 ? "Excellent" : mockStudents[0].academicScore >= 70 ? "Good" : "Needs improvement"}
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
            
            {(userRole === 'teacher' || userRole === 'admin') && (
              <>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStudents.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Across all courses
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{Math.round(avgAttendance)}%</div>
                    <Progress value={avgAttendance} className="h-2 mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {avgAttendance >= 80 ? "Good overall attendance" : "Below target"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Behavior Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{Math.round(avgBehaviorScore)}</div>
                    <Progress value={avgBehaviorScore} className="h-2 mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {avgBehaviorScore >= 85 ? "Excellent" : avgBehaviorScore >= 70 ? "Good" : "Concerning"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Academic Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{Math.round(avgAcademicScore)}%</div>
                    <Progress value={avgAcademicScore} className="h-2 mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {avgAcademicScore >= 85 ? "High performance" : avgAcademicScore >= 70 ? "Average" : "Below average"}
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
          
          {/* Main Content Tabs */}
          <Tabs defaultValue="courses" className="space-y-4">
            <TabsList className="mb-4">
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              {userRole === 'student' && <TabsTrigger value="assignments">Assignments</TabsTrigger>}
              {(userRole === 'teacher' || userRole === 'admin') && <TabsTrigger value="at-risk">At-Risk Students</TabsTrigger>}
              {userRole === 'admin' && <TabsTrigger value="incidents">Recent Incidents</TabsTrigger>}
            </TabsList>
            
            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    instructor={course.instructor}
                    subject={course.subject}
                    color={course.color}
                    pendingAssignments={course.pendingAssignments}
                  />
                ))}
              </div>
            </TabsContent>
            
            {/* Assignments Tab (Student only) */}
            {userRole === 'student' && (
              <TabsContent value="assignments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Assignments</CardTitle>
                    <CardDescription>Tasks that need your attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getPendingAssignmentsCount() > 0 ? (
                        courses.flatMap((course) => 
                          Array(course.pendingAssignments).fill(0).map((_, idx) => (
                            <div key={`${course.id}-${idx}`} className="flex items-start space-x-4 p-2 rounded hover:bg-muted">
                              <div 
                                className="w-1 self-stretch rounded-full" 
                                style={{ backgroundColor: course.color }} 
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-medium">Assignment {idx + 1}</h4>
                                    <p className="text-sm text-muted-foreground">{course.title}</p>
                                  </div>
                                  <Button size="sm" variant="outline">View</Button>
                                </div>
                                <div className="flex items-center mt-2 text-sm">
                                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span>Due in {Math.floor(Math.random() * 7) + 1} days</span>
                                </div>
                              </div>
                            </div>
                          ))
                        )
                      ) : (
                        <div className="p-4 text-center">
                          <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                          <h3 className="font-medium mb-1">All caught up!</h3>
                          <p className="text-sm text-muted-foreground">
                            No pending assignments at the moment.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            
            {/* At-Risk Students Tab (Teacher/Admin only) */}
            {(userRole === 'teacher' || userRole === 'admin') && (
              <TabsContent value="at-risk" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Students Requiring Attention</CardTitle>
                    <CardDescription>Students with attendance or behavior issues</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {atRiskStudents.map((student) => (
                        <div key={student.id} className="flex items-start space-x-4 p-3 rounded hover:bg-muted">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{student.name}</h4>
                                <p className="text-sm text-muted-foreground">{student.course}, Semester {student.semester}</p>
                              </div>
                              <Button size="sm" variant="outline">View Profile</Button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div className="flex items-center text-sm">
                                {student.attendance < 75 ? (
                                  <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />
                                ) : (
                                  <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />
                                )}
                                <span>Attendance: {student.attendance}%</span>
                              </div>
                              <div className="flex items-center text-sm">
                                {student.behaviorScore < 70 ? (
                                  <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />
                                ) : (
                                  <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />
                                )}
                                <span>Behavior: {student.behaviorScore}/100</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {atRiskStudents.length === 0 && (
                        <div className="p-4 text-center">
                          <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                          <h3 className="font-medium mb-1">All students on track</h3>
                          <p className="text-sm text-muted-foreground">
                            No students requiring special attention at the moment.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            
            {/* Incidents Tab (Admin only) */}
            {userRole === 'admin' && (
              <TabsContent value="incidents" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Behavioral Incidents</CardTitle>
                    <CardDescription>Reported incidents in the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockStudents.flatMap(student => 
                        student.behavioralIncidents.map((incident, idx) => (
                          <div key={`${student.id}-${idx}`} className="flex items-start space-x-4 p-3 rounded hover:bg-muted">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium">{student.name}</h4>
                                  <p className="text-sm text-muted-foreground">{student.course}, Semester {student.semester}</p>
                                </div>
                                <Button size="sm" variant="outline">View Details</Button>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm font-medium">Incident: {incident.type}</p>
                                <p className="text-sm text-muted-foreground">{incident.description}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ).slice(0, 5)}
                      
                      {mockStudents.flatMap(s => s.behavioralIncidents).length === 0 && (
                        <div className="p-4 text-center">
                          <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                          <h3 className="font-medium mb-1">No recent incidents</h3>
                          <p className="text-sm text-muted-foreground">
                            No behavioral incidents have been reported recently.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
