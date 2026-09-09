import { useApp } from '../context/AppContext';
import { calculateNutritionNeeds, getGoalLabel, getLevelLabel, shouldReassess } from '../utils/ai';
import { Activity, Flame, Target, TrendingUp, Calendar, Clock, Dumbbell, Apple, Bell, AlertTriangle, CheckCircle2, Weight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function Dashboard() {
  const { state } = useApp();
  const { profile, workoutPlan, weightLogs, nutritionLogs, reminders, supplements } = state;

  if (!profile) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
          <Dumbbell size={40} className="text-primary-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">به FitAI خوش آمدید!</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">برای شروع، ابتدا پروفایل خود را تکمیل کنید</p>
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 max-w-md mx-auto">
          <p className="text-amber-700 dark:text-amber-300 text-sm">⚠️ لطفاً از بخش پروفایل، اطلاعات بدنی و هدف خود را ثبت کنید تا برنامه تمرینی برایتان تولید شود.</p>
        </div>
      </div>
    );
  }

  const needs = calculateNutritionNeeds(profile);
  const today = new Date().toISOString().split('T')[0];
  const todayNutrition = nutritionLogs.find(n => n.date === today);
  const latestWeight = weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].weight : profile.weight;
  const activeReminders = reminders.filter(r => r.enabled);
  const needsReassessment = workoutPlan ? shouldReassess(workoutPlan.startDate, state.workoutLogs) : false;

  const todayDay = getTodayPersianDay();
  const todayWorkout = workoutPlan?.days.find(d => d.day === todayDay);

  const weightChartData = weightLogs.slice(-10).map(w => ({
    date: w.date.slice(5),
    weight: w.weight,
  }));

  const nutritionChartData = nutritionLogs.slice(-7).map(n => ({
    date: n.date.slice(5),
    calories: n.totalCalories,
    protein: n.totalProtein,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white">
            سلام {profile.name} 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {getGoalLabel(profile.mainGoal)} • {getLevelLabel(profile.level)} • دوره {state.currentPeriod}
          </p>
        </div>
        {needsReassessment && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-center gap-3">
            <AlertTriangle className="text-amber-500 shrink-0" size={20} />
            <div>
              <p className="text-sm font-medium text-amber-700 dark:text-amber-300">زمان ارزیابی مجدد فرا رسیده!</p>
              <p className="text-xs text-amber-600 dark:text-amber-400">وزن و تصاویر جدید ثبت کنید</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Weight size={20} />} label="وزن فعلی" value={`${latestWeight} کیلوگرم`} color="blue" />
        <StatCard icon={<Flame size={20} />} label="کالری امروز" value={`${todayNutrition?.totalCalories || 0} / ${needs.calories}`} color="orange" />
        <StatCard icon={<Activity size={20} />} label="پروتئین امروز" value={`${todayNutrition?.totalProtein || 0}g / ${needs.protein}g`} color="green" />
        <StatCard icon={<Target size={20} />} label="هدف وزنی" value={profile.targetWeight ? `${profile.targetWeight} کیلوگرم` : 'تعیین نشده'} color="purple" />
      </div>

      {/* Today's Workout */}
      {todayWorkout && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Dumbbell size={20} className="text-primary-500" />
              تمرین امروز - {todayWorkout.name}
            </h3>
            <span className="text-sm text-slate-500 dark:text-slate-400">{todayWorkout.estimatedDuration} دقیقه</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {todayWorkout.exercises.slice(0, 6).map((ex, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 text-sm font-bold">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{ex.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{ex.sets} × {ex.reps} | استراحت: {ex.rest} ثانیه</p>
                </div>
              </div>
            ))}
          </div>
          {todayWorkout.exercises.length > 6 && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 text-center">
              و {todayWorkout.exercises.length - 6} حرکت دیگر...
            </p>
          )}
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-green-500" />
            روند وزن
          </h3>
          {weightChartData.length > 1 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weightChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9' }} />
                <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm">
              داده‌ای برای نمایش وجود ندارد. وزن خود را ثبت کنید.
            </div>
          )}
        </div>

        {/* Nutrition Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <Apple size={20} className="text-orange-500" />
            روند کالری (هفته اخیر)
          </h3>
          {nutritionChartData.length > 1 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={nutritionChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9' }} />
                <Bar dataKey="calories" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm">
              غذای روزانه خود را ثبت کنید.
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Supplements Today */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <CheckCircle2 size={20} className="text-green-500" />
            مکمل‌های امروز
          </h3>
          {supplements.length > 0 ? (
            <div className="space-y-3">
              {supplements.slice(0, 3).map(s => (
                <div key={s.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{s.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{s.bestTime} - {s.dosage}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">مکملی ثبت نشده</p>
          )}
        </div>

        {/* Active Reminders */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <Bell size={20} className="text-blue-500" />
            یادآورها ({activeReminders.length})
          </h3>
          <div className="space-y-2">
            {activeReminders.slice(0, 4).map(r => (
              <div key={r.id} className="flex items-center gap-2 text-sm">
                <Clock size={14} className="text-slate-400" />
                <span className="text-slate-600 dark:text-slate-300">{r.title}</span>
                <span className="text-xs text-slate-400 mr-auto">{r.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Assessment */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-purple-500" />
            ارزیابی بعدی
          </h3>
          {workoutPlan ? (
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                شروع دوره: {workoutPlan.startDate}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                پایان دوره: {workoutPlan.endDate}
              </p>
              <div className="mt-3 p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20">
                <p className="text-xs text-primary-600 dark:text-primary-400">
                  {needsReassessment ? '⚡ زمان ارزیابی فرا رسیده!' : '📊 دوره فعلی در حال اجرا'}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">برنامه‌ای فعال نیست</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  };
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
      <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-lg font-bold text-slate-800 dark:text-white mt-1">{value}</p>
    </div>
  );
}

function getTodayPersianDay(): string {
  const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
  const jsDay = new Date().getDay();
  return days[jsDay];
}
