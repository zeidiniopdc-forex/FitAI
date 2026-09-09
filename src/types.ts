export interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  bodyFat?: number;
  experience: 'beginner' | 'intermediate' | 'advanced' | 'pro';
  level: 'beginner' | 'intermediate' | 'advanced';
  mainGoal: 'muscle_gain' | 'fat_loss' | 'strength' | 'endurance' | 'general_fitness';
  subGoals: string[];
  sessionsPerWeek: number;
  sessionDuration: number;
  availableDays: string[];
  equipment: string[];
  injuries: string[];
  preferences: string[];
  aiDecidesSessions: boolean;
  startDate: string;
  targetWeight?: number;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  instructions: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sets: number;
  reps: string;
  rest: number;
  rpe?: number;
}

export interface WorkoutDay {
  day: string;
  name: string;
  muscleGroups: string[];
  exercises: Exercise[];
  estimatedDuration: number;
  isCompact?: boolean;
  compactDuration?: number;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  days: WorkoutDay[];
  isGenerated: boolean;
  notes?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  standardWeight: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  vitamins: Record<string, number>;
  minerals: Record<string, number>;
}

export interface MealEntry {
  id: string;
  date: string;
  mealType: 'breakfast' | 'snack1' | 'lunch' | 'snack2' | 'dinner' | 'pre_workout' | 'post_workout' | 'other';
  foodId: string;
  foodName: string;
  amount: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DailyNutrition {
  date: string;
  entries: MealEntry[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
}

export interface Supplement {
  id: string;
  name: string;
  reason: string;
  dosage: string;
  bestTime: string;
  frequency: string;
  duration: string;
  warnings: string[];
  contraindications: string[];
}

export interface BodyPhoto {
  id: string;
  date: string;
  imageUrl: string;
  weight: number;
  notes?: string;
  period: string;
}

export interface Reminder {
  id: string;
  type: 'workout' | 'supplement' | 'meal' | 'water' | 'log_food' | 'log_weight' | 'log_photo' | 'assessment' | 'end_cycle';
  title: string;
  time: string;
  enabled: boolean;
  days: string[];
}

export interface WeightLog {
  date: string;
  weight: number;
  bodyFat?: number;
}

export interface WorkoutLog {
  date: string;
  exerciseId: string;
  exerciseName: string;
  weight: number;
  reps: number;
  sets: number;
  rpe?: number;
  completed: boolean;
}

export interface AppState {
  profile: UserProfile | null;
  workoutPlan: WorkoutPlan | null;
  nutritionLogs: DailyNutrition[];
  bodyPhotos: BodyPhoto[];
  reminders: Reminder[];
  weightLogs: WeightLog[];
  workoutLogs: WorkoutLog[];
  supplements: Supplement[];
  darkMode: boolean;
  currentPeriod: number;
}
