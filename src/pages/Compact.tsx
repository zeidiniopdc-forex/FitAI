import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateCompactWorkout } from '../utils/ai';
import { Zap, Clock, Play, Check, Dumbbell } from 'lucide-react';

export default function CompactWorkout() {
  const { state } = useApp();
  const { workoutPlan } = state;
  const [selectedDay, setSelectedDay] = useState(0);
  const [duration, setDuration] = useState(30);
  const [compactPlan, setCompactPlan] = useState<any>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());

  const todayDay = getTodayPersianDay();
  const todayIdx = workoutPlan?.days.findIndex(d => d.day === todayDay) ?? 0;

  const handleGenerate = () => {
    if (!workoutPlan) return;
    const day = workoutPlan.days[selectedDay];
    const compact = generateCompactWorkout(day, duration);
    setCompactPlan(compact);
    setCompletedExercises(new Set());
  };

  const toggleComplete = (idx: number) => {
    const newSet = new Set(completedExercises);
    if (newSet.has(idx)) newSet.delete(idx);
    else newSet.add(idx);
    setCompletedExercises(newSet);
  };

  if (!workoutPlan) {
    return (
      <div className="text-center py-20">
        <Zap size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">برنامه‌ای فعال نیست</h2>
        <p className="text-slate-500 dark:text-slate-400">ابتدا از بخش پروفایل برنامه تمرینی تولید کنید.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Zap size={28} className="text-yellow-500" />
          برنامه فشرده
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          در صورت کمبود زمان، برنامه فشرده همان جلسه را دریافت کنید
        </p>
      </div>

      {/* Info */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          💡 برنامه فشرده حرکات کم‌اهمیت را حذف و حرکات اصلی و مؤثر را حفظ می‌کند.
          زمان استراحت کاهش می‌یابد و ترتیب تمرین برای بیشترین بازده بهینه می‌شود.
          این برنامه جایگزین موقت همان جلسه است و برنامه اصلی را از بین نمی‌برد.
        </p>
      </div>

      {/* Settings */}
      {!compactPlan && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4">تنظیمات برنامه فشرده</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">جلسه مورد نظر</label>
              <select value={selectedDay} onChange={e => setSelectedDay(parseInt(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white">
                {workoutPlan.days.map((day, i) => (
                  <option key={i} value={i}>{day.day} - {day.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">زمان موجود (دقیقه)</label>
              <div className="flex gap-2">
                {[20, 30, 45, 60].map(t => (
                  <button key={t} onClick={() => setDuration(t)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                      duration === t
                        ? 'bg-yellow-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button onClick={handleGenerate}
            className="mt-4 w-full py-3 rounded-xl bg-yellow-500 text-white font-bold hover:bg-yellow-600 flex items-center justify-center gap-2">
            <Zap size={18} />
            تولید برنامه فشرده
          </button>
        </div>
      )}

      {/* Compact Workout */}
      {compactPlan && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Zap size={20} className="text-yellow-500" />
                {compactPlan.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {compactPlan.exercises.length} حرکت • ~{compactPlan.estimatedDuration} دقیقه
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {completedExercises.size}/{compactPlan.exercises.length}
              </span>
              <button onClick={() => { setCompactPlan(null); setCompletedExercises(new Set()); }}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm">
                تغییر
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-yellow-500 rounded-full transition-all"
              style={{ width: `${(completedExercises.size / compactPlan.exercises.length) * 100}%` }} />
          </div>

          <div className="space-y-3">
            {compactPlan.exercises.map((exercise: any, i: number) => {
              const isCompleted = completedExercises.has(i);
              return (
                <div key={i} className={`p-4 rounded-xl border transition-all ${
                  isCompleted
                    ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                    : 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      isCompleted ? 'bg-green-500 text-white' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                    }`}>
                      {isCompleted ? <Check size={16} /> : i + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium text-sm ${isCompleted ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white'}`}>
                        {exercise.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {exercise.sets} × {exercise.reps} | استراحت: {exercise.rest}ث
                      </p>
                    </div>
                    <button onClick={() => toggleComplete(i)}
                      className={`p-2 rounded-lg transition-all ${
                        isCompleted ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-400 hover:bg-green-100 dark:hover:bg-green-900/30'
                      }`}>
                      <Check size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {completedExercises.size === compactPlan.exercises.length && (
            <div className="mt-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center">
              <p className="text-lg font-bold text-green-700 dark:text-green-300">🎉 آفرین! تمرین فشرده تمام شد!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function getTodayPersianDay(): string {
  const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
  return days[new Date().getDay()];
}
