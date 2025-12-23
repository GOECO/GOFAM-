
import React, { useState, useRef } from 'react';
import { DiagnosisResult } from '../types';
import { GoogleGenAI } from "@google/genai";

interface Props { data: DiagnosisResult; onBack: () => void; onDone: () => void; onFindNearby?: () => void; }

const Diagnosis: React.FC<Props> = ({ data, onBack, onDone, onFindNearby }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  if (!data) return null;

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isTyping) return;
    
    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `Bạn là một chuyên gia nông nghiệp GOFAM. Bạn đang hỗ trợ nông dân xử lý bệnh: ${data.diseaseName}. Hãy trả lời ngắn gọn, chuyên nghiệp và thực tế.`,
        }
      });

      const response = await chat.sendMessage({ message: userMsg });
      setChatHistory(prev => [...prev, { role: 'model', text: response.text || "Xin lỗi, tôi không thể trả lời lúc này." }]);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setIsTyping(false);
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold">Kết quả Chẩn đoán</h2>
        <button className="size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center">
          <span className="material-symbols-outlined">share</span>
        </button>
      </header>

      <div className="relative w-full aspect-[4/3] bg-gray-200">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR-WvbAqLIrAZD44hkCuSYDWA7YDEOt0NIfBs2O37_zVpjkdXfn0lJ-uRTUFPeX0s90FbA3Rdq1E93tzSS8WncRFZEWLYpopbHXOZftctRN8TgEcb0i8f_mX6pfJZV1HKtOzDN0fOaKg_sAhrrglk8S_drnHOgN8MELlbSSzOWmO5K3sdynqgXhMfD4VIAHTtX646ft4QO3iAYrYzmx3v5hVSfBNVETO7VDY-Hp0A8coL9z1uH4qNhAVBCzcjs-Xe-g7lyc2HGokF6" className="w-full h-full object-cover" alt="Disease" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">Nguy hiểm</span>
            <h1 className="text-white text-3xl font-bold mt-1">{data.diseaseName}</h1>
            <p className="text-gray-300 italic font-medium text-sm mt-0.5">{data.scientificName}</p>
          </div>
          <div className="text-right text-white">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Độ tin cậy</p>
            <p className="text-2xl font-bold text-primary">{data.confidence}%</p>
          </div>
        </div>
      </div>

      <main className="p-4 space-y-4">
        <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
             <div className="size-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
               <span className="material-symbols-outlined">biotech</span>
             </div>
             <h3 className="font-bold dark:text-white">Phân tích nguyên nhân</h3>
          </div>
          <ul className="space-y-2">
            {data.causes.map((cause, i) => (
              <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                <span className="text-primary">•</span> {cause}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
             <div className="size-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
               <span className="material-symbols-outlined">medical_services</span>
             </div>
             <h3 className="font-bold dark:text-white">Phác đồ xử lý</h3>
          </div>
          
          <div className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl">
            <p className="text-[10px] font-bold text-red-600 uppercase mb-2">Giai đoạn khẩn cấp</p>
            <ul className="space-y-1.5">
              {data.protocol.urgent.map((p, i) => (
                <li key={i} className="text-xs text-gray-700 dark:text-gray-300 font-medium flex gap-2">
                  <span className="font-bold">{i+1}.</span> {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-xl">
            <p className="text-[10px] font-bold text-green-600 uppercase mb-2">Phòng ngừa hữu cơ</p>
            <ul className="space-y-1.5">
              {data.protocol.safe.map((p, i) => (
                <li key={i} className="text-xs text-gray-700 dark:text-gray-300 font-medium flex gap-2">
                  <span className="font-bold">{i+1}.</span> {p}
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-full h-12 bg-slate-900 text-white dark:bg-white dark:text-black rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"
          >
            <span className="material-symbols-outlined !text-primary">auto_awesome</span>
            Tư vấn chi tiết với AI Expert
          </button>

          <button 
            onClick={onFindNearby}
            className="w-full h-12 bg-primary/10 border border-primary/30 text-primary-dark dark:text-primary rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">location_on</span>
            Tìm nơi mua thuốc gần nhất
          </button>
        </div>
      </main>

      {/* CHAT INTERFACE */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-surface-dark rounded-t-[2.5rem] shadow-2xl h-[80vh] flex flex-col animate-[slideUp_0.3s_ease-out]">
            <header className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">auto_awesome</span>
                </div>
                <div>
                  <h3 className="font-bold dark:text-white leading-none">Chuyên gia GOFAM</h3>
                  <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Đang trực tuyến</span>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="size-8 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-2xl rounded-tl-none bg-gray-100 dark:bg-white/5 text-sm dark:text-white">
                  Chào bạn! Tôi đã phân tích kết quả <b>{data.diseaseName}</b>. Bạn có thắc mắc gì về phác đồ điều trị không?
                </div>
              </div>
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-primary text-black rounded-tr-none font-medium' 
                      : 'bg-gray-100 dark:bg-white/5 text-sm dark:text-white rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-gray-100 dark:bg-white/5 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                     <span className="size-1.5 rounded-full bg-primary animate-bounce"></span>
                     <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
                     <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
                   </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 pb-8 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-background-dark/50">
              <div className="relative">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Hỏi chuyên gia về cách xử lý..."
                  className="w-full h-12 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl pl-4 pr-12 text-sm focus:ring-1 focus:ring-primary outline-none dark:text-white"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isTyping}
                  className="absolute right-1.5 top-1.5 size-9 bg-primary text-black rounded-lg flex items-center justify-center shadow-md active:scale-90 transition-transform disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 z-50 pb-6 flex gap-3">
        <button onClick={onBack} className="flex-1 h-14 bg-gray-100 dark:bg-white/5 rounded-2xl font-bold flex items-center justify-center">Làm lại</button>
        <button onClick={onDone} className="flex-[2] h-14 bg-primary hover:bg-primary-dark text-black rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">save</span>
          Lưu & Tạo việc
        </button>
      </div>

      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Diagnosis;
