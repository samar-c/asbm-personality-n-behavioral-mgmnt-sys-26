
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, GraduationCap, Award, BookOpen } from 'lucide-react';

// Mock behavioral data for demonstration
const attendanceData = [
  { month: 'Jan', attendance: 92 },
  { month: 'Feb', attendance: 88 },
  { month: 'Mar', attendance: 95 },
  { month: 'Apr', attendance: 90 },
  { month: 'May', attendance: 87 },
  { month: 'Jun', attendance: 93 },
];

const participationData = [
  { month: 'Jan', participation: 75 },
  { month: 'Feb', participation: 80 },
  { month: 'Mar', participation: 85 },
  { month: 'Apr', participation: 70 },
  { month: 'May', participation: 90 },
  { month: 'Jun', participation: 88 },
];

const behavioralIncidentsData = [
  { month: 'Jan', minor: 5, major: 1 },
  { month: 'Feb', minor: 3, major: 0 },
  { month: 'Mar', minor: 4, major: 2 },
  { month: 'Apr', minor: 2, major: 0 },
  { month: 'May', minor: 1, major: 0 },
  { month: 'Jun', minor: 0, major: 0 },
];

const performanceData = [
  { name: 'On Time Assignments', value: 82 },
  { name: 'Participation', value: 78 },
  { name: 'Behavior', value: 90 },
  { name: 'Academic', value: 85 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentIncidents = [
  { 
    id: 1, 
    date: '2023-06-12', 
    type: 'Minor', 
    description: 'Late to class', 
    action: 'Verbal warning',
    teacher: 'Dr. Ramesh Kumar'
  },
  { 
    id: 2, 
    date: '2023-05-28', 
    type: 'Minor', 
    description: 'Missing homework', 
    action: 'Parent notification',
    teacher: 'Prof. Sanjay Patel' 
  },
  { 
    id: 3, 
    date: '2023-05-15', 
    type: 'Major', 
    description: 'Disruptive behavior in class', 
    action: 'Counselor referral',
    teacher: 'Dr. Priya Sharma' 
  },
  { 
    id: 4, 
    date: '2023-04-22', 
    type: 'Minor', 
    description: 'Using phone during lesson', 
    action: 'Phone confiscated',
    teacher: 'Prof. Ajay Singh' 
  },
];

const Reports = () => {
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('semester');

  // Overall score calculation (average of all metrics)
  const overallScore = Math.round(
    (performanceData.reduce((acc, curr) => acc + curr.value, 0)) / performanceData.length
  );

  // Improvement indicator (mock data - would be calculated from historical data)
  const improvementPercent = 8.2;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Behavioral Reports</h1>
              <p className="text-muted-foreground">Track student behavior and performance metrics</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-4">
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  <SelectItem value="rahul">Rahul Sharma</SelectItem>
                  <SelectItem value="priya">Priya Patel</SelectItem>
                  <SelectItem value="amit">Amit Kumar</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Current Month</SelectItem>
                  <SelectItem value="semester">Current Semester</SelectItem>
                  <SelectItem value="year">Academic Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
                    <div className="flex items-baseline">
                      <h3 className="text-2xl font-bold">{overallScore}%</h3>
                      <span className="ml-2 text-sm font-medium text-green-600 flex items-center">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        {improvementPercent}%
                      </span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <Progress value={overallScore} className="mt-4" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Attendance</p>
                    <div className="flex items-baseline">
                      <h3 className="text-2xl font-bold">92%</h3>
                      <span className="ml-2 text-sm font-medium text-green-600 flex items-center">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        2.5%
                      </span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <Progress value={92} className="mt-4" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Academic Standing</p>
                    <div className="flex items-baseline">
                      <h3 className="text-2xl font-bold">B+</h3>
                      <span className="ml-2 text-sm font-medium text-red-600 flex items-center">
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                        1.2%
                      </span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <Progress value={85} className="mt-4" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Course Completion</p>
                    <div className="flex items-baseline">
                      <h3 className="text-2xl font-bold">78%</h3>
                      <span className="ml-2 text-sm font-medium text-green-600 flex items-center">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        5.3%
                      </span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <Progress value={78} className="mt-4" />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Overall student performance across key areas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full">
                      <ChartContainer 
                        config={{
                          attendance: { color: "#4285F4" },
                          participation: { color: "#0F9D58" },
                          academic: { color: "#F4B400" },
                          behavior: { color: "#DB4437" },
                        }}
                      >
                        <PieChart>
                          <Pie
                            data={performanceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {performanceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Behavioral Incidents</CardTitle>
                    <CardDescription>List of recent behavioral notes and actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentIncidents.map((incident) => (
                          <TableRow key={incident.id}>
                            <TableCell>{new Date(incident.date).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                incident.type === 'Minor' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {incident.type}
                              </span>
                            </TableCell>
                            <TableCell>{incident.description}</TableCell>
                            <TableCell>{incident.action}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Trend</CardTitle>
                  <CardDescription>Monthly attendance percentage for the current semester</CardDescription>
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
                        <Tooltip content={<ChartTooltipContent />} />
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
                  <CardDescription>Monthly record of behavioral incidents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ChartContainer 
                      config={{
                        minor: { color: "#F4B400" },
                        major: { color: "#DB4437" },
                      }}
                    >
                      <BarChart data={behavioralIncidentsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis allowDecimals={false} />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="minor" name="Minor Incidents" fill="#F4B400" />
                        <Bar dataKey="major" name="Major Incidents" fill="#DB4437" />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academic">
              <Card>
                <CardHeader>
                  <CardTitle>Class Participation</CardTitle>
                  <CardDescription>Monthly class participation scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ChartContainer 
                      config={{
                        participation: { color: "#0F9D58" },
                      }}
                    >
                      <BarChart data={participationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar 
                          dataKey="participation" 
                          name="Participation Score" 
                          fill="#0F9D58" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Reports;
