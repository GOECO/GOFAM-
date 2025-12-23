
import React, { useState, useMemo } from 'react';

interface Props { onBack: () => void; onFindNearby: () => void; }

interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  oldPrice?: string;
  rating: string;
  img: string;
}

const Marketplace: React.FC<Props> = ({ onBack, onFindNearby }) => {
  const products: Product[] = [
    { id: 'p1', name: 'Phân bón NPK Đầu Trâu', brand: 'Bình Điền', price: '250.000đ', oldPrice: '295.000đ', rating: '4.8', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4aKhur3d10b304mm0S7prZDf_ASpRnO5TJBZI0BZYCT0ddbJ1iph_6Z3qqUwxgVsctBS88E1g7_EeJSncEya09dxc0jUr4fD1-r5xei2QclEuSUwNQx-giU1e8ZCOk0pTCwUfBIdMLQBMqOkDT0Pia1hYf_4TuR0UTLva7cSYh9A6SvkpaI3E79fCngwS1TfCLZXZv0bCOTG894CuTFJ5xn-zj08NvXbYw80fc-m1rTpdUZUcVjnJfFwC0YfbBUCPRp2_Fys5TKjz' },
    { id: 'p2', name: 'Hạt giống Lúa ST25', brand: 'Hồ Quang Cua', price: '120.000đ', rating: '5.0', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgwj0YjQJS17viqCR7mCKFN3mpcdWTAWGEgx3KzZ7NFAMvNb-DgfwxZ3czmjy0lwIEtPFE17LwoWH-LhbaXccrEue4f2ED9tZKz_1tKLnu0qV89D9lfjQIczhJcz0AowFNzksx0tRn9kXXV2nQdA8ArGQGGYcBC5FklMv9btuHQxoZoCyhqAp-Byc8hfNj3W0CHM8Ik1Gl1hqpSNxDR60_SYgDkvf5y_PufmvWJK7gx28CzggCrGkl9Gt1-2x_uwjZKJ9f56HazUa1' },
    { id: 'p3', name: 'Máy bay phun thuốc T40', brand: 'DJI Agri', price: '230Tr', rating: '4.9', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiF8baznTxDpya1yDyTGTfYEryiY3AxMIk28bxBekJrC28nIy4RBD1DuQJZfHgUg-c0TN2xcdIQssrCog2ODQMC_gqEqarasu3CLecxHVvuj1hwlBrpLw6-AwxEL8QwVpaR8uwcUduGcwnWyBDcgZhWOq9tOU8tYsd6bQHvr09XDN_xrbCfL9vYJznUoXvW7hd1t6_J87Lm-tnzkt8GLDJEQbAMMCWOiHLFWAESIEpmA0LGa2triAZnUbyIj3urvnE7gJVYjmLC1q-' },
    { id: 'p4', name: 'Thuốc Neem Oil Bio', brand: 'Green Life', price: '85.000đ', rating: '4.5', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4PNRYmHtKNe-dy7BMNOq7iZBRcH8iisKqYevc0ELSKLUCiqCkHqiZrrtQfwnbWn5FBnWwFBPoT-7da0VUmxHtrz5hp5W6AWwrnrMfacHKeDTiRXn2Sxij_i-zWXmMclUe-8BEcQMyjAEAD_FWbg3L9EcN5azvGHeuMadt6bYpoJ6GdYaC4cty65tZ8boBPdqClRRzeAoHGjH6OLku9o6-6v_bRMt9zTsHGoWfeWch4PFATNOMfycgKOT9gMuCwOBSKJF8RVNDXNCM' },
  ];

  // Cart state where key is product ID and value is quantity
  const [cart, setCart] = useState<Record<string, number>>({});

  const totalItems = useMemo(() => {
    // FIX: Explicitly type sum and qty to resolve "unknown" operator error
    return Object.values(cart).reduce((sum: number, qty: number) => sum + qty, 0);
  }, [cart]);

  const updateQuantity = (productId: string, delta: number) => {
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

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="p-4 flex items-center justify-between">
          <button onClick={onBack} className="size-10 rounded-full hover:bg-black/5 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="text-center flex-1">
             <h1 className="text-lg font-bold flex items-center justify-center gap-1">Marketplace <span className="bg-black text-white px-1 rounded text-[10px] uppercase font-black">Pro</span></h1>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dữ liệu & Cung ứng</p>
          </div>
          <button className="size-10 rounded-full hover:bg-black/5 flex items-center justify-center relative transition-colors">
            <span className="material-symbols-outlined">shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 size-5 bg-primary rounded-full text-[10px] font-bold flex items-center justify-center text-black shadow-sm animate-[scaleIn_0.2s_ease-out]">
                {totalItems}
              </span>
            )}
          </button>
        </div>
        <div className="px-4 pb-3">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">search</span>
            <input type="text" className="w-full h-11 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl pl-10 pr-10 text-sm outline-none focus:ring-1 focus:ring-primary transition-all dark:text-white" placeholder="Tìm tên, mã, nhà cung cấp..." />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary cursor-pointer">qr_code_scanner</span>
          </div>
        </div>
      </header>

      <div className="p-4">
        <button 
          onClick={onFindNearby}
          className="w-full bg-slate-900 dark:bg-primary text-white dark:text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined">location_on</span>
          Tìm cửa hàng vật tư gần bạn
        </button>
      </div>

      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
        {['Tất cả', 'Vật tư', 'Máy móc', 'Dịch vụ', 'IoT'].map((f, i) => (
          <button key={f} className={`shrink-0 px-5 py-1.5 rounded-lg text-xs font-bold transition-all ${i === 0 ? 'bg-slate-900 dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 text-gray-500 hover:border-primary/50'}`}>{f}</button>
        ))}
      </div>

      <div className="p-2 grid grid-cols-2 gap-2">
        {products.map((p) => {
          const qty = cart[p.id] || 0;
          return (
            <div key={p.id} className={`bg-white dark:bg-surface-dark rounded-2xl border transition-all duration-300 overflow-hidden group shadow-sm ${qty > 0 ? 'border-primary/40 ring-1 ring-primary/20' : 'border-gray-100 dark:border-gray-800'}`}>
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <img src={p.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={p.name} />
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur rounded flex items-center gap-1">
                    <input type="checkbox" className="w-3 h-3 rounded bg-transparent border-white text-primary focus:ring-0" />
                    <span className="text-[9px] font-bold text-white uppercase tracking-wider">So sánh</span>
                </div>
                {qty > 0 && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-primary text-black rounded text-[9px] font-black uppercase tracking-widest shadow-lg animate-[slideInRight_0.3s_ease-out]">
                    Trong giỏ
                  </div>
                )}
              </div>
              <div className="p-3 space-y-2">
                <div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{p.brand}</span>
                  <h4 className="text-sm font-bold leading-tight dark:text-white line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">{p.name}</h4>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-500">
                  <span className="material-symbols-outlined !text-[12px] material-symbols-filled">star</span>
                  {p.rating}
                </div>
                <div className="flex items-end justify-between gap-1 pt-1">
                  <div className="flex-1 min-w-0">
                    {p.oldPrice && <p className="text-[10px] text-gray-400 line-through leading-none">{p.oldPrice}</p>}
                    <p className="text-lg font-black text-primary leading-none mt-1 truncate">{p.price}</p>
                  </div>
                  
                  {/* DYNAMIC CART BUTTON */}
                  <div className="flex items-center">
                    {qty === 0 ? (
                      <button 
                        onClick={() => updateQuantity(p.id, 1)}
                        className="size-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center active:scale-90 transition-all hover:bg-primary dark:hover:bg-primary hover:text-black"
                      >
                        <span className="material-symbols-outlined text-[20px] font-bold">add_shopping_cart</span>
                      </button>
                    ) : (
                      <div className="flex items-center bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-gray-700 p-0.5 animate-[fadeIn_0.2s_ease-out]">
                        <button 
                          onClick={() => updateQuantity(p.id, -1)}
                          className="size-7 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-white/10 active:scale-75 transition-all"
                        >
                          <span className="material-symbols-outlined text-[18px]">remove</span>
                        </button>
                        <span className="px-2 text-xs font-black dark:text-white min-w-[20px] text-center">
                          {qty}
                        </span>
                        <button 
                          onClick={() => updateQuantity(p.id, 1)}
                          className="size-7 rounded-lg bg-primary text-black flex items-center justify-center active:scale-75 transition-all shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[18px] font-bold">add</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Marketplace;
