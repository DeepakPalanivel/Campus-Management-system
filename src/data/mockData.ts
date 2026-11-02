import { Student, CampusAlert, Transaction, ScheduleItem, ResultItem, BudgetHealthItem, UserProfile, LeaveRequest } from '../types';

export const mockUsers: Record<string, UserProfile> = {
  admin: {
    id: 'usr-admin',
    name: 'Deepak',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'deepak@kiromaster.edu',
    username: 'deepak',
    password: 'deepak@2826',
    department: 'Campus Administration'
  },
  student: {
    id: 'usr-aryan',
    name: 'Aryan Sharma',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    email: 'aryan.sharma@kiromaster.edu',
    username: 'aryan',
    password: 'student123',
    department: 'Computer Science',
    studentId: 'S-2022-089'
  },
  faculty: {
    id: 'usr-faculty',
    name: 'Dr. Meenakshi Sundaram',
    role: 'faculty',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'm.sundaram@kiromaster.edu',
    username: 'faculty',
    password: 'faculty123',
    department: 'Computer Science & Engineering'
  }
};

export const initialUserAccounts: UserProfile[] = Object.values(mockUsers);

export const initialStudents: Student[] = [
  {
    id: 'std-1',
    studentCode: 'S-2023-042',
    name: 'Rahul Verma',
    department: 'Computer Science',
    status: 'Active',
    enrolledDate: 'Aug 2023',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'rahul.verma@kiromaster.edu',
    phone: '+91 98765 43210',
    gpa: 3.7,
    attendancePct: 91,
    creditsEarned: 32,
    totalCredits: 120,
    feesDue: 0
  },
  {
    id: 'std-2',
    studentCode: 'S-2022-105',
    name: 'Priya Sharma',
    department: 'Business Administration',
    status: 'Active',
    enrolledDate: 'Sep 2022',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    email: 'priya.sharma@kiromaster.edu',
    phone: '+91 98123 45678',
    gpa: 3.9,
    attendancePct: 95,
    creditsEarned: 68,
    totalCredits: 120,
    feesDue: 4500
  },
  {
    id: 'std-3',
    studentCode: 'S-2021-088',
    name: 'Amit Kumar',
    department: 'Mechanical Engineering',
    status: 'Suspended',
    enrolledDate: 'Aug 2021',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'amit.kumar@kiromaster.edu',
    phone: '+91 99887 76655',
    gpa: 2.8,
    attendancePct: 68,
    creditsEarned: 54,
    totalCredits: 120,
    feesDue: 18000
  },
  {
    id: 'std-4',
    studentCode: 'S-2019-012',
    name: 'Sneha Patel',
    department: 'Information Technology',
    status: 'Graduated',
    enrolledDate: 'Class of 2023',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'sneha.patel@kiromaster.edu',
    phone: '+91 97654 32109',
    gpa: 3.95,
    attendancePct: 98,
    creditsEarned: 120,
    totalCredits: 120,
    feesDue: 0
  },
  {
    id: 'std-5',
    studentCode: 'S-2022-089',
    name: 'Aryan Sharma',
    department: 'Computer Science',
    status: 'Active',
    enrolledDate: 'Aug 2022',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    email: 'aryan.sharma@kiromaster.edu',
    phone: '+91 91234 56789',
    gpa: 3.8,
    attendancePct: 88,
    creditsEarned: 64,
    totalCredits: 120,
    feesDue: 12500
  },
  {
    id: 'std-6',
    studentCode: 'S-2023-112',
    name: 'Ananya Reddy',
    department: 'Electrical Engineering',
    status: 'Active',
    enrolledDate: 'Aug 2023',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    email: 'ananya.reddy@kiromaster.edu',
    phone: '+91 94455 66778',
    gpa: 3.6,
    attendancePct: 93,
    creditsEarned: 30,
    totalCredits: 120,
    feesDue: 0
  }
];

export const initialAlerts: CampusAlert[] = [
  {
    id: 'alt-1',
    title: 'Low Attendance in Dept of CS',
    description: 'Average attendance dropped below 75% this week.',
    severity: 'critical',
    timeAgo: '10m ago',
    department: 'Computer Science',
    resolved: false
  },
  {
    id: 'alt-2',
    title: 'Vendor Payment Due: Allied Supplies',
    description: 'Invoice #INV-40291 needs approval today.',
    severity: 'warning',
    timeAgo: '2h ago',
    department: 'Finance',
    resolved: false
  },
  {
    id: 'alt-3',
    title: 'Budget Alert: Library Maint (90%)',
    description: 'Department is nearing its allocated quarterly budget.',
    severity: 'warning',
    timeAgo: '5h ago',
    department: 'Library Services',
    resolved: false
  },
  {
    id: 'alt-4',
    title: 'System Backup Success',
    description: 'Database nightly snapshot complete.',
    severity: 'info',
    timeAgo: '45m ago',
    department: 'IT Infrastructure',
    resolved: true
  }
];

export const initialTransactions: Transaction[] = [
  {
    id: 'txn-1',
    title: 'Tuition Fee - S. Mehra',
    category: 'Tuition Fee',
    type: 'income',
    amount: 45000,
    date: 'Today',
    time: '10:24 AM',
    status: 'Completed',
    referenceId: 'TXN-908123'
  },
  {
    id: 'txn-2',
    title: 'Electricity Bill - Sept',
    category: 'Utility',
    type: 'expense',
    amount: 12400,
    date: 'Yesterday',
    time: '04:15 PM',
    status: 'Completed',
    referenceId: 'TXN-884102'
  },
  {
    id: 'txn-3',
    title: 'Vendor: Office Mart',
    category: 'Vendor Payment',
    type: 'expense',
    amount: 8500,
    date: 'Sep 24, 2023',
    time: '11:30 AM',
    status: 'Completed',
    referenceId: 'TXN-773199'
  },
  {
    id: 'txn-4',
    title: 'Research Grant - AI Lab',
    category: 'Grant',
    type: 'income',
    amount: 250000,
    date: 'Sep 20, 2023',
    time: '02:00 PM',
    status: 'Completed',
    referenceId: 'TXN-661001'
  },
  {
    id: 'txn-5',
    title: 'Faculty Payroll - Sept',
    category: 'Payroll',
    type: 'expense',
    amount: 480000,
    date: 'Sep 01, 2023',
    time: '09:00 AM',
    status: 'Completed',
    referenceId: 'TXN-554800'
  }
];

export const studentSchedule: ScheduleItem[] = [
  {
    id: 'sch-1',
    time: '10:00',
    period: 'AM',
    subject: 'Data Structures',
    location: 'Room 402, CS Building',
    instructor: 'Dr. Meenakshi Sundaram',
    type: 'Lecture'
  },
  {
    id: 'sch-2',
    time: '01:30',
    period: 'PM',
    subject: 'Operating Systems',
    location: 'Lecture Hall B',
    instructor: 'Prof. Ramesh Gupta',
    type: 'Lecture'
  },
  {
    id: 'sch-3',
    time: '03:30',
    period: 'PM',
    subject: 'Database Systems Lab',
    location: 'Lab 301, IT Wing',
    instructor: 'Ms. Anitha Rao',
    type: 'Lab'
  }
];

export const studentResults: ResultItem[] = [
  {
    id: 'res-1',
    course: 'Database Management Systems',
    code: 'CS-301',
    credits: 3,
    grade: 'A',
    scorePct: 92,
    semester: 'Fall 2023'
  },
  {
    id: 'res-2',
    course: 'Software Engineering',
    code: 'CS-304',
    credits: 4,
    grade: 'A-',
    scorePct: 88,
    semester: 'Fall 2023'
  },
  {
    id: 'res-3',
    course: 'Computer Networks',
    code: 'CS-302',
    credits: 3,
    grade: 'B+',
    scorePct: 84,
    semester: 'Fall 2023'
  },
  {
    id: 'res-4',
    course: 'Theory of Computation',
    code: 'CS-303',
    credits: 3,
    grade: 'A+',
    scorePct: 96,
    semester: 'Spring 2023'
  }
];

export const budgetHealth: BudgetHealthItem[] = [
  {
    id: 'bud-1',
    department: 'Academics',
    allocated: 12000000,
    spent: 5400000,
    utilizedPct: 45,
    status: 'Healthy'
  },
  {
    id: 'bud-2',
    department: 'Maintenance',
    allocated: 4000000,
    spent: 3280000,
    utilizedPct: 82,
    status: 'Warning'
  },
  {
    id: 'bud-3',
    department: 'Events & Sports',
    allocated: 2500000,
    spent: 500000,
    utilizedPct: 20,
    status: 'Healthy'
  },
  {
    id: 'bud-4',
    department: 'Library Services',
    allocated: 1500000,
    spent: 1350000,
    utilizedPct: 90,
    status: 'Critical'
  }
];

export const initialLeaveRequests: LeaveRequest[] = [
  {
    id: 'lvr-1',
    studentName: 'Aryan Sharma',
    studentId: 'S-2022-089',
    reason: 'Attending National Hackathon Conference',
    startDate: '2026-08-15',
    endDate: '2026-08-18',
    status: 'Approved',
    appliedOn: '2026-08-01'
  }
];
