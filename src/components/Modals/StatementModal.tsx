import React from 'react';
import { X, Download, Printer, FileText, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Transaction } from '../../types';

interface StatementModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

export const StatementModal: React.FC<StatementModalProps> = ({
  isOpen,
  onClose,
  transactions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-100 shadow-2xl p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Institutional Financial Statement</h3>
              <p className="text-xs text-slate-500">Official Treasury Log • Q3 2026</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 text-slate-400 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="border border-slate-100 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-100 font-bold text-slate-600 uppercase">
                <th className="p-3 pl-4">Ref ID</th>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right pr-4">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="p-3 pl-4 font-mono font-bold text-slate-500">{t.referenceId}</td>
                  <td className="p-3 font-semibold text-slate-900">{t.title}</td>
                  <td className="p-3 text-slate-500">{t.category}</td>
                  <td className="p-3 text-slate-500">{t.date}</td>
                  <td className={`p-3 text-right pr-4 font-mono font-bold ${
                    t.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-4 flex justify-between items-center border-t border-slate-100">
          <span className="text-[11px] text-slate-400">Audit Ready • Kiro Master Finance</span>
          <div className="flex gap-3">
            <button 
              onClick={() => alert('Statement PDF generated & downloaded!')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" /> Download PDF Statement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
