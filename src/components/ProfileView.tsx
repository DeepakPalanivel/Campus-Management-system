import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Key, 
  Bell, 
  CheckCircle2, 
  Building, 
  Sparkles,
  Sliders,
  LogOut
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface ProfileViewProps {
  currentUser: UserProfile;
  userRole: UserRole;
  setUserRole?: (role: UserRole) => void;
  onLogout?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  userRole,
  onLogout,
}) => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSavePreferences = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Profile & System Settings</h1>
        <p className="text-sm text-slate-500 font-medium">
          Manage your institutional identity and security credentials.
        </p>
      </div>

      {/* User Identity Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-sm shrink-0"
          />
          <div className="text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-2xl font-bold text-slate-900">{currentUser.name}</h2>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-extrabold uppercase rounded-full w-fit mx-auto sm:mx-0">
                {currentUser.role}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">{currentUser.email}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">
                <Building className="w-4 h-4 text-slate-400" /> {currentUser.department}
              </span>
              {currentUser.studentId && (
                <span className="flex items-center gap-1.5 font-mono">
                  ID: {currentUser.studentId}
                </span>
              )}
            </div>
          </div>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-xl border border-red-200 flex items-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        )}
      </div>

      {/* Security & Notifications Form */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-600" /> Security & Notification Preferences
          </h3>
          <p className="text-xs text-slate-500">Configure multi-factor authentication and alert channels.</p>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <div className="text-sm font-bold text-slate-900">Two-Factor Authentication (2FA)</div>
              <div className="text-xs text-slate-500">Requires an authenticator code during admin sign-in.</div>
            </div>
            <input 
              type="checkbox" 
              checked={twoFactorAuth} 
              onChange={(e) => setTwoFactorAuth(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <div className="text-sm font-bold text-slate-900">Email Notifications</div>
              <div className="text-xs text-slate-500">Receive fee due dates, grade updates, and alerts via email.</div>
            </div>
            <input 
              type="checkbox" 
              checked={emailNotifications} 
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <div className="text-sm font-bold text-slate-900">SMS Urgent Alerts</div>
              <div className="text-xs text-slate-500">Receive instant mobile text messages for emergency notifications.</div>
            </div>
            <input 
              type="checkbox" 
              checked={smsAlerts} 
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {savedSuccess ? (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Preferences saved successfully!
            </span>
          ) : <div />}

          <button 
            onClick={handleSavePreferences}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-md shadow-blue-500/20 transition-all cursor-pointer active:scale-95"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
