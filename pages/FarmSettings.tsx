
import React, { useState } from 'react';
import { Page } from '../types';

interface Props { 
  onBack: () => void; 
  onNavigate?: (page: Page) => void;
}

const FarmSettings: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const handleCopyWallet = () => {
    navigator.clipboard.writeText("0x71C...9A2");
    alert("Đã sao chép địa chỉ ví!");
  };

  return (
    <div className="relative flex flex-col h-screen w-full bg-background-dark text-white font-display overflow-hidden selection:bg-primary selection:text-black">
      {/* Top App Bar */}
      <div className="flex items-center bg-background-dark/90 backdrop-blur-md p-4 pb-2 justify-between z-20 sticky top-0 border-b border-white/5">
        <button 
          onClick={onBack}
          className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-all active:scale-90"
        >
          <span className="material-symbols-outlined font-bold text-2xl">arrow_back</span>
        </button>
        <h2 className="text-white text-lg font-black leading-tight tracking-[0.15em] flex-1 text-center uppercase pr-10">Hồ sơ & Cài đặt</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Profile Header */}
        <div className="flex flex-col items-center pt-8 px-6 pb-8 animate-fadeIn">
          {/* Avatar with Level Badge */}
          <div className="relative mb-6">
            <div 
              className="rounded-full h-28 w-28 border-4 border-primary shadow-glow bg-center bg-cover"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDqcEQW_0vD1Z_YiwogWtvohRN4CDKtylqZj6TCslOCuCnQeFHuEuyUXsLKPvBFA_Na8iIN_o4d3En813-jMUbQ98-fym0LMEsND-n2t4iove_GoDY-AnEGQA7_SAu1EV192bkDfoMrRPx-se6qXfqzSPSbAJexGsYU2nj7qK9vJfmyVbvRNLFC4O29MyDQX6fooJl1FXAWUKUtBi-ncI8l1DcWSnmYlS31LyZ_NY3jKOQiGLft09liJUuUlAw_9CI8964OZ2CSA82O")' }}
            ></div>
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-black text-[10px] font-black px-2.5 py-1 rounded-full border-2 border-background-dark shadow-xl">
              LVL 12
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-center justify-center gap-1.5 mb-6">
            <div className="flex items-center gap-2">
              <h1 className="text-white text-3xl font-black tracking-tight">Farmer_John</h1>
              <span className="material-symbols-outlined text-blue-400 text-xl material-symbols-filled">verified</span>
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">john.doe@fintech.com</p>
          </div>

          {/* Wallet Address Pill */}
          <div 
            onClick={handleCopyWallet}
            className="w-full max-w-[320px] bg-surface-dark rounded-2xl p-1.5 pr-4 flex items-center justify-between border border-white/5 mb-5 group cursor-pointer active:scale-95 transition-all"
          >
            <div className="flex items-center gap-3 bg-black/40 rounded-xl px-4 py-2 border border-white/5">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-glow"></div>
              <p className="text-gray-400 text-sm font-mono tracking-wider">0x71C...9A2</p>
            </div>
            <span className="material-symbols-outlined text-gray-500 text-lg group-hover:text-primary transition-colors">content_copy</span>
          </div>

          {/* Action Button */}
          <button className="flex items-center justify-center gap-2 rounded-2xl h-12 px-8 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-[0.2em] w-full max-w-[220px] transition-all active:scale-95">
            Xem khóa công khai
            <span className="material-symbols-outlined !text-base">qr_code</span>
          </button>
        </div>

        {/* Stats Summary */}
        <div className="px-5 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-dark rounded-3xl p-5 border border-white/5 flex flex-col gap-2 shadow-lg">
              <p className="text-gray-500 text-[9px] uppercase font-black tracking-[0.2em]">GOFAM TOKEN</p>
              <div className="flex items-center gap-2">
                <span className="text-primary text-xl font-black">1,240.50</span>
                <span className="material-symbols-outlined text-primary text-base font-black">trending_up</span>
              </div>
            </div>
            <div className="bg-surface-dark rounded-3xl p-5 border border-white/5 flex flex-col gap-2 shadow-lg">
              <p className="text-gray-500 text-[9px] uppercase font-black tracking-[0.2em]">THU NHẬP (USDT)</p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-xl font-black">$482.20</span>
                <span className="material-symbols-outlined text-yellow-400 text-base material-symbols-filled">payments</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/5 w-full mb-8"></div>

        {/* General Settings Section */}
        <div className="px-5 mb-8">
          <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 pl-1">Cài đặt chung</h3>
          <div className="bg-surface-dark rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
            {/* Language Item */}
            <div className="flex items-center gap-4 p-5 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center justify-center rounded-2xl bg-primary/10 shrink-0 size-11 text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined !text-2xl font-bold">translate</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-black uppercase tracking-tight">Ngôn ngữ</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Tiếng Việt</p>
                <span className="material-symbols-outlined text-gray-600">chevron_right</span>
              </div>
            </div>
            <div className="h-px bg-white/5 mx-5"></div>
            
            {/* Dark Mode Item */}
            <div className="flex items-center gap-4 p-5 group">
              <div className="flex items-center justify-center rounded-2xl bg-blue-500/10 shrink-0 size-11 text-blue-400 border border-blue-500/20 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined !text-2xl font-bold">dark_mode</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-black uppercase tracking-tight">Giao diện tối</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isDarkMode} 
                  onChange={(e) => setIsDarkMode(e.target.checked)} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
              </label>
            </div>
            <div className="h-px bg-white/5 mx-5"></div>

            {/* Notifications Item */}
            <div className="flex items-center gap-4 p-5 group">
              <div className="flex items-center justify-center rounded-2xl bg-yellow-400/10 shrink-0 size-11 text-yellow-400 border border-yellow-400/20 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined !text-2xl font-bold">notifications</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-black uppercase tracking-tight">Thông báo</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isNotificationsEnabled} 
                  onChange={(e) => setIsNotificationsEnabled(e.target.checked)} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="px-5 mb-8">
          <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 pl-1">Bảo mật & Riêng tư</h3>
          <div className="bg-surface-dark rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
            {/* 2FA Item */}
            <div className="flex items-center gap-4 p-5 hover:bg-white/5 cursor-pointer group transition-colors">
              <div className="flex items-center justify-center rounded-2xl bg-primary/10 shrink-0 size-11 text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined !text-2xl font-bold">shield_lock</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-black uppercase tracking-tight">Xác thực 2 yếu tố (2FA)</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-primary text-[10px] font-black uppercase tracking-widest">Đã bật</p>
                <span className="material-symbols-outlined text-gray-600">chevron_right</span>
              </div>
            </div>
            <div className="h-px bg-white/5 mx-5"></div>
            
            {/* Password Item */}
            <div className="flex items-center gap-4 p-5 hover:bg-white/5 cursor-pointer group transition-colors">
              <div className="flex items-center justify-center rounded-2xl bg-white/5 shrink-0 size-11 text-white border border-white/10 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined !text-2xl font-bold">key</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-black uppercase tracking-tight">Đổi mật khẩu</p>
              </div>
              <span className="material-symbols-outlined text-gray-600">chevron_right</span>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="px-5 mt-10 mb-12">
          <button className="w-full flex items-center justify-center gap-3 py-5 rounded-[1.5rem] border border-red-500/20 text-red-500 font-black text-xs uppercase tracking-[0.2em] bg-red-500/5 hover:bg-red-500/10 transition-all active:scale-[0.98]">
            <span className="material-symbols-outlined font-black">logout</span>
            Đăng xuất
          </button>
          <p className="text-center text-gray-600 text-[10px] font-bold mt-6 uppercase tracking-widest opacity-50 italic">GOFAM PRO v1.0.2 (Build 240)</p>
        </div>
      </div>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0c120f]/90 backdrop-blur-xl border-t border-white/5 px-6 py-2 pb-8 z-40 max-w-md mx-auto">
        <div className="flex justify-between items-end">
          <button 
            onClick={() => onNavigate?.('dashboard')}
            className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-white transition-all p-2 group"
          >
            <span className="material-symbols-outlined text-[26px] group-hover:scale-110 transition-transform">grid_view</span>
            <span className="text-[9px] font-black uppercase tracking-widest">Tổng quan</span>
          </button>
          <button 
            onClick={() => onNavigate?.('areas')}
            className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-white transition-all p-2 group"
          >
            <span className="material-symbols-outlined text-[26px] group-hover:scale-110 transition-transform">agriculture</span>
            <span className="text-[9px] font-black uppercase tracking-widest">Nông trại</span>
          </button>
          <div className="relative -top-8 group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all"></div>
            <button 
              onClick={() => onNavigate?.('wallet')}
              className="relative flex items-center justify-center size-15 rounded-full bg-primary text-black shadow-glow border-[6px] border-[#0c120f] transition-transform hover:scale-110 active:scale-95"
            >
              <span className="material-symbols-outlined text-[32px] font-black material-symbols-filled">account_balance_wallet</span>
            </button>
          </div>
          <button 
            onClick={() => onNavigate?.('marketplace')}
            className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-white transition-all p-2 group"
          >
            <span className="material-symbols-outlined text-[26px] group-hover:scale-110 transition-transform">monitoring</span>
            <span className="text-[9px] font-black uppercase tracking-widest">Thị trường</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 text-primary p-2 transition-all">
            <span className="material-symbols-outlined text-[28px] material-symbols-filled">person</span>
            <span className="text-[9px] font-black uppercase tracking-widest">Hồ sơ</span>
          </button>
        </div>
      </nav>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(54, 226, 120, 0.4); }
        .size-15 { width: 3.75rem; height: 3.75rem; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default FarmSettings;
