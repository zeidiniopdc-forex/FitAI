import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { foodDatabase, foodCategories } from '../data/foods';
import { calculateNutritionNeeds } from '../utils/ai';
import { Apple, Plus, Search, Trash2, X } from 'lucide-react';

const mealTypes = [
  { id: 'breakfast', label: 'صبحانه', icon: '🌅' },
  { id: 'snack1', label: 'میان‌وعده صبح', icon: '🍎' },
  { id: 'lunch', label: 'ناهار', icon: '🍽️' },
  { id: 'snack2', label: 'میان‌وعده عصر', icon: '🥜' },
  { id: 'dinner', label: 'شام', icon: '🌙' },
  { id: 'pre_workout', label: 'قبل تمرین', icon: '⚡' },
  { id: 'post_workout', label: 'بعد تمرین', icon: '💪' },
  { id: 'other', label: 'سایر', icon: '🍴' },
];

export default function Nutrition() {
  const { state, dispatch } = useApp();
  const { profile, nutritionLogs } = state;
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState('breakfast');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [amount, setAmount] = useState('100');

  const todayLog = nutritionLogs.find(n => n.date === selectedDate);
  const needs = profile ? calculateNutritionNeeds(profile) : null;

  const filteredFoods = foodDatabase.filter(f =>
    f.name.includes(searchQuery) || f.category.includes(searchQuery)
  );

  const handleAddFood = () => {
    if (!selectedFood || !amount) return;
    const food = foodDatabase.find(f => f.id === selectedFood);
    if (!food) return;
    const multiplier = parseFloat(amount) / food.standardWeight;
    const entry = {
      id: `meal_${Date.now()}`,
      date: selectedDate,
      mealType: selectedMealType as any,
      foodId: food.id,
      foodName: food.name,
      amount: parseFloat(amount),
      unit: food.unit,
      calories: Math.round(food.calories * multiplier),
      protein: Math.round(food.protein * multiplier * 10) / 10,
      carbs: Math.round(food.carbs * multiplier * 10) / 10,
      fat: Math.round(food.fat * multiplier * 10) / 10,
    };
    dispatch({ type: 'ADD_MEAL_ENTRY', payload: { date: selectedDate, entry } });
    setShowAddModal(false);
    setSelectedFood(null);
    setAmount('100');
  };

  const getEntriesByMeal = (mealType: string) => {
    return todayLog?.entries.filter(e => e.mealType === mealType) || [];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Apple size={28} className="text-green-500" />
            ثبت غذای روزانه
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">غذاهای مصرفی خود را ثبت کنید</p>
        </div>
        <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
          className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
      </div>

      {/* Nutrition Summary */}
      {needs && todayLog && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <NutrientCard label="کالری" value={todayLog.totalCalories} target={needs.calories} unit="کالری" color="orange" />
          <NutrientCard label="پروتئین" value={todayLog.totalProtein} target={needs.protein} unit="گرم" color="blue" />
          <NutrientCard label="کربوهیدرات" value={todayLog.totalCarbs} target={needs.carbs} unit="گرم" color="green" />
          <NutrientCard label="چربی" value={todayLog.totalFat} target={needs.fat} unit="گرم" color="purple" />
        </div>
      )}

      {/* Meals */}
      <div className="space-y-4">
        {mealTypes.map(meal => {
          const entries = getEntriesByMeal(meal.id);
          return (
            <div key={meal.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{meal.icon}</span>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white">{meal.label}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {entries.length > 0
                        ? `${entries.reduce((s, e) => s + e.calories, 0)} کالری`
                        : 'خالی'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedMealType(meal.id); setShowAddModal(true); }}
                  className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 hover:bg-green-200 dark:hover:bg-green-900/50"
                >
                  <Plus size={16} />
                </button>
              </div>
              {entries.length > 0 && (
                <div className="p-4 space-y-2">
                  {entries.map(entry => (
                    <div key={entry.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{entry.foodName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{entry.amount} {entry.unit}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-600 dark:text-slate-300">{entry.calories} کالری</span>
                        <button className="p-1 text-red-400 hover:text-red-600">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Food Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center">
          <div className="bg-white dark:bg-slate-800 rounded-t-2xl md:rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 dark:text-white">افزودن غذا</h3>
              <button onClick={() => setShowAddModal(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="relative mb-4">
                <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text" placeholder="جستجوی ماده غذایی..."
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
                />
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredFoods.map(food => (
                  <button key={food.id} onClick={() => setSelectedFood(food.id)}
                    className={`w-full p-3 rounded-xl text-right transition-all ${
                      selectedFood === food.id
                        ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500'
                        : 'bg-slate-50 dark:bg-slate-700/50 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-500'
                    }`}>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{food.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {food.calories} کالری | {food.protein}g پروتئین | هر {food.unit} ({food.standardWeight}g)
                    </p>
                  </button>
                ))}
              </div>
              {selectedFood && (
                <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">مقدار (گرم)</label>
                  <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
                </div>
              )}
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <button onClick={handleAddFood} disabled={!selectedFood}
                className="w-full py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed">
                افزودن به وعده
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NutrientCard({ label, value, target, unit, color }: { label: string; value: number; target: number; unit: string; color: string }) {
  const percent = Math.min(100, Math.round((value / target) * 100));
  const colors: Record<string, string> = {
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
  };
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-xl font-bold text-slate-800 dark:text-white mt-1">{value} <span className="text-xs font-normal">{unit}</span></p>
      <div className="mt-2 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full ${colors[color]} rounded-full transition-all`} style={{ width: `${percent}%` }} />
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{percent}% از {target}</p>
    </div>
  );
}
