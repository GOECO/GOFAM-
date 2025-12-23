
import React, { useState } from 'react';

interface Props { onBack: () => void; }

const Weather: React.FC<Props> = ({ onBack }) => {
  const [activeModel, setActiveModel] = useState('Tổng hợp AI');

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center bg-white dark:bg-surface-dark p-4 pb-2 justify-between sticky top-0 z-50 shadow-sm border-b border-gray-100 dark:border-white/5 transition-colors duration-200">
        <button onClick={onBack} className="text-text-main-light dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-text-main-light dark:text-white text-lg font-black leading-tight tracking-tight">Thời tiết Farm</h2>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#13ec49]"></span>
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Pro Mode</span>
          </div>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-text-main-light dark:text-white">
          <span className="material-symbols-outlined">tune</span>
        </button>
      </header>

      {/* Location & Model Selector */}
      <div className="px-4 py-3 bg-white dark:bg-surface-dark transition-colors duration-200 border-b border-gray-100 dark:border-white/5">
        <button className="flex w-full items-center justify-between rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/10 p-3 hover:bg-gray-100 dark:hover:bg-white/5 transition mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary-dark">
              <span className="material-symbols-outlined text-green-700 dark:text-green-400">location_on</span>
            </div>
            <div className="text-left">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Khu vực canh tác</p>
              <p className="text-text-main-light dark:text-white text-sm font-black leading-tight">Trang trại Cà phê Đắk Lắk</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-gray-400">expand_more</span>
        </button>

        <div className="flex p-1 bg-gray-100 dark:bg-gray-800/40 rounded-xl overflow-hidden gap-1">
          {['Tổng hợp AI', 'ECMWF', 'GFS', 'ICON'].map(model => (
            <button 
              key={model}
              onClick={() => setActiveModel(model)}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeModel === model ? 'bg-white dark:bg-surface-dark shadow-sm text-text-main-light dark:text-white border border-gray-200/50 dark:border-white/5' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {model}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-10 no-scrollbar">
        {/* Main Weather Card */}
        <div className="p-4">
          <div className="relative flex flex-col items-center justify-between rounded-[2.5rem] overflow-hidden shadow-2xl bg-surface-dark group h-[420px]">
            <div className="absolute inset-0 z-0">
              <img className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwUAVZEb14VRAoKuYZHOXfBV4p5Uh9U0yCi5IWMdKfB7hRoFAa_GwCE_O5x0gMTYnUdZLiVLDwZAkWPer-eS-7B543Nd9ewohU6rbttZ2wm3qGSjvreQ8dsPVuQZCA93UTzKRPVRRz6au5THo_yqWygmsB5MczRSmMZMuGBQjtzV31KrcWepeTVsIPLTRaPpQOrF-qi0iSvTgIT9-Wo87Z3Y7v7GBS-Nlq78xMIrxNXCAAE3LQk2_sonebOHTJ_Bh4yNlwfFZrORdW" alt="Farm Weather" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90"></div>
            </div>
            
            <div className="relative z-10 w-full p-8 text-white h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full mb-4 border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Dữ liệu thực - IoT Sensor #04</span>
                  </div>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-[0.2em]">15:30, 15 Th04</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="material-symbols-outlined text-primary text-5xl material-symbols-filled">wb_sunny</span>
                    <span className="text-2xl font-black tracking-tight">Nắng đẹp</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-8xl font-black tracking-tighter leading-none">28°</p>
                  <div className="flex items-center justify-end gap-2 mt-2">
                    <span className="text-xs font-bold text-white/50">THẤP 22°</span>
                    <span className="w-px h-3 bg-white/20"></span>
                    <span className="text-xs font-bold text-white/50">CAO 31°</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 mt-8">
                {[
                  { label: 'Độ ẩm', val: '75%', icon: 'water_drop', color: 'text-primary' },
                  { label: 'Gió', val: '15 km/h', icon: 'air', color: 'text-primary' },
                  { label: 'Lượng mưa', val: '0 mm', icon: 'rainy', color: 'text-primary' },
                  { label: 'Áp suất', val: '1012 hPa', icon: 'compress', color: 'text-yellow-400' },
                  { label: 'UV Index', val: '8.5 Cao', icon: 'light_mode', color: 'text-orange-400' },
                  { label: 'Độ ẩm Đất', val: '62%', icon: 'potted_plant', color: 'text-emerald-400' }
                ].map(stat => (
                  <div key={stat.label} className="bg-black/30 backdrop-blur-xl border border-white/10 flex flex-col items-center gap-1.5 rounded-[1.25rem] py-3 shadow-lg">
                    <div className="flex items-center gap-1">
                      <span className={`material-symbols-outlined ${stat.color} !text-base`}>{stat.icon}</span>
                      <span className="text-[9px] text-white/40 uppercase font-black tracking-widest">{stat.label}</span>
                    </div>
                    <span className="text-sm font-black tracking-tight">{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="mb-8">
          <div className="px-6 pb-4 flex justify-between items-end">
            <h3 className="text-text-main-light dark:text-white text-lg font-black tracking-tight uppercase">Chi tiết 24h tới</h3>
            <div className="flex gap-4 text-[9px] font-black uppercase tracking-widest">
              <span className="flex items-center gap-1.5 text-gray-400"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500"></span> Mưa</span>
              <span className="flex items-center gap-1.5 text-gray-400"><span className="w-2.5 h-2.5 rounded-sm bg-yellow-400"></span> Nắng</span>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto px-4 pb-4 no-scrollbar">
            <div className="flex flex-col items-center justify-between gap-1 rounded-2xl bg-surface-dark dark:bg-primary text-white dark:text-black min-w-[75px] h-36 py-4 shadow-xl border border-transparent relative overflow-hidden shrink-0">
              <p className="text-[10px] font-black uppercase z-10">Bây giờ</p>
              <span className="material-symbols-outlined text-2xl z-10 material-symbols-filled">wb_sunny</span>
              <p className="text-lg font-black z-10">28°</p>
              <div className="w-full bg-white/10 dark:bg-black/10 h-10 absolute bottom-0 flex items-end justify-center">
                <div className="w-full bg-yellow-400/50 h-[80%]"></div>
              </div>
              <p className="text-[9px] z-10 font-black mt-1 uppercase">UV 8</p>
            </div>
            {[
              { time: '14:00', icon: 'partly_cloudy_day', temp: '29°', chance: '10%', fill: '10%', color: 'text-warning' },
              { time: '15:00', icon: 'cloud', temp: '28°', chance: '30%', fill: '30%', color: 'text-gray-400' },
              { time: '16:00', icon: 'rainy', temp: '27°', chance: '2.1mm', fill: '60%', color: 'text-blue-500', isRain: true },
              { time: '17:00', icon: 'thunderstorm', temp: '26°', chance: '5.4mm', fill: '85%', color: 'text-blue-600', isRain: true },
              { time: '18:00', icon: 'cloud', temp: '25°', chance: '20%', fill: '20%', color: 'text-gray-400' },
            ].map((h, i) => (
              <div key={i} className={`flex flex-col items-center justify-between gap-1 rounded-2xl bg-white dark:bg-surface-dark border ${h.isRain ? 'border-blue-200 dark:border-blue-900/50' : 'border-gray-100 dark:border-white/10'} min-w-[75px] h-36 py-4 shadow-sm shrink-0 relative overflow-hidden`}>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 z-10 font-black uppercase">{h.time}</p>
                <span className={`material-symbols-outlined text-2xl ${h.color} z-10`}>{h.icon}</span>
                <p className="text-lg font-black text-text-main-light dark:text-white z-10">{h.temp}</p>
                <div className={`w-full h-10 absolute bottom-0 flex items-end justify-center border-t border-gray-100 dark:border-white/5 ${h.isRain ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                  <div className={`w-full ${h.isRain ? 'bg-blue-500' : 'bg-blue-500/20'} transition-all`} style={{ height: h.fill }}></div>
                </div>
                <p className={`text-[9px] z-10 font-black uppercase ${h.isRain ? 'text-blue-600 dark:text-blue-300' : 'text-gray-400'}`}>{h.chance}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Analysis Section */}
        <div className="px-4 py-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <h3 className="text-text-main-light dark:text-white text-lg font-black tracking-tight uppercase">Phân tích Rủi ro</h3>
              <span className="bg-primary/20 text-green-700 dark:text-primary text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-[0.2em] border border-primary/20">AI Insight</span>
            </div>
            <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline underline-offset-4">Xem bản đồ</button>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-[2rem] shadow-xl border border-gray-100 dark:border-white/5 overflow-hidden relative group">
            <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-start">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0 shadow-inner">
                  <span className="material-symbols-outlined text-red-500 !text-2xl font-bold">ac_unit</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-text-main-light dark:text-white font-black text-base tracking-tight">Cảnh báo Sương muối</h4>
                    <span className="px-2 py-0.5 rounded-lg bg-red-500 text-white text-[8px] font-black uppercase tracking-widest">Nguy cấp</span>
                  </div>
                  <p className="text-gray-400 font-bold text-[10px] uppercase mt-1 tracking-widest">Dự báo 04:00 - 06:00 sáng mai</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-red-500 leading-none">95%</p>
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">Khả năng</p>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50/50 dark:bg-surface-dark-lighter">
              <p className="text-[9px] font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">Biểu đồ nhiệt độ dự kiến sáng mai</p>
              <div className="flex items-end justify-between h-24 gap-3 mb-6 px-1">
                {[
                  { time: '02:00', temp: '8°', fill: '80%', color: 'bg-green-200 dark:bg-green-900/40', textColor: 'text-gray-400' },
                  { time: '03:00', temp: '5°', fill: '50%', color: 'bg-yellow-200 dark:bg-yellow-900/40', textColor: 'text-yellow-600' },
                  { time: '04:00', temp: '2°', fill: '20%', color: 'bg-red-400 dark:bg-red-500/80', textColor: 'text-red-500', alert: true },
                  { time: '05:00', temp: '1°', fill: '10%', color: 'bg-red-400 dark:bg-red-500/80', textColor: 'text-red-500', alert: true },
                  { time: '06:00', temp: '4°', fill: '40%', color: 'bg-yellow-200 dark:bg-yellow-900/40', textColor: 'text-yellow-600' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center w-full gap-2 group">
                    <span className={`text-[10px] font-black ${item.alert ? 'animate-pulse' : ''} ${item.textColor}`}>{item.temp}</span>
                    <div className={`w-full ${item.color} rounded-t-lg transition-all group-hover:brightness-110 relative`} style={{ height: item.fill }}>
                       {item.alert && <div className="absolute -top-1 w-full h-1 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>}
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.time}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-text-main-light dark:text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-xl shadow-sm active:scale-95 transition-transform">
                  Chi tiết rủi ro
                </button>
                <button className="flex-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-xl shadow-lg shadow-red-500/20 hover:bg-red-600 active:scale-95 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined !text-base">shield</span>
                  Giải pháp xử lý
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-[2rem] shadow-sm border-l-[6px] border-l-orange-500 border border-gray-100 dark:border-white/5 p-5 flex gap-5 items-center group active:scale-[0.98] transition-all">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-8 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-orange-500 !text-xl font-bold">pest_control</span>
                </div>
                <h4 className="text-text-main-light dark:text-white font-black text-sm uppercase tracking-tight">Nguy cơ sâu bệnh (Nấm)</h4>
              </div>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-3">Độ ẩm >80% kéo dài 3 ngày tới.</p>
              <div className="w-full h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 w-[65%] rounded-full relative shadow-[0_0_8px_rgba(249,115,22,0.4)]"></div>
              </div>
              <div className="flex justify-between text-[8px] font-black text-gray-400 uppercase tracking-widest">
                <span>Thấp</span>
                <span className="text-orange-500 font-black">Trung bình</span>
                <span>Cao</span>
              </div>
            </div>
            <button className="shrink-0 bg-orange-50 dark:bg-orange-900/20 text-orange-500 size-12 rounded-2xl flex items-center justify-center hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-all group-hover:translate-x-1">
              <span className="material-symbols-outlined !text-xl font-bold">arrow_forward_ios</span>
            </button>
          </div>
        </div>

        <div className="h-px bg-gray-100 dark:bg-white/10 mx-6 my-6"></div>

        {/* 10-Day Forecast List */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="text-text-main-light dark:text-white text-lg font-black tracking-tight uppercase">Dự báo 10 Ngày</h3>
            <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline underline-offset-4">Lịch nông vụ</button>
          </div>
          
          <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
            <div className="grid grid-cols-12 gap-1 p-5 border-b border-gray-50 dark:border-white/5 bg-gray-50/30 dark:bg-black/10">
              <div className="col-span-3 text-[9px] text-gray-400 font-black uppercase tracking-widest">Ngày</div>
              <div className="col-span-4 text-[9px] text-gray-400 font-black uppercase tracking-widest text-center">Nhiệt độ</div>
              <div className="col-span-3 text-[9px] text-gray-400 font-black uppercase tracking-widest text-center">Mưa/Ẩm</div>
              <div className="col-span-2 text-[9px] text-gray-400 font-black uppercase tracking-widest text-right">Gió</div>
            </div>

            <div className="divide-y divide-gray-50 dark:divide-white/5">
              {[
                { day: 'Hôm nay', date: '15/04', icon: 'rainy', high: '28°', low: '22°', chance: '40%', hum: '82%', wind: '15km', dir: 'Đông Nam', active: true, color: 'text-primary' },
                { day: 'Thứ 3', date: '16/04', icon: 'sunny', high: '31°', low: '24°', chance: '0%', hum: '65%', wind: '12km', dir: 'Đông', color: 'text-warning' },
                { day: 'Thứ 4', date: '17/04', icon: 'partly_cloudy_day', high: '30°', low: '23°', chance: '10%', hum: '70%', wind: '10km', dir: 'Đông Nam', color: 'text-warning' },
                { day: 'Thứ 5', date: '18/04', icon: 'cloud', high: '27°', low: '21°', chance: '60%', hum: '85%', wind: '18km', dir: 'Đông Nam', color: 'text-gray-400' },
              ].map((day, i) => (
                <div key={i} className={`grid grid-cols-12 gap-1 items-center p-5 transition border-transparent group cursor-pointer ${day.active ? 'bg-primary/5 dark:bg-primary/10' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}>
                  <div className="col-span-3">
                    <p className={`text-sm font-black tracking-tight ${day.active ? 'text-primary' : 'text-text-main-light dark:text-white'}`}>{day.day}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase mt-0.5">{day.date}</p>
                  </div>
                  <div className="col-span-4 flex items-center justify-center gap-3">
                    <span className={`material-symbols-outlined ${day.color} !text-2xl ${day.active ? 'material-symbols-filled' : ''}`}>{day.icon}</span>
                    <div className="flex flex-col items-center leading-none">
                      <span className="text-sm font-black text-text-main-light dark:text-white">{day.high}</span>
                      <span className="text-[10px] font-bold text-gray-400 mt-0.5">{day.low}</span>
                    </div>
                  </div>
                  <div className="col-span-3 flex flex-col items-center justify-center">
                    <div className={`flex items-center gap-1 font-black text-[10px] ${parseInt(day.chance) > 30 ? 'text-blue-500' : 'text-gray-400'}`}>
                      <span className="material-symbols-outlined !text-[12px]">water_drop</span> {day.chance}
                    </div>
                    <span className="text-[8px] font-bold text-gray-400 uppercase mt-1">Ẩm {day.hum}</span>
                  </div>
                  <div className="col-span-2 text-right">
                    <p className="text-xs font-black text-text-main-light dark:text-white">{day.wind}<span className="text-[9px] font-normal">km</span></p>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">{day.dir}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Farm Advice */}
        <div className="px-4 py-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-900/30 rounded-[2rem] p-6 flex items-start gap-4 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
               <span className="material-symbols-outlined !text-7xl text-primary">psychology</span>
            </div>
            <div className="bg-white dark:bg-surface-dark size-12 rounded-2xl shadow-lg flex items-center justify-center shrink-0 border border-green-100 dark:border-white/5">
              <span className="material-symbols-outlined text-green-600 dark:text-primary !text-2xl animate-pulse">tips_and_updates</span>
            </div>
            <div className="relative z-10">
              <p className="text-green-900 dark:text-green-100 font-black text-sm uppercase tracking-widest mb-2">Lời khuyên nông vụ (AI)</p>
              <p className="text-green-800 dark:text-green-200 text-sm leading-relaxed font-medium">
                Cửa sổ phun thuốc tối ưu: <span className="font-black underline decoration-primary underline-offset-4">14:00 - 16:00 ngày mai</span>. Thời tiết khô ráo, gió nhẹ, hiệu quả thuốc tăng 20%.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
      `}</style>
    </div>
  );
};

export default Weather;
