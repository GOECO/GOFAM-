
import React, { useState } from 'react';

interface Props { onBack: () => void; }

const AISettings: React.FC<Props> = ({ onBack }) => {
  const [sensitivity, setSensitivity] = useState(85);
  const [activePriority, setActivePriority] = useState('Năng suất');

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col max-w-md mx-auto overflow-x-hidden bg-background-light dark:bg-background-dark font-body group/design-root transition-colors duration-200">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 border-b border-gray-200 dark:border-gray-800 justify-between">
        <div 
          onClick={onBack}
          className="text-[#111714] dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full active:bg-gray-200 dark:active:bg-gray-800 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </div>
        <h2 className="text-[#111714] dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center font-display uppercase tracking-wider">Cài đặt AI</h2>
        <div className="flex size-10 opacity-0 pointer-events-none"></div>
      </div>

      <div className="flex-1 flex flex-col px-4 gap-6 pb-32 pt-4">
        {/* Diagnostic Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 ml-1">Chẩn đoán Sâu bệnh</h3>
          <div className="bg-white dark:bg-surface-dark rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700/50">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">sensors</span>
                  <span className="font-black text-sm dark:text-gray-200 uppercase tracking-tight">Độ nhạy AI</span>
                </div>
                <span className="text-primary font-black text-xs bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20">Cao ({sensitivity}%)</span>
              </div>
              <input 
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" 
                max="100" min="0" step="1" type="range" 
                value={sensitivity}
                onChange={(e) => setSensitivity(parseInt(e.target.value))}
              />
              <div className="flex justify-between mt-3 text-[9px] text-gray-400 font-black uppercase tracking-widest">
                <span>Thấp</span>
                <span>Trung bình</span>
                <span>Cao</span>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-xl">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-lg">schedule</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black dark:text-gray-200 uppercase tracking-tight">Tần suất quét</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Drone / Camera IoT</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <span className="text-xs font-black text-slate-800 dark:text-gray-300 uppercase">Mỗi 3 ngày</span>
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </div>
            </div>

            <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-xl">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-lg">database</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black dark:text-gray-200 uppercase tracking-tight">Nguồn dữ liệu</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Cơ sở dữ liệu bệnh học</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <span className="text-xs font-black text-slate-800 dark:text-gray-300 uppercase">Viện KHNN VN</span>
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 ml-1">Đề xuất Tối ưu</h3>
          <div className="bg-white dark:bg-surface-dark rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-500 text-xl">flag</span>
                  <span className="font-black text-sm dark:text-gray-200 uppercase tracking-tight">Ưu tiên mục tiêu</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Năng suất', icon: 'trending_up' },
                  { label: 'Chi phí', icon: 'savings' },
                  { label: 'Môi trường', icon: 'eco' }
                ].map((item) => (
                  <button 
                    key={item.label}
                    onClick={() => setActivePriority(item.label)}
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border transition-all active:scale-95 ${
                      activePriority === item.label 
                        ? 'border-primary bg-primary/10 text-primary-dark dark:text-primary' 
                        : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400'
                    }`}
                  >
                    <span className={`material-symbols-outlined !text-xl ${activePriority === item.label ? 'material-symbols-filled' : ''}`}>{item.icon}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-red-500 text-xl">warning</span>
                  <span className="font-black text-sm dark:text-gray-200 uppercase tracking-tight">Ngưỡng cảnh báo IoT</span>
                </div>
                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline decoration-primary/30 underline-offset-4">Tùy chỉnh</button>
              </div>
              <div className="space-y-6 px-1">
                {[
                  { label: 'Nhiệt độ', range: '20° - 35°C', color: 'bg-orange-400', left: '20%', right: '30%' },
                  { label: 'Độ ẩm', range: '60% - 90%', color: 'bg-blue-400', left: '40%', right: '10%' },
                  { label: 'Độ pH', range: '5.5 - 7.0', color: 'bg-green-500', left: '30%', right: '30%' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 w-20 uppercase tracking-widest">{item.label}</span>
                    <div className="flex-1 relative h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                      <div 
                        className={`absolute h-full ${item.color} rounded-full opacity-60`} 
                        style={{ left: item.left, right: item.right }}
                      ></div>
                      <div className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-current rounded-full shadow-md cursor-pointer ${item.color.replace('bg-', 'text-')}`} style={{ left: item.left }}></div>
                      <div className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-current rounded-full shadow-md cursor-pointer ${item.color.replace('bg-', 'text-')}`} style={{ right: item.right }}></div>
                    </div>
                    <span className="font-mono text-[10px] font-black text-slate-800 dark:text-gray-300 text-right w-16 whitespace-nowrap">{item.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Management Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 ml-1">Quản lý Hệ thống</h3>
          <div className="bg-white dark:bg-surface-dark rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-black dark:text-gray-200 uppercase tracking-tight">Phiên bản Mô hình AI</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">v2.4.1 (Stable) • 2 ngày trước</span>
              </div>
              <button className="text-[10px] font-black text-white bg-slate-900 dark:bg-gray-700 px-4 py-2 rounded-xl hover:bg-black transition-all active:scale-95 uppercase tracking-widest">
                Kiểm tra
              </button>
            </div>
            <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-xl group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                  <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-lg">delete_forever</span>
                </div>
                <span className="text-sm font-black text-red-600 dark:text-red-400 uppercase tracking-tight">Xóa dữ liệu huấn luyện</span>
              </div>
              <span className="material-symbols-outlined text-red-400 text-lg">chevron_right</span>
            </div>
          </div>
        </div>

        {/* Battery Info Box */}
        <div className="flex gap-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/30 shadow-sm">
          <span className="material-symbols-outlined text-blue-500 text-xl shrink-0">info</span>
          <p className="text-[11px] text-blue-800 dark:text-blue-200 leading-relaxed font-medium uppercase tracking-tight">
            Các thay đổi về <span className="font-black">độ nhạy</span> và <span className="font-black">tần suất quét</span> có thể ảnh hưởng đến thời lượng pin của thiết bị IoT và dung lượng lưu trữ Cloud.
          </p>
        </div>
      </div>

      {/* Bottom Sticky Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 max-w-md mx-auto z-40 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => {
            alert("Đã lưu các thiết lập AI mới!");
            onBack();
          }}
          className="w-full bg-primary hover:bg-primary-dark active:scale-[0.98] transition-all h-14 rounded-2xl flex items-center justify-center gap-3 shadow-glow text-black font-black text-sm uppercase tracking-[0.2em]"
        >
          <span className="material-symbols-outlined font-black">save</span>
          Lưu Cài đặt
        </button>
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 22px;
            width: 22px;
            border-radius: 50%;
            background: #13ec49;
            cursor: pointer;
            margin-top: -10px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            border: 3px solid white;
        }
        input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 4px;
            cursor: pointer;
            background: #e5e7eb;
            border-radius: 2px;
        }
        .dark input[type=range]::-webkit-slider-runnable-track {
            background: #374151;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AISettings;
