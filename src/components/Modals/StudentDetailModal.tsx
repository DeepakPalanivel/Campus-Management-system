import React from 'react';
import { X, Mail, Phone, GraduationCap, Award, CheckSquare, DollarSign, Calendar } from 'lucide-react';
import { Student } from '../../types';

interface StudentDetailModalProps {
  student: Student | null;
  onClose: () => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
}) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-100 shadow-2xl p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-4">
            <img 
              src={student.avatar} 
              alt={student.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-100"
            />
            <div>
              <h3 className="text-xl font-bold text-slate-900">{student.name}</h3>
              <span className="text-xs font-mono font-bold text-slate-400 block">{student.studentCode}</span>
              <span className="text-xs font-medium text-slate-600 block">{student.department}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 text-slate-400 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Badge & Contact Info */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Academic Status</span>
            <span className={`px-2.5 py-0.5 rounded-md font-extrabold text-[10px] uppercase ${
              student.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-200' :
              student.status === 'Suspended' ? 'bg-red-50 text-red-700 border border-red-200' :
              'bg-indigo-50 text-indigo-700 border border-indigo-200'
            }`}>
              {student.status}
            </span>
          </div>

          <div className="pt-2 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-600 truncate">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{student.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{student.phone}</span>
            </div>
          </div>
        </div>

        {/* Academic Stats Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-slate-400 font-medium block">Current GPA</span>
            <span className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5 block">{student.gpa.toFixed(2)}</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-slate-400 font-medium block">Attendance</span>
            <span className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5 block">{student.attendancePct}%</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-slate-400 font-medium block">Credits Completed</span>
            <span className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5 block">{student.creditsEarned} / {student.totalCredits}</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-slate-400 font-medium block">Fees Due</span>
            <span className={`text-2xl font-extrabold font-mono mt-0.5 block ${student.feesDue > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
              ₹{student.feesDue.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="pt-4 flex justify-end border-t border-slate-100">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-colors cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
