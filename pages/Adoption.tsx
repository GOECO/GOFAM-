
import React, { useState } from 'react';
import { Page } from '../types';

interface Props { onBack: () => void; onNavigate: (page: Page) => void; }

const Adoption: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('crop');

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-gray-100 transition-colors duration-200">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 flex items-center bg-white dark:bg-surface-dark p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800 transition-colors backdrop-blur-md bg-opacity-95">
        <button onClick={onBack} className="text-text-main-light dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full active:bg-gray-100 dark:active:bg-gray-700 cursor-pointer">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <div className="flex flex-col items-center flex-1">
          <h2 className="text-text-main-light dark:text-white text-lg font-black leading-tight tracking-tight">Gói Đầu Tư</h2>
          <span className="text-[10px] uppercase font-black text-primary tracking-[0.2em]">Pro Farming</span>
        </div>
        <button onClick={() => onNavigate('wallet')} className="flex size-10 items-center justify-center cursor-pointer rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-gray-400">history</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        {/* Sub-header Filter Tabs */}
        <div className="bg-white dark:bg-surface-dark pb-3 sticky top-[62px] z-40 shadow-sm transition-colors px-4 pt-3 border-b border-gray-50 dark:border-gray-800/50">
          <div className="flex p-1 bg-gray-100 dark:bg-gray-800/60 rounded-[1.25rem] gap-1">
            <button 
              onClick={() => setActiveTab('crop')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeTab === 'crop' ? 'bg-white dark:bg-primary shadow-sm text-text-main-light dark:text-black' : 'text-gray-500'}`}
            >
              <span className={`material-symbols-outlined text-[18px] ${activeTab === 'crop' ? 'material-symbols-filled' : ''}`}>potted_plant</span>
              Cây trồng
            </button>
            <button 
              onClick={() => setActiveTab('pets')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeTab === 'pets' ? 'bg-white dark:bg-primary shadow-sm text-text-main-light dark:text-black' : 'text-gray-500'}`}
            >
              <span className={`material-symbols-outlined text-[18px] ${activeTab === 'pets' ? 'material-symbols-filled' : ''}`}>pets</span>
              Vật nuôi
            </button>
            <button className="flex-1 py-2.5 px-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center justify-center gap-2 hover:bg-white/50 transition-all">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Bộ lọc
            </button>
          </div>
        </div>

        {/* High ROI Horizontal Section */}
        <section className="pt-8 pb-2">
          <div className="flex items-center justify-between px-5 mb-5">
            <h2 className="text-text-main-light dark:text-white text-xl font-black leading-tight flex items-center gap-2 tracking-tight">
              <span className="material-symbols-outlined text-orange-500 material-symbols-filled">trending_up</span>
              Cơ hội ROI cao
            </h2>
          </div>
          
          <div className="flex w-full overflow-x-auto no-scrollbar px-4 pb-6 gap-5 snap-x">
            {/* Highlight Card 1 */}
            <div className="flex-none w-[310px] snap-center bg-white dark:bg-surface-dark rounded-[2.5rem] shadow-xl overflow-hidden relative border border-gray-100 dark:border-gray-800 group active:scale-[0.98] transition-transform">
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <span className="bg-red-500 text-white text-[9px] font-black px-3 py-1 rounded-full backdrop-blur-md bg-opacity-90 shadow-lg tracking-widest">HOT</span>
                <span className="bg-black/60 text-white text-[9px] font-black px-3 py-1 rounded-full backdrop-blur-md border border-white/20 tracking-widest uppercase">Rủi ro: Thấp</span>
              </div>
              
              <div className="h-44 w-full bg-cover bg-center relative" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA977HKZRR-Dag1zgPIkxM20h8bro74MFR7XUoHGMpnKrEkbR0xxOnYfNmN2mc7_m-lOMPyb1C3wzIW9g_RDcccGPmJfkS8AxCS-UASx96O8OlIGipqD_v0DVnheVBPdsm0dL6uK6YIwbdri52a44t1hd58ghMBYMvZRGNmlVG74G4plBAfe0AQnFJbQ00L6PwQIZID29wilaQISn6deq8Fk6UBwft0xhkoIWmLIb65OtfZStF-kJbFfe6S9OlWVG_1z7kMke8ihFgy")' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-primary text-black flex flex-col items-center justify-center h-14 w-14 rounded-2xl shadow-xl border-2 border-white/10">
                  <span className="text-[10px] font-black leading-none uppercase tracking-tighter">ROI</span>
                  <span className="text-xl font-black leading-none mt-1">15%</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-black leading-tight tracking-tight">Cà Chua Bi Organic</h3>
                  <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-1.5 opacity-80">Farm: GreenFarm Đà Lạt</p>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-6 mb-5">
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                      <span className="text-gray-400">Tiến độ gọi vốn</span>
                      <span className="text-primary">85%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(19,236,73,0.4)]" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest block mb-1">Kỳ hạn</span>
                    <span className="text-sm font-black dark:text-white">45 Ngày</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 text-[11px] font-black uppercase tracking-widest text-text-main-light dark:text-white border border-gray-100 dark:border-gray-800 rounded-2xl hover:bg-gray-50 transition-colors">Chi tiết</button>
                  <button className="py-3 text-[11px] font-black uppercase tracking-widest text-black bg-primary rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-all">Đầu tư ngay</button>
                </div>
              </div>
            </div>

            {/* Highlight Card 2 */}
            <div className="flex-none w-[310px] snap-center bg-white dark:bg-surface-dark rounded-[2.5rem] shadow-xl overflow-hidden relative border border-gray-100 dark:border-gray-800 group active:scale-[0.98] transition-transform">
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <span className="bg-blue-500 text-white text-[9px] font-black px-3 py-1 rounded-full backdrop-blur-md bg-opacity-90 shadow-lg tracking-widest">MỚI</span>
                <span className="bg-black/60 text-white text-[9px] font-black px-3 py-1 rounded-full backdrop-blur-md border border-white/20 tracking-widest uppercase">Rủi ro: TB</span>
              </div>
              
              <div className="h-44 w-full bg-cover bg-center relative" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCqbQrFCWsuD4GppxCMGHEjd3oPimgCIvAyaNoZs9OEJrOAUo2sdaU82bL_JSvhYfY-fH9pceTnVoLPp2yqBFh9bpZjt2CgvSGlVodXhpEuXWRrIESdLj381hQfeE9Ned4HjPHfMi21nCDHWCETg-RtxFsqdfdLYZoX4FAqNLhxevcD3fAXGcoOtsTfuIXUiyfuwPE5KOzxZ--KZY4t7hn1OguAyPU-_h6W4yaAZvNwlBvPKWDGoGRNhzYvg6D25PbjFyoCtfeRRKN7")' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-primary text-black flex flex-col items-center justify-center h-14 w-14 rounded-2xl shadow-xl border-2 border-white/10">
                  <span className="text-[10px] font-black leading-none uppercase tracking-tighter">ROI</span>
                  <span className="text-xl font-black leading-none mt-1">22%</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-black leading-tight tracking-tight">Dưa Lưới Hoàng Gia</h3>
                  <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-1.5 opacity-80">Farm: Royal Fruits</p>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-6 mb-5">
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                      <span className="text-gray-400">Tiến độ gọi vốn</span>
                      <span className="text-blue-500">32%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest block mb-1">Kỳ hạn</span>
                    <span className="text-sm font-black dark:text-white">90 Ngày</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 text-[11px] font-black uppercase tracking-widest text-text-main-light dark:text-white border border-gray-100 dark:border-gray-800 rounded-2xl hover:bg-gray-50 transition-colors">Chi tiết</button>
                  <button className="py-3 text-[11px] font-black uppercase tracking-widest text-black bg-primary rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-all">Đầu tư ngay</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vertical List Section */}
        <section className="px-4 py-4">
          <div className="flex justify-between items-end mb-6 px-1">
            <h2 className="text-text-main-light dark:text-white text-xl font-black tracking-tight uppercase">Danh sách khả dụng</h2>
            <div className="flex items-center gap-1.5 text-[10px] text-primary font-black uppercase tracking-widest cursor-pointer hover:underline">
              <span>ROI cao nhất</span>
              <span className="material-symbols-outlined !text-base">sort</span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Item 1 */}
            <div className="bg-white dark:bg-surface-dark rounded-[2rem] p-5 shadow-sm border border-gray-100 dark:border-gray-800 transition-all active:scale-[0.99]">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="size-16 shrink-0 rounded-2xl bg-cover bg-center border border-gray-100 dark:border-gray-700 shadow-inner" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAF_mQFClHp4pdW3qAVst-OXjqH9mGNgz4PSGd2NSHg_g4es_kDmN-l-Ay8SRa7iCq2vSYwMlcchFhLMcC55RG0n8XTfTCRYd3sO4RW5jtgAGhOct8IEwqQLV9ZLfmMeWdAywTCtGAxqDZ3N_wIjS3b__uZJg8N0Wj4uDKY_leaE5XY-AnMtAqeoMkTEf04GJYOv5wapjk1ZtCVe4v5cwlno9bM7GGm_OX9hH27Bw98FP1vvjQkY_K8ovxxo9o30vGdkls7eFWW8kqk")' }}></div>
                  <div className="min-w-0">
                    <h3 className="text-base font-black text-text-main-light dark:text-white leading-tight truncate">Rau Xà Lách Thủy Canh</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[9px] font-black px-2 py-0.5 rounded-lg border border-green-100 dark:border-green-800 uppercase tracking-widest">VietGAP</span>
                      <span className="bg-gray-50 dark:bg-gray-800 text-gray-400 text-[9px] font-black px-2 py-0.5 rounded-lg border border-gray-100 dark:border-gray-700 uppercase tracking-widest">Code: XL-054</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-green-100 dark:border-green-800 mb-2">Rủi ro: Thấp</div>
                  <div className="text-primary font-black text-2xl leading-none">12%</div>
                  <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">ROI / Chu kỳ</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-3 mb-4 border border-gray-100 dark:border-gray-800/50">
                <div className="flex flex-col border-r border-gray-200 dark:border-gray-800 pr-2">
                  <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest mb-1">Kỳ hạn</span>
                  <span className="text-xs font-black dark:text-white">45 Ngày</span>
                </div>
                <div className="flex flex-col border-r border-gray-200 dark:border-gray-800 px-2">
                  <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest mb-1">Vốn min</span>
                  <span className="text-xs font-black dark:text-white">2.0 Tr</span>
                </div>
                <div className="flex flex-col pl-2">
                  <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest mb-1">Lợi nhuận</span>
                  <span className="text-xs font-black text-primary">~240k</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-5 px-1">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                    <span className="material-symbols-outlined text-lg">water_drop</span>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Tiếp theo</p>
                    <p className="text-[11px] font-black dark:text-white">Bơm dinh dưỡng (Tự động)</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="h-8 w-24">
                    <svg className="w-full h-full stroke-primary fill-none" viewBox="0 0 100 30">
                      <path d="M0 25 Q 10 25 20 20 T 40 15 T 60 10 T 80 5 T 100 2" stroke-linecap="round" strokeWidth="2.5" className="drop-shadow-[0_0_5px_rgba(19,236,73,0.5)]"></path>
                    </svg>
                  </div>
                  <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mt-1">Xu hướng giá</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3.5 rounded-2xl border border-gray-100 dark:border-gray-800 text-[11px] font-black uppercase tracking-widest text-text-main-light dark:text-white hover:bg-gray-50 transition-colors">Chi tiết</button>
                <button className="flex-1 py-3.5 rounded-2xl bg-primary text-black text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  Đăng ký ngay
                  <span className="material-symbols-outlined !text-base">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Item 2 */}
            <div className="bg-white dark:bg-surface-dark rounded-[2rem] p-5 shadow-sm border border-gray-100 dark:border-gray-800 transition-all active:scale-[0.99]">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="size-16 shrink-0 rounded-2xl bg-cover bg-center border border-gray-100 dark:border-gray-700 shadow-inner" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAIZVfptTZdxH44ojjmJluJhbJeQHjHH1ow-0LWz16U7v6RBSCgW_UcBnuubNvFRO3BlxvuRZWY915GiaPiw2LvwO1WffUKhdFx9eUlHl8rf5V-6SzblTrrm-ur5Z86uNX-7KzD3cV1pn8FQ5JIYkh4f7lckDOgJtOK6WMhWTA8pbekvofW0tvRunXv-8qXblPdfc-KfNxMoge0Expwm6dGglvczP767DtwgJ9vdmc1R4gsrDq4dJLHJRBw9UxGZYeruCaCs9k8V5x_")' }}></div>
                  <div className="min-w-0">
                    <h3 className="text-base font-black text-text-main-light dark:text-white leading-tight truncate">Gà Thả Vườn</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[9px] font-black px-2 py-0.5 rounded-lg border border-blue-100 dark:border-blue-800 uppercase tracking-widest">Organic</span>
                      <span className="bg-gray-50 dark:bg-gray-800 text-gray-400 text-[9px] font-black px-2 py-0.5 rounded-lg border border-gray-100 dark:border-gray-700 uppercase tracking-widest">Code: GA-112</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-yellow-100 dark:border-yellow-800 mb-2">Rủi ro: TB</div>
                  <div className="text-primary font-black text-2xl leading-none">18%</div>
                  <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">ROI / Chu kỳ</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-3 mb-4 border border-gray-100 dark:border-gray-800/50">
                <div className="flex flex-col border-r border-gray-200 dark:border-gray-800 pr-2">
                  <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest mb-1">Kỳ hạn</span>
                  <span className="text-xs font-black dark:text-white">4 Tháng</span>
                </div>
                <div className="flex flex-col border-r border-gray-200 dark:border-gray-800 px-2">
                  <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest mb-1">Vốn min</span>
                  <span className="text-xs font-black dark:text-white">5.0 Tr</span>
                </div>
                <div className="flex flex-col pl-2">
                  <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest mb-1">Lợi nhuận</span>
                  <span className="text-xs font-black text-primary">~900k</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-5 px-1">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-500">
                    <span className="material-symbols-outlined text-lg">vaccines</span>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Tiếp theo</p>
                    <p className="text-[11px] font-black dark:text-white">Tiêm phòng đợt 2 (12/10)</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="h-8 w-24">
                    <svg className="w-full h-full stroke-primary fill-none" viewBox="0 0 100 30">
                      <path d="M0 20 Q 20 25 40 20 T 60 15 T 80 5 T 100 10" stroke-linecap="round" strokeWidth="2.5"></path>
                    </svg>
                  </div>
                  <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mt-1">Xu hướng giá</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3.5 rounded-2xl border border-gray-100 dark:border-gray-800 text-[11px] font-black uppercase tracking-widest text-text-main-light dark:text-white hover:bg-gray-50 transition-colors">Chi tiết</button>
                <button className="flex-1 py-3.5 rounded-2xl bg-primary text-black text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  Đăng ký ngay
                  <span className="material-symbols-outlined !text-base">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Expired Item */}
            <div className="bg-white dark:bg-surface-dark rounded-[2rem] p-5 shadow-sm border border-gray-100 dark:border-gray-800 opacity-60 relative grayscale cursor-not-allowed">
              <div className="absolute inset-0 z-10 bg-white/10 dark:bg-black/10"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-[0.2em] z-20 shadow-2xl whitespace-nowrap">Đã hết suất</div>
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="size-16 shrink-0 rounded-2xl bg-cover bg-center border border-gray-100 dark:border-gray-700 shadow-inner opacity-50" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBLba-61Leq_2hN7eM2XyT0ukY8sgYW2qjP-YxuG7Q5Q5xlr2L7JJ_yyz3qyyHVURTo_poUBUe2M33938T-CDf_YnpPuHyYqP8BUY4p--nS9Hii2zGFARYZK_pXWQFJd0_zHOFkF62sIgwANWF2vnP0gkd_8LuftNnzbFT6RhE4duvDF-j50jXfQ4LDkKdem6QsPfq55IDM2cj-OLa1kXkR4PXSyBPCS-pQSxZ6D-39mayCCi9OKEDw8ztpFJmz0rTCNEHdJEKcaiKo")' }}></div>
                  <div className="min-w-0">
                    <h3 className="text-base font-black text-text-main-light dark:text-white leading-tight truncate">Cà Tím Nhật Bản</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 text-[9px] font-black px-2 py-0.5 rounded-lg border border-gray-200 dark:border-gray-700 uppercase tracking-widest">GlobalGAP</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-gray-200 dark:border-gray-700 mb-2">Rủi ro: Thấp</div>
                  <div className="text-gray-400 font-black text-2xl leading-none">14%</div>
                  <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">ROI / Chu kỳ</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-3 mb-4 border border-gray-100 dark:border-gray-800/50">
                <div className="flex flex-col border-r border-gray-200 dark:border-gray-800 pr-2">
                  <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest mb-1">Kỳ hạn</span>
                  <span className="text-xs font-black dark:text-white">60 Ngày</span>
                </div>
                <div className="flex flex-col border-r border-gray-200 dark:border-gray-800 px-2">
                  <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest mb-1">Vốn min</span>
                  <span className="text-xs font-black dark:text-white">3.0 Tr</span>
                </div>
                <div className="flex flex-col pl-2">
                  <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest mb-1">Lợi nhuận</span>
                  <span className="text-xs font-black text-gray-500">~420k</span>
                </div>
              </div>
              
              <button className="w-full py-3.5 rounded-2xl border border-gray-100 dark:border-gray-800 text-[10px] font-black uppercase tracking-widest text-gray-400">Nhận thông báo khi có suất mới</button>
            </div>
          </div>
        </section>
      </main>

      {/* Analytics FAB */}
      <button className="fixed bottom-24 right-5 z-[60] bg-white dark:bg-surface-dark p-1 rounded-full shadow-2xl border-2 border-primary group hover:scale-110 transition-transform active:scale-95">
        <div className="bg-primary text-black h-12 w-12 rounded-full flex items-center justify-center relative">
          <span className="material-symbols-outlined material-symbols-filled !text-[28px]">analytics</span>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[8px] text-white font-black items-center justify-center shadow-lg border border-white dark:border-surface-dark">!</span>
          </span>
        </div>
      </button>

      {/* Global Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-[70] bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 px-6 py-2 flex justify-between items-center h-20 pb-6 transition-colors shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button onClick={onBack} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">home</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Trang chủ</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-primary scale-105">
          <span className="material-symbols-outlined material-symbols-filled !text-[26px]">potted_plant</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Nuôi trồng</span>
        </button>
        <button onClick={() => onNavigate('reports')} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">monitoring</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Đầu tư</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">person</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Cá nhân</span>
        </button>
      </nav>

      <style>{`
        .shadow-glow { box-shadow: 0 0 20px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Adoption;
