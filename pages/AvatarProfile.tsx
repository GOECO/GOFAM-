
import React, { useState } from 'react';

interface Props { onBack: () => void; }

type Category = 'outfit' | 'hair' | 'accessory';

interface AvatarItem {
  id: string;
  name: string;
  category: Category;
  img: string;
  price?: string;
  currency?: 'Gold' | 'Tokens';
  isOwned?: boolean;
  isEquipped?: boolean;
  isNFT?: boolean;
  levelRequired?: number;
}

const ITEMS: AvatarItem[] = [
  {
    id: 'item1',
    name: 'Yếm Xanh',
    category: 'outfit',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyvTxjqzSNSiLOifhAEhAd75dgvRfy9yU3b57k-7B-Ls7orOBGf845RrmNkh23-iJ7aa5HZoprFw102SJ70RtE_o1P4JbUVyvcukGC-MnL6DyiJGMLPjLSRgdKxlVCbGpLQTfsdIBZqAZXAvaQh0qr6V2c6TMTKQjSccMjxl-K8zDPHv1Dy4YHB2QK4Sc9kBZ7nGaXC7H0VBAXZtJKLHqF1cnUb7gCdo3UETPyFGzSmRGO8y79vldG1YdF8aOfp5r7Tkyna7109ZQH',
    isOwned: true,
    isEquipped: true
  },
  {
    id: 'item2',
    name: 'Áo Caro Đỏ',
    category: 'outfit',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLutKMyyWg3jhtZFPkMmq_T4JCynfCUihs_ixblIEwY1XwWGLRvHBvPFYtXNEPYiCm7i7PyFakBH4STmzAr9WQ0ls2t-Pn-6q2SxZld-zJe9rPubkHnFIPcLwYvqLmW8rfxj6_4d5xGEvV7pFVobXeHM9jPfnmaMT173XHXLBhBf0BNrT0HVdMSVQDiKL92TQAXpgjKE0_nRlZ-aihcbpv4erPe4ssMhBRIFUrPGpv5s8NAH676cWSOUgJRVt9OSyxxf7wSDTiWLHJ',
    price: '500',
    currency: 'Gold'
  },
  {
    id: 'item3',
    name: 'Vest Dạ Hội',
    category: 'outfit',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFRp65qlpud6wW9IAySGRmxQ8SbtenmNNJtsTK__04W8MJ0ucgbGEF_qqLjEHrlQ2_V0tQGhSLyCsgyX0HEbjlAJ4b70IIqfNUJGqdpHAcLSj726bQLuDEE4xxYAOJLFk2ryiFdLtiwRzafNKNAfrphPm3X58qtpM_XO0E09fmHXgMByoH-vf_C5cjJi7xqtZJ_LUp6GfSw4kf3cxlX8ZZUtgIIYsA_TSEeFK0UoQ1_Mn7EX2boX1mL6vvshKdOrH1dS8FR0LesKxL',
    price: '50',
    currency: 'Tokens',
    isNFT: true
  },
  {
    id: 'item4',
    name: 'Ninja',
    category: 'outfit',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaaR1wUUhVDFc7ceytF85aLkwGmWhgd2kd4bDWqen5AnQsYT_htz-1AMf6vQzbp-gEsMKjlURj45Asamh3oEuSdmnI-JQYAGK5EXx10jl7reXyXEqL8o2yghhPbxF40cAgxJK8cyI2qfKrcFouJQdYNrEp8R4Roen3W0ogB0o5kYPqqBSqxK8GTE9nCzFZcGYXdnpc4RNaB-RRcz0pg2oXYAR11fjCi4SPTjm8iDFfqoPUxQZJidYkMaRAvSd-GTSvrAOQM78ss_M9',
    levelRequired: 20
  },
  {
    id: 'item5',
    name: 'Nông dân',
    category: 'outfit',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUhcnDh5Imz20Tzok7hcM9TTpNU-c7GUAsJfmrswsn7bdAFEeQMXhaVzye1kpFLh1v3A8fm1i-x8rmFfmpTTRqu7fc4SA98cxo9m8kcppH1Fi595U0dlV3CDzgQlVixK6WAKuB719p0b1nVLm5q5YL31NS1pfoDelVonPhhxkRozxCYHzgXgvau0zxqPGd7brc4Qvop3EkFnHtSTmP0ZOr_AoZvtSX1OMWR0RB-_Ytq-DIfCJXpa4ArV7iO4TlT20Kcd2gz3Sz-UMQ',
    price: '200',
    currency: 'Gold'
  },
  {
    id: 'item6',
    name: 'Áo Khoác Da',
    category: 'outfit',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgOAkUYY74EM6ulpGOBNHIavP235EWmcVYYEljqYHTHdymf9obELXDJgNP4vZgrWoqy-AjqKVlixaQ5XBCCq-BJLQ66L7j2W_1mptTIyR1x73S_by8Mm3jPZGuxo2bWNGkEcdFE71yg1qNwtY5MPPj6tVSEkd3pIV2pV5HkPZdajxCcwQjv9QJtU1xOPPWS2NB4Qifmbi-UdE1M5bK8V5_ShCrEJHnW1Om2SbC1PSU2lxheD3mfQUSKtdgpX5T6bV4WZw6ScLiFiFR',
    price: '1200',
    currency: 'Gold'
  }
];

const AvatarProfile: React.FC<Props> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('outfit');

  const filteredItems = ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-white overflow-hidden transition-colors duration-300">
      {/* Top Floating Nav */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 pt-10 flex items-center justify-between pointer-events-none">
        <button 
          onClick={onBack}
          className="pointer-events-auto size-11 rounded-full bg-white/70 dark:bg-surface-dark/70 backdrop-blur-xl border border-white/50 dark:border-white/10 flex items-center justify-center shadow-lg active:scale-90 transition-all"
        >
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </button>
        <div className="bg-white/70 dark:bg-surface-dark/70 backdrop-blur-xl border border-white/50 dark:border-white/10 px-6 py-2 rounded-full shadow-lg">
          <h1 className="text-xs font-black uppercase tracking-[0.2em]">Hồ sơ nhân vật</h1>
        </div>
        <button className="pointer-events-auto size-11 rounded-full bg-white/70 dark:bg-surface-dark/70 backdrop-blur-xl border border-white/50 dark:border-white/10 flex items-center justify-center shadow-lg active:scale-90 transition-all">
          <span className="material-symbols-outlined font-black">share</span>
        </button>
      </div>

      {/* 3D Model Area */}
      <div className="relative h-[55vh] shrink-0 bg-gradient-to-b from-[#e0f7fa] to-[#f6f8f7] dark:from-[#0f1f18] dark:to-[#112117] flex items-end justify-center overflow-hidden group">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        {/* Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>

        {/* Floating Stats */}
        <div className="absolute top-28 left-6 bg-white/40 dark:bg-black/40 backdrop-blur-xl p-4 rounded-2xl border border-white/20 dark:border-white/5 shadow-xl min-w-[140px] z-20 animate-fadeInLeft">
           <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Cấp độ</span>
              <span className="text-2xl font-black leading-none text-primary">12</span>
           </div>
           <div className="space-y-1.5">
              <div className="flex justify-between text-[8px] font-black text-gray-500 uppercase tracking-widest">
                 <span>Kinh nghiệm (XP)</span>
                 <span className="text-slate-900 dark:text-white">1200/2000</span>
              </div>
              <div className="h-2 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-primary shadow-glow transition-all duration-1000 ease-out" style={{ width: '60%' }}></div>
              </div>
           </div>
        </div>

        {/* Character Image */}
        <div className="relative z-10 w-full h-full flex items-end justify-center pb-8 transform transition-transform duration-700 group-hover:scale-105 cursor-grab active:cursor-grabbing">
           <img 
             src="https://lh3.googleusercontent.com/aida-public/AB6AXuDISYx2q-0oEAaLN-RyQsSh0pwn17xv3LLTnM-07vpvUKRgtzMXfrnC17ojbxA3a8Qobyq5uiuzAzgwPycbBTigwaofVEB85r1kih-_b6BSHgdTGK2cyqF5GbxSJPsBkqahYeQWig_SgCh_Y3K4N1jNea92AqOgGmB_Gxs8hnJJMKjoePVgFpvcWLQdJoaNlmtoVkjo7a6a3LQwXhJdc5ICjynsQkNNGAyN2ZFj36Ke2zLCEKLESe5IstRX3jgRfUeaTqelAU4bPOot" 
             className="h-[85%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
             alt="3D Character"
             style={{ maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)' }}
           />
        </div>

        {/* Rotation Hints */}
        <div className="absolute bottom-10 w-full flex justify-between px-8 text-black/20 dark:text-white/20 pointer-events-none">
          <span className="material-symbols-outlined animate-pulse">rotate_left</span>
          <span className="material-symbols-outlined animate-pulse">rotate_right</span>
        </div>
      </div>

      {/* Bottom Customization Dock */}
      <div className="flex-1 bg-white dark:bg-surface-dark rounded-t-[2.5rem] -mt-8 z-30 relative flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-hidden transition-colors">
        {/* Handle */}
        <div className="w-full flex justify-center pt-4 pb-2">
           <div className="w-12 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
        </div>

        {/* Tabs */}
        <div className="px-6 mb-6">
           <div className="flex justify-between items-center border-b border-gray-50 dark:border-white/5">
              {[
                { id: 'outfit', label: 'Trang phục', icon: 'checkroom' },
                { id: 'hair', label: 'Kiểu tóc', icon: 'face_3' },
                { id: 'accessory', label: 'Phụ kiện', icon: 'eyeglasses' }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as Category)}
                  className={`flex flex-col items-center gap-2 px-2 pb-4 border-b-[3px] transition-all ${activeCategory === tab.id ? 'border-primary text-slate-900 dark:text-white' : 'border-transparent text-gray-400 hover:text-gray-500'}`}
                >
                  <div className={`p-2 rounded-2xl transition-all ${activeCategory === tab.id ? 'bg-primary/10 text-primary' : 'bg-transparent'}`}>
                    <span className={`material-symbols-outlined ${activeCategory === tab.id ? 'material-symbols-filled' : ''}`}>{tab.icon}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                </button>
              ))}
           </div>
        </div>

        {/* Grid Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">
           <div className="flex justify-between items-center mb-6 px-1">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{filteredItems.length} vật phẩm</span>
              <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1">
                 Mới nhất <span className="material-symbols-outlined !text-base">expand_more</span>
              </button>
           </div>

           <div className="grid grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="group flex flex-col gap-3 cursor-pointer">
                  <div className={`aspect-square rounded-3xl relative overflow-hidden transition-all border-2 ${item.isEquipped ? 'bg-primary/10 border-primary shadow-glow' : item.levelRequired ? 'bg-gray-50 dark:bg-black/20 border-transparent opacity-60' : 'bg-gray-50 dark:bg-black/20 border-transparent hover:border-primary/30 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
                     {item.isEquipped && (
                        <div className="absolute top-2 right-2 z-10 bg-primary text-black text-[7px] font-black px-1.5 py-0.5 rounded-full shadow-sm uppercase tracking-tighter">Đang dùng</div>
                     )}
                     {item.isNFT && (
                        <div className="absolute top-2 left-2 z-10 bg-purple-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase tracking-tighter">NFT</div>
                     )}
                     {item.levelRequired && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/5 z-10 backdrop-blur-[1px]">
                           <span className="material-symbols-outlined text-gray-400 text-3xl">lock</span>
                        </div>
                     )}
                     <div className="w-full h-full p-3">
                        <img src={item.img} className={`w-full h-full object-contain drop-shadow-md transition-all duration-500 group-hover:scale-110 ${item.levelRequired ? 'grayscale' : ''}`} alt={item.name} />
                     </div>
                  </div>
                  <div className="flex flex-col items-center gap-1 px-1">
                     <span className="text-[10px] font-black text-slate-800 dark:text-white truncate w-full text-center uppercase tracking-tight">{item.name}</span>
                     {item.isOwned ? (
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Đã sở hữu</span>
                     ) : item.levelRequired ? (
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Lv. {item.levelRequired}</span>
                     ) : (
                        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${item.currency === 'Gold' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700'}`}>
                           <span className="material-symbols-outlined !text-[10px] material-symbols-filled">{item.currency === 'Gold' ? 'monetization_on' : 'token'}</span>
                           {item.price} {item.currency === 'Tokens' ? 'GFM' : ''}
                        </div>
                     )}
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-gray-100 dark:border-white/5 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
           <div className="flex justify-between items-center mb-5 px-1">
              <div className="flex flex-col">
                 <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Số dư hiện tại</span>
                 <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                       <span className="material-symbols-outlined text-yellow-500 !text-base material-symbols-filled">monetization_on</span>
                       <span className="text-sm font-black dark:text-white">12,450</span>
                    </div>
                    <div className="w-px h-3 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex items-center gap-1.5">
                       <span className="material-symbols-outlined text-purple-500 !text-base">token</span>
                       <span className="text-sm font-black dark:text-white">5.2 GFM</span>
                    </div>
                 </div>
              </div>
              <button className="size-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
                 <span className="material-symbols-outlined">restart_alt</span>
              </button>
           </div>
           <button 
             onClick={() => {
                alert("Đã lưu trang phục thành công!");
                onBack();
             }}
             className="w-full h-14 bg-primary hover:bg-primary-dark active:scale-[0.98] transition-all text-black font-black text-sm uppercase tracking-[0.2em] rounded-2xl shadow-glow flex items-center justify-center gap-3"
           >
              <span className="material-symbols-outlined font-black">save</span>
              Lưu thay đổi
           </button>
        </div>
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-fadeInLeft { animation: fadeInLeft 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AvatarProfile;
