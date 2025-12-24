
import React, { useState } from 'react';

interface Props { onBack: () => void; }

interface Mission {
  id: string;
  title: string;
  rewardType: 'tokens' | 'gold' | 'nft';
  rewardVal: string;
  status: 'active' | 'completed' | 'pending' | 'locked';
  icon: string;
  iconBg: string;
  progress?: { current: number; total: number };
  aiCheck?: boolean;
}

const MISSIONS: Mission[] = [
  {
    id: 'm1',
    title: 'Tưới nước cho 5 cây',
    rewardType: 'tokens',
    rewardVal: '50 G-Tokens',
    status: 'active',
    icon: 'water_drop',
    iconBg: 'from-blue-600/20 to-blue-900/20',
  },
  {
    id: 'm2',
    title: 'Thu hoạch lúa mì',
    rewardType: 'gold',
    rewardVal: '100 Gold',
    status: 'completed',
    icon: 'agriculture',
    iconBg: 'from-yellow-600/20 to-yellow-900/20',
  },
  {
    id: 'm3',
    title: 'Mời 1 bạn mới',
    rewardType: 'nft',
    rewardVal: '1 NFT Box',
    status: 'active',
    icon: 'group_add',
    iconBg: 'from-purple-600/20 to-purple-900/20',
    aiCheck: true
  },
  {
    id: 'm4',
    title: 'Bán 10 vật phẩm',
    rewardType: 'tokens',
    rewardVal: '20 G-Tokens',
    status: 'pending',
    icon: 'storefront',
    iconBg: 'from-gray-600/20 to-gray-900/20',
    progress: { current: 0, total: 10 }
  }
];

const Missions: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('daily');

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'tokens': return 'monetization_on';
      case 'gold': return 'savings';
      case 'nft': return 'inventory_2';
      default: return 'redeem';
    }
  };

  const getRewardColor = (type: string) => {
    switch (type) {
      case 'tokens': return 'text-primary';
      case 'gold': return 'text-yellow-400';
      case 'nft': return 'text-pink-400';
      default: return 'text-primary';
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-dark font-display antialiased text-white overflow-hidden">
      {/* Background with blurry farm image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/85 to-background-dark/95 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2940&auto=format&fit=crop" 
          className="w-full h-full object-cover blur-sm opacity-50"
          alt="Farm background"
        />
      </div>

      {/* Top App Bar */}
      <header className="sticky top-0 z-50 flex items-center p-4 pt-6 pb-2 justify-between backdrop-blur-md bg-black/10 border-b border-white/5 shrink-0">
        <button onClick={onBack} className="text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-all active:scale-90">
          <span className="material-symbols-outlined text-[28px] font-bold">arrow_back</span>
        </button>
        <h2 className="text-white text-xl font-black leading-tight tracking-tight flex-1 text-center uppercase drop-shadow-lg">Nhiệm vụ</h2>
        <button onClick={onBack} className="flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-all active:scale-90">
          <span className="material-symbols-outlined text-[28px]">close</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-20 overflow-y-auto no-scrollbar p-5 pb-24">
        <div className="max-w-md mx-auto space-y-6">
          
          {/* Progress Section */}
          <div className="flex flex-col gap-4 bg-surface-dark/80 backdrop-blur-xl p-5 rounded-[2.5rem] border border-white/5 shadow-2xl animate-[fadeIn_0.5s_ease-out]">
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined !text-2xl font-black">calendar_today</span>
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight">Tiến độ ngày</h3>
              </div>
              <div className="bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
                <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">3/5 Complete</p>
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="relative pt-4 px-1">
              <div className="flex mb-3 items-center justify-end">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">60%</span>
              </div>
              <div className="overflow-hidden h-3 flex rounded-full bg-black/40 border border-white/5 shadow-inner">
                <div className="shadow-glow flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-primary-dark to-primary transition-all duration-1000 ease-out" style={{ width: '60%' }}></div>
              </div>
              {/* Chest Icon at the end */}
              <div className="absolute right-0 top-[28px] translate-x-1/3 bg-surface-dark rounded-2xl p-1.5 border-2 border-primary shadow-[0_0_20px_rgba(19,236,73,0.4)] animate-bounce active:scale-110 transition-transform cursor-pointer">
                <span className="material-symbols-outlined text-primary text-2xl font-black">redeem</span>
              </div>
            </div>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-normal px-1 mt-1">Hoàn thành tất cả để nhận Hộp Quà Bí Ẩn!</p>
          </div>

          {/* Segmented Controls (Tabs) */}
          <div className="flex h-12 w-full items-center justify-center rounded-2xl bg-black/40 p-1 border border-white/10 backdrop-blur-md">
            <button 
              onClick={() => setActiveTab('daily')}
              className={`flex h-full flex-1 items-center justify-center rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'daily' ? 'bg-primary text-black shadow-glow' : 'text-gray-400 hover:text-white'}`}
            >
              Hàng ngày
            </button>
            <button 
              onClick={() => setActiveTab('weekly')}
              className={`flex h-full flex-1 items-center justify-center rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'weekly' ? 'bg-primary text-black shadow-glow' : 'text-gray-400 hover:text-white'}`}
            >
              Hàng tuần
            </button>
          </div>

          {/* Mission List */}
          <div className="flex flex-col gap-4">
            {MISSIONS.map((m, idx) => (
              <div 
                key={m.id}
                className={`group flex items-center gap-4 bg-surface-dark/90 backdrop-blur-xl px-4 py-4 rounded-[2rem] border transition-all duration-300 animate-[slideUp_0.5s_ease-out] active:scale-[0.98] ${m.status === 'completed' ? 'border-primary/50 ring-2 ring-primary/5 shadow-glow' : 'border-white/5 shadow-lg'}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative shrink-0">
                  <div className={`absolute inset-0 rounded-2xl blur-md opacity-20 bg-gradient-to-br ${m.iconBg}`}></div>
                  <div className={`flex items-center justify-center rounded-2xl bg-gradient-to-br shrink-0 size-14 border border-white/10 relative z-10 ${m.iconBg}`}>
                    <span className="material-symbols-outlined !text-[32px]">{m.icon}</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 justify-center gap-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-black leading-tight uppercase tracking-tight truncate ${m.status === 'completed' ? 'text-primary' : 'text-white'}`}>
                      {m.title}
                    </p>
                    {m.aiCheck && (
                      <div className="bg-purple-500/20 px-2 py-0.5 rounded-md text-[8px] font-black text-purple-300 border border-purple-500/30 flex items-center gap-1 shrink-0">
                        <span className="material-symbols-outlined !text-[10px]">smart_toy</span> AI Check
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`material-symbols-outlined !text-[16px] ${getRewardColor(m.rewardType)}`}>{getRewardIcon(m.rewardType)}</span>
                    <p className={`${getRewardColor(m.rewardType)} text-[10px] font-black uppercase tracking-widest`}>
                      {m.rewardVal}
                    </p>
                  </div>
                  {m.progress && (
                     <div className="mt-1 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-gray-500 w-0"></div>
                        </div>
                        <span className="text-[8px] font-black text-gray-500 uppercase">{m.progress.current}/{m.progress.total}</span>
                     </div>
                  )}
                </div>

                <div className="shrink-0">
                  {m.status === 'completed' ? (
                    <button className="relative overflow-hidden flex min-w-[84px] items-center justify-center rounded-xl h-10 px-4 bg-primary text-black text-xs font-black uppercase tracking-widest shadow-glow active:scale-95 transition-all">
                      <span className="relative z-10">Nhận</span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                  ) : (
                    <button className={`flex min-w-[84px] items-center justify-center rounded-xl h-10 px-4 transition-all text-xs font-black uppercase tracking-widest border border-white/5 ${m.status === 'pending' ? 'bg-black/20 text-gray-500 opacity-50' : 'bg-white/5 hover:bg-white/10 text-white active:scale-95'}`}>
                      {m.status === 'pending' ? 'Locked' : 'Đi tới'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style>{`
        .shadow-glow { box-shadow: 0 0 20px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Missions;
