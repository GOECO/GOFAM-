
import React from 'react';

interface Props { onBack: () => void; }

const Wallet: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      <header className="p-4 flex items-center justify-between">
        <button onClick={onBack} className="size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xl font-bold">Ví GOFAM</h2>
        <button className="size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      <div className="flex flex-col items-center py-10 px-4">
        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Tổng điểm khả dụng</span>
        <h1 className="text-[6rem] font-black text-primary leading-none tracking-tight">2,450</h1>
        <p className="text-xl font-bold text-gray-400 -mt-2">G-Points</p>
        <div className="mt-4 bg-gray-100 dark:bg-white/5 px-4 py-1.5 rounded-full text-sm font-medium text-gray-500">
           ≈ 245.000 VNĐ
        </div>
      </div>

      <div className="px-6 grid grid-cols-2 gap-4 mb-8">
        <button className="h-40 bg-background-dark dark:bg-primary rounded-3xl p-5 flex flex-col justify-between text-white dark:text-black shadow-xl group active:scale-95 transition-all">
          <div className="size-12 rounded-full bg-primary dark:bg-black/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl font-bold">add</span>
          </div>
          <div className="text-left">
             <p className="text-2xl font-black leading-none mb-1">Kiếm<br/>thêm</p>
             <span className="text-xs font-medium opacity-70">Qua nhiệm vụ</span>
          </div>
        </button>
        <button className="h-40 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-5 flex flex-col justify-between shadow-lg group active:scale-95 transition-all">
          <div className="size-12 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-600">
            <span className="material-symbols-outlined text-3xl">redeem</span>
          </div>
          <div className="text-left">
             <p className="text-2xl font-black leading-none mb-1 dark:text-white">Đổi<br/>thưởng</p>
             <span className="text-xs font-medium text-gray-400">Voucher, quà</span>
          </div>
        </button>
      </div>

      <div className="flex-1 bg-white dark:bg-surface-dark rounded-t-[3rem] border-t border-gray-100 dark:border-gray-800 p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold dark:text-white">Lịch sử giao dịch</h3>
          <span className="material-symbols-outlined text-gray-400">calendar_month</span>
        </div>

        <div className="space-y-6">
          {[
            { label: 'Giới thiệu bạn bè', date: 'Hôm nay, 10:30', points: '+50', color: 'text-primary', icon: 'group_add', bg: 'bg-green-500/10 text-green-500' },
            { label: 'Đổi Voucher Tiki', date: 'Hôm qua, 08:15', points: '-200', color: 'text-text-main-light dark:text-white', icon: 'shopping_bag', bg: 'bg-orange-500/10 text-orange-500' },
            { label: 'Chẩn đoán AI', date: '20/05, 16:45', points: '+10', color: 'text-primary', icon: 'pest_control', bg: 'bg-blue-500/10 text-blue-500' },
            { label: 'Nhật ký IoT', date: '19/05, 09:20', points: '+5', color: 'text-primary', icon: 'sensors', bg: 'bg-purple-500/10 text-purple-500' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`size-12 rounded-2xl flex items-center justify-center ${item.bg}`}>
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <div>
                  <p className="font-bold dark:text-white leading-tight">{item.label}</p>
                  <p className="text-xs text-gray-400 font-medium mt-1">{item.date}</p>
                </div>
              </div>
              <span className={`text-lg font-black ${item.color}`}>{item.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
