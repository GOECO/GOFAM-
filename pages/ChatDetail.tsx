
import React, { useState } from 'react';
import { Message } from '../types';

interface Props { 
  chatId: string; 
  onBack: () => void; 
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    sender: 'user1',
    senderName: 'Nguyễn Văn B',
    senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDquhD6kXOUq_Vtjiuw93zX9IHLBhiM-fjHkeo2F2y9QHB9iA3Jwc62rjBr5b__YzwhXstmFSrux4aGL5lmDxMJzY9PCAC8iXflwjn3smJaVvtXSnMr7yzHaXHiv5bDDrDLsKjiTb91g1aV2xUca3qqdebm_4pemqBOvKfN_BNB54f0IMOpVcf70950zoNsgehtAQhR5it4ZC2kCSAGm1SWetEHn0eIDj4PiNSGjso3DaWggykDrMWMX96ktr0Vt5h4KPuuoFpWaSz',
    text: 'Đã kiểm tra xong khu vực C. Độ ẩm đang giảm nhanh.',
    time: '08:31',
    isMe: false,
    type: 'text',
    reactions: [{ emoji: '👍', count: 2 }]
  },
  {
    id: 'm2',
    sender: 'user2',
    senderName: 'Lê Thị C',
    senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0sjNcORisVVJZwFABLrsE9xm-KI7A46Dk-jxPRaJ4HOVbPDOfyBCoamye25o5WV7QAEEZhzWgIkmXOZKjxU9nzxfB1SNgianwYGgko5rzVlYnSeCc6R-XLFp1EOJ6bA5NQOZSv0PnRqyYZ-a1Qo_kZ1sO3__vLuP9neLPziLe-WfSMlj4I-vINpsOgH8hLA_FQdapZOJzLS4onY1R-Y4Mcz68_9OIB80UhTMbN6VCgFWienT1gJcq7XA1IDRQqhRNqkcrHx9dNrjE',
    text: 'Có dấu hiệu nấm lá ở một số cây góc vườn.',
    time: '08:32',
    isMe: false,
    type: 'image',
    imageUri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXAgeeP7RwQbPs-Mw-KmuQcr-kfAwXzDg2TJafYaWPk1F6NqVN1ID3YmCdgVKF6AARia4JqbsYkaWJu7gpijMkk9rU1LltHJqktxufIm9mfDdWimIWb9m_wsNYhW5-tO8ar_iN3ZMjA8_mc2bGPlmcXl_XKA6jKehHKTYKapvf_fLeRIQS9h80f1NKuoxsKjpagOjqjXf2z3rnYignFcnVyfr05j7YXI78mXMzFeZpjX-9OOqbfbwR1iNObuhBbcRQ96hJEYvCppzN'
  },
  {
    id: 'm3',
    sender: 'me',
    senderName: 'Tôi',
    text: 'OK, để anh báo bên kho xuất thuốc xử lý ngay.',
    time: '09:15',
    isMe: true,
    type: 'text'
  },
  {
    id: 'm4',
    sender: 'me',
    senderName: 'Tôi',
    text: 'Tài liệu quy trình đây nhé.',
    time: '09:16',
    isMe: true,
    type: 'file',
    fileName: 'Quy_trinh_xu_ly_nam.pdf',
    fileSize: '1.2 MB'
  }
];

const ChatDetail: React.FC<Props> = ({ chatId, onBack }) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'me',
      senderName: 'Tôi',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      type: 'text'
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark font-display overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center bg-white dark:bg-surface-dark px-4 py-2 justify-between border-b border-gray-100 dark:border-gray-800 z-50">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button onClick={onBack} className="text-gray-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full -ml-2 hover:bg-gray-100 dark:hover:bg-white/5 transition">
            <span className="material-symbols-outlined font-bold">arrow_back_ios_new</span>
          </button>
          <div className="size-10 rounded-xl bg-cover bg-center border border-gray-100 dark:border-gray-700 shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAvfF0TFlG4gI9CES2-q7TiWJ67Ds5t28fb2rdCh1iYjnkUGsifn65vP8Z0igmyfKYSWqO4rKAZTPSiOLH-3jQHzIrJ8qypMCAuE9V3Ha0mT8yv2vpS-O6HwD6DPJYOGrKTDsEHNScBVCjNJiqtNCkDlupV7YcLTufDZTQvzJ7Y3kxP9BfLYU8mzy57rG2Mn4uUs5shSy7aK52E4l1LHJuA-3CGWeojUbcg7Dd3XFyskX2hVAnPcirco4jtT4cEH9AvXtkyRykExlgx")' }}></div>
          <div className="flex flex-col truncate">
            <h2 className="text-gray-900 dark:text-white text-base font-black leading-tight truncate">Đội Kỹ Thuật Farm A</h2>
            <div className="flex items-center gap-1.5">
               <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
               <p className="text-primary text-[10px] font-bold uppercase tracking-widest">8 thành viên • Online</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="flex size-10 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5">
            <span className="material-symbols-outlined">call</span>
          </button>
          <button className="flex size-10 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5">
            <span className="material-symbols-outlined">info</span>
          </button>
        </div>
      </div>

      {/* Pinned Message */}
      <div className="bg-amber-50 dark:bg-amber-900/10 px-4 py-2.5 flex items-center gap-3 border-b border-amber-100 dark:border-amber-900/30 shrink-0 z-40">
        <span className="material-symbols-outlined text-amber-600 dark:text-amber-500 text-sm rotate-45 font-bold">push_pin</span>
        <p className="text-xs font-bold text-amber-800 dark:text-amber-400 line-clamp-1 flex-1">
          Ghim: Lịch phun thuốc dời sang 15:00 do dự báo mưa lớn...
        </p>
        <span className="material-symbols-outlined text-amber-400 text-sm">chevron_right</span>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 bg-slate-50 dark:bg-black/20 no-scrollbar">
        <div className="flex justify-center my-2">
          <span className="bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">Hôm nay, 08:30</span>
        </div>

        {messages.map((msg, i) => (
          <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.isMe ? 'self-end flex-row-reverse' : 'self-start'}`}>
            {!msg.isMe && (
              <div className="size-8 rounded-full bg-cover bg-center shrink-0 self-end mb-1 border border-white dark:border-gray-800" style={{ backgroundImage: `url("${msg.senderAvatar}")` }}></div>
            )}
            <div className={`flex flex-col gap-1.5 ${msg.isMe ? 'items-end' : 'items-start'}`}>
              {!msg.isMe && <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{msg.senderName}</span>}
              
              <div className={`relative p-3.5 rounded-[1.25rem] shadow-sm ${msg.isMe ? 'bg-primary text-black rounded-br-none' : 'bg-white dark:bg-surface-dark text-gray-900 dark:text-white rounded-bl-none'}`}>
                {msg.type === 'image' && (
                  <div className="rounded-xl overflow-hidden mb-2 relative group cursor-pointer border border-black/5 dark:border-white/5">
                    <img src={msg.imageUri} className="w-full h-auto object-cover" alt="attachment" />
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[9px] px-2 py-0.5 rounded backdrop-blur-md font-black uppercase">JPG • 2MB</div>
                  </div>
                )}
                
                {msg.type === 'file' && (
                  <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 p-3 rounded-xl mb-1 border border-black/5 dark:border-white/5">
                    <div className="bg-white/80 p-2 rounded-lg text-red-500 shrink-0">
                      <span className="material-symbols-outlined !text-[24px]">description</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <p className="text-xs font-black truncate">{msg.fileName}</p>
                      <p className="text-[10px] font-bold opacity-60 uppercase">{msg.fileSize} • PDF</p>
                    </div>
                  </div>
                )}

                <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                <div className={`flex items-center gap-1 mt-1 opacity-40 ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                  <p className="text-[10px] font-bold uppercase">{msg.time}</p>
                  {msg.isMe && <span className="material-symbols-outlined !text-[12px] font-black">done_all</span>}
                </div>

                {msg.reactions && (
                  <div className="absolute -bottom-2.5 -right-2.5 bg-white dark:bg-surface-dark shadow-md rounded-full px-2 py-1 border border-gray-100 dark:border-gray-700 flex items-center gap-1 group active:scale-95 transition-transform">
                    <span className="text-xs">{msg.reactions[0].emoji}</span>
                    <span className="text-[10px] font-black text-gray-500">{msg.reactions[0].count}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="h-4"></div>
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-surface-dark px-4 pt-3 pb-8 shrink-0 border-t border-gray-100 dark:border-gray-800 z-50">
        <div className="flex items-end gap-3 max-w-md mx-auto">
          <button className="text-gray-400 hover:text-primary transition-colors mb-2">
            <span className="material-symbols-outlined !text-[28px]">add_circle</span>
          </button>
          <div className="flex-1 bg-gray-50 dark:bg-black/20 rounded-[24px] px-4 py-2 min-h-[44px] flex items-center border border-gray-100 dark:border-gray-800 focus-within:border-primary/50 transition-colors">
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
              className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm resize-none max-h-24 text-gray-900 dark:text-white placeholder:text-gray-400 font-medium" 
              placeholder="Nhập tin nhắn..." 
              rows={1}
            />
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 ml-2">
              <span className="material-symbols-outlined !text-[24px]">sentiment_satisfied</span>
            </button>
          </div>
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="bg-primary hover:bg-primary-dark text-black rounded-full size-11 flex items-center justify-center shrink-0 transition-all shadow-glow active:scale-90 disabled:opacity-50 disabled:shadow-none"
          >
            <span className="material-symbols-outlined font-black">send</span>
          </button>
        </div>
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ChatDetail;
