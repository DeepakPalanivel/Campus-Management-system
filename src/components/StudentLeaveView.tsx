import React from 'react';
import { 
  Calendar, 
  Clock, 
  Send, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  FileText,
  Plus
} from 'lucide-react';
import { LeaveRequest } from '../types';

interface StudentLeaveViewProps {
  studentName: string;
  studentId: string;
  department: string;
  attendancePct: number;
  leaveRequests: LeaveRequest[];
  onOpenLeaveRequestModal: () => void;
}

export const StudentLeaveView: React.FC<StudentLeaveViewProps> = ({
  studentName,
  studentId,
  department,
  attendancePct,
  leaveRequests,
  onOpenLeaveRequestModal,
}) => {
  // Filter for this student's leave requests
  const myLeaves = leaveRequests.filter(
    l => l.studentName.toLowerCase() === studentName.toLowerCase() || l.studentId === studentId
  );

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-md">
              Attendance & Leave Portal
            </span>
            <span className="text-xs font-mono text-slate-500">ID: {studentId}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Leave & Absence Management
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Submit medical or personal absence applications to department faculty and coordinators.
          </p>
        </div>

        <button
          onClick={onOpenLeaveRequestModal}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-2xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for Leave</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Current Semester Attendance</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{attendancePct}%</div>
          <div className="text-[11px] font-bold text-emerald-600 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Above 75% examination threshold
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Total Leaves Submitted</div>
          <div className="text-2xl font-extrabold text-purple-950 mt-1">{myLeaves.length} Requests</div>
          <div className="text-[11px] font-bold text-slate-400 mt-1">
            {myLeaves.filter(l => l.status === 'Approved').length} approved • {myLeaves.filter(l => l.status === 'Pending').length} pending
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Permissible Casual Leave</div>
          <div className="text-2xl font-extrabold text-blue-950 mt-1">12 Days / Year</div>
          <div className="text-[11px] font-bold text-blue-600 mt-1">Academic Calendar 2026-27</div>
        </div>
      </div>

      {/* Leave Application History */}
      <section className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" /> Leave Application Records
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review history and live status of your filed leave requests.
            </p>
          </div>
        </div>

        {myLeaves.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {myLeaves.map((req) => (
              <div key={req.id} className="p-6 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      {req.id}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border flex items-center gap-1 ${
                      req.status === 'Approved'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : req.status === 'Pending'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {req.status === 'Approved' && <CheckCircle2 className="w-3 h-3" />}
                      {req.status === 'Pending' && <Clock className="w-3 h-3" />}
                      {req.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                      {req.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{req.reason}</h3>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="font-mono text-purple-700 font-semibold">
                      {req.startDate} to {req.endDate}
                    </span>
                    <span>•</span>
                    <span>Applied on: {req.appliedOn}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs">
                  <span className="text-slate-400 block font-medium">Reviewing Authority</span>
                  <span className="font-semibold text-slate-800">{department} Faculty Committee</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">No Leave Requests Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven't submitted any absence applications for this semester yet.
            </p>
            <button
              onClick={onOpenLeaveRequestModal}
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Submit First Request
            </button>
          </div>
        )}
      </section>

      {/* Guidelines Accordion / Box */}
      <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 space-y-1">
          <div className="font-bold text-blue-900">Leave Approval Policy:</div>
          <p>
            Medical leaves exceeding 3 consecutive days require a signed doctor's certificate submitted to the department coordinator. Approved leaves count towards academic attendance exemptions.
          </p>
        </div>
      </div>
    </div>
  );
};
