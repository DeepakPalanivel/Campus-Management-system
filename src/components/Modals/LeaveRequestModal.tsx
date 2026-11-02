import React, { useState } from 'react';
import { X, Send, Calendar, CheckCircle2 } from 'lucide-react';
import { LeaveRequest } from '../../types';

interface LeaveRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentId: string;
  onSubmitLeave: (req: LeaveRequest) => void;
}

export const LeaveRequestModal: React.FC<LeaveRequestModalProps> = ({
  isOpen,
  onClose,
  studentName,
  studentId,
  onSubmitLeave,
}) => {
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('2026-08-12');
  const [endDate, setEndDate] = useState('2026-08-14');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return;

    const newReq: LeaveRequest = {
      id: `lvr-${Date.now()}`,
      studentName,
      studentId,
      reason,
      startDate,
      endDate,
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0]
    };

    onSubmitLeave(newReq);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setReason('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-100 shadow-2xl p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Academic Leave Request</h3>
              <p className="text-xs text-slate-500">Submit formal absence application</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 text-slate-400 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Request Submitted</h4>
            <p className="text-xs text-slate-500">
              Your leave request has been sent to the Department Head for review.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Reason for Leave</label>
              <textarea 
                required
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Attending National CS Symposium or Health Recovery..."
                className="w-full p-3 bg-slate-100 border-none rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Start Date</label>
                <input 
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-100 border-none rounded-xl text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">End Date</label>
                <input 
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-100 border-none rounded-xl text-xs font-mono"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
              <button 
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 cursor-pointer"
              >
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
