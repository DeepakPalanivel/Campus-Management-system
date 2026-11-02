import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

interface PayFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  feesDue: number;
  onPaymentSuccess: () => void;
}

export const PayFeeModal: React.FC<PayFeeModalProps> = ({
  isOpen,
  onClose,
  feesDue,
  onPaymentSuccess,
}) => {
  const [method, setMethod] = useState<'card' | 'upi' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        onPaymentSuccess();
        setSuccess(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-100 shadow-2xl p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Institutional Fee Clearance</h3>
              <p className="text-xs text-slate-500">Official Kiro Master Portal</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 text-slate-400 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-3 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Payment Successful!</h4>
            <p className="text-xs text-slate-500">
              Receipt #RCP-2026-9021 generated and sent to student email.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-xs text-slate-500 uppercase font-semibold">Total Amount Due</span>
              <div className="text-3xl font-extrabold text-slate-900 font-mono mt-1">₹{feesDue.toLocaleString()}</div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'upi', label: 'UPI / QR' },
                  { id: 'card', label: 'Debit/Credit Card' },
                  { id: 'netbanking', label: 'Net Banking' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMethod(item.id as any)}
                    className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      method === item.id 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {method === 'upi' && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
                <div className="text-xs text-slate-500">Scan QR Code or Enter VPA</div>
                <input 
                  type="text" 
                  defaultValue="aryan.sharma@okaxis" 
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-center font-mono font-bold"
                />
              </div>
            )}

            {method === 'card' && (
              <div className="space-y-3">
                <input type="text" placeholder="Card Number" defaultValue="4242 •••• •••• 4242" className="w-full px-3 py-2 bg-slate-100 border-none rounded-xl text-xs font-mono" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="MM/YY" defaultValue="12/28" className="w-full px-3 py-2 bg-slate-100 border-none rounded-xl text-xs font-mono" />
                  <input type="password" placeholder="CVV" defaultValue="123" className="w-full px-3 py-2 bg-slate-100 border-none rounded-xl text-xs font-mono" />
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Encrypted SSL 256-Bit Financial Gateway</span>
            </div>

            <button 
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/20 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isProcessing ? 'Processing Transaction...' : `Confirm & Pay ₹${feesDue.toLocaleString()}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
