import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  UserPlus,
  Filter, 
  MoreVertical, 
  GraduationCap, 
  Mail, 
  Phone, 
  BookOpen, 
  Award, 
  CheckCircle, 
  X,
  UserCheck,
  UserX,
  School
} from 'lucide-react';
import { Student } from '../types';

interface AcademicsViewProps {
  students: Student[];
  onOpenAddStudentModal: () => void;
  onOpenAddUserModal?: () => void;
  onSelectStudent: (student: Student) => void;
}

export const AcademicsView: React.FC<AcademicsViewProps> = ({
  students,
  onOpenAddStudentModal,
  onOpenAddUserModal,
  onSelectStudent,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Suspended' | 'Graduated'>('All');

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = statusFilter === 'All' || student.status === statusFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academics & Student Directory</h1>
          <p className="text-sm text-slate-500 font-medium">
            Manage student records, enrollment status, and academic progress across all faculties.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onOpenAddUserModal && (
            <button 
              onClick={onOpenAddUserModal}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer shrink-0"
            >
              <UserPlus className="w-4 h-4 text-blue-400" /> Create User Account
            </button>
          )}
          <button 
            onClick={onOpenAddStudentModal}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-2xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Student
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-white p-4 rounded-3xl border border-slate-100 shadow-xs">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID or Name..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {(['All', 'Active', 'Suspended', 'Graduated'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === filter
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div 
            key={student.id}
            onClick={() => onSelectStudent(student)}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between group cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-start gap-4">
              <img 
                src={student.avatar} 
                alt={student.name} 
                className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors truncate">
                    {student.name}
                  </h3>
                </div>
                <span className="text-xs font-mono font-semibold text-slate-400 block">{student.studentCode}</span>
                <span className="text-xs font-medium text-slate-600 mt-1 block truncate">{student.department}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Enrolled: {student.enrolledDate}</span>
              
              {/* Status Badge */}
              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                student.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-200' :
                student.status === 'Suspended' ? 'bg-red-50 text-red-700 border border-red-200' :
                'bg-indigo-50 text-indigo-700 border border-indigo-200'
              }`}>
                {student.status}
              </span>
            </div>
          </div>
        ))}

        {filteredStudents.length === 0 && (
          <div className="col-span-full bg-white p-12 rounded-3xl text-center border border-slate-100">
            <School className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-bold">No students found</p>
            <p className="text-xs text-slate-400 mt-1">Try clearing your search query or filter settings.</p>
          </div>
        )}
      </div>

      {/* Floating Action Button (FAB) on Mobile */}
      <button 
        onClick={onOpenAddStudentModal}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-600/30 flex items-center justify-center hover:bg-blue-700 transition-all active:scale-95 z-40 cursor-pointer"
        title="Add Student"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};
