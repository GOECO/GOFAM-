
import React, { useState, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Props { onBack: () => void; onFindNearby: () => void; }

interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  priceNum: number;
  oldPrice?: string;
  rating: string;
  img: string;
}

const Marketplace: React.FC<Props> = ({ onBack, onFindNearby }) => {
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const products: Product[] = [
    { id: 'p1', name: 'Phân bón NPK Đầu Trâu', brand: 'Bình Điền', price: '250.000đ', priceNum: 250000, oldPrice: '295.000đ', rating: '4.8', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4aKhur3d10b304mm0S7prZDf_ASpRnO5TJBZI0BZYCT0ddbJ1iph_6Z3qqUwxgVsctBS88E1g7_EeJSncEya09dxc0jUr4fD1-r5xei2QclEuSUwNQx-giU1e8ZCOk0pTCwUfBIdMLQBMqOkDT0Pia1hYf_4TuR0UTLva7cSYh9A6SvkpaI3E79fCngwS1TfCLZXZv0bCOTG894CuTFJ5xn-zj08NvXbYw80fc-m1rTpdUZUcVjnJfFwC0YfbBUCPRp2_Fys5TKjz' },
    { id: 'p2', name: 'Hạt giống Lúa ST25', brand: 'Hồ Quang Cua', price: '120.000đ', priceNum: 120000, rating: '5.0', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgwj0YjQJS17viqCR7mCKFN3mpcdWTAWGEgx3KzZ7NFAMvNb-DgfwxZ3czmjy0lwIEtPFE17LwoWH-LhbaXccrEue4f2ED9tZKz_1tKLnu0qV89D9lfjQIczhJcz0AowFNzksx0tRn9kXXV2nQdA8ArGQGGYcBC5FklMv9btuHQxoZoCyhqAp-Byc8hfNj3W0CHM8Ik1Gl1hqpSNxDR60_SYgDkvf5y_PufmvWJK7gx28CzggCrGkl9Gt1-2x_uwjZKJ9f56HazUa1' },
    { id: 'p3', name: 'Máy bay phun thuốc T40', brand: 'DJI Agri', price: '230Tr', priceNum: 230000000, rating: '4.9', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiF8baznTxDpya1yDyTGTfYEryiY3AxMIk28bxBekJrC28nIy4RBD1DuQJZfHgUg-c0TN2xcdIQssrCog2ODQMC_gqEqarasu3CLecxHVvuj1hwlBrpLw6-AwxEL8QwVpaR8uwcUduGcwnWyBDcgZhWOq9tOU8tYsd6bQHvr09XDN_xrbCfL9vYJznUoXvW7hd1t6_J87Lm-tnzkt8GLDJEQbAMMCWOiHLFWAESIEpmA0LGa2triAZnUbyIj3urvnE7gJVYjmLC1q-' },
    { id: 'p4', name: 'Thuốc Neem Oil Bio', brand: 'Green Life', price: '85.000đ', priceNum: 85000, rating: '4.5', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4PNRYmHtKNe-dy7BMNOq7iZBRcH8iisKqYevc0ELSKLUCiqCkHqiZrrtQfwnbWn5FBnWwFBPoT-7da0VUmxHtrz5hp5W6AWwrnrMfacHKeDTiRXn2Sxij_i-zWXmMclUe-8BEcQMyjAEAD_FWbg3L9EcN5azvGHeuMadt6bYpoJ6GdYaC4cty65tZ8boBPdqClRRzeAoHGjH6OLku9o6-6v_bRMt9zTsHGoWfeWch4PFATNOMfycgKOT9gMuCwOBSKJF8RVNDXNCM' },
  ];

  const totalItems = useMemo(() => {
    // Fix: Explicitly type sum and qty to avoid "unknown" operator error from Object.values(cart)
    return Object.values(cart).reduce((sum: number, qty: number) => sum + qty, 0);
  }, [cart]);

  const updateQuantity = (productId: string, delta: number) => {
    if (delta > 0) {
      setAnimatingId(productId);
      setTimeout(() => setAnimatingId(null), 600);
    }
    setCart(prev => {
      const currentQty = prev[productId] || 0;
      const newQty = Math.max(0, currentQty + delta);
      if (newQty === 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQty };
    });
  };

  const handleGenerateImage = async () => {
    if (!aiPrompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: `Create a professional, studio-quality product photograph of a modern agricultural asset for a pro-grade marketplace: ${aiPrompt}. High-tech design, clean lighting, neutral background.` }
          ]
        },
        config: { imageConfig: { aspectRatio: "1:1" } }
      });

      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tạo ảnh AI.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-32 font-display">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="p-4 flex items-center justify-between">
          <button onClick={onBack} className="size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="text-center flex-1">
             <h1 className="text-lg font-bold flex items-center justify-center gap-1">Marketplace <span className="bg-black text-white px-1 rounded text-[10px] uppercase font-black">Pro</span></h1>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cung ứng Nông nghiệp</p>
          </div>
          <button className="size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center relative">
            <span className="material-symbols-outlined !text-2xl">shopping_bag</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 size-5 bg-primary text-black text-[10px] font-black rounded-full flex items-center justify-center shadow-glow animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
        </div>
        <div className="px-4 pb-3">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input type="text" className="w-full h-11 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl pl-10 pr-10 text-sm font-medium outline-none focus:ring-1 focus:ring-primary transition-all dark:text-white" placeholder="Tìm vật tư, hạt giống..." />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">qr_code_scanner</span>
          </div>
        </div>
      </header>

      {/* AI Creator Panel */}
      <div className="px-4 py-4">
        <div className="bg-slate-900 rounded-[2.5rem] p-6 shadow-xl border border-white/10 relative overflow-hidden group">
           <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                 <div className="size-10 rounded-2xl bg-primary flex items-center justify-center text-black shadow-glow">
                    <span className="material-symbols-outlined font-black">auto_awesome</span>
                 </div>
                 <h3 className="text-white font-bold text-base">AI Asset Creator</h3>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">Mô phỏng thiết bị hoặc vật tư tùy chỉnh trước khi đặt hàng.</p>
              <button 
                onClick={() => setIsCreatorOpen(true)}
                className="bg-white text-black px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"
              >
                Trải nghiệm AI
              </button>
           </div>
        </div>
      </div>

      {/* Nearby Button */}
      <div className="px-4 mb-4">
        <button 
          onClick={onFindNearby}
          className="w-full bg-white dark:bg-surface-dark py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm border border-gray-100 dark:border-gray-800 active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-primary text-lg">location_on</span>
          Xem cửa hàng gần nhất
        </button>
      </div>

      {/* Product Grid */}
      <div className="px-4 grid grid-cols-2 gap-4">
        {products.map((p) => {
          const qty = cart[p.id] || 0;
          const isAnimating = animatingId === p.id;
          
          return (
            <div key={p.id} className={`bg-white dark:bg-surface-dark rounded-[2.5rem] border transition-all duration-300 overflow-hidden group shadow-sm flex flex-col ${qty > 0 ? 'border-primary/40 ring-1 ring-primary/10' : 'border-gray-100 dark:border-gray-800'}`}>
              <div className="relative aspect-square bg-gray-50 dark:bg-black/20 overflow-hidden p-4">
                <img src={p.img} className={`w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 ${isAnimating ? 'scale-90 opacity-80' : 'scale-100'}`} alt={p.name} />
                
                {qty > 0 && (
                  <div className="absolute top-2 right-2 bg-primary text-black size-6 rounded-full flex items-center justify-center font-black text-[10px] shadow-glow animate-pop">
                    {qty}
                  </div>
                )}
                
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-lg flex items-center gap-1 border border-gray-100 dark:border-white/10">
                    <span className="material-symbols-outlined !text-[10px] text-yellow-500 material-symbols-filled">star</span>
                    <span className="text-[9px] font-black dark:text-white uppercase">{p.rating}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <div className="flex-1 mb-2">
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1 block">{p.brand}</span>
                  <h4 className="text-xs font-black leading-tight dark:text-white line-clamp-2 uppercase tracking-tight">{p.name}</h4>
                </div>

                <div className="mt-auto space-y-3">
                  <p className="text-base font-black text-primary leading-none tracking-tight">{p.price}</p>
                  
                  {qty === 0 ? (
                    <button 
                      onClick={() => updateQuantity(p.id, 1)}
                      className="w-full h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-primary dark:hover:bg-primary hover:text-black font-black text-[9px] uppercase tracking-widest"
                    >
                      <span className="material-symbols-outlined !text-base">add_shopping_cart</span>
                      Chọn mua
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-gray-700 p-0.5">
                      <button 
                        onClick={() => updateQuantity(p.id, -1)}
                        className="size-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 active:scale-75 transition-all"
                      >
                        <span className="material-symbols-outlined !text-base">remove</span>
                      </button>
                      <span className="text-xs font-black dark:text-white">{qty}</span>
                      <button 
                        onClick={() => updateQuantity(p.id, 1)}
                        className="size-8 rounded-lg bg-primary text-black flex items-center justify-center active:scale-75 transition-all shadow-sm"
                      >
                        <span className="material-symbols-outlined !text-base font-bold">add</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Checkout Summary */}
      {totalItems > 0 && (
        <div className="fixed bottom-24 left-0 right-0 px-4 z-[60] animate-slideUp">
          <button className="w-full max-w-md mx-auto h-16 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl shadow-2xl flex items-center justify-between px-6 border border-white/10 dark:border-black/10 active:scale-[0.98] transition-all">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-primary/20 dark:bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined font-black">shopping_cart_checkout</span>
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-sm font-black uppercase tracking-widest">{totalItems} vật phẩm</span>
                <span className="text-[9px] font-bold opacity-60 uppercase mt-1">Đã sẵn sàng thanh toán</span>
              </div>
            </div>
            <span className="text-sm font-black text-primary">Thanh toán</span>
          </button>
        </div>
      )}

      {/* AI Creator Modal */}
      {isCreatorOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white dark:bg-surface-dark rounded-[2.5rem] shadow-2xl overflow-hidden animate-slideUp">
             <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-black/20">
                <h2 className="font-black text-sm uppercase tracking-widest">Thiết kế AI Pro</h2>
                <button onClick={() => setIsCreatorOpen(false)} className="size-8 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center">
                   <span className="material-symbols-outlined">close</span>
                </button>
             </div>
             <div className="p-6 space-y-6">
                <textarea 
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Mô tả vật tư lý tưởng của bạn..."
                  className="w-full h-24 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-background-dark text-sm outline-none focus:ring-1 focus:ring-primary dark:text-white transition-all resize-none placeholder:text-white/20"
                />
                {generatedImage && (
                  <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg">
                     <img src={generatedImage} alt="AI Result" className="w-full h-auto aspect-square object-cover" />
                  </div>
                )}
                <button 
                  onClick={handleGenerateImage}
                  disabled={isGenerating || !aiPrompt.trim()}
                  className="w-full h-12 bg-primary text-black rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined !text-lg">{isGenerating ? 'sync' : 'auto_awesome'}</span>
                  {isGenerating ? 'Đang tạo...' : 'Tạo phác thảo'}
                </button>
             </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pop {
          0% { transform: scale(0.5); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-pop { animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default Marketplace;
