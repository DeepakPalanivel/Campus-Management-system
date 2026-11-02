import React from 'react';
import { X, Bell, Calendar, CreditCard, Award, CheckCircle2 } from 'lucide-react';

interface StudentNoticesModalProps {
  isOpen: boolean;
  onClose: () => void;
  feesDue: number;
  onOpenPayFeeModal: () => void;
  onOpenTimetableModal: () => void;
}

export const StudentNoticesModal: React.FC<StudentNoticesModalProps> = ({
  isOpen,
  onClose,
  feesDue,
  onOpenPayFeeModal,
  onOpenTimetableModal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-100 shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Student Notices & Alerts</h3>
              <p className="text-xs text-slate-500">Official student communications</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 text-slate-400 rounded-full cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {feesDue > 0 && (
            <div className="p-4 bg-red-50/70 rounded-2xl border border-red-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-700 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" /> Term Fee Reminder
                </span>
                <span className="text-[10px] font-mono font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                  Due Oct 15
                </span>
              </div>
              <p className="text-xs text-red-900">
                You have an outstanding balance of <strong className="font-mono">₹{feesDue.toLocaleString()}</strong> for Semester IV. Please complete payment before the due date.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenPayFeeModal();
                }}
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Pay Now →
              </button>
            </div>
          )}

          <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Timetable Update
              </span>
              <span className="text-[10px] text-purple-600">Today</span>
            </div>
            <p className="text-xs text-purple-900">
              Operating Systems laboratory session relocated to OS Lab 2 for Friday afternoons.
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenTimetableModal();
              }}
              className="text-xs font-bold text-purple-700 hover:underline cursor-pointer"
            >
              View Schedule →
            </button>
          </div>

          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Leave Request Approved
              </span>
              <span className="text-[10px] text-emerald-600">Aug 01</span>
            </div>
            <p className="text-xs text-emerald-900">
              Your leave request for the National Hackathon Conference (Aug 15 - 18) was approved by Dr. Meenakshi Sundaram.
            </p>
          </div>
        </div>

        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
