import React, { useState } from 'react';
import { X, Plus, DollarSign, Wallet } from 'lucide-react';
import { Transaction } from '../../types';

interface RecordTxnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (txn: Transaction) => void;
}

export const RecordTxnModal: React.FC<RecordTxnModalProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Transaction['category']>('Tuition Fee');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [amount, setAmount] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newTxn: Transaction = {
      id: `txn-${Date.now()}`,
      title,
      category,
      type,
      amount: parseFloat(amount),
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Completed',
      referenceId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`
    };

    onAddTransaction(newTxn);
    onClose();
    setTitle('');
    setAmount('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-100 shadow-2xl p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Record Transaction</h3>
              <p className="text-xs text-slate-500">Accounts Treasury Entry</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 text-slate-400 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Transaction Title</label>
            <input 
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Lab Equipment Procurement"
              className="w-full px-4 py-2.5 bg-slate-100 border-none rounded-2xl text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Type</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-slate-100 border-none rounded-2xl text-sm font-bold"
              >
                <option value="income">Income (+)</option>
                <option value="expense">Expense (-)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-slate-100 border-none rounded-2xl text-sm"
              >
                <option value="Tuition Fee">Tuition Fee</option>
                <option value="Vendor Payment">Vendor Payment</option>
                <option value="Utility">Utility</option>
                <option value="Grant">Grant</option>
                <option value="Payroll">Payroll</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Amount (₹)</label>
            <input 
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 45000"
              className="w-full px-4 py-2.5 bg-slate-100 border-none rounded-2xl text-sm font-mono font-bold"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Record Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
