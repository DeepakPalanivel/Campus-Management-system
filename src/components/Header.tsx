import React from 'react';
import { Search, Bell, Menu, X, LogOut, CheckCircle2, Shield } from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface HeaderProps {
  currentTab: string;
  currentUser: UserProfile;
  userRole: UserRole;
  unreadAlertsCount: number;
  onOpenSearch: () => void;
  onOpenAlertsModal: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  currentUser,
  userRole,
  unreadAlertsCount,
  onOpenSearch,
  onOpenAlertsModal,
  mobileMenuOpen,
  setMobileMenuOpen,
  onTabChange,
  onLogout,
}) => {
  // Role-based title resolution
  const getTabTitle = () => {
    if (userRole === 'student') {
      const titles: Record<string, string> = {
        dashboard: 'Student Dashboard',
        academics: 'My Courses & Academics',
        finance: 'My Fees & Receipts',
        leave: 'Leave & Attendance Applications',
        profile: 'Student Profile & Settings'
      };
      return titles[currentTab] || 'Student Portal';
    }

    if (userRole === 'faculty') {
      const titles: Record<string, string> = {
        dashboard: 'Faculty Overview',
        academics: 'Student Directory & Performance',
        leave: 'Department Leave Approvals',
        profile: 'Faculty Profile & Settings'
      };
      return titles[currentTab] || 'Faculty Portal';
    }

    // Admin
    const titles: Record<string, string> = {
      dashboard: 'Campus Overview',
      academics: 'Academics & Students Directory',
      finance: 'Financial Management Overview',
      leave: 'Student Leave Management',
      profile: 'System Settings & Profile'
    };
    return titles[currentTab] || 'Campus Admin';
  };

  // Nav links for mobile dropdown matching user role
  const getMobileTabs = () => {
    if (userRole === 'student') {
      return [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'academics', label: 'My Academics' },
        { id: 'finance', label: 'My Fees' },
        { id: 'leave', label: 'Leave' },
        { id: 'profile', label: 'Profile' }
      ];
    }
    if (userRole === 'faculty') {
      return [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'academics', label: 'Students' },
        { id: 'leave', label: 'Leaves' },
        { id: 'profile', label: 'Profile' }
      ];
    }
    return [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'academics', label: 'Academics' },
      { id: 'finance', label: 'Finance' },
      { id: 'leave', label: 'Leaves' },
      { id: 'profile', label: 'Profile' }
    ];
  };

  return (
    <>
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-10 sticky top-0 z-30 shadow-xs">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                {getTabTitle()}
              </h1>
              <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full border ${
                userRole === 'student'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : userRole === 'admin'
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {userRole}
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block mt-0.5">
              {userRole === 'admin' && 'Central Admin System • Real-time Monitoring & User Controls'}
              {userRole === 'student' && `Logged in as ${currentUser.name} • ${currentUser.department}`}
              {userRole === 'faculty' && `Faculty Portal • ${currentUser.department}`}
            </p>
          </div>
        </div>

        {/* Right: Search, Notifications, Profile */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Quick Search */}
          <div 
            onClick={onOpenSearch}
            className="relative w-44 sm:w-64 cursor-pointer group"
          >
            <input 
              type="text" 
              readOnly
              placeholder={userRole === 'student' ? 'Search courses, schedule, results...' : 'Search campus data...'} 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none group-hover:bg-slate-200/80 transition-all cursor-pointer" 
            />
            <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </div>

          {/* Notifications Button */}
          <button 
            onClick={onOpenAlertsModal}
            className="relative p-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-full transition-colors active:scale-95 cursor-pointer"
            title={userRole === 'student' ? 'Student Notices' : 'Campus Alerts'}
          >
            <Bell className="w-5 h-5 text-slate-700" />
            {unreadAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-full transition-colors active:scale-95 cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>

          {/* User Badge */}
          <div 
            onClick={() => onTabChange('profile')}
            className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200 cursor-pointer group"
          >
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border-2 border-white shadow-sm group-hover:ring-2 group-hover:ring-blue-500 transition-all"
            />
            <div className="hidden lg:block text-left">
              <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate max-w-[120px]">
                {currentUser.name}
              </div>
              <div className="text-[11px] font-medium text-slate-500 capitalize">
                {currentUser.role}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown (strictly filtered without arbitrary role switching) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F172A] text-slate-300 p-6 border-b border-slate-800 animate-fadeIn space-y-4 z-40 relative">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs uppercase font-bold text-slate-400">Authenticated Role:</span>
            <span className="px-2.5 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold text-xs rounded-lg uppercase">
              {userRole}
            </span>
          </div>

          <nav className="grid grid-cols-2 gap-2">
            {getMobileTabs().map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-xl text-center font-medium text-sm transition-all cursor-pointer ${
                  currentTab === tab.id
                    ? 'bg-blue-600/20 text-blue-400 font-bold border border-blue-500/30'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onLogout();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-950/40 hover:bg-red-900/50 text-red-400 border border-red-800/50 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </div>
      )}
    </>
  );
};
