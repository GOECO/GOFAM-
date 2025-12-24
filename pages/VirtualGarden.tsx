
import React, { useState } from 'react';
import { Page, GardenNotification } from '../types';

interface Props { 
  onBack: () => void; 
  onNavigate: (page: Page) => void; 
}

const SAMPLE_NOTIFICATIONS: GardenNotification[] = [
  {
    id: 'n1',
    type: 'irrigation',
    title: 'Hệ thống đã tưới nước',
    desc: 'Đã hoàn thành chu kỳ tưới 15 phút tại Block 2.',
    time: 'Vừa xong',
    isNew: true
  },
  {
    id: 'n2',
    type: 'alert',
    title: 'Cảnh báo nhiệt độ',
    desc: 'Nhiệt độ nhà kính vượt ngưỡng 32°C. Đã bật quạt.',
    time: '15 phút trước',
    isNew: true
  },
  {
    id: 'n3',
    type: 'ai',
    title: 'AI Chẩn đoán hoàn tất',
    desc: 'Báo cáo bệnh đốm lá đã sẵn sàng để xem.',
    time: '1 giờ trước',
    isNew: false
  },
  {
    id: 'n4',
    type: 'milestone',
    title: 'Cây đã ra hoa',
    desc: 'Chúc mừng! Vườn Dưa lưới đã bước vào giai đoạn ra hoa.',
    time: '3 giờ trước',
    isNew: false
  }
];

const VirtualGarden: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<GardenNotification[]>(SAMPLE_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => n.isNew).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isNew: false })));
  };

  const deleteNotif = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-white dark:bg-background-dark font-display antialiased transition-colors duration-300">
      {/* Grid Background Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-5" style={{
        backgroundImage: `linear-gradient(#16a34a 1px, transparent 1px), linear-gradient(90deg, #16a34a 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        backgroundPosition: 'center bottom',
        perspective: '1000px'
      }}>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white dark:from-background-dark via-white/80 dark:via-background-dark/80 to-transparent"></div>
      </div>

      <header className="flex items-center p-4 justify-between bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 dark:border-gray-800">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-slate-700 dark:text-gray-300">arrow_back</span>
        </button>
        <h1 className="text-base font-black leading-tight tracking-tight text-center flex-1 truncate px-2 text-slate-800 dark:text-white uppercase">
          Nông trại ảo: Nuôi trồng
        </h1>
        <button 
          onClick={() => setIsNotificationsOpen(true)}
          className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors relative"
        >
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 size-4 bg-red-500 rounded-full border-2 border-white dark:border-surface-dark flex items-center justify-center text-[8px] font-black text-white animate-bounce">
              {unreadCount}
            </span>
          )}
          <span className={`material-symbols-outlined text-slate-700 dark:text-gray-300 ${unreadCount > 0 ? 'material-symbols-filled' : ''}`}>notifications</span>
        </button>
      </header>

      <main className="flex-1 relative flex flex-col overflow-y-auto no-scrollbar z-10">
        <div className="px-4 pt-4 flex justify-between items-start">
          <div className="flex gap-2">
            <div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur border border-slate-200 dark:border-gray-700 rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-amber-500 text-sm">sunny</span>
              <span className="text-xs font-mono font-black text-slate-700 dark:text-gray-300">28°C</span>
            </div>
            <div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur border border-slate-200 dark:border-gray-700 rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-blue-500 text-sm">water_drop</span>
              <span className="text-xs font-mono font-black text-slate-700 dark:text-gray-300">72%</span>
            </div>
          </div>
          <div className="bg-green-50 dark:bg-primary/10 backdrop-blur border border-green-200 dark:border-primary/20 rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-black text-primary uppercase tracking-wider">Live Sync</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center py-6">
          <div className="bg-white/90 dark:bg-surface-dark/90 border border-slate-200 dark:border-gray-800 p-5 rounded-[2rem] max-w-[300px] w-full mb-8 transform transition-all hover:scale-105 duration-300 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-slate-800 dark:text-white font-black text-lg uppercase tracking-tight">Dưa Lưới - Khu B</h3>
              <span className="text-[9px] bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-gray-400 px-2 py-0.5 rounded font-black border border-slate-200 dark:border-gray-700 uppercase">ID: #DL-092</span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase mb-1.5 text-gray-400">
                  <span>Sức khỏe</span>
                  <span className="text-primary">98%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden border border-slate-100 dark:border-gray-800">
                  <div className="h-full bg-primary shadow-glow rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-gray-800">
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-400 uppercase tracking-widest font-black">Giai đoạn</span>
                  <span className="text-slate-800 dark:text-white font-black text-sm uppercase">Ra hoa (Flowering)</span>
                </div>
                <div className="size-10 rounded-2xl bg-green-50 dark:bg-primary/10 flex items-center justify-center border border-green-100 dark:border-primary/20 text-primary">
                  <span className="material-symbols-outlined !text-xl">potted_plant</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-64 h-64 flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
            <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-4">
              <img 
                alt="Melon Plant" 
                className="w-56 h-56 object-cover rounded-[3rem] shadow-2xl border-4 border-white dark:border-surface-dark" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1qbECoTDhOcSRvJ7sxbs6fLC5B239mwg2trj0vEs4nXVPNQpQzZWHaZjZpHs0AsQFkmqVcF93Q-8nwseS_GGqVkV5ZPgnQk4nRfE5kKjYb2HLveisVATSxQqbD12-AGsryu7AC0Mb2tzDMKwdFloG03-pPsgY5D7CwDDrvBENlIisHR2HTiFI4GJc8eIujUPRLTzrAfYEusWyxptwCBWwpjRlKlu_qgn_5-DLWKF7suZIogLVrYytRrV8rrWb_OXS7MxyiweA_wrB" 
              />
            </div>
            <div className="absolute -right-4 top-8 bg-white dark:bg-surface-dark px-4 py-2 rounded-full shadow-2xl border border-slate-100 dark:border-gray-800 animate-bounce flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500 !text-base">water_drop</span>
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">Cần nước</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-surface-dark border-t border-slate-100 dark:border-gray-800 rounded-t-[3rem] p-6 pb-24 relative z-20 shadow-[0_-10px_60px_rgba(0,0,0,0.05)]">
          <div className="w-12 h-1.5 bg-slate-200 dark:bg-gray-800 rounded-full mx-auto mb-8"></div>
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-slate-900 dark:text-white text-2xl font-black tracking-tight uppercase">Chăm sóc</h2>
                <p className="text-slate-500 dark:text-gray-400 text-sm mt-1 font-medium">Tương tác để cập nhật nhật ký</p>
              </div>
              <button 
                onClick={() => onNavigate('cultivation-log')}
                className="text-[10px] font-black text-primary uppercase tracking-widest bg-green-50 dark:bg-primary/10 px-3 py-1.5 rounded-xl transition-colors hover:bg-green-100 flex items-center gap-2"
              >
                Lịch sử <span className="material-symbols-outlined !text-sm">history</span>
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Tưới nước', icon: 'sprinkler', color: 'text-blue-500', hover: 'group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20' },
                { label: 'Bón phân', icon: 'compost', color: 'text-amber-500', hover: 'group-hover:bg-amber-50 dark:group-hover:bg-amber-900/20' },
                { label: 'Sâu bệnh', icon: 'bug_report', color: 'text-red-500', hover: 'group-hover:bg-red-50 dark:group-hover:bg-red-900/20' },
                { label: 'AI Scan', icon: 'smart_toy', color: 'text-purple-500', hover: 'group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20' }
              ].map((act, i) => (
                <button key={i} className="group flex flex-col items-center gap-3">
                  <div className={`size-16 rounded-2xl bg-slate-50 dark:bg-gray-800/50 border border-slate-100 dark:border-gray-800 flex items-center justify-center transition-all active:scale-90 shadow-sm ${act.hover}`}>
                    <span className={`material-symbols-outlined ${act.color} text-2xl group-hover:scale-110 transition-transform`}>{act.icon}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-widest">{act.label}</span>
                </button>
              ))}
            </div>

            <div className="h-px w-full bg-slate-50 dark:bg-gray-800"></div>
            
            <button onClick={() => onNavigate('area-details')} className="w-full bg-slate-900 dark:bg-white dark:text-black hover:bg-black text-white h-16 rounded-[1.5rem] flex items-center justify-between px-6 shadow-xl transition-all active:scale-[0.98]">
              <div className="flex flex-col items-start">
                <span className="text-xs font-black uppercase tracking-widest">Xem chi tiết thực tế</span>
                <span className="text-[8px] opacity-60 font-mono text-slate-300 dark:text-gray-600 uppercase mt-0.5">LIVE CAM & SENSORS</span>
              </div>
              <div className="bg-white/20 dark:bg-black/10 size-10 rounded-xl flex items-center justify-center backdrop-blur-md">
                <span className="material-symbols-outlined !text-lg">arrow_forward</span>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Notification Drawer Overlay */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-[fadeIn_0.3s_ease-out]"
            onClick={() => setIsNotificationsOpen(false)}
          ></div>
          <div className="relative w-full max-w-[320px] bg-white dark:bg-surface-dark h-full shadow-2xl flex flex-col animate-[slideInRight_0.4s_ease-out] border-l border-slate-100 dark:border-gray-800">
            <header className="p-6 border-b border-slate-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight dark:text-white">Thông báo</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Hoạt động vườn ảo</p>
              </div>
              <button 
                onClick={() => setIsNotificationsOpen(false)}
                className="size-10 rounded-full hover:bg-slate-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
              {notifications.length > 0 ? (
                <>
                  <div className="flex justify-between items-center px-2 mb-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Gần đây</span>
                    <button onClick={markAllRead} className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Đánh dấu đã đọc</button>
                  </div>
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className={`p-4 rounded-3xl border transition-all active:scale-[0.98] relative group ${notif.isNew ? 'bg-primary/5 border-primary/20' : 'bg-slate-50 dark:bg-black/20 border-transparent'}`}
                    >
                      {notif.isNew && <div className="absolute top-4 right-4 size-2 bg-primary rounded-full animate-pulse"></div>}
                      <div className="flex gap-4">
                        <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                          notif.type === 'irrigation' ? 'bg-blue-100 text-blue-500' :
                          notif.type === 'alert' ? 'bg-red-100 text-red-500' :
                          notif.type === 'ai' ? 'bg-purple-100 text-purple-500' : 'bg-green-100 text-green-500'
                        }`}>
                          <span className="material-symbols-outlined !text-xl">{
                            notif.type === 'irrigation' ? 'water_drop' :
                            notif.type === 'alert' ? 'warning' :
                            notif.type === 'ai' ? 'smart_toy' : 'check_circle'
                          }</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-black dark:text-white uppercase leading-tight truncate pr-4">{notif.title}</h4>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed mt-1">{notif.desc}</p>
                          <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-widest">{notif.time}</p>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); deleteNotif(notif.id); }}
                        className="absolute bottom-4 right-4 size-6 rounded-lg bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <span className="material-symbols-outlined !text-base">delete</span>
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-30 text-center px-10">
                  <span className="material-symbols-outlined !text-[4rem] mb-4">notifications_off</span>
                  <p className="text-xs font-black uppercase tracking-widest leading-relaxed">Không có thông báo mới nào</p>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-slate-100 dark:border-gray-800">
               <button className="w-full h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all">
                  Cài đặt thông báo
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-slate-100 dark:border-gray-800 px-6 h-20 pb-6 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-colors">
        <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center gap-1.5 text-slate-400 group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">grid_view</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Tổng quan</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-primary scale-110">
          <span className="material-symbols-outlined material-symbols-filled !text-[28px]">potted_plant</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Vườn ảo</span>
        </button>
        <div className="relative -top-6">
          <button onClick={() => onNavigate('add-task')} className="size-15 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-green-200 active:scale-90 transition-transform ring-[6px] ring-white dark:ring-surface-dark">
            <span className="material-symbols-outlined text-3xl font-black">add</span>
          </button>
        </div>
        <button onClick={() => onNavigate('reports')} className="flex flex-col items-center gap-1.5 text-slate-400 group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">analytics</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Báo cáo</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1.5 text-slate-400 group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">person</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Cá nhân</span>
        </button>
      </nav>

      <style>{`
        .size-15 { width: 3.75rem; height: 3.75rem; }
        .shadow-glow { box-shadow: 0 0 15px rgba(22, 163, 74, 0.3); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
};

export default VirtualGarden;
