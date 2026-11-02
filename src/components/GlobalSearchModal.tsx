import React, { useState } from 'react';
import { 
  Search, 
  X, 
  Users, 
  AlertCircle, 
  FileText, 
  ChevronRight, 
  BookOpen, 
  Calendar, 
  CreditCard,
  Send,
  Download
} from 'lucide-react';
import { Student, CampusAlert, Transaction, UserRole, ScheduleItem, ResultItem } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: UserRole;
  students: Student[];
  alerts: CampusAlert[];
  transactions: Transaction[];
  schedule: ScheduleItem[];
  results: ResultItem[];
  onSelectStudent: (s: Student) => void;
  onNavigateTab: (tab: string) => void;
  onOpenPayFeeModal?: () => void;
  onOpenTranscriptModal?: () => void;
  onOpenLeaveRequestModal?: () => void;
  onOpenTimetableModal?: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  userRole,
  students,
  alerts,
  transactions,
  schedule,
  results,
  onSelectStudent,
  onNavigateTab,
  onOpenPayFeeModal,
  onOpenTranscriptModal,
  onOpenLeaveRequestModal,
  onOpenTimetableModal,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  // Student specific quick actions
  const studentActions = [
    { title: 'Pay Tuition Fees', desc: 'Settle outstanding semester dues', icon: CreditCard, action: onOpenPayFeeModal },
    { title: 'View Class Timetable', desc: 'Semester IV schedule & room locations', icon: Calendar, action: onOpenTimetableModal },
    { title: 'Official Academic Transcript', desc: 'Download verified grade sheet', icon: Download, action: onOpenTranscriptModal },
    { title: 'Apply for Leave', desc: 'Submit medical or academic absence request', icon: Send, action: onOpenLeaveRequestModal },
  ];

  // RBAC Filtered results
  const matchedStudentCourses = schedule.filter(s => 
    s.subject.toLowerCase().includes(query.toLowerCase()) ||
    s.instructor.toLowerCase().includes(query.toLowerCase()) ||
    s.location.toLowerCase().includes(query.toLowerCase())
  );

  const matchedResults = results.filter(r =>
    r.course.toLowerCase().includes(query.toLowerCase()) ||
    r.code.toLowerCase().includes(query.toLowerCase())
  );

  const matchedActions = studentActions.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.desc.toLowerCase().includes(query.toLowerCase())
  );

  // Admin / Faculty only
  const matchedStudents = userRole !== 'student' 
    ? (query 
        ? students.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.studentCode.toLowerCase().includes(query.toLowerCase())) 
        : students.slice(0, 3))
    : [];

  const matchedAlerts = userRole === 'admin' 
    ? (query 
        ? alerts.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.description.toLowerCase().includes(query.toLowerCase())) 
        : alerts.slice(0, 2))
    : [];

  const matchedTxns = userRole === 'admin' 
    ? (query 
        ? transactions.filter(t => t.title.toLowerCase().includes(query.toLowerCase())) 
        : transactions.slice(0, 2))
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-20 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-100 shadow-2xl p-6 space-y-4 max-h-[80vh] overflow-y-auto">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
          <input 
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              userRole === 'student' 
                ? "Search my subjects, timetable, results, or services..." 
                : "Search students, campus alerts, or transactions..."
            }
            className="w-full pl-12 pr-10 py-3 bg-slate-100 border-none rounded-2xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <button onClick={onClose} className="p-1.5 absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Sections */}
        <div className="space-y-4 pt-2">
          {/* STUDENT ONLY: Enrolled Courses & Schedule */}
          {userRole === 'student' && (
            <>
              {matchedStudentCourses.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500" /> My Enrolled Courses
                  </div>
                  <div className="space-y-1.5">
                    {matchedStudentCourses.map(item => (
                      <div 
                        key={item.id}
                        onClick={() => {
                          onNavigateTab('academics');
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {item.subject}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {item.instructor} • {item.location} • {item.time} {item.period}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedResults.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-500" /> Examination Results
                  </div>
                  <div className="space-y-1.5">
                    {matchedResults.map(res => (
                      <div 
                        key={res.id}
                        onClick={() => {
                          onNavigateTab('academics');
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                            {res.course} ({res.code})
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Credits: {res.credits} • Score: {res.scorePct}%
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md">
                          {res.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedActions.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-500" /> Quick Student Services
                  </div>
                  <div className="space-y-1.5">
                    {matchedActions.map((action, idx) => {
                      const Icon = action.icon;
                      return (
                        <div 
                          key={idx}
                          onClick={() => {
                            if (action.action) action.action();
                            onClose();
                          }}
                          className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-slate-100 rounded-xl text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {action.title}
                              </div>
                              <div className="text-[10px] text-slate-400">{action.desc}</div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ADMIN & FACULTY ONLY: Student Directory */}
          {userRole !== 'student' && matchedStudents.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-500" /> Student Directory ({matchedStudents.length})
              </div>
              <div className="space-y-1.5">
                {matchedStudents.map(student => (
                  <div 
                    key={student.id}
                    onClick={() => {
                      onSelectStudent(student);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{student.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{student.studentCode} • {student.department}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADMIN ONLY: Alerts Section */}
          {userRole === 'admin' && matchedAlerts.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-red-500" /> System Alerts
              </div>
              <div className="space-y-1.5">
                {matchedAlerts.map(alert => (
                  <div 
                    key={alert.id}
                    onClick={() => {
                      onNavigateTab('dashboard');
                      onClose();
                    }}
                    className="p-2.5 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer"
                  >
                    <div className="text-xs font-bold text-slate-900">{alert.title}</div>
                    <div className="text-[11px] text-slate-500">{alert.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADMIN ONLY: Financial Transactions Section */}
          {userRole === 'admin' && matchedTxns.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-500" /> Campus Treasury Transactions
              </div>
              <div className="space-y-1.5">
                {matchedTxns.map(txn => (
                  <div 
                    key={txn.id}
                    onClick={() => {
                      onNavigateTab('finance');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">{txn.title}</div>
                      <div className="text-[10px] text-slate-400">{txn.date} • {txn.category}</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-800">₹{txn.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
