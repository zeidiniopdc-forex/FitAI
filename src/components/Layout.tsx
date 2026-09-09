import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard, User, Dumbbell, Calendar, Apple, BookOpen,
  TrendingUp, Camera, Bell, Settings, Pill, Menu, X, Sun, Moon,
  ChevronLeft, Zap
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
  { id: 'profile', label: 'پروفایل', icon: User },
  { id: 'assessment', label: 'ارزیابی بدنی', icon: TrendingUp },
  { id: 'photos', label: 'تصاویر بدن', icon: Camera },
  { id: 'workout', label: 'برنامه تمرینی', icon: Dumbbell },
  { id: 'compact', label: 'برنامه فشرده', icon: Zap },
  { id: 'calendar', label: 'تقویم تمرین', icon: Calendar },
  { id: 'nutrition', label: 'ثبت غذا', icon: Apple },
  { id: 'foodbank', label: 'بانک غذا', icon: BookOpen },
  { id: 'analysis', label: 'تحلیل تغذیه', icon: TrendingUp },
  { id: 'supplements', label: 'مکمل‌ها', icon: Pill },
  { id: 'reminders', label: 'یادآورها', icon: Bell },
  { id: 'progress', label: 'پیشرفت', icon: TrendingUp },
  { id: 'settings', label: 'تنظیمات', icon: Settings },
];

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const { state, dispatch } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 right-0 left-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-lg font-bold text-primary-600 dark:text-primary-400">FitAI</h1>
        <button onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
          {state.darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 z-40 h-full w-72 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 overflow-y-auto`}>
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Dumbbell size={20} className="text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-slate-800 dark:text-white">FitAI</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">مربی هوشمند بدنسازی</p>
              </div>
            </div>
            <button className="lg:hidden p-1" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>
        </div>
        
        <nav className="p-4 space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                currentPage === item.id
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
          >
            {state.darkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span>{state.darkMode ? 'حالت روشن' : 'حالت تاریک'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:mr-72 min-h-screen pt-16 lg:pt-0">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
