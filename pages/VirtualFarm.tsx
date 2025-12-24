
import React, { useState } from 'react';
import { Page } from '../types';

interface Props { onBack: () => void; onNavigate: (page: Page) => void; }

const VirtualFarm: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [zoom, setZoom] = useState(1);

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.min(Math.max(0.8, prev + delta), 1.5));
  };

  return (
    <div className="relative w-full h-screen flex flex-col bg-[#111714] font-display overflow-hidden select-none transition-colors duration-500">
      {/* 3D MAP VIEWPORT LAYER (Background) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Isometric Background Image */}
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out" 
          style={{ 
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_HVRCwMxXhfEqXztHC7ghbfb19mIa8LbSIklLyedjf1w3a5U_FItC0UPPBv_69cEvfgAh8ydaZkZQio-NQSIpSnPg4ql3K4kN5-q6kpsaFfCk0ZRN6LyBPG9SGuYn14N_eshRnUa1r2d-fh4kIy85atVfiw54zxZKI9AupKDep3XEJnXZtHGwnHlAUyHpdA4b3XlyTp8I1Ffc6wtTD7O3hOpfIsKXphCMq3Gum0SXfzpGG0IaKIwr601CR9FnlbJEPEhnzoXyxTeZ")',
            transform: `scale(${zoom + 0.05})`
          }}
        ></div>
        
        {/* Dark Overlays for UI contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none"></div>

        {/* WORLD SPACE UI (Floating Elements) */}
        {/* 1. Harvest Indicator */}
        <div 
          onClick={() => onNavigate('harvest')}
          className="absolute top-[35%] left-[20%] z-20 flex flex-col items-center animate-float cursor-pointer group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary blur-md opacity-40 rounded-full animate-pulse"></div>
            <div className="relative bg-primary text-background-dark size-14 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/30 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl font-black">agriculture</span>
            </div>
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-background-dark shadow-lg">
              3
            </div>
          </div>
          <div className="mt-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 shadow-xl">
            <p className="text-[10px] font-black text-primary tracking-[0.2em] uppercase">Sẵn sàng</p>
          </div>
        </div>

        {/* 2. Reward Token */}
        <div className="absolute top-[45%] right-[25%] z-20 flex flex-col items-center animate-float-delayed cursor-pointer group">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400 blur-md opacity-30 rounded-full animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-900 size-12 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/30 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl font-black material-symbols-filled">monetization_on</span>
            </div>
          </div>
          <div className="mt-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 shadow-xl">
            <p className="text-[10px] font-black text-yellow-400 tracking-widest uppercase">+500 Gold</p>
          </div>
        </div>

        {/* 3. Drone Entity (Moving AI) */}
        <div className="absolute top-[22%] left-[55%] -translate-x-1/2 z-10 flex flex-col items-center">
          <div 
            className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-40 bg-gradient-to-b from-primary/30 to-transparent pointer-events-none opacity-40"
            style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)' }}
          ></div>
          <div className="relative text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] animate-pulse">
            <span className="material-symbols-outlined text-7xl">smart_toy</span>
          </div>
          <div className="mt-[-10px] bg-cyan-950/80 backdrop-blur-md border border-cyan-500/30 px-3 py-1 rounded-full flex items-center gap-2 shadow-lg">
            <div className="size-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
            <span className="text-[9px] font-black text-cyan-100 tracking-widest uppercase">AI SCANNING...</span>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
          <button onClick={() => handleZoom(0.1)} className="flex size-11 items-center justify-center rounded-2xl bg-surface-dark/70 backdrop-blur-md border border-white/10 shadow-xl active:scale-90 transition-all text-white">
            <span className="material-symbols-outlined font-black">add</span>
          </button>
          <button onClick={() => handleZoom(-0.1)} className="flex size-11 items-center justify-center rounded-2xl bg-surface-dark/70 backdrop-blur-md border border-white/10 shadow-xl active:scale-90 transition-all text-white">
            <span className="material-symbols-outlined font-black">remove</span>
          </button>
          <div className="h-4"></div>
          <button onClick={() => setZoom(1)} className="flex size-11 items-center justify-center rounded-2xl bg-primary shadow-glow active:scale-90 transition-all text-black">
            <span className="material-symbols-outlined font-black">my_location</span>
          </button>
        </div>
      </div>

      {/* HUD LAYER (Foreground UI) */}
      <div className="relative z-40 flex flex-col h-full pointer-events-none">
        {/* TOP HUD SECTION */}
        <div className="pointer-events-auto bg-gradient-to-b from-black/80 via-black/40 to-transparent pb-10">
          <div className="flex items-center p-4 justify-between">
            {/* Profile Bar */}
            <div className="flex items-center gap-3 bg-surface-dark/60 backdrop-blur-xl p-1.5 pr-5 rounded-full border border-white/10 shadow-2xl">
              <div onClick={onBack} className="relative size-10 shrink-0 cursor-pointer active:scale-95 transition-transform">
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-full h-full border-2 border-primary shadow-glow" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDD__xQhMeTgTLa4NN-XioejNG1BKiLh0X2HIBOWoRiEJ1PZC4IR32ku27gD11pS4iYvIiy4U1190tLMVkStE5UlGMzaU-MjZYsqgLLsI1MEezCRq8tlsvXuN2bWJebgmYsw3mq4tO7RPc3TIw_2v3J8TZbrEbur9rUijYOaHJ-HpKtCJoARMw6jVhbbLGHewEgsqWbz33tchOJwWC-2sOi-vTmRUlga9fxttCEUroQwzWXLbZqroRBG6O4SgjYNMll2-3GE2h3H-T3")' }}
                ></div>
                <div className="absolute -bottom-1 -right-1 bg-primary text-black text-[9px] font-black px-2 rounded-full border border-background-dark shadow-lg">
                  25
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-white text-xs font-black uppercase tracking-widest leading-none">Farmer Alex</h2>
                <div className="w-20 h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden border border-white/5">
                  <div className="h-full bg-primary rounded-full shadow-glow" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <button onClick={() => onNavigate('settings')} className="size-11 flex items-center justify-center rounded-full bg-surface-dark/60 backdrop-blur-xl text-white border border-white/10 shadow-2xl hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined !text-2xl">settings</span>
            </button>
          </div>

          {/* Currency HUD */}
          <div className="flex gap-3 px-4 py-1 overflow-x-auto no-scrollbar">
            <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-surface-dark/60 backdrop-blur-xl pl-2.5 pr-5 border border-white/10 shadow-lg">
              <span className="material-symbols-outlined text-yellow-400 !text-[22px] material-symbols-filled">monetization_on</span>
              <p className="text-white text-sm font-black tracking-tight">25,000</p>
            </div>
            <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-surface-dark/60 backdrop-blur-xl pl-2.5 pr-5 border border-white/10 shadow-lg">
              <span className="material-symbols-outlined text-primary !text-[22px]">token</span>
              <p className="text-white text-sm font-black tracking-tight">450 GO</p>
            </div>
            <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-blue-500/20 backdrop-blur-xl pl-3 pr-5 border border-blue-500/30">
              <span className="material-symbols-outlined text-blue-400 !text-[20px] animate-pulse">wifi</span>
              <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest">Connected</p>
            </div>
          </div>
        </div>

        <div className="flex-1"></div>

        {/* BOTTOM ACTION HUD */}
        <div className="pointer-events-auto bg-gradient-to-t from-black via-black/80 to-transparent pt-16 pb-8 px-5">
          {/* Side FABs */}
          <div className="flex justify-between items-end mb-6">
            <button 
              onClick={() => onNavigate('missions')}
              className="flex size-14 items-center justify-center rounded-[1.5rem] bg-surface-dark/80 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-primary/20 hover:border-primary/40 transition-all active:scale-90"
            >
              <div className="relative">
                <span className="material-symbols-outlined text-white !text-3xl">assignment</span>
                <span className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full border-2 border-surface-dark shadow-glow"></span>
              </div>
            </button>
            <button 
              onClick={() => onNavigate('inventory')}
              className="flex size-16 items-center justify-center rounded-[1.75rem] bg-white text-black shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined !text-[36px] font-black">inventory_2</span>
            </button>
          </div>

          {/* Main Action Grid */}
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => onNavigate('harvest')}
              className="relative group overflow-hidden flex flex-col items-center justify-center h-20 rounded-3xl bg-primary text-black shadow-[0_6px_0_#27ab58] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="material-symbols-outlined !text-3xl mb-1 font-black">agriculture</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Thu hoạch</span>
            </button>

            <button className="relative group overflow-hidden flex flex-col items-center justify-center h-20 rounded-3xl bg-yellow-400 text-yellow-950 shadow-[0_6px_0_#ca8a04] active:translate-y-[2px] active:shadow-none transition-all">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="material-symbols-outlined !text-3xl mb-1 font-black">redeem</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Nhận thưởng</span>
            </button>

            <button 
              onClick={() => onNavigate('blockchain-scan')}
              className="relative group overflow-hidden flex flex-col items-center justify-center h-20 rounded-3xl bg-surface-dark border border-primary/30 text-primary shadow-2xl active:scale-95 transition-all"
            >
              {/* Scan Line effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent h-full w-full animate-scan pointer-events-none"></div>
              <span className="material-symbols-outlined !text-3xl mb-1 group-hover:text-white transition-colors">qr_code_scanner</span>
              <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-white transition-colors">Quét Chain</span>
            </button>
          </div>

          {/* Home Indicator */}
          <div className="flex justify-center mt-6">
            <div className="h-1.5 w-32 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 3.5s ease-in-out 1s infinite; }
        .animate-scan { animation: scan 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default VirtualFarm;
