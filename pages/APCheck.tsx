
import React, { useState, useEffect } from 'react';
import { Page } from '../types';

interface Props { 
  onBack: () => void; 
}

interface APNode {
  id: string;
  name: string;
  type: 'Access Point' | 'IoT Node' | 'Gateway';
  status: 'Online' | 'Offline' | 'Weak';
  signal: number; // 0-100
  latency: string;
  battery?: number;
}

const APCheck: React.FC<Props> = ({ onBack }) => {
  const [isScanning, setIsScanning] = useState(true);
  const [nodes, setNodes] = useState<APNode[]>([]);

  useEffect(() => {
    // Giả lập quét hệ thống
    const timer = setTimeout(() => {
      setNodes([
        { id: 'AP-01', name: 'Trạm phát Trung tâm', type: 'Access Point', status: 'Online', signal: 95, latency: '12ms' },
        { id: 'GW-A', name: 'Gateway Khu A', type: 'Gateway', status: 'Online', signal: 82, latency: '24ms' },
        { id: 'SN-102', name: 'Cảm biến Độ ẩm #102', type: 'IoT Node', status: 'Weak', signal: 35, latency: '150ms', battery: 15 },
        { id: 'SN-105', name: 'Cảm biến Ánh sáng #105', type: 'IoT Node', status: 'Online', signal: 78, latency: '45ms', battery: 88 },
        { id: 'AP-02', name: 'Trạm phát Phụ Khu B', type: 'Access Point', status: 'Offline', signal: 0, latency: '---' },
      ]);
      setIsScanning(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return 'text-primary';
      case 'Weak': return 'text-orange-500';
      case 'Offline': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const getSignalIcon = (signal: number) => {
    if (signal === 0) return 'signal_cellular_0_bar';
    if (signal < 40) return 'signal_cellular_1_bar';
    if (signal < 70) return 'signal_cellular_3_bar';
    return 'signal_cellular_4_bar';
  };

  return (
    <div className="min-h-screen bg-background-dark text-white font-display p-6 pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
      
      <header className="flex items-center justify-between mb-8 relative z-10">
        <button onClick={onBack} className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-all">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="text-center">
          <h1 className="text-lg font-black uppercase tracking-tight">Kiểm tra AP & Hệ thống</h1>
          <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Diagnostic Tool Pro</p>
        </div>
        <button onClick={() => setIsScanning(true)} className={`size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-all ${isScanning ? 'animate-spin' : ''}`}>
          <span className="material-symbols-outlined">sync</span>
        </button>
      </header>

      <div className="max-w-md mx-auto space-y-6 relative z-10">
        {isScanning ? (
          <div className="flex flex-col items-center justify-center py-20 gap-8 animate-pulse">
            <div className="relative size-40">
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full"></div>
              <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined !text-6xl text-primary">radar</span>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-black uppercase tracking-widest mb-2">Đang quét mạng...</h2>
              <p className="text-xs text-gray-500 font-medium italic">Vui lòng chờ trong khi hệ thống kiểm tra các Nodes và Access Points</p>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white/5 rounded-[2.5rem] p-6 border border-white/10 shadow-2xl backdrop-blur-md">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Trạng thái chung</p>
                  <h3 className="text-2xl font-black text-orange-500 uppercase tracking-tight">Cần chú ý</h3>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-white">4/5</p>
                  <p className="text-[9px] font-black text-gray-500 uppercase">Nodes khả dụng</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 transition-all duration-1000 shadow-glow" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-2">Danh sách thiết bị</h3>
              <div className="flex flex-col gap-3">
                {nodes.map((node) => (
                  <div key={node.id} className="bg-white/5 rounded-3xl p-4 border border-white/5 hover:border-primary/20 transition-all group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`size-12 rounded-2xl flex items-center justify-center border ${node.status === 'Online' ? 'bg-primary/10 border-primary/20 text-primary' : node.status === 'Weak' ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                          <span className="material-symbols-outlined !text-2xl">
                            {node.type === 'Access Point' ? 'router' : node.type === 'Gateway' ? 'hub' : 'sensors'}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-black dark:text-white leading-tight">{node.name}</h4>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{node.id} • {node.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${getStatusColor(node.status)}`}>
                          {node.status}
                        </div>
                        <div className="flex items-center gap-1.5 justify-end">
                          <span className="material-symbols-outlined !text-sm text-gray-400">{getSignalIcon(node.signal)}</span>
                          <span className="text-[10px] font-mono font-bold text-gray-400">{node.latency}</span>
                        </div>
                      </div>
                    </div>
                    {node.status === 'Weak' && (
                      <div className="mt-4 pt-4 border-t border-white/5 animate-fadeIn">
                        <div className="flex items-start gap-2 bg-orange-500/10 p-3 rounded-2xl border border-orange-500/20">
                          <span className="material-symbols-outlined text-orange-500 !text-base mt-0.5">info</span>
                          <p className="text-[10px] text-orange-200/70 font-medium leading-relaxed">
                            <span className="font-bold text-orange-400 uppercase">Khuyên dùng:</span> Tín hiệu yếu và Pin thấp ({node.battery}%). Hãy kiểm tra lại vị trí lắp đặt hoặc thay pin để tránh gián đoạn dữ liệu.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full h-16 bg-white text-black rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                <span className="material-symbols-outlined">restart_alt</span>
                Khởi động lại Gateway
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default APCheck;
