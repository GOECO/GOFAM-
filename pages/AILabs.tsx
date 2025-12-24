
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Props { onBack: () => void; }

const AILabs: React.FC<Props> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleRequestFeature = async () => {
    if (!prompt.trim() || isThinking) return;
    setIsThinking(true);
    setResponse(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const res = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Bạn là kiến trúc sư hệ thống GOFAM AI Pro. Người dùng muốn thêm một tính năng mới vào hệ thống quản lý nông trại của họ: "${prompt}". 
        Hãy phân tích tính khả thi, mô tả cách tính năng này hoạt động với IoT và AI, và đưa ra một bản phác thảo kỹ thuật ngắn gọn. Trả lời bằng tiếng Việt, chuyên nghiệp và đầy cảm hứng.`,
      });
      setResponse(res.text || "Xin lỗi, hiện tại không thể phân tích tính năng này.");
    } catch (err) {
      setResponse("Lỗi kết nối với lõi AI. Vui lòng thử lại.");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-white font-display p-6 pb-24">
      <header className="flex items-center justify-between mb-10">
        <button onClick={onBack} className="size-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-all">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="text-center">
          <h1 className="text-xl font-black uppercase tracking-tight">AI Labs Store</h1>
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Add New Feature</p>
        </div>
        <div className="size-12"></div>
      </header>

      <div className="space-y-8 max-w-md mx-auto">
        <div className="bg-gradient-to-br from-primary/20 to-transparent p-8 rounded-[3rem] border border-primary/20 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 size-40 bg-primary/20 blur-3xl opacity-50"></div>
          <span className="material-symbols-outlined !text-5xl text-primary mb-6 animate-pulse">neurology</span>
          <h2 className="text-2xl font-black tracking-tight mb-4 uppercase">Mở rộng sức mạnh trang trại của bạn</h2>
          <p className="text-sm text-gray-400 leading-relaxed font-medium">Bạn muốn một tính năng mới? AI Labs cho phép bạn yêu cầu các mô-đun tùy chỉnh dựa trên nhu cầu canh tác đặc thù của mình.</p>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-2">Mô tả tính năng mơ ước của bạn</label>
          <div className="relative">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="VD: Dự báo sản lượng lúa dựa trên mực nước sông Mekong..."
              className="w-full h-32 bg-white/5 border border-white/10 rounded-3xl p-5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none placeholder:text-white/20"
            />
            <button 
              onClick={handleRequestFeature}
              disabled={isThinking || !prompt.trim()}
              className="absolute bottom-4 right-4 size-12 bg-primary text-black rounded-2xl flex items-center justify-center shadow-glow active:scale-90 disabled:opacity-50 transition-all"
            >
              <span className="material-symbols-outlined !text-2xl">{isThinking ? 'sync' : 'auto_awesome'}</span>
            </button>
          </div>
        </div>

        {isThinking && (
          <div className="flex flex-col items-center py-10 gap-4 animate-pulse">
            <div className="size-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
            <p className="text-[10px] font-black text-primary uppercase tracking-widest">Kiến trúc sư AI đang phác thảo...</p>
          </div>
        )}

        {response && (
          <div className="bg-white/5 rounded-[2.5rem] p-6 border border-white/10 animate-[fadeIn_0.5s_ease-out]">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined !text-lg">architecture</span>
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest">Phân tích khả thi</h3>
            </div>
            <div className="prose prose-invert text-sm leading-relaxed text-gray-300 font-medium whitespace-pre-wrap">
              {response}
            </div>
            <button className="w-full mt-8 h-14 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">
              Bắt đầu lập trình module này
            </button>
          </div>
        )}

        <div className="pt-4">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 pl-2">Gợi ý tính năng</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Carbon Tracking', 'Drone Swarm Control', 'Market Price Prediction', 'Soil Recovery AI'].map((f) => (
              <button key={f} className="p-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-left hover:border-primary/40 transition-colors">
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .shadow-glow { box-shadow: 0 0 20px rgba(19, 236, 73, 0.4); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default AILabs;
