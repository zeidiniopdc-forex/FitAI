import { UserProfile, WorkoutPlan, WorkoutDay, Exercise, Supplement } from '../types';
import { exerciseDatabase } from '../data/exercises';

const persianDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function selectExercises(muscleGroups: string[], level: string, count: number): Exercise[] {
  const exercises: Exercise[] = [];
  const levelMap: Record<string, string[]> = {
    beginner: ['beginner'],
    intermediate: ['beginner', 'intermediate'],
    advanced: ['beginner', 'intermediate', 'advanced'],
  };
  const allowedLevels = levelMap[level] || ['beginner', 'intermediate'];
  
  for (const mg of muscleGroups) {
    const available = exerciseDatabase.filter(
      e => e.muscleGroup === mg && allowedLevels.includes(e.difficulty)
    );
    const selected = shuffleArray(available).slice(0, Math.max(1, Math.ceil(count / muscleGroups.length)));
    exercises.push(...selected);
  }
  return exercises.slice(0, count);
}

function getSplitPlan(sessions: number): { name: string; muscleGroups: string[] }[] {
  switch (sessions) {
    case 2:
      return [
        { name: 'بالاتنه', muscleGroups: ['سینه', 'پشت', 'شانه', 'بازو (جلو)', 'بازو (پشت)'] },
        { name: 'پایین‌تنه', muscleGroups: ['جلوپا', 'همسترینگ', 'باسن', 'ساق پا'] },
      ];
    case 3:
      return [
        { name: 'فشاری (سینه/شانه/پشت‌بازو)', muscleGroups: ['سینه', 'شانه', 'بازو (پشت)'] },
        { name: 'کششی (پشت/جلوبازو)', muscleGroups: ['پشت', 'بازو (جلو)'] },
        { name: 'پا و شکم', muscleGroups: ['جلوپا', 'همسترینگ', 'باسن', 'ساق پا', 'شکم'] },
      ];
    case 4:
      return [
        { name: 'سینه و پشت‌بازو', muscleGroups: ['سینه', 'بازو (پشت)'] },
        { name: 'پشت و جلوبازو', muscleGroups: ['پشت', 'بازو (جلو)'] },
        { name: 'پا', muscleGroups: ['جلوپا', 'همسترینگ', 'باسن', 'ساق پا'] },
        { name: 'شانه و شکم', muscleGroups: ['شانه', 'شکم', 'فیله کمر'] },
      ];
    case 5:
      return [
        { name: 'سینه', muscleGroups: ['سینه'] },
        { name: 'پشت', muscleGroups: ['پشت', 'فیله کمر'] },
        { name: 'شانه', muscleGroups: ['شانه'] },
        { name: 'پا', muscleGroups: ['جلوپا', 'همسترینگ', 'باسن', 'ساق پا'] },
        { name: 'بازو و شکم', muscleGroups: ['بازو (جلو)', 'بازو (پشت)', 'شکم'] },
      ];
    case 6:
      return [
        { name: 'سینه و شکم', muscleGroups: ['سینه', 'شکم'] },
        { name: 'پشت', muscleGroups: ['پشت', 'فیله کمر'] },
        { name: 'پا (جلو)', muscleGroups: ['جلوپا', 'ساق پا'] },
        { name: 'شانه', muscleGroups: ['شانه'] },
        { name: 'بازو', muscleGroups: ['بازو (جلو)', 'بازو (پشت)'] },
        { name: 'پا (پشت) و شکم', muscleGroups: ['همسترینگ', 'باسن', 'شکم'] },
      ];
    default:
      return [
        { name: 'کل بدن', muscleGroups: ['سینه', 'پشت', 'شانه', 'جلوپا', 'شکم'] },
      ];
  }
}

export function generateWorkoutPlan(profile: UserProfile): WorkoutPlan {
  const sessions = profile.sessionsPerWeek;
  const splitPlan = getSplitPlan(sessions);
  const availableDays = profile.availableDays.length > 0 ? profile.availableDays : persianDays.slice(0, sessions);
  
  const days: WorkoutDay[] = splitPlan.map((split, index) => {
    const exerciseCount = profile.level === 'beginner' ? 5 : profile.level === 'intermediate' ? 7 : 8;
    const exercises = selectExercises(split.muscleGroups, profile.level, exerciseCount);
    const estimatedDuration = exercises.reduce((sum, e) => sum + (e.sets * (parseInt(e.reps) || 10) * 3 + e.sets * e.rest), 0) / 60;
    
    return {
      day: availableDays[index % availableDays.length],
      name: split.name,
      muscleGroups: split.muscleGroups,
      exercises: exercises.map(e => ({
        ...e,
        sets: profile.level === 'beginner' ? Math.max(2, e.sets - 1) : e.sets,
        rest: profile.level === 'beginner' ? e.rest + 15 : e.rest,
      })),
      estimatedDuration: Math.round(estimatedDuration),
    };
  });
  
  const startDate = new Date().toISOString().split('T')[0];
  const endDate = new Date(Date.now() + 42 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  let notes = '';
  if (profile.injuries.length > 0) {
    notes = `⚠️ با توجه به آسیب‌دیدگی‌های ذکر شده (${profile.injuries.join('، ')})، حرکات نامناسب حذف شده‌اند. در صورت احساس درد، حرکت را متوقف کنید.`;
  }
  if (profile.aiDecidesSessions) {
    notes += `\n📊 تعداد جلسات (${sessions} جلسه) توسط AI بر اساس هدف "${getGoalLabel(profile.mainGoal)}" و سطح "${getLevelLabel(profile.level)}" تعیین شده است.`;
  }
  
  return {
    id: `plan_${Date.now()}`,
    name: `برنامه ${getGoalLabel(profile.mainGoal)} - ${getLevelLabel(profile.level)}`,
    startDate,
    endDate,
    days,
    isGenerated: true,
    notes,
  };
}

export function generateCompactWorkout(day: WorkoutDay, availableMinutes: number): WorkoutDay {
  const timePerExercise = availableMinutes / Math.min(day.exercises.length, 5);
  const maxExercises = Math.min(day.exercises.length, Math.floor(availableMinutes / 6));
  
  // Keep compound exercises, remove isolation
  const compound = day.exercises.filter(e => 
    ['اسکوات هالتر', 'ددلیفت', 'پرس سینه هالتر', 'زیربغل خم هالتر', 'پرس شانه هالتر', 'پرس پا دستگاه'].includes(e.name)
  );
  const isolation = day.exercises.filter(e => 
    !['اسکوات هالتر', 'ددلیفت', 'پرس سینه هالتر', 'زیربایل خم هالتر', 'پرس شانه هالتر', 'پرس پا دستگاه'].includes(e.name)
  );
  
  const compactExercises = [...compound, ...isolation].slice(0, maxExercises).map(e => ({
    ...e,
    sets: Math.max(2, e.sets - 1),
    rest: Math.max(30, e.rest - 30),
  }));
  
  return {
    ...day,
    name: `${day.name} (فشرده)`,
    exercises: compactExercises,
    estimatedDuration: availableMinutes,
    isCompact: true,
    compactDuration: availableMinutes,
  };
}

export function calculateNutritionNeeds(profile: UserProfile): {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
} {
  let bmr: number;
  if (profile.gender === 'male') {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  } else {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
  }
  
  const activityMultiplier = profile.sessionsPerWeek <= 2 ? 1.3 : profile.sessionsPerWeek <= 4 ? 1.5 : 1.7;
  let tdee = bmr * activityMultiplier;
  
  let calories = tdee;
  if (profile.mainGoal === 'fat_loss') calories = tdee - 500;
  else if (profile.mainGoal === 'muscle_gain') calories = tdee + 300;
  else if (profile.mainGoal === 'strength') calories = tdee + 200;
  
  const protein = profile.weight * (profile.mainGoal === 'muscle_gain' ? 2.2 : 1.8);
  const fat = (calories * 0.25) / 9;
  const carbs = (calories - protein * 4 - fat * 9) / 4;
  
  return {
    calories: Math.round(calories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fat: Math.round(fat),
  };
}

export function analyzeNutrition(
  dailyIntake: { calories: number; protein: number; carbs: number; fat: number },
  needs: { calories: number; protein: number; carbs: number; fat: number }
): {
  deficiencies: string[];
  surpluses: string[];
  recommendations: string[];
  supplementSuggestions: Supplement[];
} {
  const deficiencies: string[] = [];
  const surpluses: string[] = [];
  const recommendations: string[] = [];
  const supplementSuggestions: Supplement[] = [];
  
  const proteinPercent = (dailyIntake.protein / needs.protein) * 100;
  const caloriePercent = (dailyIntake.calories / needs.calories) * 100;
  
  if (proteinPercent < 80) {
    deficiencies.push(`پروتئین: ${Math.round(proteinPercent)}% از هدف دریافت شده`);
    recommendations.push('مصرف منابع پروتئینی مانند سینه مرغ، تخم‌مرغ، ماهی و لبنیات را افزایش دهید.');
    supplementSuggestions.push({
      id: 'sup1',
      name: 'پودر پروتئین وی',
      reason: 'کمبود پروتئین در رژیم غذایی',
      dosage: '۱ پیمانه (۳۰ گرم)',
      bestTime: 'بعد از تمرین یا بین وعده‌ها',
      frequency: '۱ تا ۲ بار در روز',
      duration: 'مداوم',
      warnings: ['در صورت مشکل کلیوی با پزشک مشورت کنید', 'مصرف بیش از حد ممکن است باعث مشکلات گوارشی شود'],
      contraindications: ['نارسایی کلیوی', 'حساسیت به لاکتوز'],
    });
  } else if (proteinPercent > 120) {
    surpluses.push(`پروتئین: ${Math.round(proteinPercent)}% از هدف دریافت شده`);
    recommendations.push('میزان پروتئین بالاتر از نیاز است. می‌توانید آن را کاهش دهید.');
  }
  
  if (caloriePercent < 85) {
    deficiencies.push(`کالری: ${Math.round(caloriePercent)}% از هدف دریافت شده`);
    recommendations.push('مصرف کالری کمتر از نیاز است. برای حفظ عملکرد، وعده‌های غذایی را منظم‌تر کنید.');
  } else if (caloriePercent > 115) {
    surpluses.push(`کالری: ${Math.round(caloriePercent)}% از هدف دریافت شده`);
    recommendations.push('مصرف کالری بالاتر از نیاز است. اگر هدف کاهش وزن دارید، مصرف را کاهش دهید.');
  }
  
  if (dailyIntake.protein < needs.protein * 0.5) {
    supplementSuggestions.push({
      id: 'sup2',
      name: 'BCAA',
      reason: 'پشتیبانی از ریکاوری عضلانی',
      dosage: '۵ گرم',
      bestTime: 'حین تمرین',
      frequency: 'روزهای تمرین',
      duration: 'دوره‌ای (۸ هفته)',
      warnings: ['مصرف بیش از حد ممکن است باعث ناراحتی گوارشی شود'],
      contraindications: ['بیماری‌های متابولیک خاص'],
    });
  }
  
  if (deficiencies.length === 0 && surpluses.length === 0) {
    recommendations.push('✅ دریافت تغذیه‌ای شما در محدوده مناسبی قرار دارد. ادامه دهید!');
  }
  
  return { deficiencies, surpluses, recommendations, supplementSuggestions };
}

export function suggestSessionsPerWeek(profile: UserProfile): number {
  if (profile.mainGoal === 'muscle_gain' && profile.level !== 'beginner') return 5;
  if (profile.mainGoal === 'strength') return 4;
  if (profile.mainGoal === 'fat_loss') return 5;
  if (profile.level === 'beginner') return 3;
  return 4;
}

export function getGoalLabel(goal: string): string {
  const labels: Record<string, string> = {
    muscle_gain: 'عضله‌سازی',
    fat_loss: 'چربی‌سوزی',
    strength: 'افزایش قدرت',
    endurance: 'استقامت',
    general_fitness: 'آمادگی عمومی',
  };
  return labels[goal] || goal;
}

export function getLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    beginner: 'مبتدی',
    intermediate: 'متوسط',
    advanced: 'پیشرفته',
    pro: 'حرفه‌ای',
  };
  return labels[level] || level;
}

export function shouldReassess(startDate: string, workoutLogs: { date: string }[]): boolean {
  const start = new Date(startDate);
  const now = new Date();
  const daysPassed = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return daysPassed >= 42; // 6 weeks
}
