
import React from 'react';
import { Page } from '../types';

interface Props { 
  onBack: () => void; 
  onNavigate: (page: Page) => void;
}

const Wallet: React.FC<Props> = ({ onBack, onNavigate }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark font-display text-white overflow-x-hidden pb-32 transition-colors duration-200">
      {/* Top App Bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-5 bg-background-dark/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative cursor-pointer active:scale-95 transition-transform" onClick={onBack}>
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-primary/20" 
                 style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAB5EFAPUCQUt5f_UOek3pxvHVucCQkElLaRkAAGzvt5lpa0HU35goh7PTazwOctrc4uI3yZM_iyeng3s5y_SdaZT3ASqfHgMnICNysXW1rIK2u1_ieeJUQ0srDC2QAwYtA1Uad_lHQ9K0OyfNC4zAtYshjcdbhMZPAoYSWJy_RdzN3xQqpzNGvpx733grZeD8nYpXc3212MnB43K4Ol6GX7Ik8ypfnsH1ralpcEHZv_5i3AbVf7arRDxzJ-M_yyThTFUGr9gpSxRWT")' }}>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-primary text-background-dark text-[10px] font-black px-1.5 rounded-full border border-background-dark shadow-glow">25</div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Welcome back,</span>
            <h2 className="text-base font-black leading-tight tracking-tight mt-0.5">Farmer John</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden xs:flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-primary animate-pulse shadow-glow"></div>
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Mainnet</span>
          </div>
          <button className="flex items-center justify-center size-10 rounded-full bg-surface-dark border border-slate-700/50 text-white hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
        </div>
      </div>

      {/* Total Assets Section */}
      <div className="px-5 pt-4 pb-8">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-2">Tổng tài sản</h3>
          <div className="flex items-baseline gap-1">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">$12,450.00</h1>
          </div>
          <div className="flex items-center gap-1 mt-3 px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
            <span className="material-symbols-outlined text-[14px] font-bold">trending_up</span>
            <span>+2.4% (24h)</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 pb-8">
        <div className="flex justify-between items-start px-2">
          {[
            { label: 'Swap', icon: 'swap_horiz', active: true },
            { label: 'Nạp', icon: 'add' },
            { label: 'Gửi', icon: 'arrow_outward' },
            { label: 'Thêm', icon: 'grid_view' }
          ].map((act, i) => (
            <button key={i} className="group flex flex-col items-center gap-3 w-16">
              <div className={`size-14 rounded-2xl flex items-center justify-center shadow-lg group-active:scale-90 transition-all ${act.active ? 'bg-primary text-background-dark shadow-primary/20' : 'bg-surface-dark border border-slate-700/50 text-white'}`}>
                <span className="material-symbols-outlined text-[28px] font-bold">{act.icon}</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">{act.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Asset Cards */}
      <div className="px-5 pb-8">
        <div className="grid grid-cols-2 gap-4">
          {/* GOFAM Token Card */}
          <div className="relative overflow-hidden rounded-[2rem] bg-surface-dark p-5 border border-slate-700/50 group active:scale-[0.98] transition-all">
            <div className="absolute -right-6 -top-6 size-24 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors"></div>
            <div className="flex flex-col gap-4 relative z-10">
              <div className="size-11 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-glow">
                <span className="material-symbols-outlined material-symbols-filled !text-2xl">token</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GOFAM Token</p>
                <p className="text-xl font-black mt-0.5 tracking-tight">1,200</p>
                <p className="text-[10px] text-slate-500 font-bold mt-1">≈ $840.00</p>
              </div>
            </div>
          </div>
          {/* Gold Coins Card */}
          <div className="relative overflow-hidden rounded-[2rem] bg-surface-dark p-5 border border-slate-700/50 group active:scale-[0.98] transition-all">
            <div className="absolute -right-6 -top-6 size-24 rounded-full bg-yellow-500/10 blur-2xl group-hover:bg-yellow-500/20 transition-colors"></div>
            <div className="flex flex-col gap-4 relative z-10">
              <div className="size-11 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-yellow-500 border border-yellow-500/20">
                <span className="material-symbols-outlined material-symbols-filled !text-2xl">monetization_on</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gold Coins</p>
                <p className="text-xl font-black mt-0.5 tracking-tight">50,000</p>
                <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest">In-game currency</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Chart Section */}
      <div className="px-5 pb-8">
        <div className="rounded-[2.5rem] bg-surface-dark border border-slate-700/50 p-6 shadow-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black uppercase tracking-tight">Tăng trưởng Farm</h3>
            <div className="flex items-center gap-1.5 text-primary text-[10px] font-black bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20 uppercase tracking-widest">
              <span className="material-symbols-outlined text-[16px] font-bold">arrow_upward</span>
              12%
            </div>
          </div>

          {/* Chart Visualization */}
          <div className="w-full h-44 mb-8 relative">
            <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-slate-600/40 pointer-events-none">
              <div className="border-b border-dashed border-slate-700/50 w-full h-0"></div>
              <div className="border-b border-dashed border-slate-700/50 w-full h-0"></div>
              <div className="border-b border-dashed border-slate-700/50 w-full h-0"></div>
              <div className="border-b border-dashed border-slate-700/50 w-full h-0"></div>
            </div>
            <svg className="w-full h-full absolute inset-0 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#36e278" stopOpacity="0.3"></stop>
                  <stop offset="100%" stopColor="#36e278" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path d="M0,35 Q10,32 20,25 T40,20 T60,28 T80,10 T100,5 V40 H0 Z" fill="url(#chartGradient)"></path>
              <path d="M0,35 Q10,32 20,25 T40,20 T60,28 T80,10 T100,5" fill="none" stroke="#36e278" strokeLinecap="round" strokeWidth="3" vectorEffect="non-scaling-stroke" className="drop-shadow-glow"></path>
              <circle cx="80" cy="10" fill="#112117" r="4" stroke="#36e278" strokeWidth="3" className="animate-pulse"></circle>
            </svg>
            {/* Tooltip mockup */}
            <div className="absolute top-[0%] left-[75%] -translate-x-1/2 bg-slate-900/90 border border-white/10 text-white text-[9px] font-black py-1.5 px-3 rounded-xl font-mono shadow-2xl backdrop-blur-md animate-bounce">
              $12,100
            </div>
          </div>

          {/* Time Filters */}
          <div className="flex gap-2.5">
            {['24H', '7D', '30D', 'All'].map((t, idx) => (
              <button key={t} className={`flex-1 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${idx === 0 ? 'bg-primary text-background-dark shadow-glow' : 'bg-slate-800/50 text-slate-400 hover:text-white'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Stats Grid */}
      <div className="px-5 pb-12 space-y-4">
        <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.25em] pl-1">Hoạt động tài chính</h4>
        <div className="grid grid-cols-1 gap-3">
          {[
            { label: 'Thu nhập hôm nay', val: '+ $45.20', icon: 'payments', color: 'text-blue-400', bg: 'bg-blue-400/10' },
            { label: 'Token đã khai thác', val: '120 GOFAM', icon: 'diamond', color: 'text-yellow-400', bg: 'bg-yellow-400/10' }
          ].map((stat, i) => (
            <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-surface-dark border border-slate-700/50 active:scale-[0.99] transition-all group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={`size-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} border border-current/10`}>
                  <span className="material-symbols-outlined !text-2xl">{stat.icon}</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">{stat.label}</p>
                  <p className="text-base font-black text-white">{stat.val}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-600 group-hover:text-primary group-hover:translate-x-1 transition-all">chevron_right</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-[60] bg-surface-dark/95 backdrop-blur-xl border-t border-slate-800 px-6 h-20 pb-6 flex justify-between items-center transition-colors">
        <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center gap-1.5 text-slate-400 group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">dashboard</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Home</span>
        </button>
        <button onClick={() => onNavigate('virtual-farm')} className="flex flex-col items-center gap-1.5 text-slate-400 group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">potted_plant</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Farm</span>
        </button>
        <div className="relative -top-6">
          <button onClick={() => onNavigate('scan')} className="size-15 rounded-full bg-primary flex items-center justify-center text-background-dark shadow-xl shadow-primary/40 active:scale-90 transition-transform ring-[6px] ring-background-dark">
            <span className="material-symbols-outlined text-3xl font-black">qr_code_scanner</span>
          </button>
        </div>
        <button className="flex flex-col items-center gap-1.5 text-primary scale-110">
          <span className="material-symbols-outlined material-symbols-filled !text-[28px]">account_balance_wallet</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Wallet</span>
        </button>
        <button onClick={() => onNavigate('marketplace')} className="flex flex-col items-center gap-1.5 text-slate-400 group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">storefront</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Market</span>
        </button>
      </nav>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(54, 226, 120, 0.4); }
        .drop-shadow-glow { filter: drop-shadow(0 0 8px rgba(54, 226, 120, 0.5)); }
        .size-15 { width: 3.75rem; height: 3.75rem; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Wallet;
