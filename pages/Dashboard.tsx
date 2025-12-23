
import React, { useState, useEffect } from 'react';
import { Page, SensorData } from '../types';
import { GoogleGenAI } from "@google/genai";

interface Props { onNavigate: (page: Page) => void; }

const Dashboard: React.FC<Props> = ({ onNavigate }) => {
  const [sensors, setSensors] = useState<SensorData>({
    temp: 28.5,
    humidity: 65,
    soilMoisture: 72,
    ph: 6.5,
    lux: 12000
  });

  const [activeChartMetric, setActiveChartMetric] = useState<'temp' | 'hum' | 'soil'>('temp');

  // Mock sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => ({
        ...prev,
        temp: +(prev.temp + (Math.random() - 0.5) * 0.2).toFixed(1),
        humidity: +(prev.humidity + (Math.random() - 0.5) * 0.5).toFixed(0),
        soilMoisture: +(prev.soilMoisture + (Math.random() - 0.5) * 0.1).toFixed(0),
        ph: +(prev.ph + (Math.random() - 0.5) * 0.02).toFixed(1),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mock historical data for the chart (24 hours, 8 points)
  const chartData = {
    temp: [22, 21, 20, 24, 28, 31, 29, 27],
    hum: [80, 85, 88, 75, 65, 55, 60, 70],
    soil: [75, 74, 74, 73, 72, 71, 70, 69]
  };

  const getActivePath = () => {
    const data = chartData[activeChartMetric];
    const max = Math.max(...data) * 1.2;
    const min = Math.min(...data) * 0.8;
    const range = max - min;
    
    return data.map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((val - min) / range) * 100;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const getMetricColor = () => {
    if (activeChartMetric === 'temp') return '#ef4444'; // Red
    if (activeChartMetric === 'hum') return '#3b82f6'; // Blue
    return '#13ec49'; // Primary Green
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main-light dark:text-gray-100 font-display min-h-screen flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-primary/20 text-primary-dark dark:text-primary">
            <span className="material-symbols-outlined font-bold">eco</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">GOFAM PRO</span>
            <button className="flex items-center gap-1 -ml-1 px-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span className="text-sm font-black text-text-main-light dark:text-white leading-tight">Farm 1 - Đà Lạt</span>
              <span className="material-symbols-outlined text-lg">expand_more</span>
            </button>
          </div>
        </div>
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-gray-700 dark:text-gray-300">notifications</span>
          <span className="absolute top-2 right-2 size-2.5 bg-red-500 rounded-full border-2 border-background-light dark:border-background-dark"></span>
        </button>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto pb-32">
        {/* Welcome Text */}
        <div className="px-4 pt-6 pb-2 flex items-end justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Xin chào, Nguyễn Văn A 👋</p>
            <h1 className="text-2xl font-black mt-1 tracking-tight">Tổng quan nông trại</h1>
          </div>
          <button className="flex items-center gap-1 px-3 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-sm">tune</span>
            Tùy chỉnh
          </button>
        </div>

        {/* Priority Alerts */}
        <div className="mt-4 pl-4 pb-2">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Cảnh báo ưu tiên</h3>
          <div className="flex gap-3 overflow-x-auto pb-4 pr-4 no-scrollbar snap-x">
            <div className="snap-center min-w-[85%] bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50 rounded-2xl p-4 flex gap-3 shadow-sm active:scale-[0.98] transition-transform">
              <div className="flex-shrink-0 bg-red-100 dark:bg-red-800/40 p-2.5 rounded-xl h-fit">
                <span className="material-symbols-outlined text-red-600 dark:text-red-400">water_loss</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[9px] font-black text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-800/30 px-2 py-0.5 rounded uppercase tracking-widest">Khẩn cấp</p>
                  <span className="text-[9px] font-bold text-red-500 dark:text-red-400">10p trước</span>
                </div>
                <p className="text-sm font-black text-gray-900 dark:text-gray-100 truncate">Khu A - Mực nước thấp</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-1 font-medium">Mực nước hồ chứa dưới 10%. Cần bơm.</p>
              </div>
            </div>
            
            <div className="snap-center min-w-[85%] bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50 rounded-2xl p-4 flex gap-3 shadow-sm active:scale-[0.98] transition-transform">
              <div className="flex-shrink-0 bg-amber-100 dark:bg-amber-800/40 p-2.5 rounded-xl h-fit text-amber-600">
                <span className="material-symbols-outlined">pest_control</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[9px] font-black text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-800/30 px-2 py-0.5 rounded uppercase tracking-widest">Cảnh báo</p>
                  <span className="text-[9px] font-bold text-amber-500 dark:text-amber-400">1h trước</span>
                </div>
                <p className="text-sm font-black text-gray-900 dark:text-gray-100 truncate">Khu B - Nguy cơ sâu bệnh</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-1 font-medium">AI phát hiện dấu hiệu rệp sáp lá.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="px-4 py-2">
          <div className="bg-white dark:bg-surface-dark rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-start">
              {[
                { label: 'Quét AI', icon: 'center_focus_weak', color: 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:text-primary dark:border-green-800', page: 'scan' },
                { label: 'Tạo việc', icon: 'add_task', color: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800', page: 'add-task' },
                { label: 'Đầu tư', icon: 'monitoring', color: 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800', page: 'adoption' },
                { label: 'Báo cáo', icon: 'analytics', color: 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-border-800', page: 'reports' },
                { label: 'Khác', icon: 'more_horiz', color: 'bg-gray-50 text-gray-600 border-gray-100 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700', page: 'dashboard' }
              ].map((action, i) => (
                <button 
                  key={i} 
                  onClick={() => onNavigate(action.page as Page)}
                  className="flex flex-col items-center gap-2 group w-1/5 transition-all active:scale-90"
                >
                  <div className={`size-11 rounded-full flex items-center justify-center border shadow-sm transition-transform ${action.color}`}>
                    <span className="material-symbols-outlined text-xl">{action.icon}</span>
                  </div>
                  <span className="text-[10px] font-bold text-center text-gray-500 dark:text-gray-400 leading-tight uppercase tracking-wider">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Metrics Grid */}
        <div className="px-4 py-4">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Chỉ số thời gian thực</h3>
          <div className="grid grid-cols-2 gap-3">
            {/* Temp */}
            <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
              <div className="flex justify-between items-start z-10 relative">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Nhiệt độ</p>
                  <p className="text-xl font-black mt-1 dark:text-white">{sensors.temp}°C</p>
                </div>
                <div className="text-[10px] font-black text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[10px] font-bold">arrow_upward</span> 1.2%
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-10 opacity-20 transition-opacity group-hover:opacity-40">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
                  <path d="M0,20 L0,10 C10,12 20,5 30,8 S50,15 60,10 S80,5 100,8 L100,20 Z" fill="#ef4444"></path>
                </svg>
              </div>
            </div>

            {/* Humidity KK */}
            <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
              <div className="flex justify-between items-start z-10 relative">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Độ ẩm KK</p>
                  <p className="text-xl font-black mt-1 dark:text-white">{sensors.humidity}%</p>
                </div>
                <div className="text-[10px] font-black text-red-600 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[10px] font-bold">arrow_downward</span> 2%
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-10 opacity-20">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
                  <path d="M0,20 L0,15 C20,10 40,18 60,12 S80,5 100,10 L100,20 Z" fill="#3b82f6"></path>
                </svg>
              </div>
            </div>

            {/* Soil Moisture */}
            <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
              <div className="flex justify-between items-start z-10 relative">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Độ ẩm đất</p>
                  <p className="text-xl font-black mt-1 dark:text-white">{sensors.soilMoisture}%</p>
                </div>
                <div className="text-[9px] font-black text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded uppercase tracking-widest">
                  <span className="material-symbols-outlined text-[10px] font-bold">arrow_upward</span> 0.5%
                </div>
              </div>
              <div className="mt-3 w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-1000 shadow-glow" style={{ width: `${sensors.soilMoisture}%` }}></div>
              </div>
            </div>

            {/* pH / EC */}
            <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
              <div className="flex justify-between items-start z-10 relative">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">pH / EC</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-black dark:text-white">{sensors.ph}</span>
                    <span className="text-xs text-gray-400 font-bold">/ 1.2</span>
                  </div>
                </div>
                <div className="text-[9px] font-black text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded uppercase tracking-widest">OK</div>
              </div>
              <div className="mt-3 flex gap-1">
                <div className="h-1.5 bg-purple-500 rounded-full w-[65%]"></div>
                <div className="h-1.5 bg-blue-400 rounded-full w-[30%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 24-Hour Trend Chart Section */}
        <div className="px-4 py-2">
          <div className="bg-white dark:bg-surface-dark p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col">
                <h3 className="text-sm font-black text-text-main-light dark:text-gray-100 tracking-tight uppercase">Xu hướng 24 Giờ</h3>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Dữ liệu từ trạm cảm biến #12</p>
              </div>
              <div className="flex items-center bg-gray-100 dark:bg-black/40 rounded-xl p-1 shrink-0">
                {(['temp', 'hum', 'soil'] as const).map((m) => (
                  <button 
                    key={m}
                    onClick={() => setActiveChartMetric(m)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeChartMetric === m ? 'bg-white dark:bg-surface-dark shadow-sm text-text-main-light dark:text-white border border-gray-200/50 dark:border-white/5' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {m === 'temp' ? 'Nhiệt' : m === 'hum' ? 'Ẩm KK' : 'Ẩm Đất'}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full h-48 relative px-2">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none opacity-5 dark:opacity-10">
                {[0, 1, 2, 3, 4].map(i => <div key={i} className="w-full border-b border-text-main-light dark:border-white"></div>)}
              </div>

              {/* Chart SVG */}
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="metricGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={getMetricColor()} stopOpacity="0.25"></stop>
                    <stop offset="100%" stopColor={getMetricColor()} stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                
                {/* Area under the line */}
                <path 
                  d={`${getActivePath()} L 100 100 L 0 100 Z`} 
                  fill="url(#metricGradient)" 
                  className="transition-all duration-700 ease-in-out"
                ></path>

                {/* Main Path Line */}
                <path 
                  d={getActivePath()} 
                  fill="none" 
                  stroke={getMetricColor()} 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="transition-all duration-700 ease-in-out drop-shadow-lg"
                  vectorEffect="non-scaling-stroke"
                ></path>

                {/* Data Points */}
                {chartData[activeChartMetric].map((val, i) => {
                   const x = (i / (chartData[activeChartMetric].length - 1)) * 100;
                   const data = chartData[activeChartMetric];
                   const max = Math.max(...data) * 1.2;
                   const min = Math.min(...data) * 0.8;
                   const range = max - min;
                   const y = 100 - ((val - min) / range) * 100;
                   return (
                     <circle 
                        key={i} 
                        cx={x} 
                        cy={y} 
                        r="3" 
                        fill="white" 
                        stroke={getMetricColor()} 
                        strokeWidth="2" 
                        className="transition-all duration-700 ease-in-out dark:fill-surface-dark"
                     />
                   );
                })}
              </svg>
            </div>

            <div className="flex justify-between mt-4 px-1 text-[9px] font-black text-gray-400 uppercase tracking-widest">
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Bây giờ</span>
            </div>

            <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
               <div className="flex items-center gap-2">
                 <div className="size-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"></div>
                 <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Nhiệt độ</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="size-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]"></div>
                 <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Độ ẩm KK</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="size-2 rounded-full bg-primary shadow-glow"></div>
                 <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Độ ẩm đất</span>
               </div>
            </div>
          </div>
        </div>

        {/* Production Areas */}
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Khu vực sản xuất</h3>
            <button onClick={() => onNavigate('areas')} className="text-xs font-black text-primary uppercase tracking-widest hover:underline underline-offset-4">Quản lý</button>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { id: 'area-details', name: 'Khu A - Cà chua', status: 'Đang tưới nước...', statusColor: 'text-blue-600 dark:text-blue-400', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhQaoCiElPEqGSJ5W6buAxDH2hXttIA-7b1p1TGMXiGR4915PtxZBpDDdthQPYc490ra1UKDRGdsKzCpSaqLHGzyh5KSxZDdR_gWYYqmR9ZFVJDJuT2nx-Z1aegZwcrj-6YNCZxii15ozAjkD0ElnlBuITIX4HYY1d7Pn3zRvIJcDOvp5KZ-dvBrIhSBXpkOow3hrLlO5qglGLBv5NLgkdRbIPXLhU-pL9bMNmfgduf8L78mT1T0xScFM9xPcPCEO2Begbr7e_6ERg', animated: true },
              { id: 'area-details', name: 'Khu B - Dâu tây', status: 'Ổn định', statusColor: 'text-green-600 dark:text-green-400', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdMlSbKERXaoonPsuqEjnPZ0Cw-g7k6RimQ9E6_5JfwbxpAzYuH2nVyG6QgmsjLPW-96IYWXY8bRpdfX-UAERnZ7JrhIbdiOs8Ytl37exv0zBxlAyNyS8GSco0c4W3kX0va5JptwNE0JlYt9lEgsxiReWX4b9qhjeML42IuvRIvRT-pO3ceTeQJoPGGKO_jYeYv7tZA7xYxk2MnbwFboF6ZFsufPLspp3hk6o8GKtUQYMA82zfIDBAXFebr49knifaidxmpyWmYYq7' },
              { id: 'area-details', name: 'Khu C - Rau cải', status: 'Cần kiểm tra', statusColor: 'text-orange-600 dark:text-orange-400', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0n2quTHsC62MkMNKR9JLrsuUY46hZKIXTRUzZkicrN0qAQoUYTyA0PWLTMPAmdEnHxgIXJxvrmxLoNEw8GLUl4ohFfVAfDmPF1hR5v_SS3t6X7KoRWyrjlf8giY0IY7QO52arLwQ_6JbHCTP1CZLql-OKNkyd97cCmX-gA3sTKkzMsesG5w0vSREKLZRgwatDuqW2BsZv1zZl_c7GS3wZImrr6Sq-c-5rFKq5_SuFqF3_dq-sRXlWRgS9Mo4pqcHYHzFxQ8ISBveQ' }
            ].map((area, i) => (
              <div 
                key={i} 
                onClick={() => onNavigate(area.id as Page)}
                className="flex items-center justify-between p-3 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm active:scale-[0.98] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-cover bg-center border border-gray-100 dark:border-gray-800" style={{ backgroundImage: `url('${area.img}')` }}></div>
                  <div>
                    <p className="font-black text-sm text-text-main-light dark:text-gray-100">{area.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`size-1.5 rounded-full ${area.statusColor.split(' ')[0].replace('text-', 'bg-')} ${area.animated ? 'animate-pulse' : ''}`}></span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${area.statusColor}`}>{area.status}</span>
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-400 text-xl group-hover:translate-x-1 group-hover:text-primary transition-all">chevron_right</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 px-6 flex justify-between items-center z-[60]">
        <button className="flex flex-col items-center gap-1.5 text-primary">
          <span className="material-symbols-outlined material-symbols-filled !text-2xl">grid_view</span>
          <span className="text-[10px] font-black uppercase tracking-widest">Tổng quan</span>
        </button>
        <button onClick={() => onNavigate('adoption')} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">potted_plant</span>
          <span className="text-[10px] font-black uppercase tracking-widest">Nuôi trồng</span>
        </button>
        <div className="relative -top-6">
          <button 
            onClick={() => onNavigate('scan')} 
            className="size-15 rounded-full bg-primary flex items-center justify-center text-black shadow-xl shadow-primary/40 active:scale-90 transition-transform ring-[6px] ring-background-light dark:ring-background-dark"
          >
            <span className="material-symbols-outlined text-3xl font-black">qr_code_scanner</span>
          </button>
        </div>
        <button onClick={() => onNavigate('reports')} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">analytics</span>
          <span className="text-[10px] font-black uppercase tracking-widest">Báo cáo</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">settings</span>
          <span className="text-[10px] font-black uppercase tracking-widest">Cài đặt</span>
        </button>
      </nav>

      <style>{`
        .size-15 { width: 3.75rem; height: 3.75rem; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Dashboard;
