
import React, { useState } from 'react';
import { Page } from '../types';

interface Props { onBack: () => void; onNavigate: (page: Page) => void; }

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
  risk: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  duration: '45 Ngày' | '4 Tháng' | '90 Ngày' | '60 Ngày';
  startDate: string;
  endDate: string;
  minCapital: string;
  profit: string;
  code: string;
  cert: string;
  description: string;
  riskBreakdown: { weather: string; disease: string; market: string };
  metrics: { successRate: number; historicalRoi: string; demand: string; yieldQuality: number };
  nextStep?: { icon: string; title: string; desc: string };
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
    risk: 'Thấp',
    riskLevel: 'Low',
    duration: '45 Ngày',
    startDate: '15/10/2023',
    endDate: '30/11/2023',
    minCapital: '2.0 Tr',
    profit: '~240k',
    code: 'XL-054',
    cert: 'VietGAP',
    description: 'Dự án áp dụng công nghệ thủy canh hồi lưu màng mỏng (NFT) trong nhà kính khép kín. Toàn bộ quy trình được giám sát bởi cảm biến IoT giúp tối ưu dinh dưỡng và giảm thiểu lãng phí nước.',
    riskBreakdown: { weather: 'Rất thấp (Kín)', disease: 'Thấp (Phòng ngừa)', market: 'Ổn định (HĐ bao tiêu)' },
    metrics: { successRate: 99.2, historicalRoi: '11.5%', demand: 'Cao', yieldQuality: 92 },
    nextStep: { icon: 'water_drop', title: 'Tiếp theo', desc: 'Bơm dinh dưỡng (Tự động)' },
    roadmap: [
      { name: 'Chuẩn bị', desc: 'Làm sạch máng, pha dinh dưỡng', duration: '3 Ngày', status: 'completed' },
      { name: 'Gieo mầm', desc: 'Ươm hạt trong giá thể', duration: '7 Ngày', status: 'completed' },
      { name: 'Phát triển', desc: 'Nuôi dưỡng cây trong hệ thống NFT', duration: '30 Ngày', status: 'current' },
      { name: 'Thu hoạch', desc: 'Đóng gói và bàn giao đối tác', duration: '5 Ngày', status: 'upcoming' }
    ],
    profitCurve: [2, 5, 8, 12, 12, 12]
  },
  {
    id: 'inv-2',
    type: 'pets',
    name: 'Gà Thả Vườn Organic',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVptTZdxH44ojjmJluJhbJeQHjHH1ow-0LWz16U7v6RBSCgW_UcBnuubNvFRO3BlxvuRZWY915GiaPiw2LvwO1WffUKhdFx9eUlHl8rf5V-6SzblTrrm-ur5Z86uNX-7KzD3cV1pn8FQ5JIYkh4f7lckDOgJtOK6WMhWTA8pbekvofW0tvRunXv-8qXblPdfc-KfNxMoge0Expwm6dGglvczP767DtwgJ9vdmc1R4gsrDq4dJLHJRBw9UxGZYeruCaCs9k8V5x_',
    roi: '18%',
    risk: 'TB',
    riskLevel: 'Medium',
    duration: '4 Tháng',
    startDate: '01/10/2023',
    endDate: '01/02/2024',
    minCapital: '5.0 Tr',
    profit: '~900k',
    code: 'GA-112',
    cert: 'Organic',
    description: 'Mô hình chăn nuôi gà thả vườn theo tiêu chuẩn hữu cơ, thức ăn hoàn toàn tự nhiên không kháng sinh. Gà được vận động liên tục giúp chất lượng thịt săn chắc, đáp ứng phân khúc thị trường cao cấp.',
    riskBreakdown: { weather: 'Trung bình', disease: 'Trung bình (Vaccine)', market: 'Biến động nhẹ' },
    metrics: { successRate: 94.5, historicalRoi: '17.2%', demand: 'Rất cao', yieldQuality: 88 },
    nextStep: { icon: 'vaccines', title: 'Tiếp theo', desc: 'Tiêm phòng đợt 2 (12/10)' },
    roadmap: [
      { name: 'Úm gà', desc: 'Chăm sóc gà con giai đoạn đầu', duration: '1 Tháng', status: 'completed' },
      { name: 'Thả vườn', desc: 'Cho gà vận động tự nhiên', duration: '2 Tháng', status: 'current' },
      { name: 'Vỗ béo', desc: 'Tăng cường dinh dưỡng hữu cơ', duration: '20 Ngày', status: 'upcoming' },
      { name: 'Bàn giao', desc: 'Kiểm định và phân phối', duration: '10 Ngày', status: 'upcoming' }
    ],
    profitCurve: [1, 2, 4, 8, 14, 18]
  }
];

const Adoption: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('crop');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const roiChartData = [
    { label: 'Cà Chua', planned: 15, actual: 14.2 },
    { label: 'Dưa Lưới', planned: 22, actual: 18.5 },
    { label: 'Xà Lách', planned: 12, actual: 12.8 },
    { label: 'Gà Sạch', planned: 18, actual: 19.1 },
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

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

        {/* ROI Analysis Bar Chart Section */}
        <section className="px-4 pt-6">
          <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] p-6 shadow-soft border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col">
                <h2 className="text-sm font-black text-text-main-light dark:text-white uppercase tracking-tight">Phân tích ROI Dự kiến</h2>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">So sánh Kế hoạch vs Thực tế</p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Kế hoạch</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary shadow-glow"></div>
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Dự phóng</span>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between h-40 gap-4 mt-2 relative">
              <div className="absolute inset-0 flex flex-col justify-between py-1 pointer-events-none opacity-5 dark:opacity-10">
                {[0, 1, 2, 3].map(i => <div key={i} className="w-full border-b border-text-main-light dark:border-white border-dashed"></div>)}
              </div>

              {roiChartData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full justify-end relative z-10 group">
                  <div className="flex gap-1 items-end h-full w-full justify-center">
                    <div 
                      className="w-2.5 bg-gray-100 dark:bg-gray-800 rounded-t-lg transition-all duration-1000 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
                      style={{ height: `${(data.planned / 25) * 100}%` }}
                    ></div>
                    <div 
                      className="w-2.5 bg-primary rounded-t-lg transition-all duration-1000 shadow-glow group-hover:scale-y-105 origin-bottom"
                      style={{ height: `${(data.actual / 25) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[9px] font-black text-text-main-light dark:text-white">{data.actual}%</span>
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter truncate w-full text-center">{data.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vertical List Section */}
        <section className="px-4 py-8">
          <div className="flex justify-between items-end mb-6 px-1">
            <h2 className="text-text-main-light dark:text-white text-xl font-black tracking-tight uppercase">Danh sách khả dụng</h2>
            <div className="flex items-center gap-1.5 text-[10px] text-primary font-black uppercase tracking-widest cursor-pointer hover:underline">
              <span>ROI cao nhất</span>
              <span className="material-symbols-outlined !text-base">sort</span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {OPPORTUNITIES.map((item) => {
              const isExpanded = expandedId === item.id;
              
              return (
                <div 
                  key={item.id}
                  className={`bg-white dark:bg-surface-dark rounded-[2rem] p-5 shadow-sm border transition-all duration-300 overflow-hidden ${isExpanded ? 'border-primary/50 ring-2 ring-primary/5' : 'border-gray-100 dark:border-gray-800'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                      <div className="size-16 shrink-0 rounded-2xl bg-cover bg-center border border-gray-100 dark:border-gray-700 shadow-inner" style={{ backgroundImage: `url("${item.img}")` }}></div>
                      <div className="min-w-0">
                        <h3 className="text-base font-black text-text-main-light dark:text-white leading-tight truncate">{item.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[9px] font-black px-2 py-0.5 rounded-lg border border-green-100 dark:border-green-800 uppercase tracking-widest">{item.cert}</span>
                          <span className="bg-gray-50 dark:bg-gray-800 text-gray-400 text-[9px] font-black px-2 py-0.5 rounded-lg border border-gray-100 dark:border-gray-700 uppercase tracking-widest">Code: {item.code}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border mb-2 ${item.riskLevel === 'Low' ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800' : 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 border-yellow-100 dark:border-yellow-800'}`}>Rủi ro: {item.risk}</div>
                      <div className="text-primary font-black text-2xl leading-none">{item.roi}</div>
                      <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">ROI / Chu kỳ</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-3 mb-4 border border-gray-100 dark:border-gray-800/50">
                    <div className="flex flex-col border-r border-gray-200 dark:border-gray-800 pr-2">
                      <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest mb-1">Kỳ hạn</span>
                      <span className="text-xs font-black dark:text-white">{item.duration}</span>
                    </div>
                    <div className="flex flex-col border-r border-gray-200 dark:border-gray-800 px-2">
                      <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest mb-1">Vốn min</span>
                      <span className="text-xs font-black dark:text-white">{item.minCapital}</span>
                    </div>
                    <div className="flex flex-col pl-2">
                      <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest mb-1">Lợi nhuận</span>
                      <span className="text-xs font-black text-primary">{item.profit}</span>
                    </div>
                  </div>

                  {item.nextStep && !isExpanded && (
                    <div className="flex items-center justify-between mb-5 px-1 animate-fadeIn">
                      <div className="flex items-center gap-3">
                        <div className={`size-8 rounded-xl flex items-center justify-center ${item.type === 'crop' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-500' : 'bg-red-50 dark:bg-red-900/30 text-red-500'}`}>
                          <span className="material-symbols-outlined text-lg">{item.nextStep.icon}</span>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{item.nextStep.title}</p>
                          <p className="text-[11px] font-black dark:text-white">{item.nextStep.desc}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="h-8 w-24">
                          <svg className="w-full h-full stroke-primary fill-none" viewBox="0 0 100 30">
                            <path d="M0 25 Q 10 25 20 20 T 40 15 T 60 10 T 80 5 T 100 2" stroke-linecap="round" strokeWidth="2.5" className="drop-shadow-[0_0_5px_rgba(19,236,73,0.5)]"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Expanded Detailed View */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-800 animate-[slideDown_0.3s_ease-out]">
                      <div className="space-y-6">
                        {/* Project Duration & Timeline */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                             <span className="material-symbols-outlined !text-sm">calendar_today</span>
                             Thời gian dự án
                          </h4>
                          <div className="bg-slate-50 dark:bg-black/20 rounded-2xl p-4">
                             <div className="flex justify-between items-center mb-4">
                                <div className="text-center flex-1">
                                   <p className="text-[8px] text-gray-400 uppercase font-black tracking-widest mb-1">Bắt đầu</p>
                                   <p className="text-xs font-black dark:text-white">{item.startDate}</p>
                                </div>
                                <div className="flex flex-col items-center justify-center px-4 flex-1">
                                   <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full relative overflow-hidden">
                                      <div className="absolute left-0 top-0 h-full bg-primary" style={{ width: '65%' }}></div>
                                   </div>
                                   <span className="text-[8px] font-black text-primary uppercase mt-2">Đang thực hiện</span>
                                </div>
                                <div className="text-center flex-1">
                                   <p className="text-[8px] text-gray-400 uppercase font-black tracking-widest mb-1">Kết thúc</p>
                                   <p className="text-xs font-black dark:text-white">{item.endDate}</p>
                                </div>
                             </div>
                             <p className="text-[10px] text-center text-gray-500 font-medium">Dự án kéo dài {item.duration} theo chu kỳ chuẩn nông nghiệp chuyên nghiệp.</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mô tả dự án</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">{item.description}</p>
                        </div>

                        {/* Project Roadmap / Timeline */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lộ trình chi tiết (Roadmap)</h4>
                          <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100 dark:before:bg-gray-800">
                            {item.roadmap.map((phase, idx) => (
                              <div key={idx} className="relative">
                                <div className={`absolute -left-[1.375rem] top-1.5 size-3 rounded-full border-2 border-white dark:border-surface-dark transition-colors ${phase.status === 'completed' ? 'bg-primary shadow-[0_0_8px_rgba(19,236,73,0.5)]' : phase.status === 'current' ? 'bg-orange-500 animate-pulse' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className={`text-xs font-black ${phase.status === 'completed' ? 'text-primary' : phase.status === 'current' ? 'text-orange-500' : 'text-gray-400'}`}>{phase.name}</p>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{phase.desc}</p>
                                  </div>
                                  <span className="text-[10px] font-bold text-gray-400">{phase.duration}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Profit Distribution Curve */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Dự phóng lợi nhuận (Sparkline)</h4>
                          <div className="h-16 w-full bg-gray-50 dark:bg-black/20 rounded-2xl p-4 flex items-end justify-between gap-1">
                             {item.profitCurve.map((val, idx) => (
                               <div key={idx} className="flex-1 bg-primary/20 rounded-t-sm relative group cursor-help" style={{ height: `${(val / 20) * 100}%` }}>
                                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">+{val}%</div>
                                  <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-sm" style={{ height: '30%' }}></div>
                                </div>
                             ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Đánh giá rủi ro (Risk Matrix)</h4>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-gray-50 dark:bg-gray-900/40 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 text-center">
                              <span className="text-[8px] text-gray-400 uppercase block mb-1">Thời tiết</span>
                              <span className="text-[10px] font-black text-primary">{item.riskBreakdown.weather}</span>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900/40 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 text-center">
                              <span className="text-[8px] text-gray-400 uppercase block mb-1">Dịch bệnh</span>
                              <span className="text-[10px] font-black text-yellow-500">{item.riskBreakdown.disease}</span>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900/40 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 text-center">
                              <span className="text-[8px] text-gray-400 uppercase block mb-1">Thị trường</span>
                              <span className="text-[10px] font-black text-blue-500">{item.riskBreakdown.market}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Chỉ số thành công (Metrics)</h4>
                          <div className="bg-slate-50 dark:bg-black/20 rounded-2xl p-5 space-y-5">
                            <div className="flex items-center gap-4">
                               <div className="relative size-12 shrink-0">
                                  <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                     <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-200 dark:stroke-gray-800" strokeWidth="3"></circle>
                                     <circle cx="18" cy="18" r="16" fill="none" className="stroke-primary" strokeWidth="3" strokeDasharray={`${item.metrics.successRate}, 100`} strokeLinecap="round"></circle>
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black">{Math.floor(item.metrics.successRate)}%</div>
                               </div>
                               <div className="flex-1">
                                  <p className="text-[10px] font-bold text-gray-500 uppercase">Tỉ lệ thu hoạch đạt chuẩn</p>
                                  <p className="text-xs font-black dark:text-white">Dữ liệu từ 15 vụ gần nhất</p>
                               </div>
                            </div>
                            <div className="h-px bg-gray-100 dark:bg-gray-800"></div>
                            <div className="grid grid-cols-2 gap-4">
                               <div>
                                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">ROI Trung bình</p>
                                  <p className="text-base font-black text-primary mt-1">{item.metrics.historicalRoi}</p>
                               </div>
                               <div>
                                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Nhu cầu</p>
                                  <p className="text-base font-black text-orange-500 mt-1">{item.metrics.demand}</p>
                               </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-5">
                    <button 
                      onClick={() => toggleExpand(item.id)}
                      className={`flex-1 py-3.5 rounded-2xl border transition-all text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${isExpanded ? 'bg-slate-900 text-white dark:bg-white dark:text-black border-transparent' : 'border-gray-100 dark:border-gray-800 text-text-main-light dark:text-white hover:bg-gray-50'}`}
                    >
                      {isExpanded ? 'Đóng chi tiết' : 'Xem chi tiết'}
                      <span className={`material-symbols-outlined !text-base transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                    <button className="flex-1 py-3.5 rounded-2xl bg-primary text-black text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
                      Đăng ký ngay
                      <span className="material-symbols-outlined !text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Expired Item - Static Mockup */}
            <div className="bg-white dark:bg-surface-dark rounded-[2rem] p-5 shadow-sm border border-gray-100 dark:border-gray-800 opacity-60 relative grayscale cursor-not-allowed">
              <div className="absolute inset-0 z-10 bg-white/10 dark:bg-black/10"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-[0.2em] z-20 shadow-2xl whitespace-nowrap">Đã hết suất</div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="size-16 shrink-0 rounded-2xl bg-cover bg-center border border-gray-100 dark:border-gray-700 shadow-inner opacity-50" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBLba-61Leq_2hN7eM2XyT0ukY8sgYW2qjP-YxuG7Q5Q5xlr2L7JJ_yyz3qyyHVURTo_poUBUe2M33938T-CDf_YnpPuHyYqP8BUY4p--nS9Hii2zGFARYZK_pXWQFJd0_zHOFkF62sIgwANWF2vnP0gkd_8LuftNnzbFT6RhE4duvDF-j50jXfQ4LDkKdem6QsPfq55IDM2cj-OLa1kXkR4PXSyBPCS-pQSxZ6D-39mayCCi9OKEDw8ztpFJmz0rTCNEHdJEKcaiKo")' }}></div>
                  <div className="min-w-0">
                    <h3 className="text-base font-black text-text-main-light dark:text-white leading-tight truncate">Cà Tím Nhật Bản</h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 font-black text-2xl leading-none">14%</div>
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
        <button onClick={() => onBack()} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors group">
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
        @keyframes slideDown { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .shadow-glow { box-shadow: 0 0 20px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Adoption;
