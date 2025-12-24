
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
  type: 'crop' | 'pets';
  name: string;
  img: string;
  roi: string;
  baseRoiNum: number;
  actualRoiNum: number;
  risk: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  duration: string;
  startDate: string;
  endDate: string;
  minCapital: string;
  profit: string;
  code: string;
  cert: string;
  description: string;
  riskBreakdown: { weather: string; disease: string; market: string };
  metrics: { successRate: number; historicalRoi: string; demand: string; yieldQuality: number };
  roadmap: Phase[];
  profitCurve: number[];
}

const OPPORTUNITIES: InvestmentItem[] = [
  {
    id: 'inv-1',
    type: 'crop',
    name: 'Rau Xà Lách Thủy Canh',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF_mQFClHp4pdW3qAVst-OXjqH9mGNgz4PSGd2NSHg_g4es_kDmN-l-Ay8SRa7iCq2vSYwMlcchFhLMcC55RG0n8XTfTCRYd3sO4RW5jtgAGhOct8IEwqQLV9ZLfmMeWdAywTCtGAxqDZ3N_wIjS3b__uZJg8N0Wj4uDKY_leaE5XY-AnMtAqeoMkTEf04GJYOv5wapjk1ZtCVe4v5cwlno9bM7GGm_OX9hH27Bw98FP1vvjQkY_K8ovxxo9o30vGdkls7eFWW8kqk',
    roi: '12%',
    baseRoiNum: 12,
    actualRoiNum: 11.8,
    risk: 'Thấp',
    riskLevel: 'Low',
    duration: '45 Ngày',
    startDate: '15/10/2023',
    endDate: '30/11/2023',
    minCapital: '2.0 Tr',
    profit: '~240k',
    code: 'XL-054',
    cert: 'VietGAP',
    description: 'Dự án áp dụng công nghệ thủy canh hồi lưu màng mỏng (NFT) trong nhà kính khép kín.',
    riskBreakdown: { weather: 'Rất thấp (Kín)', disease: 'Thấp (Phòng ngừa)', market: 'Ổn định' },
    metrics: { successRate: 99.2, historicalRoi: '11.5%', demand: 'Cao', yieldQuality: 92 },
    roadmap: [
      { name: 'Chu chuẩn bị', desc: 'Làm sạch máng', duration: '3 Ngày', status: 'completed' },
      { name: 'Phát triển', desc: 'Nuôi dưỡng cây', duration: '30 Ngày', status: 'current' },
      { name: 'Thu hoạch', desc: 'Bàn giao đối tác', duration: '5 Ngày', status: 'upcoming' }
    ],
    profitCurve: [2, 5, 8, 12, 12, 12]
  },
  {
    id: 'inv-2',
    type: 'pets',
    name: 'Gà Thả Vườn Organic',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVptTZdxH44ojjmJluJhbJeQHjHH1ow-0LWz16U7v6RBSCgW_UcBnuubNvFRO3BlxvuRZWY915GiaPiw2LvwO1WffUKhdFx9eUlHl8rf5V-6SzblTrrm-ur5Z86uNX-7KzD3cV1pn8FQ5JIYkh4f7lckDOgJtOK6WMhWTA8pbekvofW0tvRunXv-8qXblPdfc-KfNxMoge0Expwm6dGglvczP767DtwgJ9vdmc1R4gsrDq4dJLHJRBw9UxGZYeruCaCs9k8V5x_',
    roi: '18%',
    baseRoiNum: 18,
    actualRoiNum: 19.5,
    risk: 'TB',
    riskLevel: 'Medium',
    duration: '4 Tháng',
    startDate: '01/10/2023',
    endDate: '01/02/2024',
    minCapital: '5.0 Tr',
    profit: '~900k',
    code: 'GA-112',
    cert: 'Organic',
    description: 'Chăn nuôi gà thả vườn theo tiêu chuẩn hữu cơ, thức ăn hoàn toàn tự nhiên.',
    riskBreakdown: { weather: 'Trung bình', disease: 'Trung bình', market: 'Biến động nhẹ' },
    metrics: { successRate: 94.5, historicalRoi: '17.2%', demand: 'Rất cao', yieldQuality: 88 },
    roadmap: [
      { name: 'Úm gà', desc: 'Giai đoạn đầu', duration: '1 Tháng', status: 'completed' },
      { name: 'Thả vườn', desc: 'Vận động tự nhiên', duration: '2 Tháng', status: 'current' },
      { name: 'Bàn giao', desc: 'Phân phối', duration: '10 Ngày', status: 'upcoming' }
    ],
    profitCurve: [1, 2, 4, 8, 14, 18]
  },
  {
    id: 'inv-3',
    type: 'crop',
    name: 'Dưa Lưới Inthanon',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1qbECoTDhOcSRvJ7sxbs6fLC5B239mwg2trj0vEs4nXVPNQpQzZWHaZjZpHs0AsQFkmqVcF93Q-8nwseS_GGqVkV5ZPgnQk4nRfE5kKjYb2HLveisVATSxQqbD12-AGsryu7AC0Mb2tzDMKwdFloG03-pPsgY5D7CwDDrvBENlIisHR2HTiFI4GJc8eIujUPRLTzrAfYEusWyxptwCBWwpjRlKlu_qgn_5-DLWKF7suZIogLVrYytRrV8rrWb_OXS7MxyiweA_wrB',
    roi: '22%',
    baseRoiNum: 22,
    actualRoiNum: 20.2,
    risk: 'Cao',
    riskLevel: 'High',
    duration: '90 Ngày',
    startDate: '20/10/2023',
    endDate: '20/01/2024',
    minCapital: '10.0 Tr',
    profit: '~2.2Tr',
    code: 'DL-092',
    cert: 'GlobalGAP',
    description: 'Trồng dưa lưới giống Thái Lan trong nhà màng công nghệ Israel.',
    riskBreakdown: { weather: 'Thấp (Nhà màng)', disease: 'Trung bình', market: 'Ổn định' },
    metrics: { successRate: 91.0, historicalRoi: '20.5%', demand: 'Trung bình', yieldQuality: 95 },
    roadmap: [
      { name: 'Gieo hạt', desc: 'Ươm mầm', duration: '10 Ngày', status: 'completed' },
      { name: 'Chăm sóc', desc: 'Tưới nhỏ giọt', duration: '70 Ngày', status: 'current' },
      { name: 'Thu hoạch', desc: 'Phân loại', duration: '10 Ngày', status: 'upcoming' }
    ],
    profitCurve: [0, 2, 5, 10, 15, 22]
  }
];

interface Props { onBack: () => void; onNavigate: (page: Page) => void; }

const Adoption: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [selectedItem, setSelectedItem] = useState<InvestmentItem | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24 font-display">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="text-center flex-1">
          <h1 className="text-xl font-bold dark:text-white uppercase tracking-tight leading-none">Cơ hội đầu tư</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Nông trại thông minh</p>
        </div>
        <div className="size-10"></div>
      </header>

      <div className="p-4 space-y-6">
        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-5 flex items-start gap-4">
          <span className="material-symbols-outlined text-primary !text-3xl">info</span>
          <div>
            <h3 className="font-bold text-sm text-primary-dark dark:text-primary uppercase tracking-wider mb-1">Cơ chế hoạt động</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              Bạn đầu tư vốn vào các dự án sản xuất thực tế tại trang trại. Đội ngũ chuyên gia và AI của GOFAM sẽ trực tiếp vận hành và báo cáo minh bạch cho bạn.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {OPPORTUNITIES.map((item) => {
            const isExpanded = expandedCards[item.id];
            const maxRoi = Math.max(item.baseRoiNum, item.actualRoiNum) + 5;

            return (
              <div 
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white dark:bg-surface-dark rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm active:scale-[0.99] transition-all cursor-pointer group"
              >
                <div className="relative aspect-video">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.name} />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
                      {item.code}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-primary text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                    Lợi nhuận {item.roi}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none mb-1">{item.name}</h3>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.cert} • {item.duration}</p>
                    </div>
                    <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${
                      item.riskLevel === 'Low' ? 'bg-green-50 text-green-600 border-green-200' : 
                      item.riskLevel === 'High' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-yellow-50 text-yellow-600 border-yellow-200'
                    }`}>
                      Rủi ro {item.risk}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className="bg-gray-50 dark:bg-black/20 p-3 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
                      <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-1">Vốn min</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white">{item.minCapital}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-black/20 p-3 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
                      <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-1">Lợi nhuận</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white">{item.profit}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-black/20 p-3 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
                      <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-1">Thành công</p>
                      <p className="text-sm font-black text-primary">{item.metrics.successRate}%</p>
                    </div>
                  </div>

                  {/* ROI Analysis Bar Chart */}
                  <div className="mb-6 space-y-3 px-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Phân tích ROI Hiệu năng</h4>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <div className="size-1.5 rounded-full bg-slate-200 dark:bg-gray-700"></div>
                          <span className="text-[8px] font-black text-gray-400 uppercase">Kế hoạch</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="size-1.5 rounded-full bg-primary"></div>
                          <span className="text-[8px] font-black text-gray-400 uppercase">Thực tế</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-end gap-3 h-24 pt-2 border-b border-slate-50 dark:border-gray-800/50">
                      <div className="flex-1 flex items-end justify-center gap-2 h-full group/bars">
                        <div className="relative flex flex-col items-center w-6">
                           <span className="text-[8px] font-black text-gray-400 mb-1">{item.baseRoiNum}%</span>
                           <div className="w-full bg-slate-100 dark:bg-gray-800 rounded-t-lg transition-all duration-700" style={{ height: `${(item.baseRoiNum / maxRoi) * 100}%` }}></div>
                        </div>
                        <div className="relative flex flex-col items-center w-6">
                           <span className="text-[8px] font-black text-primary mb-1">{item.actualRoiNum}%</span>
                           <div className={`w-full rounded-t-lg transition-all duration-1000 shadow-glow ${item.actualRoiNum >= item.baseRoiNum ? 'bg-primary' : 'bg-orange-400'}`} style={{ height: `${(item.actualRoiNum / maxRoi) * 100}%` }}></div>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-center h-full">
                         <p className="text-[10px] font-black text-slate-800 dark:text-white uppercase leading-tight">
                           {item.actualRoiNum >= item.baseRoiNum ? 'Vượt kỳ vọng' : 'Đang bám sát'}
                         </p>
                         <p className="text-[8px] text-gray-400 font-medium uppercase tracking-widest mt-1">Dựa trên dữ liệu vụ mùa thực</p>
                      </div>
                    </div>
                  </div>

                  {/* Expansion Content */}
                  {isExpanded && (
                    <div className="animate-[slideDown_0.3s_ease-out] space-y-5 mb-4 pt-5 border-t border-dashed border-gray-100 dark:border-gray-800">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="size-1.5 rounded-full bg-primary animate-pulse"></div>
                          <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Thông số vận hành Pro</h4>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-50 dark:bg-black/20 p-4 rounded-2xl border border-white/5">
                            <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-1.5">Thời gian dự án</p>
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-blue-500 !text-lg">schedule</span>
                              <p className="text-sm font-black dark:text-white">{item.duration}</p>
                            </div>
                          </div>
                          <div className="bg-slate-50 dark:bg-black/20 p-4 rounded-2xl border border-white/5">
                            <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-1.5">Sản lượng dự kiến</p>
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-green-500 !text-lg">shopping_basket</span>
                              <p className="text-sm font-black dark:text-white">{item.metrics.yieldQuality}% Đạt chuẩn</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 bg-slate-50 dark:bg-black/20 p-4 rounded-2xl border border-white/5">
                          <div className="flex justify-between items-center text-[9px] font-black text-gray-400 uppercase tracking-widest">
                            <span>Phân tích rủi ro hệ thống</span>
                            <span className={item.riskLevel === 'Low' ? 'text-green-500' : item.riskLevel === 'High' ? 'text-red-500' : 'text-yellow-500'}>{item.risk}</span>
                          </div>
                          <div className="space-y-3">
                            <div className="space-y-1.5">
                              <div className="flex justify-between text-[8px] font-bold text-gray-500 uppercase tracking-widest">
                                <span>Thời tiết & Môi trường</span>
                                <span className="text-slate-400">{item.riskBreakdown.weather}</span>
                              </div>
                              <div className="h-1.5 w-full bg-black/10 dark:bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: '90%' }}></div>
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex justify-between text-[8px] font-bold text-gray-500 uppercase tracking-widest">
                                <span>Dịch bệnh & Kiểm soát AI</span>
                                <span className="text-slate-400">{item.riskBreakdown.disease}</span>
                              </div>
                              <div className="h-1.5 w-full bg-black/10 dark:bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '65%' }}></div>
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex justify-between text-[8px] font-bold text-gray-500 uppercase tracking-widest">
                                <span>Biến động thị trường</span>
                                <span className="text-slate-400">{item.riskBreakdown.market}</span>
                              </div>
                              <div className="h-1.5 w-full bg-black/10 dark:bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                          <h5 className="text-[9px] font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-1.5">
                            <span className="material-symbols-outlined !text-sm">analytics</span>
                            Chỉ số thành công
                          </h5>
                          <p className="text-xs text-slate-600 dark:text-gray-300 font-medium leading-relaxed">
                            Xác suất đạt ROI mục tiêu là <span className="font-black text-primary">{item.metrics.successRate}%</span> dựa trên dữ liệu lịch sử của 50 vụ mùa tương tự tại trang trại.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={(e) => toggleExpand(item.id, e)}
                    className="w-full py-3.5 rounded-2xl bg-slate-900 dark:bg-white/5 text-white dark:text-gray-300 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95 transition-all border border-transparent hover:border-primary/20 shadow-lg"
                  >
                    <span className="material-symbols-outlined !text-xl">{isExpanded ? 'expand_less' : 'finance_mode'}</span>
                    {isExpanded ? 'Thu gọn thông tin' : 'Xem chi tiết đánh giá'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-end justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-surface-dark rounded-[2.5rem] overflow-hidden animate-[slideUp_0.4s_ease-out] flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-black/20">
               <h2 className="font-black text-sm uppercase tracking-widest">Chi tiết dự án</h2>
               <button onClick={() => setSelectedItem(null)} className="size-8 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center">
                  <span className="material-symbols-outlined">close</span>
               </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
              <div className="relative h-48 rounded-[2rem] overflow-hidden">
                <img src={selectedItem.img} className="w-full h-full object-cover" alt={selectedItem.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight">{selectedItem.name}</h3>
                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">{selectedItem.code} • {selectedItem.cert}</p>
                  </div>
                  <div className="bg-primary text-black px-4 py-1 rounded-full text-xs font-black">ROI {selectedItem.roi}</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Mô tả dự án</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium px-1">
                  {selectedItem.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">Thời gian nuôi trồng</p>
                  <p className="text-sm font-black dark:text-white">{selectedItem.duration}</p>
                </div>
                <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">Ngày thu hoạch</p>
                  <p className="text-sm font-black dark:text-white">{selectedItem.endDate}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Lộ trình sản xuất</h4>
                <div className="space-y-3 px-1">
                  {selectedItem.roadmap.map((phase, idx) => (
                    <div key={idx} className="flex gap-4 relative">
                      {idx < selectedItem.roadmap.length - 1 && (
                        <div className="absolute left-[15px] top-8 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
                      )}
                      <div className={`size-8 rounded-full flex items-center justify-center shrink-0 border-2 ${
                        phase.status === 'completed' ? 'bg-primary border-primary text-black' : 
                        phase.status === 'current' ? 'bg-white dark:bg-surface-dark border-primary text-primary animate-pulse' : 
                        'bg-white dark:bg-surface-dark border-gray-200 dark:border-gray-700 text-gray-300'
                      }`}>
                        <span className="material-symbols-outlined !text-lg">
                          {phase.status === 'completed' ? 'check' : phase.status === 'current' ? 'pending' : 'schedule'}
                        </span>
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex justify-between items-start">
                          <h5 className="text-xs font-black dark:text-white uppercase tracking-tight">{phase.name}</h5>
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{phase.duration}</span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium mt-0.5">{phase.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-black/20 border-t border-gray-100 dark:border-gray-800">
              <button className="w-full h-14 bg-primary text-black rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-[0.98] transition-all">
                Đầu tư ngay ({selectedItem.minCapital})
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
      `}</style>
    </div>
  );
};

export default Adoption;
