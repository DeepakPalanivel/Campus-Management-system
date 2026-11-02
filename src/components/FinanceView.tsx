import React, { useState } from 'react';
import { 
  TrendingUp, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Download, 
  Plus, 
  CheckCircle, 
  AlertCircle, 
  PieChart, 
  FileText,
  DollarSign,
  Filter,
  Search,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { Transaction, BudgetHealthItem } from '../types';

interface FinanceViewProps {
  transactions: Transaction[];
  budgetHealth: BudgetHealthItem[];
  onOpenRecordTxnModal: () => void;
  onOpenStatementModal: () => void;
}

export const FinanceView: React.FC<FinanceViewProps> = ({
  transactions,
  budgetHealth,
  onOpenRecordTxnModal,
  onOpenStatementModal,
}) => {
  const [chartPeriod, setChartPeriod] = useState('Last 6 Months');
  const [txnSearch, setTxnSearch] = useState('');

  const monthlyChartData = [
    { month: 'Apr', income: 40, expense: 15 },
    { month: 'May', income: 60, expense: 20 },
    { month: 'Jun', income: 50, expense: 25 },
    { month: 'Jul', income: 70, expense: 30 },
    { month: 'Aug', income: 85, expense: 10 },
    { month: 'Sep', income: 45, expense: 15 },
  ];

  const filteredTxns = transactions.filter(t => 
    t.title.toLowerCase().includes(txnSearch.toLowerCase()) ||
    t.category.toLowerCase().includes(txnSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Financial Overview</h1>
          <p className="text-sm text-slate-500 font-medium">Accounts Team Dashboard • Real-time treasury logs</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenRecordTxnModal}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-2xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" /> Record Transaction
          </button>
          <button 
            onClick={onOpenStatementModal}
            className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm rounded-2xl border border-slate-200 transition-all flex items-center gap-2 cursor-pointer active:scale-95 shadow-xs"
          >
            <Download className="w-4 h-4 text-slate-500" /> Export Statement
          </button>
        </div>
      </div>

      {/* Net Balance Summary Card */}
      <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Balance</span>
          <div className="flex items-baseline gap-3 mt-1">
            <span className="text-4xl md:text-5xl font-extrabold text-slate-900 font-mono tracking-tight">₹24,80,000</span>
            <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
              <TrendingUp className="w-3.5 h-3.5 mr-1" /> +12.5%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">vs. previous calendar month</p>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1 md:w-44">
            <div className="text-xs font-medium text-slate-400 mb-1">Total Income</div>
            <div className="text-xl font-bold text-emerald-600 font-mono">₹32,50,000</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1 md:w-44">
            <div className="text-xs font-medium text-slate-400 mb-1">Total Expense</div>
            <div className="text-xl font-bold text-red-600 font-mono">₹7,70,000</div>
          </div>
        </div>
      </section>

      {/* Main Grid: Chart + Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Income vs Expense & Fee Collection */}
        <div className="lg:col-span-2 space-y-8">
          {/* Income vs Expense Chart */}
          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Income vs. Expense</h3>
                <p className="text-xs text-slate-500">Monthly breakdown of institutional cash flows</p>
              </div>
              <select 
                value={chartPeriod}
                onChange={(e) => setChartPeriod(e.target.value)}
                className="bg-slate-100 text-slate-800 text-xs font-bold py-1.5 px-3 rounded-xl border border-slate-200 focus:outline-none cursor-pointer"
              >
                <option>Last 6 Months</option>
                <option>This Year</option>
              </select>
            </div>

            {/* Bar Visualizer */}
            <div className="h-56 relative flex items-end justify-between pt-6 pb-2 border-b border-slate-100">
              <div className="w-full h-full flex justify-between items-end gap-3 px-2">
                {monthlyChartData.map((d) => (
                  <div key={d.month} className="flex gap-1.5 h-full items-end group w-full justify-center">
                    {/* Income Bar */}
                    <div 
                      className="w-1/3 bg-emerald-500 rounded-t-lg group-hover:bg-emerald-600 transition-all relative"
                      style={{ height: `${d.income}%` }}
                      title={`${d.month} Income: ₹${d.income * 50000}`}
                    />
                    {/* Expense Bar */}
                    <div 
                      className="w-1/3 bg-red-400 rounded-t-lg group-hover:bg-red-500 transition-all relative"
                      style={{ height: `${d.expense}%` }}
                      title={`${d.month} Expense: ₹${d.expense * 50000}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* X-Axis Labels */}
            <div className="flex justify-between mt-3 text-xs text-slate-400 font-medium">
              {monthlyChartData.map((d) => (
                <span key={d.month} className="w-full text-center">{d.month}</span>
              ))}
            </div>

            {/* Chart Legend */}
            <div className="flex justify-center gap-6 mt-6 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" /> Income
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" /> Expense
              </div>
            </div>
          </section>

          {/* Fee Collection Status */}
          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900">Fee Collection Status</h3>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                84% Collected
              </span>
            </div>

            <div className="flex justify-between items-baseline mb-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">₹4.2Cr</span>
              <span className="text-sm font-medium text-slate-400">Target: ₹5.0Cr</span>
            </div>

            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full transition-all duration-700" style={{ width: '84%' }}></div>
            </div>

            <div className="flex justify-between mt-3 text-xs font-medium text-slate-400">
              <span>Term 1</span>
              <span>Academic Year 2026-27</span>
            </div>
          </section>
        </div>

        {/* Right Column (1 Col): Recent Transactions & Budget Health */}
        <div className="space-y-8">
          {/* Recent Transactions */}
          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
                <button 
                  onClick={onOpenStatementModal}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>

              {/* Search Txn Input */}
              <div className="relative mb-4">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input 
                  type="text" 
                  value={txnSearch}
                  onChange={(e) => setTxnSearch(e.target.value)}
                  placeholder="Filter transactions..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-100 border-none rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="space-y-3">
                {filteredTxns.map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 hover:bg-slate-100/80 transition-colors border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        t.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {t.type === 'income' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate max-w-[120px]">{t.title}</div>
                        <div className="text-[10px] text-slate-400">{t.date}, {t.time}</div>
                      </div>
                    </div>
                    <span className={`text-xs font-mono font-bold ${
                      t.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={onOpenStatementModal}
              className="w-full mt-6 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-2xl text-xs font-bold text-slate-700 transition-colors uppercase tracking-wider cursor-pointer"
            >
              Download Full Statement
            </button>
          </section>

          {/* Budget Health */}
          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Budget Health</h3>
            <div className="space-y-4">
              {budgetHealth.map((b) => (
                <div key={b.id}>
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span className="font-bold text-slate-800">{b.department}</span>
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      b.status === 'Healthy' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      b.status === 'Warning' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {b.status}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        b.status === 'Healthy' ? 'bg-emerald-500' :
                        b.status === 'Warning' ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${b.utilizedPct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 text-right">{b.utilizedPct}% Utilized</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
