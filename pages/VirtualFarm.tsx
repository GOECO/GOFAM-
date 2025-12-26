
import React, { useState } from 'react';
import { Page } from '../types';

interface Props { onBack: () => void; onNavigate: (page: Page) => void; }

const VirtualFarm: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="relative w-full h-screen flex flex-col bg-[#111714] font-display overflow-hidden select-none transition-colors duration-500">
      {/* 3D MAP VIEWPORT */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out opacity-80" 
          style={{ 
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_HVRCwMxXhfEqXztHC7ghbfb19mIa8LbSIklLyedjf1w3a5U_FItC0UPPBv_69cEvfgAh8ydaZkZQio-NQSIpSnPg4ql3K4kN5-q6kpsaFfCk0ZRN6LyBPG9SGuYn14N_eshRnUa1r2d-fh4kIy85atVfiw54zxZKI9AupKDep3XEJnXZtHGwnHlAUyHpdA4b3XlyTp8I1Ffc6wtTD7O3hOpfIsKXphCMq3Gum0SXfzpGG0IaKIwr601CR9FnlbJEPEhnzoXyxTeZ")',
            transform: `scale(${zoom + 0.1})`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none"></div>

        {/* Game Entities */}
        <div className="absolute top-[40%] left-[25%] z-20 flex flex-col items-center animate-bounce-slow cursor-pointer active-scale" onClick={() => onNavigate('harvest')}>
          <div className="relative size-14 bg-primary rounded-2xl flex items-center justify-center shadow-glow border-2 border-white/30">
            <span className="material-symbols-outlined text-black font-black text-2xl">agriculture</span>
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black px-1.5 rounded-full border border-background-dark">3</div>
          </div>
        </div>
      </div>

      {/* HUD Foreground */}
      <div className="relative z-40 flex flex-col h-full pointer-events-none">
        <div className="pointer-events-auto bg-gradient-to-b from-black/80 to-transparent p-4 flex items-center justify-between">
            <button onClick={onBack} className="size-11 rounded-full bg-surface-dark/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white active-scale">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex gap-1.5">
               <div className="h-9 rounded-xl bg-surface-dark/80 backdrop-blur-xl px-3 flex items-center gap-2 border border-white/10">
                  <span className="material-symbols-outlined text-yellow-400 !text-xl material-symbols-filled">monetization_on</span>
                  <span className="text-white text-xs font-black">25,400</span>
               </div>
               <div className="h-9 rounded-xl bg-surface-dark/80 backdrop-blur-xl px-3 flex items-center gap-2 border border-white/10">
                  <span className="material-symbols-outlined text-primary !text-xl">token</span>
                  <span className="text-white text-xs font-black">450</span>
               </div>
            </div>
        </div>

        <div className="flex-1"></div>

        {/* Bottom HUD - Style II & 50% Spacing (Gap-1) */}
        <div className="pointer-events-auto bg-gradient-to-t from-black via-black/80 to-transparent p-5 pb-8">
          <div className="grid grid-cols-4 gap-1">
            {[
              { id: 'water', label: 'Tưới nước', icon: 'water_drop', color: 'text-blue-400', bg: 'bg-blue-500/10' },
              { id: 'feed', label: 'Cho ăn', icon: 'lunch_dining', color: 'text-orange-400', bg: 'bg-orange-500/10' },
              { id: 'ai', label: 'AI Quét', icon: 'smart_toy', color: 'text-primary', bg: 'bg-primary/10' },
              { id: 'bag', label: 'Kho đồ', icon: 'inventory_2', color: 'text-white', bg: 'bg-white/10' },
            ].map((act) => (
              <button key={act.id} className="flex flex-col items-center gap-1.5 py-3 group active-scale">
                <div className={`size-12 rounded-2xl ${act.bg} flex items-center justify-center border border-white/5 group-hover:scale-105 transition-all`}>
                  <span className={`material-symbols-outlined !text-[24px] ${act.color}`}>{act.icon}</span>
                </div>
                <span className="text-[11px] text-gray-300 font-normal leading-none tracking-tight">{act.label}</span>
              </button>
            ))}
          </div>

          <button onClick={() => onNavigate('harvest')} className="w-full h-16 mt-4 bg-primary text-black rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-glow active-scale transition-all flex items-center justify-center gap-3">
             <span className="material-symbols-outlined !text-3xl font-black">agriculture</span>
             Sẵn sàng Thu hoạch (3)
          </button>
        </div>
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .active-scale:active { transform: scale(0.96); }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-bounce-slow { animation: bounce-slow 2s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default VirtualFarm;
