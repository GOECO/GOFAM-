
import React, { useState } from 'react';
import { Page, ChatThread } from '../types';

interface Props { 
  onBack: () => void; 
  onSelectChat: (id: string) => void;
  onNavigate: (page: Page) => void;
}

const CHATS: ChatThread[] = [
  {
    id: '1',
    name: 'Đội Kỹ Thuật Farm A',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7Gkm9f8QGU7aYOzZLbUtdUTWaAOJQFK3S9-Gl4xCi2Jb3wri2_YepKSNhszWaSwrgbERSxDe7GaISAyLvvU2ydM3aHIH43OznljEHPzkhBSM6D5MVnMMaK-kWeAVz2t_RR3ajPwcngXxCmLqnzj6AxDvcj3CcuE3CHizV60m-rMnHhqUInUGJ8MKdry8fcFPtFPqvqSbXtLUsOl3AK3zmmvPzDc9dwJwf_9oWNxWQLgy9pg9W08BozHrPqnu7AVxrwJNazG4jTHUJ',
    lastMessage: 'Đã cập nhật lịch phun thuốc mới...',
    lastMessageSender: 'Bạn',
    time: '09:30',
    unreadCount: 3,
    isGroup: true,
    isImportant: true,
    statusColor: 'primary',
    isOnline: true
  },
  {
    id: '2',
    name: 'Cảnh báo: Khu vực C',
    lastMessage: 'Độ ẩm đất giảm dưới ngưỡng 40%. Kiểm tra ngay.',
    lastMessageSender: 'IoT Sensor',
    time: '10:05',
    unreadCount: 0,
    isGroup: false,
    isImportant: true,
    statusColor: 'red'
  },
  {
    id: '3',
    name: 'Tiến sĩ Nông nghiệp (Tư vấn)',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4MroKMfNarNExsyg4sCvirZjtIJPB_MLlrm4ue6Fdsb5IfkedOd3jmNeoHqqXhL8pDqfhlGZet0NU6NKmfpYDPyCriJhbHO1LLQri65_mMZWeKqmyDdfHUM7t12-CQvEN14J3htnfHsMHY1DZNRjBLbvs7pq1ZR3RynXnjPkuVfUZv6jVj24PsYMgq1Q4BEFWdjhnK3EGc1FL4aPruZkXEX3X-_29GKhxpSz4GQbHnc0IhrnY1FvFGlF2wGT0uZi9z0_dUfA4pqXF',
    lastMessage: 'Cảm ơn bác, cháu sẽ gửi mẫu đất ngay trong chiều nay.',
    lastMessageSender: 'Tiến sĩ',
    time: 'Hôm qua',
    unreadCount: 0,
    isGroup: false,
    isOnline: false
  },
  {
    id: '4',
    name: 'Nguyễn Thị Mơ (Kho)',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjbOe_L1hUU7bSSyln-bWgyLMrXi2G_wCb0AC1RdphMFYtjoCmW8Js2jhkM5vuM91mnS4kSJcZdLjlyvtzMrHVRVnJsbYi4nhqGteYcxGdEGSJ5T3AAaLwnzwp9TV9ntOPQMnEIRvOEgdkbKyiJhz_Od-99fmZAWwV6OsXPX01camMiwHWBBKSbWSfLecCqE7GGE-2bWaCJ31ME5OINhvFc927FT17WUqwHp3m2b3uwqV6ISMPHmSEs9l8XMsoCRL0GbvEdNtF3yZd',
    lastMessage: 'Đã nhập 500kg phân bón hữu cơ loại mới.',
    lastMessageSender: 'Kho',
    time: 'Thứ 2',
    unreadCount: 0,
    isGroup: false,
    isOnline: true
  },
  {
    id: '5',
    name: 'Hệ thống tưới tiêu',
    lastMessage: 'Báo cáo tuần: Tiết kiệm 15% nước so với tuần trước.',
    lastMessageSender: 'System',
    time: 'Thứ 2',
    unreadCount: 0,
    isGroup: true,
    statusColor: 'transparent'
  }
];

const Messages: React.FC<Props> = ({ onBack, onSelectChat, onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Header */}
      <div className="flex items-center bg-white dark:bg-surface-dark p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="text-gray-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <span className="material-symbols-outlined font-bold">arrow_back_ios_new</span>
        </button>
        <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight flex-1 text-center">Nhắn tin nhóm</h2>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition">
          <span className="material-symbols-outlined">edit_square</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-white dark:bg-surface-dark">
        <div className="flex w-full items-center rounded-xl h-11 bg-background-light dark:bg-gray-800 border border-transparent focus-within:border-primary/50 transition-all">
          <div className="text-text-sub-light dark:text-text-sub-dark flex items-center justify-center pl-3 pr-2">
            <span className="material-symbols-outlined !text-[20px]">search</span>
          </div>
          <input className="flex w-full bg-transparent text-gray-900 dark:text-white focus:outline-0 border-none h-full placeholder:text-gray-400 text-sm font-medium" placeholder="Tìm kiếm nhóm, tin nhắn..." />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 px-4 py-2 overflow-x-auto no-scrollbar bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800 shrink-0">
        {['Tất cả', 'Chưa đọc', 'Kỹ thuật', 'Cảnh báo'].map((filter) => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex h-8 shrink-0 items-center justify-center px-5 rounded-full transition-all text-xs font-bold ${activeFilter === filter ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-white dark:bg-surface-dark">
        {/* Important Section */}
        <div className="px-4 py-3 bg-gray-50 dark:bg-black/20">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Quan trọng</p>
        </div>

        {CHATS.filter(c => c.isImportant).map((chat) => (
          <div 
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer border-l-4 transition-colors ${chat.statusColor === 'red' ? 'border-red-500' : 'border-primary'}`}
          >
            <div className="relative shrink-0">
              {chat.avatar ? (
                <div className="size-12 rounded-2xl bg-cover bg-center border border-gray-100 dark:border-gray-700 shadow-sm" style={{ backgroundImage: `url("${chat.avatar}")` }}></div>
              ) : (
                <div className={`flex items-center justify-center size-12 rounded-2xl ${chat.statusColor === 'red' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                  <span className="material-symbols-outlined !text-[24px]">{chat.statusColor === 'red' ? 'warning' : 'water_drop'}</span>
                </div>
              )}
              {chat.isOnline && (
                <div className="absolute -bottom-1 -right-1 size-3.5 bg-primary border-2 border-white dark:border-surface-dark rounded-full"></div>
              )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <p className="text-gray-900 dark:text-white text-sm font-black truncate tracking-tight">{chat.name}</p>
                <p className={`text-[10px] font-bold ${chat.unreadCount > 0 ? 'text-primary' : 'text-gray-400'}`}>{chat.time}</p>
              </div>
              <div className="flex items-center gap-1">
                {chat.lastMessageSender === 'Bạn' && <span className="text-[10px] font-black text-gray-400">Bạn: </span>}
                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium truncate">{chat.lastMessage}</p>
              </div>
            </div>
            {chat.unreadCount > 0 && (
              <div className="shrink-0 flex items-center justify-center size-5 rounded-full bg-primary shadow-glow">
                <span className="text-[10px] font-black text-black">{chat.unreadCount}</span>
              </div>
            )}
          </div>
        ))}

        {/* Recent Section */}
        <div className="px-4 py-3 bg-gray-50 dark:bg-black/20">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Gần đây</p>
        </div>

        {CHATS.filter(c => !c.isImportant).map((chat) => (
          <div 
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer border-l-4 border-transparent transition-colors"
          >
            <div className="relative shrink-0">
              {chat.avatar ? (
                <div className="size-12 rounded-2xl bg-cover bg-center border border-gray-100 dark:border-gray-700" style={{ backgroundImage: `url("${chat.avatar}")` }}></div>
              ) : (
                <div className="flex items-center justify-center size-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-500">
                  <span className="material-symbols-outlined !text-[24px]">water_drop</span>
                </div>
              )}
              {chat.isOnline && (
                <div className="absolute -bottom-1 -right-1 size-3.5 bg-primary border-2 border-white dark:border-surface-dark rounded-full"></div>
              )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <p className="text-gray-900 dark:text-white text-sm font-black truncate tracking-tight">{chat.name}</p>
                <p className="text-[10px] font-bold text-gray-400">{chat.time}</p>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-medium truncate">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Footer */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-slate-100 dark:border-gray-800 px-6 pb-6 flex justify-between items-center z-[60] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center gap-1.5 text-slate-400 group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">home</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Home</span>
        </button>
        <button onClick={() => onNavigate('areas')} className="flex flex-col items-center gap-1.5 text-slate-400 group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">agriculture</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Farm</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-primary scale-110">
          <span className="material-symbols-outlined material-symbols-filled !text-[28px]">chat_bubble</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Tin nhắn</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1.5 text-slate-400 group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">person</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Cá nhân</span>
        </button>
      </nav>

      <style>{`
        .shadow-glow { box-shadow: 0 0 10px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Messages;
