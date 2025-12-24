
import React, { useState } from 'react';
import { Page } from '../types';

interface Props { onBack: () => void; onNavigate: (page: Page) => void; }

interface ShopItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  currency: 'Gold' | 'Tokens';
  img: string;
  category: string;
  isNew?: boolean;
  discount?: string;
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: 's1',
    name: 'Drone Giám Sát Gen-1',
    desc: 'Tự động phát hiện sâu bệnh (AI Scan).',
    price: '500',
    currency: 'Tokens',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJYAj7WgPps3kL16-aZEioGp_PmhJZFKDzkZTRlCzK4efxznmTqKQptJVMRuaGkAcUnJUUeEYcOvBhh7787i3pEZJCuyuuo1mgP3atmGsDDYh8ikYA3xxEVUV5H78wFm6_9V5keya4391NXNljHG4VzAdZD3CSA85Lq0AAscEGTiwjMKOyYPQVIyADnDbTvhb6SuMIpqdGiotu54m1h2LORGN4EH5TGe6uwuXtjzBNr-czfSf3Tu0ZZls54ESCVZcuzvhWIQh5jYbl',
    category: 'Drone',
    isNew: true
  },
  {
    id: 's2',
    name: 'Phân Bón AI Nano',
    desc: 'Tăng tốc độ lớn 20% cho mọi loại cây.',
    price: '200',
    currency: 'Tokens',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA34e3YkL_hj4xBj0YHg37i-Fr31Z1PUs7DredI2AcrKkmo6eYDVSnZUGR-VuUPkBj8zhVvaUmuBnp3FhTW5-WxJu6D__2ddEfPyVQocQxurU8m-rzCX4LE-oagPXuIP6VUOQs-FWrqz0StxMJSOVh-soD6nMk_nlIs7GeLO4ZXRtym1BrLDia5urt7Og4v2_WQJ8uhxHRTHAw8Dvh9KivnK5SmGTZashDMyWou2oRxt-TJ0XUfANCxKU2pXsiHXaZ3HsjKFGiUS3bl',
    category: 'Phân bón AI'
  },
  {
    id: 's3',
    name: 'Robot Tưới Tự Động',
    desc: 'Tiết kiệm 30% nước, hoạt động 24/7.',
    price: '15,000',
    currency: 'Gold',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk5luuA44rXZIl-a8CRGM9PoFHkByOkJe7-FcCzed6WmoeqXQ4GTo3Q9K1zAkKzLYkcjv1juwm0BoMImDxVh5FZ2nJNsTZXS8Hv96__mZIZa6Pp0HzMby_PLsar2XFu_8V9FppFUnlo7Oz_fqzMvBncRyDQbJgLQumihylTUx4WfXG9etRfyEam0da95_dly_zjrNm4XHqfZorjf9eQtltn1LuvXn6eCarzGh99VF37Eio-Zq-PrVpdq_qYxASJUkm6iJOTriFS4JX',
    category: 'Robot tưới',
    discount: '-10%'
  },
  {
    id: 's4',
    name: 'Hạt Giống Thần Kỳ',
    desc: 'Tỷ lệ nảy mầm 100%, kháng sâu bệnh.',
    price: '2,500',
    currency: 'Gold',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnCfbbNWeSvTg-m7mM5enaf0ytLaLHXULb3eAz-8uPWlh7iFv7QMhVp_ponAww_btHmjPweUGDgjC_mtZHtebLL_E8pKcHKCbFQyIx7Xx3o02RZ_sFWw89d95Ar7YLrMLE7cHj4VMnZcNHD_yfcYIyALBjmxaCd3Z1Wzco71c3-6UN_FgGgKF_Od_0yrH1CU9CtC9o1uYEbEcKJrg_SmhKbKc9hSJISclSZh7w_1LkLHGYNkv3Z36NDLIAy4Bubu48pco6YGigMHq3',
    category: 'Hạt giống'
  }
];

const Store: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Tất cả');

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-white transition-colors duration-300 pb-32">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined font-black">arrow_back</span>
          </button>
          <h1 className="text-xl font-black uppercase tracking-tight leading-none">Cửa hàng nâng cấp</h1>
          <button className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-400">
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
        
        {/* Wallet HUD */}
        <div className="flex justify-center gap-3 px-4 pb-4">
          <div className="flex items-center gap-2 rounded-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 px-4 py-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer">
            <span className="material-symbols-outlined text-yellow-500 text-base material-symbols-filled">monetization_on</span>
            <span className="text-xs font-black tracking-tight">15,420</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 px-4 py-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer">
            <span className="material-symbols-outlined text-primary text-base">token</span>
            <span className="text-xs font-black tracking-tight">850</span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-6 overflow-y-auto no-scrollbar">
        {/* Farm Level Progress */}
        <section className="flex flex-col gap-3">
          <div className="flex items-end justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary font-bold">agriculture</span>
              <p className="text-sm font-black uppercase tracking-tight leading-none">Farm Level 12</p>
            </div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">3500 / 5000 XP</p>
          </div>
          <div className="relative h-3 w-full rounded-full bg-gray-200 dark:bg-surface-dark overflow-hidden shadow-inner border border-white/5">
            <div className="absolute top-0 left-0 h-full rounded-full bg-primary shadow-glow transition-all duration-1000" style={{ width: '70%' }}></div>
            <div className="absolute top-0 left-0 h-full w-full opacity-10" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.2) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.2) 50%,rgba(255,255,255,.2) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}></div>
          </div>
        </section>

        {/* AI Smart Recommendation Widget */}
        <section className="rounded-[2.5rem] bg-gradient-to-br from-blue-900/40 to-surface-dark border border-blue-500/30 p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 size-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-[1.25rem] bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg">
              <span className="material-symbols-outlined !text-3xl animate-pulse">smart_toy</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-blue-200 text-[10px] font-black uppercase tracking-[0.2em]">AI Chẩn đoán thông minh</h3>
              <p className="text-white text-sm font-bold leading-relaxed tracking-tight">
                Phát hiện độ ẩm thấp ở khu vực B2. Bạn nên nâng cấp <span className="text-primary font-black underline decoration-primary/30 underline-offset-4">Robot Tưới Gen-2</span> để tối ưu hóa năng suất.
              </p>
            </div>
          </div>
        </section>

        {/* Category Chips */}
        <section className="w-full overflow-x-auto no-scrollbar -mx-4 px-4">
          <div className="flex gap-2 min-w-max">
            {['Tất cả', 'Hạt giống', 'Robot tưới', 'Drone', 'Phân bón AI'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`flex h-10 items-center justify-center gap-2 rounded-xl px-5 transition-all active:scale-95 border ${activeTab === cat ? 'bg-primary border-primary text-black font-black shadow-glow' : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800 text-gray-500 font-bold'}`}
              >
                <span className="text-[10px] uppercase tracking-widest">{cat}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Shop Grid */}
        <section className="grid grid-cols-2 gap-4">
          {SHOP_ITEMS.map((item) => (
            <div key={item.id} className="group flex flex-col rounded-[2rem] bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-500 active:scale-[0.98]">
              <div className="relative w-full aspect-square bg-gray-50 dark:bg-black/20 p-5 flex items-center justify-center overflow-hidden">
                {item.isNew && (
                  <div className="absolute top-3 right-3 rounded-lg bg-slate-900/60 dark:bg-black/40 px-2 py-0.5 backdrop-blur-md border border-white/10 z-10">
                    <p className="text-[8px] font-black text-primary uppercase tracking-[0.2em]">Mới</p>
                  </div>
                )}
                {item.discount && (
                  <div className="absolute top-3 left-3 rounded-lg bg-red-500 px-2 py-0.5 shadow-lg z-10 border border-red-400/50">
                    <p className="text-[8px] font-black text-white uppercase tracking-[0.2em]">{item.discount}</p>
                  </div>
                )}
                <img 
                  src={item.img} 
                  className="w-full h-full object-contain drop-shadow-2xl transform group-hover:scale-110 duration-700" 
                  alt={item.name} 
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors pointer-events-none"></div>
              </div>
              
              <div className="flex flex-col p-4 gap-3 flex-grow">
                <div className="flex-grow">
                  <h3 className="text-slate-900 dark:text-white text-xs font-black leading-tight uppercase tracking-tight line-clamp-1">{item.name}</h3>
                  <p className="text-gray-400 text-[10px] mt-1 line-clamp-2 font-medium leading-relaxed">{item.desc}</p>
                </div>
                <button className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-gray-100 dark:bg-background-dark py-2.5 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">{item.currency === 'Gold' ? 'monetization_on' : 'token'}</span>
                  <span className="text-[11px] font-black uppercase tracking-widest">{item.price} {item.currency === 'Tokens' ? 'G-Tokens' : 'Xu'}</span>
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Daily Mission Banner */}
        <section className="rounded-3xl bg-surface-highlight dark:bg-surface-dark border border-gray-100 dark:border-primary/20 p-5 flex items-center justify-between shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
          <div className="flex flex-col">
            <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1.5">Nhiệm vụ hôm nay</p>
            <p className="text-slate-800 dark:text-white text-sm font-black uppercase tracking-tight">Nâng cấp 1 thiết bị bất kỳ</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-primary font-black uppercase tracking-widest">Thưởng:</span>
            <div className="flex items-center gap-1 bg-primary/10 rounded-xl px-3 py-1.5 border border-primary/20">
              <span className="material-symbols-outlined text-yellow-500 text-[14px] material-symbols-filled">monetization_on</span>
              <span className="text-xs font-black text-slate-800 dark:text-white">500</span>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-slate-100 dark:border-gray-800 px-6 h-20 pb-6 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-colors">
        <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center gap-1.5 text-slate-400 group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">grid_view</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Trại</span>
        </button>
        <button onClick={() => onNavigate('inventory')} className="flex flex-col items-center gap-1.5 text-slate-400 group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">inventory_2</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Kho</span>
        </button>
        <div className="relative -top-6">
          <button className="size-15 rounded-full bg-primary flex items-center justify-center text-black shadow-xl shadow-primary/40 active:scale-90 transition-transform ring-[6px] ring-white dark:ring-surface-dark">
            <span className="material-symbols-outlined text-3xl font-black">storefront</span>
          </button>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-primary uppercase tracking-widest">Shop</span>
        </div>
        <button onClick={() => onNavigate('missions')} className="flex flex-col items-center gap-1.5 text-slate-400 group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">leaderboard</span>
          <span className="text-[9px] font-black uppercase tracking-widest">BXH</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1.5 text-slate-400 group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">settings</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Cài đặt</span>
        </button>
      </nav>

      <style>{`
        .size-15 { width: 3.75rem; height: 3.75rem; }
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Store;
