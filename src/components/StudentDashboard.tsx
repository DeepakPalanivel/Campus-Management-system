import React from 'react';
import { 
  TrendingUp, 
  CheckSquare, 
  Award, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  Calendar, 
  FileText, 
  Send, 
  CreditCard,
  ChevronRight,
  BookOpen,
  DollarSign
} from 'lucide-react';
import { ScheduleItem, ResultItem } from '../types';

interface StudentDashboardProps {
  studentName: string;
  department: string;
  gpa: number;
  attendancePct: number;
  creditsEarned: number;
  totalCredits: number;
  feesDue: number;
  schedule: ScheduleItem[];
  results: ResultItem[];
  onOpenPayFeeModal: () => void;
  onOpenTranscriptModal: () => void;
  onOpenLeaveRequestModal: () => void;
  onOpenTimetableModal: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  studentName,
  department,
  gpa,
  attendancePct,
  creditsEarned,
  totalCredits,
  feesDue,
  schedule,
  results,
  onOpenPayFeeModal,
  onOpenTranscriptModal,
  onOpenLeaveRequestModal,
  onOpenTimetableModal,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back, {studentName}</h1>
        <p className="text-slate-500 font-medium text-base mt-1">
          {department} • Semester IV • Here's what's happening with your studies today.
        </p>
      </div>

      {/* Academic Overview Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current GPA Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 font-medium text-sm">Current GPA</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold text-blue-950">{gpa.toFixed(1)}</span>
              <span className="text-slate-400 font-medium text-sm">/ 4.0</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
              <span>Academic Standing</span>
              <span className="text-emerald-600 font-bold">Excellent</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${(gpa / 4.0) * 100}%` }}></div>
            </div>
          </div>
        </div>

        {/* Attendance Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 font-medium text-sm">Attendance</span>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <CheckSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold text-blue-950">{attendancePct}%</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
              <span>Requirement: 75%</span>
              <span className="text-purple-600 font-bold">Safe Zone</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-purple-600 h-full rounded-full transition-all duration-500" style={{ width: `${attendancePct}%` }}></div>
            </div>
          </div>
        </div>

        {/* Credits Earned Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 font-medium text-sm">Credits Earned</span>
              <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold text-blue-950">{creditsEarned}</span>
              <span className="text-slate-400 font-medium text-sm">/ {totalCredits}</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
              <span>Degree Completion</span>
              <span className="text-orange-600 font-bold">53% Completed</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full rounded-full transition-all duration-500" style={{ width: `${(creditsEarned / totalCredits) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Upcoming Schedule & Financial Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Schedule */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Today's Schedule</h2>
              </div>
              <button 
                onClick={onOpenTimetableModal}
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                View Full Timetable
              </button>
            </div>

            <div className="p-6 space-y-4">
              {schedule.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-blue-200 transition-all hover:bg-white hover:shadow-xs group"
                >
                  <div className="bg-blue-100 text-blue-900 rounded-xl p-3 flex flex-col items-center justify-center min-w-[70px] shrink-0 font-mono">
                    <span className="text-sm font-bold">{item.time}</span>
                    <span className="text-[10px] font-semibold text-blue-700">{item.period}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {item.subject}
                      </h3>
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-200/80 px-2.5 py-0.5 rounded-md">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {item.location}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Instructor: {item.instructor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Financial Status */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Financial Status</h2>
            </div>

            <div className="p-8 flex flex-col items-center text-center">
              <span className="text-sm font-medium text-slate-500">Total Term Fees Outstanding</span>
              <span className="text-4xl md:text-5xl font-extrabold text-red-600 mt-2 font-mono tracking-tight">
                ₹{feesDue.toLocaleString()}
              </span>

              {feesDue > 0 ? (
                <>
                  <div className="mt-4 px-4 py-2 bg-red-50 text-red-700 rounded-2xl border border-red-200 flex items-center gap-2 text-xs font-semibold">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>Next Payment Due Date: Oct 15, 2026</span>
                  </div>
                  <p className="text-xs text-slate-400 max-w-xs mt-3">
                    Avoid late charges by completing payment before the official institutional due date.
                  </p>
                  <button 
                    onClick={onOpenPayFeeModal}
                    className="mt-6 w-full max-w-xs bg-blue-900 hover:bg-blue-950 text-white py-3.5 px-6 rounded-2xl font-bold text-sm shadow-lg shadow-blue-900/20 transition-all active:scale-95 cursor-pointer"
                  >
                    Pay Tuition Now
                  </button>
                </>
              ) : (
                <div className="mt-6 p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-200 flex items-center gap-2 text-xs font-semibold">
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                  <span>All term fees have been paid in full!</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-400">
            Secure 256-bit payment Gateway integrated
          </div>
        </section>
      </div>

      {/* Grid: Recent Results & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Results Table (2 Cols) */}
        <section className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Recent Results</h2>
            </div>
            <button 
              onClick={onOpenTranscriptModal}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              View Full Transcript
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-4 pl-6">Course Name</th>
                  <th className="p-4">Credits</th>
                  <th className="p-4 text-right pr-6">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {results.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">
                      {res.course}
                      <span className="block text-xs font-mono text-slate-400 font-normal">{res.code}</span>
                    </td>
                    <td className="p-4 font-mono text-slate-600">{res.credits}</td>
                    <td className="p-4 text-right pr-6">
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded-lg font-mono font-bold text-xs ${
                        res.grade.startsWith('A') 
                          ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {res.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Actions Panel */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
            <p className="text-xs text-slate-500">Student self-service portal</p>
          </div>

          <div className="p-6 grid grid-cols-2 gap-4 flex-1">
            <button 
              onClick={() => alert(`Attendance summary: ${attendancePct}% presence across all registered modules.`)}
              className="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 hover:border-blue-200 border border-slate-100 transition-all cursor-pointer group"
            >
              <div className="p-3 bg-blue-100/80 text-blue-700 rounded-xl mb-2 group-hover:scale-110 transition-transform">
                <CheckSquare className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800">Attendance</span>
            </button>

            <button 
              onClick={onOpenTimetableModal}
              className="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-50 hover:bg-purple-50/60 hover:border-purple-200 border border-slate-100 transition-all cursor-pointer group"
            >
              <div className="p-3 bg-purple-100/80 text-purple-700 rounded-xl mb-2 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800">Timetable</span>
            </button>

            <button 
              onClick={onOpenTranscriptModal}
              className="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-50 hover:bg-orange-50/60 hover:border-orange-200 border border-slate-100 transition-all cursor-pointer group"
            >
              <div className="p-3 bg-orange-100/80 text-orange-700 rounded-xl mb-2 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800">Results</span>
            </button>

            <button 
              onClick={onOpenLeaveRequestModal}
              className="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 hover:border-emerald-200 border border-slate-100 transition-all cursor-pointer group"
            >
              <div className="p-3 bg-emerald-100/80 text-emerald-700 rounded-xl mb-2 group-hover:scale-110 transition-transform">
                <Send className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800">Leave Request</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
