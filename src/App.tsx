import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AdminDashboard } from './components/AdminDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { AcademicsView } from './components/AcademicsView';
import { FinanceView } from './components/FinanceView';
import { ProfileView } from './components/ProfileView';

// Student Dedicated Views (RBAC Protected)
import { StudentAcademicsView } from './components/StudentAcademicsView';
import { StudentFeesView } from './components/StudentFeesView';
import { StudentLeaveView } from './components/StudentLeaveView';

// Modals
import { AddStudentModal } from './components/Modals/AddStudentModal';
import { AddUserModal } from './components/Modals/AddUserModal';
import { PayFeeModal } from './components/Modals/PayFeeModal';
import { TranscriptModal } from './components/Modals/TranscriptModal';
import { LeaveRequestModal } from './components/Modals/LeaveRequestModal';
import { StudentDetailModal } from './components/Modals/StudentDetailModal';
import { RecordTxnModal } from './components/Modals/RecordTxnModal';
import { StatementModal } from './components/Modals/StatementModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { StudentNoticesModal } from './components/Modals/StudentNoticesModal';

import { 
  mockUsers, 
  initialUserAccounts,
  initialStudents, 
  initialAlerts, 
  initialTransactions, 
  studentSchedule, 
  studentResults, 
  budgetHealth, 
  initialLeaveRequests 
} from './data/mockData';
import { UserRole, UserProfile, Student, CampusAlert, Transaction, LeaveRequest } from './types';
import { X, Calendar, MapPin, CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [userAccounts, setUserAccounts] = useState<UserProfile[]>(initialUserAccounts);
  const [loggedInUser, setLoggedInUser] = useState<UserProfile>(mockUsers.admin);
  
  // Data State
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [alerts, setAlerts] = useState<CampusAlert[]>(initialAlerts);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);

  // Modal Visibility State
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isPayFeeOpen, setIsPayFeeOpen] = useState(false);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [isLeaveRequestOpen, setIsLeaveRequestOpen] = useState(false);
  const [isTimetableOpen, setIsTimetableOpen] = useState(false);
  const [isRecordTxnOpen, setIsRecordTxnOpen] = useState(false);
  const [isStatementOpen, setIsStatementOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStudentNoticesOpen, setIsStudentNoticesOpen] = useState(false);
  
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentUser = loggedInUser;

  // Student specific data resolution
  const currentStudentData = students.find(
    s => s.name.toLowerCase() === currentUser.name.toLowerCase() || 
         (currentUser.studentId && s.studentCode === currentUser.studentId)
  ) || {
    gpa: 3.8,
    attendancePct: 88,
    creditsEarned: 64,
    totalCredits: 120,
    feesDue: 12500,
    studentCode: currentUser.studentId || 'S-2022-089',
    department: currentUser.department || 'Computer Science'
  };

  const studentFeesDue = currentStudentData.feesDue;

  // Handlers
  const handleLogin = (user: UserProfile, role: UserRole) => {
    setLoggedInUser(user);
    setUserRole(role);
    setIsAuthenticated(true);
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleAddUser = (newUser: UserProfile) => {
    setUserAccounts(prev => [...prev, newUser]);
  };

  const handleAddStudent = (newStudent: Student) => {
    setStudents(prev => [newStudent, ...prev]);
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, resolved: true } : a));
  };

  const handleAddTransaction = (newTxn: Transaction) => {
    setTransactions(prev => [newTxn, ...prev]);
  };

  const handlePaymentSuccess = () => {
    // Deduct student fees
    setStudents(prev => prev.map(s => 
      (s.name.toLowerCase() === currentUser.name.toLowerCase() || s.studentCode === currentUser.studentId) 
        ? { ...s, feesDue: 0 } 
        : s
    ));
  };

  const handleLeaveSubmit = (newReq: LeaveRequest) => {
    setLeaveRequests(prev => [newReq, ...prev]);
  };

  const handleApproveLeave = (leaveId: string) => {
    setLeaveRequests(prev => prev.map(l => l.id === leaveId ? { ...l, status: 'Approved' } : l));
  };

  const handleRejectLeave = (leaveId: string) => {
    setLeaveRequests(prev => prev.map(l => l.id === leaveId ? { ...l, status: 'Rejected' } : l));
  };

  // Notification counts by role
  const unreadAlertsCount = userRole === 'student' 
    ? (studentFeesDue > 0 ? 2 : 1) 
    : alerts.filter(a => !a.resolved).length;

  if (!isAuthenticated) {
    return <LoginPage users={userAccounts} onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">
      {/* Sidebar with Role-Based Navigation */}
      <Sidebar 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Canvas */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Top App Header */}
        <Header 
          currentTab={currentTab}
          currentUser={currentUser}
          userRole={userRole}
          unreadAlertsCount={unreadAlertsCount}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAlertsModal={() => {
            if (userRole === 'student') {
              setIsStudentNoticesOpen(true);
            } else {
              setCurrentTab('dashboard');
            }
          }}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          onTabChange={setCurrentTab}
          onLogout={handleLogout}
        />

        {/* Scrollable Page Body with RBAC enforcement */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 pb-20 md:pb-10">
          
          {/* TAB: DASHBOARD */}
          {currentTab === 'dashboard' && (
            userRole === 'student' ? (
              <StudentDashboard 
                studentName={currentUser.name}
                department={currentUser.department || "Computer Science"}
                gpa={currentStudentData.gpa}
                attendancePct={currentStudentData.attendancePct}
                creditsEarned={currentStudentData.creditsEarned}
                totalCredits={currentStudentData.totalCredits}
                feesDue={studentFeesDue}
                schedule={studentSchedule}
                results={studentResults}
                onOpenPayFeeModal={() => setIsPayFeeOpen(true)}
                onOpenTranscriptModal={() => setIsTranscriptOpen(true)}
                onOpenLeaveRequestModal={() => setIsLeaveRequestOpen(true)}
                onOpenTimetableModal={() => setIsTimetableOpen(true)}
              />
            ) : (
              <AdminDashboard 
                students={students}
                alerts={alerts}
                transactions={transactions}
                onNavigateTab={setCurrentTab}
                onOpenAddStudentModal={() => setIsAddStudentOpen(true)}
                onOpenAddUserModal={userRole === 'admin' ? () => setIsAddUserOpen(true) : undefined}
                onResolveAlert={handleResolveAlert}
              />
            )
          )}

          {/* TAB: ACADEMICS (Role-Gated) */}
          {currentTab === 'academics' && (
            userRole === 'student' ? (
              /* Student's Personal Academic View: Enrolled subjects, grades, schedule, NOT all other students */
              <StudentAcademicsView 
                studentName={currentUser.name}
                studentId={currentUser.studentId || currentStudentData.studentCode}
                department={currentUser.department || currentStudentData.department}
                gpa={currentStudentData.gpa}
                attendancePct={currentStudentData.attendancePct}
                creditsEarned={currentStudentData.creditsEarned}
                totalCredits={currentStudentData.totalCredits}
                schedule={studentSchedule}
                results={studentResults}
                onOpenTranscriptModal={() => setIsTranscriptOpen(true)}
                onOpenTimetableModal={() => setIsTimetableOpen(true)}
                onOpenLeaveRequestModal={() => setIsLeaveRequestOpen(true)}
              />
            ) : (
              /* Admin/Faculty Student Directory View */
              <AcademicsView 
                students={students}
                onOpenAddStudentModal={() => setIsAddStudentOpen(true)}
                onOpenAddUserModal={userRole === 'admin' ? () => setIsAddUserOpen(true) : undefined}
                onSelectStudent={setSelectedStudent}
              />
            )
          )}

          {/* TAB: FINANCE (Role-Gated) */}
          {currentTab === 'finance' && (
            userRole === 'student' ? (
              /* Student's Personal Fee Portal: Only their term fees, invoices, receipts */
              <StudentFeesView 
                studentName={currentUser.name}
                studentId={currentUser.studentId || currentStudentData.studentCode}
                department={currentUser.department || currentStudentData.department}
                feesDue={studentFeesDue}
                onOpenPayFeeModal={() => setIsPayFeeOpen(true)}
              />
            ) : userRole === 'admin' ? (
              /* Admin Institutional Treasury View */
              <FinanceView 
                transactions={transactions}
                budgetHealth={budgetHealth}
                onOpenRecordTxnModal={() => setIsRecordTxnOpen(true)}
                onOpenStatementModal={() => setIsStatementOpen(true)}
              />
            ) : (
              /* Faculty Forbidden View */
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 max-w-lg mx-auto space-y-4">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
                  <X className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Restricted Access</h2>
                <p className="text-xs text-slate-500">
                  Campus financial treasury and transaction ledgers are restricted to central system administrators.
                </p>
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold"
                >
                  Return to Dashboard
                </button>
              </div>
            )
          )}

          {/* TAB: LEAVE & ATTENDANCE */}
          {currentTab === 'leave' && (
            userRole === 'student' ? (
              /* Student's Personal Leave Requests */
              <StudentLeaveView 
                studentName={currentUser.name}
                studentId={currentUser.studentId || currentStudentData.studentCode}
                department={currentUser.department || currentStudentData.department}
                attendancePct={currentStudentData.attendancePct}
                leaveRequests={leaveRequests}
                onOpenLeaveRequestModal={() => setIsLeaveRequestOpen(true)}
              />
            ) : (
              /* Admin & Faculty Leave Management Portal */
              <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Leave Requests</h1>
                    <p className="text-sm text-slate-500 font-medium">Review and approve absence requests submitted by students.</p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
                  <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-900">Submitted Applications</h2>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {leaveRequests.map(req => (
                      <div key={req.id} className="p-6 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-base">{req.studentName}</span>
                            <span className="font-mono text-xs text-slate-400">({req.studentId})</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                              req.status === 'Approved'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : req.status === 'Pending'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-red-50 text-red-700 border-red-200'
                            }`}>
                              {req.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium">{req.reason}</p>
                          <div className="text-xs text-slate-400">
                            Duration: <strong className="text-slate-700 font-mono">{req.startDate} to {req.endDate}</strong> • Applied: {req.appliedOn}
                          </div>
                        </div>

                        {req.status === 'Pending' && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleApproveLeave(req.id)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectLeave(req.id)}
                              className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}

          {/* TAB: PROFILE */}
          {currentTab === 'profile' && (
            <ProfileView 
              currentUser={currentUser}
              userRole={userRole}
              onLogout={handleLogout}
            />
          )}
        </div>
      </main>

      {/* ADMIN ONLY MODALS: User creation, Student registration, Transactions */}
      {userRole === 'admin' && (
        <>
          <AddUserModal 
            isOpen={isAddUserOpen}
            onClose={() => setIsAddUserOpen(false)}
            onAddUser={handleAddUser}
            onAddStudent={handleAddStudent}
          />

          <RecordTxnModal 
            isOpen={isRecordTxnOpen}
            onClose={() => setIsRecordTxnOpen(false)}
            onAddTransaction={handleAddTransaction}
          />

          <StatementModal 
            isOpen={isStatementOpen}
            onClose={() => setIsStatementOpen(false)}
            transactions={transactions}
          />
        </>
      )}

      {/* ADMIN & FACULTY MODAL: Add Student */}
      {userRole !== 'student' && (
        <>
          <AddStudentModal 
            isOpen={isAddStudentOpen}
            onClose={() => setIsAddStudentOpen(false)}
            onAddStudent={handleAddStudent}
          />

          <StudentDetailModal 
            student={selectedStudent}
            onClose={() => setSelectedStudent(null)}
          />
        </>
      )}

      {/* STUDENT SELF-SERVICE MODALS */}
      <PayFeeModal 
        isOpen={isPayFeeOpen}
        onClose={() => setIsPayFeeOpen(false)}
        feesDue={studentFeesDue}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <TranscriptModal 
        isOpen={isTranscriptOpen}
        onClose={() => setIsTranscriptOpen(false)}
        studentName={currentUser.name}
        studentId={currentUser.studentId || currentStudentData.studentCode}
        department={currentUser.department || currentStudentData.department}
        gpa={currentStudentData.gpa}
        results={studentResults}
      />

      <LeaveRequestModal 
        isOpen={isLeaveRequestOpen}
        onClose={() => setIsLeaveRequestOpen(false)}
        studentName={currentUser.name}
        studentId={currentUser.studentId || currentStudentData.studentCode}
        onSubmitLeave={handleLeaveSubmit}
      />

      <StudentNoticesModal 
        isOpen={isStudentNoticesOpen}
        onClose={() => setIsStudentNoticesOpen(false)}
        feesDue={studentFeesDue}
        onOpenPayFeeModal={() => setIsPayFeeOpen(true)}
        onOpenTimetableModal={() => setIsTimetableOpen(true)}
      />

      {/* RBAC-Filtered Global Search Modal */}
      <GlobalSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        userRole={userRole}
        students={students}
        alerts={alerts}
        transactions={transactions}
        schedule={studentSchedule}
        results={studentResults}
        onSelectStudent={setSelectedStudent}
        onNavigateTab={setCurrentTab}
        onOpenPayFeeModal={() => setIsPayFeeOpen(true)}
        onOpenTranscriptModal={() => setIsTranscriptOpen(true)}
        onOpenLeaveRequestModal={() => setIsLeaveRequestOpen(true)}
        onOpenTimetableModal={() => setIsTimetableOpen(true)}
      />

      {/* Timetable Quick Modal */}
      {isTimetableOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-100 shadow-2xl p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-2xl">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Semester IV Timetable</h3>
                  <p className="text-xs text-slate-500">{currentUser.department || "Computer Science & Engineering"}</p>
                </div>
              </div>
              <button onClick={() => setIsTimetableOpen(false)} className="p-2 hover:bg-slate-100 text-slate-400 rounded-full cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {studentSchedule.map(s => (
                <div key={s.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{s.subject}</div>
                    <div className="text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> {s.location}
                    </div>
                  </div>
                  <div className="text-right font-mono font-bold text-blue-600">
                    {s.time} {s.period}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button 
                onClick={() => setIsTimetableOpen(false)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
