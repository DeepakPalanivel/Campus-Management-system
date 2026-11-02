import React from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Wallet, 
  User, 
  Calendar,
  HardDrive, 
  ShieldCheck, 
  ChevronRight,
  LogOut,
  HelpCircle,
  School
} from 'lucide-react';
import { UserRole, UserProfile } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: UserRole;
  currentUser: UserProfile;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  currentUser,
  onLogout,
}) => {
  // Define RBAC-specific navigation links
  const getNavItems = () => {
    if (userRole === 'student') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'academics', label: 'My Academics', icon: GraduationCap },
        { id: 'finance', label: 'My Fees & Invoices', icon: Wallet },
        { id: 'leave', label: 'Leave Requests', icon: Calendar },
        { id: 'profile', label: 'Student Profile', icon: User },
      ];
    }

    if (userRole === 'faculty') {
      return [
        { id: 'dashboard', label: 'Faculty Dashboard', icon: LayoutDashboard },
        { id: 'academics', label: 'Student Directory', icon: GraduationCap },
        { id: 'leave', label: 'Leave Approvals', icon: Calendar },
        { id: 'profile', label: 'Faculty Profile', icon: User },
      ];
    }

    // Admin role
    return [
      { id: 'dashboard', label: 'Campus Dashboard', icon: LayoutDashboard },
      { id: 'academics', label: 'Academics & Directory', icon: GraduationCap },
      { id: 'finance', label: 'Campus Finance', icon: Wallet },
      { id: 'leave', label: 'Leave Requests', icon: Calendar },
      { id: 'profile', label: 'System Settings', icon: User },
    ];
  };

  const navItems = getNavItems();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#0F172A] text-slate-300 h-screen sticky top-0 shrink-0 z-40 select-none">
      {/* Brand & Logo */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
            C
          </div>
          <div>
            <span className="text-white font-semibold text-lg tracking-tight block leading-tight">Campus Management</span>
            <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">by Deepak</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-medium cursor-pointer ${
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 font-semibold border border-blue-500/20 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-blue-400" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Role-Specific System / Assistance Widget */}
      <div className="mt-auto p-6 pt-0">
        {userRole === 'admin' ? (
          /* Admin-only Database Storage Monitor */
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/70">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-blue-400" /> Database Storage
              </div>
              <span className="text-[11px] font-bold text-green-400 bg-green-950/60 border border-green-500/30 px-1.5 py-0.5 rounded">Optimal</span>
            </div>
            <div className="h-1.5 bg-slate-700 rounded-full mb-3 overflow-hidden">
              <div className="w-3/4 h-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
            </div>
            <div className="text-xs flex justify-between text-slate-400">
              <span>7.8 / 10 GB used</span>
              <span className="text-blue-400 hover:underline cursor-pointer font-medium">Logs</span>
            </div>
          </div>
        ) : userRole === 'student' ? (
          /* Student Advisor Card */
          <div className="bg-slate-800/40 p-3.5 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-blue-400">
              <School className="w-3.5 h-3.5" /> Academic Advisor
            </div>
            <div className="text-xs font-bold text-white">Dr. Meenakshi Sundaram</div>
            <div className="text-[11px] text-slate-400 mt-0.5">m.sundaram@kiromaster.edu</div>
            <div className="text-[10px] text-slate-500 mt-1">Office: CS Block Room 204</div>
          </div>
        ) : (
          /* Faculty Portal Badge */
          <div className="bg-slate-800/40 p-3.5 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Department of CSE
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Academic Session 2026-27</div>
          </div>
        )}

        {/* User Profile Card */}
        <div className="mt-4 flex items-center justify-between gap-2 p-2.5 bg-slate-800/40 rounded-xl hover:bg-slate-800 transition-colors border border-slate-800 hover:border-slate-700">
          <div 
            onClick={() => setCurrentTab('profile')}
            className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
          >
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-8 h-8 rounded-full object-cover border border-slate-600 shrink-0" 
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">{currentUser.name}</div>
              <div className="text-[10px] text-slate-400 truncate capitalize font-medium">
                {currentUser.role} Portal
              </div>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            title="Sign Out"
            className="p-1.5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
