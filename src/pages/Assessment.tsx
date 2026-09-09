import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, Ruler, Weight, Activity, Target } from 'lucide-react';

export default function Assessment() {
  const { state, dispatch } = useApp();
  const { profile, weightLogs, workoutPlan } = state;
  const [newWeight, setNewWeight] = useState('');
  const [newBodyFat, setNewBodyFat] = useState('');
  const [newWaist, setNewWaist] = useState('');
  const [newChest, setNewChest] = useState('');
  const [newArm, setNewArm] = useState('');
  const [newThigh, setNewThigh] = useState('');

  if (!profile) {
    return (
      <div className="text-center py-20">
        <TrendingUp size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">ابتدا پروفایل خود را تکمیل کنید</h2>
      </div>
    );
  }

  const bmi = profile.weight / ((profile.height / 100) ** 2);
  const latestWeight = weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].weight : profile.weight;
  const weightChange = weightLogs.length >= 2 ? weightLogs[weightLogs.length - 1].weight - weightLogs[0].weight : 0;

  const handleSaveWeight = () => {
    if (!newWeight) return;
    dispatch({
      type: 'ADD_WEIGHT_LOG',
      payload: {
        date: new Date().toISOString().split('T')[0],
        weight: parseFloat(newWeight),
        bodyFat: newBodyFat ? parseFloat(newBodyFat) : undefined,
      }
    });
    setNewWeight('');
    setNewBodyFat('');
  };

  const getBmiCategory = () => {
    if (bmi < 18.5) return { label: 'لاغر', color: 'text-blue-500' };
    if (bmi < 25) return { label: 'نرمال', color: 'text-green-500' };
    if (bmi < 30) return { label: 'اضافه وزن', color: 'text-yellow-500' };
    return { label: 'چاق', color: 'text-red-500' };
  };

  const bmiCategory = getBmiCategory();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <TrendingUp size={28} className="text-teal-500" />
          ارزیابی بدنی
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">شاخص‌های بدنی و اندازه‌گیری‌ها</p>
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Weight size={16} className="text-blue-500" />
            <span className="text-xs text-slate-500 dark:text-slate-400">وزن فعلی</span>
          </div>
          <p className="text-xl font-bold text-slate-800 dark:text-white">{latestWeight} kg</p>
          {weightChange !== 0 && (
            <p className={`text-xs mt-1 ${weightChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
              {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg
            </p>
          )}
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Ruler size={16} className="text-purple-500" />
            <span className="text-xs text-slate-500 dark:text-slate-400">BMI</span>
          </div>
          <p className="text-xl font-bold text-slate-800 dark:text-white">{bmi.toFixed(1)}</p>
          <p className={`text-xs mt-1 ${bmiCategory.color}`}>{bmiCategory.label}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-green-500" />
            <span className="text-xs text-slate-500 dark:text-slate-400">وزن هدف</span>
          </div>
          <p className="text-xl font-bold text-slate-800 dark:text-white">{profile.targetWeight || '-'} kg</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {profile.targetWeight ? `${Math.abs(latestWeight - profile.targetWeight).toFixed(1)} kg مانده` : ''}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="text-orange-500" />
            <span className="text-xs text-slate-500 dark:text-slate-400">درصد چربی</span>
          </div>
          <p className="text-xl font-bold text-slate-800 dark:text-white">
            {weightLogs.find(w => w.bodyFat)?.bodyFat || profile.bodyFat || '-'}%
          </p>
        </div>
      </div>

      {/* Record Weight */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">ثبت اندازه‌گیری جدید</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">وزن (kg)</label>
            <input type="number" value={newWeight} onChange={e => setNewWeight(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white text-sm" />
          </div>
          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">درصد چربی</label>
            <input type="number" value={newBodyFat} onChange={e => setNewBodyFat(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white text-sm" />
          </div>
          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">دور کمر (cm)</label>
            <input type="number" value={newWaist} onChange={e => setNewWaist(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white text-sm" />
          </div>
          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">دور سینه (cm)</label>
            <input type="number" value={newChest} onChange={e => setNewChest(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white text-sm" />
          </div>
          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">دور بازو (cm)</label>
            <input type="number" value={newArm} onChange={e => setNewArm(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white text-sm" />
          </div>
          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">دور ران (cm)</label>
            <input type="number" value={newThigh} onChange={e => setNewThigh(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white text-sm" />
          </div>
        </div>
        <button onClick={handleSaveWeight}
          className="mt-4 px-6 py-2.5 rounded-xl bg-teal-500 text-white font-medium hover:bg-teal-600">
          ذخیره اندازه‌گیری
        </button>
      </div>

      {/* Progress Summary */}
      {weightLogs.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4">خلاصه پیشرفت</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
              <span className="text-sm text-slate-600 dark:text-slate-300">شروع دوره</span>
              <span className="text-sm font-medium text-slate-800 dark:text-white">{workoutPlan?.startDate || '-'}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
              <span className="text-sm text-slate-600 dark:text-slate-300">تعداد ثبت وزن</span>
              <span className="text-sm font-medium text-slate-800 dark:text-white">{weightLogs.length} بار</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
              <span className="text-sm text-slate-600 dark:text-slate-300">تغییر وزن کل</span>
              <span className={`text-sm font-bold ${weightChange <= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
              <span className="text-sm text-slate-600 dark:text-slate-300">دوره فعلی</span>
              <span className="text-sm font-medium text-primary-500">دوره {state.currentPeriod}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
