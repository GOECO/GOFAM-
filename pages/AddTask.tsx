
import React, { useState } from 'react';

interface Props { onBack: () => void; }

type TaskType = 'irrigation' | 'fertilizer' | 'pest' | 'harvest';

const AddTask: React.FC<Props> = ({ onBack }) => {
  const [taskType, setTaskType] = useState<TaskType>('irrigation');
  const [recurring, setRecurring] = useState(false);
  const [iotEnabled, setIotEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display antialiased text-text-main-light dark:text-white pb-32">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800 shadow-sm backdrop-blur-md bg-opacity-95">
        <div className="flex items-center h-14 px-4 justify-between">
          <div className="flex w-16 items-center justify-start">
            <button onClick={onBack} className="text-gray-400 hover:text-primary transition-colors text-xs font-black uppercase tracking-widest">
              Hủy
            </button>
          </div>
          <h2 className="text-base font-black leading-tight tracking-tight flex-1 text-center truncate">Nhiệm Vụ Mới</h2>
          <div className="flex w-16 items-center justify-end">
            <button className="text-primary font-black text-xs uppercase tracking-widest">Lưu nháp</button>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-6">
        {/* Task Type Selector */}
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 px-1">Loại nhiệm vụ</label>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: 'irrigation', name: 'Tưới nước', icon: 'water_drop' },
              { id: 'fertilizer', name: 'Bón phân', icon: 'compost' },
              { id: 'pest', name: 'Phun thuốc', icon: 'pest_control' },
              { id: 'harvest', name: 'Thu hoạch', icon: 'agriculture' }
            ].map(type => (
              <button 
                key={type.id}
                onClick={() => setTaskType(type.id as TaskType)}
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-4 transition-all active:scale-95 ${taskType === type.id ? 'bg-primary text-black font-black shadow-lg shadow-primary/20 ring-1 ring-primary/50' : 'bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-gray-500 font-bold'}`}
              >
                <span className="material-symbols-outlined text-[18px]">{type.icon}</span>
                <span className="text-xs uppercase tracking-widest">{type.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Execution Info */}
        <div className="bg-white dark:bg-surface-dark rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 dark:border-gray-800/50 bg-gray-50/30 dark:bg-black/10 flex justify-between items-center">
            <h3 className="text-xs font-black text-text-main-light dark:text-gray-200 uppercase tracking-widest">Thông tin thực hiện</h3>
            <span className="text-[9px] font-black text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-lg uppercase tracking-widest">Bắt buộc</span>
          </div>
          <div className="p-5 space-y-5">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Khu vực / Chuồng trại</label>
              <div className="relative group">
                <select className="w-full h-12 pl-11 pr-10 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black/20 text-text-main-light dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none appearance-none text-sm font-bold transition-all">
                  <option value="khu-a">Khu A - Vườn Ổi (300m²)</option>
                  <option value="khu-b">Khu B - Nhà Kính Dưa Lưới</option>
                  <option value="khu-c">Chuồng Trại 1</option>
                </select>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[18px]">location_on</span>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[18px]">expand_more</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Ngày thực hiện</label>
                <div className="relative">
                  <input className="w-full h-12 pl-11 pr-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black/20 text-text-main-light dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm font-bold appearance-none" type="date" defaultValue="2023-10-27"/>
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[18px]">calendar_today</span>
                </div>
              </div>
              <div className="w-1/3 space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Giờ</label>
                <div className="relative">
                  <input className="w-full h-12 pl-10 pr-2 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black/20 text-text-main-light dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm font-bold appearance-none" type="time" defaultValue="08:00"/>
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[18px]">schedule</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Người phụ trách</label>
              <div className="relative group">
                <select className="w-full h-12 pl-11 pr-10 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black/20 text-text-main-light dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none appearance-none text-sm font-bold transition-all">
                  <option value="me">Tôi (Nguyễn Văn A)</option>
                  <option value="staff1">Trần Thị B - Kỹ thuật viên</option>
                  <option value="staff2">Lê Văn C - Công nhân</option>
                </select>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[18px]">person</span>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[18px]">expand_more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory & Cost */}
        <div className="bg-white dark:bg-surface-dark rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 dark:border-gray-800/50 bg-gray-50/30 dark:bg-black/10">
            <h3 className="text-xs font-black text-text-main-light dark:text-gray-200 uppercase tracking-widest">Vật tư & Chi phí</h3>
          </div>
          <div className="p-5 space-y-5">
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Vật tư cần dùng</label>
              <div className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-black/20 group hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                    <span className="material-symbols-outlined !text-xl">science</span>
                  </div>
                  <div>
                    <div className="text-sm font-black dark:text-white leading-none">Phân NPK 20-20-15</div>
                    <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Kho A • 10 kg</div>
                  </div>
                </div>
                <button className="text-gray-300 hover:text-red-500 transition-colors">
                  <span className="material-symbols-outlined !text-xl">close</span>
                </button>
              </div>
              <button className="w-full py-3.5 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined !text-lg font-bold">add</span>
                Thêm vật tư
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Chi phí dự kiến</label>
              <div className="relative">
                <input className="w-full h-12 pl-11 pr-16 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black/20 text-text-main-light dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm font-black appearance-none text-right" type="text" defaultValue="350,000"/>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[18px]">attach_money</span>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-black text-[10px] uppercase tracking-widest">VNĐ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="bg-white dark:bg-surface-dark rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 dark:border-gray-800/50 bg-gray-50/30 dark:bg-black/10 flex justify-between items-center">
            <h3 className="text-xs font-black text-text-main-light dark:text-gray-200 uppercase tracking-widest">Tùy chọn nâng cao</h3>
            <span className="material-symbols-outlined text-gray-300">tune</span>
          </div>
          <div className="p-5 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-black dark:text-white">Lặp lại định kỳ</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Tự động tạo nhiệm vụ mới</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={recurring} onChange={() => setRecurring(!recurring)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:bg-gray-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="pt-4 border-t border-dashed border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined ${iotEnabled ? 'text-primary' : 'text-gray-300'} !text-xl`}>sensors</span>
                  <div>
                    <div className="text-sm font-black dark:text-white">Tự động kích hoạt (IoT)</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Dựa trên cảm biến</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={iotEnabled} onChange={() => setIotEnabled(!iotEnabled)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:bg-gray-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              {iotEnabled && (
                <div className="bg-gray-50 dark:bg-black/30 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 animate-[fadeIn_0.3s_ease-out]">
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Điều kiện kích hoạt</div>
                  <div className="space-y-3">
                    <select className="w-full h-10 px-4 rounded-xl text-xs font-bold bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 focus:ring-1 focus:ring-primary/20 outline-none">
                      <option>Cảm biến độ ẩm đất (Khu A)</option>
                      <option>Nhiệt độ không khí</option>
                    </select>
                    <div className="flex gap-3">
                      <select className="w-1/2 h-10 px-4 rounded-xl text-xs font-bold bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 focus:ring-1 focus:ring-primary/20 outline-none">
                        <option value="lt">Nhỏ hơn (&lt;)</option>
                        <option value="gt">Lớn hơn (&gt;)</option>
                      </select>
                      <div className="relative w-1/2">
                        <input className="w-full h-10 pl-4 pr-10 rounded-xl text-xs font-black bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 focus:ring-1 focus:ring-primary/20 outline-none" type="number" defaultValue="45"/>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-3 pb-12">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Ghi chú thêm</label>
          <textarea className="w-full min-h-[120px] p-4 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-surface-dark text-text-main-light dark:text-white focus:ring-2 focus:ring-primary/10 outline-none text-sm font-medium leading-relaxed placeholder:text-gray-300" placeholder="Mô tả chi tiết công việc, lưu ý đặc biệt cho người thực hiện..."></textarea>
          <div className="flex flex-wrap gap-2 pt-1">
            {['#KhanCap', '#CanGiamSat', '#XuatKhau'].map(tag => (
              <button key={tag} className="px-3.5 py-1.5 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-lg hover:border-primary/40 hover:text-primary transition-all">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 p-4 z-40 pb-8">
        <div className="max-w-md mx-auto">
          <button 
            onClick={() => {
              alert("Nhiệm vụ đã được lưu và phân công!");
              onBack();
            }}
            className="w-full bg-primary hover:bg-primary-dark text-black font-black text-sm uppercase tracking-widest h-14 rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined font-bold">save</span>
            Lưu nhiệm vụ
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default AddTask;
