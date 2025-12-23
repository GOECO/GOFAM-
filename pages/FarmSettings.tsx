
import React, { useState } from 'react';

interface Props { onBack: () => void; }

const FarmSettings: React.FC<Props> = ({ onBack }) => {
  const [farmName, setFarmName] = useState('Trang trại Đà Lạt 1');
  const [location, setLocation] = useState('Lâm Đồng, Việt Nam');
  const [timezone, setTimezone] = useState('Asia/Ho_Chi_Minh');
  const [refreshRate, setRefreshRate] = useState(3);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Đã cập nhật cấu hình thành công!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-32">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="text-center flex-1 pr-10">
             <h1 className="text-xl font-bold dark:text-white">Cấu hình Farm</h1>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quản trị hệ thống</p>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-8 animate-fadeIn">
        {/* Farm Identity Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
             <span className="material-symbols-outlined text-primary">info</span>
             <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Thông tin cơ bản</h3>
          </div>
          
          <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Tên trang trại</label>
              <input 
                type="text" 
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="w-full h-12 bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl px-4 text-sm font-medium focus:ring-1 focus:ring-primary outline-none dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Vị trí địa lý</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-12 bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl pl-4 pr-10 text-sm font-medium focus:ring-1 focus:ring-primary outline-none dark:text-white"
                />
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-primary text-sm">my_location</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Múi giờ</label>
              <select 
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full h-12 bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl px-4 text-sm font-medium outline-none dark:text-white appearance-none cursor-pointer"
              >
                <option value="Asia/Ho_Chi_Minh">Việt Nam (GMT+7)</option>
                <option value="Asia/Bangkok">Thái Lan (GMT+7)</option>
                <option value="Asia/Singapore">Singapore (GMT+8)</option>
              </select>
            </div>
          </div>
        </section>

        {/* IoT Preferences Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
             <span className="material-symbols-outlined text-primary">sensors</span>
             <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Cấu hình IoT</h3>
          </div>
          
          <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Tốc độ làm mới dữ liệu</label>
                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-bold">{refreshRate} giây</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="60" 
                value={refreshRate}
                onChange={(e) => setRefreshRate(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase">
                <span>Thời gian thực (1s)</span>
                <span>Tiết kiệm pin (60s)</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <p className="text-sm font-bold dark:text-white">Chế độ Pro Live</p>
                <p className="text-[10px] text-gray-500">Luôn hiển thị thông số trên thanh trạng thái</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Security & Access */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
             <span className="material-symbols-outlined text-primary">security</span>
             <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Bảo mật & Quyền hạn</h3>
          </div>
          
          <div className="bg-white dark:bg-surface-dark rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm divide-y divide-gray-50 dark:divide-gray-800/50">
            <button className="w-full p-4 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">group</span>
                <span className="text-sm font-medium dark:text-white">Quản lý nhân sự (5 thành viên)</span>
              </div>
              <span className="material-symbols-outlined text-gray-300">chevron_right</span>
            </button>
            <button className="w-full p-4 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">key</span>
                <span className="text-sm font-medium dark:text-white">Mã PIN xác thực xuất kho</span>
              </div>
              <span className="material-symbols-outlined text-gray-300">chevron_right</span>
            </button>
          </div>
        </section>

        <div className="pt-4">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full h-16 bg-primary text-black rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-primary/20 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSaving ? (
              <span className="material-symbols-outlined animate-spin">sync</span>
            ) : (
              <span className="material-symbols-outlined">save</span>
            )}
            Lưu thay đổi
          </button>
        </div>
      </main>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default FarmSettings;
