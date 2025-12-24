
import React, { useState, useMemo } from 'react';

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

  const maxVal = 6.0; // Fixed max for visualization scale (tons)

  const totals = useMemo(() => {
    let planned = 0;
    let actual = 0;
    PRODUCTION_DATA.forEach(m => {
      m.crops.forEach(c => {
        planned += c.planned;
        actual += c.actual;
      });
    });
    return { planned, actual };
  }, []);

  const performancePercent = ((totals.actual / totals.planned) * 100).toFixed(1);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-text-main-dark transition-colors duration-200 min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800">
        <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-text-main-light dark:text-text-main-dark font-bold">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-black leading-tight tracking-tight text-center uppercase">Báo cáo Năng suất</h2>
          <span className="text-[9px] font-black text-primary-dark dark:text-primary uppercase tracking-[0.2em] bg-primary/10 px-2 py-0.5 rounded-sm">Pro Insights Active</span>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-text-main-light dark:text-text-main-dark">share</span>
        </button>
      </header>

      <div className="flex-1 flex flex-col pb-24 no-scrollbar">
        {/* Quick Stats Header */}
        <div className="p-4 grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-surface-dark rounded-3xl p-5 border border-gray-100 dark:border-white/5 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tổng sản lượng (3th)</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{totals.actual.toFixed(1)}T</h3>
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-lg border border-primary/20">{performancePercent}%</span>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-dark rounded-3xl p-5 border border-gray-100 dark:border-white/5 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Mục tiêu kế hoạch</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{totals.planned.toFixed(1)}T</h3>
          </div>
        </div>

        <div className="px-4 py-1 flex items-center gap-3 overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-white/5 bg-white/50 dark:bg-surface-dark/30 mb-4">
          <div className="flex h-9 items-center bg-gray-200 dark:bg-white/10 rounded-xl p-1 shrink-0 w-full">
            {(['Tháng', 'Vụ', 'Năm'] as const).map((view) => (
              <button key={view} onClick={() => setTimeView(view)} className={`flex-1 h-full px-4 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${timeView === view ? 'bg-white dark:bg-primary text-primary-dark dark:text-black shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>
                {view}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="rounded-[2.5rem] p-6 bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-sm font-black text-text-main-light dark:text-white uppercase tracking-tight">So sánh Kế hoạch vs Thực tế</h3>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Dữ liệu năng suất theo từng loại cây trồng (Tấn)</p>
              </div>
              <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined font-black">bar_chart</span>
              </div>
            </div>

            {/* Grouped Bar Chart */}
            <div className="w-full overflow-x-auto no-scrollbar pb-6">
              <div className="flex items-end gap-16 min-w-max h-72 px-8 relative">
                {/* Horizontal grid lines and Y-Axis */}
                <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pointer-events-none pb-12 pr-4">
                   {[6, 5, 4, 3, 2, 1, 0].map(v => (
                     <div key={v} className="border-b border-dashed border-gray-100 dark:border-gray-800 w-full h-0 relative">
                        <span className="absolute -left-7 text-[9px] font-mono font-black text-gray-300 dark:text-gray-600">{v}T</span>
                     </div>
                   ))}
                </div>

                {PRODUCTION_DATA.map((monthData, midx) => (
                  <div key={midx} className="flex flex-col items-center">
                    <div className="flex items-end gap-8 h-56 mb-4">
                      {monthData.crops.map((crop, cidx) => (
                        <div key={cidx} className="flex flex-col items-center group relative">
                          <div className="flex items-end gap-1.5 h-full">
                            {/* Planned Bar */}
                            <div 
                              className="w-3.5 bg-gray-100 dark:bg-gray-800 rounded-t-lg transition-all duration-700 ease-out group-hover:brightness-110" 
                              style={{ height: `${(crop.planned / maxVal) * 100}%` }}
                            ></div>
                            {/* Actual Bar */}
                            <div 
                              className={`w-3.5 rounded-t-lg transition-all duration-1000 ease-out delay-100 group-hover:brightness-125 ${crop.actual >= crop.planned ? 'bg-primary shadow-glow' : 'bg-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.3)]'}`} 
                              style={{ height: `${(crop.actual / maxVal) * 100}%` }}
                            ></div>
                          </div>
                          
                          {/* Label rotated for clarity */}
                          <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase mt-3 rotate-45 origin-left whitespace-nowrap translate-x-1">{crop.name}</span>
                          
                          {/* Rich Interactive Tooltip */}
                          <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-black p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-30 shadow-2xl border border-white/10 scale-90 group-hover:scale-100 pointer-events-none">
                            <p className="text-[10px] font-black uppercase tracking-widest border-b border-current/10 pb-1 mb-1.5">{crop.name} • {monthData.month}</p>
                            <div className="flex flex-col gap-1">
                               <div className="flex justify-between items-center gap-4">
                                  <span className="text-[9px] font-bold uppercase opacity-60">Thực tế</span>
                                  <span className="text-[10px] font-black text-primary">{crop.actual}T</span>
                               </div>
                               <div className="flex justify-between items-center gap-4">
                                  <span className="text-[9px] font-bold uppercase opacity-60">Kế hoạch</span>
                                  <span className="text-[10px] font-black">{crop.planned}T</span>
                               </div>
                               <div className="flex justify-between items-center gap-4 border-t border-current/5 mt-1 pt-1">
                                  <span className="text-[9px] font-bold uppercase opacity-60">Chênh lệch</span>
                                  <span className={`text-[10px] font-black ${crop.actual >= crop.planned ? 'text-green-500' : 'text-red-500'}`}>
                                    {crop.actual >= crop.planned ? '+' : ''}{(crop.actual - crop.planned).toFixed(2)}T
                                  </span>
                               </div>
                            </div>
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-inherit rotate-45"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Month Indicator */}
                    <div className="mt-8 px-6 py-2 bg-gray-100 dark:bg-white/5 rounded-2xl border border-gray-50 dark:border-white/5">
                       <span className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-[0.2em]">{monthData.month}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-8 mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2.5 group cursor-help">
                <div className="size-3 rounded-full bg-primary shadow-glow"></div>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest">Thực tế (Tấn)</span>
              </div>
              <div className="flex items-center gap-2.5 group cursor-help">
                <div className="size-3 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest">Kế hoạch (Tấn)</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insight Summary Card */}
        <div className="px-4 py-4 mb-10">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 border border-primary/20 rounded-[2.5rem] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
               <span className="material-symbols-outlined !text-8xl text-primary">auto_awesome</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="size-11 rounded-2xl bg-white dark:bg-surface-dark shadow-md flex items-center justify-center text-primary border border-primary/20">
                <span className="material-symbols-outlined !text-2xl animate-pulse">psychology</span>
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest">Phân tích AI 3 tháng</h4>
                <p className="text-[9px] font-bold text-primary/60 uppercase tracking-widest">Hệ thống gợi ý thông minh</p>
              </div>
            </div>
            <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
              Sản lượng 3 tháng qua ổn định. <span className="text-primary font-black uppercase tracking-tight">Xà lách</span> đạt hiệu suất cao nhất (+15% so với mục tiêu). <span className="text-orange-500 font-black uppercase tracking-tight">Dâu tây</span> có dấu hiệu hụt nhẹ trong tháng 4 (-6%) do biến động nhiệt độ nhà kính. 
              <br/><br/>
              <span className="font-black underline decoration-primary underline-offset-4 decoration-2">Khuyến nghị:</span> Tối ưu hệ thống làm mát trung tâm để bảo đảm năng suất dâu tây cho vụ tháng 5.
            </p>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 px-6 py-2 flex justify-between items-center h-20 pb-6 transition-colors shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <button onClick={onBack} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">home</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Trang chủ</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-primary scale-105">
          <span className="material-symbols-outlined material-symbols-filled !text-[28px]">analytics</span>
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
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Reports;
