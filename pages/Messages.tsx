
import React from 'react';
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
  }
];

const QUICK_ACTIONS = [
  { id: 'ai', label: 'AI Asst.', icon: 'smart_toy', bg: 'bg-primary/10', color: 'text-[#8B0000]/50', page: 'ai-chat' as Page },
  { id: 'plan', label: 'Lịch vụ', icon: 'calendar_month', bg: 'bg-blue-500/10', color: 'text-slate-500/70', page: 'tasks' as Page },
  { id: 'market', label: 'Thị trường', icon: 'monitoring', bg: 'bg-orange-500/10', color: 'text-slate-500/70', page: 'marketplace' as Page },
  { id: 'voice', label: 'H.Free', icon: 'record_voice_over', bg: 'bg-purple-500/10', color: 'text-[#8B0000]/50', page: 'live-assistant' as Page },
];

const Messages: React.FC<Props> = ({ onBack, onSelectChat, onNavigate }) => {
  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark font-display overflow-hidden">
      {/* Header */}
      <div className="flex items-center bg-white dark:bg-surface-dark p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800 shrink-0 shadow-sm">
        <button onClick={onBack} className="text-gray-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition active-scale">
          <span className="material-symbols-outlined font-black scale-[0.8]">arrow_back_ios_new</span>
        </button>
        <h2 className="text-gray-900 dark:text-white text-xl font-black leading-tight flex-1 text-center uppercase tracking-tight italic">Hộp thư <span className="text-primary not-italic">Pro</span></h2>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition active-scale">
          <span className="material-symbols-outlined scale-[0.8]">edit_square</span>
        </button>
      </div>

      {/* Quick Action Bar - Optimized Spacing */}
      <div className="bg-white dark:bg-surface-dark px-4 py-5 border-b border-gray-100 dark:border-gray-800 shrink-0">
        <div className="flex justify-center items-start gap-1">
          {QUICK_ACTIONS.map((action) => (
            <button 
              key={action.id} 
              onClick={() => onNavigate(action.page)}
              className="flex flex-col items-center gap-1.5 px-2 group active-scale transition-all"
            >
              <div className={`size-12 ${action.bg} ${action.color} rounded-2xl flex items-center justify-center transition-all shadow-sm group-hover:scale-105 border border-current/10`}>
                <span className="material-symbols-outlined !text-[26px] scale-[0.8]">{action.icon}</span>
              </div>
              <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-tighter whitespace-nowrap overflow-hidden text-ellipsis max-w-[64px]">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-white dark:bg-surface-dark">
        <div className="flex w-full items-center rounded-2xl h-11 bg-background-light dark:bg-gray-800 border border-transparent focus-within:border-primary/50 transition-all shadow-sm">
          <div className="text-text-sub-light dark:text-text-sub-dark flex items-center justify-center pl-3 pr-2">
            <span className="material-symbols-outlined !text-[20px] scale-[0.8]">search</span>
          </div>
          <input className="flex w-full bg-transparent text-gray-900 dark:text-white focus:outline-0 border-none h-full placeholder:text-gray-400 text-sm font-bold" placeholder="Tìm kiếm tin nhắn..." />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-white dark:bg-surface-dark">
        <div className="px-4 py-2 bg-gray-50 dark:bg-black/20 flex items-center gap-2">
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Danh sách trò chuyện</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800 opacity-20"></div>
        </div>

        {CHATS.map((chat) => (
          <div 
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`flex items-center gap-3 px-4 py-4 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors border-b border-gray-50 dark:border-gray-800/50 active-scale group`}
          >
            <div className="relative shrink-0 transition-transform group-hover:scale-105">
              {chat.avatar ? (
                <div className="size-14 rounded-[1.25rem] bg-cover bg-center border border-gray-100 dark:border-gray-700 shadow-sm" style={{ backgroundImage: `url("${chat.avatar}")` }}></div>
              ) : (
                <div className={`flex items-center justify-center size-14 rounded-[1.25rem] ${chat.statusColor === 'red' ? 'bg-red-100 text-[#8B0000]/80' : 'bg-blue-100 text-slate-500/70'}`}>
                  <span className="material-symbols-outlined !text-[28px] scale-[0.8]">{chat.statusColor === 'red' ? 'warning' : 'water_drop'}</span>
                </div>
              )}
              {chat.isOnline && (
                <div className="absolute -bottom-1 -right-1 size-4 bg-primary border-[3px] border-white dark:border-surface-dark rounded-full shadow-sm"></div>
              )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <p className="text-gray-900 dark:text-white text-base font-black truncate tracking-tight uppercase leading-tight">{chat.name}</p>
                <p className={`text-[11px] font-bold ${chat.unreadCount > 0 ? 'text-primary-dark font-black' : 'text-gray-400'}`}>{chat.time}</p>
              </div>
              <div className="flex items-center gap-1">
                {chat.lastMessageSender === 'Bạn' && <span className="text-[11px] font-black text-gray-400">Bạn: </span>}
                <p className={`text-sm font-medium truncate ${chat.unreadCount > 0 ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-500 dark:text-gray-400'}`}>
                  {chat.lastMessage}
                </p>
              </div>
            </div>
            {chat.unreadCount > 0 && (
              <div className="shrink-0 flex items-center justify-center size-5 rounded-full bg-primary shadow-glow">
                <span className="text-[10px] font-black text-black">{chat.unreadCount}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-slate-100 dark:border-gray-800 px-6 pb-6 flex justify-between items-center z-[60] shadow-soft">
        <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center gap-1 text-slate-400/60 active-scale group hover:text-primary transition-all">
          <span className="material-symbols-outlined !text-2xl scale-[0.8]">home</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Trang chủ</span>
        </button>
        <button onClick={() => onNavigate('areas')} className="flex flex-col items-center gap-1 text-slate-400/60 active-scale group hover:text-primary transition-all">
          <span className="material-symbols-outlined !text-2xl scale-[0.8]">agriculture</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Khu vực</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#8B0000]/50 scale-110 active-scale">
          <span className="material-symbols-outlined material-symbols-filled !text-[28px] scale-[0.8]">chat_bubble</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Nhắn tin</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1 text-slate-400/60 active-scale group hover:text-primary transition-all">
          <span className="material-symbols-outlined !text-2xl scale-[0.8]">person</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Cá nhân</span>
        </button>
      </nav>
      
      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default Messages;
