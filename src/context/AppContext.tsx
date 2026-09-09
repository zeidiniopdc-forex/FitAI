import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, UserProfile, WorkoutPlan, DailyNutrition, BodyPhoto, Reminder, WeightLog, WorkoutLog, Supplement, MealEntry } from '../types';

type Action =
  | { type: 'SET_PROFILE'; payload: UserProfile }
  | { type: 'SET_WORKOUT_PLAN'; payload: WorkoutPlan }
  | { type: 'ADD_NUTRITION_LOG'; payload: DailyNutrition }
  | { type: 'UPDATE_NUTRITION_LOG'; payload: DailyNutrition }
  | { type: 'ADD_MEAL_ENTRY'; payload: { date: string; entry: MealEntry } }
  | { type: 'ADD_BODY_PHOTO'; payload: BodyPhoto }
  | { type: 'DELETE_BODY_PHOTO'; payload: string }
  | { type: 'ADD_REMINDER'; payload: Reminder }
  | { type: 'TOGGLE_REMINDER'; payload: string }
  | { type: 'DELETE_REMINDER'; payload: string }
  | { type: 'ADD_WEIGHT_LOG'; payload: WeightLog }
  | { type: 'ADD_WORKOUT_LOG'; payload: WorkoutLog }
  | { type: 'SET_SUPPLEMENTS'; payload: Supplement[] }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'INCREMENT_PERIOD' }
  | { type: 'LOAD_STATE'; payload: AppState };

const initialState: AppState = {
  profile: null,
  workoutPlan: null,
  nutritionLogs: [],
  bodyPhotos: [],
  reminders: [
    { id: 'r1', type: 'workout', title: 'یادآوری تمرین', time: '07:00', enabled: true, days: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه'] },
    { id: 'r2', type: 'water', title: 'نوشیدن آب', time: '09:00', enabled: true, days: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'] },
    { id: 'r3', type: 'supplement', title: 'مصرف مکمل', time: '08:00', enabled: false, days: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'] },
    { id: 'r4', type: 'log_food', title: 'ثبت غذای روزانه', time: '21:00', enabled: true, days: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'] },
    { id: 'r5', type: 'log_weight', title: 'ثبت وزن هفتگی', time: '07:30', enabled: true, days: ['شنبه'] },
  ],
  weightLogs: [],
  workoutLogs: [],
  supplements: [],
  darkMode: true,
  currentPeriod: 1,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };
    case 'SET_WORKOUT_PLAN':
      return { ...state, workoutPlan: action.payload };
    case 'ADD_NUTRITION_LOG':
      return { ...state, nutritionLogs: [...state.nutritionLogs.filter(n => n.date !== action.payload.date), action.payload] };
    case 'UPDATE_NUTRITION_LOG':
      return { ...state, nutritionLogs: state.nutritionLogs.map(n => n.date === action.payload.date ? action.payload : n) };
    case 'ADD_MEAL_ENTRY': {
      const existing = state.nutritionLogs.find(n => n.date === action.payload.date);
      if (existing) {
        const updated = { ...existing, entries: [...existing.entries, action.payload.entry] };
        updated.totalCalories = updated.entries.reduce((s, e) => s + e.calories, 0);
        updated.totalProtein = updated.entries.reduce((s, e) => s + e.protein, 0);
        updated.totalCarbs = updated.entries.reduce((s, e) => s + e.carbs, 0);
        updated.totalFat = updated.entries.reduce((s, e) => s + e.fat, 0);
        return { ...state, nutritionLogs: state.nutritionLogs.map(n => n.date === action.payload.date ? updated : n) };
      }
      const newLog: DailyNutrition = {
        date: action.payload.date,
        entries: [action.payload.entry],
        totalCalories: action.payload.entry.calories,
        totalProtein: action.payload.entry.protein,
        totalCarbs: action.payload.entry.carbs,
        totalFat: action.payload.entry.fat,
        totalFiber: 0,
      };
      return { ...state, nutritionLogs: [...state.nutritionLogs, newLog] };
    }
    case 'ADD_BODY_PHOTO':
      return { ...state, bodyPhotos: [...state.bodyPhotos, action.payload] };
    case 'DELETE_BODY_PHOTO':
      return { ...state, bodyPhotos: state.bodyPhotos.filter(p => p.id !== action.payload) };
    case 'ADD_REMINDER':
      return { ...state, reminders: [...state.reminders, action.payload] };
    case 'TOGGLE_REMINDER':
      return { ...state, reminders: state.reminders.map(r => r.id === action.payload ? { ...r, enabled: !r.enabled } : r) };
    case 'DELETE_REMINDER':
      return { ...state, reminders: state.reminders.filter(r => r.id !== action.payload) };
    case 'ADD_WEIGHT_LOG':
      return { ...state, weightLogs: [...state.weightLogs, action.payload].sort((a, b) => a.date.localeCompare(b.date)) };
    case 'ADD_WORKOUT_LOG':
      return { ...state, workoutLogs: [...state.workoutLogs, action.payload] };
    case 'SET_SUPPLEMENTS':
      return { ...state, supplements: action.payload };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'INCREMENT_PERIOD':
      return { ...state, currentPeriod: state.currentPeriod + 1 };
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem('fitai_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      } catch (e) { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fitai_state', JSON.stringify(state));
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
