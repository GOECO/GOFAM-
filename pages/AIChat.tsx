
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  parts: string;
}

interface Props { onBack: () => void; }

const AIChat: React.FC<Props> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', parts: 'Chào bạn! Tôi là GOFAM AI. Tôi có thể giúp gì cho nông trại của bạn hôm nay?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', parts: userMessage }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: 'Bạn là chuyên gia tư vấn nông nghiệp thông minh tích hợp trong ứng dụng GOFAM AI. Bạn hỗ trợ người nông dân về kỹ thuật canh tác, chẩn đoán sâu bệnh, và tối ưu hóa năng suất. Trả lời ngắn gọn, chuyên nghiệp, sử dụng biểu tượng cảm xúc phù hợp.',
        },
      });

      const response = await chat.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, { role: 'model', parts: response.text || "Tôi gặp chút trục trặc, bạn nói lại được không?" }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', parts: "Hệ thống AI đang bảo trì. Vui lòng thử lại sau nhé!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background-dark font-display text-white">
      {/* Header */}
      <header className="flex items-center p-4 pt-12 pb-4 bg-background-dark/90 backdrop-blur-xl border-b border-white/5 z-50">
        <button onClick={onBack} className="size-10 rounded-full bg-white/5 flex items-center justify-center active:scale-90 transition-all">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-black tracking-tight uppercase">GOFAM AI Assistant</h1>
          <div className="flex items-center justify-center gap-1.5 mt-0.5">
            <div className="size-1.5 rounded-full bg-primary animate-pulse"></div>
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Neural Link Active</span>
          </div>
        </div>
        <button className="size-10 rounded-full bg-white/5 flex items-center justify-center">
          <span className="material-symbols-outlined">auto_awesome</span>
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar pb-10">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
            <div className={`max-w-[85%] rounded-[2rem] p-5 shadow-lg relative ${
              msg.role === 'user' 
                ? 'bg-primary text-black rounded-tr-none' 
                : 'bg-surface-dark border border-white/5 text-gray-100 rounded-tl-none'
            }`}>
              {msg.role === 'model' && (
                <div className="absolute -top-3 left-4 bg-background-dark px-2 py-0.5 rounded-full border border-white/10 flex items-center gap-1">
                  <span className="material-symbols-outlined !text-[10px] text-primary">smart_toy</span>
                  <span className="text-[8px] font-black text-primary uppercase tracking-widest">Assistant</span>
                </div>
              )}
              <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.parts}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-surface-dark border border-white/5 rounded-[2rem] rounded-tl-none p-5 flex items-center gap-2">
               <div className="size-1 bg-primary rounded-full animate-bounce"></div>
               <div className="size-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
               <div className="size-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Quick Prompts */}
      {!loading && messages.length < 3 && (
        <div className="px-4 pb-4 flex gap-2 overflow-x-auto no-scrollbar">
          {['Tình hình sâu rầy?', 'Dự báo thời tiết?', 'Giá nông sản hôm nay?'].map((p) => (
            <button 
              key={p} 
              onClick={() => { setInput(p); }}
              className="shrink-0 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary hover:border-primary/40 transition-all"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-background-dark/95 border-t border-white/5 pb-10">
        <div className="max-w-md mx-auto relative flex items-end gap-2">
          <div className="flex-1 bg-surface-dark border border-white/10 rounded-3xl p-1 pr-1.5 flex items-end shadow-2xl focus-within:border-primary/50 transition-all">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Nhập câu hỏi của bạn..."
              className="w-full bg-transparent border-none focus:ring-0 p-3 text-sm font-medium resize-none max-h-32 min-h-[48px] placeholder:text-gray-500"
              rows={1}
            />
            <button className="size-10 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white mb-0.5">
              <span className="material-symbols-outlined">mic</span>
            </button>
          </div>
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="size-12 rounded-2xl bg-primary text-black flex items-center justify-center shadow-glow active:scale-90 transition-all disabled:opacity-50 disabled:shadow-none shrink-0"
          >
            <span className="material-symbols-outlined font-black">send</span>
          </button>
        </div>
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AIChat;
