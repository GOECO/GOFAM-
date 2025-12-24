
import React, { useState, useEffect } from 'react';

interface Props { onBack: () => void; }

interface ZoneControl {
  id: string;
  name: string;
  status: boolean;
  intensity?: number;
  icon: string;
  color: string;
}

const HKO: React.FC<Props> = ({ onBack }) => {
  const [controls, setControls] = useState<ZoneControl[]>([
    { id: 'c1', name: 'Phun sương', status: true, intensity: 65, icon: 'mist', color: 'bg-blue-500' },
    { id: 'c2', name: 'Quạt thông gió', status: false, icon: 'air', color: 'bg-emerald-500' },
    { id: 'c3', name: 'Đèn UV-C', status: false, intensity: 20, icon: 'lightbulb', color: 'bg-purple-500' },
    { id: 'c4', name: 'Hệ thống Dinh dưỡng', status: true, icon: 'opacity', color: 'bg-orange-500' }
  ]);

  const [activeZone, setActiveZone] = useState('Nhà kính A1');
  const [reading, setReading] = useState(28.4);

  useEffect(() => {
    const timer = setInterval(() => {
      setReading(prev => +(prev + (Math.random() - 0.5) * 0.1).toFixed(1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const toggleControl = (id: string) => {
    setControls(prev => prev.map(c => c.id === id ? { ...c, status: !c.status } : c));
  };

  return (
    <div className="min-h-screen bg-background-dark text-white font-display pb-32 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-dark/90 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
        <button onClick={onBack} className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-all">
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </button>
        <div className="text-center">
          <h1 className="text-lg font-black uppercase tracking-tight">CÔNG CỤ HKO</h1>
          <div className="flex items-center justify-center gap-1.5 mt-0.5">
            <div className="size-1.5 rounded-full bg-primary animate-pulse shadow-glow"></div>
            <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em]">Neural Link: Active</span>
          </div>
        </div>
        <button className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
          <span className="material-symbols-outlined">help</span>
        </button>
      </header>

      <main className="p-5 space-y-6">
        {/* Zone Selector Pill */}
        <div className="flex justify-center">
          <div className="bg-surface-dark border border-white/10 rounded-2xl p-1 flex gap-1">
            {['Nhà kính A1', 'Nhà kính B2', 'Chuồng 4'].map(zone => (
              <button 
                key={zone}
                onClick={() => setActiveZone(zone)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeZone === zone ? 'bg-primary text-black shadow-glow' : 'text-gray-500 hover:text-white'}`}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>

        {/* Main localized Stat Display */}
        <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-surface-dark to-black p-8 border border-white/10 shadow-2xl group">
           <div className="absolute -right-10 -top-10 size-40 bg-primary/10 blur-[80px] group-hover:bg-primary/20 transition-all duration-700"></div>
           <div className="relative z-10 flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary !text-lg">thermostat</span>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">Nhiệt độ hiện tại</p>
              </div>
              <h2 className="text-7xl font-black tracking-tighter text-white drop-shadow-glow">
                {reading}<span className="text-2xl text-primary font-bold ml-1">°C</span>
              </h2>
              <div className="mt-6 flex items-center gap-6">
                 <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-gray-500 uppercase mb-1">Độ ẩm</span>
                    <span className="text-xl font-black text-blue-400">62%</span>
                 </div>
                 <div className="h-8 w-px bg-white/10"></div>
                 <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-gray-500 uppercase mb-1">CO2</span>
                    <span className="text-xl font-black text-emerald-400">420<span className="text-[10px]">ppm</span></span>
                 </div>
              </div>
           </div>
        </section>

        {/* Interactive Controls Grid */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] pl-2">Điều khiển phần cứng HKO</h3>
           <div className="grid grid-cols-2 gap-4">
              {controls.map(control => (
                <div 
                  key={control.id}
                  onClick={() => toggleControl(control.id)}
                  className={`relative p-5 rounded-[2rem] border transition-all duration-300 cursor-pointer active:scale-95 group overflow-hidden ${control.status ? 'bg-surface-dark border-primary/40 shadow-glow' : 'bg-surface-dark border-white/5 grayscale opacity-60'}`}
                >
                  {/* Toggle Indicator */}
                  <div className={`absolute top-4 right-4 size-3 rounded-full ${control.status ? 'bg-primary animate-pulse shadow-glow' : 'bg-gray-700'}`}></div>
                  
                  <div className={`size-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${control.status ? control.color : 'bg-white/5'}`}>
                    <span className="material-symbols-outlined !text-2xl font-black text-white">{control.icon}</span>
                  </div>
                  
                  <h4 className="text-sm font-black uppercase tracking-tight mb-1">{control.name}</h4>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{control.status ? 'Đang chạy' : 'Đã dừng'}</p>
                  
                  {control.intensity !== undefined && control.status && (
                    <div className="mt-4 space-y-2 animate-fadeIn">
                       <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full ${control.color} transition-all duration-500`} style={{ width: `${control.intensity}%` }}></div>
                       </div>
                       <p className="text-[8px] font-black uppercase text-right opacity-60">{control.intensity}% Hiệu suất</p>
                    </div>
                  )}
                </div>
              ))}
           </div>
        </section>

        {/* AI Insight for Control */}
        <section className="bg-primary/5 border border-primary/20 rounded-3xl p-5 flex items-start gap-4">
          <div className="size-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
             <span className="material-symbols-outlined !text-2xl animate-pulse">psychology</span>
          </div>
          <div>
            <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-1.5">Phân tích HKO (AI)</h4>
            <p className="text-xs text-emerald-100/70 font-medium leading-relaxed">
              Dựa trên độ ẩm hiện tại, GOFAM AI khuyến nghị tăng cường <span className="text-white font-black">Phun sương</span> lên mức 80% trong 15 phút tới để tối ưu quá trình quang hợp.
            </p>
          </div>
        </section>
      </main>

      {/* Floating Bottom Nav Indicator */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-background-dark/95 backdrop-blur-xl border-t border-white/5 px-10 flex items-center justify-between z-50">
          <div className="flex items-center gap-2 text-primary">
             <span className="material-symbols-outlined !text-[28px] material-symbols-filled">control_camera</span>
             <span className="text-[10px] font-black uppercase tracking-widest">Dashboard Control</span>
          </div>
          <button className="bg-primary text-black px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-glow active:scale-95 transition-transform">
             Lưu kịch bản
          </button>
      </nav>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .drop-shadow-glow { filter: drop-shadow(0 0 10px rgba(19, 236, 73, 0.5)); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default HKO;
