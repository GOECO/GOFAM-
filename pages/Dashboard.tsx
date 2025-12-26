
import React from 'react';
import { Page } from '../types';

interface Props { onNavigate: (page: Page) => void; }

const Dashboard: React.FC<Props> = ({ onNavigate }) => {
  const marketPrices = [
    { name: 'Lúa ST25', price: '12.500', change: '+2%' },
    { name: 'Cà phê', price: '95.200', change: '+1.5%' },
    { name: 'Hồ tiêu', price: '82.000', change: '-0.5%' },
    { name: 'Dâu tây', price: '250.000', change: '+5%' },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-text-main-light dark:text-white pb-24 transition-colors duration-500">
      {/* Top Header - Command Center Style */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 transition-all shadow-soft">
        <div className="flex items-center px-5 py-3.5 justify-between">
          <div className="flex items-center gap-3">
             <div onClick={() => onNavigate('dashboard')} className="size-11 rounded-2xl bg-primary flex items-center justify-center shadow-glow active-scale cursor-pointer">
                <span className="material-symbols-outlined text-[#8B0000]/50 font-black scale-[0.8]">agriculture</span>
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] font-black text-primary tracking-[0.2em] uppercase leading-none mb-1">COMMAND CENTER</span>
               <h1 className="text-lg font-bold leading-none dark:text-white uppercase tracking-tight italic">Ba Vì <span className="text-primary not-italic font-black">Pro Farm</span></h1>
             </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={() => onNavigate('live-assistant')} className="size-11 flex items-center justify-center rounded-2xl bg-primary/10 active-scale border border-primary/20 transition-all hover:bg-primary/20">
              <span className="material-symbols-outlined animate-pulse-red !text-[20px] scale-[0.8]">mic</span>
            </button>
            <button onClick={() => onNavigate('notifications')} className="relative size-11 flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-800 active-scale transition-colors hover:border-primary/30">
              <span className="material-symbols-outlined dark:text-white scale-[0.8]">notifications</span>
              <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-surface-dark"></span>
            </button>
          </div>
        </div>

        {/* Market Ticker */}
        <div className="bg-slate-900 dark:bg-black/40 py-2.5 border-y border-white/5 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-10">
            {marketPrices.concat(marketPrices).map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.name}</span>
                <span className="text-[11px] font-black text-white">{item.price}đ</span>
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${item.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-1.5 px-4 pt-3">
        {/* Core Metrics with Smart Links */}
        <section className="grid grid-cols-2 gap-1.5">
          <div 
            onClick={() => onNavigate('weather')}
            className="bg-white dark:bg-surface-dark rounded-card p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-3 active-scale cursor-pointer hover:border-blue-400/30 transition-all"
          >
            <div className="size-11 rounded-2xl bg-blue-500/10 text-slate-500/70 flex items-center justify-center shrink-0 border border-blue-500/20">
              <span className="material-symbols-outlined !text-2xl scale-[0.8]">wb_sunny</span>
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-black text-gray-400 uppercase leading-none mb-1">Thời tiết</p>
              <p className="text-sm font-black dark:text-white truncate">28°C • Nắng</p>
            </div>
          </div>
          
          <div 
            onClick={() => onNavigate('wallet')}
            className="bg-slate-900 rounded-card p-4 border border-white/10 shadow-xl flex items-center gap-3 active-scale cursor-pointer hover:bg-slate-800 transition-all"
          >
            <div className="size-11 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
              <span className="material-symbols-outlined !text-2xl scale-[0.8] text-[#8B0000]/50">account_balance_wallet</span>
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-black text-primary uppercase leading-none mb-1">Ví Token</p>
              <p className="text-sm font-black text-white truncate">1,240 <span className="text-[10px] text-gray-400">GFM</span></p>
            </div>
          </div>
        </section>

        {/* Live Surveillance - Click to Areas detail */}
        <section className="flex flex-col gap-2 mt-1">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
               <h2 className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">Surveillance Pro</h2>
               <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[8px] font-black uppercase animate-pulse">Live</span>
            </div>
            <div 
              onClick={() => onNavigate('ap-check')}
              className="flex items-center gap-2 bg-primary/10 px-2 py-1 rounded-lg border border-primary/20 cursor-pointer active-scale hover:bg-primary/20 transition-all"
            >
               <span className="material-symbols-outlined !text-xs text-[#8B0000]/80 animate-spin-slow">helicopter</span>
               <span className="text-[9px] font-black text-primary uppercase">Drone: Active</span>
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              { id: '1', title: 'Lô Dâu Tây A1', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDizaS0wKE40w5KOd9VzUwc2xjR86J9IVGybwrwkROFPUo4mynbfYxgqFBmIVBSKz8sC4IQDLHR0vQcOoaoedUXLteVKErSj1FiN3GIIvCCZCkD2pVnaeGxKDU4qEZv25-SXjsBz9oMGWpidP6me6U43bmP0MLVhjQusqTPcjoT4AUyf0Z0D05qvDaKkLTREEooaXJOR2Z-FHfTTQy0_1zVvCTfqU84vaHwNsIln6TVIXsIM8p4mj-WzWlK4l23eN10QEMGD8TCtIbA', label: 'AI: Đã tưới' },
              { id: '2', title: 'Khu Drone Ba Vì', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW4syBykgQHRuIXLBESktXH4gaZjHD5svMevKOdt7O_PsfrAHisJLP7Yt6CyhlTFKqGsulKUyPCCooNLcU-ujk_ro2ifhWj0O8WPq2KpY-gvvi3gVxo3ktVdJ4CcEQPqJWr3-8pRVBAlDxeJVPMzeGXgdqhjM_rreULDQOjeI6rkg0L0FEEMFVKtUFE6gaDffndAVTKJE_kwei7vZJxfYX8IaErgVjxIdDElJqb13yHzd8djyCPWLe3cttTK_Kg-rfmFGcxvaX9qzf', label: 'AI: Ổn định' }
            ].map((cam) => (
              <div 
                key={cam.id} 
                onClick={() => onNavigate('areas')}
                className="relative shrink-0 w-72 aspect-video rounded-card overflow-hidden bg-slate-900 border border-white/5 shadow-2xl group active-scale cursor-pointer"
              >
                <img src={cam.img} className="size-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[10s] grayscale-[20%]" alt="Cam" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 flex gap-2">
                   <span className="bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[8px] font-black text-white border border-white/10 uppercase">CAM 0{cam.id}</span>
                   <span className="bg-primary text-black px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest shadow-glow">AI VISION</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <p className="text-white text-[11px] font-black uppercase tracking-widest leading-none mb-1">{cam.title}</p>
                  <p className="text-gray-400 text-[8px] font-bold uppercase tracking-widest">WebRTC • 4K Stream</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Discovery Grid - Strictly 80% Scale icons */}
        <section className="grid grid-cols-3 gap-1.5 mt-1">
          {[
            { id: 'inv', label: 'Kho Vật Tư', icon: 'inventory_2', bg: 'bg-blue-500/10', color: 'text-slate-500/70', page: 'inventory' as Page },
            { id: 'mkt', label: 'Chợ Nông Sản', icon: 'storefront', bg: 'bg-orange-500/10', color: 'text-slate-500/70', page: 'marketplace' as Page },
            { id: 'ai', label: 'Dữ liệu AI', icon: 'analytics', bg: 'bg-purple-500/10', color: 'text-[#8B0000]/50', page: 'ai-data' as Page },
          ].map((item) => (
            <button key={item.id} onClick={() => onNavigate(item.page)} className="flex flex-col items-center gap-1.5 py-4 rounded-3xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm active-scale group hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
              <div className={`size-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center border border-current/10 transition-transform group-hover:scale-105`}>
                <span className="material-symbols-outlined !text-[28px] scale-[0.8]">{item.icon}</span>
              </div>
              <span className="text-[11px] text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tighter leading-none">{item.label}</span>
            </button>
          ))}
        </section>

        {/* Pro Management Tools Grid */}
        <section className="flex flex-col gap-2 mt-1">
           <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Quản trị Hệ thống</h2>
           <div className="grid grid-cols-4 gap-1.5">
             {[
               { id: 'bc', label: 'Truy xuất', icon: 'verified_user', bg: 'bg-indigo-500/10', color: 'text-[#8B0000]/50', page: 'blockchain-scan' as Page },
               { id: 'ap', label: 'IoT Net', icon: 'router', bg: 'bg-emerald-500/10', color: 'text-slate-500/70', page: 'ap-check' as Page },
               { id: 'rp', label: 'Báo cáo', icon: 'summarize', bg: 'bg-rose-500/10', color: 'text-slate-500/70', page: 'reports' as Page },
               { id: 'lb', label: 'AI Labs', icon: 'biotech', bg: 'bg-slate-500/10', color: 'text-[#8B0000]/50', page: 'ai-labs' as Page },
             ].map((tool) => (
               <button key={tool.id} onClick={() => onNavigate(tool.page)} className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-surface-dark rounded-2xl border border-gray-50 dark:border-gray-800/50 active-scale group shadow-sm transition-all hover:border-primary/20">
                 <div className={`size-11 rounded-2xl ${tool.bg} ${tool.color} flex items-center justify-center transition-all group-hover:scale-105 border border-current/5`}>
                   <span className="material-symbols-outlined !text-[22px] scale-[0.8]">{tool.icon}</span>
                 </div>
                 <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight text-center leading-tight">{tool.label}</span>
               </button>
             ))}
           </div>
        </section>

        {/* Blockchain Transparency Card */}
        <section className="mt-1">
          <div 
            onClick={() => onNavigate('blockchain-scan')} 
            className="bg-slate-900 rounded-card p-5 flex items-center justify-between border border-white/5 shadow-2xl overflow-hidden relative group active-scale cursor-pointer hover:bg-slate-800 transition-all"
          >
            <div className="absolute -right-2 top-0 size-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
            <div className="flex items-center gap-4 relative z-10">
               <div className="size-12 rounded-2xl bg-primary flex items-center justify-center shadow-glow">
                  <span className="material-symbols-outlined !text-3xl scale-[0.8] text-[#8B0000]/50 font-black">qr_code_2</span>
               </div>
               <div>
                  <h4 className="text-white text-sm font-black uppercase tracking-widest leading-none mb-1.5">Minh bạch Blockchain</h4>
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <p className="text-[9px] text-primary font-bold uppercase tracking-widest">100% Traceable • Verified</p>
                  </div>
               </div>
            </div>
            <div className="flex flex-col items-end relative z-10 opacity-60">
               <span className="text-gray-400 text-[10px] font-mono">Block #2,841,092</span>
               <span className="text-[8px] text-white font-black uppercase tracking-tighter mt-1">Proof-of-Origin</span>
            </div>
          </div>
        </section>

        {/* Bottom Actions Row */}
        <section className="grid grid-cols-3 gap-1.5 mt-1">
          {[
            { id: 'adoption', label: 'Nuôi hộ', icon: 'volunteer_activism', bg: 'bg-rose-500/10', color: 'text-slate-500/70', page: 'adoption' as Page },
            { id: 'attendance', label: 'Chấm công', icon: 'badge', bg: 'bg-indigo-500/10', color: 'text-slate-500/70', page: 'attendance' as Page },
            { id: 'virtual', label: 'Vườn ảo VR', icon: 'videogame_asset', bg: 'bg-emerald-500/10', color: 'text-[#8B0000]/50', page: 'virtual-farm' as Page },
          ].map((item) => (
            <button key={item.id} onClick={() => onNavigate(item.page)} className="flex flex-col items-center gap-1.5 py-4 rounded-3xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm active-scale group hover:border-primary/10 transition-all">
              <div className={`size-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center border border-current/10 transition-transform group-hover:scale-105`}>
                <span className="material-symbols-outlined !text-[28px] scale-[0.8]">{item.icon}</span>
              </div>
              <span className="text-[11px] text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tighter leading-none">{item.label}</span>
            </button>
          ))}
        </section>

        {/* Mega Scan Button */}
        <button 
          onClick={() => onNavigate('scan')} 
          className="w-full rounded-card bg-primary p-5 shadow-xl active-scale transition-all hover:bg-primary-dark group flex items-center gap-4 mt-1 border-4 border-white dark:border-surface-dark ring-1 ring-primary/20"
        >
          <div className="size-14 rounded-2xl bg-white/30 flex items-center justify-center text-[#8B0000]/50 shadow-inner border border-white/20 transition-all group-hover:scale-105">
            <span className="material-symbols-outlined !text-[36px] font-black scale-[0.8]">qr_code_scanner</span>
          </div>
          <div className="flex flex-col items-start text-left flex-1">
            <span className="text-lg font-black text-[#111714] uppercase tracking-tight leading-none mb-1">Quét AI Vision Pro</span>
            <span className="text-[9px] font-black text-[#111714]/60 uppercase tracking-[0.2em]">Chẩn đoán sâu bệnh & Drone Link</span>
          </div>
          <span className="material-symbols-outlined text-[#111714]/40 font-black">arrow_forward_ios</span>
        </button>

        <div className="py-10 text-center opacity-30 select-none">
          <p className="text-[9px] font-black uppercase tracking-[0.5em] dark:text-white">GOFAM Command v2.5.0 • Enterprise Edition</p>
        </div>
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white/90 dark:bg-surface-dark/95 backdrop-blur-2xl border-t border-gray-100 dark:border-gray-800 px-6 h-20 pb-6 flex justify-between items-center transition-all shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <button className="flex flex-col items-center gap-1 text-[#8B0000]/50 scale-110 active-scale">
          <span className="material-symbols-outlined material-symbols-filled !text-[28px]">grid_view</span>
          <span className="text-[9px] font-black uppercase tracking-[0.15em]">Trung tâm</span>
        </button>
        <button onClick={() => onNavigate('tasks')} className="flex flex-col items-center gap-1 text-slate-400/60 active-scale hover:text-primary transition-all">
          <span className="material-symbols-outlined !text-[24px] scale-[0.8]">calendar_month</span>
          <span className="text-[9px] font-black uppercase tracking-[0.15em]">Lịch vụ</span>
        </button>
        <button onClick={() => onNavigate('messages')} className="flex flex-col items-center gap-1 text-slate-400/60 relative active-scale hover:text-primary transition-all">
          <span className="material-symbols-outlined !text-[24px] scale-[0.8]">chat_bubble</span>
          <span className="text-[9px] font-black uppercase tracking-[0.15em]">Nhắn tin</span>
          <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border border-white dark:border-surface-dark"></span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1 text-slate-400/60 active-scale hover:text-primary transition-all">
          <span className="material-symbols-outlined !text-[24px] scale-[0.8]">person</span>
          <span className="text-[9px] font-black uppercase tracking-[0.15em]">Cá nhân</span>
        </button>
      </nav>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Dashboard;
