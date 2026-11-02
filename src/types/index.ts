export type UserRole = 'admin' | 'student' | 'faculty';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  email: string;
  username?: string;
  password?: string;
  department?: string;
  studentId?: string;
}

export interface Student {
  id: string;
  studentCode: string; // e.g. S-2023-042
  name: string;
  department: string;
  status: 'Active' | 'Suspended' | 'Graduated';
  enrolledDate: string;
  avatar: string;
  email: string;
  phone: string;
  gpa: number;
  attendancePct: number;
  creditsEarned: number;
  totalCredits: number;
  feesDue: number;
}

export interface CampusAlert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  timeAgo: string;
  department?: string;
  resolved?: boolean;
}

export interface Transaction {
  id: string;
  title: string;
  category: 'Tuition Fee' | 'Vendor Payment' | 'Utility' | 'Grant' | 'Maintenance' | 'Payroll';
  type: 'income' | 'expense';
  amount: number;
  date: string;
  time: string;
  status: 'Completed' | 'Pending' | 'Processing';
  referenceId: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  period: 'AM' | 'PM';
  subject: string;
  location: string;
  instructor: string;
  type: 'Lecture' | 'Lab' | 'Seminar';
}

export interface ResultItem {
  id: string;
  course: string;
  code: string;
  credits: number;
  grade: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+';
  scorePct: number;
  semester: string;
}

export interface BudgetHealthItem {
  id: string;
  department: string;
  allocated: number;
  spent: number;
  utilizedPct: number;
  status: 'Healthy' | 'Warning' | 'Critical';
}

export interface LeaveRequest {
  id: string;
  studentName: string;
  studentId: string;
  reason: string;
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
}
