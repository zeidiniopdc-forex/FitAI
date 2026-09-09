import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Plus, Trash2, X, Clock, ToggleLeft, ToggleRight } from 'lucide-react';

const reminderTypes = [
  { id: 'workout', label: 'تمرین', icon: '🏋️' },
  { id: 'supplement', label: 'مکمل', icon: '💊' },
  { id: 'meal', label: 'وعده غذایی', icon: '🍽️' },
  { id: 'water', label: 'نوشیدن آب', icon: '💧' },
  { id: 'log_food', label: 'ثبت غذا', icon: '📝' },
  { id: 'log_weight', label: 'ثبت وزن', icon: '⚖️' },
  { id: 'log_photo', label: 'تصویر بدن', icon: '📸' },
  { id: 'assessment', label: 'ارزیابی مجدد', icon: '📊' },
  { id: 'end_cycle', label: 'پایان دوره', icon: '🏁' },
];

const persianDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];

export default function Reminders() {
  const { state, dispatch } = useApp();
  const { reminders } = state;
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('workout');
  const [newTime, setNewTime] = useState('08:00');
  const [newDays, setNewDays] = useState<string[]>(['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه']);

  const handleAdd = () => {
    dispatch({
      type: 'ADD_REMINDER',
      payload: {
        id: `reminder_${Date.now()}`,
        type: newType as any,
        title: newTitle || reminderTypes.find(t => t.id === newType)?.label || '',
        time: newTime,
        enabled: true,
        days: newDays,
      }
    });
    setShowAddModal(false);
    setNewTitle('');
    setNewTime('08:00');
  };

  const toggleDay = (day: string) => {
    setNewDays(newDays.includes(day) ? newDays.filter(d => d !== day) : [...newDays, day]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Bell size={28} className="text-yellow-500" />
            یادآورها و هشدارها
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">مدیریت یادآورهای روزانه</p>
        </div>
        <button onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500 text-white font-medium hover:bg-yellow-600">
          <Plus size={16} />
          یادآور جدید
        </button>
      </div>

      {/* Active Reminders */}
      <div className="space-y-3">
        {reminders.map(reminder => {
          const typeInfo = reminderTypes.find(t => t.id === reminder.type);
          return (
            <div key={reminder.id} className={`bg-white dark:bg-slate-800 rounded-2xl p-4 border transition-all ${
              reminder.enabled ? 'border-slate-200 dark:border-slate-700' : 'border-slate-100 dark:border-slate-800 opacity-60'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{typeInfo?.icon || '🔔'}</span>
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-white">{reminder.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock size={12} className="text-slate-400" />
                      <span className="text-xs text-slate-500 dark:text-slate-400">{reminder.time}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{reminder.days.join('، ')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => dispatch({ type: 'TOGGLE_REMINDER', payload: reminder.id })}
                    className="text-primary-500">
                    {reminder.enabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} className="text-slate-400" />}
                  </button>
                  <button onClick={() => dispatch({ type: 'DELETE_REMINDER', payload: reminder.id })}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {reminders.length === 0 && (
        <div className="text-center py-12">
          <Bell size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <p className="text-slate-500 dark:text-slate-400">یادآوری فعالی وجود ندارد</p>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">یادآور جدید</h3>
              <button onClick={() => setShowAddModal(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">عنوان</label>
                <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)}
                  placeholder="عنوان یادآور..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">نوع</label>
                <select value={newType} onChange={e => setNewType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white">
                  {reminderTypes.map(t => (
                    <option key={t.id} value={t.id}>{t.icon} {t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">ساعت</label>
                <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">روزها</label>
                <div className="flex flex-wrap gap-2">
                  {persianDays.map(day => (
                    <button key={day} onClick={() => toggleDay(day)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        newDays.includes(day)
                          ? 'bg-yellow-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={handleAdd}
              className="w-full mt-6 py-3 rounded-xl bg-yellow-500 text-white font-medium hover:bg-yellow-600">
              ذخیره یادآور
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
