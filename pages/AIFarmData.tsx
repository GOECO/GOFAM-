
import React from 'react';
import { Page } from '../types';

interface Props { onBack: () => void; onNavigate: (page: Page) => void; }

const AIFarmData: React.FC<Props> = ({ onBack, onNavigate }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto overflow-x-hidden shadow-2xl bg-background-light dark:bg-background-dark pb-24 font-display transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center justify-between p-4 sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-white/5">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-90">
          <span className="material-symbols-outlined text-slate-700 dark:text-white font-bold">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-black leading-tight tracking-tight uppercase">Dữ liệu nông nghiệp AI</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[9px] uppercase font-black text-primary tracking-[0.2em]">Live Sync</span>
          </div>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative">
          <span className="material-symbols-outlined text-slate-700 dark:text-white">notifications</span>
          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background-light dark:border-background-dark"></span>
        </button>
      </header>

      {/* Main Content Scroll */}
      <main className="flex-1 flex flex-col gap-6 p-4 overflow-y-auto no-scrollbar">
        {/* Section 1: Crop Vitals (Stats) */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2 uppercase tracking-tight">
              <span className="material-symbols-outlined text-primary text-[20px] font-bold">ecg_heart</span>
              Chỉ số cây trồng
            </h3>
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Cập nhật: 2m trước</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {/* Humidity Card */}
            <div className="flex flex-col gap-2 rounded-3xl p-4 bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden group active:scale-95 transition-all">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 dark:bg-white/10">
                <div className="h-full bg-blue-500 w-[68%] shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
              </div>
              <div className="flex items-center gap-2 text-blue-500 mb-1">
                <span className="material-symbols-outlined text-[20px]">water_drop</span>
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Độ ẩm đất</p>
                <p className="text-xl font-black text-slate-900 dark:text-white">68<span className="text-xs align-top font-bold">%</span></p>
              </div>
            </div>
            {/* pH Card */}
            <div className="flex flex-col gap-2 rounded-3xl p-4 bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden group active:scale-95 transition-all">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 dark:bg-white/10">
                <div className="h-full bg-primary w-[80%] shadow-glow"></div>
              </div>
              <div className="flex items-center gap-2 text-primary mb-1">
                <span className="material-symbols-outlined text-[20px] font-bold">science</span>
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">pH Đất</p>
                <p className="text-xl font-black text-slate-900 dark:text-white">6.5</p>
              </div>
            </div>
            {/* Nutrients Card */}
            <div className="flex flex-col gap-2 rounded-3xl p-4 bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden group active:scale-95 transition-all">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 dark:bg-white/10">
                <div className="h-full bg-yellow-500 w-[95%] shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
              </div>
              <div className="flex items-center gap-2 text-yellow-500 mb-1">
                <span className="material-symbols-outlined text-[20px]">compost</span>
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">NPK</p>
                <p className="text-xl font-black text-slate-900 dark:text-white uppercase">Tốt</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Alerts (ActionPanel) */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2 uppercase tracking-tight">
              <span className="material-symbols-outlined text-red-500 text-[20px] font-bold">warning</span>
              Cảnh báo sâu bệnh
            </h3>
          </div>
          <div className="rounded-[2.5rem] border border-red-500/30 bg-red-500/5 dark:bg-red-900/10 p-6 relative overflow-hidden group">
            {/* Background pattern effect */}
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-red-500/10 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10 flex flex-col gap-5">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg shadow-red-500/20">
                    <span className="material-symbols-outlined !text-3xl">pest_control</span>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">Phát hiện Rệp sáp</h4>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="inline-flex items-center rounded-lg bg-red-500/20 px-2.5 py-1 text-[9px] font-black text-red-500 uppercase tracking-widest border border-red-500/30">Rủi ro cao 78%</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">• Khu vực B2</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed font-medium">
                AI phân tích hình ảnh lá cây cho thấy dấu hiệu lây lan nhanh. Khuyến nghị xử lý ngay để tránh giảm <span className="text-red-500 font-black">15% sản lượng</span>.
              </p>
              <button onClick={() => alert("Đã gửi lệnh xử lý!")} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 h-14 text-xs font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-red-500/20 hover:bg-red-600 transition-all active:scale-[0.98]">
                <span className="material-symbols-outlined text-[18px] font-bold">healing</span>
                Xử lý ngay (-50 Token)
              </button>
            </div>
          </div>
        </section>

        {/* Section 3: Profit Optimization (Chart & Lists) */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2 uppercase tracking-tight">
              <span className="material-symbols-outlined text-yellow-500 text-[20px] font-bold">monetization_on</span>
              Dự báo lợi nhuận
            </h3>
          </div>
          {/* Main Chart Card */}
          <div className="flex flex-col rounded-[2.5rem] bg-white dark:bg-surface-dark p-6 shadow-sm border border-gray-100 dark:border-white/5 group">
            <div className="flex flex-col gap-1 mb-6">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Xu hướng GOFAM dự kiến</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">+125 <span className="text-lg font-bold text-gray-400">GFM</span></h2>
                <div className="flex items-center text-primary text-[10px] font-black bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20 uppercase tracking-widest">
                  <span className="material-symbols-outlined text-[14px] mr-0.5 font-bold">trending_up</span>
                  12%
                </div>
              </div>
            </div>
            {/* Chart SVG */}
            <div className="relative h-32 w-full overflow-hidden">
              <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="chartGradientData" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#13ec49" stopOpacity="0.3"></stop>
                    <stop offset="100%" stopColor="#13ec49" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path d="M0 80 C 40 80, 60 50, 100 50 C 140 50, 160 70, 200 60 C 240 50, 260 20, 300 10" fill="none" stroke="#13ec49" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" className="drop-shadow-glow"></path>
                <path d="M0 80 C 40 80, 60 50, 100 50 C 140 50, 160 70, 200 60 C 240 50, 260 20, 300 10 V 100 H 0 Z" fill="url(#chartGradientData)"></path>
                <circle cx="300" cy="10" r="4" fill="#13ec49" className="animate-pulse"></circle>
              </svg>
            </div>
          </div>

          {/* AI Suggestions List */}
          <div className="flex flex-col gap-4 mt-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] px-1">Gợi ý từ AI Hệ thống</p>
            {/* Suggestion 1 */}
            <div className="group flex items-center justify-between gap-4 rounded-3xl bg-white dark:bg-surface-dark p-5 shadow-sm border border-gray-100 dark:border-white/5 hover:border-primary/50 transition-all cursor-pointer active:scale-[0.98]">
              <div className="flex items-center gap-4">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined !text-2xl">water_lux</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Giảm tưới 10%</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Độ ẩm không khí đang cao</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-black text-primary uppercase tracking-tight">+5 GFM</span>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">/ngày</span>
              </div>
            </div>
            {/* Suggestion 2 */}
            <div className="group flex items-center justify-between gap-4 rounded-3xl bg-white dark:bg-surface-dark p-5 shadow-sm border border-gray-100 dark:border-white/5 hover:border-primary/50 transition-all cursor-pointer active:scale-[0.98]">
              <div className="flex items-center gap-4">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined !text-2xl">solar_power</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Tăng chiếu sáng</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Kích thích quang hợp</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-black text-primary uppercase tracking-tight">+8 GFM</span>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">/ngày</span>
              </div>
            </div>
          </div>
        </section>
        <div className="h-6"></div> {/* Spacer */}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-[60] flex items-center justify-around border-t border-gray-200 dark:border-white/5 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl px-4 py-3 pb-8 max-w-md mx-auto shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-colors">
        <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center gap-1.5 p-2 text-slate-400 hover:text-primary transition-all group">
          <span className="material-symbols-outlined text-[24px] group-hover:scale-110">home</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Trang trại</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 p-2 text-primary scale-110">
          <span className="material-symbols-outlined text-[26px] material-symbols-filled">analytics</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Dữ liệu</span>
        </button>
        {/* Floating Center Button */}
        <div className="relative -top-10">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          <button onClick={() => onNavigate('scan')} className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-background-dark shadow-glow ring-[6px] ring-background-light dark:ring-background-dark transform transition-transform active:scale-90 shadow-xl">
            <span className="material-symbols-outlined text-[32px] font-black">qr_code_scanner</span>
          </button>
        </div>
        <button onClick={() => onNavigate('wallet')} className="flex flex-col items-center gap-1.5 p-2 text-slate-400 hover:text-primary transition-all group">
          <span className="material-symbols-outlined text-[24px] group-hover:scale-110">account_balance_wallet</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Ví Token</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1.5 p-2 text-slate-400 hover:text-primary transition-all group">
          <span className="material-symbols-outlined text-[24px] group-hover:scale-110">settings</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Cài đặt</span>
        </button>
      </nav>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .drop-shadow-glow { filter: drop-shadow(0 0 10px rgba(19, 236, 73, 0.4)); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AIFarmData;
