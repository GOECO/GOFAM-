
import React, { useState } from 'react';
import { DiagnosisResult, Page } from '../types';

interface Props { 
  data: DiagnosisResult; 
  onBack: () => void; 
  onDone: () => void; 
  onFindNearby?: () => void;
  onNavigate?: (page: Page) => void;
  onDiagnose?: (data: DiagnosisResult) => void;
}

const Diagnosis: React.FC<Props> = ({ data, onBack, onDone, onNavigate }) => {
  if (!data) return null;

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-32 overflow-x-hidden transition-colors duration-200">
      {/* Background decoration elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="flex items-center bg-transparent p-4 pb-2 justify-between z-20 sticky top-0 backdrop-blur-md border-b border-white/5">
        <button 
          onClick={onBack}
          className="text-white flex size-12 shrink-0 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-white text-lg font-black leading-tight tracking-tight flex-1 text-center flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl material-symbols-filled">view_in_ar</span>
          AI CHẨN ĐOÁN
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      {/* 3D AR Scanner Area */}
      <main className="flex-1 flex flex-col no-scrollbar">
        <div className="px-4 py-2 w-full">
          <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-primary/30 shadow-[0_0_40px_rgba(19,236,73,0.15)] bg-surface-dark group">
            {/* Main Crop Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFtjkZ7crdWzXm-WjSRdnKkUVk2m309yFLPOeJuqOcHkmGCugy_KYGDKjJa6ejB4ARPz1ohCfxrLnTMI_9x63gr5StUoPPgAc9J1_uot5byTq-bP3vcWDxPWxUGysRkRj9_ozhrB5a91DGfnBsScqYv9C2mwW6oQmHqWVT4KXzRlZNrJIgPVwo1BZhocHaenPEn0AhRmSAL41-ZpFs_vpPsY9XPDrbnhETl4_fY9E6war51MXBuOnpm1PLGAwTbJXIMMC_aPfqP-9b')" }}
            ></div>
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent"></div>
            
            {/* Scanning Reticle UI */}
            <div className="absolute top-6 left-6 size-10 border-l-4 border-t-4 border-primary rounded-tl-xl shadow-glow"></div>
            <div className="absolute top-6 right-6 size-10 border-r-4 border-t-4 border-primary rounded-tr-xl shadow-glow"></div>
            <div className="absolute bottom-6 left-6 size-10 border-l-4 border-b-4 border-primary rounded-bl-xl shadow-glow"></div>
            <div className="absolute bottom-6 right-6 size-10 border-r-4 border-b-4 border-primary rounded-br-xl shadow-glow"></div>
            
            {/* Scanning Laser Line */}
            <div className="scan-line-v3"></div>
            
            {/* Hologram Points */}
            <div className="hologram-point top-[40%] left-[30%]"></div>
            <div className="hologram-point top-[55%] right-[35%]"></div>
            
            {/* Floating Info Tag */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-primary/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">AI SCANNING...</span>
            </div>
            
            {/* Plant Identity */}
            <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary/20 text-primary text-[9px] font-black px-2.5 py-1 rounded border border-primary/30 uppercase tracking-widest">NFT #4021</span>
                  <span className="bg-purple-500/20 text-purple-300 text-[9px] font-black px-2.5 py-1 rounded border border-purple-500/30 uppercase tracking-widest">RARE</span>
                </div>
                <h1 className="text-white text-3xl font-black leading-tight drop-shadow-lg uppercase tracking-tight">Dâu Tây Nhật</h1>
                <p className="text-slate-300 text-xs font-bold uppercase tracking-widest mt-1 opacity-80">Vụ mùa 3 • Giai đoạn ra hoa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Stats Grid */}
        <div className="grid grid-cols-2 gap-4 p-4">
          {/* Health Card */}
          <div className="flex flex-col gap-3 rounded-[2rem] p-5 bg-surface-dark border border-white/5 relative overflow-hidden group shadow-lg">
            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-5xl">health_and_safety</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-green-500/20 rounded-xl text-green-400 border border-green-500/20">
                <span className="material-symbols-outlined text-xl font-bold">ecg_heart</span>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Sức khỏe</p>
            </div>
            <div className="mt-1">
              <p className="text-white text-2xl font-black tracking-tight uppercase">Tốt</p>
              <p className="text-primary text-[10px] font-black mt-1 uppercase tracking-widest">+5% so với hôm qua</p>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-primary h-full rounded-full shadow-glow" style={{ width: '85%' }}></div>
            </div>
          </div>

          {/* Pest Card */}
          <div className="flex flex-col gap-3 rounded-[2rem] p-5 bg-surface-dark border border-white/5 relative overflow-hidden group shadow-lg">
            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-5xl">pest_control</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-orange-500/20 rounded-xl text-orange-400 border border-orange-500/20">
                <span className="material-symbols-outlined text-xl font-bold">bug_report</span>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Sâu bệnh</p>
            </div>
            <div className="mt-1">
              <p className="text-white text-2xl font-black tracking-tight uppercase">12%</p>
              <p className="text-orange-400 text-[10px] font-black mt-1 uppercase tracking-widest">Cần chú ý</p>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-orange-400 h-full rounded-full shadow-[0_0_10px_rgba(251,146,60,0.5)]" style={{ width: '12%' }}></div>
            </div>
          </div>
        </div>

        {/* Detailed Report Card */}
        <div className="px-4">
          <div className="flex flex-col gap-5 rounded-[2.5rem] p-6 bg-surface-dark border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <span className="material-symbols-outlined text-6xl text-primary">analytics</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="text-white text-lg font-black flex items-center gap-3 uppercase tracking-tight">
                <span className="material-symbols-outlined text-primary font-bold">analytics</span>
                Kết quả phân tích
              </h3>
              <span className="text-[9px] font-black text-slate-400 bg-white/5 px-3 py-1 rounded-full uppercase tracking-widest border border-white/5">Hôm nay, 10:42 AM</span>
            </div>

            <div className="flex gap-5 items-start">
              <div className="w-1.5 bg-gradient-to-b from-yellow-400 to-transparent h-16 rounded-full shrink-0 shadow-[0_0_10px_rgba(250,204,21,0.3)]"></div>
              <div className="flex flex-col gap-2">
                <p className="text-white font-black text-base uppercase tracking-tight">Phát hiện thiếu nước nhẹ</p>
                <p className="text-slate-400 text-xs font-bold leading-relaxed opacity-80 uppercase tracking-widest italic">
                  Độ ẩm đất giảm xuống dưới 45%. Lá bắt đầu có dấu hiệu héo nhẹ ở phần rìa. Hệ thống tưới cần can thiệp sớm.
                </p>
              </div>
            </div>

            {/* Moisture Bar */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest px-1">
                <span className="text-slate-400">Chỉ số độ ẩm đất</span>
                <span className="text-yellow-400 font-black animate-pulse">42% (THẤP)</span>
              </div>
              <div className="w-full bg-black/40 rounded-full h-2.5 overflow-hidden border border-white/5 shadow-inner">
                <div className="bg-yellow-400 h-full rounded-full relative transition-all duration-1000 shadow-[0_0_15px_rgba(250,204,21,0.4)]" style={{ width: '42%' }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white/30 rounded-full blur-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Action Buttons (Bottom Sticky) */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-dark via-background-dark/95 to-transparent z-40">
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <button 
            onClick={() => alert("Đang kích hoạt hệ thống tưới...")}
            className="flex items-center justify-center gap-3 bg-surface-dark hover:bg-white/10 border border-white/10 active:scale-95 transition-all text-white h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl"
          >
            <span className="material-symbols-outlined text-blue-400 !text-2xl">water_drop</span>
            Tưới Nước
          </button>
          <button 
            onClick={() => alert("Đã gửi yêu cầu phun thuốc BVTV")}
            className="flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-black active:scale-95 transition-all h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-glow"
          >
            <span className="material-symbols-outlined !text-2xl font-bold">sanitizer</span>
            Phun Thuốc
          </button>
        </div>
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.3); }
        
        .scan-line-v3 {
            width: 100%;
            height: 3px;
            background: #13ec49;
            box-shadow: 0 0 20px #13ec49;
            position: absolute;
            top: 0;
            left: 0;
            animation: scan-v3 4s infinite linear;
            z-index: 10;
        }

        @keyframes scan-v3 {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }

        .hologram-point {
            position: absolute;
            width: 14px;
            height: 14px;
            background-color: rgba(239, 68, 68, 0.8);
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 0 12px rgba(239, 68, 68, 0.8);
            animation: pulse-v3 1.5s infinite;
            z-index: 15;
        }

        @keyframes pulse-v3 {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.6); opacity: 0.6; }
            100% { transform: scale(1); opacity: 1; }
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Diagnosis;
