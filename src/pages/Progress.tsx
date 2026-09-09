import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, Weight, Plus, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

export default function Progress() {
  const { state, dispatch } = useApp();
  const { weightLogs, workoutLogs, nutritionLogs, profile } = state;
  const [showAddWeight, setShowAddWeight] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [newBodyFat, setNewBodyFat] = useState('');

  const handleAddWeight = () => {
    if (!newWeight) return;
    dispatch({
      type: 'ADD_WEIGHT_LOG',
      payload: {
        date: new Date().toISOString().split('T')[0],
        weight: parseFloat(newWeight),
        bodyFat: newBodyFat ? parseFloat(newBodyFat) : undefined,
      }
    });
    setShowAddWeight(false);
    setNewWeight('');
    setNewBodyFat('');
  };

  const weightData = weightLogs.map(w => ({ date: w.date.slice(5), weight: w.weight, bodyFat: w.bodyFat }));
  
  const last7DaysNutrition = nutritionLogs.slice(-7).map(n => ({
    date: n.date.slice(5),
    calories: n.totalCalories,
    protein: n.totalProtein,
    carbs: n.totalCarbs,
    fat: n.totalFat,
  }));

  const totalWorkouts = workoutLogs.filter(l => l.completed).length;
  const weightChange = weightLogs.length >= 2 ? weightLogs[weightLogs.length - 1].weight - weightLogs[0].weight : 0;

  const radarData = profile ? [
    { metric: 'پروتئین', value: Math.min(100, ((nutritionLogs[nutritionLogs.length - 1]?.totalProtein || 0) / (profile.weight * 2)) * 100) },
    { metric: 'کالری', value: 75 },
    { metric: 'تمرین', value: Math.min(100, (totalWorkouts / 20) * 100) },
    { metric: 'آب', value: 60 },
    { metric: 'خواب', value: 70 },
    { metric: 'ریکاوری', value: 80 },
  ] : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <TrendingUp size={28} className="text-green-500" />
            داشبورد پیشرفت
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">روند تغییرات و پیشرفت شما</p>
        </div>
        <button onClick={() => setShowAddWeight(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600">
          <Plus size={16} />
          ثبت وزن
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400">وزن فعلی</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].weight : profile?.weight || '-'} kg</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400">تغییر وزن</p>
          <p className={`text-2xl font-bold ${weightChange <= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400">تمرینات انجام‌شده</p>
          <p className="text-2xl font-bold text-primary-500">{totalWorkouts}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400">دوره فعلی</p>
          <p className="text-2xl font-bold text-accent-500">{state.currentPeriod}</p>
        </div>
      </div>

      {/* Weight Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Weight size={20} className="text-blue-500" />
          روند وزن
        </h3>
        {weightData.length > 1 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" domain={['auto', 'auto']} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9' }} />
              <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[250px] flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm">
            حداقل ۲ بار وزن خود را ثبت کنید تا نمودار نمایش داده شود.
          </div>
        )}
      </div>

      {/* Nutrition Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">دریافت هفتگی ماکروها</h3>
        {last7DaysNutrition.length > 1 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={last7DaysNutrition}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9' }} />
              <Bar dataKey="protein" fill="#3b82f6" name="پروتئین" radius={[2, 2, 0, 0]} />
              <Bar dataKey="carbs" fill="#10b981" name="کربوهیدرات" radius={[2, 2, 0, 0]} />
              <Bar dataKey="fat" fill="#8b5cf6" name="چربی" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[250px] flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm">
            غذای روزانه خود را ثبت کنید.
          </div>
        )}
      </div>

      {/* Radar Chart */}
      {radarData.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4">عملکرد کلی</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#475569" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Radar name="عملکرد" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Weight Log History */}
      {weightLogs.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-purple-500" />
            تاریخچه وزن
          </h3>
          <div className="space-y-2">
            {weightLogs.slice(-10).reverse().map((log, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <span className="text-sm text-slate-600 dark:text-slate-300">{log.date}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-slate-800 dark:text-white">{log.weight} kg</span>
                  {log.bodyFat && <span className="text-xs text-slate-500 dark:text-slate-400">چربی: {log.bodyFat}%</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Weight Modal */}
      {showAddWeight && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">ثبت وزن</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">وزن (کیلوگرم)</label>
                <input type="number" value={newWeight} onChange={e => setNewWeight(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">درصد چربی (اختیاری)</label>
                <input type="number" value={newBodyFat} onChange={e => setNewBodyFat(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleAddWeight}
                className="flex-1 py-3 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600">
                ذخیره
              </button>
              <button onClick={() => setShowAddWeight(false)}
                className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
