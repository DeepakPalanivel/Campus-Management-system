import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Building2, 
  User, 
  GraduationCap, 
  ShieldAlert,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { UserRole, UserProfile } from '../types';
import { mockUsers } from '../data/mockData';

interface LoginPageProps {
  users: UserProfile[];
  onLogin: (user: UserProfile, role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ users, onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [identifier, setIdentifier] = useState('deepak');
  const [password, setPassword] = useState('deepak@2826');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setError('');
    if (role === 'admin') {
      setIdentifier('deepak');
      setPassword('deepak@2826');
    } else if (role === 'student') {
      setIdentifier('aryan.sharma@kiromaster.edu');
      setPassword('student123');
    } else {
      setIdentifier('m.sundaram@kiromaster.edu');
      setPassword('faculty123');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedId = identifier.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (!trimmedId || !trimmedPass) {
      setError('Please enter both your email/username and password.');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      
      // Check credentials against registered user accounts
      const matchedUser = users.find(u => {
        const emailMatch = u.email?.toLowerCase() === trimmedId;
        const usernameMatch = u.username?.toLowerCase() === trimmedId;
        const nameMatch = u.name?.toLowerCase() === trimmedId;
        const passMatch = u.password === trimmedPass;

        return (emailMatch || usernameMatch || nameMatch) && passMatch;
      });

      if (matchedUser) {
        onLogin(matchedUser, matchedUser.role);
      } else {
        setError('Incorrect username/email or password. Please try again.');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-[#0F172A] flex items-center justify-center p-4 md:p-8 font-sans text-slate-100 relative overflow-hidden">
      {/* Background Accent Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-slate-900/90 rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden backdrop-blur-xl relative z-10">
        
        {/* Left Side: Brand Panel */}
        <div className="p-8 md:p-10 bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-950 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/30">
                C
              </div>
              <div>
                <span className="text-white font-bold text-xl tracking-tight block">Campus Management</span>
                <span className="text-xs uppercase font-bold text-blue-400 tracking-widest">by Deepak</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Institutional Governance & Student Operating System
            </h1>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Real-time monitoring, financial ledger tracking, student records, and academic scheduling in one unified portal.
            </p>

            <div className="mt-8 space-y-3.5">
              {[
                '256-Bit Financial Encryption & Security',
                'Role-Based RBAC Access Control',
                'Real-Time Campus Alert Broadcasts',
                'Integrated Fee Clearance & Transcripts'
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Server: Active (Cloud Run)</span>
            <span>v2.4.0 Secure</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Sign In to Your Account</h2>
            <p className="text-xs text-slate-400 mt-1">Select your access role to proceed</p>
          </div>

          {/* Quick Role Selection Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800 mb-6">
            {[
              { id: 'admin', label: 'Admin', icon: ShieldCheck },
              { id: 'student', label: 'Student', icon: User },
              { id: 'faculty', label: 'Faculty', icon: GraduationCap }
            ].map(r => {
              const Icon = r.icon;
              const isSel = selectedRole === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleRoleSelect(r.id as UserRole)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSel 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-950/60 border border-red-500/30 text-red-400 rounded-xl text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Username or Institutional Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input 
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Username (e.g. deepak) or email"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" onClick={(e) => { e.preventDefault(); alert('Demo password reset request logged.'); }} className="text-[10px] text-blue-400 hover:underline font-medium">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center flex flex-col items-center gap-1">
            <span className="text-[11px] text-slate-500 font-medium">
              Only Admin can create new user accounts inside the system.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
