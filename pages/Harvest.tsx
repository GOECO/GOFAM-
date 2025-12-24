
import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';

interface Props { 
  onBack: () => void; 
  onNavigate: (page: Page) => void; 
}

const HARVEST_ITEMS = [
  {
    id: 'h1',
    name: 'Cà Rốt Thần',
    rarity: 'Huyền Thoại',
    status: 'READY',
    type: 'NFT',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoAATUczTUjgIhtSXGGb7FiDemNPUng_NYg5K-dc8b_NHGZE0j2z7IhbeA4NLKodr3hadHEPrmcPXmxEFxl9JY5Z7tkpRLGPDr0gcXOAveWEOjGjnwZWkWgoHaGNUDqm6MtXOLVfPNzlx_ptaTrqlsiux-Cq250TI2SiM7SoP_dTo28w6J-rNhpxhvKDrjRjUW5ylqVpsahiRHTmiQm59Adk41bIBZlw6p-3Bawa8wq7Mj6cAfR6VUw_OEBxeNvpf948ieNX4KuD0a',
    isNFT: true
  },
  {
    id: 'h2',
    name: 'Bắp Cải Xanh',
    rarity: 'Phổ biến',
    yield: 'Cao',
    reward: '+150 Xu',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQAkoV0uNfNw0Or257uaBuqF7XsYMYDwuukCmPh0SvYOmww0qcSc7-gPMLOxUYxUezU79we78qhGxbAb48dXqEkh7rjYKOLTcVz1j-Cwkud6QPNWzC4mtFS4DCA37NiXc2Rz8w6WYUozodJEBCEeat7kfU2BO9fKeOSPVPZT-UyZOylTLDs1XfSzJa3UxtJ3DKWFAN5uMOTgjBUcKA3zDz2ykXrugICz8O46lkkew3ryOLbKdhMMHMIM4aS-PuqYgOZTlFfNKTyIsp'
  },
  {
    id: 'h3',
    name: 'Gà Mái Vàng',
    rarity: 'Phổ biến',
    yield: '5 quả trứng',
    reward: '+50 Xu & +2 Token',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBide0aqBxVvxyZR8a4uJsSke9q83UrWDWka6MS_AXnU6VZemLsdk2VW7U8l_DClzondKtATKC3IIRArZp9uGQDsNtVevjQ4JQjnDBnfI1nZNQkp214A0fVWDy-1tGTmThS1O4H-eHRZJx8WbSMXlwoKjFOE8d9qqFh6JDVxGLdS4oHgKfvbSjeTReyUXd_0LqPvmFR69OO5ECpIvNwsHMylbtn4M8CExucT550fHRzM_dq9RtSbOCWPv_eHTpRd-FIP44bPojtQzs_'
  }
];

const Harvest: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [showReward, setShowReward] = useState(false);
  const [avatar, setAvatar] = useState(localStorage.getItem('gofam_avatar') || "https://lh3.googleusercontent.com/aida-public/AB6AXuC0ZeJSFs0AXov5V2oozOkmo5-AU-bncDHvUfjF17s008wGK-CI2qbC--Q3LCGnW2TgGax3qL43xek2gypMTS3_ot6LoVLs0aJoD9z35F0TFpow3433Nmyep_C-x948z0x7uJ5Huhb10UdWWK-j_jSU9fIi5vKA55SgDEoRx-DxY0IiQ7XUl97drcosESiQ838aCMi0nD-pkW522bUcCfkDQjFfL1AVu1wdtncDcAwNvKeFY0Wlpg866MZd_xgWBbcNm4MRjrGb2jne");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleHarvestAll = () => {
    setShowReward(true);
    setTimeout(() => setShowReward(false), 2000);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setAvatar(base64);
        localStorage.setItem('gofam_avatar', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative flex flex-col h-screen max-w-md mx-auto bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-white antialiased overflow-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500 blur-[120px]"></div>
      </div>

      {/* Top App Bar */}
      <header className="relative z-50 flex flex-col shrink-0 bg-gradient-to-b from-background-dark to-transparent pt-4 pb-6 px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="size-10 rounded-full hover:bg-white/10 flex items-center justify-center mr-1">
              <span className="material-symbols-outlined text-white font-bold">arrow_back</span>
            </button>
            <div className="relative">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="size-10 rounded-2xl bg-cover bg-center shadow-glow group relative cursor-pointer active:scale-95 transition-all overflow-hidden border-2 border-primary/50" 
                style={{backgroundImage: `url("${avatar}")`}}
              >
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-xs">edit</span>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleAvatarUpload} 
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-primary text-black text-[8px] font-black px-1 py-0.5 rounded-full border border-background-dark z-10">LV.12</div>
            </div>
            <div className="flex flex-col ml-1">
              <h2 className="text-white text-sm font-black leading-tight uppercase tracking-tight">Nông Trại GOFAM</h2>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] text-primary">location_on</span>
                <span className="text-gray-400 text-[9px] font-black uppercase tracking-widest">Khu A - Ô 24</span>
              </div>
            </div>
          </div>
          <button className="flex items-center justify-center size-10 rounded-xl bg-surface-dark/80 backdrop-blur border border-white/5 hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-white">settings</span>
          </button>
        </div>

        {/* Enhanced Wallet Stats */}
        <div className="flex gap-3">
          <div className="flex-1 flex items-center justify-between bg-surface-dark/90 backdrop-blur-xl rounded-2xl p-4 border border-white/5 relative overflow-hidden group shadow-xl">
            <div className="flex flex-col">
              <span className="text-gray-400 text-[9px] font-black uppercase tracking-[0.2em]">Xu Vàng</span>
              <span className="text-white text-xl font-black mt-1">1,250</span>
            </div>
            <div className="size-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 border border-yellow-500/30">
              <span className="material-symbols-outlined material-symbols-filled">monetization_on</span>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-between bg-surface-dark/90 backdrop-blur-xl rounded-2xl p-4 border border-white/5 relative overflow-hidden group shadow-xl">
            <div className="flex flex-col">
              <span className="text-gray-400 text-[9px] font-black uppercase tracking-[0.2em]">GO Token</span>
              <span className="text-white text-xl font-black mt-1">50.4</span>
            </div>
            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30 shadow-glow">
              <span className="material-symbols-outlined">token</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto px-4 pb-32 no-scrollbar scroll-smooth">
        <div className="text-center py-6 mb-2 animate-[fadeIn_0.5s_ease-out]">
          <h1 className="text-white text-2xl font-black leading-tight flex items-center justify-center gap-3 uppercase tracking-tight">
            <span className="material-symbols-outlined text-primary !text-3xl animate-[bounce_2s_infinite]">agriculture</span>
            Sẵn sàng thu hoạch
          </h1>
          <p className="text-gray-400 text-xs font-black uppercase tracking-widest mt-2">3 cây trồng và 1 vật nuôi đang đợi bạn!</p>
        </div>

        <div className="flex flex-col gap-4">
          {HARVEST_ITEMS.map((item, idx) => (
            <div 
              key={item.id} 
              className={`rounded-[2rem] p-4 bg-surface-dark/60 backdrop-blur border border-white/5 flex gap-4 items-center group transition-all duration-300 hover:bg-surface-dark/80 active:scale-[0.98] ${item.isNFT ? 'ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-surface-dark' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative size-24 shrink-0 rounded-[1.5rem] overflow-hidden bg-black/40 border border-white/10 group-hover:border-primary/30 transition-all">
                <img src={item.img} className="size-full object-cover transition-transform group-hover:scale-110 duration-700" alt={item.name} />
                {item.type === 'NFT' && (
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md rounded-lg px-2 py-1 flex items-center gap-1 border border-white/10">
                    <span className="material-symbols-outlined text-[12px] text-yellow-400 material-symbols-filled">star</span>
                    <span className="text-[9px] font-black text-white uppercase tracking-widest">NFT</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-white text-base font-black uppercase tracking-tight truncate">{item.name}</h3>
                  {item.status === 'READY' && (
                    <span className="text-[8px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/30 uppercase tracking-[0.2em] animate-pulse">READY</span>
                  )}
                </div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none">
                  {item.rarity} {item.yield ? `• ${item.yield}` : ''}
                </p>
                {item.reward && (
                  <div className="mt-3 flex gap-2">
                    <span className="bg-yellow-400/10 text-yellow-400 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border border-yellow-400/20">{item.reward.split('&')[0]}</span>
                    {item.reward.includes('&') && (
                      <span className="bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border border-primary/20">{item.reward.split('&')[1]}</span>
                    )}
                  </div>
                )}
              </div>

              <button className="size-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all active:scale-90 shadow-lg">
                <span className="material-symbols-outlined font-black">{item.id === 'h3' ? 'egg' : 'sick'}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Floating Reward Animation Mockup */}
        {showReward && (
          <>
            <div className="absolute top-[30%] right-[10%] pointer-events-none z-50 animate-floatUp flex flex-col items-center">
              <span className="text-yellow-400 font-black text-xl drop-shadow-glow uppercase tracking-widest">+200 Xu</span>
            </div>
            <div className="absolute top-[45%] left-[20%] pointer-events-none z-50 animate-floatUp flex flex-col items-center" style={{ animationDelay: '0.4s' }}>
              <span className="text-primary font-black text-xl drop-shadow-glow uppercase tracking-widest">+1 Token</span>
            </div>
          </>
        )}
      </main>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-dark via-background-dark/95 to-transparent z-50">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <button 
            onClick={handleHarvestAll}
            className="flex-1 group relative overflow-hidden rounded-[2rem] h-16 bg-primary text-black shadow-glow shadow-primary/40 active:scale-95 transition-all"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
            <div className="relative flex items-center justify-center gap-4 h-full px-6">
              <span className="material-symbols-outlined text-[32px] font-black animate-[bounce_2s_infinite]">agriculture</span>
              <div className="flex flex-col items-start leading-tight">
                <span className="text-sm font-black uppercase tracking-widest">Thu Hoạch Tất Cả</span>
                <span className="text-[9px] font-bold opacity-70 uppercase tracking-widest">Nhận +350 Xu & 3 Token</span>
              </div>
            </div>
          </button>
          <button 
            onClick={() => onNavigate('inventory')}
            className="flex-shrink-0 size-16 rounded-[1.5rem] bg-surface-dark/90 backdrop-blur border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-90 transition-all shadow-xl"
          >
            <span className="material-symbols-outlined !text-[32px]">inventory_2</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          10% { transform: translateY(-10px) scale(1.1); opacity: 1; }
          100% { transform: translateY(-100px) scale(1); opacity: 0; }
        }
        .animate-floatUp { animation: floatUp 1.5s ease-out forwards; }
        .drop-shadow-glow { filter: drop-shadow(0 0 10px rgba(54, 226, 120, 0.6)); }
        .shadow-glow { box-shadow: 0 0 20px rgba(54, 226, 120, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Harvest;
