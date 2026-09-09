import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Camera, Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';

export default function BodyPhotos() {
  const { state, dispatch } = useApp();
  const { bodyPhotos } = state;
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newPeriod, setNewPeriod] = useState(`دوره ${state.currentPeriod}`);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedCompare, setSelectedCompare] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    if (!previewUrl) return;
    dispatch({
      type: 'ADD_BODY_PHOTO',
      payload: {
        id: `photo_${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        imageUrl: previewUrl,
        weight: parseFloat(newWeight) || 0,
        notes: newNotes,
        period: newPeriod,
      }
    });
    setShowAddModal(false);
    setPreviewUrl('');
    setNewWeight('');
    setNewNotes('');
  };

  const toggleCompare = (id: string) => {
    if (selectedCompare.includes(id)) {
      setSelectedCompare(selectedCompare.filter(i => i !== id));
    } else if (selectedCompare.length < 3) {
      setSelectedCompare([...selectedCompare, id]);
    }
  };

  const photosByPeriod = bodyPhotos.reduce((acc, photo) => {
    if (!acc[photo.period]) acc[photo.period] = [];
    acc[photo.period].push(photo);
    return acc;
  }, {} as Record<string, typeof bodyPhotos>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Camera size={28} className="text-purple-500" />
            تصاویر بدن
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">مقایسه پیشرفت ظاهری در دوره‌های مختلف</p>
        </div>
        <div className="flex gap-2">
          {bodyPhotos.length >= 2 && (
            <button onClick={() => { setCompareMode(!compareMode); setSelectedCompare([]); }}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                compareMode ? 'bg-purple-500 text-white' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
              }`}>
              {compareMode ? 'لغو مقایسه' : 'مقایسه'}
            </button>
          )}
          <button onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600">
            <Plus size={16} />
            افزودن تصویر
          </button>
        </div>
      </div>

      {/* Compare View */}
      {compareMode && selectedCompare.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4">مقایسه تصاویر</h3>
          <div className={`grid gap-4 ${selectedCompare.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {selectedCompare.map(id => {
              const photo = bodyPhotos.find(p => p.id === id);
              if (!photo) return null;
              return (
                <div key={id} className="text-center">
                  <img src={photo.imageUrl} alt="" className="w-full h-64 object-cover rounded-xl" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mt-2">{photo.period}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{photo.date} • {photo.weight} kg</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Photos by Period */}
      {Object.keys(photosByPeriod).length > 0 ? (
        Object.entries(photosByPeriod).map(([period, photos]) => (
          <div key={period} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 text-sm font-bold">
                {period}
              </span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map(photo => (
                <div key={photo.id} className={`relative group rounded-xl overflow-hidden ${compareMode ? 'ring-2 ring-transparent hover:ring-purple-500 cursor-pointer' : ''} ${selectedCompare.includes(photo.id) ? 'ring-2 ring-purple-500' : ''}`}
                  onClick={() => compareMode && toggleCompare(photo.id)}>
                  <img src={photo.imageUrl} alt="" className="w-full h-48 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-xs text-white">{photo.date} • {photo.weight} kg</p>
                    {photo.notes && <p className="text-xs text-white/70 mt-1">{photo.notes}</p>}
                  </div>
                  {!compareMode && (
                    <button onClick={(e) => { e.stopPropagation(); dispatch({ type: 'DELETE_BODY_PHOTO', payload: photo.id }); }}
                      className="absolute top-2 left-2 p-1 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-20">
          <ImageIcon size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">تصویری ثبت نشده</h2>
          <p className="text-slate-500 dark:text-slate-400">تصاویر بدن خود را برای مقایسه پیشرفت ثبت کنید.</p>
        </div>
      )}

      {/* Add Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">افزودن تصویر بدن</h3>
              <button onClick={() => setShowAddModal(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">دوره</label>
                <input type="text" value={newPeriod} onChange={e => setNewPeriod(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">وزن (کیلوگرم)</label>
                <input type="number" value={newWeight} onChange={e => setNewWeight(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">توضیحات (اختیاری)</label>
                <textarea value={newNotes} onChange={e => setNewNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white resize-none h-20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">تصویر</label>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                {previewUrl ? (
                  <div className="relative">
                    <img src={previewUrl} alt="" className="w-full h-48 object-cover rounded-xl" />
                    <button onClick={() => setPreviewUrl('')}
                      className="absolute top-2 left-2 p-1 rounded-lg bg-red-500 text-white">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => fileInputRef.current?.click()}
                    className="w-full py-8 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-primary-500 hover:text-primary-500 transition-all">
                    <Camera size={24} className="mx-auto mb-2" />
                    <p className="text-sm">انتخاب تصویر</p>
                  </button>
                )}
              </div>
            </div>
            
            <button onClick={handleAdd} disabled={!previewUrl}
              className="w-full mt-4 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 disabled:opacity-50">
              ذخیره تصویر
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
