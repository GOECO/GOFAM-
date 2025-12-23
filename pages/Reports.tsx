
import React, { useState } from 'react';

interface Props { onBack: () => void; }

interface CropYieldData {
  crop: string;
  planned: number; // in Tons
  actual: number;  // in Tons
  change: string;
  status: 'Exceeded' | 'On Track' | 'Below';
  color: string;
}

const CROP_PERFORMANCE: CropYieldData[] = [
  { crop: 'Dâu Tây Hana', planned: 4.5, actual: 4.2, change: '-6.6%', status: 'Below', color: 'text-red-500' },
  { crop: 'Xà Lách NFT', planned: 3.2, actual: 3.8, change: '+18.7%', status: 'Exceeded', color: 'text-primary' },
  { crop: 'Cà Chua RI6', planned: 5.0, actual: 4.8, change: '-4.0%', status: 'On Track', color: 'text-orange-500' },
  { crop: 'Ớt Chuông Đỏ', planned: 2.5, actual: 2.7, change: '+8.0%', status: 'Exceeded', color: 'text-primary' },
];

const Reports: React.FC<Props> = ({ onBack }) => {
  const [timeView, setTimeView] = useState<'Tháng' | 'Vụ' | 'Năm'>('Tháng');

  const totalPlanned = CROP_PERFORMANCE.reduce((acc, curr) => acc + curr.planned, 0);
  const totalActual = CROP_PERFORMANCE.reduce((acc, curr) => acc + curr.actual, 0);
  const achievementRate = ((totalActual / totalPlanned) * 100).toFixed(1);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-text-main-dark transition-colors duration-200 min-h-screen flex flex-col">
      {/* Sticky Header */}
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
        {/* Filter & View Mode */}
        <div className="px-4 py-3 flex items-center gap-3 overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-white/5 bg-white/50 dark:bg-surface-dark/30">
          <div className="flex h-9 items-center bg-gray-200 dark:bg-white/10 rounded-xl p-1 shrink-0">
            {(['Tháng', 'Vụ', 'Năm'] as const).map((view) => (
              <button 
                key={view}
                onClick={() => setTimeView(view)}
                className={`h-full px-4 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${timeView === view ? 'bg-white dark:bg-primary text-primary-dark dark:text-black shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
              >
                {view}
              </button>
            ))}
          </div>
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark px-4 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Đông Xuân 2024</span>
            <span className="material-symbols-outlined !text-base">expand_more</span>
          </button>
        </div>

        {/* Achievement Summary */}
        <div className="p-4 grid grid-cols-2 gap-3">
          <div className="col-span-2 rounded-[2rem] p-6 bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden">
            <div className="flex justify-between items-center relative z-10">
              <div className="space-y-1">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Tỉ lệ đạt mục tiêu</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-black tracking-tighter text-text-main-light dark:text-white">{achievementRate}%</h3>
                  <span className={`text-[10px] font-bold uppercase ${+achievementRate >= 100 ? 'text-primary' : 'text-orange-500'}`}>
                    {+achievementRate >= 100 ? 'Vượt chỉ tiêu' : 'Cần nỗ lực'}
                  </span>
                </div>
              </div>
              <div className="relative size-16 shrink-0">
                <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-100 dark:stroke-gray-800" strokeWidth="4"></circle>
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-primary" strokeWidth="4" strokeDasharray={`${achievementRate}, 100`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 1s ease-in-out' }}></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                   <span className="material-symbols-outlined text-primary !text-lg">flag</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
               <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-gray-400 uppercase">Kế hoạch</span>
                  <span className="text-sm font-black dark:text-white">{totalPlanned.toFixed(1)} Tấn</span>
               </div>
               <div className="w-px h-8 bg-gray-100 dark:bg-gray-800"></div>
               <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-gray-400 uppercase">Thực tế</span>
                  <span className="text-sm font-black text-primary">{totalActual.toFixed(1)} Tấn</span>
               </div>
            </div>
          </div>
        </div>

        {/* Grouped Bar Chart: Comparison */}
        <div className="px-4 py-2">
          <div className="bg-white dark:bg-surface-dark p-6 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-white/5">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8 text-center">Biểu đồ so sánh sản lượng</h3>
            
            <div className="flex items-end justify-between h-56 w-full gap-4 relative">
              {/* Vertical Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between text-[8px] text-gray-100 dark:text-gray-800 pointer-events-none pb-12">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="border-b border-dashed border-current w-full h-0"></div>
                ))}
              </div>
              
              {CROP_PERFORMANCE.map((data, i) => (
                <div key={i} className="flex flex-col items-center flex-1 z-10 group cursor-pointer">
                  <div className="flex items-end gap-1.5 h-full relative">
                    {/* Planned Bar */}
                    <div 
                      className="w-4 bg-gray-200 dark:bg-gray-800 rounded-t-md transition-all duration-1000"
                      style={{ height: `${(data.planned / 6) * 100}%` }}
                    ></div>
                    {/* Actual Bar */}
                    <div 
                      className={`w-4 rounded-t-md transition-all duration-1000 ${data.actual >= data.planned ? 'bg-primary shadow-glow' : 'bg-orange-400 opacity-80'}`}
                      style={{ height: `${(data.actual / 6) * 100}%` }}
                    ></div>
                    
                    {/* Floating Value on Hover */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                      T: {data.actual}T / K: {data.planned}T
                    </div>
                  </div>
                  
                  <span className="text-[9px] font-black tracking-tight text-gray-500 uppercase mt-4 text-center leading-tight h-8 w-full truncate">
                    {data.crop}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-gray-50 dark:border-white/5">
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-sm bg-primary"></div>
                <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Sản lượng Thực tế</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-sm bg-gray-200 dark:bg-gray-800"></div>
                <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Kế hoạch đề ra</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="px-4 py-4">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 border border-primary/20 rounded-[2rem] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <span className="material-symbols-outlined !text-7xl">psychology</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-2xl bg-white dark:bg-surface-dark shadow-sm flex items-center justify-center text-primary">
                <span className="material-symbols-outlined !text-2xl animate-pulse">auto_awesome</span>
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest">AI Performance Insight</h4>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              Sản lượng <span className="text-primary font-black">Xà Lách NFT</span> vượt 18.7% nhờ tối ưu hóa chu kỳ tưới theo cảm biến IoT. 
              <span className="text-red-500 font-black"> Dâu Tây</span> hụt nhẹ do đợt sương muối ngày 15/04. Khuyến nghị: Điều chỉnh rèm che tự động sớm hơn 30 phút cho vụ tới.
            </p>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="px-4 py-2">
          <div className="bg-white dark:bg-surface-dark rounded-[2rem] shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Chi tiết theo loại cây</span>
              <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Xuất báo cáo</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-[9px] text-gray-400 uppercase bg-gray-50/50 dark:bg-white/5">
                  <tr>
                    <th className="px-6 py-4 font-black tracking-widest">Cây trồng</th>
                    <th className="px-4 py-4 font-black tracking-widest text-right">Kế hoạch</th>
                    <th className="px-4 py-4 font-black tracking-widest text-right">Thực tế</th>
                    <th className="px-6 py-4 font-black tracking-widest text-center">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5 font-bold">
                  {CROP_PERFORMANCE.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-5">
                        <p className="text-text-main-light dark:text-white leading-none">{row.crop}</p>
                        <p className="text-[8px] text-gray-400 uppercase mt-1">Lô: #A-2024-{i+1}</p>
                      </td>
                      <td className="px-4 py-5 text-right text-gray-400">{row.planned}T</td>
                      <td className={`px-4 py-5 text-right ${row.color}`}>{row.actual}T</td>
                      <td className="px-6 py-5 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                          row.status === 'Exceeded' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' :
                          row.status === 'On Track' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 grid grid-cols-2 gap-3 mb-10">
          <button className="flex flex-col items-center justify-center gap-2 p-5 rounded-3xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm active:scale-95 transition-transform">
             <span className="material-symbols-outlined text-primary !text-3xl">picture_as_pdf</span>
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Tải PDF</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-2 p-5 rounded-3xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm active:scale-95 transition-transform">
             <span className="material-symbols-outlined text-blue-500 !text-3xl">analytics</span>
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Gửi Quản lý</span>
          </button>
        </div>
      </div>

      {/* Global Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 px-6 py-2 flex justify-between items-center h-20 pb-6 transition-colors shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button onClick={onBack} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">home</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Trang chủ</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">grid_view</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Vườn</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-primary scale-105">
          <span className="material-symbols-outlined material-symbols-filled !text-[26px]">analytics</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Báo cáo</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors group">
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
