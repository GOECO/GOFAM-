
import React, { useState, useEffect } from 'react';

interface Props { onBack: () => void; }

const BlockchainScanner: React.FC<Props> = ({ onBack }) => {
  const [isScanning, setIsScanning] = useState(true);
  const [showResult, setShowResult] = useState(false);

  // Auto-trigger result for demo purposes after 3 seconds
  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        setIsScanning(false);
        setShowResult(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isScanning]);

  const handleReset = () => {
    setShowResult(false);
    setIsScanning(true);
  };

  return (
    <div className="relative h-screen w-full flex flex-col bg-background-dark font-display text-white overflow-hidden selection:bg-primary selection:text-black">
      {/* Background Camera Simulation */}
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover opacity-40 grayscale-[20%]" 
          alt="Camera feed" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVTM9cX707exmm_79IN5ReOYindbjFue5r5Sfwnx6HlWv7Mvx_PMex1yCzrPQfmP5fvnnb0o2N5BijkkOgacBKm9rB9cMg2gH3JvuYGJF_O7QjOwos7nDbQo4J_kHshyVJb0IWuH_zIPw9SkGnJ7vKZ1HnhQvysyqXSs2WTKLMRWIgcwFYJiPdUdCnm354u1Ldss3ZyjcONIgukOd2PALtp54HtdVeTBYSZSnCdB6gxmGAjJQ02ImL8F1yh4J1Qn7B4b-VtZHd_Hwg" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/90 via-background-dark/20 to-background-dark/90"></div>
      </div>

      {/* Top App Bar */}
      <header className="relative z-50 flex items-center p-4 pt-12 pb-2 justify-between">
        <button 
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all active:scale-90"
        >
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-white text-xl font-black leading-tight tracking-tight drop-shadow-lg uppercase tracking-widest">
          Quét Blockchain
        </h2>
        <button className="flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      {/* Main Scanner Visual Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-start pt-12 pointer-events-none">
        {/* Scanner Frame */}
        <div className={`relative w-72 h-72 border border-white/20 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(19,236,73,0.1)] bg-white/5 backdrop-blur-[2px] transition-transform duration-500 ${isScanning ? 'scale-100' : 'scale-90 opacity-40'}`}>
          {/* Corner Markers */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-3xl shadow-glow"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-3xl shadow-glow"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-3xl shadow-glow"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-3xl shadow-glow"></div>
          
          {/* Scanning Animation Line */}
          {isScanning && (
            <div className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent scanner-line shadow-[0_0_20px_#13ec49] z-20"></div>
          )}

          {/* Center Focus Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="material-symbols-outlined text-7xl text-white">qr_code_scanner</span>
          </div>
        </div>

        {/* Helper Text */}
        <div className="mt-10 px-8 text-center animate-pulse">
          <p className="text-white/90 text-xs font-black uppercase tracking-[0.2em] drop-shadow-md bg-black/40 inline-block px-6 py-3 rounded-full backdrop-blur-md border border-white/10">
            Di chuyển camera đến mã QR
          </p>
        </div>
      </main>

      {/* Result Card (Bottom Sheet) */}
      <div className={`relative z-20 w-full px-4 pb-8 pt-4 transition-all duration-700 transform ${showResult ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="bg-surface-dark/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-1 shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="p-6 pb-8">
            {/* Status Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 shadow-glow">
                  <span className="material-symbols-outlined text-primary text-3xl material-symbols-filled">verified</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white font-black text-lg leading-none mb-1.5 uppercase tracking-tight">Kết quả quét</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-primary text-[10px] font-black uppercase tracking-widest">Đã xác thực trên chuỗi</span>
                    <span className="text-primary">✔</span>
                  </div>
                </div>
              </div>
              <button className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all active:scale-90">
                <span className="material-symbols-outlined !text-2xl">open_in_new</span>
              </button>
            </div>

            {/* Blockchain Data List */}
            <div className="space-y-4 bg-black/30 rounded-3xl p-5 border border-white/5 mb-8">
              {/* Batch */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="material-symbols-outlined text-[20px] font-bold">inventory_2</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Mã lô (Batch)</span>
                </div>
                <span className="text-white font-black text-sm tracking-widest uppercase">#GF-2023-X99</span>
              </div>
              <div className="h-px bg-white/5 w-full"></div>
              
              {/* Hash */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="material-symbols-outlined text-[20px] font-bold">tag</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Hash giao dịch</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/20">
                  <span className="text-blue-400 font-mono text-[10px] font-black">0x71C...9A2F</span>
                  <span className="material-symbols-outlined text-[16px] text-blue-400 cursor-pointer active:scale-75 transition-transform">content_copy</span>
                </div>
              </div>
              <div className="h-px bg-white/5 w-full"></div>

              {/* Time */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="material-symbols-outlined text-[20px] font-bold">schedule</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Thời gian</span>
                </div>
                <span className="text-white text-xs font-black uppercase tracking-widest">14:30 - 20/10/2023</span>
              </div>
            </div>

            {/* Primary Actions */}
            <div className="grid grid-cols-5 gap-3">
              <button className="col-span-2 flex items-center justify-center h-16 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-black text-xs uppercase tracking-[0.2em] transition-all border border-white/5 active:scale-95">
                Chi tiết
              </button>
              <button 
                onClick={handleReset}
                className="col-span-3 flex items-center justify-center h-16 rounded-2xl bg-primary hover:bg-primary-dark text-black font-black text-sm uppercase tracking-[0.15em] shadow-glow transition-all active:scale-95"
              >
                <span className="material-symbols-outlined mr-3 font-black">qr_code_scanner</span>
                Quét tiếp
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 20px rgba(19, 236, 73, 0.4); }
        .scanner-line {
          animation: scan-blockchain 3s linear infinite;
        }
        @keyframes scan-blockchain {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default BlockchainScanner;
