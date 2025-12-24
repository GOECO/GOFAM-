
import React, { useState } from 'react';
import { Page } from '../types';

interface Props { onBack: () => void; onNavigate: (page: Page) => void; }

interface NotificationItem {
  id: string;
  type: 'finance' | 'agri' | 'system' | 'info';
  title: string;
  desc: React.ReactNode;
  time: string;
  isUnread: boolean;
  icon: string;
  actionLabel?: string;
  priority?: 'high' | 'normal';
}

const Notifications: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  const NOTIFICATIONS: Record<string, NotificationItem[]> = {
    'Hôm nay': [
      {
        id: '1',
        type: 'finance',
        title: 'Thu nhập vụ mùa',
        desc: <>Bạn đã nhận <span className="text-primary font-black">+500 GFT</span> từ việc thu hoạch Lúa Mì tại <span className="text-gray-400">Cánh đồng #01</span>.</>,
        time: '5 phút trước',
        isUnread: true,
        icon: 'currency_bitcoin'
      },
      {
        id: '2',
        type: 'agri',
        title: 'Cảnh báo sâu bệnh!',
        desc: <>Cánh đồng số 2 đang bị tấn công bởi <span className="text-red-500 font-bold uppercase tracking-tight">Sâu Rầy</span>. Xử lý ngay để tránh mất sản lượng.</>,
        time: '30 phút trước',
        isUnread: true,
        icon: 'pest_control',
        priority: 'high',
        actionLabel: 'Xử lý ngay'
      }
    ],
    'Hôm qua': [
      {
        id: '3',
        type: 'system',
        title: 'Rút tiền thành công',
        desc: <>Yêu cầu rút <span className="font-black text-white uppercase">1,000 USDT</span> về ví MetaMask <span className="font-mono text-[10px] text-gray-400 bg-black/40 px-1 py-0.5 rounded">0x3f...8a2</span> đã hoàn tất.</>,
        time: '14:30 hôm qua',
        isUnread: false,
        icon: 'account_balance_wallet'
      },
      {
        id: '4',
        type: 'info',
        title: 'Tưới tiêu tự động',
        desc: <>Hệ thống đã hoàn thành tưới nước cho tất cả các cánh đồng theo lịch trình.</>,
        time: '08:00 hôm qua',
        isUnread: false,
        icon: 'water_drop'
      }
    ],
    'Cũ hơn': [
      {
        id: '5',
        type: 'finance',
        title: 'Staking bắt đầu',
        desc: <>Bạn đã stake <span className="font-black text-white">5,000 GFT</span> vào pool thanh khoản. Lãi suất dự kiến 12% APY.</>,
        time: '3 ngày trước',
        isUnread: false,
        icon: 'layers'
      }
    ]
  };

  const getIconStyles = (type: string, priority?: string) => {
    if (priority === 'high') return 'bg-red-500/20 text-red-500 border-red-500/30';
    switch (type) {
      case 'finance': return 'bg-primary/10 text-primary border-primary/20';
      case 'system': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'agri': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-dark font-display text-white overflow-hidden transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 pt-12 pb-4 bg-background-dark/90 backdrop-blur-xl border-b border-white/5">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">Thông báo</h1>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1.5">Cập nhật hoạt động farm của bạn</p>
        </div>
        <button className="size-11 rounded-2xl bg-surface-dark border border-white/5 flex items-center justify-center text-primary hover:bg-white/5 active:scale-90 transition-all group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110">done_all</span>
        </button>
      </header>

      {/* Filter Chips */}
      <div className="sticky top-[84px] z-40 w-full overflow-hidden bg-background-dark/80 backdrop-blur-md px-6 py-4 flex gap-3 overflow-x-auto no-scrollbar">
        {[
          { label: 'Tất cả', icon: 'grid_view' },
          { label: 'Tài chính', icon: 'monetization_on', color: 'text-yellow-400' },
          { label: 'Nông nghiệp', icon: 'agriculture', color: 'text-primary' },
          { label: 'Hệ thống', icon: 'dns', color: 'text-blue-400' }
        ].map((chip) => (
          <button 
            key={chip.label}
            onClick={() => setActiveFilter(chip.label)}
            className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-5 transition-all active:scale-95 border ${activeFilter === chip.label ? 'bg-primary border-primary text-black font-black shadow-glow' : 'bg-surface-dark border-white/5 text-gray-400'}`}
          >
            <span className={`material-symbols-outlined !text-lg ${activeFilter === chip.label ? 'text-black' : chip.color}`}>{chip.icon}</span>
            <span className="text-[10px] uppercase tracking-widest font-black">{chip.label}</span>
          </button>
        ))}
      </div>

      {/* List Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-24 space-y-8 pt-2">
        {Object.entries(NOTIFICATIONS).map(([section, items]) => (
          <section key={section} className="animate-fadeIn">
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] whitespace-nowrap">{section}</h3>
              <div className="h-px w-full bg-white/5"></div>
            </div>
            
            <div className="space-y-4">
              {items.map((notif) => (
                <div 
                  key={notif.id}
                  className={`group relative flex items-start gap-4 rounded-[2rem] p-5 shadow-sm transition-all active:scale-[0.98] border ${notif.priority === 'high' ? 'bg-red-500/5 border-red-500/20' : 'bg-surface-dark border-white/5 hover:border-white/10'}`}
                >
                  {/* Unread Indicator */}
                  {notif.isUnread && (
                    <div className={`absolute top-5 right-5 size-2 rounded-full shadow-glow ${notif.priority === 'high' ? 'bg-red-500' : 'bg-primary'}`}></div>
                  )}

                  {/* Icon */}
                  <div className={`size-14 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-transform group-hover:scale-105 ${getIconStyles(notif.type, notif.priority)}`}>
                    <span className="material-symbols-outlined !text-3xl material-symbols-filled">{notif.icon}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pr-4">
                    <h4 className="text-white text-base font-black uppercase tracking-tight leading-tight mb-1">{notif.title}</h4>
                    <p className="text-gray-400 text-xs font-medium leading-relaxed">
                      {notif.desc}
                    </p>
                    
                    {notif.actionLabel && (
                      <button className="mt-4 px-5 py-2 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 active:scale-95 transition-all">
                        {notif.actionLabel}
                      </button>
                    )}
                    
                    <div className="mt-3 flex items-center gap-1 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                      <span className="material-symbols-outlined !text-sm">schedule</span>
                      {notif.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="flex flex-col items-center justify-center py-10 opacity-30 text-center">
          <div className="size-1 w-full max-w-[60px] bg-gray-600 rounded-full mb-4"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Bạn đã xem hết thông báo</p>
        </div>
      </main>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Notifications;
