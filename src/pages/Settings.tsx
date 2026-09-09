import { useApp } from '../context/AppContext';
import { Settings as SettingsIcon, Moon, Sun, Trash2, Download, Info } from 'lucide-react';

export default function Settings() {
  const { state, dispatch } = useApp();

  const handleClearData = () => {
    if (confirm('آیا مطمئن هستید؟ تمام اطلاعات حذف خواهد شد.')) {
      localStorage.removeItem('fitai_state');
      window.location.reload();
    }
  };

  const handleExportData = () => {
    const data = JSON.stringify(state, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitai_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <SettingsIcon size={28} className="text-slate-500" />
          تنظیمات
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">تنظیمات برنامه و حساب کاربری</p>
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">ظاهر</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {state.darkMode ? <Moon size={20} className="text-blue-400" /> : <Sun size={20} className="text-yellow-500" />}
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">حالت تاریک</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">تغییر ظاهر برنامه</p>
            </div>
          </div>
          <button onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
            className={`w-14 h-7 rounded-full transition-all relative ${state.darkMode ? 'bg-blue-500' : 'bg-slate-300'}`}>
            <div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-all ${state.darkMode ? 'left-1' : 'left-8'}`} />
          </button>
        </div>
      </div>

      {/* Data */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">مدیریت داده‌ها</h3>
        <div className="space-y-3">
          <button onClick={handleExportData}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
            <Download size={18} className="text-blue-500" />
            <div className="text-right">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">خروجی از اطلاعات</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">دانلود نسخه پشتیبان JSON</p>
            </div>
          </button>
          <button onClick={handleClearData}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 transition-all">
            <Trash2 size={18} className="text-red-500" />
            <div className="text-right">
              <p className="text-sm font-medium text-red-700 dark:text-red-300">حذف تمام اطلاعات</p>
              <p className="text-xs text-red-500 dark:text-red-400">این عمل قابل بازگشت نیست</p>
            </div>
          </button>
        </div>
      </div>

      {/* Install Guide */}
      <div className="bg-gradient-to-l from-primary-500 to-accent-500 rounded-2xl p-6 text-white">
        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
          📱 نصب روی موبایل
        </h3>
        <div className="space-y-3 text-sm">
          <div className="bg-white/10 rounded-xl p-3">
            <p className="font-medium mb-1">📲 اندروید (Chrome):</p>
            <p className="text-white/80 text-xs">منوی ⋮ → "Add to Home screen" یا "نصب اپلیکیشن"</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="font-medium mb-1">🍎 آیفون (Safari):</p>
            <p className="text-white/80 text-xs">دکمه Share → "Add to Home Screen"</p>
          </div>
          <p className="text-white/70 text-xs">
            💡 بعد از نصب، FitAI مانند اپلیکیشن روی گوشی اجرا می‌شود و حتی آفلاین هم کار می‌کند!
          </p>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Info size={18} className="text-blue-500" />
          درباره برنامه
        </h3>
        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <p><strong>FitAI</strong> - مربی هوشمند بدنسازی</p>
          <p>نسخه ۱.۰.۰</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
            این برنامه به‌عنوان یک ابزار کمکی طراحی شده و جایگزین مشاوره پزشکی و تخصصی نیست.
            قبل از شروع هر برنامه تمرینی یا تغذیه‌ای، با متخصص مربوطه مشورت کنید.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">آمار برنامه</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-center">
            <p className="text-xl font-bold text-primary-500">{state.weightLogs.length}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">ثبت وزن</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-center">
            <p className="text-xl font-bold text-green-500">{state.workoutLogs.length}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">ثبت تمرین</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-center">
            <p className="text-xl font-bold text-orange-500">{state.nutritionLogs.length}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">روز تغذیه</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-center">
            <p className="text-xl font-bold text-purple-500">{state.bodyPhotos.length}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">تصویر بدن</p>
          </div>
        </div>
      </div>
    </div>
  );
}
