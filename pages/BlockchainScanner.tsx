
import React, { useState } from 'react';

interface Props { onBack: () => void; }

const BlockchainScanner: React.FC<Props> = ({ onBack }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setShowResult(false);
    
    // Simulate holographic scan sequence
    setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-[#101922] font-display antialiased text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#101922]/80 z-10"></div>
        <div 
          className="w-full h-full bg-cover bg-center opacity-40 scale-110 blur-sm"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuALg00H-hB2ojSXx_DzNKltW2yfXrfz_3-i3opIsf3cK12Uf-SDO1OEmc6qH31nwi_KhptT_Ic_uB44vaWY8jKscNLV90k7Ij0Et79kUhayUtosaIYL0zjJSnxJVCkcG0ipeYZWvP6oY6IDdO0nmSZ1ls8zZ_Uqc4Cgn1Pnny1nAOf0jkv9jDW7m8_QyheaTIevCR6r_0vroV5uCBn3sY0nFd6LFJRHePHxfWvjbrU-EnZBgaFeF__d_3yAnv8EnYPOhxzyLgjDf-i_')" }}
        ></div>
      </div>

      {/* UI Content */}
      <div className="relative z-20 flex flex-col h-full min-h-screen">
        <header className="flex items-center p-4 justify-between bg-gradient-to-b from-[#101922] to-transparent">
          <button onClick={onBack} className="text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors active:scale-90">
            <span className="material-symbols-outlined text-[28px]">arrow_back</span>
          </button>
          <h2 className="text-white text-xl font-black leading-tight tracking-[-0.015em] flex-1 text-center text-glow uppercase">
            Máy quét Blockchain
          </h2>
          <button className="flex size-12 items-center justify-center text-[#9cabba] hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[24px]">help</span>
          </button>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 w-full max-w-md mx-auto gap-8 pb-32">
          {/* Holographic Station Visual */}
          <div className="relative w-full aspect-square max-h-[300px] flex items-center justify-center group">
            {/* Viewfinder Bracket Corners */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#0d7ff2] rounded-tl-2xl shadow-glow"></div>
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#0d7ff2] rounded-tr-2xl shadow-glow"></div>
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#0d7ff2] rounded-bl-2xl shadow-glow"></div>
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#0d7ff2] rounded-br-2xl shadow-glow"></div>

            {/* Pulsating Center Station */}
            <div className={`relative z-10 w-40 h-40 bg-contain bg-center bg-no-repeat transition-all duration-700 ${isScanning ? 'scale-110 drop-shadow-[0_0_30px_rgba(13,127,242,0.6)]' : 'drop-shadow-[0_0_15px_rgba(13,127,242,0.3)]'}`} 
                 style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBOxy6vYau73GhVfyUweInyziOe3LahRlHHghroP71vRelJI69XwPighpykhVGXaQjg-II23phYwwlmHuDX86CFp8QiXtN4O5bUqAAQ9-KRND8A4SmBsv1v36se0qhoIqjy5UEI-4bB6Vt-VlUgE0GW2I0zxGKpQ_KvytwWzJI6Jq7Pa8AEJuVCMIXEjRJU2uGijRlnrWVwDLhZ4dGEwT5DDaNO7ufLiswQDM3hCqMB4-7qhQRk5vbcEaFs6O7C6VgZ3gZsSfJipZLG')" }}>
              <div className="absolute inset-0 bg-[#0d7ff2]/10 rounded-full blur-2xl animate-pulse"></div>
            </div>

            {/* Effect Rings */}
            <div className="absolute inset-0 border border-[#0d7ff2]/20 rounded-full animate-[ping_4s_linear_infinite]"></div>
            <div className="absolute inset-0 border border-[#0d7ff2]/10 rounded-full scale-90 animate-[ping_4s_linear_infinite_0.5s]"></div>
            
            {/* Scan Beam */}
            {isScanning && (
              <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
                 <div className="scan-line-v2"></div>
              </div>
            )}
          </div>

          {/* Action Area */}
          <div className="w-full flex flex-col items-center gap-4">
             <button 
               onClick={handleScan}
               disabled={isScanning}
               className={`relative group overflow-hidden flex min-w-[240px] cursor-pointer items-center justify-center rounded-2xl h-16 px-8 bg-[#0d7ff2] hover:bg-[#0b6bcb] active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(13,127,242,0.4)] disabled:opacity-50`}
             >
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
               <span className="material-symbols-outlined text-white mr-3 text-[28px]">{isScanning ? 'sync' : 'qr_code_scanner'}</span>
               <span className="text-white text-lg font-black tracking-widest uppercase">
                 {isScanning ? 'Đang xác thực...' : 'Quét QR / Mã lô'}
               </span>
             </button>
             <p className="text-[#9cabba] text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Verified by GOFAM Chain Protocol</p>
          </div>

          {/* Holographic Result Card */}
          {showResult && (
            <div className="w-full animate-[slideUp_0.6s_ease-out]">
              <div className="glass-panel rounded-3xl overflow-hidden relative border border-[#0d7ff2]/30 backdrop-blur-xl">
                {/* Holographic Top Glow */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0d7ff2]/20 to-transparent pointer-events-none"></div>
                
                {/* Scan Line Inside Card */}
                <div className="scan-line-v2 opacity-30"></div>

                <div className="p-6 relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[#9cabba] text-[10px] font-black uppercase tracking-[0.2em] mb-1">Dữ liệu Blockchain</p>
                      <h3 className="text-white text-2xl font-black flex items-center gap-2 tracking-tight uppercase">
                        Đã xác thực
                        <span className="material-symbols-outlined text-[#0d7ff2] text-[24px] bg-[#0d7ff2]/10 rounded-full p-1 shadow-glow animate-pulse">verified</span>
                      </h3>
                    </div>
                    <div className="bg-[#0d7ff2]/20 px-3 py-1 rounded-full border border-[#0d7ff2]/40 backdrop-blur-md">
                      <span className="text-[#0d7ff2] text-[10px] font-black uppercase tracking-widest">LIVE SYNC</span>
                    </div>
                  </div>

                  <div className="flex gap-5 items-center">
                    <div className="size-28 shrink-0 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[#0d7ff2]/10 group-hover:bg-transparent transition-colors"></div>
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9eze8MqLmOlDZ-wR8F2n8-HCsG2asm-ou41u7ROg0f5OTv6VD2C1J09uT9a1OzzIHHUI0eA8K_HTw0vmOXHOZ4UcUV41tFUs-KYnO4JuMoeGE55hvJ6sTzTM4-FR1gi0fE96JuR_WWb2iPZ2Fz655zZUwAQMtUWAJVqFh3JADVVSiChpn-tRVN7FnO6ThKNcUpkGn7ghpU0A3WKBUDaxsTlVg1Ig753NTzEOmeOEY0ECx_Ht6p8yvPbnqJytrtDKThCPKyenGnStT" 
                        className="size-full object-cover transition-transform group-hover:scale-110" 
                        alt="Verified Product"
                      />
                    </div>

                    <div className="flex-1 flex flex-col gap-3 min-w-0">
                      <div className="flex flex-col">
                        <span className="text-[#9cabba] text-[9px] font-black uppercase tracking-widest">Mã lô (Batch ID)</span>
                        <span className="text-white font-mono text-sm font-black tracking-wider truncate">GF-2023-CORN-A8</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#9cabba] text-[9px] font-black uppercase tracking-widest">Nguồn gốc</span>
                        <span className="text-white font-black text-sm uppercase truncate tracking-tight">Zone A - Farm GOFAM</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#9cabba] text-[9px] font-black uppercase tracking-widest">Transaction Hash</span>
                        <div className="flex items-center gap-2 bg-black/30 px-2 py-1 rounded-lg border border-white/5">
                          <span className="text-[#0d7ff2] font-mono text-[10px] truncate">0x71c...3a9f</span>
                          <span className="material-symbols-outlined text-[#9cabba] text-[14px] cursor-pointer hover:text-white transition-colors">content_copy</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                       <div className="size-2 rounded-full bg-[#0d7ff2] shadow-glow"></div>
                       <span className="text-[#9cabba] text-[9px] font-black uppercase tracking-[0.2em]">Verified by Nodes v2.0</span>
                    </div>
                    <button className="text-[#0d7ff2] text-[10px] font-black uppercase tracking-widest hover:text-white transition-all flex items-center gap-2">
                      CHI TIẾT <span className="material-symbols-outlined !text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        .text-glow { text-shadow: 0 0 10px rgba(13, 127, 242, 0.5); }
        .shadow-glow { box-shadow: 0 0 15px rgba(13, 127, 242, 0.3); }
        .glass-panel { background: rgba(16, 25, 34, 0.75); }
        .scan-line-v2 {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: #0d7ff2;
            box-shadow: 0 0 15px #0d7ff2;
            animation: hscan 3s linear infinite;
            z-index: 20;
        }
        @keyframes hscan {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default BlockchainScanner;
