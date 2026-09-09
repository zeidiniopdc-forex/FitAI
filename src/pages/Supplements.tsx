import { useApp } from '../context/AppContext';
import { Pill, Clock, AlertTriangle, Trash2 } from 'lucide-react';

export default function Supplements() {
  const { state, dispatch } = useApp();
  const { supplements } = state;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Pill size={28} className="text-purple-500" />
          مکمل‌های ورزشی
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">مکمل‌های پیشنهادی بر اساس تحلیل تغذیه</p>
      </div>

      {supplements.length > 0 ? (
        <div className="space-y-4">
          {supplements.map(sup => (
            <div key={sup.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Pill size={20} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white">{sup.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{sup.reason}</p>
                  </div>
                </div>
                <button onClick={() => dispatch({ type: 'SET_SUPPLEMENTS', payload: supplements.filter(s => s.id !== sup.id) })}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400">مقدار مصرف</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mt-1">{sup.dosage}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1"><Clock size={10} /> بهترین زمان</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mt-1">{sup.bestTime}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400">تعداد دفعات</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mt-1">{sup.frequency}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400">مدت مصرف</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mt-1">{sup.duration}</p>
                </div>
              </div>

              {sup.warnings.length > 0 && (
                <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <p className="text-xs font-medium text-amber-700 dark:text-amber-300 flex items-center gap-1 mb-1">
                    <AlertTriangle size={12} /> هشدارها
                  </p>
                  {sup.warnings.map((w, i) => (
                    <p key={i} className="text-xs text-amber-600 dark:text-amber-400 mr-3">• {w}</p>
                  ))}
                </div>
              )}

              {sup.contraindications.length > 0 && (
                <div className="mt-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <p className="text-xs font-medium text-red-700 dark:text-red-300 mb-1">🚫 موارد منع مصرف</p>
                  {sup.contraindications.map((c, i) => (
                    <p key={i} className="text-xs text-red-600 dark:text-red-400 mr-3">• {c}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Pill size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">مکملی ثبت نشده</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-4">برای دریافت پیشنهاد مکمل، ابتدا غذای روزانه خود را ثبت و تحلیل تغذیه را مشاهده کنید.</p>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          ⚕️ <strong>توجه مهم:</strong> قبل از مصرف هرگونه مکمل ورزشی، حتماً با پزشک یا متخصص تغذیه مشورت کنید.
          این پیشنهادات صرفاً بر اساس تحلیل عمومی تغذیه هستند و جایگزین توصیه پزشکی نیستند.
        </p>
      </div>
    </div>
  );
}
