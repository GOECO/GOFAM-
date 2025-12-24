
import React, { useState, useEffect } from 'react';
import { Page, SensorData } from '../types';

interface Props { onNavigate: (page: Page) => void; }

const Dashboard: React.FC<Props> = ({ onNavigate }) => {
  const [sensors, setSensors] = useState<SensorData>({
    temp: 28.5,
    humidity: 65,
    soilMoisture: 42,
    ph: 6.5,
    lux: 12000
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => ({
        ...prev,
        temp: +(prev.temp + (Math.random() - 0.5) * 0.1).toFixed(1),
        humidity: Math.min(100, Math.max(0, prev.humidity + Math.floor(Math.random() * 3) - 1)),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleShareAlert = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `⚠️ CẢNH BÁO GOFAM PRO: Vườn 1 thiếu nước nghiêm trọng (${sensors.soilMoisture}%). Cần xử lý ngay!`;
    if (navigator.share) {
      navigator.share({ title: 'Gofam Alert', text: shareText }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Đã sao chép nội dung cảnh báo.');
    }
  };

  const zones = [
    { id: '1', name: 'Vườn Ổi', desc: '120 Cây • Đang ra hoa', status: 'good', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLXArEVl7PI8hLTtcO-S6z0KfGYQ4ZUBIYe4wrybFRthoyAIhUjaTkNe6Q9Q5HlVNcmYIv1mgdEdrKv5ZIng4_bX_rjiplTB8dXjOM7dEXbC5jjKSNaJuDPY_ZYeRD2zihzgZyJKr3vHCCori-3vSGEFzG6rMnPIAk1dpF4oayzKivWPIS9Xf0P8PGAXRMrS3Y8RAfOg331Yg1h9RyJBII7aq3IbQtZU9CUVE15PQwGdfQEwZ5OSAddPyYniVjfmZ7RsjG8vTXxCon' },
    { id: '2', name: 'Chuồng Gà', desc: '500 Con • Ăn dặm', status: 'warning', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs46jIDn1rWA8LmwCK-jBz375KK7yyGPdQ5eC7aF5KiHgKm6p8nBKh-m4_-yAsDRRMlEAAFtqLRFQNgbNzaHaiwxnStPLeKz7W6LWbV9lUTKd1DA5zybf2LMaX9jckJYNZSNkjet13PWbLvpwHmHihcAApwwvDdYiQ2giVtPOOgL9ZAbSiOQPnvwqxYk3RcgSWIR-2YBOpzFAHjblNtIcb5dIfsUABhniuVpJMmD3GP1BTqsCiGJdQ1BzZMc18vqAfTQkDUTXlCJ9q' }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-[#111714] pb-24 transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md">
        <div className="flex items-center px-5 py-4 justify-between">
          <div className="flex items-center gap-3">
             <div className="size-11 rounded-2xl bg-primary flex items-center justify-center shadow-glow">
                <span className="material-symbols-outlined text-[#111714] font-black">agriculture</span>
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] font-black text-primary tracking-[0.2em] uppercase leading-none mb-1">GOFAM PRO</span>
               <h1 className="text-lg font-bold leading-none dark:text-white uppercase tracking-tight">Ba Vì Farm</h1>
             </div>
          </div>
          <button onClick={() => onNavigate('notifications')} className="relative flex size-11 items-center justify-center rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-gray-800">
            <span className="material-symbols-outlined dark:text-white">notifications</span>
            <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-surface-dark"></span>
          </button>
        </div>
      </header>

      <main className="flex flex-col gap-5 px-5 pt-2">
        {/* Critical Alert Banner with exact classes for selector matching */}
        <section 
          onClick={() => onNavigate('area-details')}
          className="w-full rounded-[1.5rem] bg-red-50 dark:bg-red-900/20 border-red-500 border ring-1 ring-red-500/50 shadow-xl scale-[1.02] p-4 group transition-all cursor-pointer relative shadow-[0_0_50px_rgba(239,68,68,0.25)]"
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3 flex-1 min-w-0 relative">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg animate-pulse">
                <span className="material-symbols-outlined">emergency_home</span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="1 text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest group-hover:text-red-900 transition-colors">
                  CẢNH BÁO KHẨN CẤP
                  {/* Tooltip implementation */}
                  <div className="absolute -top-14 left-0 bg-red-600 text-white text-[9px] font-black px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-[100] shadow-2xl border border-red-400/30 translate-y-2 group-hover:translate-y-0 uppercase tracking-widest">
                    AI: Cần can thiệp ngay lập tức!
                    <div className="absolute -bottom-1 left-4 w-2 h-2 bg-red-600 rotate-45"></div>
                  </div>
                </h3>
                <p className="text-xs font-bold text-red-900 dark:text-red-200 truncate">Vườn 1 thiếu nước nghiêm trọng!</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={handleShareAlert}
                className="size-10 rounded-xl bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-100 flex items-center justify-center border border-red-200 dark:border-red-700 active:scale-90 transition-all shadow-sm"
                title="Chia sẻ báo cáo"
              >
                <span className="material-symbols-outlined font-black">share</span>
              </button>
              <button className="bg-red-600 text-white px-4 h-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                Xử lý
              </button>
            </div>
          </div>
        </section>

        {/* Quick Weather */}
        <section onClick={() => onNavigate('weather')} className="w-full rounded-[2rem] bg-blue-500 p-5 text-white shadow-xl relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 opacity-20 transform group-hover:scale-110 transition-transform">
             <span className="material-symbols-outlined !text-[80px]">cloud</span>
          </div>
          <div className="relative z-10 flex justify-between h-full">
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-black uppercase tracking-tight">Thời tiết Farm</h3>
                <p className="text-[10px] opacity-70 uppercase tracking-widest font-bold">Trời nắng nhẹ</p>
              </div>
              <h2 className="text-4xl font-black tracking-tighter mt-4">{sensors.temp}°C</h2>
            </div>
            <div className="flex flex-col items-end justify-between">
               <span className="material-symbols-outlined text-3xl text-yellow-300 material-symbols-filled">wb_sunny</span>
               <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                  Chi tiết <span className="material-symbols-outlined !text-sm">arrow_forward</span>
               </div>
            </div>
          </div>
        </section>

        {/* Admin Pro Controls */}
        <section className="grid grid-cols-2 gap-3">
          <button onClick={() => onNavigate('attendance')} className="flex items-center gap-3 rounded-[1.75rem] bg-blue-600 p-4 shadow-lg active:scale-[0.97] transition-all group overflow-hidden relative">
            <div className="size-11 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined font-bold">fact_check</span>
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-xs font-black text-white uppercase">Nhân sự</span>
              <span className="text-[8px] font-bold text-white/70 uppercase">Điểm danh</span>
            </div>
          </button>
          <button onClick={() => onNavigate('virtual-farm')} className="flex items-center gap-3 rounded-[1.75rem] bg-primary p-4 shadow-lg active:scale-[0.97] transition-all group overflow-hidden relative">
            <div className="size-11 rounded-2xl bg-black/10 flex items-center justify-center text-black backdrop-blur-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined font-bold">videogame_asset</span>
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-xs font-black text-black uppercase">IoT Farm</span>
              <span className="text-[8px] font-bold text-black/60 uppercase">Trại ảo</span>
            </div>
          </button>
        </section>

        {/* Discovery Items */}
        <section className="grid grid-cols-3 gap-3">
          {[
            { id: 'inv', title: 'Kho Vật Tư', icon: 'inventory_2', color: 'bg-blue-500/10', page: 'inventory' as Page },
            { id: 'mkt', title: 'Chợ Nông Sản', icon: 'storefront', color: 'bg-emerald-500/10', page: 'marketplace' as Page },
            { id: 'ai', title: 'Dữ liệu AI', icon: 'psychology', color: 'bg-purple-500/10', page: 'ai-data' as Page },
          ].map((item) => (
            <button key={item.id} onClick={() => onNavigate(item.page)} className="flex flex-col items-center justify-center gap-2 py-4 rounded-3xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm active:scale-95 transition-all group">
              <div className={`size-10 rounded-xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest text-center px-1 text-gray-500 dark:text-gray-400">{item.title}</span>
            </button>
          ))}
        </section>

        {/* Vital Sensors */}
        <section>
          <h2 className="text-base font-black text-[#111714] dark:text-white uppercase tracking-tight mb-3 pl-1">Cảm biến hiện trường</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2 rounded-[2rem] bg-white dark:bg-surface-dark p-5 shadow-sm border border-gray-100 dark:border-gray-800 active:scale-95 transition-transform">
              <div className="flex items-center gap-1.5 text-gray-400">
                <span className="material-symbols-outlined text-orange-500 !text-lg">thermostat</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Nhiệt độ</span>
              </div>
              <p className="text-3xl font-black text-[#111714] dark:text-white tracking-tighter">{sensors.temp}°C</p>
            </div>
            <div className="flex flex-col gap-2 rounded-[2rem] bg-white dark:bg-surface-dark p-5 shadow-sm border border-gray-100 dark:border-gray-800 active:scale-95 transition-transform">
              <div className="flex items-center gap-1.5 text-gray-400">
                <span className="material-symbols-outlined text-blue-500 !text-lg">humidity_percentage</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Độ ẩm đất</span>
              </div>
              <p className="text-3xl font-black text-[#111714] dark:text-white tracking-tighter">{sensors.soilMoisture}%</p>
            </div>
          </div>
        </section>

        {/* Scan Entry */}
        <button onClick={() => onNavigate('scan')} className="w-full rounded-[2rem] bg-primary p-5 shadow-lg active:scale-[0.98] transition-all hover:bg-primary-dark group flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-white/30 flex items-center justify-center text-[#111714] shadow-inner">
            <span className="material-symbols-outlined !text-3xl font-black">center_focus_weak</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-lg font-black text-[#111714] uppercase tracking-tight">Quét Sâu Bệnh AI</span>
            <span className="text-[9px] font-black text-[#111714]/60 uppercase tracking-[0.2em]">Gemini Vision Pro v2.5</span>
          </div>
        </button>

        {/* Zone List */}
        <section className="mb-4">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-base font-black text-[#111714] dark:text-white uppercase tracking-tight">Các khu vực</h2>
            <button onClick={() => onNavigate('areas')} className="text-[9px] font-black text-primary uppercase tracking-[0.2em] hover:underline">Xem hết</button>
          </div>
          <div className="flex flex-col gap-3">
            {zones.map(zone => (
              <div key={zone.id} onClick={() => onNavigate('area-details')} className="flex items-center justify-between rounded-3xl bg-white dark:bg-surface-dark p-3 border border-gray-100 dark:border-gray-800 active:scale-[0.99] transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="size-12 shrink-0 rounded-2xl bg-cover bg-center border border-gray-100 dark:border-gray-700" style={{ backgroundImage: `url('${zone.img}')` }}></div>
                  <div className="flex flex-col">
                    <h3 className="text-sm font-black text-[#111714] dark:text-white uppercase tracking-tight">{zone.name}</h3>
                    <p className="text-[10px] text-gray-400 font-medium">{zone.desc}</p>
                  </div>
                </div>
                <div className={`flex items-center justify-center size-8 rounded-full ${zone.status === 'good' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30'}`}>
                  <span className="material-symbols-outlined !text-lg material-symbols-filled">{zone.status === 'good' ? 'check_circle' : 'warning'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Assistant */}
      <div className="fixed bottom-24 right-6 z-[60]">
        <button onClick={() => onNavigate('ai-chat')} className="size-14 rounded-full bg-primary text-black shadow-glow flex items-center justify-center active:scale-90 transition-all border-4 border-white dark:border-background-dark animate-bounce-slow">
          <span className="material-symbols-outlined text-2xl font-black">smart_toy</span>
        </button>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 px-6 h-20 pb-6 flex justify-between items-center transition-colors">
        <button className="flex flex-col items-center gap-1 text-primary scale-110">
          <span className="material-symbols-outlined material-symbols-filled !text-[26px]">grid_view</span>
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Tổng quan</span>
        </button>
        <button onClick={() => onNavigate('tasks')} className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined !text-[24px]">calendar_month</span>
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Lịch vụ</span>
        </button>
        <button onClick={() => onNavigate('messages')} className="flex flex-col items-center gap-1 text-slate-400 relative">
          <span className="material-symbols-outlined !text-[24px]">chat_bubble</span>
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Nhóm</span>
          <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border border-white dark:border-surface-dark"></span>
        </button>
        <button onClick={() => onNavigate('reports')} className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined !text-[24px]">bar_chart</span>
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Báo cáo</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined !text-[24px]">person</span>
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Cá nhân</span>
        </button>
      </nav>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default Dashboard;
