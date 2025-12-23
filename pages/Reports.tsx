
import React, { useState } from 'react';

interface Props { onBack: () => void; }

interface CropYieldData {
  crop: string;
  planned: number; // in Tons
  actual: number;  // in Tons
  change: string;
  color: string;
}

const CROP_PERFORMANCE: CropYieldData[] = [
  { crop: 'Dâu Tây', planned: 4.5, actual: 4.2, change: '-6.6%', color: 'text-red-500' },
  { crop: 'Xà Lách', planned: 3.2, actual: 3.8, change: '+18.7%', color: 'text-primary' },
  { crop: 'Cà Chua', planned: 5.0, actual: 4.8, change: '-4.0%', color: 'text-orange-500' },
  { crop: 'Ớt Chuông', planned: 2.5, actual: 2.7, change: '+8.0%', color: 'text-primary' },
];

const Reports: React.FC<Props> = ({ onBack }) => {
  const [timeView, setTimeView] = useState<'Tháng' | 'Vụ' | 'Năm'>('Tháng');

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-text-main-dark transition-colors duration-200 min-h-screen flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800">
        <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-text-main-light dark:text-text-main-dark font-bold">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-black leading-tight tracking-tight text-center">Báo cáo Năng suất</h2>
          <span className="text-[9px] font-black text-primary-dark dark:text-primary uppercase tracking-[0.2em] bg-primary/10 px-2 py-0.5 rounded-sm">Pro Insights</span>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-text-main-light dark:text-text-main-dark">more_vert</span>
        </button>
      </header>

      <div className="flex-1 flex flex-col pb-24 no-scrollbar">
        {/* Filter Bar */}
        <div className="px-4 py-3 flex items-center gap-3 overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-white/5 bg-white/50 dark:bg-surface-dark/30">
          <button className="flex shrink-0 size-9 items-center justify-center rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 shadow-sm text-gray-600 dark:text-gray-300">
            <span className="material-symbols-outlined !text-xl">tune</span>
          </button>
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
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark px-4 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Đông Xuân 24</span>
            <span className="material-symbols-outlined !text-base">expand_more</span>
          </button>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-2 gap-3 p-4">
          <div className="col-span-2 rounded-[2rem] p-6 bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden group">
            <div className="flex justify-between items-start z-10 relative">
              <div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Tổng sản lượng</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-4xl font-black tracking-tighter text-text-main-light dark:text-white">12.5</h3>
                  <span className="text-xs font-bold text-gray-400 uppercase">Tấn</span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-primary-dark dark:text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-widest">
                  <span className="material-symbols-outlined !text-[14px] font-bold">trending_up</span> +5.2%
                </span>
                <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-widest">vs Vụ trước (11.8 T)</p>
              </div>
            </div>
            <div className="h-16 w-full mt-6 opacity-60">
              <svg className="w-full h-full text-primary" preserveAspectRatio="none" viewBox="0 0 100 25">
                <defs>
                  <linearGradient id="gradientYield" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.3"></stop>
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path d="M0,25 L0,15 L10,18 L20,12 L30,16 L40,10 L50,14 L60,8 L70,12 L80,5 L90,10 L100,2 L100,25 Z" fill="url(#gradientYield)"></path>
                <path d="M0,15 L10,18 L20,12 L30,16 L40,10 L50,14 L60,8 L70,12 L80,5 L90,10 L100,2" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke"></path>
              </svg>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[2rem] p-5 bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 active:scale-[0.98] transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-9 rounded-xl bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center text-yellow-600 dark:text-yellow-500">
                <span className="material-symbols-outlined !text-xl material-symbols-filled">paid</span>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Doanh thu</p>
            </div>
            <div>
              <p className="text-2xl font-black tracking-tight">120 Tr</p>
              <p className="text-[10px] text-primary-dark dark:text-primary font-black mt-1 flex items-center gap-1 uppercase tracking-widest">
                <span className="material-symbols-outlined !text-[12px] font-bold">arrow_upward</span> 8.5%
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[2rem] p-5 bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 active:scale-[0.98] transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500">
                <span className="material-symbols-outlined !text-xl material-symbols-filled">verified</span>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Đạt chuẩn</p>
            </div>
            <div>
              <p className="text-2xl font-black tracking-tight">85%</p>
              <p className="text-[10px] text-primary-dark dark:text-primary font-black mt-1 flex items-center gap-1 uppercase tracking-widest">
                <span className="material-symbols-outlined !text-[12px] font-bold">arrow_upward</span> 1.2%
              </p>
            </div>
          </div>
        </div>

        {/* Grouped Bar Chart: Crop Yields Comparison */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-sm font-black flex items-center gap-2 uppercase tracking-widest">
              <span className="material-symbols-outlined text-primary !text-xl">bar_chart</span>
              Sản lượng theo Cây trồng (3 Tháng qua)
            </h2>
            <div className="flex items-center gap-2">
               <span className="text-[9px] font-black text-gray-400 uppercase">Q3/2024</span>
               <button className="size-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 hover:text-primary transition-colors">
                 <span className="material-symbols-outlined !text-lg">download</span>
               </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-surface-dark p-6 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-white/5">
            <div className="flex items-end justify-between h-56 w-full gap-2 relative pt-8">
              {/* Y-Axis Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between text-[8px] text-gray-200 dark:text-gray-800 pointer-events-none pb-10">
                <div className="border-b border-dashed border-current w-full h-0"></div>
                <div className="border-b border-dashed border-current w-full h-0"></div>
                <div className="border-b border-dashed border-current w-full h-0"></div>
                <div className="border-b border-dashed border-current w-full h-0"></div>
              </div>
              
              {CROP_PERFORMANCE.map((data, i) => {
                // Scaling heights based on a max of 6 tons for visual consistency
                const planHeight = (data.planned / 6) * 100;
                const actualHeight = (data.actual / 6) * 100;
                
                return (
                  <div key={i} className="flex flex-col items-center flex-1 z-10 relative">
                    {/* Performance Label */}
                    <span className={`absolute -top-4 text-[9px] font-black ${data.color} tracking-tighter whitespace-nowrap`}>
                      {data.change}
                    </span>
                    
                    <div className="flex items-end gap-1.5 h-full">
                      {/* Planned Bar */}
                      <div 
                        className="w-3 bg-gray-100 dark:bg-gray-800 rounded-t-sm transition-all duration-1000 group-hover:bg-gray-200"
                        style={{ height: `${planHeight}%` }}
                      ></div>
                      {/* Actual Bar */}
                      <div 
                        className={`w-3 bg-primary rounded-t-sm transition-all duration-1000 ${data.actual >= data.planned ? 'shadow-[0_0_12px_rgba(19,236,73,0.4)]' : 'opacity-70'}`}
                        style={{ height: `${actualHeight}%` }}
                      ></div>
                    </div>
                    
                    {/* Crop Label */}
                    <span className="text-[10px] font-black tracking-tight text-gray-400 uppercase mt-4 text-center leading-tight h-8">
                      {data.crop}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-8 mt-4 pt-4 border-t border-gray-50 dark:border-white/5">
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full bg-primary shadow-sm"></div>
                <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Thực tế (Tấn)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Kế hoạch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Line Chart */}
        <div className="px-4 py-2 mt-4">
          <h2 className="text-sm font-black mb-4 flex items-center gap-2 uppercase tracking-widest px-1">
            <span className="material-symbols-outlined text-yellow-500 !text-xl">show_chart</span>
            Hiệu quả Tài chính
          </h2>
          <div className="bg-white dark:bg-surface-dark p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-white/5">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Lợi nhuận ròng</p>
                <p className="text-2xl font-black mt-1">70.000.000 <span className="text-[10px] font-bold text-gray-400 uppercase ml-1">VND</span></p>
              </div>
              <div className="text-right">
                <span className="inline-block text-[9px] text-green-500 font-black bg-green-500/10 px-2 py-1 rounded-lg uppercase tracking-widest">Margin: 58%</span>
              </div>
            </div>
            <div className="relative w-full h-40">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 100">
                <line stroke="currentColor" strokeOpacity="0.05" x1="0" x2="300" y1="25" y2="25"></line>
                <line stroke="currentColor" strokeOpacity="0.05" x1="0" x2="300" y1="50" y2="50"></line>
                <line stroke="currentColor" strokeOpacity="0.05" x1="0" x2="300" y1="75" y2="75"></line>
                <path d="M0,80 C50,70 100,50 150,40 S250,20 300,10" fill="none" stroke="#13ec49" strokeWidth="4" strokeLinecap="round" className="drop-shadow-lg"></path>
                <defs>
                  <linearGradient id="gradientRev" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#13ec49" stopOpacity="0.2"></stop>
                    <stop offset="100%" stopColor="transparent"></stop>
                  </linearGradient>
                </defs>
                <path d="M0,80 C50,70 100,50 150,40 S250,20 300,10 L300,100 L0,100 Z" fill="url(#gradientRev)"></path>
                <path d="M0,90 C50,85 100,80 150,75 S250,70 300,60" fill="none" stroke="#ef4444" strokeDasharray="4,2" strokeWidth="2"></path>
                <circle cx="150" cy="40" fill="#13ec49" r="4" stroke="white" strokeWidth="2" className="dark:stroke-surface-dark"></circle>
                <circle cx="300" cy="10" fill="#13ec49" r="4" stroke="white" strokeWidth="2" className="dark:stroke-surface-dark"></circle>
              </svg>
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              <span>Tháng 1</span>
              <span>Tháng 3</span>
              <span>Tháng 6</span>
            </div>
            <div className="flex justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="h-1 w-4 bg-primary rounded-full"></div>
                <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Doanh thu</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-4 bg-red-500 border-dashed border-t-2 border-red-500"></div>
                <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Chi phí</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Pie & Table Section */}
        <div className="px-4 py-2 mt-4 mb-6">
          <h2 className="text-sm font-black mb-4 flex items-center gap-2 uppercase tracking-widest px-1">
            <span className="material-symbols-outlined text-blue-500 !text-xl">pie_chart</span>
            Chất lượng & Chi tiết
          </h2>
          <div className="bg-white dark:bg-surface-dark rounded-[2rem] shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
            <div className="p-6 border-b border-gray-50 dark:border-white/5 flex items-center gap-8">
              <div className="relative size-32 shrink-0 rounded-full shadow-inner" style={{ background: 'conic-gradient(#13ec49 0% 70%, #fbbf24 70% 90%, #ef4444 90% 100%)' }}>
                <div className="absolute inset-4 bg-white dark:bg-surface-dark rounded-full flex flex-col items-center justify-center shadow-lg">
                  <span className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Loại A</span>
                  <span className="text-2xl font-black text-primary-dark dark:text-primary leading-tight">70%</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {[
                  { label: 'Loại 1', val: '8.75 Tấn', color: 'bg-primary' },
                  { label: 'Loại 2', val: '2.5 Tấn', color: 'bg-yellow-400' },
                  { label: 'Hỏng', val: '1.25 Tấn', color: 'bg-red-500' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center text-[11px] font-black uppercase tracking-wider">
                    <span className="flex items-center gap-2 text-gray-500">
                      <span className={`size-2.5 rounded-full ${row.color}`}></span> 
                      {row.label}
                    </span>
                    <span className="dark:text-white">{row.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bảng số liệu chi tiết</span>
                <span className="text-[10px] font-black text-primary cursor-pointer hover:underline uppercase tracking-widest">Xem tất cả</span>
              </div>
              <table className="w-full text-xs text-left">
                <thead className="text-[10px] text-gray-400 uppercase bg-gray-50/50 dark:bg-white/5">
                  <tr>
                    <th className="px-6 py-3 font-black tracking-widest">Kỳ</th>
                    <th className="px-6 py-3 font-black tracking-widest text-right">S.Lượng</th>
                    <th className="px-6 py-3 font-black tracking-widest text-right">D.Thu (Tr)</th>
                    <th className="px-6 py-3 font-black tracking-widest text-center">Đánh giá</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5 font-bold">
                  {[
                    { ky: 'T1/2024', sl: '3.2', dt: '35.2', eval: 'Tốt', evalColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
                    { ky: 'T2/2024', sl: '4.1', dt: '42.8', eval: 'Tốt', evalColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
                    { ky: 'T3/2024', sl: '5.2', dt: '52.0', eval: 'XSắc', evalColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-black">{row.ky}</td>
                      <td className="px-6 py-4 text-right text-gray-500">{row.sl}</td>
                      <td className="px-6 py-4 text-right text-gray-500">{row.dt}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`${row.evalColor} px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest`}>{row.eval}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="px-4 py-4 grid grid-cols-2 gap-4 mb-8">
          <button className="flex items-center justify-center gap-3 p-4 rounded-[1.5rem] bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 hover:bg-red-100 transition-all group active:scale-95">
            <span className="material-symbols-outlined text-red-600 !text-3xl group-hover:scale-110 transition-transform">picture_as_pdf</span>
            <div className="text-left">
              <p className="text-[10px] font-black text-red-700 dark:text-red-400 uppercase tracking-widest">Xuất PDF</p>
              <p className="text-[8px] font-bold text-red-500/80 uppercase tracking-tighter">Cho in ấn</p>
            </div>
          </button>
          <button className="flex items-center justify-center gap-3 p-4 rounded-[1.5rem] bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 hover:bg-green-100 transition-all group active:scale-95">
            <span className="material-symbols-outlined text-green-600 !text-3xl group-hover:scale-110 transition-transform">table_view</span>
            <div className="text-left">
              <p className="text-[10px] font-black text-green-700 dark:text-green-400 uppercase tracking-widest">Xuất Excel</p>
              <p className="text-[8px] font-bold text-green-500/80 uppercase tracking-tighter">Cho phân tích</p>
            </div>
          </button>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 flex items-center justify-around px-4 z-40 transition-colors">
        <button onClick={onBack} className="flex flex-col items-center justify-center w-full gap-1.5 text-gray-400 hover:text-primary transition-all group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">home</span>
          <span className="text-[9px] font-black uppercase tracking-[0.15em]">Tổng quan</span>
        </button>
        <button className="flex flex-col items-center justify-center w-full gap-1.5 text-gray-400 hover:text-primary transition-all group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">grass</span>
          <span className="text-[9px] font-black uppercase tracking-[0.15em]">Canh tác</span>
        </button>
        <button className="flex flex-col items-center justify-center w-full gap-1.5 text-primary-dark dark:text-primary relative group">
          <div className="absolute top-0 size-2 bg-red-500 rounded-full right-5 ring-4 ring-white dark:ring-surface-dark shadow-lg"></div>
          <span className="material-symbols-outlined !text-2xl material-symbols-filled group-hover:scale-110 transition-transform">analytics</span>
          <span className="text-[9px] font-black uppercase tracking-[0.15em]">Báo cáo</span>
        </button>
        <button className="flex flex-col items-center justify-center w-full gap-1.5 text-gray-400 hover:text-primary transition-all group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">person</span>
          <span className="text-[9px] font-black uppercase tracking-[0.15em]">Cá nhân</span>
        </button>
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Reports;
