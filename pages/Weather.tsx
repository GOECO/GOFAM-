
import React from 'react';

interface Props { onBack: () => void; }

const Weather: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-10">
      <header className="sticky top-0 z-50 bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between shadow-sm">
        <button onClick={onBack} className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-base font-bold leading-tight">Thời tiết Farm</h2>
          <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Pro Mode</span>
        </div>
        <button className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center">
          <span className="material-symbols-outlined">tune</span>
        </button>
      </header>

      <main className="p-4 space-y-6">
        <div className="relative rounded-3xl overflow-hidden h-[400px] shadow-xl group">
          <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwUAVZEb14VRAoKuYZHOXfBV4p5Uh9U0yCi5IWMdKfB7hRoFAa_GwCE_O5x0gMTYnUdZLiVLDwZAkWPer-eS-7B543Nd9ewohU6rbttZ2wm3qGSjvreQ8dsPVuQZCA93UTzKRPVRRz6au5THo_yqWygmsB5MczRSmMZMuGBQjtzV31KrcWepeTVsIPLTRaPpQOrF-qi0iSvTgIT9-Wo87Z3Y7v7GBS-Nlq78xMIrxNXCAAE3LQk2_sonebOHTJ_Bh4yNlwfFZrORdW" alt="Weather" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>
          <div className="relative z-10 h-full p-8 flex flex-col justify-between text-white">
            <div className="flex justify-between items-start">
               <div>
                 <p className="text-white/70 font-medium">15:30, 15 Th04</p>
                 <div className="flex items-center gap-2 mt-2">
                   <span className="material-symbols-outlined text-yellow-400 !text-5xl" style={{fontVariationSettings: "'FILL' 1"}}>wb_sunny</span>
                   <span className="text-2xl font-bold">Nắng đẹp</span>
                 </div>
               </div>
               <div className="text-right">
                 <h1 className="text-8xl font-bold leading-none tracking-tighter">28°</h1>
                 <p className="text-sm font-medium text-white/60 mt-1">H: 31° L: 22°</p>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: 'water_drop', label: 'Độ ẩm', val: '75%' },
                { icon: 'air', label: 'Gió', val: '15km/h' },
                { icon: 'rainy', label: 'Lượng mưa', val: '0mm' },
                { icon: 'compress', label: 'Áp suất', val: '1012hPa' },
                { icon: 'light_mode', label: 'UV Index', val: '8.5 High' },
                { icon: 'grass', label: 'Đất', val: '62%' }
              ].map(stat => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-primary text-sm">{stat.icon}</span>
                  <span className="text-[10px] text-white/50 uppercase font-bold">{stat.label}</span>
                  <span className="text-sm font-bold">{stat.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold dark:text-white">Dự báo 24h tới</h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {[
              { time: 'Bây giờ', temp: '28°', icon: 'wb_sunny', active: true },
              { time: '14:00', temp: '29°', icon: 'partly_cloudy_day' },
              { time: '15:00', temp: '28°', icon: 'cloud' },
              { time: '16:00', temp: '27°', icon: 'rainy' },
              { time: '17:00', temp: '26°', icon: 'thunderstorm' },
            ].map(h => (
              <div key={h.time} className={`min-w-[80px] h-32 rounded-2xl flex flex-col items-center justify-between p-3 border ${h.active ? 'bg-surface-dark border-primary text-white shadow-glow' : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800'}`}>
                <span className="text-[10px] font-bold uppercase text-gray-500">{h.time}</span>
                <span className={`material-symbols-outlined text-2xl ${h.active ? 'text-primary' : 'text-gray-400'}`}>{h.icon}</span>
                <span className="text-lg font-bold">{h.temp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-red-500 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-red-500/20">
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-4xl">ac_unit</span>
              <h4 className="text-2xl font-bold leading-tight">Cảnh báo Sương muối</h4>
            </div>
            <p className="text-white/90 leading-snug">Dự báo 04:00 - 06:00 sáng mai nhiệt độ giảm sâu. Có thể gây cháy lá mầm.</p>
            <button className="w-full bg-white text-red-600 font-bold py-4 rounded-2xl text-lg flex items-center justify-center gap-2">
              Xem giải pháp <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Weather;
