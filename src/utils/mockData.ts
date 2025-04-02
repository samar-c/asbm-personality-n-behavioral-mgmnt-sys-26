
// Mock data for the application with ASBM University content

// Courses
export const mockCourses = [
  {
    id: '1',
    title: 'Introduction to Management',
    instructor: 'Dr. Kalinga Jagabandhu',
    subject: 'Management',
    color: '#4285F4',
    pendingAssignments: 2,
    description: 'Foundations of management principles and organizational behavior',
  },
  {
    id: '2',
    title: 'Business Administration',
    instructor: 'Prof. Manoranjan Dash',
    subject: 'Management',
    color: '#0F9D58',
    pendingAssignments: 0,
    description: 'Strategic business administration and leadership practices',
  },
  {
    id: '3',
    title: 'Financial Accounting',
    instructor: 'Dr. Prasanta Kumar Mohanty',
    subject: 'Accounting',
    color: '#DB4437',
    pendingAssignments: 1,
    description: 'Principles of financial accounting and reporting',
  },
  {
    id: '4',
    title: 'Marketing Management',
    instructor: 'Prof. Biswajit Das',
    subject: 'Marketing',
    color: '#F4B400',
    pendingAssignments: 1,
    description: 'Modern marketing strategies and consumer behavior analysis',
  },
  {
    id: '5',
    title: 'Business Law',
    instructor: 'Dr. Lopamudra Pattnaik',
    subject: 'Law',
    color: '#673AB7',
    pendingAssignments: 0,
    description: 'Legal frameworks governing business operations',
  },
  {
    id: '6',
    title: 'Business Ethics',
    instructor: 'Prof. Atanu Kumar Rath',
    subject: 'Ethics',
    color: '#FF6D00',
    pendingAssignments: 1,
    description: 'Ethical decision-making in business contexts',
  },
  {
    id: '7',
    title: 'Human Resource Management',
    instructor: 'Dr. Deepti Pathak',
    subject: 'HR Management',
    color: '#2196F3',
    pendingAssignments: 2,
    description: 'Strategic human resource management and organizational development',
  },
  {
    id: '8',
    title: 'Operations Management',
    instructor: 'Prof. Manas Mohanty',
    subject: 'Operations',
    color: '#009688',
    pendingAssignments: 0,
    description: 'Management of production processes and supply chains',
  },
];

// Students
export const mockStudents = [
  {
    id: '1',
    name: 'Rahul Sharma',
    rollNumber: 'BBA2021001',
    course: 'Business Administration',
    semester: 3,
    attendance: 92,
    behaviorScore: 90,
    academicScore: 88,
    avatar: 'https://i.pravatar.cc/150?u=1',
    behavioralIncidents: [],
  },
  {
    id: '2',
    name: 'Priya Patel',
    rollNumber: 'BBA2021002',
    course: 'Business Administration',
    semester: 3,
    attendance: 65,
    behaviorScore: 75,
    academicScore: 82,
    avatar: 'https://i.pravatar.cc/150?u=2',
    behavioralIncidents: [
      {
        type: 'Disruptive Behavior',
        description: 'Talking excessively during lecture despite warnings.',
        date: '2023-09-05',
      },
    ],
  },
  {
    id: '3',
    name: 'Amit Kumar',
    rollNumber: 'BCA2021001',
    course: 'Computer Applications',
    semester: 3,
    attendance: 85,
    behaviorScore: 95,
    academicScore: 92,
    avatar: 'https://i.pravatar.cc/150?u=3',
    behavioralIncidents: [],
  },
  {
    id: '4',
    name: 'Neha Gupta',
    rollNumber: 'BCA2021002',
    course: 'Computer Applications',
    semester: 3,
    attendance: 78,
    behaviorScore: 88,
    academicScore: 86,
    avatar: 'https://i.pravatar.cc/150?u=4',
    behavioralIncidents: [],
  },
  {
    id: '5',
    name: 'Rajesh Singh',
    rollNumber: 'BCom2021001',
    course: 'Commerce',
    semester: 3,
    attendance: 60,
    behaviorScore: 65,
    academicScore: 72,
    avatar: 'https://i.pravatar.cc/150?u=5',
    behavioralIncidents: [
      {
        type: 'Academic Dishonesty',
        description: 'Suspected of cheating during mid-term exam.',
        date: '2023-08-17',
      },
      {
        type: 'Attendance Issue',
        description: 'Consistently arriving late to morning classes.',
        date: '2023-09-10',
      },
    ],
  },
  {
    id: '6',
    name: 'Anjali Desai',
    rollNumber: 'BCom2021002',
    course: 'Commerce',
    semester: 3,
    attendance: 90,
    behaviorScore: 92,
    academicScore: 90,
    avatar: 'https://i.pravatar.cc/150?u=6',
    behavioralIncidents: [],
  },
  {
    id: '7',
    name: 'Vikram Mehta',
    rollNumber: 'BHM2021001',
    course: 'Hotel Management',
    semester: 3,
    attendance: 72,
    behaviorScore: 85,
    academicScore: 78,
    avatar: 'https://i.pravatar.cc/150?u=7',
    behavioralIncidents: [],
  },
  {
    id: '8',
    name: 'Pooja Verma',
    rollNumber: 'BHM2021002',
    course: 'Hotel Management',
    semester: 3,
    attendance: 95,
    behaviorScore: 90,
    academicScore: 91,
    avatar: 'https://i.pravatar.cc/150?u=8',
    behavioralIncidents: [],
  },
];

// ASBM Faculty (based on actual faculty from asbm.ac.in)
export const mockTeachers = [
  {
    id: '1',
    name: 'Dr. Biswajit Das',
    department: 'Marketing',
    subject: 'Marketing Management',
    designation: 'Professor',
    qualification: 'Ph.D., MBA',
    email: 'biswajit.das@asbm.ac.in',
    avatar: 'https://i.pravatar.cc/150?u=t1',
    bio: 'Experienced marketing professor with research focus on consumer behavior.'
  },
  {
    id: '2',
    name: 'Prof. Manoranjan Dash',
    department: 'Finance',
    subject: 'Financial Management',
    designation: 'Associate Professor',
    qualification: 'MBA, Ph.D.',
    email: 'manoranjan.dash@asbm.ac.in',
    avatar: 'https://i.pravatar.cc/150?u=t2',
    bio: 'Expert in financial management with extensive industry and academic experience.'
  },
  {
    id: '3',
    name: 'Dr. Kalinga Jagabandhu',
    department: 'General Management',
    subject: 'Strategic Management',
    designation: 'Professor',
    qualification: 'Ph.D., MBA',
    email: 'kalinga.jagabandhu@asbm.ac.in',
    avatar: 'https://i.pravatar.cc/150?u=t3',
    bio: 'Renowned professor with expertise in strategic management and organizational behavior.'
  },
  {
    id: '4',
    name: 'Prof. Atanu Kumar Rath',
    department: 'Ethics',
    subject: 'Business Ethics',
    designation: 'Assistant Professor',
    qualification: 'MBA, M.Phil',
    email: 'atanu.rath@asbm.ac.in',
    avatar: 'https://i.pravatar.cc/150?u=t4',
    bio: 'Focuses on ethics in business practices and corporate social responsibility.'
  },
  {
    id: '5',
    name: 'Dr. Lopamudra Pattnaik',
    department: 'Law',
    subject: 'Business Law',
    designation: 'Associate Professor',
    qualification: 'LL.B., Ph.D.',
    email: 'lopamudra.pattnaik@asbm.ac.in',
    avatar: 'https://i.pravatar.cc/150?u=t5',
    bio: 'Specializes in corporate law with extensive professional experience.'
  },
  {
    id: '6',
    name: 'Dr. Prasanta Kumar Mohanty',
    department: 'Accounting',
    subject: 'Financial Accounting',
    designation: 'Professor',
    qualification: 'Ph.D., M.Com',
    email: 'prasanta.mohanty@asbm.ac.in',
    avatar: 'https://i.pravatar.cc/150?u=t6',
    bio: 'Accomplished researcher in financial accounting and corporate finance.'
  },
  {
    id: '7',
    name: 'Dr. Deepti Pathak',
    department: 'Human Resources',
    subject: 'Human Resource Management',
    designation: 'Associate Professor',
    qualification: 'MBA, Ph.D.',
    email: 'deepti.pathak@asbm.ac.in',
    avatar: 'https://i.pravatar.cc/150?u=t7',
    bio: 'Expert in talent management and organizational development strategies.'
  },
  {
    id: '8',
    name: 'Prof. Manas Mohanty',
    department: 'Operations',
    subject: 'Operations Management',
    designation: 'Assistant Professor',
    qualification: 'MBA, PGDM',
    email: 'manas.mohanty@asbm.ac.in',
    avatar: 'https://i.pravatar.cc/150?u=t8',
    bio: 'Specializes in supply chain management and operations research.'
  },
];

// ASBM University Information
export const universityInfo = {
  name: "ASBM University",
  shortName: "ASBMU",
  establishedYear: 1995,
  address: {
    street: "Road No. 2, Prasnagarbhanga",
    city: "Bhubaneswar",
    state: "Odisha",
    zip: "751003",
    country: "India"
  },
  contact: {
    phone: "+91 674 2553056 / 2557510",
    email: "info@asbm.ac.in",
    website: "https://www.asbm.ac.in"
  },
  socialMedia: {
    facebook: "https://www.facebook.com/ASBMUniversity",
    twitter: "https://twitter.com/asbmuniversity",
    linkedin: "https://www.linkedin.com/school/asbm-university/",
    instagram: "https://www.instagram.com/asbmuniversity/"
  },
  leadership: {
    chancellor: "Dr. Biswabhusan Harichandan",
    viceChancellor: "Prof. Dr. Kalyan Kumar Mohanty",
    registrar: "Dr. Prakash Kumar Pradhan"
  },
  aboutText: "ASBM University is one of the leading management institutions in Eastern India. Established as Asian School of Business Management in 1995 by a body of concerned visionaries and business leaders, ASBM received university status in 2019. The University is known for its academic excellence, innovative pedagogy, and industry interface."
};

// ASBM Programs
export const programs = [
  {
    id: "bba",
    name: "Bachelor of Business Administration",
    shortName: "BBA",
    duration: "3 Years",
    eligibility: "10+2 or equivalent with minimum 50% marks",
    description: "Undergraduate program focusing on business fundamentals and management principles."
  },
  {
    id: "mba",
    name: "Master of Business Administration",
    shortName: "MBA",
    duration: "2 Years",
    eligibility: "Bachelor's degree in any discipline with minimum 50% marks",
    description: "Flagship program with specializations in Marketing, Finance, HR, Operations and Systems."
  },
  {
    id: "phd",
    name: "Doctor of Philosophy",
    shortName: "Ph.D.",
    duration: "3-5 Years",
    eligibility: "Master's degree with minimum 55% marks",
    description: "Research program with specializations in Management and allied disciplines."
  },
  {
    id: "execmba",
    name: "Executive MBA",
    shortName: "EMBA",
    duration: "18 Months",
    eligibility: "Bachelor's degree with minimum 2 years of work experience",
    description: "Designed for working professionals seeking to enhance managerial skills."
  }
];

// Campus Facilities
export const facilities = [
  {
    id: "library",
    name: "Central Library",
    description: "State-of-the-art library with extensive collection of books, journals, and digital resources.",
    image: "https://example.com/library.jpg"
  },
  {
    id: "hostel",
    name: "Student Hostels",
    description: "Separate hostels for boys and girls with modern amenities and security.",
    image: "https://example.com/hostel.jpg"
  },
  {
    id: "sports",
    name: "Sports Complex",
    description: "Comprehensive sports facilities including cricket ground, basketball court, and fitness center.",
    image: "https://example.com/sports.jpg"
  },
  {
    id: "computerlab",
    name: "Computer Labs",
    description: "Well-equipped computer labs with high-speed internet and latest software.",
    image: "https://example.com/computerlab.jpg"
  },
  {
    id: "auditorium",
    name: "Auditorium",
    description: "Modern auditorium for academic and cultural events with capacity of 500.",
    image: "https://example.com/auditorium.jpg"
  }
];

// Events & News
export const events = [
  {
    id: "1",
    title: "Annual Management Conclave 2023",
    date: "2023-11-15",
    description: "Industry leaders share insights on emerging business trends.",
    image: "https://example.com/conclave.jpg"
  },
  {
    id: "2",
    title: "International Conference on Business Innovation",
    date: "2023-12-05",
    description: "Research presentations and panel discussions on business innovation.",
    image: "https://example.com/conference.jpg"
  },
  {
    id: "3",
    title: "Corporate Social Responsibility Week",
    date: "2024-01-18",
    description: "Activities and workshops focused on social responsibility in business.",
    image: "https://example.com/csr.jpg"
  }
];
