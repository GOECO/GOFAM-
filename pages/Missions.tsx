
import React, { useState } from 'react';
import { Page } from '../types';

interface Props { onBack: () => void; onNavigate?: (page: Page) => void; }

interface Mission {
  id: string;
  title: string;
  description: string;
  reward: string;
  status: 'claimable' | 'progress' | 'new' | 'locked';
  icon: string;
  iconColor: string;
  bgIcon?: string;
  progress?: { current: number; total: number };
}

const DAILY_MISSIONS: Mission[] = [
  {
    id: 'm1',
    title: 'Thu hoạch lúa mì',
    description: 'Thu hoạch 5 ô đất đã chín trên nông trại của bạn.',
    reward: '+100 GFM',
    status: 'claimable',
    icon: 'grass',
    iconColor: 'text-primary',
    bgIcon: 'agriculture'
  },
  {
    id: 'm2',
    title: 'Mời bạn bè cùng chơi',
    description: 'Mời 5 người bạn mới tham gia vào hệ thống.',
    reward: '+500 GFM',
    status: 'progress',
    icon: 'group_add',
    iconColor: 'text-blue-400',
    progress: { current: 3, total: 5 }
  },
  {
    id: 'm3',
    title: 'Kết nối ví Metamask',
    description: 'Liên kết ví Web3 để mở khóa tính năng rút tiền.',
    reward: '+200 GFM',
    status: 'new',
    icon: 'account_balance_wallet',
    iconColor: 'text-white'
  },
  {
    id: 'm4',
    title: 'Nhiệm vụ đặc biệt',
    description: 'Hoàn thành các nhiệm vụ hàng ngày để mở khóa.',
    reward: '??? GFM',
    status: 'locked',
    icon: 'lock',
    iconColor: 'text-gray-500'
  }
];

const Missions: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('daily');

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark font-display text-white antialiased overflow-x-hidden pb-32">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/5 backdrop-blur-xl">
        <div className="flex items-center p-4 pb-2 justify-between">
          <button 
            onClick={onBack}
            className="text-white hover:text-primary transition-all flex size-10 shrink-0 items-center justify-center rounded-full active:scale-90 active:bg-white/5"
          >
            <span className="material-symbols-outlined font-bold">arrow_back</span>
          </button>
          <h2 className="text-white text-lg font-black leading-tight tracking-tight flex-1 text-center uppercase">Nhiệm vụ & Thu nhập</h2>
          <button className="flex items-center justify-end h-10 px-2 rounded-full hover:bg-white/5 transition-colors">
            <span className="text-text-sub-dark text-xs font-black uppercase tracking-widest">Lịch sử</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col no-scrollbar">
        {/* Stats Overview */}
        <section className="px-4 py-8 flex flex-col items-center justify-center text-center animate-fadeIn">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Tổng thu nhập ước tính</p>
          <div className="flex items-baseline gap-2">
            <h1 className="text-5xl font-black tracking-tighter drop-shadow-glow">1,240.50</h1>
            <span className="text-primary font-black text-2xl tracking-tight">GFM</span>
          </div>
          <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-full mt-4 border border-primary/20">
            <span className="material-symbols-outlined text-primary text-[14px] font-bold">trending_up</span>
            <span className="text-primary text-[10px] font-black uppercase tracking-widest">+12.5% tuần này</span>
          </div>
        </section>

        {/* Dashboard Grid */}
        <section className="px-5 grid grid-cols-3 gap-3 mb-8">
          {[
            { label: 'Khả dụng', val: '5', icon: 'assignment', color: 'text-primary', bg: 'bg-primary/10' },
            { label: 'Đã xong', val: '12', icon: 'check_circle', color: 'text-blue-400', bg: 'bg-blue-400/10' },
            { label: 'Thành tựu', val: '3', icon: 'trophy', color: 'text-yellow-400', bg: 'bg-yellow-400/10' }
          ].map((stat, i) => (
            <div key={i} className="bg-surface-dark border border-white/5 rounded-[2rem] p-4 flex flex-col items-center justify-center text-center shadow-lg active:scale-95 transition-transform group">
              <div className={`size-9 rounded-2xl ${stat.bg} flex items-center justify-center mb-3 ${stat.color} border border-current/10 group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined !text-xl font-bold">{stat.icon}</span>
              </div>
              <p className="text-white text-xl font-black leading-none mb-1.5">{stat.val}</p>
              <p className="text-gray-500 text-[8px] font-black uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Filter Tabs */}
        <section className="sticky top-[68px] z-40 bg-background-dark/95 backdrop-blur-md px-4 py-2 border-b border-white/5">
          <div className="flex h-11 w-full items-center rounded-2xl bg-surface-dark p-1 border border-white/5 shadow-inner">
            {[
              { id: 'daily', label: 'Hàng ngày' },
              { id: 'weekly', label: 'Hàng tuần' },
              { id: 'special', label: 'Đặc biệt' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex h-full flex-1 items-center justify-center rounded-xl transition-all duration-300 ${activeTab === tab.id ? 'bg-gray-700/50 text-white font-black shadow-lg ring-1 ring-white/10' : 'text-gray-500 font-bold hover:text-gray-300'}`}
              >
                <span className="text-[10px] uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Task List */}
        <section className="p-4 space-y-4">
          <div className="flex items-center justify-between px-1 mb-2">
            <h3 className="text-white font-black text-sm uppercase tracking-tight">Danh sách nhiệm vụ</h3>
            <span className="text-[9px] font-black text-primary uppercase tracking-widest animate-pulse">Làm mới sau 04:32:10</span>
          </div>

          <div className="flex flex-col gap-4">
            {DAILY_MISSIONS.map((m, idx) => (
              <div 
                key={m.id}
                className={`relative overflow-hidden rounded-[2.5rem] bg-surface-dark border transition-all duration-300 ${m.status === 'claimable' ? 'border-primary/40 shadow-glow' : m.status === 'locked' ? 'border-white/5 opacity-60 grayscale' : 'border-white/5 shadow-md'}`}
              >
                {m.bgIcon && (
                  <div className="absolute -top-4 -right-4 p-2 opacity-[0.03] pointer-events-none">
                    <span className="material-symbols-outlined !text-[100px] text-white">{m.bgIcon}</span>
                  </div>
                )}
                
                <div className="p-6 flex gap-5 relative z-10">
                  <div className="shrink-0">
                    <div className="size-14 rounded-[1.25rem] bg-white/5 flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-105 transition-transform">
                      <span className={`material-symbols-outlined !text-3xl ${m.iconColor}`}>{m.icon}</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white text-base font-black truncate tracking-tight uppercase leading-tight pr-2">{m.title}</h4>
                      <span className={`flex items-center text-[10px] font-black whitespace-nowrap px-2.5 py-1 rounded-lg border uppercase tracking-widest ${m.status === 'progress' ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                        {m.reward}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs font-medium leading-relaxed mb-4 line-clamp-2">{m.description}</p>

                    {m.status === 'progress' && m.progress && (
                      <div className="mb-4 space-y-2">
                        <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-gray-500">
                          <span>Tiến độ</span>
                          <span className="text-white">{m.progress.current}/{m.progress.total}</span>
                        </div>
                        <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
                          <div className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000" style={{ width: `${(m.progress.current/m.progress.total)*100}%` }}></div>
                        </div>
                      </div>
                    )}

                    {m.status === 'claimable' && (
                      <button className="w-full h-12 bg-primary hover:bg-primary-dark text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-glow active:scale-95 transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined !text-xl font-black">redeem</span>
                        Nhận thưởng
                      </button>
                    )}

                    {m.status === 'progress' && (
                      <button className="w-full h-12 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all flex items-center justify-center gap-2">
                        Tiếp tục
                        <span className="material-symbols-outlined !text-lg">arrow_forward</span>
                      </button>
                    )}

                    {m.status === 'new' && (
                      <button className="w-full h-12 bg-white text-black hover:bg-gray-100 rounded-2xl font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all shadow-xl">
                        Thực hiện ngay
                      </button>
                    )}

                    {m.status === 'locked' && (
                      <div className="w-full h-12 border border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                        <span className="material-symbols-outlined !text-lg">lock</span>
                        Chưa mở khóa
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Bottom Nav */}
      <nav className="fixed bottom-6 left-0 right-0 px-6 z-50 pointer-events-none">
        <div className="mx-auto flex h-20 w-full max-w-sm items-center justify-around rounded-[2.5rem] bg-background-dark/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 px-4 pointer-events-auto transition-all duration-300">
          <button onClick={() => onNavigate?.('dashboard')} className="flex flex-col items-center justify-center gap-1.5 w-14 group">
            <span className="material-symbols-outlined text-gray-500 group-hover:text-white transition-colors !text-2xl">yard</span>
            <span className="text-[8px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">Farm</span>
          </button>
          
          <button onClick={() => onNavigate?.('wallet')} className="flex flex-col items-center justify-center gap-1.5 w-14 group">
            <span className="material-symbols-outlined text-gray-500 group-hover:text-white transition-colors !text-2xl">account_balance_wallet</span>
            <span className="text-[8px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">Ví</span>
          </button>

          <div className="relative -top-10 group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all"></div>
            <button className="relative size-16 bg-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(19,236,73,0.4)] border-[6px] border-background-dark transform transition-transform hover:scale-110 active:scale-95">
              <span className="material-symbols-outlined text-black !text-[32px] font-black material-symbols-filled">assignment_turned_in</span>
            </button>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-black text-primary uppercase tracking-widest whitespace-nowrap">Nhiệm vụ</span>
          </div>

          <button className="flex flex-col items-center justify-center gap-1.5 w-14 group">
            <span className="material-symbols-outlined text-gray-500 group-hover:text-white transition-colors !text-2xl">leaderboard</span>
            <span className="text-[8px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">BXH</span>
          </button>

          <button onClick={() => onNavigate?.('settings')} className="flex flex-col items-center justify-center gap-1.5 w-14 group">
            <div className="size-6 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-primary transition-all">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvYSqMETHz-Bx3o5Hoy7yLKXMl-7UP_-WYedQCXG5xuy-NmGfyHm3bd1Ta3IMRKPc51oWyZuU7ILfC5cYSgutgm7yiVKKGQVXnS7tU-zMtmHBGk7yMqLaWD6k52tsprjmyST_kGQJmtf0jT8K3Oe6A0wPMyKcH0IKvMhz_BmJZU8PvldcwhYakJvc6P3pHnf8OwBNFRiYDiHSr-wnToLMect5CLSx21kiryWhw_fYRMGxnJNtlWM88C6FDGZKxmcry8Hc93sAcKQZU" 
                className="w-full h-full object-cover" 
                alt="Profile" 
              />
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">Tôi</span>
          </button>
        </div>
      </nav>

      <style>{`
        .glass-panel {
          background: rgba(11, 18, 15, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .drop-shadow-glow { filter: drop-shadow(0 0 10px rgba(19, 236, 73, 0.5)); }
        .shadow-glow { box-shadow: 0 0 20px rgba(19, 236, 73, 0.3); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slideUp { animation: slideUp 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Missions;
