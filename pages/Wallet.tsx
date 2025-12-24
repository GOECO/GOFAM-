
import React from 'react';
import { Page } from '../types';

interface Props { 
  onBack: () => void; 
  onNavigate: (page: Page) => void;
}

interface Transaction {
  id: string;
  title: string;
  time: string;
  amount: string;
  unit: string;
  category: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

const TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    title: 'Thu hoạch Cà rốt',
    time: '10:30 AM • Hôm nay',
    amount: '+ 12.5',
    unit: 'GOFAM',
    category: 'Tài sản',
    icon: 'agriculture',
    iconBg: 'bg-green-500/20',
    iconColor: 'text-green-400'
  },
  {
    id: 't2',
    title: 'Nhiệm vụ hàng ngày',
    time: '08:15 AM • Hôm nay',
    amount: '+ 500',
    unit: 'Xu',
    category: 'Thưởng',
    icon: 'assignment_turned_in',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400'
  },
  {
    id: 't3',
    title: 'Lãi Staking',
    time: '11:00 PM • Hôm qua',
    amount: '+ 2.1',
    unit: 'GOFAM',
    category: 'Đầu tư',
    icon: 'savings',
    iconBg: 'bg-yellow-500/20',
    iconColor: 'text-yellow-400'
  },
  {
    id: 't4',
    title: 'Thu hoạch Lúa mì',
    time: '09:20 AM • Hôm qua',
    amount: '+ 8.4',
    unit: 'GOFAM',
    category: 'Tài sản',
    icon: 'agriculture',
    iconBg: 'bg-green-500/20',
    iconColor: 'text-green-400'
  }
];

const Wallet: React.FC<Props> = ({ onBack, onNavigate }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark font-display text-white overflow-x-hidden pb-32 transition-colors duration-200">
      {/* Top App Bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-5 bg-background-dark/95 backdrop-blur-md">
        <button 
          onClick={onBack}
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-all active:scale-90"
        >
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-base font-black leading-tight tracking-[0.2em] text-center flex-1 uppercase">VÍ GOFAM TOKEN</h2>
        <button className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>

      <main className="flex-1 overflow-y-auto no-scrollbar">
        {/* Total Assets Card */}
        <div className="px-5 pt-2 pb-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-surface-dark p-8 border border-white/5 shadow-2xl group">
            <div className="absolute -right-10 -top-10 size-40 bg-primary/10 blur-[80px] group-hover:bg-primary/20 transition-all duration-700"></div>
            <div className="absolute -left-10 -bottom-10 size-40 bg-blue-500/10 blur-[80px]"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">TỔNG TÀI SẢN</span>
                <span className="material-symbols-outlined text-gray-500 !text-xl cursor-pointer hover:text-white">visibility</span>
              </div>
              
              <div className="flex flex-col gap-1">
                <h1 className="text-5xl font-black tracking-tighter">$1,240.50</h1>
                <p className="text-primary text-sm font-black tracking-tight uppercase">≈ 30,500,000 VND</p>
              </div>

              <div className="flex items-center gap-2.5 bg-black/40 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
                <div className="size-2 rounded-full bg-primary animate-pulse shadow-glow"></div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                  Mạng lưới ổn định • Block #1829402
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Token Stats Breakdown */}
        <div className="px-5 grid grid-cols-2 gap-4 pb-8">
          {/* GOFAM Token Card */}
          <div className="flex flex-col justify-between gap-4 rounded-[2rem] p-6 bg-surface-dark border border-white/5 active:scale-[0.98] transition-all">
            <div className="flex items-center justify-between">
              <div className="size-11 rounded-2xl bg-yellow-400/20 flex items-center justify-center text-yellow-400 border border-yellow-400/20">
                <span className="material-symbols-outlined material-symbols-filled !text-2xl">token</span>
              </div>
              <div className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-lg border border-primary/20">
                <span className="material-symbols-outlined !text-[12px] font-black text-primary">arrow_upward</span>
                <span className="text-[10px] font-black text-primary">12.5%</span>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">GOFAM TOKEN</p>
              <p className="text-xl font-black tracking-tight">5,420.00</p>
              <p className="text-[10px] text-gray-500 font-bold mt-1">≈ $542.00</p>
            </div>
          </div>

          {/* Xu Game Card */}
          <div className="flex flex-col justify-between gap-4 rounded-[2rem] p-6 bg-surface-dark border border-white/5 active:scale-[0.98] transition-all">
            <div className="flex items-center justify-between">
              <div className="size-11 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/20">
                <span className="material-symbols-outlined material-symbols-filled !text-2xl">monetization_on</span>
              </div>
              <div className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-lg border border-primary/20">
                <span className="material-symbols-outlined !text-[12px] font-black text-primary">arrow_upward</span>
                <span className="text-[10px] font-black text-primary">5.2%</span>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">XU GAME</p>
              <p className="text-xl font-black tracking-tight">125,000</p>
              <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-widest">≈ $625.00</p>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="px-5 pb-10">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Rút', icon: 'arrow_outward' },
              { label: 'Tái đầu tư', icon: 'sync' },
              { label: 'Stake', icon: 'layers', active: true }
            ].map((btn, i) => (
              <button 
                key={i}
                className={`group flex flex-col items-center justify-center gap-3 rounded-3xl p-5 active:scale-95 transition-all border ${btn.active ? 'bg-surface-dark border-primary/40 shadow-glow' : 'bg-surface-dark border-white/5 hover:border-white/20'}`}
              >
                <div className={`size-12 rounded-full flex items-center justify-center transition-colors ${btn.active ? 'bg-primary text-black' : 'bg-white/5 text-white group-hover:bg-white/10'}`}>
                  <span className="material-symbols-outlined font-black !text-2xl">{btn.icon}</span>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${btn.active ? 'text-primary' : 'text-gray-400 group-hover:text-white'}`}>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="px-5 pb-12 space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-black uppercase tracking-tight">Lịch sử nhận thưởng</h3>
            <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline decoration-primary/30 underline-offset-4">Xem tất cả</button>
          </div>

          <div className="flex flex-col gap-3">
            {TRANSACTIONS.map((tx) => (
              <div 
                key={tx.id}
                className="flex items-center justify-between p-5 rounded-[2rem] bg-surface-dark border border-white/5 active:scale-[0.99] transition-all hover:bg-surface-dark/80 group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`size-12 rounded-2xl ${tx.iconBg} flex items-center justify-center ${tx.iconColor} border border-current/10`}>
                    <span className="material-symbols-outlined !text-2xl font-bold">{tx.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-white uppercase tracking-tight truncate">{tx.title}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{tx.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-black uppercase ${tx.iconColor}`}>{tx.amount} {tx.unit}</p>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mt-1">{tx.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Floating Bottom Nav (Matching the specific 3-item UI) */}
      <div className="fixed bottom-8 left-0 right-0 px-8 z-50 pointer-events-none">
        <div className="max-w-[320px] mx-auto flex h-16 w-full items-center justify-around rounded-full bg-surface-dark/90 backdrop-blur-xl shadow-2xl border border-white/10 px-4 pointer-events-auto transition-all duration-300">
          <button onClick={() => onNavigate('dashboard')} className="flex items-center justify-center size-12 rounded-full text-gray-500 hover:text-white transition-colors active:scale-90">
            <span className="material-symbols-outlined !text-2xl">grid_view</span>
          </button>
          <div className="relative group">
            <button className="flex items-center justify-center size-12 rounded-full text-primary bg-primary/10 shadow-glow transition-all ring-1 ring-primary/20">
              <span className="material-symbols-outlined material-symbols-filled !text-2xl">account_balance_wallet</span>
            </button>
            <div className="absolute -top-1 -right-1 size-2 bg-primary rounded-full animate-pulse shadow-glow"></div>
          </div>
          <button onClick={() => onNavigate('marketplace')} className="flex items-center justify-center size-12 rounded-full text-gray-500 hover:text-white transition-colors active:scale-90">
            <span className="material-symbols-outlined !text-2xl">storefront</span>
          </button>
        </div>
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Wallet;
