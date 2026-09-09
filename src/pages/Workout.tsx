import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateWorkoutPlan } from '../utils/ai';
import { Dumbbell, RefreshCw, Clock, ChevronDown, ChevronUp, Check, Play } from 'lucide-react';

export default function Workout() {
  const { state, dispatch } = useApp();
  const { profile, workoutPlan } = state;
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const [activeSession, setActiveSession] = useState<number | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const handleRegenerate = () => {
    if (!profile) return;
    const plan = generateWorkoutPlan(profile);
    dispatch({ type: 'SET_WORKOUT_PLAN', payload: plan });
  };

  const toggleExercise = (dayIdx: number, exIdx: number) => {
    const key = `${dayIdx}-${exIdx}`;
    const newSet = new Set(completedExercises);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
      // Log workout
      if (workoutPlan) {
        const exercise = workoutPlan.days[dayIdx].exercises[exIdx];
        dispatch({
          type: 'ADD_WORKOUT_LOG',
          payload: {
            date: new Date().toISOString().split('T')[0],
            exerciseId: exercise.id,
            exerciseName: exercise.name,
            weight: 0,
            reps: parseInt(exercise.reps) || 10,
            sets: exercise.sets,
            completed: true,
          }
        });
      }
    }
    setCompletedExercises(newSet);
  };

  if (!profile) {
    return (
      <div className="text-center py-20">
        <Dumbbell size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">ابتدا پروفایل خود را تکمیل کنید</h2>
        <p className="text-slate-500 dark:text-slate-400">برای دریافت برنامه تمرینی، اطلاعات بدنی و اهداف خود را ثبت کنید.</p>
      </div>
    );
  }

  if (!workoutPlan) {
    return (
      <div className="text-center py-20">
        <Dumbbell size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">برنامه‌ای تولید نشده</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">برای تولید برنامه تمرینی، از بخش پروفایل اطلاعات خود را ذخیره کنید.</p>
        <button onClick={handleRegenerate}
          className="px-6 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-all">
          تولید برنامه
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Dumbbell size={28} className="text-primary-500" />
            برنامه تمرینی
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {workoutPlan.name} • {workoutPlan.days.length} جلسه در هفته
          </p>
        </div>
        <button onClick={handleRegenerate}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all">
          <RefreshCw size={16} />
          تولید مجدد
        </button>
      </div>

      {workoutPlan.notes && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <p className="text-sm text-blue-700 dark:text-blue-300 whitespace-pre-line">{workoutPlan.notes}</p>
        </div>
      )}

      {/* Workout Days */}
      <div className="space-y-4">
        {workoutPlan.days.map((day, dayIdx) => (
          <div key={dayIdx} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <button
              onClick={() => setExpandedDay(expandedDay === dayIdx ? null : dayIdx)}
              className="w-full p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">{dayIdx + 1}</span>
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-slate-800 dark:text-white">{day.day} - {day.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {day.exercises.length} حرکت • ~{day.estimatedDuration} دقیقه • {day.muscleGroups.join('، ')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveSession(dayIdx); }}
                  className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 hover:bg-green-200 dark:hover:bg-green-900/50"
                >
                  <Play size={16} />
                </button>
                {expandedDay === dayIdx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </button>

            {expandedDay === dayIdx && (
              <div className="px-5 pb-5 space-y-3 border-t border-slate-200 dark:border-slate-700 pt-4">
                {day.exercises.map((exercise, exIdx) => {
                  const key = `${dayIdx}-${exIdx}`;
                  const isCompleted = completedExercises.has(key);
                  return (
                    <div key={exIdx} className={`p-4 rounded-xl border transition-all ${
                      isCompleted
                        ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                        : 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600'
                    }`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className={`font-medium ${isCompleted ? 'text-green-700 dark:text-green-300 line-through' : 'text-slate-800 dark:text-white'}`}>
                              {exercise.name}
                            </h4>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300">
                              {exercise.equipment}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1"><Dumbbell size={12} /> {exercise.sets} ست × {exercise.reps}</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> استراحت: {exercise.rest} ثانیه</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                            📋 {exercise.instructions}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleExercise(dayIdx, exIdx)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                            isCompleted
                              ? 'bg-green-500 text-white'
                              : 'bg-slate-200 dark:bg-slate-600 text-slate-400 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600'
                          }`}
                        >
                          <Check size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Active Session Modal */}
      {activeSession !== null && workoutPlan && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                🏋️ {workoutPlan.days[activeSession].name}
              </h3>
              <button onClick={() => setActiveSession(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              حرکات را به ترتیب انجام دهید و پس از اتمام هر حرکت، آن را علامت بزنید.
            </p>
            <div className="space-y-3">
              {workoutPlan.days[activeSession].exercises.map((ex, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  <span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 text-sm font-bold">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{ex.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{ex.sets} × {ex.reps} | {ex.rest}ث استراحت</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setActiveSession(null)}
              className="w-full mt-4 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600">
              شروع تمرین
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
