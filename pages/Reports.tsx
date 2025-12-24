
import React, { useState } from 'react';

interface Props { onBack: () => void; }

interface CropProduction {
  name: string;
  planned: number;
  actual: number;
}

interface MonthlyProduction {
  month: string;
  crops: CropProduction[];
}

const PRODUCTION_DATA: MonthlyProduction[] = [
  {
    month: 'Tháng 02',
    crops: [
      { name: 'Dâu Tây', planned: 3.8, actual: 4.0 },
      { name: 'Xà Lách', planned: 2.8, actual: 3.0 },
      { name: 'Cà Chua', planned: 4.5, actual: 4.4 },
      { name: 'Ớt Chuông', planned: 2.0, actual: 2.1 },
    ]
  },
  {
    month: 'Tháng 03',
    crops: [
      { name: 'Dâu Tây', planned: 4.2, actual: 4.1 },
      { name: 'Xà Lách', planned: 3.0, actual: 3.5 },
      { name: 'Cà Chua', planned: 4.8, actual: 4.9 },
      { name: 'Ớt Chuông', planned: 2.2, actual: 2.4 },
    ]
  },
  {
    month: 'Tháng 04',
    crops: [
      { name: 'Dâu Tây', planned: 4.5, actual: 4.2 },
      { name: 'Xà Lách', planned: 3.2, actual: 3.8 },
      { name: 'Cà Chua', planned: 5.0, actual: 4.8 },
      { name: 'Ớt Chuông', planned: 2.5, actual: 2.7 },
    ]
  },
];

const Reports: React.FC<Props> = ({ onBack }) => {
  const [timeView, setTimeView] = useState<'Tháng' | 'Vụ' | 'Năm'>('Tháng');

  const maxVal = 6.0; // Fixed max for visualization scale

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-text-main-dark transition-colors duration-200 min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800">
        <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-text-main-light dark:text-text-main-dark font-bold">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-black leading-tight tracking-tight text-center">Phân tích Năng suất</h2>
          <span className="text-[9px] font-black text-primary-dark dark:text-primary uppercase tracking-[0.2em] bg-primary/10 px-2 py-0.5 rounded-sm">Pro Insights Active</span>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-text-main-light dark:text-text-main-dark">share</span>
        </button>
      </header>

      <div className="flex-1 flex flex-col pb-24 no-scrollbar">
        <div className="px-4 py-3 flex items-center gap-3 overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-white/5 bg-white/50 dark:bg-surface-dark/30">
          <div className="flex h-9 items-center bg-gray-200 dark:bg-white/10 rounded-xl p-1 shrink-0">
            {(['Tháng', 'Vụ', 'Năm'] as const).map((view) => (
              <button key={view} onClick={() => setTimeView(view)} className={`h-full px-4 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${timeView === view ? 'bg-white dark:bg-primary text-primary-dark dark:text-black shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>
                {view}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="rounded-[2.5rem] p-6 bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-sm font-black text-text-main-light dark:text-white uppercase tracking-tight">Sản lượng đa kênh 3 tháng</h3>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">So sánh Kế hoạch vs Thực tế của toàn bộ cây trồng</p>
              </div>
              <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">analytics</span>
              </div>
            </div>

            {/* Multi-series Side-by-Side Grouped Bar Chart with Horizontal Scroll */}
            <div className="w-full overflow-x-auto no-scrollbar pb-6">
              <div className="flex items-end gap-12 min-w-max h-64 px-4 relative">
                {/* Horizontal grid lines */}
                <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pointer-events-none pb-12">
                   {[6, 4, 2, 0].map(v => (
                     <div key={v} className="border-b border-dashed border-gray-100 dark:border-gray-800 w-full h-0 relative">
                        <span className="absolute -left-4 text-[8px] font-mono text-gray-300">{v}T</span>
                     </div>
                   ))}
                </div>

                {PRODUCTION_DATA.map((monthData, midx) => (
                  <div key={midx} className="flex flex-col items-center">
                    <div className="flex items-end gap-6 h-48 mb-4">
                      {monthData.crops.map((crop, cidx) => (
                        <div key={cidx} className="flex flex-col items-center group relative">
                          <div className="flex items-end gap-1">
                            {/* Planned Bar */}
                            <div className="w-3 bg-gray-200 dark:bg-gray-800 rounded-t-sm transition-all duration-700 ease-out" style={{ height: `${(crop.planned / maxVal) * 100}%` }}></div>
                            {/* Actual Bar */}
                            <div className={`w-3 rounded-t-sm transition-all duration-1000 ease-out delay-100 ${crop.actual >= crop.planned ? 'bg-primary shadow-glow' : 'bg-orange-400'}`} style={{ height: `${(crop.actual / maxVal) * 100}%` }}></div>
                          </div>
                          <span className="text-[8px] font-black text-gray-400 uppercase mt-2 rotate-45 origin-left whitespace-nowrap">{crop.name}</span>
                          
                          {/* Tooltip */}
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-xl border border-white/10">
                            <p className="font-black text-primary">{crop.name}</p>
                            <p>Actual: {crop.actual}T / Plan: {crop.planned}T</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 px-4 py-1.5 bg-gray-100 dark:bg-white/5 rounded-full">
                       <span className="text-[10px] font-black text-text-main-light dark:text-white uppercase tracking-widest">{monthData.month}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-8 mt-4 pt-4 border-t border-gray-50 dark:border-white/5">
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-sm bg-primary"></div>
                <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Thực tế</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-sm bg-gray-200 dark:bg-gray-800"></div>
                <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Kế hoạch</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 border border-primary/20 rounded-[2rem] p-6 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-2xl bg-white dark:bg-surface-dark shadow-sm flex items-center justify-center text-primary">
                <span className="material-symbols-outlined !text-2xl animate-pulse">auto_awesome</span>
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest">AI Trend Analysis</h4>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              Sản lượng quý I cho thấy sự tăng trưởng ổn định ở nhóm <span className="text-primary font-black">Rau xà lách</span> (vượt 15% kế hoạch). Tuy nhiên, <span className="text-orange-500 font-black">Cà chua</span> có dấu hiệu hụt nhẹ trong tháng 4 do biến động nhiệt độ. Khuyến nghị tập trung tối ưu hệ thống làm mát vào khung giờ 11h-14h.
            </p>
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 px-6 py-2 flex justify-between items-center h-20 pb-6 transition-colors shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button onClick={onBack} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">home</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Trang chủ</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-primary scale-105">
          <span className="material-symbols-outlined material-symbols-filled !text-[26px]">analytics</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Báo cáo</span>
        </button>
        <button onClick={() => {}} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">person</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Cá nhân</span>
        </button>
      </nav>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Reports;
