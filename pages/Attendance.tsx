
import React, { useState } from 'react';

interface Props { onBack: () => void; }

const Attendance: React.FC<Props> = ({ onBack }) => {
  const [activeView, setActiveView] = useState('Danh sách');
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  const STATS = [
    { label: 'Nhân sự', val: '24/25', icon: 'group', color: 'text-primary' },
    { label: 'Cần đối soát', val: '3', icon: 'fact_check', color: 'text-orange-500', alert: true },
    { label: 'Tổng giờ', val: '186h', icon: 'timer', color: 'text-blue-500' },
  ];

  return (
    <div className="relative flex h-screen w-full max-w-md mx-auto flex-col bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden font-display">
      {/* Header */}
      <div className="flex items-center bg-white dark:bg-surface-dark px-4 py-3 justify-between border-b border-gray-200 dark:border-gray-800 shrink-0 z-20">
        <div onClick={onBack} className="text-text-main-light dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
          <span className="material-symbols-outlined">arrow_back</span>
        </div>
        <h2 className="text-text-main-light dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Chấm công nhân viên</h2>
        <div className="flex w-10 items-center justify-end">
          <button className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-text-main-light dark:text-white">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pb-24">
        {/* Attendance Action Module */}
        <div className="px-4 py-4">
          <div className="relative overflow-hidden rounded-[2rem] bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="absolute inset-0 map-pattern opacity-30 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90 dark:to-surface-dark/95 z-0"></div>
            <div className="relative z-10 p-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-100 dark:border-gray-700">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                  </span>
                  <span className="text-[10px] font-black text-text-main-light dark:text-white uppercase tracking-wider">Đã định vị: Khu vực A</span>
                </div>
                <button className="flex items-center gap-1.5 bg-slate-900 text-white dark:bg-white dark:text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md hover:scale-105 transition-transform active:scale-95">
                  <span className="material-symbols-outlined !text-base">photo_camera</span>
                  Xác nhận
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-black p-5 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95">
                  <span className="material-symbols-outlined !text-3xl font-black">login</span>
                  <span className="font-black text-xs uppercase tracking-widest">Vào Ca</span>
                  <span className="text-[10px] opacity-60 font-mono font-bold">07:00:00</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 bg-white dark:bg-black/20 border-2 border-gray-100 dark:border-gray-800 text-gray-400 hover:text-red-500 hover:border-red-500/30 p-5 rounded-2xl transition-all active:scale-95 group">
                  <span className="material-symbols-outlined !text-3xl group-hover:text-red-500">logout</span>
                  <span className="font-black text-xs uppercase tracking-widest">Tan Ca</span>
                  <span className="text-[10px] opacity-40 font-mono font-bold">--:--:--</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Date and Summary */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Dữ liệu ngày</p>
              <div className="flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer">
                <h1 className="text-2xl font-black text-text-main-light dark:text-white tracking-tight">12 Th10, 2023</h1>
                <span className="material-symbols-outlined text-gray-400">expand_more</span>
              </div>
            </div>
            <button className="text-[10px] font-black text-primary bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl hover:bg-primary/20 transition-all uppercase tracking-widest">
              Xuất báo cáo
            </button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x pb-2">
            {STATS.map((s, i) => (
              <div key={i} className={`flex min-w-[125px] flex-col gap-1 rounded-2xl p-4 border shadow-sm snap-start relative ${s.alert ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-800/50' : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800'}`}>
                {s.alert && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>}
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined ${s.color} !text-lg`}>{s.icon}</span>
                  <p className={`${s.alert ? 'text-orange-700 dark:text-orange-300' : 'text-gray-400'} text-[9px] font-black uppercase tracking-widest`}>{s.label}</p>
                </div>
                <p className={`${s.alert ? 'text-orange-700 dark:text-orange-300' : 'text-text-main-light dark:text-white'} text-xl font-black`}>{s.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-4 py-2 sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/50">
          <div className="flex h-11 w-full items-center justify-center rounded-xl bg-gray-200 dark:bg-black/20 p-1 mb-4">
            {['Danh sách', 'Đối soát & Map', 'Báo cáo'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveView(tab)}
                className={`flex h-full flex-1 items-center justify-center rounded-lg text-[10px] font-black uppercase tracking-widest transition-all gap-1.5 ${activeView === tab ? 'bg-white dark:bg-surface-dark shadow-sm text-text-main-light dark:text-white' : 'text-gray-500'}`}
              >
                {tab}
                {tab === 'Đối soát & Map' && <span className="bg-orange-500 text-white text-[8px] size-4 flex items-center justify-center rounded-full">3</span>}
              </button>
            ))}
          </div>

          <div className="space-y-4 pb-2">
            <div className="relative w-full group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors !text-[20px]">search</span>
              <input className="block w-full h-11 pl-11 pr-11 text-xs font-bold text-text-main-light dark:text-white bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none placeholder-gray-400" placeholder="Tìm tên, mã, khu vực..." type="text"/>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined !text-[20px]">tune</span>
              </button>
            </div>
            
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {['Tất cả', 'Cần đối soát (3)', 'Đúng giờ', 'Khu vực A'].map((f) => (
                <button 
                  key={f} 
                  onClick={() => setActiveFilter(f)}
                  className={`shrink-0 h-8 px-4 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${activeFilter === f ? (f.includes('đối soát') ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-primary border-primary text-black shadow-lg shadow-primary/20') : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800 text-gray-500'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Content based on tabs */}
        <div className="px-4 pt-4 flex flex-col gap-5">
          {/* Active Map Summary */}
          <div className="rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 h-40 w-full relative group cursor-pointer shadow-sm">
            <div className="absolute inset-0 map-pattern bg-gray-100 dark:bg-gray-900 opacity-60"></div>
            {/* Mock Markers */}
            <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className="material-symbols-outlined text-green-500 text-3xl drop-shadow-md animate-bounce">location_on</span>
              <div className="w-2 h-1.5 bg-black/20 rounded-full blur-[1px]"></div>
            </div>
            <div className="absolute top-1/3 right-1/4 flex flex-col items-center">
              <span className="material-symbols-outlined text-orange-500 text-3xl drop-shadow-md animate-pulse">location_on</span>
              <div className="w-2 h-1.5 bg-black/20 rounded-full blur-[1px]"></div>
            </div>
            <div className="absolute bottom-1/4 right-1/3 flex flex-col items-center">
              <span className="material-symbols-outlined text-green-500 text-3xl drop-shadow-md">location_on</span>
              <div className="w-2 h-1.5 bg-black/20 rounded-full blur-[1px]"></div>
            </div>
            <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-black/80 px-3 py-1.5 rounded-xl text-[10px] font-black text-text-main-light dark:text-white backdrop-blur shadow-lg border border-white/20 uppercase tracking-widest">
              Bản đồ mặt bằng (24 active)
            </div>
            <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 p-2 rounded-full shadow-lg border border-white/20 hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[18px]">open_in_full</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-100 dark:bg-gray-800"></span>
            <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">Cần đối soát (3)</span>
            <span className="h-px flex-1 bg-gray-100 dark:bg-gray-800"></span>
          </div>

          {/* Reconciliation Items */}
          <div className="space-y-4">
             {/* Item 1: Location Mismatch */}
             <div className="group relative flex flex-col gap-4 rounded-[2rem] bg-orange-50/50 dark:bg-orange-900/10 p-5 border border-orange-200 dark:border-orange-800/50 shadow-sm active:scale-[0.98] transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="size-12 shrink-0 rounded-full border-2 border-orange-200 overflow-hidden shadow-sm">
                       <img className="size-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXbl_kOXiT6MlBXYy89kI_696EbgmPiJ5dCELfmmZyD_5DzOIC33gr726g6NVHkbSnPi4_cjwCW6cSacgrv32Z2Df-uPL5HDySTcuaI_WrwniPtsgT9dRW_9iZd1nmlSi4RKuSUtn52JSb3ClBg1IiuR4JId62uKjsk_m6q14HeOELmrQ00ZESQK8czZ966vLAFPRu1MNLrtWQ4pjXeSPli4tQVHcYJbIblm6mRvXTgQEpEki-6uoTzIdiTqVnzTWik7TqX2PUP7qx" alt="Staff" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-text-main-light dark:text-white tracking-tight">Nguyễn Văn An</h4>
                      <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 mt-1">
                        <span className="material-symbols-outlined !text-sm font-black">warning</span>
                        <p className="text-[10px] font-black uppercase tracking-widest">Vị trí không khớp</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="size-10 rounded-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-primary transition-colors shadow-sm">
                      <span className="material-symbols-outlined !text-xl">map</span>
                    </button>
                    <button className="size-10 rounded-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-primary transition-colors shadow-sm">
                      <span className="material-symbols-outlined !text-xl">image</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-orange-200/40">
                   <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-black text-gray-400 tracking-widest mb-0.5">Vào</span>
                        <span className="text-sm font-black dark:text-white font-mono">07:05</span>
                      </div>
                      <div className="flex h-1.5 w-20 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                        <div className="h-full w-[90%] bg-orange-400"></div>
                      </div>
                   </div>
                   <button className="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-orange-200 transition-colors border border-orange-200 dark:border-orange-800">
                      Duyệt nhanh
                   </button>
                </div>
             </div>

             {/* Item 2: Missing Photo */}
             <div className="group relative flex flex-col gap-4 rounded-[2rem] bg-orange-50/50 dark:bg-orange-900/10 p-5 border border-orange-200 dark:border-orange-800/50 shadow-sm active:scale-[0.98] transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="size-12 shrink-0 rounded-full border-2 border-orange-200 overflow-hidden shadow-sm">
                       <img className="size-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5-yOTMzsuSfq_3GSsiAXqaQ4cpqRFemJEM1-I8aX1cnxmi_h9ctZCc1F3dGrF4wwscU0xJMH9ASRiD7748R7Ier9UZzDlFiOnnjJmKqyeDGX47mKIWpXK8ZGYURQXsKiuY0uIgT-iRvFZNGgF2qjX6jCruBcVtBHeCxAtbyK_zeosFExdPFtdxQwOl9hcW6NW3F2qa0on45BC3n0bpzAehEH1NGnSBh_f7e5R83THa3vG6R7pA6wF1l2co_QPBJPnOsbabj313JQe" alt="Staff" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-text-main-light dark:text-white tracking-tight">Trần Thị Bích</h4>
                      <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 mt-1">
                        <span className="material-symbols-outlined !text-sm font-black">no_photography</span>
                        <p className="text-[10px] font-black uppercase tracking-widest">Thiếu ảnh xác nhận</p>
                      </div>
                    </div>
                  </div>
                  <button className="size-10 rounded-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-primary transition-colors shadow-sm">
                    <span className="material-symbols-outlined !text-xl">map</span>
                  </button>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-orange-200/40">
                   <div className="flex flex-col">
                      <span className="text-[9px] uppercase font-black text-gray-400 tracking-widest mb-0.5">Vào</span>
                      <span className="text-sm font-black dark:text-white font-mono">08:00</span>
                   </div>
                   <button className="bg-slate-900 text-white dark:bg-white dark:text-black text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl active:scale-95 transition-all shadow-lg">
                      Yêu cầu chụp
                   </button>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <span className="h-px flex-1 bg-gray-100 dark:bg-gray-800"></span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Đã duyệt / Bình thường</span>
            <span className="h-px flex-1 bg-gray-100 dark:bg-gray-800"></span>
          </div>

          {/* Normal Items */}
          <div className="space-y-4 pb-12">
            {[
              { name: 'Hoàng Thị Lan', role: 'Giám sát • Khu vực B', status: 'Đúng giờ', timeIn: '06:45', timeOut: '16:45', hrs: '10h', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_T-EfrvEpHJ775CcbK0n4ZIgGzs7mXkPrCrtEum3wUBFqtfaX_ndBVUhA8cjgRXdWJDqB8ph2URVXtNSmsW6T-KSt5Qv18ZoVM-z9HSI4wd6eKx8INuieDSEY_sB4oiOvvVj7tnk5gTHTygIxiuik9cNcOxBg8axTOzk8zLE1qJ-Tr2J4f5oq2-4B3MRTcw5_s01fBPA6fnF0P-hClMF2DMgahyl87PQW2ZuE7NAC6mW3DlAiFxvpvViWpJu-xJYHHmnOdrBmHQQ7' },
              { name: 'Phạm Minh Đạt', role: 'Kỹ thuật viên • Khu vực A', status: 'Đang làm', timeIn: '07:30', timeOut: '--:--', hrs: '...', working: true, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEiGUluBgCyj-Sud4WXhW1T5bHbWBzTHRnxKxlVyD2pCAIA8tup7kLdKX3PQYNJsD1qNciqQIsJPO9WhIlwevOGWnRO8OKR1NbcbOUvHjSRD3MwtPQFcAQ9YAHauH70B3j2RF2g0rK0qwogG-Xqp3PHgYqKQWEzuwijIX_Mhxbmt_hAApZSuXkmlNmzV998iCfraTjj-4ZX3Yp0lGxeNrkLmwMKQCS8i8Igc4FisyCNFcYICB_eN_BcrGi70aQwqEAGJ_TLZxYEho6' },
            ].map((person, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark rounded-[2rem] p-5 border border-gray-100 dark:border-gray-800 shadow-sm active:scale-[0.99] transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="size-12 shrink-0 rounded-full border-2 border-gray-50 dark:border-gray-800 overflow-hidden shadow-sm">
                       <img className="size-full object-cover" src={person.img} alt={person.name} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-black text-text-main-light dark:text-white truncate">{person.name}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{person.role}</p>
                    </div>
                  </div>
                  <div className={`shrink-0 flex items-center px-3 py-1 rounded-lg border ${person.working ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/50' : 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800/50'}`}>
                    {person.working && <div className="size-1.5 rounded-full bg-blue-500 animate-pulse mr-2"></div>}
                    <span className={`text-[10px] font-black uppercase tracking-widest ${person.working ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}`}>{person.status}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 py-3 border-b border-gray-50 dark:border-gray-800/50 mb-4">
                  <button className="flex items-center gap-1.5 text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">
                    <span className="material-symbols-outlined !text-[16px]">location_on</span>
                    {person.role.split('•')[1]}
                  </button>
                  <span className="text-gray-200 dark:text-gray-800">|</span>
                  <button className="flex items-center gap-1.5 text-[10px] font-black text-green-500 uppercase tracking-widest hover:underline">
                    <span className="material-symbols-outlined !text-[16px]">check_circle</span>
                    Ảnh xác nhận
                  </button>
                </div>

                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-black text-gray-400 tracking-widest mb-0.5">Vào</span>
                        <span className="text-sm font-black dark:text-white font-mono">{person.timeIn}</span>
                      </div>
                      <div className="flex h-1.5 w-20 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
                         <div className={`h-full ${person.working ? 'bg-blue-400 animate-pulse w-[60%]' : 'bg-primary w-full shadow-glow'}`}></div>
                      </div>
                      <div className={`flex flex-col text-right ${person.working ? 'opacity-30' : ''}`}>
                        <span className="text-[9px] uppercase font-black text-gray-400 tracking-widest mb-0.5">Ra</span>
                        <span className="text-sm font-black dark:text-white font-mono">{person.timeOut}</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black text-text-main-light dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">{person.hrs}</span>
                     <button className="text-gray-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">more_horiz</span>
                     </button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-[60]">
        <button className="size-16 rounded-full bg-primary text-black shadow-xl shadow-primary/40 flex items-center justify-center active:scale-90 transition-all border-4 border-background-light dark:border-background-dark group">
          <span className="material-symbols-outlined text-3xl font-black group-hover:rotate-90 transition-transform duration-300">add</span>
        </button>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 dark:bg-gray-700 rounded-full z-40 opacity-50"></div>

      <style>{`
        .map-pattern {
          background-color: transparent;
          background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuFlkYuzlW4cXBh_HHtm8YnGcGUeATg_PO9PVrKv-XbDhz_J2lJkN0gqziEaukgJTfTdIPpxrlyANwRi_QzqI21nH9qG3DmIRQySeHWYmLbNbif_kMqIpMx5EtsY4K8qHf6eFBbB1MUtAaqpgoMmJEjxvhXfbc4EKg0ZoFy8kCs938rRr-chXJHmoJMUnHkxOvfaemREmMTelbe8eQCEPf8AFG_w97-FDgTON_Cl3_LKAqt9vHn8MrOn2WJkNl7TaWQd20jxsEGeT0O");
          background-size: cover;
        }
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Attendance;
