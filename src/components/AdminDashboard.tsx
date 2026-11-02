import React from 'react';
import { 
  Users, 
  GraduationCap, 
  Briefcase, 
  CheckCircle2, 
  ArrowUpRight, 
  Plus, 
  UserPlus,
  Download,
  Building2
} from 'lucide-react';
import { Student, CampusAlert, Transaction } from '../types';

interface AdminDashboardProps {
  students: Student[];
  alerts: CampusAlert[];
  transactions: Transaction[];
  onNavigateTab: (tab: string) => void;
  onOpenAddStudentModal: () => void;
  onOpenAddUserModal?: () => void;
  onResolveAlert: (alertId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  students,
  onNavigateTab,
  onOpenAddStudentModal,
  onOpenAddUserModal,
}) => {
  const totalStudentsCount = students.length > 0 ? 2450 + (students.length - 6) : 2450;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Good morning, Deepak</h1>
          <p className="text-slate-500 font-medium text-base mt-1">
            Admin Portal • Here's the current overview of campus operations and user access.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {onOpenAddUserModal && (
            <button 
              onClick={onOpenAddUserModal}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-blue-400" /> Create User Account
            </button>
          )}
          <button 
            onClick={onOpenAddStudentModal}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Student
          </button>
        </div>
      </div>

      {/* Campus Overview Bento Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" /> Campus Overview
          </h2>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Real-time Metrics</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Students Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 border border-green-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +8.4%
              </span>
            </div>
            <div className="text-slate-500 text-sm font-medium">Total Students</div>
            <div className="text-3xl font-bold text-slate-900 mt-1">{totalStudentsCount.toLocaleString()}</div>
            <div className="mt-3 text-xs text-slate-400 flex justify-between">
              <span>CS: 820</span>
              <span>Engg: 1,130</span>
            </div>
          </div>

          {/* Total Faculty Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-2xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">Stable</span>
            </div>
            <div className="text-slate-500 text-sm font-medium">Total Faculty</div>
            <div className="text-3xl font-bold text-slate-900 mt-1">120</div>
            <div className="mt-3 text-xs text-slate-400 flex justify-between">
              <span>Full-time: 98</span>
              <span>Adjunct: 22</span>
            </div>
          </div>

          {/* Total Staff Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-2xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">45 Active</span>
            </div>
            <div className="text-slate-500 text-sm font-medium">Total Staff</div>
            <div className="text-3xl font-bold text-slate-900 mt-1">45</div>
            <div className="mt-3 text-xs text-slate-400 flex justify-between">
              <span>Admin: 20</span>
              <span>Support: 25</span>
            </div>
          </div>

          {/* Attendance Today Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +12.5%
              </span>
            </div>
            <div className="text-slate-500 text-sm font-medium">Attendance Today</div>
            <div className="text-3xl font-bold text-slate-900 mt-1">92%</div>
            <div className="mt-3 text-xs text-slate-400 flex justify-between">
              <span>Present: 2,254</span>
              <span>Absent: 196</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
