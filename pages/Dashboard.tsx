
import React, { useState, useEffect } from 'react';
import { Page, SensorData } from '../types';
import { GoogleGenAI } from "@google/genai";

interface Props { onNavigate: (page: Page) => void; }

const Dashboard: React.FC<Props> = ({ onNavigate }) => {
  const [sensors, setSensors] = useState<SensorData>({
    temp: 28.5,
    humidity: 65,
    soilMoisture: 42,
    ph: 6.5,
    lux: 12500
  });
  const [smartTip, setSmartTip] = useState<string>('Đang phân tích dữ liệu farm...');

  // Generate Smart Tip with AI
  useEffect(() => {
    const fetchTip = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Dựa trên dữ liệu cảm biến nông trại: Nhiệt độ ${sensors.temp}°C, Độ ẩm ${sensors.humidity}%, pH ${sensors.ph}. Hãy đưa ra 1 lời khuyên ngắn gọn (dưới 20 từ) cho nông dân ngay bây giờ.`;
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt
        });
        setSmartTip(response.text || 'Dữ liệu ổn định, tiếp tục theo dõi.');
      } catch (err) {
        setSmartTip('Chúc bạn một ngày canh tác hiệu quả!');
      }
    };
    fetchTip();
  }, [sensors.temp]); // Refresh tip occasionally when data changes

  // Simulate real-time data stream
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => ({
        temp: +(prev.temp + (Math.random() - 0.5) * 0.2).toFixed(1),
        humidity: +(prev.humidity + (Math.random() - 0.5) * 0.5).toFixed(0),
        soilMoisture: +(prev.soilMoisture + (Math.random() - 0.5) * 0.3).toFixed(0),
        ph: +(prev.ph + (Math.random() - 0.5) * 0.05).toFixed(2),
        lux: +(prev.lux + (Math.random() - 0.5) * 100).toFixed(0)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-32">
      <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined">eco</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">GOFAM PRO</span>
            <button className="flex items-center gap-1 font-bold text-text-main-light dark:text-white leading-none">
              Trang trại Đà Lạt 1
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center bg-gray-100 dark:bg-white/5 rounded-full px-3 py-1 gap-2 border border-gray-200 dark:border-gray-700">
            <span className="size-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] font-bold text-text-sub-light dark:text-gray-400 uppercase tracking-wider">Live Hub</span>
          </div>
          <button 
            onClick={() => onNavigate('settings')}
            className="size-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-gray-700 dark:text-gray-300">settings</span>
          </button>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* AI Smart Advisor Card */}
        <div className="bg-slate-900 dark:bg-surface-dark p-5 rounded-[2rem] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 text-primary">
            <span className="material-symbols-outlined !text-6xl">auto_awesome</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-primary text-black text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest">AI Advisor</span>
              <span className="text-white/40 text-[10px] font-medium uppercase tracking-widest">Gợi ý thông minh</span>
            </div>
            <p className="text-lg font-bold text-white leading-tight animate-[fadeIn_0.5s_ease-out]">
              "{smartTip}"
            </p>
          </div>
          <div className="absolute bottom-0 right-0 p-3">
            <button className="size-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>

        {/* Real-time IoT Sensor Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold dark:text-white">Giám sát IoT</h2>
            <button className="text-xs font-bold text-primary flex items-center gap-1">
              Phân tích sâu <span className="material-symbols-outlined text-sm">analytics</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Primary Metrics */}
            <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group transition-all hover:shadow-glow hover:border-primary/30">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Nhiệt độ</span>
                <span className="material-symbols-outlined text-primary !text-lg">thermostat</span>
              </div>
              <p className="text-2xl font-bold mt-1 dark:text-white">{sensors.temp}°C</p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 mt-1">
                <span className="material-symbols-outlined text-xs">trending_up</span> Mức an toàn
              </div>
            </div>
            
            <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden transition-all hover:shadow-glow hover:border-primary/30">
               <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Độ ẩm KK</span>
                <span className="material-symbols-outlined text-blue-400 !text-lg">humidity_mid</span>
              </div>
              <p className="text-2xl font-bold mt-1 dark:text-white">{sensors.humidity}%</p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 mt-1">
                <span className="material-symbols-outlined text-xs">sync</span> Đang ổn định
              </div>
            </div>

            {/* Secondary Row Metrics */}
            <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-orange-400 !text-base">water_drop</span>
                <span className="text-[9px] font-bold text-gray-500 uppercase">Độ ẩm đất</span>
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-lg font-bold dark:text-white">{sensors.soilMoisture}%</p>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-purple-400 !text-base">science</span>
                <span className="text-[9px] font-bold text-gray-500 uppercase">Độ pH</span>
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-lg font-bold dark:text-white">{sensors.ph}</p>
              </div>
            </div>

            {/* Critical Alert */}
            <div className="col-span-2 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-4 rounded-2xl flex items-center gap-4">
              <div className="size-12 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600">
                <span className="material-symbols-outlined text-3xl">warning</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-red-600 uppercase tracking-widest">Cảnh báo hệ thống</p>
                <h4 className="text-sm font-bold dark:text-white">Bể nước khu B - Cạn kiệt</h4>
              </div>
              <button className="text-red-500"><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'scan', icon: 'qr_code_scanner', label: 'Quét AI', color: 'text-primary bg-primary/10' },
            { id: 'weather', icon: 'wb_sunny', label: 'Thời tiết', color: 'text-orange-500 bg-orange-500/10' },
            { id: 'tasks', icon: 'calendar_today', label: 'Lịch vụ', color: 'text-blue-500 bg-blue-500/10' },
            { id: 'inventory', icon: 'inventory_2', label: 'Kho', color: 'text-purple-500 bg-purple-500/10' }
          ].map(action => (
            <button key={action.id} onClick={() => onNavigate(action.id as Page)} className="flex flex-col items-center gap-2 group">
              <div className={`size-14 rounded-2xl flex items-center justify-center shadow-sm group-active:scale-90 transition-all ${action.color}`}>
                <span className="material-symbols-outlined text-2xl">{action.icon}</span>
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Areas Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold dark:text-white">Khu vực sản xuất</h2>
            <button onClick={() => onNavigate('areas')} className="text-xs font-bold text-primary">Xem tất cả</button>
          </div>
          <div className="flex flex-col gap-3">
            <div onClick={() => onNavigate('areas')} className="bg-white dark:bg-surface-dark p-3 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between group cursor-pointer shadow-sm">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-xl bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB5fmRypcuzJ07d9r9HNQGNpN3nA1ix9295k_Ydauu7vtxaLEj4A7IGPAqx9zX-lQBho3pmiOrloy5UFZ3zbMODzyPcn3f2dQYwOqgNCRO18YQIwzLj_dtvNOI6CPHzlVdpq7cYmrgWTClrGLa7cxMdELTYVn6kryutc9Vluc-uNzuReEVjoJzwppqH7zjJzuZ9yZgP-36YbimZgafxgf6mZP2yVJua0-l0ok4JFTbxBTUQ15YZXm9JrVyN0_0cWke58YIWFlGBP0Ax")'}}></div>
                <div>
                  <h4 className="font-bold dark:text-white">Vườn Rau Thủy Canh</h4>
                  <div className="flex items-center gap-2 text-[10px] text-green-500 font-bold uppercase">
                    <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Đang hoạt động
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">chevron_right</span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 px-6 flex justify-between items-center z-[60]">
        <button className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined material-symbols-filled">grid_view</span>
          <span className="text-[10px] font-bold">Tổng quan</span>
        </button>
        <button onClick={() => onNavigate('areas')} className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">yard</span>
          <span className="text-[10px] font-medium">Vườn</span>
        </button>
        <div className="relative -top-5">
           <button onClick={() => onNavigate('scan')} className="size-14 rounded-full bg-primary flex items-center justify-center text-black shadow-xl shadow-primary/40 active:scale-90 transition-transform">
             <span className="material-symbols-outlined text-3xl font-bold">qr_code_scanner</span>
           </button>
        </div>
        <button onClick={() => onNavigate('marketplace')} className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">storefront</span>
          <span className="text-[10px] font-medium">Chợ</span>
        </button>
        <button onClick={() => onNavigate('wallet')} className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">account_balance_wallet</span>
          <span className="text-[10px] font-medium">Ví</span>
        </button>
      </nav>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Dashboard;
