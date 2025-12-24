
import React, { useState, useEffect } from 'react';
import { Page, SensorData } from '../types';

interface Props { onNavigate: (page: Page) => void; }

type WidgetId = 'alerts' | 'actions' | 'metrics' | 'trend' | 'areas' | 'new-feature';

const Dashboard: React.FC<Props> = ({ onNavigate }) => {
  const [sensors, setSensors] = useState<SensorData>({
    temp: 28.5,
    humidity: 65,
    soilMoisture: 72,
    ph: 6.5,
    lux: 12000
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [widgetOrder, setWidgetOrder] = useState<WidgetId[]>(['new-feature', 'alerts', 'actions', 'metrics', 'trend', 'areas']);
  const [hiddenWidgets, setHiddenWidgets] = useState<Set<WidgetId>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => ({
        ...prev,
        temp: +(prev.temp + (Math.random() - 0.5) * 0.2).toFixed(1),
        humidity: +(prev.humidity + (Math.random() - 0.5) * 0.5).toFixed(0),
        soilMoisture: +(prev.soilMoisture + (Math.random() - 0.5) * 0.1).toFixed(0),
        ph: +(prev.ph + (Math.random() - 0.5) * 0.02).toFixed(1),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleShareAlert = async (title: string, desc: string) => {
    const shareText = `[GOFAM ALERT] ${title}\n${desc}\nStatus: Urgent\nTime: ${new Date().toLocaleTimeString()}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Smart Farm Alert',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Native share failed", err);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Cảnh báo đã được sao chép.');
    }
  };

  const renderWidget = (id: WidgetId) => {
    if (!isEditMode && hiddenWidgets.has(id)) return null;

    let content;
    switch (id) {
      case 'new-feature':
        content = (
          <div className="px-4 py-2">
            <button onClick={() => onNavigate('ai-labs')} className="w-full bg-slate-900 dark:bg-primary dark:text-black text-white p-6 rounded-[2.5rem] shadow-xl flex items-center justify-between group active:scale-[0.98] transition-all overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 size-24 bg-white/10 dark:bg-black/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="size-12 rounded-2xl bg-primary/20 dark:bg-black/10 flex items-center justify-center text-primary dark:text-black">
                  <span className="material-symbols-outlined !text-3xl font-black">auto_awesome</span>
                </div>
                <div className="text-left">
                  <h3 className="text-base font-black uppercase tracking-tight">Thêm tính năng mới</h3>
                  <p className="text-[10px] opacity-60 font-black uppercase tracking-widest mt-1">AI Module Feature Store</p>
                </div>
              </div>
              <div className="bg-white/20 dark:bg-black/10 size-10 rounded-xl flex items-center justify-center backdrop-blur-md">
                <span className="material-symbols-outlined">add</span>
              </div>
            </button>
          </div>
        );
        break;
      case 'alerts':
        content = (
          <div className="mt-4 pl-4 pb-2">
            <div className="flex items-center justify-between pr-4 mb-3">
               <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Cảnh báo ưu tiên</h3>
               <span className="text-[10px] font-black text-red-500 uppercase tracking-widest animate-pulse">Live</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-4 pr-4 no-scrollbar snap-x">
              <div className="snap-center min-w-[85%] bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50 rounded-2xl p-4 flex gap-3 shadow-sm active:scale-[0.98] transition-transform relative group">
                <div className="flex-shrink-0 bg-red-100 dark:bg-red-800/40 p-2.5 rounded-xl h-fit">
                  <span className="material-symbols-outlined text-red-600 dark:text-red-400">water_loss</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[9px] font-black text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-800/30 px-2 py-0.5 rounded uppercase tracking-widest">Khẩn cấp</p>
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-bold text-gray-400">10p trước</span>
                       <button 
                         onClick={() => handleShareAlert('Khu A - Mực nước thấp', 'Mực nước hồ chứa dưới 10%. Cần bơm.')}
                         className="size-6 rounded-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-primary transition-all opacity-0 group-hover:opacity-100"
                       >
                         <span className="material-symbols-outlined !text-[14px]">share</span>
                       </button>
                    </div>
                  </div>
                  <p className="text-sm font-black text-gray-900 dark:text-gray-100 truncate">Khu A - Mực nước thấp</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-1 font-medium">Mực nước hồ chứa dưới 10%. Cần bơm.</p>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case 'actions':
        content = (
          <div className="px-4 py-2">
            <div className="bg-white dark:bg-surface-dark rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-start">
                {[
                  { label: 'Quét AI', icon: 'center_focus_weak', color: 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:text-primary dark:border-green-800', page: 'scan' },
                  { label: 'Tạo việc', icon: 'add_task', color: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800', page: 'add-task' },
                  { label: 'Đầu tư', icon: 'monitoring', color: 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800', page: 'adoption' },
                  { label: 'Báo cáo', icon: 'analytics', color: 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-border-800', page: 'reports' },
                  { label: 'Kiểm tra AP', icon: 'radar', color: 'bg-gray-50 text-gray-600 border-gray-100 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700', page: 'ap-check' }
                ].map((action, i) => (
                  <button key={i} onClick={() => onNavigate(action.page as Page)} className="flex flex-col items-center gap-2 group w-1/5 transition-all active:scale-90">
                    <div className={`size-11 rounded-full flex items-center justify-center border shadow-sm transition-transform ${action.color}`}>
                      <span className="material-symbols-outlined text-xl">{action.icon}</span>
                    </div>
                    <span className="text-[10px] font-bold text-center text-gray-500 dark:text-gray-400 leading-tight uppercase tracking-wider">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
        break;
      case 'metrics':
        content = (
          <div className="px-4 py-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Chỉ số thời gian thực</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
                <div className="flex justify-between items-start z-10 relative">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Nhiệt độ</p>
                    <p className="text-xl font-black mt-1 dark:text-white">{sensors.temp}°C</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
                <div className="flex justify-between items-start z-10 relative">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Độ ẩm KK</p>
                    <p className="text-xl font-black mt-1 dark:text-white">{sensors.humidity}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      default: content = null;
    }

    if (isEditMode) {
      return (
        <div key={id} className={`relative border-2 border-dashed rounded-[2.5rem] my-2 transition-all group/edit ${hiddenWidgets.has(id) ? 'opacity-40 grayscale border-gray-300' : 'border-primary/40'}`}>
          <div className="absolute top-4 right-4 z-[70] flex gap-2">
            <button onClick={() => { const newH = new Set(hiddenWidgets); newH.has(id) ? newH.delete(id) : newH.add(id); setHiddenWidgets(newH); }} className={`size-8 rounded-full flex items-center justify-center shadow-lg transition-colors ${hiddenWidgets.has(id) ? 'bg-gray-200 text-gray-500' : 'bg-primary text-black'}`}>
              <span className="material-symbols-outlined !text-xl">{hiddenWidgets.has(id) ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
          <div className="pointer-events-none">{content}</div>
        </div>
      );
    }
    return <div key={id} className="animate-fadeIn">{content}</div>;
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main-light dark:text-gray-100 font-display min-h-screen flex flex-col overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-primary/20 text-primary-dark dark:text-primary">
            <span className="material-symbols-outlined font-bold">eco</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">GOFAM PRO</span>
            <button className="flex items-center gap-1 -ml-1 px-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span className="text-sm font-black text-text-main-light dark:text-white leading-tight">Farm 1 - Đà Lạt</span>
              <span className="material-symbols-outlined text-lg">expand_more</span>
            </button>
          </div>
        </div>
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-gray-700 dark:text-gray-300">notifications</span>
          <span className="absolute top-2 right-2 size-2.5 bg-red-500 rounded-full border-2 border-background-light dark:border-background-dark"></span>
        </button>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto pb-32">
        <div className="px-4 pt-6 pb-2 flex items-end justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Xin chào, Nguyễn Văn A 👋</p>
            <h1 className="text-2xl font-black mt-1 tracking-tight">{isEditMode ? 'Tùy chỉnh Dashboard' : 'Tổng quan trang trại'}</h1>
          </div>
          <button onClick={() => setIsEditMode(!isEditMode)} className={`flex items-center gap-1 px-3 py-2 rounded-xl shadow-sm text-[10px] font-black uppercase tracking-widest transition-all ${isEditMode ? 'bg-primary text-black shadow-glow' : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 hover:bg-gray-50'}`}>
            <span className="material-symbols-outlined text-sm">{isEditMode ? 'done' : 'tune'}</span>
            {isEditMode ? 'Xong' : 'Tùy chỉnh'}
          </button>
        </div>
        <div className="space-y-1">{widgetOrder.map(renderWidget)}</div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-white/95 backdrop-blur-xl border-t border-slate-100 px-6 pb-6 flex justify-between items-center z-[60] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button className="flex flex-col items-center gap-1.5 text-primary scale-105">
          <span className="material-symbols-outlined material-symbols-filled !text-[28px]">grid_view</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Tổng quan</span>
        </button>
        <button onClick={() => onNavigate('virtual-garden')} className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-primary transition-colors group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">potted_plant</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Vườn ảo</span>
        </button>
        <div className="relative -top-6">
          <button onClick={() => onNavigate('add-task')} className="size-15 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-green-200 active:scale-90 transition-transform ring-[6px] ring-white">
            <span className="material-symbols-outlined text-3xl font-black">add</span>
          </button>
        </div>
        <button onClick={() => onNavigate('reports')} className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-primary transition-colors group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">analytics</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Báo cáo</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-primary transition-colors group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">person</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Cá nhân</span>
        </button>
      </nav>

      <style>{`
        .size-15 { width: 3.75rem; height: 3.75rem; }
        .shadow-glow { box-shadow: 0 0 15px rgba(22, 163, 74, 0.3); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Dashboard;
