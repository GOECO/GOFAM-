
import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../types';

interface Props { onBack: () => void; onNavigate: (page: Page) => void; }

interface InventoryItem {
  id: string;
  name: string;
  category: 'Supplies' | 'Produce' | 'NFT';
  qty: number;
  unit: string;
  value: string;
  img: string;
  status?: 'Low' | 'Expired' | 'Ready';
  rarity?: 'Common' | 'Rare' | 'Legendary';
}

const INITIAL_DATA: InventoryItem[] = [
  {
    id: 'i1',
    name: 'Hạt giống Dưa lưới',
    category: 'Supplies',
    qty: 25,
    unit: 'gói',
    value: '2,500 Xu',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnCfbbNWeSvTg-m7mM5enaf0ytLaLHXULb3eAz-8uPWlh7iFv7QMhVp_ponAww_btHmjPweUGDgjC_mtZHtebLL_E8pKcHKCbFQyIx7Xx3o02RZ_sFWw89d95Ar7YLrMLE7cHj4VMnZcNHD_yfcYIyALBjmxaCd3Z1Wzco71c3-6UN_FgGgKF_Od_0yrH1CU9CtC9o1uYEbEcKJrg_SmhKbKc9hSJISclSZh7w_1LkLHGYNkv3Z36NDLIAy4Bubu48pco6YGigMHq3'
  },
  {
    id: 'i2',
    name: 'Robot Tưới Gen-1',
    category: 'Supplies',
    qty: 2,
    unit: 'máy',
    value: '15,000 Xu',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk5luuA44rXZIl-a8CRGM9PoFHkByOkJe7-FcCzed6WmoeqXQ4GTo3Q9K1zAkKzLYkcjv1juwm0BoMImDxVh5FZ2nJNsTZXS8Hv96__mZIZa6Pp0HzMby_PLsar2XFu_8V9FppFUnlo7Oz_fqzMvBncRyDQbJgLQumihylTUx4WfXG9etRfyEam0da95_dly_zjrNm4XHqfZorjf9eQtltn1LuvXn6eCarzGh99VF37Eio-Zq-PrVpdq_qYxASJUkm6iJOTriFS4JX',
    status: 'Ready'
  },
  {
    id: 'i3',
    name: 'Cà Rốt Thần (NFT)',
    category: 'NFT',
    qty: 1,
    unit: 'item',
    value: '500 GFM',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoAATUczTUjgIhtSXGGb7FiDemNPUng_NYg5K-dc8b_NHGZE0j2z7IhbeA4NLKodr3hadHEPrmcPXmxEFxl9JY5Z7tkpRLGPDr0gcXOAveWEOjGjnwZWkWgoHaGNUDqm6MtXOLVfPNzlx_ptaTrqlsiux-Cq250TI2SiM7SoP_dTo28w6J-rNhpxhvKDrjRjUW5ylqVpsahiRHTmiQm59Adk41bIBZlw6p-3Bawa8wq7Mj6cAfR6VUw_OEBxeNvpf948ieNX4KuD0a',
    rarity: 'Legendary'
  },
  {
    id: 'i4',
    name: 'Bắp Cải Xanh',
    category: 'Produce',
    qty: 150,
    unit: 'kg',
    value: '4,500 Xu',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQAkoV0uNfNw0Or257uaBuqF7XsYMYDwuukCmPh0SvYOmww0qcSc7-gPMLOxUYxUezU79we78qhGxbAb48dXqEkh7rjYKOLTcVz1j-Cwkud6QPNWzC4mtFS4DCA37NiXc2Rz8w6WYUozodJEBCEeat7kfU2BO9fKeOSPVPZT-UyZOylTLDs1XfSzJa3UxtJ3DKWFAN5uMOTgjBUcKA3zDz2ykXrugICz8O46lkkew3ryOLbKdhMMHMIM4aS-PuqYgOZTlFfNKTyIsp'
  }
];

const Inventory: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_DATA);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Supplies' | 'Produce' | 'NFT'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleScan = async () => {
    setIsScannerOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Simulation: Detect a specific item after 3 seconds
      setTimeout(() => {
        const newItem: InventoryItem = {
          id: `i${Date.now()}`,
          name: 'Robot Tưới Gen-2',
          category: 'Supplies',
          qty: 1,
          unit: 'bộ',
          value: '22,000 Xu',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJYAj7WgPps3kL16-aZEioGp_PmhJZFKDzkZTRlCzK4efxznmTqKQptJVMRuaGkAcUnJUUeEYcOvBhh7787i3pEZJCuyuuo1mgP3atmGsDDYh8ikYA3xxEVUV5H78wFm6_9V5keya4391NXNljHG4VzAdZD3CSA85Lq0AAscEGTiwjMKOyYPQVIyADnDbTvhb6SuMIpqdGiotu54m1h2LORGN4EH5TGe6uwuXtjzBNr-czfSf3Tu0ZZls54ESCVZcuzvhWIQh5jYbl',
          status: 'Ready',
          rarity: 'Rare'
        };
        
        setItems(prev => [newItem, ...prev]);
        stopCamera();
        setIsScannerOpen(false);
        alert("Thành công! Đã quét được thiết bị: Robot Tưới Gen-2. Sản phẩm đã được thêm vào kho.");
      }, 3500);
    } catch (err) {
      console.error("Camera access denied:", err);
      setIsScannerOpen(false);
      alert("Không thể truy cập camera. Vui lòng cấp quyền để sử dụng tính năng quét.");
    }
  };

  const closeScanner = () => {
    stopCamera();
    setIsScannerOpen(false);
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-white transition-colors duration-300 pb-32">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined font-black">arrow_back</span>
          </button>
          <h1 className="text-xl font-black uppercase tracking-tight leading-none">Kho Nông Trại Pro</h1>
          <button className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-400">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>

        {/* Storage Capacity Bar */}
        <div className="px-5 pb-5">
          <div className="flex justify-between items-end mb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm font-bold">inventory_2</span>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Sức chứa kho</p>
            </div>
            <p className="text-[11px] font-black dark:text-white">{filteredItems.length * 10} / 1000 <span className="text-gray-500 text-[9px] uppercase">Slots</span></p>
          </div>
          <div className="relative h-2 w-full rounded-full bg-gray-200 dark:bg-surface-dark overflow-hidden shadow-inner border border-white/5">
            <div className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary-dark to-primary shadow-glow transition-all duration-1000" style={{ width: `${(filteredItems.length * 10 / 1000) * 100}%` }}></div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-6 overflow-y-auto no-scrollbar">
        {/* Search Bar with QR Scanner Trigger */}
        <section className="relative group flex gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">search</span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl pl-11 pr-4 text-sm font-bold outline-none focus:ring-1 focus:ring-primary dark:text-white transition-all shadow-sm" 
              placeholder="Tìm kiếm trong kho..." 
            />
          </div>
          <button 
            onClick={handleScan}
            className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-black shadow-glow active:scale-95 transition-transform"
            title="Quét mã QR"
          >
            <span className="material-symbols-outlined font-black">qr_code_scanner</span>
          </button>
        </section>

        {/* Category Chips */}
        <section className="w-full overflow-x-auto no-scrollbar -mx-4 px-4">
          <div className="flex gap-2 min-w-max">
            {[
              { id: 'All', label: 'Tất cả', icon: 'grid_view' },
              { id: 'Supplies', label: 'Vật tư', icon: 'compost' },
              { id: 'Produce', label: 'Nông sản', icon: 'agriculture' },
              { id: 'NFT', label: 'NFTs', icon: 'token' }
            ].map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex h-10 items-center justify-center gap-2 rounded-xl px-5 transition-all active:scale-95 border ${activeCategory === cat.id ? 'bg-primary border-primary text-black font-black shadow-glow' : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800 text-gray-500 font-bold'}`}
              >
                <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                <span className="text-[10px] uppercase tracking-widest">{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Inventory Grid */}
        <section className="grid grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="group flex flex-col rounded-[2.5rem] bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-500 active:scale-[0.98]">
              <div className="relative w-full aspect-square bg-gray-50 dark:bg-black/20 p-5 flex items-center justify-center overflow-hidden">
                {item.status && (
                  <div className="absolute top-3 right-3 rounded-lg bg-green-500/20 px-2 py-0.5 backdrop-blur-md border border-green-500/30 z-10">
                    <p className="text-[8px] font-black text-green-500 uppercase tracking-[0.2em]">{item.status}</p>
                  </div>
                )}
                {item.rarity && (
                  <div className={`absolute top-3 left-3 rounded-lg px-2 py-0.5 shadow-lg z-10 border ${item.rarity === 'Legendary' ? 'bg-purple-600 border-purple-400/50' : item.rarity === 'Rare' ? 'bg-blue-600 border-blue-400/50' : 'bg-blue-500 border-blue-400/50'}`}>
                    <p className="text-[8px] font-black text-white uppercase tracking-[0.2em]">{item.rarity}</p>
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
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[14px] font-black text-primary">{item.qty}</span>
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{item.unit}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center rounded-xl bg-gray-100 dark:bg-background-dark py-2 text-primary hover:bg-primary hover:text-black transition-all">
                    <span className="material-symbols-outlined text-[16px]">touch_app</span>
                  </button>
                  <button className="flex items-center justify-center rounded-xl bg-gray-100 dark:bg-background-dark py-2 text-gray-400 hover:text-red-500 transition-all">
                    <span className="material-symbols-outlined text-[16px]">sell</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* AI Insight Card */}
        <section className="rounded-3xl bg-blue-500/10 border border-blue-500/20 p-5 flex items-start gap-4 shadow-sm relative overflow-hidden group">
          <div className="size-10 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
            <span className="material-symbols-outlined !text-2xl animate-pulse">psychology</span>
          </div>
          <div className="flex-1">
            <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1.5">Gợi ý từ AI Kho</h4>
            <p className="text-slate-800 dark:text-blue-100/70 text-xs font-bold leading-relaxed">
              Bạn có <span className="text-primary font-black">{items.find(i => i.id === 'i4')?.qty}kg Bắp Cải Xanh</span>. Giá thị trường đang tăng 5%, bạn nên cân nhắc <span className="underline decoration-primary/30">Bán ngay</span> để tối ưu lợi nhuận.
            </p>
          </div>
        </section>
      </main>

      {/* QR Scanner Fullscreen Overlay */}
      {isScannerOpen && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-[fadeIn_0.3s_ease-out]">
          {/* Header Controls */}
          <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-between z-[110] bg-gradient-to-b from-black/80 to-transparent">
            <button onClick={closeScanner} className="size-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-transform">
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex flex-col items-center">
              <h2 className="text-white font-black uppercase tracking-[0.2em] text-sm">Máy quét vật tư</h2>
              <p className="text-[10px] text-primary font-bold uppercase mt-1">Live Vision Processing</p>
            </div>
            <button className="size-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
              <span className="material-symbols-outlined">flash_on</span>
            </button>
          </div>

          {/* Scanner Viewport */}
          <div className="relative w-80 h-80 border border-white/20 rounded-[3rem] overflow-hidden bg-black shadow-2xl">
            {/* Live Video Feed */}
            <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
            
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-14 h-14 border-t-4 border-l-4 border-primary rounded-tl-3xl shadow-glow z-10"></div>
            <div className="absolute top-0 right-0 w-14 h-14 border-t-4 border-r-4 border-primary rounded-tr-3xl shadow-glow z-10"></div>
            <div className="absolute bottom-0 left-0 w-14 h-14 border-b-4 border-l-4 border-primary rounded-bl-3xl shadow-glow z-10"></div>
            <div className="absolute bottom-0 right-0 w-14 h-14 border-b-4 border-r-4 border-primary rounded-br-3xl shadow-glow z-10"></div>
            
            {/* Scanning Line Animation */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_#13ec49] scanner-line z-20"></div>

            {/* Target Area Overlay */}
            <div className="absolute inset-0 bg-black/40 border-[40px] border-black/40 pointer-events-none"></div>
          </div>
          
          <div className="mt-12 px-8 text-center space-y-4">
            <p className="text-white/80 text-xs font-black uppercase tracking-[0.3em] animate-pulse">Đang định danh sản phẩm...</p>
            <p className="text-[10px] text-gray-500 font-medium italic max-w-[240px] leading-relaxed">Hướng camera vào mã QR hoặc nhãn sản phẩm để hệ thống tự động nhận diện và cập nhật kho</p>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-slate-100 dark:border-gray-800 px-6 h-20 pb-6 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-colors">
        <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center gap-1.5 text-slate-400 group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">home</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Trại</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-primary scale-110">
          <span className="material-symbols-outlined material-symbols-filled !text-[28px]">inventory_2</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Kho</span>
        </button>
        <div className="relative -top-6">
          <button onClick={() => onNavigate('store')} className="size-15 rounded-full bg-white dark:bg-surface-dark flex items-center justify-center text-slate-400 shadow-xl border-2 border-slate-100 dark:border-gray-800 active:scale-90 transition-transform ring-[6px] ring-white dark:ring-surface-dark">
            <span className="material-symbols-outlined text-3xl font-black">storefront</span>
          </button>
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
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default Inventory;
