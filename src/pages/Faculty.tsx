import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Phone, Linkedin, Twitter, ExternalLink, Search, BookOpen, Award, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define Faculty interface to ensure all required properties exist
interface Faculty {
  id: string;
  name: string;
  department: string;
  subject: string;
  designation: string;
  qualification: string;
  email: string;
  avatar: string;
  bio: string;
  experience: string;  // Add this property
  phone: string;      // Add this property
}

// Animation variants
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

// Mock faculty data
const facultyData: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Ramesh Kumar',
    department: 'Computer Science',
    subject: 'Introduction to Computer Science',
    designation: 'Professor',
    qualification: 'PhD in Computer Science',
    email: 'ramesh.kumar@asbm.ac.in',
    phone: '+91 94567 12345',
    experience: '15+ years of teaching and research experience',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Dr. Kumar is a distinguished professor with expertise in Artificial Intelligence, Machine Learning, and Data Science. He has published numerous papers in international journals and conferences. His research focuses on developing innovative solutions to real-world problems using AI techniques.',
  },
  {
    id: '2',
    name: 'Dr. Priya Sharma',
    department: 'Management',
    subject: 'Business Administration',
    designation: 'Associate Professor',
    qualification: 'PhD in Management',
    email: 'priya.sharma@asbm.ac.in',
    phone: '+91 94567 23456',
    experience: '10+ years of industry and academic experience',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    bio: 'Dr. Sharma has extensive experience in business administration and organizational behavior. She has worked with several multinational companies before joining academia. Her research interests include leadership development, organizational dynamics, and business strategy.',
  },
  {
    id: '3',
    name: 'Prof. Arun Singh',
    department: 'Electrical Engineering',
    subject: 'Power Systems',
    designation: 'Assistant Professor',
    qualification: 'MTech in Electrical Engineering',
    email: 'arun.singh@asbm.ac.in',
    phone: '+91 94567 34567',
    experience: '8+ years of teaching experience',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    bio: 'Prof. Singh specializes in power systems and renewable energy technologies. He has contributed significantly to the field through his research on smart grids and sustainable energy solutions. He actively collaborates with industry partners on practical applications of his research.',
  },
  {
    id: '4',
    name: 'Dr. Meera Patel',
    department: 'Economics',
    subject: 'Macroeconomics',
    designation: 'Professor',
    qualification: 'PhD in Economics',
    email: 'meera.patel@asbm.ac.in',
    phone: '+91 94567 45678',
    experience: '12+ years of research and teaching',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    bio: 'Dr. Patel is an accomplished economist with expertise in macroeconomic policy and international trade. Her research has been published in top-tier journals and she has served as a consultant to various governmental and non-governmental organizations.',
  },
  {
    id: '5',
    name: 'Prof. Vikram Reddy',
    department: 'Mathematics',
    subject: 'Applied Mathematics',
    designation: 'Associate Professor',
    qualification: 'PhD in Mathematics',
    email: 'vikram.reddy@asbm.ac.in',
    phone: '+91 94567 56789',
    experience: '9+ years in academia',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    bio: 'Prof. Reddy specializes in applied mathematics with a focus on differential equations and numerical methods. He has authored several textbooks that are widely used in undergraduate courses across the country.',
  },
];

const Faculty = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departments, setDepartments] = useState<string[]>([]);
  const [filterDepartment, setFilterDepartment] = useState<string | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const { toast } = useToast();
  
  // Extract unique departments for filtering
  useEffect(() => {
    const uniqueDepartments = Array.from(new Set(facultyData.map(faculty => faculty.department)));
    setDepartments(uniqueDepartments);
  }, []);
  
  // Filter faculty based on search and department filter
  const filteredFaculty = facultyData.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faculty.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faculty.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = filterDepartment ? faculty.department === filterDepartment : true;
    
    return matchesSearch && matchesDepartment;
  });

  const handleContactClick = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    
    // Send a toast notification
    toast({
      title: `Contact ${faculty.name}`,
      description: `Email sent to ${faculty.email}`,
    });
  };

  const renderFacultyGrid = () => (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filteredFaculty.map(faculty => (
        <motion.div key={faculty.id} variants={itemVariants}>
          <Card className="h-full flex flex-col transition-all hover:shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={faculty.avatar} alt={faculty.name} />
                  <AvatarFallback>{faculty.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{faculty.name}</CardTitle>
                  <CardDescription>{faculty.designation}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2 mb-4">
                <Badge variant="secondary">{faculty.department}</Badge>
                <p className="text-sm">{faculty.qualification}</p>
              </div>
              <div className="flex items-center text-sm mb-1">
                <BookOpen className="h-3.5 w-3.5 mr-1 text-primary" />
                <span>Teaches: {faculty.subject}</span>
              </div>
              <div className="flex items-center text-sm mb-1">
                <Award className="h-3.5 w-3.5 mr-1 text-primary" />
                <span>{faculty.qualification}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-3.5 w-3.5 mr-1 text-primary" />
                <span>{faculty.experience}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => handleContactClick(faculty)}
              >
                <Mail className="h-4 w-4 mr-1" />
                Contact
              </Button>
              <Button variant="default" size="sm" className="flex-1">
                <ExternalLink className="h-4 w-4 mr-1" />
                Profile
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
      
      {filteredFaculty.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <Search className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Faculty Found</h3>
          <p className="text-muted-foreground max-w-sm">
            We couldn't find any faculty matching your search criteria. Try adjusting your filters.
          </p>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 p-4 md:p-6 lg:p-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Faculty Directory</h1>
            <p className="text-muted-foreground">
              Connect with our accomplished faculty members and academic staff
            </p>
          </motion.div>
          
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search faculty by name, department, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant={filterDepartment === null ? "default" : "outline"}
                onClick={() => setFilterDepartment(null)}
              >
                All Departments
              </Button>
              {departments.map(department => (
                <Button
                  key={department}
                  variant={filterDepartment === department ? "default" : "outline"}
                  onClick={() => setFilterDepartment(department)}
                >
                  {department}
                </Button>
              ))}
            </div>
          </div>
          
          <Tabs defaultValue="grid" className="mb-6">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="grid" className="pt-4">
              {renderFacultyGrid()}
            </TabsContent>
            
            <TabsContent value="table" className="pt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Name</th>
                          <th className="text-left p-4">Department</th>
                          <th className="text-left p-4">Subject</th>
                          <th className="text-left p-4">Contact</th>
                          <th className="text-right p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFaculty.map(faculty => (
                          <tr key={faculty.id} className="border-b hover:bg-muted/50">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={faculty.avatar} alt={faculty.name} />
                                  <AvatarFallback>{faculty.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{faculty.name}</p>
                                  <p className="text-xs text-muted-foreground">{faculty.designation}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">{faculty.department}</td>
                            <td className="p-4">{faculty.subject}</td>
                            <td className="p-4">
                              <div>
                                <div className="flex items-center">
                                  <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                  <span className="text-xs">{faculty.email}</span>
                                </div>
                                <div className="flex items-center mt-1">
                                  <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                  <span className="text-xs">{faculty.phone}</span>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  <Mail className="h-4 w-4" />
                                  <span className="sr-only">Email</span>
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <ExternalLink className="h-4 w-4" />
                                  <span className="sr-only">View Profile</span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {filteredFaculty.length === 0 && (
                      <div className="py-12 text-center">
                        <p className="text-muted-foreground">No faculty found matching your search criteria.</p>
                      </div>
                    )}
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

export default Faculty;
