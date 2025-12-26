
import React, { useState, useMemo } from 'react';

interface Props { onBack: () => void; }

interface HourlyData {
  time: string;
  temp: number;
  rain: number; // percentage 0-100
  icon: string;
}

const HOURLY_FORECAST: HourlyData[] = [
  { time: 'Bây giờ', temp: 28, rain: 0, icon: 'wb_sunny' },
  { time: '14:00', temp: 29, rain: 5, icon: 'wb_sunny' },
  { time: '15:00', temp: 28, rain: 15, icon: 'partly_cloudy_day' },
  { time: '16:00', temp: 27, rain: 45, icon: 'rainy' },
  { time: '17:00', temp: 26, rain: 65, icon: 'thunderstorm' },
  { time: '18:00', temp: 25, rain: 40, icon: 'rainy' },
  { time: '19:00', temp: 24, rain: 20, icon: 'cloud' },
  { time: '20:00', temp: 23, rain: 10, icon: 'cloud' },
  { time: '21:00', temp: 22, rain: 5, icon: 'cloud' },
  { time: '22:00', temp: 22, rain: 0, icon: 'cloud' },
  { time: '23:00', temp: 21, rain: 0, icon: 'cloud' },
  { time: '00:00', temp: 21, rain: 0, icon: 'cloud' },
  { time: '01:00', temp: 20, rain: 0, icon: 'cloud' },
  { time: '02:00', temp: 20, rain: 0, icon: 'cloud' },
  { time: '03:00', temp: 19, rain: 10, icon: 'cloud' },
  { time: '04:00', temp: 19, rain: 15, icon: 'cloud' },
  { time: '05:00', temp: 20, rain: 10, icon: 'wb_twilight' },
  { time: '06:00', temp: 22, rain: 5, icon: 'wb_sunny' },
  { time: '07:00', temp: 24, rain: 0, icon: 'wb_sunny' },
  { time: '08:00', temp: 26, rain: 0, icon: 'wb_sunny' },
  { time: '09:00', temp: 28, rain: 0, icon: 'wb_sunny' },
  { time: '10:00', temp: 30, rain: 0, icon: 'wb_sunny' },
  { time: '11:00', temp: 31, rain: 0, icon: 'wb_sunny' },
  { time: '12:00', temp: 32, rain: 0, icon: 'wb_sunny' },
];

const Weather: React.FC<Props> = ({ onBack }) => {
  const [activeModel, setActiveModel] = useState('Tổng hợp AI');

  const chartWidth = HOURLY_FORECAST.length * 60;
  const chartHeight = 120;
  const maxTemp = 35;
  const minTemp = 15;

  const tempPoints = useMemo(() => {
    return HOURLY_FORECAST.map((d, i) => {
      const x = i * 60 + 30;
      const y = chartHeight - ((d.temp - minTemp) / (maxTemp - minTemp)) * chartHeight;
      return { x, y, temp: d.temp };
    });
  }, []);

  const linePath = useMemo(() => {
    if (tempPoints.length === 0) return "";
    let path = `M ${tempPoints[0].x} ${tempPoints[0].y}`;
    for (let i = 1; i < tempPoints.length; i++) {
      const p0 = tempPoints[i - 1];
      const p1 = tempPoints[i];
      const cp1x = p0.x + (p1.x - p0.x) / 2;
      path += ` C ${cp1x} ${p0.y}, ${cp1x} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return path;
  }, [tempPoints]);

  const areaPath = useMemo(() => {
    if (tempPoints.length === 0) return "";
    return `${linePath} L ${tempPoints[tempPoints.length - 1].x} ${chartHeight} L ${tempPoints[0].x} ${chartHeight} Z`;
  }, [linePath, tempPoints]);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center bg-white dark:bg-surface-dark p-4 pb-2 justify-between sticky top-0 z-50 shadow-sm border-b border-gray-100 dark:border-white/5">
        <button onClick={onBack} className="text-text-main-light dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-text-main-light dark:text-white text-lg font-black leading-tight tracking-tight uppercase">Dự báo Nông vụ</h2>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#13ec49]"></span>
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Precision Weather Pro</span>
          </div>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-text-main-light dark:text-white">
          <span className="material-symbols-outlined">analytics</span>
        </button>
      </header>

      {/* Location Bar */}
      <div className="px-4 py-3 bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-white/5">
        <div className="flex w-full items-center justify-between rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/10 p-3.5 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/20 text-primary shadow-sm border border-primary/20">
              <span className="material-symbols-outlined font-black">location_on</span>
            </div>
            <div className="text-left">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1.5">Trang trại quản lý</p>
              <p className="text-text-main-light dark:text-white text-sm font-black uppercase tracking-tight">Khu vực Ba Vì • Zone A1</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-gray-400">expand_more</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        {/* Current Weather Highlight */}
        <div className="p-4">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-900 group h-80">
            <img 
              className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-[5s] group-hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwUAVZEb14VRAoKuYZHOXfBV4p5Uh9U0yCi5IWMdKfB7hRoFAa_GwCE_O5x0gMTYnUdZLiVLDwZAkWPer-eS-7B543Nd9ewohU6rbttZ2wm3qGSjvreQ8dsPVuQZCA93UTzKRPVRRz6au5THo_yqWygmsB5MczRSmMZMuGBQjtzV31KrcWepeTVsIPLTRaPpQOrF-qi0iSvTgIT9-Wo87Z3Y7v7GBS-Nlq78xMIrxNXCAAE3LQk2_sonebOHTJ_Bh4yNlwfFZrORdW" 
              alt="Weather background" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/20"></div>
            
            <div className="relative z-10 h-full p-8 flex flex-col justify-between text-white">
              <div className="flex justify-between items-start">
                <div>
                   <span className="px-3 py-1 rounded-full bg-primary text-black text-[9px] font-black uppercase tracking-[0.2em] shadow-glow">Cập nhật Live</span>
                   <p className="mt-3 text-white/60 text-[10px] font-black uppercase tracking-widest">Hôm nay, 15 Th04</p>
                   <div className="flex items-center gap-3 mt-1">
                      <span className="material-symbols-outlined text-yellow-300 text-5xl material-symbols-filled drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]">wb_sunny</span>
                      <span className="text-2xl font-black uppercase tracking-tight">Nắng nhẹ</span>
                   </div>
                </div>
                <div className="text-right">
                  <h1 className="text-8xl font-black tracking-tighter leading-none">28<span className="text-4xl align-top mt-4 inline-block font-bold">°</span></h1>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { l: 'Độ ẩm', v: '75%', i: 'water_drop', c: 'text-blue-400' },
                  { l: 'Tia UV', v: '8.5 Cao', i: 'light_mode', c: 'text-orange-400' },
                  { l: 'Tốc độ gió', v: '12km/h', i: 'air', c: 'text-primary' }
                ].map(item => (
                  <div key={item.l} className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                    <div className="flex items-center gap-1.5 mb-1 opacity-60">
                      <span className={`material-symbols-outlined !text-sm ${item.c}`}>{item.i}</span>
                      <span className="text-[8px] font-black uppercase tracking-widest">{item.l}</span>
                    </div>
                    <p className="text-sm font-black">{item.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 24-Hour Detailed Chart */}
        <div className="mb-8">
          <div className="px-6 pb-4 flex justify-between items-end">
            <div className="flex flex-col">
              <h3 className="text-text-main-light dark:text-white text-lg font-black tracking-tight uppercase">Dự báo 24 giờ tới</h3>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Tích hợp dữ liệu Trạm khí tượng & AI</p>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-1.5 rounded-sm bg-blue-500/30 border border-blue-500/50"></div>
                  <span className="text-[9px] font-black text-gray-400 uppercase">Mưa %</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-0.5 bg-primary"></div>
                  <span className="text-[9px] font-black text-gray-400 uppercase">Nhiệt độ</span>
               </div>
            </div>
          </div>

          <div className="px-4">
            <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 rounded-[2.5rem] shadow-sm pt-10 pb-6 relative overflow-hidden group">
              {/* Background vertical guides */}
              <div className="absolute inset-0 pointer-events-none px-4 flex justify-between opacity-[0.03] dark:opacity-[0.07]">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="w-px h-full bg-slate-900 dark:bg-white"></div>
                ))}
              </div>

              <div className="overflow-x-auto no-scrollbar px-4 cursor-grab active:cursor-grabbing">
                <div style={{ width: chartWidth }} className="relative h-[220px]">
                  {/* Y-Axis Guides */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-12 pr-4">
                    {[35, 25, 15].map(v => (
                      <div key={v} className="border-b border-dashed border-gray-100 dark:border-white/5 w-full h-0 relative">
                        <span className="absolute -left-6 text-[8px] font-black text-gray-300 dark:text-gray-600">{v}°</span>
                      </div>
                    ))}
                  </div>

                  <svg className="absolute inset-0 w-full h-full" style={{ height: chartHeight + 20 }}>
                    <defs>
                      <linearGradient id="tempGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#13ec49" stopOpacity="0.3"></stop>
                        <stop offset="100%" stopColor="#13ec49" stopOpacity="0"></stop>
                      </linearGradient>
                      <linearGradient id="rainGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5"></stop>
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1"></stop>
                      </linearGradient>
                    </defs>

                    {/* Rain Probability Bars */}
                    {HOURLY_FORECAST.map((d, i) => (
                      <rect 
                        key={i}
                        x={i * 60 + 18}
                        y={chartHeight - (d.rain / 100) * chartHeight}
                        width="24"
                        height={(d.rain / 100) * chartHeight}
                        fill="url(#rainGradient)"
                        rx="6"
                        className="transition-all duration-500 hover:opacity-100 opacity-80"
                      />
                    ))}
                    
                    {/* Temperature Area & Line */}
                    <path d={areaPath} fill="url(#tempGradient)" />
                    <path 
                      d={linePath} 
                      fill="none" 
                      stroke="#13ec49" 
                      strokeWidth="3.5" 
                      strokeLinecap="round" 
                      className="drop-shadow-glow"
                    />

                    {/* Nodes */}
                    {tempPoints.map((p, i) => (
                      <g key={i} className="group/node">
                        <circle cx={p.x} cy={p.y} r="4" fill="#13ec49" stroke="white" className="dark:stroke-surface-dark" strokeWidth="2.5" />
                        <text 
                          x={p.x} 
                          y={p.y - 12} 
                          textAnchor="middle" 
                          className="text-[10px] font-black fill-slate-900 dark:fill-white transition-all opacity-0 group-hover/node:opacity-100"
                        >
                          {p.temp}°
                        </text>
                      </g>
                    ))}
                  </svg>

                  {/* X-Axis labels (Time & Icons) */}
                  <div className="absolute bottom-0 w-full flex items-end">
                    {HOURLY_FORECAST.map((d, i) => (
                      <div key={i} className="flex flex-col items-center justify-center w-[60px] pb-2 transition-transform hover:scale-110">
                        <span className={`material-symbols-outlined !text-xl mb-2.5 ${d.rain > 30 ? 'text-blue-500' : 'text-yellow-400 material-symbols-filled'}`}>
                          {d.icon}
                        </span>
                        <span className="text-[10px] font-black text-slate-800 dark:text-white uppercase tracking-tighter">
                          {d.time}
                        </span>
                        <div className="flex items-center gap-0.5 mt-1">
                          <div className={`size-1 rounded-full ${d.rain > 50 ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                          <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">{d.rain > 0 ? `${d.rain}%` : '--'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insight Box */}
        <div className="px-4 mb-6">
           <div className="bg-primary/10 border border-primary/20 rounded-[2rem] p-6 flex items-start gap-4 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                 <span className="material-symbols-outlined !text-[80px] text-primary">psychology</span>
              </div>
              <div className="bg-white dark:bg-surface-dark size-11 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border border-primary/20">
                 <span className="material-symbols-outlined text-primary !text-2xl animate-pulse">tips_and_updates</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-primary-dark dark:text-primary uppercase tracking-[0.2em] mb-1.5">Gợi ý Nông vụ AI</p>
                <p className="text-slate-800 dark:text-gray-200 text-sm leading-relaxed font-medium">
                  Độ ẩm sẽ tăng cao vào 17:00 do có mưa dông. Hãy tạm dừng hệ thống tưới tự động tại <span className="font-black underline decoration-primary underline-offset-4">Khu vực A2</span> để tiết kiệm tài nguyên.
                </p>
              </div>
           </div>
        </div>

        {/* 7-Day Forecast Section */}
        <div className="px-4">
           <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-lg font-black uppercase tracking-tight">Dự báo 7 ngày tới</h3>
              <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Chi tiết</button>
           </div>
           
           <div className="space-y-3">
              {[
                /* Fix: Rename 'i' to 'icon' to match usage in map below */
                { d: 'Thứ 3', dt: '16/04', h: 31, l: 24, icon: 'wb_sunny', c: 'text-yellow-400', p: '0%' },
                { d: 'Thứ 4', dt: '17/04', h: 30, l: 23, icon: 'partly_cloudy_day', c: 'text-gray-400', p: '10%' },
                { d: 'Thứ 5', dt: '18/04', h: 27, l: 21, icon: 'rainy', c: 'text-blue-500', p: '65%' },
                { d: 'Thứ 6', dt: '19/04', h: 26, l: 22, icon: 'thunderstorm', c: 'text-blue-600', p: '80%' },
              ].map((day, idx) => (
                <div key={idx} className="bg-white dark:bg-surface-dark p-4 rounded-3xl border border-gray-100 dark:border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all shadow-sm">
                   <div className="w-20">
                      <p className="text-sm font-black dark:text-white uppercase tracking-tight">{day.d}</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{day.dt}</p>
                   </div>
                   <div className="flex-1 flex items-center justify-center gap-4">
                      <span className={`material-symbols-outlined ${day.c} !text-[28px]`}>{day.icon}</span>
                      <div className="flex items-center gap-1.5 w-12">
                         <span className="material-symbols-outlined text-[14px] text-blue-500">water_drop</span>
                         <span className="text-[10px] font-black">{day.p}</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-3 text-right">
                      <span className="text-sm font-black dark:text-white">{day.h}°</span>
                      <div className="w-12 h-1 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-primary" style={{ width: '70%', marginLeft: '15%' }}></div>
                      </div>
                      <span className="text-sm font-black text-gray-400">{day.l}°</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .drop-shadow-glow { filter: drop-shadow(0 0 8px rgba(19, 236, 73, 0.4)); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Weather;
