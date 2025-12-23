
import React, { useState } from 'react';
import { Page } from '../types';

interface Props { onBack: () => void; onNavigate: (page: Page) => void; }

const AreaDetails: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [timeRange, setTimeRange] = useState('Live');

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-white antialiased min-h-screen flex flex-col font-display">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 flex items-center bg-white dark:bg-surface-dark p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800 shadow-sm backdrop-blur-md bg-opacity-95">
        <button onClick={onBack} className="text-text-main-light dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer transition-opacity hover:opacity-70">
          <span className="material-symbols-outlined text-2xl font-bold">arrow_back</span>
        </button>
        <div className="flex flex-col items-center flex-1">
          <h2 className="text-text-main-light dark:text-white text-base font-black leading-tight tracking-tight text-center truncate">
            Khu A - Nhà Kính
          </h2>
          <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] bg-primary/10 px-2.5 py-0.5 rounded-full mt-1 border border-primary/20">Pro View Active</span>
        </div>
        <div className="flex w-12 items-center justify-end">
          <button className="flex items-center justify-center rounded-full size-10 bg-transparent text-text-main-light dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-2xl">settings</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        {/* Crop Profile Summary */}
        <div className="bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800 px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-cover bg-center shrink-0 border border-gray-100 dark:border-gray-700 shadow-sm" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAdMlSbKERXaoonPsuqEjnPZ0Cw-g7k6RimQ9E6_5JfwbxpAzYuH2nVyG6QgmsjLPW-96IYWXY8bRpdfX-UAERnZ7JrhIbdiOs8Ytl37exv0zBxlAyNyS8GSco0c4W3kX0va5JptwNE0JlYt9lEgsxiReWX4b9qhjeML42IuvRIvRT-pO3ceTeQJoPGGKO_jYeYv7tZA7xYxk2MnbwFboF6ZFsufPLspp3hk6o8GKtUQYMA82zfIDBAXFebr49knifaidxmpyWmYYq7")'}}></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-base truncate">Dâu Tây Hana</h3>
                <span className="text-[10px] font-black text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-md border border-green-200 dark:border-green-800 uppercase tracking-widest">45 ngày</span>
              </div>
              <div className="flex items-center gap-4 mt-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <span className="material-symbols-outlined text-base">eco</span>
                  <span>Ra quả</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <span className="material-symbols-filled text-base text-primary">favorite</span>
                  <span>Sức khỏe 98%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Time Filters & Actions */}
        <div className="sticky top-[73px] z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-2.5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center bg-gray-200 dark:bg-black/40 rounded-xl p-1 shrink-0">
            {['Live', '1H', '24H', '7D'].map((range) => (
              <button 
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${timeRange === range ? 'bg-white dark:bg-surface-dark shadow-sm text-text-main-light dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-text-main-light dark:hover:text-white'}`}
              >
                {range}
              </button>
            ))}
          </div>
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 shrink-0"></div>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-text-main-light dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shrink-0">
            <span className="material-symbols-outlined text-lg">compare_arrows</span>
            <span className="text-[10px] font-black uppercase tracking-widest">So sánh</span>
          </button>
          <button onClick={() => onNavigate('reports')} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-text-main-light dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shrink-0">
            <span className="material-symbols-outlined text-lg">summarize</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Báo cáo</span>
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Microclimate Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Vi khí hậu & Môi trường</h3>
              <span className="text-[10px] font-black text-primary flex items-center gap-1.5 uppercase tracking-widest">
                <span className="size-2 rounded-full bg-primary animate-pulse shadow-glow"></span>
                Real-time IoT
              </span>
            </div>
            
            <div className="bg-white dark:bg-surface-dark rounded-[2rem] p-5 shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
              <div className="flex flex-wrap gap-4 mb-6">
                <button className="flex items-center gap-2 transition-opacity">
                  <span className="size-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
                  <span className="text-[10px] font-black text-text-main-light dark:text-white uppercase tracking-widest">Nhiệt độ (28°C)</span>
                </button>
                <button className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
                  <span className="size-2.5 rounded-full bg-blue-500"></span>
                  <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Độ ẩm (65%)</span>
                </button>
                <button className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
                  <span className="size-2.5 rounded-full bg-yellow-400"></span>
                  <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Ánh sáng</span>
                </button>
              </div>

              {/* Chart Placeholder */}
              <div className="h-48 w-full relative">
                <div className="absolute inset-0 flex flex-col justify-between text-[10px] font-bold text-gray-300 dark:text-gray-700 pointer-events-none">
                  {[40, 30, 20, 10, 0].map(v => (
                    <div key={v} className="border-b border-dashed border-gray-100 dark:border-gray-800 w-full h-0 flex items-center relative">
                      <span className="absolute -left-6">{v}</span>
                    </div>
                  ))}
                </div>
                <svg className="w-full h-full overflow-visible ml-1" preserveAspectRatio="none" viewBox="0 0 100 100">
                   {/* Background Target Zone */}
                   <path d="M0 60 Q 20 50, 40 55 T 80 45 T 100 50" fill="none" stroke="currentColor" className="text-gray-100 dark:text-gray-800" strokeDasharray="3 3" strokeWidth="1.5"></path>
                   
                   <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2"></stop>
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  
                  {/* Main Data Line */}
                  <path d="M0 70 Q 20 60, 40 65 T 60 40 T 80 50 T 100 30" fill="url(#chartGradient)" stroke="none"></path>
                  <path d="M0 70 Q 20 60, 40 65 T 60 40 T 80 50 T 100 30" fill="none" stroke="#ef4444" strokeLinecap="round" strokeWidth="3" vectorEffect="non-scaling-stroke" className="drop-shadow-lg"></path>
                  
                  {/* Current Value Indicator */}
                  <circle className="dark:stroke-surface-dark" cx="60" cy="40" fill="#ef4444" r="4" stroke="white" strokeWidth="2"></circle>
                  <line opacity="0.3" stroke="#ef4444" strokeDasharray="3 3" strokeWidth="1" x1="60" x2="60" y1="40" y2="100"></line>
                </svg>
              </div>

              <div className="flex justify-between mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>23:59</span>
              </div>

              {/* Stats Footer */}
              <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
                <div className="flex flex-col text-center w-1/3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Min</span>
                  <span className="text-sm font-black dark:text-white tracking-tight">22°C</span>
                </div>
                <div className="flex flex-col text-center w-1/3 border-x border-gray-100 dark:border-gray-800">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Max</span>
                  <span className="text-sm font-black dark:text-white tracking-tight">32°C</span>
                </div>
                <div className="flex flex-col text-center w-1/3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Avg</span>
                  <span className="text-sm font-black dark:text-white tracking-tight">27.5°C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Soil & Nutrition Section */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Đất & Dinh Dưỡng</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Soil Moisture Gauge */}
              <div className="bg-white dark:bg-surface-dark rounded-[2rem] p-5 shadow-sm border border-red-100 dark:border-red-900/40 relative overflow-hidden group active:scale-[0.98] transition-transform">
                <div className="absolute top-0 right-0 p-3 opacity-5">
                  <span className="material-symbols-outlined !text-6xl text-red-500">water_drop</span>
                </div>
                <div className="flex flex-col items-center justify-center relative">
                  <div className="relative size-24">
                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                      <path className="text-gray-100 dark:text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                      <path className="text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.4)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="35, 100" strokeLinecap="round" strokeWidth="3.5"></path>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-red-600 dark:text-red-400 leading-none">35%</span>
                      <span className="text-[9px] font-black text-red-500 uppercase tracking-widest mt-1">Thấp</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h4 className="text-[11px] font-black text-text-main-light dark:text-gray-200 uppercase tracking-widest">Độ ẩm đất</h4>
                  <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 tracking-widest">Mục tiêu: 60-70%</p>
                </div>
              </div>

              {/* pH Gauge */}
              <div className="bg-white dark:bg-surface-dark rounded-[2rem] p-5 shadow-sm border border-gray-100 dark:border-gray-800 relative group active:scale-[0.98] transition-transform">
                <div className="flex flex-col items-center justify-center relative">
                  <div className="relative size-24">
                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                      <path className="text-gray-100 dark:text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                      <path className="text-primary drop-shadow-[0_0_8px_rgba(19,236,73,0.4)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="65, 100" strokeLinecap="round" strokeWidth="3.5"></path>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-text-main-light dark:text-white leading-none">6.5</span>
                      <span className="text-[9px] font-black text-primary uppercase tracking-widest mt-1">Tốt</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h4 className="text-[11px] font-black text-text-main-light dark:text-gray-200 uppercase tracking-widest">Độ pH</h4>
                  <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 tracking-widest">Mục tiêu: 6.0-7.0</p>
                </div>
              </div>

              {/* EC Card */}
              <div className="bg-white dark:bg-surface-dark rounded-[1.5rem] p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between active:scale-[0.98] transition-transform">
                <div className="flex justify-between items-start">
                  <span className="material-symbols-outlined text-blue-500 text-xl font-bold">bolt</span>
                  <span className="text-[9px] font-black bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-lg uppercase tracking-widest">Ổn định</span>
                </div>
                <div className="mt-4">
                  <span className="block text-2xl font-black text-text-main-light dark:text-white tracking-tighter">1.2</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">EC (mS/cm)</span>
                </div>
              </div>

              {/* Light Intensity Card */}
              <div className="bg-white dark:bg-surface-dark rounded-[1.5rem] p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between active:scale-[0.98] transition-transform">
                <div className="flex justify-between items-start">
                  <span className="material-symbols-outlined text-yellow-500 text-xl font-bold">light_mode</span>
                  <span className="text-[9px] font-black bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300 px-2 py-0.5 rounded-lg uppercase tracking-widest">Tăng nhẹ</span>
                </div>
                <div className="mt-4">
                  <span className="block text-2xl font-black text-text-main-light dark:text-white tracking-tighter">1.2k</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lux</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts & Events Section */}
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Cảnh báo & Sự kiện</h3>
                <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-red-500/30">3</span>
              </div>
              <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5 hover:underline underline-offset-4">
                <span className="material-symbols-outlined text-sm font-bold">tune</span>
                Thiết lập ngưỡng
              </button>
            </div>

            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              <button className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-text-main-light text-white dark:bg-white dark:text-black whitespace-nowrap shadow-md">Tất cả</button>
              <button className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-gray-100 dark:bg-gray-800 text-gray-500 border border-transparent hover:border-gray-200 whitespace-nowrap">Quan trọng (1)</button>
              <button className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-gray-100 dark:bg-gray-800 text-gray-500 border border-transparent hover:border-gray-200 whitespace-nowrap">Cảnh báo (2)</button>
              <div className="flex-1"></div>
              <button className="size-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                <span className="material-symbols-outlined text-sm">sort</span>
              </button>
            </div>

            {/* Alert List */}
            <div className="flex flex-col bg-white dark:bg-surface-dark rounded-[2rem] border border-gray-100 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800/50 shadow-sm overflow-hidden">
              <div className="p-4 flex gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="shrink-0 pt-1">
                  <div className="size-10 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-500">
                    <span className="material-symbols-outlined text-xl font-bold">water_drop</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h4 className="text-sm font-black text-red-600 dark:text-red-400 truncate tracking-tight">Độ ẩm đất thấp</h4>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap ml-2">10p trước</span>
                  </div>
                  <p className="text-[11px] font-bold text-text-main-light dark:text-white">Hiện tại: <span className="text-red-500">35%</span> (Ngưỡng an toàn: &gt;50%)</p>
                  <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-1 line-clamp-1 italic">Hệ thống khuyến nghị kích hoạt tưới bù ngay.</p>
                </div>
                <div className="flex items-center self-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                </div>
              </div>

              <div className="p-4 flex gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="shrink-0 pt-1">
                  <div className="size-10 rounded-xl bg-yellow-50 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600">
                    <span className="material-symbols-outlined text-xl font-bold">thermostat</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h4 className="text-sm font-black text-text-main-light dark:text-white truncate tracking-tight">Nhiệt độ tăng cao</h4>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap ml-2">1 giờ trước</span>
                  </div>
                  <p className="text-[11px] font-bold text-text-main-light dark:text-white">Hiện tại: <span className="font-black">32°C</span> (Dự báo đỉnh: 34°C)</p>
                </div>
                <div className="flex items-center self-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                </div>
              </div>

              <div className="p-4 flex gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="shrink-0 pt-1">
                  <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <span className="material-symbols-outlined text-xl font-bold">schedule</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h4 className="text-sm font-black text-text-main-light dark:text-white truncate tracking-tight">Lịch tưới tự động</h4>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap ml-2">07:00 AM</span>
                  </div>
                  <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-1">Đã hoàn thành tưới nhỏ giọt định kỳ (15 phút).</p>
                </div>
                <div className="flex items-center self-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="flex items-center justify-center size-14 rounded-full bg-primary text-black shadow-xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all border-4 border-background-light dark:border-background-dark">
          <span className="material-symbols-outlined text-3xl font-black">add</span>
        </button>
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 10px rgba(19,236,73,0.5); }
      `}</style>
    </div>
  );
};

export default AreaDetails;
