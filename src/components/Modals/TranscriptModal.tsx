import React from 'react';
import { X, Printer, Download, GraduationCap, Award } from 'lucide-react';
import { ResultItem } from '../../types';

interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentId: string;
  department: string;
  gpa: number;
  results: ResultItem[];
}

export const TranscriptModal: React.FC<TranscriptModalProps> = ({
  isOpen,
  onClose,
  studentName,
  studentId,
  department,
  gpa,
  results,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-100 shadow-2xl p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-2xl">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Official Academic Transcript</h3>
              <p className="text-xs text-slate-500">Kiro Master University System</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 text-slate-400 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Metadata Card */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 font-medium block">Student Name</span>
            <span className="font-bold text-slate-900">{studentName}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Student Code</span>
            <span className="font-mono font-bold text-slate-900">{studentId}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Department</span>
            <span className="font-bold text-slate-900">{department}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Cumulative GPA</span>
            <span className="font-extrabold text-blue-600">{gpa.toFixed(2)} / 4.00</span>
          </div>
        </div>

        {/* Grades Table */}
        <div className="border border-slate-100 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-100 font-bold text-slate-600 uppercase">
                <th className="p-3 pl-4">Course Code</th>
                <th className="p-3">Course Title</th>
                <th className="p-3 text-center">Credits</th>
                <th className="p-3 text-center">Semester</th>
                <th className="p-3 text-right pr-4">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60">
                  <td className="p-3 pl-4 font-mono font-bold text-slate-700">{r.code}</td>
                  <td className="p-3 font-semibold text-slate-900">{r.course}</td>
                  <td className="p-3 text-center font-mono">{r.credits}</td>
                  <td className="p-3 text-center text-slate-500">{r.semester}</td>
                  <td className="p-3 text-right pr-4 font-mono font-bold text-blue-600">{r.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <div className="pt-4 flex justify-between items-center border-t border-slate-100">
          <span className="text-[11px] text-slate-400">Digitally Verified Document</span>
          <div className="flex gap-3">
            <button 
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print
            </button>
            <button 
              onClick={() => alert('Transcript PDF downloaded successfully!')}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
