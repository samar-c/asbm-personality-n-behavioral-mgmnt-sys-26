
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ChartContainer } from '@/components/ui/chart';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/context/AuthContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { mockStudents } from '@/utils/mockData';

// Get a mock student for the profile page
const profileStudent = mockStudents[0];

// Generate mock attendance data
const attendanceData = [
  { month: 'Aug', attendance: 88 },
  { month: 'Sep', attendance: 92 },
  { month: 'Oct', attendance: 95 },
  { month: 'Nov', attendance: 90 },
  { month: 'Dec', attendance: 87 },
  { month: 'Jan', attendance: 93 },
];

// Generate personality data for radar chart
const personalityData = [
  { subject: 'Openness', A: profileStudent.personalityTraits.openness, fullMark: 100 },
  { subject: 'Conscientiousness', A: profileStudent.personalityTraits.conscientiousness, fullMark: 100 },
  { subject: 'Extraversion', A: profileStudent.personalityTraits.extraversion, fullMark: 100 },
  { subject: 'Agreeableness', A: profileStudent.personalityTraits.agreeableness, fullMark: 100 },
  { subject: 'Neuroticism', A: profileStudent.personalityTraits.neuroticism, fullMark: 100 },
];

// Generate academic progress data
const academicProgressData = [
  { semester: 'Sem 1', grade: 85 },
  { semester: 'Sem 2', grade: 82 },
  { semester: 'Sem 3', grade: 88 },
  { semester: 'Sem 4', grade: 90 },
  { semester: 'Sem 5', grade: 87 },
  { semester: 'Current', grade: 92 },
];

const UserProfile: React.FC = () => {
  const { userName, userAvatar, userRole } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation userRole={userRole || 'student'} />
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row gap-8 items-start">
            <Card className="w-full md:w-1/3">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={userAvatar || profileStudent.avatar} />
                    <AvatarFallback>{userName?.substring(0, 2) || "ST"}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{userName || profileStudent.name}</h2>
                  <p className="text-sm text-muted-foreground mb-2">
                    {userRole === 'admin' ? 'Administrator' : 
                     userRole === 'teacher' ? 'Faculty Member' : 
                     `Student • ${profileStudent.course}`}
                  </p>
                  
                  {userRole === 'student' && (
                    <div className="text-sm mb-4">
                      <p>Roll Number: {profileStudent.rollNumber}</p>
                      <p>Semester: {profileStudent.semester}</p>
                    </div>
                  )}
                  
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Cancel Editing" : "Edit Profile"}
                  </Button>
                </div>
                
                {isEditing && (
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue={userName || profileStudent.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue={profileStudent.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="+91 9876543210" />
                    </div>
                    <Button className="w-full">Save Changes</Button>
                  </div>
                )}
                
                {!isEditing && userRole === 'student' && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Overall Performance</p>
                      <Progress value={profileStudent.academicScore} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Score: {profileStudent.academicScore}/100</span>
                        <span>{profileStudent.academicScore >= 80 ? 'Excellent' : 
                               profileStudent.academicScore >= 70 ? 'Good' : 
                               profileStudent.academicScore >= 60 ? 'Average' : 'Needs Improvement'}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Attendance</p>
                      <Progress value={profileStudent.attendance} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{profileStudent.attendance}%</span>
                        <span>{profileStudent.attendance >= 90 ? 'Excellent' : 
                               profileStudent.attendance >= 80 ? 'Good' : 
                               profileStudent.attendance >= 75 ? 'Average' : 'Poor'}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Behavior Score</p>
                      <Progress value={profileStudent.behaviorScore} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{profileStudent.behaviorScore}/100</span>
                        <span>{profileStudent.behaviorScore >= 90 ? 'Excellent' : 
                               profileStudent.behaviorScore >= 80 ? 'Good' : 
                               profileStudent.behaviorScore >= 70 ? 'Average' : 'Needs Improvement'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {userRole === 'student' && (
              <Card className="w-full md:w-2/3">
                <CardHeader>
                  <CardTitle>Personality Analysis</CardTitle>
                  <CardDescription>Based on behavioral patterns and assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={90} width={730} height={250} data={personalityData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Personality Traits" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {userRole === 'student' && (
            <Tabs defaultValue="overview" className="mb-6">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="behavior">Behavior</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Strengths</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {profileStudent.strengths.map((strength, index) => (
                          <li key={index} className="text-sm">{strength}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Areas for Improvement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {profileStudent.areasOfImprovement.map((area, index) => (
                          <li key={index} className="text-sm">{area}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Counselor Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        {profileStudent.counselorNotes || "No counselor notes available at this time."}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="attendance">
                <Card>
                  <CardHeader>
                    <CardTitle>Attendance Trend</CardTitle>
                    <CardDescription>Monthly attendance percentage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full">
                      <ChartContainer 
                        config={{
                          attendance: { color: "#4285F4" },
                        }}
                      >
                        <LineChart data={attendanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[60, 100]} />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="attendance" 
                            stroke="#4285F4" 
                            strokeWidth={2} 
                            name="Attendance %" 
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="behavior">
                <Card>
                  <CardHeader>
                    <CardTitle>Behavioral Incidents</CardTitle>
                    <CardDescription>Record of behavioral incidents and actions taken</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {profileStudent.behavioralIncidents.length > 0 ? (
                      <div className="space-y-4">
                        {profileStudent.behavioralIncidents.map((incident, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    incident.type === 'Minor' 
                                      ? 'bg-yellow-100 text-yellow-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {incident.type}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    {new Date(incident.date).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="font-medium">{incident.description}</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Action: {incident.action}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Reported by: {incident.teacher}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No behavioral incidents reported</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="academic">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Progress</CardTitle>
                    <CardDescription>Semester-wise academic performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full">
                      <ChartContainer 
                        config={{
                          grade: { color: "#0F9D58" },
                        }}
                      >
                        <LineChart data={academicProgressData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="semester" />
                          <YAxis domain={[50, 100]} />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="grade" 
                            stroke="#0F9D58" 
                            strokeWidth={2} 
                            name="Grade" 
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
