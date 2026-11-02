import React, { useState } from 'react';
import { 
  CreditCard, 
  Wallet, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  FileText, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight,
  Info
} from 'lucide-react';

interface StudentFeesViewProps {
  studentName: string;
  studentId: string;
  department: string;
  feesDue: number;
  onOpenPayFeeModal: () => void;
}

export const StudentFeesView: React.FC<StudentFeesViewProps> = ({
  studentName,
  studentId,
  department,
  feesDue,
  onOpenPayFeeModal,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Student specific invoices & receipts history
  const receipts = [
    {
      id: 'REC-2026-081',
      term: 'Semester IV - 1st Installment',
      amount: 35000,
      paymentMethod: 'Net Banking (HDFC)',
      date: 'Aug 14, 2026',
      status: 'Paid',
      reference: 'TXN-89214731'
    },
    {
      id: 'REC-2026-015',
      term: 'Semester III - Full Term Fee',
      amount: 47500,
      paymentMethod: 'UPI (Google Pay)',
      date: 'Jan 10, 2026',
      status: 'Paid',
      reference: 'TXN-77312904'
    },
    {
      id: 'REC-2025-442',
      term: 'Semester II - Full Term Fee',
      amount: 45000,
      paymentMethod: 'Debit Card (SBI)',
      date: 'Aug 12, 2025',
      status: 'Paid',
      reference: 'TXN-66120853'
    }
  ];

  const handleDownloadReceipt = (recId: string) => {
    setDownloadSuccess(recId);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md">
              Student Finance Portal
            </span>
            <span className="text-xs font-mono text-slate-500">ID: {studentId}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            My Fees & Receipts
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Personal tuition invoice, fee installment schedules, and official payment receipts.
          </p>
        </div>

        {feesDue > 0 && (
          <button
            onClick={onOpenPayFeeModal}
            className="px-6 py-3 bg-blue-900 hover:bg-blue-950 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-950/20 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>Pay Tuition Fee (₹{feesDue.toLocaleString()})</span>
          </button>
        )}
      </div>

      {/* Main Fee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Outstanding Dues Card */}
        <div className={`p-6 rounded-3xl border shadow-xs flex flex-col justify-between ${
          feesDue > 0 ? 'bg-red-50/40 border-red-200' : 'bg-emerald-50/40 border-emerald-200'
        }`}>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Current Term Balance
              </span>
              <div className={`p-2 rounded-xl ${feesDue > 0 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className={`text-3xl sm:text-4xl font-extrabold font-mono mt-3 ${
              feesDue > 0 ? 'text-red-600' : 'text-emerald-700'
            }`}>
              ₹{feesDue.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {feesDue > 0 ? 'Outstanding 2nd installment for Semester IV' : 'All semester dues are fully cleared.'}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/60">
            {feesDue > 0 ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-red-700">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                <span>Due Date: October 15, 2026</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Zero pending charges</span>
              </div>
            )}
          </div>
        </div>

        {/* Total Semester Fee */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Semester IV Total
              </span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 mt-3">
              ₹47,500
            </div>
            <p className="text-xs text-slate-500 mt-1">Tuition, laboratories, exams, and amenities</p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Paid so far:</span>
            <span className="font-bold text-emerald-600 font-mono">₹35,000</span>
          </div>
        </div>

        {/* Security / Payment Mode */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Payment Security
              </span>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-base font-bold text-slate-900 mt-3">Instant Digital Clearance</div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Supports UPI, RuPay, Visa, MasterCard, and NetBanking with instant automated e-receipts.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Campus Payment Gateway Online</span>
          </div>
        </div>
      </div>

      {/* Semester Fee Breakdown Table */}
      <section className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> Semester IV Fee Itemization
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Official institutional fee structure breakdown for Bachelor of Technology in {department}.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">Term: Spring/Fall 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4 pl-6">Fee Component</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Paid</th>
                <th className="p-4">Due Balance</th>
                <th className="p-4 text-right pr-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              <tr className="hover:bg-slate-50/60">
                <td className="p-4 pl-6 font-semibold text-slate-900">
                  Tuition Fee (Core Curriculum)
                  <span className="block text-xs text-slate-400 font-normal">Covers lectures and academic faculty</span>
                </td>
                <td className="p-4 font-mono text-slate-700">₹35,000</td>
                <td className="p-4 font-mono text-emerald-600 font-semibold">₹25,000</td>
                <td className="p-4 font-mono text-red-600 font-bold">₹10,000</td>
                <td className="p-4 text-right pr-6">
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-200">
                    Partial
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="p-4 pl-6 font-semibold text-slate-900">
                  Computer Labs & Cloud Infrastructure
                  <span className="block text-xs text-slate-400 font-normal">High-performance computing and network access</span>
                </td>
                <td className="p-4 font-mono text-slate-700">₹8,000</td>
                <td className="p-4 font-mono text-emerald-600 font-semibold">₹8,000</td>
                <td className="p-4 font-mono text-slate-400">₹0</td>
                <td className="p-4 text-right pr-6">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
                    Paid Full
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="p-4 pl-6 font-semibold text-slate-900">
                  Semester End Examination & Evaluation
                  <span className="block text-xs text-slate-400 font-normal">Board examination registration and transcript generation</span>
                </td>
                <td className="p-4 font-mono text-slate-700">₹2,500</td>
                <td className="p-4 font-mono text-slate-400">₹0</td>
                <td className="p-4 font-mono text-red-600 font-bold">₹2,500</td>
                <td className="p-4 text-right pr-6">
                  <span className="px-2.5 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-lg border border-red-200">
                    Due
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="p-4 pl-6 font-semibold text-slate-900">
                  Student Welfare, Library & Sports Amenities
                  <span className="block text-xs text-slate-400 font-normal">Campus gym, library book bank, and medical room</span>
                </td>
                <td className="p-4 font-mono text-slate-700">₹2,000</td>
                <td className="p-4 font-mono text-emerald-600 font-semibold">₹2,000</td>
                <td className="p-4 font-mono text-slate-400">₹0</td>
                <td className="p-4 text-right pr-6">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
                    Paid Full
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Payment History & Receipts */}
      <section className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Download className="w-5 h-5 text-emerald-600" /> Past Payment Receipts
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Download tax-compliant official receipts issued by the University Bursar's Office.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {receipts.map((rec) => (
            <div key={rec.id} className="p-6 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                    {rec.id}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{rec.reference}</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {rec.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{rec.term}</h3>
                <div className="text-xs text-slate-500 flex items-center gap-3">
                  <span>Method: {rec.paymentMethod}</span>
                  <span>•</span>
                  <span>Date: {rec.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div className="text-base font-extrabold font-mono text-slate-900">
                    ₹{rec.amount.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400">Total Cleared</div>
                </div>

                <button
                  onClick={() => handleDownloadReceipt(rec.id)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloadSuccess === rec.id ? 'Downloaded ✓' : 'Download Receipt'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
