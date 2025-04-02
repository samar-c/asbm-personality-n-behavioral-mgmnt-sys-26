
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from '@/components/Navigation';

// Import faculty data or use mock data if needed
const facultyMembers = [
  {
    id: '1',
    name: 'Dr. Sasmita Mohanta',
    department: 'Marketing',
    designation: 'Associate Professor',
    qualification: 'Ph.D. in Marketing',
    email: 'sasmita@asbm.ac.in',
    subject: 'Marketing Management',
    avatar: 'https://xsgames.co/randomusers/avatar.php?g=female',
    bio: 'Dr. Sasmita Mohanta is a dedicated educator with over 10 years of experience in teaching marketing concepts.',
    experience: '10+ years', // Added this field
    phone: '+91 9876543210', // Added this field
  },
  {
    id: '2',
    name: 'Prof. Rajesh Kumar',
    department: 'Finance',
    designation: 'Professor',
    qualification: 'Ph.D. in Finance',
    email: 'rajesh@asbm.ac.in',
    subject: 'Financial Management',
    avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
    bio: 'Prof. Rajesh Kumar specializes in corporate finance and investment analysis with industry experience.',
    experience: '15+ years', // Added this field
    phone: '+91 9876543211', // Added this field
  },
  // Add more faculty members as needed
];

const Faculty = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<typeof facultyMembers[0] | null>(null);

  // Filter faculty based on search query and selected department
  const filteredFaculty = facultyMembers.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faculty.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment ? faculty.department === selectedDepartment : true;
    return matchesSearch && matchesDepartment;
  });

  // Get unique departments for filtering
  const departments = Array.from(new Set(facultyMembers.map(f => f.department)));

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Faculty</h1>
          <p className="text-muted-foreground">
            Meet our distinguished faculty members who are experts in their respective fields
          </p>
        </motion.div>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search faculty by name or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant={selectedDepartment === null ? "default" : "outline"}
              onClick={() => setSelectedDepartment(null)}
            >
              All
            </Button>
            {departments.map(dept => (
              <Button
                key={dept}
                variant={selectedDepartment === dept ? "default" : "outline"}
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept}
              </Button>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredFaculty.length > 0 ? (
            filteredFaculty.map((faculty) => (
              <motion.div key={faculty.id} variants={itemVariants}>
                <Sheet>
                  <SheetTrigger asChild>
                    <Card className="cursor-pointer transition-all hover:shadow-md hover:scale-[1.01]">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={faculty.avatar} />
                            <AvatarFallback>{faculty.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <h3 className="font-semibold">{faculty.name}</h3>
                            <p className="text-sm text-muted-foreground">{faculty.designation}</p>
                            <p className="text-sm">{faculty.department}</p>
                            <p className="text-sm text-primary mt-1">{faculty.experience}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </SheetTrigger>
                  
                  <SheetContent className="sm:max-w-md">
                    <SheetHeader>
                      <SheetTitle>{faculty.name}</SheetTitle>
                      <SheetDescription>
                        {faculty.designation} | {faculty.department}
                      </SheetDescription>
                    </SheetHeader>
                    
                    <div className="mt-6">
                      <Tabs defaultValue="profile">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="profile">Profile</TabsTrigger>
                          <TabsTrigger value="contact">Contact</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="profile" className="mt-4 space-y-4">
                          <div className="flex justify-center mb-4">
                            <Avatar className="h-24 w-24">
                              <AvatarImage src={faculty.avatar} />
                              <AvatarFallback>{faculty.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">Qualification</h4>
                            <p className="text-sm text-muted-foreground">{faculty.qualification}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">Subject Expertise</h4>
                            <p className="text-sm text-muted-foreground">{faculty.subject}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">Experience</h4>
                            <p className="text-sm text-muted-foreground">{faculty.experience}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">Biography</h4>
                            <p className="text-sm text-muted-foreground">{faculty.bio}</p>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="contact" className="mt-4 space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Email</h4>
                            <p className="text-sm text-muted-foreground">{faculty.email}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">Phone</h4>
                            <p className="text-sm text-muted-foreground">{faculty.phone}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">Department</h4>
                            <p className="text-sm text-muted-foreground">{faculty.department}</p>
                          </div>
                          
                          <Button className="w-full mt-4">
                            Schedule Meeting
                          </Button>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </SheetContent>
                </Sheet>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No faculty members found matching your search.</p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Faculty;
