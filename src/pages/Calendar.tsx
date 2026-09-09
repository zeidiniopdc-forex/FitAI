import { useApp } from '../context/AppContext';
import { Calendar as CalIcon, CheckCircle2, XCircle } from 'lucide-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const persianDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];

export default function CalendarPage() {
  const { state } = useApp();
  const { workoutPlan, workoutLogs } = state;

  const todayDay = getTodayPersianDay();
  
  const getWorkoutForDay = (day: string) => {
    return workoutPlan?.days.find(d => d.day === day);
  };

  const isCompleted = (day: string) => {
    const today = new Date().toISOString().split('T')[0];
    return workoutLogs.some(l => l.date === today && l.completed);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <CalIcon size={28} className="text-indigo-500" />
          تقویم تمرین
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">برنامه هفتگی شما</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {persianDays.map(day => {
          const workout = getWorkoutForDay(day);
          const isToday = day === todayDay;
          const completed = isCompleted(day);
          
          return (
            <div key={day} className={`rounded-2xl p-5 border transition-all ${
              isToday
                ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-300 dark:border-primary-700 ring-2 ring-primary-500/30'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold ${isToday ? 'text-primary-600 dark:text-primary-400' : 'text-slate-800 dark:text-white'}`}>
                    {day}
                  </h3>
                  {isToday && <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500 text-white">امروز</span>}
                </div>
                {completed && <CheckCircle2 size={20} className="text-green-500" />}
              </div>
              
              {workout ? (
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{workout.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {workout.exercises.length} حرکت • ~{workout.estimatedDuration} دقیقه
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {workout.muscleGroups.slice(0, 3).map(mg => (
                      <span key={mg} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {mg}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <XCircle size={16} className="text-slate-400" />
                  <p className="text-sm text-slate-500 dark:text-slate-400">روز استراحت</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Weekly Summary */}
      {workoutPlan && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4">خلاصه هفته</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{workoutPlan.days.length}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">جلسه تمرین</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{7 - workoutPlan.days.length}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">روز استراحت</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {workoutPlan.days.reduce((s, d) => s + d.estimatedDuration, 0)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">دقیقه کل</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getTodayPersianDay(): string {
  const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
  return days[new Date().getDay()];
}
