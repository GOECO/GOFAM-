
import React, { useState } from 'react';
import { Page } from '../types';

interface Phase {
  name: string;
  desc: string;
  duration: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface InvestmentItem {
  id: string;
  type: 'crop' | 'pets' | 'ai';
  name: string;
  img: string;
  roi: string;
  risk: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  duration: string;
  minCapital: string;
  profit: string;
  code: string;
  cert: string;
}

const OPPORTUNITIES: InvestmentItem[] = [
  { id: 'inv-ai-1', type: 'ai', name: 'AI Chẩn đoán #01', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDizaS0wKE40w5KOd9VzUwc2xjR86J9IVGybwrwkROFPUo4mynbfYxgqFBmIVBSKz8sC4IQDLHR0vQcOoaoedUXLteVKErSj1FiN3GIIvCCZCkD2pVnaeGxKDU4qEZv25-SXjsBz9oMGWpidP6me6U43bmP0MLVhjQusqTPcjoT4AUyf0Z0D05qvDaKkLTREEooaXJOR2Z-FHfTTQy0_1zVvCTfqU84vaHwNsIln6TVIXsIM8p4mj-WzWlK4l23eN10QEMGD8TCtIbA', roi: '25%', risk: 'Thấp', riskLevel: 'Low', duration: '12 Th', minCapital: '50Tr', profit: '~12.5Tr', code: 'AI-HUB-01', cert: 'Pro Agri' },
  { id: 'inv-1', type: 'crop', name: 'Dâu Tây Hana', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFtjkZ7crdWzXm-WjSRdnKkUVk2m309yFLPOeJuqOcHkmGCugy_KYGDKjJa6ejB4ARPz1ohCfxrLnTMI_9x63gr5StUoPPgAc9J1_uot5byTq-bP3vcWDxPWxUGysRkRj9_ozhrB5a91DGfnBsScqYv9C2mwW6oQmHqWVT4KXzRlZNrJIgPVwo1BZhocHaenPEn0AhRmSAL41-ZpFs_vpPsY9XPDrbnhETl4_fY9E6war51MXBuOnpm1PLGAwTbJXIMMC_aPfqP-9b', roi: '18%', risk: 'Thấp', riskLevel: 'Low', duration: '45 Ngày', minCapital: '5Tr', profit: '~900k', code: 'DT-01', cert: 'VietGAP' },
  { id: 'inv-2', type: 'pets', name: 'Gà Hữu Cơ', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVptTZdxH44ojjmJluJhbJeQHjHH1ow-0LWz16U7v6RBSCgW_UcBnuubNvFRO3BlxvuRZWY915GiaPiw2LvwO1WffUKhdFx9eUlHl8rf5V-6SzblTrrm-ur5Z86uNX-7KzD3cV1pn8FQ5JIYkh4f7lckDOgJtOK6WMhWTA8pbekvofW0tvRunXv-8qXblPdfc-KfNxMoge0Expwm6dGglvczP767DtwgJ9vdmc1R4gsrDq4dJLHJRBw9UxGZYeruCaCs9k8V5x_', roi: '12%', risk: 'TB', riskLevel: 'Medium', duration: '4 Th', minCapital: '10Tr', profit: '~1.2Tr', code: 'GA-02', cert: 'Organic' },
];

interface Props { onBack: () => void; onNavigate: (page: Page) => void; }

const Adoption: React.FC<Props> = ({ onBack, onNavigate }) => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24 font-display">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="size-10 rounded-full hover:bg-black/5 flex items-center justify-center active-scale transition-colors">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <div className="text-center flex-1">
          <h1 className="text-xl font-bold dark:text-white uppercase tracking-tight">Nuôi Hộ Pro</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Đầu tư nông nghiệp số</p>
        </div>
        <button className="size-10 rounded-full flex items-center justify-center text-primary active-scale">
          <span className="material-symbols-outlined !text-2xl">account_balance_wallet</span>
        </button>
      </header>

      <div className="p-4 space-y-3">
        <div className="bg-primary/10 border border-primary/20 rounded-[2rem] p-5 flex items-start gap-3">
          <span className="material-symbols-outlined text-primary-dark !text-[32px]">volunteer_activism</span>
          <div>
            <h3 className="font-black text-xs text-primary-dark uppercase tracking-widest mb-1">Cơ chế nuôi hộ</h3>
            <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-tight font-medium">Bạn góp vốn đầu tư, trang trại trực tiếp vận hành. Lợi nhuận chia sẻ sau thu hoạch.</p>
          </div>
        </div>

        <div className="grid gap-2">
          {OPPORTUNITIES.map((item) => (
            <div 
              key={item.id}
              className="bg-white dark:bg-surface-dark rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm active-scale transition-all group"
            >
              <div className="relative aspect-[21/9]">
                <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur rounded-lg px-2 py-1 text-[8px] font-black text-white uppercase border border-white/20">
                  {item.code}
                </div>
                <div className="absolute bottom-3 right-3 bg-primary text-black px-3 py-1 rounded-full text-[11px] font-black uppercase shadow-lg">
                  ROI {item.roi}
                </div>
              </div>
              <div className="p-4 pt-3">
                <div className="flex justify-between items-center mb-3">
                  <div className="min-w-0 flex-1 pr-2">
                    <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight truncate leading-none">{item.name}</h3>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">{item.cert} • {item.duration}</p>
                  </div>
                  <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border shrink-0 ${
                    item.riskLevel === 'Low' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-yellow-50 text-yellow-600 border-yellow-200'
                  }`}>
                    Rủi ro {item.risk}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-1 mb-4">
                  <div className="bg-gray-50 dark:bg-black/20 p-2 rounded-xl text-center border border-gray-100 dark:border-gray-800">
                    <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-0.5">Vốn vào</p>
                    <p className="text-[13px] font-black text-slate-900 dark:text-white">{item.minCapital}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-black/20 p-2 rounded-xl text-center border border-gray-100 dark:border-gray-800">
                    <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-0.5">Lợi nhuận</p>
                    <p className="text-[13px] font-black text-slate-900 dark:text-white">{item.profit}</p>
                  </div>
                  <button className="bg-primary text-black rounded-xl font-black text-[10px] uppercase tracking-widest shadow-glow active-scale flex items-center justify-center">
                    Tham gia
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 10px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default Adoption;
