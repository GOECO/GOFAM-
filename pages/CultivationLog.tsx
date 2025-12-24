
import React, { useState } from 'react';
import { Page } from '../types';

interface Props { onBack: () => void; onNavigate: (page: Page) => void; }

interface LogEntry {
  id: string;
  time: string;
  title: string;
  area: string;
  type: 'irrigation' | 'pest' | 'harvest' | 'trimming' | 'fertilizer';
  executor?: string;
  executorAvatar?: string;
  cost?: string;
  materials?: { name: string; qty: string; color: string }[];
  notes?: string;
  media?: string[];
  isAutomation?: boolean;
  summary?: string;
}

interface DateGroup {
  date: string;
  entries: LogEntry[];
}

const LOG_DATA: DateGroup[] = [
  {
    date: 'Hôm nay, 24/10',
    entries: [
      {
        id: 'l1',
        time: '08:30',
        title: 'Tưới nhỏ giọt & Bón phân',
        area: 'Khu A (Vườn Ổi)',
        type: 'irrigation',
        isAutomation: true,
        executor: 'Nguyễn Văn A',
        executorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRfXsyQ9VIx-Zz6XIDVzH2ITsx3e-KW_wRN8nvCrceIupP7UGe2wtvjCuCaHqSrLwMGJvRVFxp8nrPrwuenSUFTb5q2GSjX-mBeCbRll5DPpaTn_SwzmSxztg8lskBRWj43fAWpVLzsGkGOtYVeiUDyjhtxhQbI7et9YFPWQ1b7LIdpUatoIgvPBL2kiFVgHa0D0ede6PxxAHUbprNrlfGLaSUdr_Z9wFlWTMqdDm0TD0K7cpHCwDV4SRub-43kZlts8XSWVpOdhIn',
        cost: '1.200.000đ',
        materials: [
          { name: 'NPK 20-20-15 (50kg)', qty: '50kg', color: 'bg-primary' },
          { name: 'Humic Acid (5L)', qty: '5L', color: 'bg-blue-500' }
        ],
        notes: 'Tưới kết hợp bón thúc đợt 2. Hệ thống hoạt động ổn định, áp suất đầu ra đạt 2.5 bar.',
        media: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBfq0pr716IFJuuFebfgdT8iu7jP95yEJK-zVJaFd47en16qX-OezsWCdhVv3nTHU2UOMoIOvGBE50nKxqFE8eaJ34D5kUGgwD6aZVxrLposBUpZXGycgW8vz-ty10kPZaVoOHuSi-EX6tyi1UCC19vXoU0CJnPbNrvK-B5zyrnvr1bJybXD684rX2W7L2VFsLBvf4-rl2Chk5G-FL5pjBxGiaGWkUCIOYcMbnC2ujoQSVqwfeZeFiBZmP19F2lT5SkF1unrO5MxRb8',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDQiQpYtytDDg8cn8v-_reaM0ajWTZ7p3kALtiAyiZZbMSsb7Pys0p4XM7o67I4xqzSokpPl5EENgaDdgC22rvETjhlqNl03J0GG2X8IfMAcnBr7qQiRLfsVZCNMJbExTTm3QrdfjO97gIkNCx0TF1Luf844hMHMJ62mSDz-anuSjTYnL8cMlppAXgBEVPNmLWt5AgYiELOrF232Fi4VEtActVY9xy8ixBnZtaDyD7_tOLHm4HzvTeCnM12AVfc9BbQroDAsu210nyz'
        ]
      },
      {
        id: 'l2',
        time: '10:15',
        title: 'Kiểm tra sâu bệnh',
        area: 'Khu B (Vườn Cam)',
        type: 'pest',
        summary: 'Phát hiện rệp sáp mật độ thấp.'
      },
      {
        id: 'l3',
        time: '14:00',
        title: 'Thu hoạch Đợt 1',
        area: 'Khu C',
        type: 'harvest',
        summary: '250kg • 5 nhân công'
      }
    ]
  },
  {
    date: 'Hôm qua, 23/10',
    entries: [
      {
        id: 'l4',
        time: '16:45',
        title: 'Cắt tỉa cành',
        area: 'Toàn bộ trang trại',
        type: 'trimming',
        summary: 'Lê Văn B • Vệ sinh sau thu hoạch'
      }
    ]
  }
];

const CultivationLog: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [expandedId, setExpandedId] = useState<string | null>('l1');

  const getIcon = (type: string) => {
    switch (type) {
      case 'irrigation': return 'water_drop';
      case 'pest': return 'bug_report';
      case 'harvest': return 'inventory_2';
      case 'trimming': return 'spa';
      default: return 'event_note';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'irrigation': return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300';
      case 'pest': return 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300';
      case 'harvest': return 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300';
      case 'trimming': return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-slate-100 text-slate-600 dark:bg-slate-800';
    }
  };

  const handleShareLog = (entry: LogEntry, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Đã chuẩn bị nhật ký "${entry.title}" để chia sẻ với đồng đội.`);
    onNavigate('messages');
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-white transition-colors duration-200 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-2xl font-bold">arrow_back</span>
          </button>
          <h1 className="text-lg font-black leading-tight tracking-tight text-center flex-1 px-2 uppercase truncate">
            Nhật ký Canh tác
          </h1>
          <div className="flex items-center gap-1">
            <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative">
              <span className="material-symbols-outlined">filter_list</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white dark:border-background-dark"></span>
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar snap-x">
          <button className="snap-start flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-primary text-black font-black px-5 shadow-sm active:scale-95 transition-all">
            <span className="text-[10px] uppercase tracking-widest">Tất cả</span>
          </button>
          {['Khu vực', 'Hoạt động', 'Thời gian', 'Người làm'].map((filter) => (
            <button key={filter} className="snap-start flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 px-4 transition-all active:scale-95 shadow-sm">
              <span className="text-slate-600 dark:text-gray-300 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">{filter}</span>
              <span className="material-symbols-outlined !text-sm text-gray-400">keyboard_arrow_down</span>
            </button>
          ))}
        </div>
      </header>

      {/* Summary Strip */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-surface-dark p-4 border border-gray-50 dark:border-gray-800 shadow-sm transition-colors">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hoạt động hôm nay</span>
            <span className="text-xl font-black dark:text-white">12 <span className="text-xs font-bold text-gray-500 uppercase">tác vụ</span></span>
          </div>
          <div className="h-10 w-px bg-gray-100 dark:bg-gray-800 mx-2"></div>
          <div className="flex flex-col items-end text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng chi phí dự tính</span>
            <span className="text-xl font-black dark:text-white">1.750.000<span className="text-xs font-bold text-gray-500 uppercase ml-0.5">đ</span></span>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <main className="px-4 flex flex-col pt-4">
        {LOG_DATA.map((group, gidx) => (
          <div key={gidx} className="flex flex-col mb-4">
            <div className="flex items-center gap-4 py-4">
              <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">{group.date}</h3>
              <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800"></div>
            </div>

            <div className="relative flex flex-col gap-8 pl-1">
              {/* Vertical Track Line */}
              <div className="absolute left-[23px] top-4 bottom-0 w-0.5 bg-slate-100 dark:bg-gray-800 rounded-full z-0 opacity-60"></div>

              {group.entries.map((entry) => {
                const isExpanded = expandedId === entry.id;
                return (
                  <div key={entry.id} className="relative z-10 grid grid-cols-[48px_1fr] gap-x-4">
                    {/* Time & Icon */}
                    <div className="flex flex-col items-center gap-2 pt-1.5">
                      <span className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">{entry.time}</span>
                      <div className={`flex size-10 shrink-0 items-center justify-center rounded-2xl border-2 border-white dark:border-background-dark shadow-md transition-all ${getIconColor(entry.type)}`}>
                        <span className="material-symbols-outlined !text-xl font-black">{getIcon(entry.type)}</span>
                      </div>
                    </div>

                    {/* Card */}
                    <div 
                      onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                      className={`flex flex-col rounded-[2.5rem] bg-white dark:bg-surface-dark border transition-all duration-300 cursor-pointer ${isExpanded ? 'p-6 shadow-xl border-primary/20 ring-1 ring-primary/10' : 'p-5 shadow-sm border-gray-100 dark:border-gray-800 active:scale-[0.98]'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight truncate pr-4">{entry.title}</h4>
                            <button 
                              onClick={(e) => handleShareLog(entry, e)}
                              className="size-8 shrink-0 rounded-full bg-slate-100 dark:bg-gray-800 text-gray-400 hover:text-primary transition-all flex items-center justify-center"
                            >
                              <span className="material-symbols-outlined !text-base">share</span>
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="inline-flex items-center rounded-lg bg-slate-100 dark:bg-gray-800 px-2.5 py-1 text-[9px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-widest">
                                {entry.area}
                            </span>
                            {entry.isAutomation && <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">• Tự động hóa</span>}
                          </div>
                        </div>
                      </div>

                      {/* Collapsed Preview */}
                      {!isExpanded && entry.summary && (
                        <p className="text-xs text-slate-500 dark:text-gray-400 font-medium mt-3 italic">
                          {entry.summary}
                        </p>
                      )}

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="animate-[fadeIn_0.3s_ease-out] mt-6 pt-6 border-t border-dashed border-slate-100 dark:border-gray-800 space-y-6">
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-black mb-2">Người thực hiện</p>
                              <div className="flex items-center gap-2.5">
                                <div className="size-6 rounded-full bg-slate-200 dark:bg-gray-700 overflow-hidden shadow-sm ring-1 ring-white dark:ring-gray-600">
                                  <img className="size-full object-cover" src={entry.executorAvatar} alt="avatar" />
                                </div>
                                <p className="text-xs font-black text-slate-700 dark:text-gray-200 uppercase truncate">{entry.executor}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-black mb-2">Chi phí</p>
                              <p className="text-base font-black text-primary tracking-tight">{entry.cost}</p>
                            </div>
                          </div>

                          {entry.materials && (
                            <div className="space-y-3">
                              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-black">Vật tư sử dụng</p>
                              <div className="flex flex-wrap gap-2">
                                {entry.materials.map((m, i) => (
                                  <span key={i} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-gray-200 bg-slate-50 dark:bg-black/20 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-gray-800">
                                    <span className={`size-2 rounded-full ${m.color}`}></span>
                                    {m.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {entry.notes && (
                            <div className="bg-slate-50 dark:bg-black/20 rounded-2xl p-4 border border-slate-50 dark:border-gray-800/50">
                              <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] block mb-2">Ghi chú vận hành</span>
                              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed font-medium italic">
                                {entry.notes}
                              </p>
                            </div>
                          )}

                          {entry.media && (
                            <div className="flex gap-2 overflow-x-auto no-scrollbar pt-1">
                              {entry.media.map((url, i) => (
                                <div key={i} className="shrink-0 size-20 rounded-2xl bg-slate-100 dark:bg-gray-800 overflow-hidden relative group border border-slate-100 dark:border-gray-700 shadow-sm active:scale-95 transition-transform">
                                  <img className="size-full object-cover group-hover:scale-110 transition-transform duration-500" src={url} alt="Log media" />
                                </div>
                              ))}
                              <div className="shrink-0 size-20 rounded-2xl bg-slate-50 dark:bg-black/20 border-2 border-dashed border-slate-200 dark:border-gray-800 flex items-center justify-center text-slate-400 active:scale-95 transition-all">
                                <span className="material-symbols-outlined text-2xl">add_a_photo</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </main>

      {/* FAB */}
      <div className="fixed bottom-24 right-6 z-[60]">
        <button className="group flex items-center justify-center rounded-2xl bg-primary text-black shadow-xl shadow-primary/30 h-14 w-14 hover:w-auto hover:px-6 transition-all duration-500 overflow-hidden active:scale-90 border-4 border-white dark:border-surface-dark">
          <span className="material-symbols-outlined text-3xl font-black shrink-0 group-hover:rotate-90 transition-transform duration-300">add</span>
          <span className="whitespace-nowrap w-0 group-hover:w-auto opacity-0 group-hover:opacity-100 transition-all font-black text-xs uppercase tracking-widest ml-0 group-hover:ml-2">Ghi chép nhanh</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-slate-100 dark:border-gray-800 px-6 h-20 pb-6 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-colors">
        <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center gap-1.5 text-slate-400 group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">home</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Trang chủ</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-primary scale-110 relative">
          <span className="material-symbols-outlined material-symbols-filled !text-[28px]">book_2</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Nhật ký</span>
          <span className="absolute -top-1 -right-1 size-2 bg-red-500 rounded-full border-2 border-white dark:border-surface-dark shadow-sm"></span>
        </button>
        <button onClick={() => onNavigate('virtual-farm')} className="flex flex-col items-center gap-1.5 text-slate-400 group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">sensors</span>
          <span className="text-[9px] font-black uppercase tracking-widest">IoT Farm</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1.5 text-slate-400 group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">account_circle</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Tài khoản</span>
        </button>
      </nav>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default CultivationLog;
