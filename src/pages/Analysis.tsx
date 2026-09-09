import { useApp } from '../context/AppContext';
import { calculateNutritionNeeds, analyzeNutrition } from '../utils/ai';
import { TrendingUp, AlertTriangle, CheckCircle2, Pill, Info } from 'lucide-react';

export default function Analysis() {
  const { state, dispatch } = useApp();
  const { profile, nutritionLogs, supplements } = state;
  const today = new Date().toISOString().split('T')[0];
  const todayLog = nutritionLogs.find(n => n.date === today);

  if (!profile) {
    return (
      <div className="text-center py-20">
        <TrendingUp size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">ابتدا پروفایل خود را تکمیل کنید</h2>
      </div>
    );
  }

  const needs = calculateNutritionNeeds(profile);
  const intake = {
    calories: todayLog?.totalCalories || 0,
    protein: todayLog?.totalProtein || 0,
    carbs: todayLog?.totalCarbs || 0,
    fat: todayLog?.totalFat || 0,
  };
  const analysis = analyzeNutrition(intake, needs);

  const handleSaveSupplements = () => {
    dispatch({ type: 'SET_SUPPLEMENTS', payload: analysis.supplementSuggestions });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <TrendingUp size={28} className="text-blue-500" />
          تحلیل تغذیه
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">تحلیل هوشمند دریافت غذایی شما</p>
      </div>

      {/* Overview */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">وضعیت دریافت امروز</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MacroBar label="کالری" value={intake.calories} target={needs.calories} unit="کالری" color="#f59e0b" />
          <MacroBar label="پروتئین" value={intake.protein} target={needs.protein} unit="گرم" color="#3b82f6" />
          <MacroBar label="کربوهیدرات" value={intake.carbs} target={needs.carbs} unit="گرم" color="#10b981" />
          <MacroBar label="چربی" value={intake.fat} target={needs.fat} unit="گرم" color="#8b5cf6" />
        </div>
      </div>

      {/* Deficiencies */}
      {analysis.deficiencies.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
          <h3 className="font-bold text-red-700 dark:text-red-300 flex items-center gap-2 mb-3">
            <AlertTriangle size={20} />
            کمبودهای تغذیه‌ای
          </h3>
          <ul className="space-y-2">
            {analysis.deficiencies.map((d, i) => (
              <li key={i} className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Surpluses */}
      {analysis.surpluses.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
          <h3 className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-2 mb-3">
            <AlertTriangle size={20} />
            مازاد دریافتی
          </h3>
          <ul className="space-y-2">
            {analysis.surpluses.map((s, i) => (
              <li key={i} className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-3">
          <Info size={20} className="text-blue-500" />
          توصیه‌های تغذیه‌ای
        </h3>
        <ul className="space-y-2">
          {analysis.recommendations.map((r, i) => (
            <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
              <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Supplement Suggestions */}
      {analysis.supplementSuggestions.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Pill size={20} className="text-purple-500" />
              مکمل‌های پیشنهادی
            </h3>
            <button onClick={handleSaveSupplements}
              className="px-4 py-2 rounded-xl bg-purple-500 text-white text-sm font-medium hover:bg-purple-600">
              ذخیره مکمل‌ها
            </button>
          </div>
          <div className="space-y-4">
            {analysis.supplementSuggestions.map(sup => (
              <div key={sup.id} className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800">
                <h4 className="font-bold text-purple-700 dark:text-purple-300">{sup.name}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">📌 دلیل: {sup.reason}</p>
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-700">
                    <span className="text-slate-500 dark:text-slate-400">مقدار:</span>
                    <span className="text-slate-700 dark:text-slate-200 mr-1">{sup.dosage}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-700">
                    <span className="text-slate-500 dark:text-slate-400">زمان:</span>
                    <span className="text-slate-700 dark:text-slate-200 mr-1">{sup.bestTime}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-700">
                    <span className="text-slate-500 dark:text-slate-400">تکرار:</span>
                    <span className="text-slate-700 dark:text-slate-200 mr-1">{sup.frequency}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-700">
                    <span className="text-slate-500 dark:text-slate-400">مدت:</span>
                    <span className="text-slate-700 dark:text-slate-200 mr-1">{sup.duration}</span>
                  </div>
                </div>
                {sup.warnings.length > 0 && (
                  <div className="mt-3 p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                    <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">⚠️ هشدارها:</p>
                    {sup.warnings.map((w, i) => (
                      <p key={i} className="text-xs text-amber-600 dark:text-amber-400 mr-2">• {w}</p>
                    ))}
                  </div>
                )}
                {sup.contraindications.length > 0 && (
                  <div className="mt-2 p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
                    <p className="text-xs text-red-700 dark:text-red-300 font-medium">🚫 موارد منع مصرف:</p>
                    {sup.contraindications.map((c, i) => (
                      <p key={i} className="text-xs text-red-600 dark:text-red-400 mr-2">• {c}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              ⚕️ توجه: این پیشنهادات بر اساس تحلیل عمومی هستند. قبل از مصرف هر مکملی با پزشک یا متخصص تغذیه مشورت کنید.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function MacroBar({ label, value, target, unit, color }: { label: string; value: number; target: number; unit: string; color: string }) {
  const percent = target > 0 ? Math.min(100, Math.round((value / target) * 100)) : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
        <span className="text-xs text-slate-600 dark:text-slate-300">{value}/{target} {unit}</span>
      </div>
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${percent}%`, backgroundColor: color }} />
      </div>
      <p className="text-xs text-center mt-1 font-medium" style={{ color }}>{percent}%</p>
    </div>
  );
}
