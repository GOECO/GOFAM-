
import React, { useState, useRef, useEffect } from 'react';
import { Message, Page } from '../types';
import { GoogleGenAI } from "@google/genai";

interface Props { 
  chatId: string; 
  onBack: () => void; 
  onNavigate: (page: Page) => void;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    sender: 'user1',
    senderName: 'Nguyễn Văn B',
    senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDquhD6kXOUq_Vtjiuw93zX9IHLBhiM-fjHkeo2F2y9QHB9iA3Jwc62rjBr5b__YzwhXstmFSrux4aGL5lmDxMJzY9PCAC8iXflwjn3smJaVvtXSnMr7yzHaXHiv5bDDrDLsKjiTb91g1aV2xUca3qqdebm_4pemqBOvKfN_BNB54f0IMOpVcf70950zoNsgehtAQhR5it4ZC2kCSAGm1SWetEHn0eIDj4PiNSGjso3DaWggykDrMWMX96ktr0Vt5h4KPuuoFpWaSz',
    text: 'Chào bạn, khu vực A đã hoàn thành chu kỳ tưới sáng nay.',
    time: '08:31',
    isMe: false,
    type: 'text'
  }
];

const ChatDetail: React.FC<Props> = ({ chatId, onBack, onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return;

    const userText = inputText.trim();
    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: 'me',
      senderName: 'Tôi',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      type: 'text'
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Bạn là trợ lý nông nghiệp chuyên nghiệp của GOFAM Pro. Trả lời ngắn gọn, thân thiện (dưới 40 từ) bằng tiếng Việt. Câu hỏi: ${userText}`,
      });

      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        senderName: 'GOFAM AI',
        text: model.text || "Xin lỗi, tôi đang bận xử lý dữ liệu.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
        type: 'text'
      };

      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark font-display overflow-hidden">
      {/* Header */}
      <div className="flex items-center bg-white dark:bg-surface-dark px-4 py-3 justify-between border-b border-gray-100 dark:border-gray-800 z-50 shadow-sm">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button onClick={onBack} className="text-gray-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5 active-scale">
            <span className="material-symbols-outlined font-bold">arrow_back_ios_new</span>
          </button>
          <div className="size-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary-dark shadow-sm">
            <span className="material-symbols-outlined !text-2xl material-symbols-filled">smart_toy</span>
          </div>
          <div className="flex flex-col truncate">
            <h2 className="text-gray-900 dark:text-white text-base font-bold truncate tracking-tight uppercase">GOFAM AI Consultant</h2>
            <div className="flex items-center gap-1.5">
               <span className="size-2 rounded-full bg-primary animate-pulse"></span>
               <p className="text-primary-dark text-[10px] font-black uppercase tracking-widest">Trực tuyến</p>
            </div>
          </div>
        </div>
        <button onClick={() => onNavigate('live-assistant')} className="size-10 rounded-full bg-primary/10 text-primary-dark flex items-center justify-center active-scale">
          <span className="material-symbols-outlined !text-2xl animate-pulse">mic</span>
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 no-scrollbar bg-slate-50 dark:bg-black/10">
        <div className="flex justify-center mb-2">
          <span className="bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Hôm nay, {new Date().toLocaleDateString('vi-VN')}</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.isMe ? 'self-end flex-row-reverse' : 'self-start'} animate-fadeIn`}>
            {!msg.isMe && (
              <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary-dark shrink-0 self-end mb-1 border border-white dark:border-gray-800">
                <span className="material-symbols-outlined !text-xl">smart_toy</span>
              </div>
            )}
            <div className={`flex flex-col gap-1.5 ${msg.isMe ? 'items-end' : 'items-start'}`}>
              <div className={`relative p-4 rounded-[1.5rem] shadow-sm ${msg.isMe ? 'bg-primary text-black rounded-br-none' : 'bg-white dark:bg-surface-dark text-gray-900 dark:text-white rounded-bl-none border border-gray-100 dark:border-gray-800'}`}>
                <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                <div className={`flex items-center gap-1 mt-2 opacity-40 ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                  <p className="text-[9px] font-black uppercase tracking-widest">{msg.time}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start items-center gap-2 p-3 opacity-50">
            <div className="size-1.5 bg-primary rounded-full animate-bounce"></div>
            <div className="size-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="size-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-surface-dark px-4 pt-3 pb-8 shrink-0 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-end gap-3 max-w-md mx-auto">
          <div className="flex-1 bg-gray-50 dark:bg-black/30 rounded-[20px] px-4 py-2 min-h-[48px] flex items-center border border-gray-100 dark:border-gray-800 focus-within:border-primary transition-all">
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
              className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm resize-none max-h-24 text-gray-900 dark:text-white placeholder:text-gray-400 font-medium leading-relaxed" 
              placeholder="Hỏi AI về kỹ thuật nông nghiệp..." 
              rows={1}
            />
          </div>
          <button 
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
            className="bg-primary text-black rounded-2xl size-12 flex items-center justify-center shrink-0 shadow-glow active-scale disabled:opacity-50"
          >
            <span className="material-symbols-outlined font-black">send</span>
          </button>
        </div>
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ChatDetail;
