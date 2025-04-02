
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Briefcase, GraduationCap, Mail, Phone, MapPin, Award, BookOpen } from 'lucide-react';
import { mockTeachers } from '@/utils/mockData';

const departmentFilters = [
  'All Departments',
  'Computer Science',
  'Business Administration',
  'Engineering',
  'Mathematics',
  'Economics'
];

// Animation variants for staggered animations
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const Faculty = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  
  // Filter faculty members based on search term and department
  const filteredFaculty = mockTeachers.filter(faculty => {
    const matchesSearch = 
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.subject.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesDepartment = departmentFilter === 'All Departments' || 
                             faculty.department === departmentFilter;
                             
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl font-bold tracking-tight mb-2">Our Distinguished Faculty</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the experienced professors and experts who make ASBM University a center of excellence and innovation.
            </p>
          </motion.div>

          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search faculty by name, department or subject..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 snap-x">
              {departmentFilters.map((department) => (
                <Button 
                  key={department}
                  variant={departmentFilter === department ? "default" : "outline"}
                  size="sm"
                  className="snap-start whitespace-nowrap"
                  onClick={() => setDepartmentFilter(department)}
                >
                  {department}
                </Button>
              ))}
            </div>
          </div>

          {/* Faculty listing */}
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex justify-end mb-6">
              <TabsList>
                <TabsTrigger value="grid" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
                  Grid
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
                  List
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Grid View */}
            <TabsContent value="grid">
              {filteredFaculty.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredFaculty.map((faculty) => (
                    <motion.div key={faculty.id} variants={itemVariants}>
                      <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
                        <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                          <div 
                            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                          <div className="p-6 flex justify-center items-center h-full">
                            <Avatar className="h-32 w-32 border-4 border-white/50 shadow-xl group-hover:scale-105 transition-transform">
                              <AvatarImage src={faculty.avatar} alt={faculty.name} />
                              <AvatarFallback>{faculty.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-center">{faculty.name}</CardTitle>
                          <CardDescription className="text-center flex items-center justify-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            {faculty.subject}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              <span className="text-sm">{faculty.department}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              <span className="text-sm">{faculty.qualification || 'Ph.D in Computer Science'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              <span className="text-sm">{faculty.experience || '15+ years experience'}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t bg-muted/20 pt-4">
                          <Button variant="outline" size="sm" className="w-full">
                            <Mail className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            View Profile
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <Search className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                  <h3 className="mt-4 text-lg font-medium">No faculty members found</h3>
                  <p className="mt-1 text-muted-foreground">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </TabsContent>
            
            {/* List View */}
            <TabsContent value="list">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredFaculty.length > 0 ? (
                      filteredFaculty.map((faculty, index) => (
                        <motion.div 
                          key={faculty.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                        >
                          <Avatar className="h-16 w-16 border-2 border-background flex-shrink-0">
                            <AvatarImage src={faculty.avatar} alt={faculty.name} />
                            <AvatarFallback>{faculty.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-grow min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <div>
                                <h3 className="font-medium truncate">{faculty.name}</h3>
                                <p className="text-sm text-muted-foreground">{faculty.subject}</p>
                              </div>
                              <Badge variant="outline" className="w-fit">{faculty.department}</Badge>
                            </div>
                            
                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Award className="h-3.5 w-3.5" />
                                <span>{faculty.qualification || 'Ph.D'}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Mail className="h-3.5 w-3.5" />
                                <span className="truncate">{faculty.email}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3.5 w-3.5" />
                                <span>{faculty.phone || '+91 98765 43210'}</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button className="sm:self-center mt-2 sm:mt-0" size="sm">View Profile</Button>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Search className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                        <h3 className="mt-4 text-lg font-medium">No faculty members found</h3>
                        <p className="mt-1 text-muted-foreground">Try adjusting your search or filter criteria.</p>
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
