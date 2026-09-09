import { useState } from 'react';
import { foodDatabase, foodCategories } from '../data/foods';
import { BookOpen, Search, Filter } from 'lucide-react';

export default function FoodBank() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFood, setSelectedFood] = useState<string | null>(null);

  const filteredFoods = foodDatabase.filter(f => {
    const matchesSearch = f.name.includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedFoodItem = foodDatabase.find(f => f.id === selectedFood);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <BookOpen size={28} className="text-blue-500" />
          بانک مواد غذایی ایرانی
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {foodDatabase.length} ماده غذایی با اطلاعات تغذیه‌ای کامل
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text" placeholder="جستجوی ماده غذایی..."
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
          />
        </div>
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
          className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white">
          <option value="all">همه دسته‌ها</option>
          {foodCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFoods.map(food => (
          <button key={food.id} onClick={() => setSelectedFood(food.id)}
            className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-right hover:border-primary-500 dark:hover:border-primary-500 transition-all">
            <h3 className="font-bold text-slate-800 dark:text-white">{food.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{food.category} • هر {food.unit} ({food.standardWeight}g)</p>
            <div className="grid grid-cols-4 gap-2 mt-3">
              <div className="text-center p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                <p className="text-xs text-slate-500 dark:text-slate-400">کالری</p>
                <p className="text-sm font-bold text-orange-600 dark:text-orange-400">{food.calories}</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <p className="text-xs text-slate-500 dark:text-slate-400">پروتئین</p>
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{food.protein}g</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                <p className="text-xs text-slate-500 dark:text-slate-400">کربو</p>
                <p className="text-sm font-bold text-green-600 dark:text-green-400">{food.carbs}g</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <p className="text-xs text-slate-500 dark:text-slate-400">چربی</p>
                <p className="text-sm font-bold text-purple-600 dark:text-purple-400">{food.fat}g</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400">ماده‌ای یافت نشد</p>
        </div>
      )}

      {/* Food Detail Modal */}
      {selectedFoodItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedFood(null)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{selectedFoodItem.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{selectedFoodItem.category} • هر {selectedFoodItem.unit} ({selectedFoodItem.standardWeight} گرم)</p>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <InfoBox label="کالری" value={`${selectedFoodItem.calories}`} unit="کالری" color="orange" />
              <InfoBox label="پروتئین" value={`${selectedFoodItem.protein}`} unit="گرم" color="blue" />
              <InfoBox label="کربوهیدرات" value={`${selectedFoodItem.carbs}`} unit="گرم" color="green" />
              <InfoBox label="چربی" value={`${selectedFoodItem.fat}`} unit="گرم" color="purple" />
              <InfoBox label="فیبر" value={`${selectedFoodItem.fiber}`} unit="گرم" color="teal" />
            </div>

            {Object.keys(selectedFoodItem.vitamins).length > 0 && (
              <div className="mb-4">
                <h4 className="font-bold text-slate-700 dark:text-slate-200 mb-2">ویتامین‌ها</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selectedFoodItem.vitamins).map(([key, val]) => (
                    <span key={key} className="px-3 py-1 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 text-xs text-yellow-700 dark:text-yellow-300">
                      {key}: {val}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {Object.keys(selectedFoodItem.minerals).length > 0 && (
              <div>
                <h4 className="font-bold text-slate-700 dark:text-slate-200 mb-2">مواد معدنی</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selectedFoodItem.minerals).map(([key, val]) => (
                    <span key={key} className="px-3 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 text-xs text-cyan-700 dark:text-cyan-300">
                      {key}: {val}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button onClick={() => setSelectedFood(null)}
              className="w-full mt-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoBox({ label, value, unit, color }: { label: string; value: string; unit: string; color: string }) {
  const colors: Record<string, string> = {
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    teal: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400',
  };
  return (
    <div className={`p-3 rounded-xl ${colors[color]}`}>
      <p className="text-xs opacity-70">{label}</p>
      <p className="text-lg font-bold">{value} <span className="text-xs font-normal">{unit}</span></p>
    </div>
  );
}
