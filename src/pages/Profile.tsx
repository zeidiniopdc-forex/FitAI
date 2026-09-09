import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserProfile } from '../types';
import { suggestSessionsPerWeek, generateWorkoutPlan, getGoalLabel, getLevelLabel } from '../utils/ai';
import { Save, User, Target, Dumbbell, AlertCircle } from 'lucide-react';

const persianDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];

export default function Profile() {
  const { state, dispatch } = useApp();
  const [form, setForm] = useState<Partial<UserProfile>>(state.profile || {
    name: '', age: 25, gender: 'male', height: 175, weight: 75,
    experience: 'beginner', level: 'beginner', mainGoal: 'muscle_gain',
    subGoals: [], sessionsPerWeek: 4, sessionDuration: 60, availableDays: [],
    equipment: ['دمبل', 'هالتر', 'دستگاه سیم‌کش'], injuries: [], preferences: [],
    aiDecidesSessions: true, targetWeight: 70,
  });
  const [saved, setSaved] = useState(false);
  const [showPlanGenerated, setShowPlanGenerated] = useState(false);

  const handleSave = () => {
    const profile: UserProfile = {
      name: form.name || 'کاربر',
      age: form.age || 25,
      gender: form.gender || 'male',
      height: form.height || 175,
      weight: form.weight || 75,
      bodyFat: form.bodyFat,
      experience: (form.experience as any) || 'less_than_1',
      level: (form.level as any) || 'beginner',
      mainGoal: (form.mainGoal as any) || 'muscle_gain',
      subGoals: form.subGoals || [],
      sessionsPerWeek: form.aiDecidesSessions ? suggestSessionsPerWeek(form as UserProfile) : (form.sessionsPerWeek || 4),
      sessionDuration: form.sessionDuration || 60,
      availableDays: form.availableDays || [],
      equipment: form.equipment || [],
      injuries: form.injuries || [],
      preferences: form.preferences || [],
      aiDecidesSessions: form.aiDecidesSessions ?? true,
      startDate: new Date().toISOString().split('T')[0],
      targetWeight: form.targetWeight,
    };
    dispatch({ type: 'SET_PROFILE', payload: profile });
    
    // Auto generate workout plan
    const plan = generateWorkoutPlan(profile);
    dispatch({ type: 'SET_WORKOUT_PLAN', payload: plan });
    
    setSaved(true);
    setShowPlanGenerated(true);
    setTimeout(() => { setSaved(false); setShowPlanGenerated(false); }, 3000);
  };

  const toggleDay = (day: string) => {
    const days = form.availableDays || [];
    setForm({ ...form, availableDays: days.includes(day) ? days.filter(d => d !== day) : [...days, day] });
  };

  const toggleEquipment = (eq: string) => {
    const eqs = form.equipment || [];
    setForm({ ...form, equipment: eqs.includes(eq) ? eqs.filter(e => e !== eq) : [...eqs, eq] });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
          <User size={24} className="text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">پروفایل کاربری</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">اطلاعات بدنی و اهداف خود را ثبت کنید</p>
        </div>
      </div>

      {showPlanGenerated && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Dumbbell size={16} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-700 dark:text-green-300">✅ پروفایل ذخیره شد و برنامه تمرینی تولید شد!</p>
            <p className="text-xs text-green-600 dark:text-green-400">به بخش برنامه تمرینی مراجعه کنید.</p>
          </div>
        </div>
      )}

      {/* Personal Info */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">اطلاعات شخصی</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="نام" value={form.name || ''} onChange={v => setForm({ ...form, name: v })} />
          <InputField label="سن" type="number" value={form.age?.toString() || ''} onChange={v => setForm({ ...form, age: parseInt(v) || 0 })} />
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">جنسیت</label>
            <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value as any })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="male">مرد</option>
              <option value="female">زن</option>
            </select>
          </div>
          <InputField label="قد (سانتی‌متر)" type="number" value={form.height?.toString() || ''} onChange={v => setForm({ ...form, height: parseInt(v) || 0 })} />
          <InputField label="وزن (کیلوگرم)" type="number" value={form.weight?.toString() || ''} onChange={v => setForm({ ...form, weight: parseInt(v) || 0 })} />
          <InputField label="وزن هدف (کیلوگرم)" type="number" value={form.targetWeight?.toString() || ''} onChange={v => setForm({ ...form, targetWeight: parseInt(v) || 0 })} />
          <InputField label="درصد چربی بدن (اختیاری)" type="number" value={form.bodyFat?.toString() || ''} onChange={v => setForm({ ...form, bodyFat: parseFloat(v) || undefined })} />
        </div>
      </section>

      {/* Goals */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Target size={20} className="text-primary-500" />
          اهداف
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">هدف اصلی</label>
            <select value={form.mainGoal} onChange={e => setForm({ ...form, mainGoal: e.target.value as any })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500">
              <option value="muscle_gain">عضله‌سازی</option>
              <option value="fat_loss">چربی‌سوزی</option>
              <option value="strength">افزایش قدرت</option>
              <option value="endurance">استقامت</option>
              <option value="general_fitness">آمادگی عمومی</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">سطح تمرین</label>
            <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value as any })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500">
              <option value="beginner">مبتدی</option>
              <option value="intermediate">متوسط</option>
              <option value="advanced">پیشرفته</option>
            </select>
          </div>
        </div>
      </section>

      {/* Training Settings */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Dumbbell size={20} className="text-primary-500" />
          تنظیمات تمرین
        </h3>
        
        <div className="mb-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.aiDecidesSessions} onChange={e => setForm({ ...form, aiDecidesSessions: e.target.checked })}
              className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
            <span className="text-sm text-slate-700 dark:text-slate-300">تعداد جلسات توسط AI تعیین شود</span>
          </label>
          {form.aiDecidesSessions && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 mr-8">
              💡 AI بر اساس هدف و سطح شما، تعداد {suggestSessionsPerWeek(form as UserProfile)} جلسه در هفته را پیشنهاد می‌کند.
            </p>
          )}
        </div>

        {!form.aiDecidesSessions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputField label="تعداد جلسات در هفته" type="number" value={form.sessionsPerWeek?.toString() || ''} onChange={v => setForm({ ...form, sessionsPerWeek: parseInt(v) || 0 })} />
            <InputField label="مدت هر جلسه (دقیقه)" type="number" value={form.sessionDuration?.toString() || ''} onChange={v => setForm({ ...form, sessionDuration: parseInt(v) || 0 })} />
          </div>
        )}

        {form.aiDecidesSessions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputField label="مدت هر جلسه (دقیقه)" type="number" value={form.sessionDuration?.toString() || ''} onChange={v => setForm({ ...form, sessionDuration: parseInt(v) || 0 })} />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">روزهای قابل تمرین</label>
          <div className="flex flex-wrap gap-2">
            {persianDays.map(day => (
              <button key={day} onClick={() => toggleDay(day)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  form.availableDays?.includes(day)
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}>
                {day}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">در صورت عدم انتخاب، AI روزها را تعیین می‌کند.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">تجهیزات در دسترس</label>
          <div className="flex flex-wrap gap-2">
            {['دمبل', 'هالتر', 'دستگاه سیم‌کش', 'دستگاه اسمیت', 'نیمکت', 'وزن بدن', 'کش ورزشی', 'بارفیکس', 'کتل‌بل'].map(eq => (
              <button key={eq} onClick={() => toggleEquipment(eq)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  form.equipment?.includes(eq)
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}>
                {eq}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Injuries */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <AlertCircle size={20} className="text-red-500" />
          محدودیت‌ها و آسیب‌دیدگی‌ها
        </h3>
        <textarea
          value={form.injuries?.join('، ') || ''}
          onChange={e => setForm({ ...form, injuries: e.target.value.split('،').map(s => s.trim()).filter(Boolean) })}
          placeholder="مثلاً: زانودرد، درد شانه، دیسک کمر..."
          className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500 resize-none h-24"
        />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">موارد را با «،» از هم جدا کنید. حرکات نامناسب از برنامه حذف خواهند شد.</p>
      </section>

      {/* Save Button */}
      <button onClick={handleSave}
        className="w-full py-4 rounded-2xl bg-gradient-to-l from-primary-500 to-accent-500 text-white font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 pulse-glow">
        <Save size={20} />
        {saved ? '✅ ذخیره شد!' : 'ذخیره و تولید برنامه'}
      </button>
    </div>
  );
}

function InputField({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
    </div>
  );
}
