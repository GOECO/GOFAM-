
import React, { useState } from 'react';
import { Page } from '../types';

interface Phase {
  name: string;
  desc: string;
  duration: string;
  status: 'completed' | 'current' | 'upcoming';
}

type Scenario = 'none' | 'drought' | 'pest' | 'market' | 'custom';

interface CustomImpact {
  weather: number; // percentage change -0.5 to 0.1
  disease: number; // percentage change -0.5 to 0
  market: number;  // percentage change -0.5 to 0.2
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

interface Props { 
  onBack: () => void; 
  onNavigate: (page: Page) => void; 
}

const Adoption: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('crop');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [simulationState, setSimulationState] = useState<Record<string, Scenario>>({});
  const [customImpacts, setCustomImpacts] = useState<Record<string, CustomImpact>>({});
  const [simulatorMode, setSimulatorMode] = useState<Record<string, 'quick' | 'pro'>>({});
  const [isSimOpen, setIsSimOpen] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleSim = (id: string) => {
    setIsSimOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleQuickSimulate = (itemId: string, scenario: Scenario) => {
    setSimulationState(prev => ({ ...prev, [itemId]: scenario }));
    setSimulatorMode(prev => ({ ...prev, [itemId]: 'quick' }));
    
    const impacts: Record<Scenario, CustomImpact> = {
      none: { weather: 0, disease: 0, market: 0 },
      drought: { weather: -0.4, disease: -0.1, market: 0 },
      pest: { weather: 0, disease: -0.25, market: -0.1 },
      market: { weather: 0, disease: 0, market: -0.45 },
      custom: { weather: 0, disease: 0, market: 0 }
    };
    setCustomImpacts(prev => ({ ...prev, [itemId]: impacts[scenario] }));
  };

  const updateCustomImpact = (itemId: string, key: keyof CustomImpact, value: number) => {
    setSimulatorMode(prev => ({ ...prev, [itemId]: 'pro' }));
    setSimulationState(prev => ({ ...prev, [itemId]: 'custom' }));
    setCustomImpacts(prev => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || { weather: 0, disease: 0, market: 0 }),
        [key]: value
      }
    }));
  };

  const getFinalRoi = (item: InvestmentItem) => {
    const impacts = customImpacts[item.id] || { weather: 0, disease: 0, market: 0 };
    const totalMultiplier = 1 + impacts.weather + impacts.disease + impacts.market;
    return (item.baseRoiNum * totalMultiplier).toFixed(1);
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
        {/* Tabs */}
        <div className="bg-white dark:bg-surface-dark pb-3 sticky top-[62px] z-40 shadow-sm px-4 pt-3 border-b border-gray-50 dark:border-gray-800/50">
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

        {/* Dynamic ROI Comparison Bar Chart */}
        <section className="px-4 py-6">
          <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] p-6 shadow-soft border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-sm font-black text-text-main-light dark:text-white uppercase tracking-tight">Biểu Đồ ROI Pro</h3>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">So sánh Kế hoạch vs Thực tế hàng quý</p>
              </div>
              <div className="flex items-center justify-center size-10 rounded-2xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">analytics</span>
              </div>
            </div>

            {/* Vertical Bar Chart Container */}
            <div className="flex items-end justify-between h-48 w-full gap-2 relative px-2">
              {/* Vertical Grid Lines (Scale: 0 - 25%) */}
              <div className="absolute inset-0 flex flex-col justify-between text-[8px] text-gray-100 dark:text-gray-800 pointer-events-none pb-0">
                {[25, 20, 15, 10, 5, 0].map((v) => (
                  <div key={v} className="border-b border-dashed border-current w-full h-0 flex items-center relative">
                    <span className="absolute -left-2 text-gray-300 dark:text-gray-600">{v}%</span>
                  </div>
                ))}
              </div>

              {/* Grouped Bars */}
              {OPPORTUNITIES.map((item, idx) => (
                <div key={item.id} className="flex flex-col items-center flex-1 z-10 group cursor-pointer h-full justify-end">
                  <div className="flex items-end gap-1 relative h-full">
                    {/* Planned Bar */}
                    <div 
                      className="w-4 bg-gray-200 dark:bg-gray-800 rounded-t-lg transition-all duration-1000 ease-out origin-bottom group-hover:brightness-110"
                      style={{ height: `${(item.baseRoiNum / 25) * 100}%` }}
                    ></div>
                    {/* Actual Bar */}
                    <div 
                      className="w-4 bg-primary shadow-glow rounded-t-lg transition-all duration-1000 ease-out delay-100 origin-bottom group-hover:scale-y-105"
                      style={{ height: `${(item.actualRoiNum / 25) * 100}%` }}
                    ></div>
                    
                    {/* Floating Tooltip */}
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 shadow-2xl border border-white/10 whitespace-nowrap">
                      <p className="font-black text-primary mb-0.5">{item.name}</p>
                      <p className="font-bold">Kế hoạch: <span className="text-gray-400">{item.baseRoiNum}%</span></p>
                      <p className="font-bold">Thực tế: <span className="text-primary">{item.actualRoiNum}%</span></p>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-b border-r border-white/10"></div>
                    </div>
                  </div>
                  
                  {/* Category Icon instead of text to save space */}
                  <div className="mt-3 flex flex-col items-center">
                    <span className="material-symbols-outlined !text-[16px] text-gray-400 group-hover:text-primary transition-colors">
                      {item.type === 'crop' ? 'potted_plant' : 'pets'}
                    </span>
                    <span className="text-[7px] font-black text-gray-400 uppercase tracking-tighter mt-0.5 max-w-[50px] truncate text-center">{item.code}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-8 flex justify-center gap-6 pt-4 border-t border-gray-50 dark:border-gray-800/50">
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Kế Hoạch</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full bg-primary shadow-glow"></div>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Thực Tế</span>
              </div>
            </div>
          </div>
        </section>

        {/* Investment List */}
        <section className="px-4 py-4">
          <div className="flex justify-between items-end mb-6 px-1">
            <h2 className="text-text-main-light dark:text-white text-xl font-black tracking-tight uppercase">Danh sách khả dụng</h2>
          </div>

          <div className="flex flex-col gap-6">
            {OPPORTUNITIES.map((item) => {
              const isExpanded = expandedId === item.id;
              const isSimulating = (simulationState[item.id] || 'none') !== 'none';
              const scenario = simulationState[item.id] || 'none';
              const mode = simulatorMode[item.id] || 'quick';
              const impacts = customImpacts[item.id] || { weather: 0, disease: 0, market: 0 };
              const simulatedRoi = getFinalRoi(item);
              const isOpen = isSimOpen[item.id] || false;

              // Intensity based styling for stress test
              const isCritical = Number(simulatedRoi) < item.baseRoiNum * 0.7 && isSimulating;
              
              return (
                <div 
                  key={item.id}
                  className={`bg-white dark:bg-surface-dark rounded-[2.5rem] p-5 shadow-sm border transition-all duration-500 overflow-hidden ${
                    isCritical 
                      ? 'bg-red-50 dark:bg-red-900/10 border-red-500 ring-1 ring-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.15)] scale-[1.01]' 
                      : isSimulating 
                      ? 'border-orange-500/50 ring-1 ring-orange-500/20'
                      : isExpanded 
                      ? 'border-primary ring-1 ring-primary/20' 
                      : 'border-gray-100 dark:border-gray-800'
                  }`}
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
                      <div className={`text-2xl font-black leading-none transition-all duration-500 ${isSimulating ? (isCritical ? 'text-red-600 scale-110' : 'text-orange-500') : 'text-primary'}`}>
                        {isSimulating ? `${simulatedRoi}%` : item.roi}
                      </div>
                      <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">
                        {isSimulating ? 'ROI Mô phỏng' : 'ROI Dự kiến'}
                      </span>
                    </div>
                  </div>

                  {/* Laboratory Simulation Panel */}
                  <div className={`mb-5 rounded-3xl transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-[500px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className={`p-5 border ${isSimulating ? 'bg-slate-900 dark:bg-black/60 border-red-500/50 shadow-xl' : 'bg-slate-50 dark:bg-black/20 border-gray-100 dark:border-gray-800/50'}`}>
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                          <span className={`material-symbols-outlined !text-xl ${isSimulating ? 'text-red-500 animate-pulse' : 'text-primary'}`}>science</span>
                          <h4 className={`text-[10px] font-black uppercase tracking-widest ${isSimulating ? 'text-white' : 'text-gray-500'}`}>Lab Mô phỏng Rủi ro</h4>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setSimulatorMode(prev => ({ ...prev, [item.id]: mode === 'quick' ? 'pro' : 'quick' }))}
                            className={`text-[9px] font-black uppercase px-2 py-1 rounded-md transition-colors ${mode === 'pro' ? 'bg-primary text-black' : 'bg-white/10 text-gray-400'}`}
                          >
                            {mode === 'pro' ? 'Chế độ Pro' : 'Tùy chỉnh Pro'}
                          </button>
                          {isSimulating && (
                            <button onClick={() => handleQuickSimulate(item.id, 'none')} className="text-[9px] font-black text-gray-400 uppercase hover:text-white">Đặt lại</button>
                          )}
                        </div>
                      </div>
                      
                      {mode === 'quick' ? (
                        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
                          {[
                            { id: 'drought', label: 'Hạn hán', icon: 'water_drop' },
                            { id: 'pest', label: 'Sâu bệnh', icon: 'bug_report' },
                            { id: 'market', label: 'Giá giảm', icon: 'trending_down' }
                          ].map((sc) => (
                            <button 
                              key={sc.id}
                              onClick={() => handleQuickSimulate(item.id, sc.id as Scenario)}
                              className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${scenario === sc.id ? 'bg-red-500 border-red-500 text-white shadow-glow' : 'bg-white dark:bg-surface-dark border-gray-200 dark:border-gray-800 text-gray-400 hover:border-primary/50'}`}
                            >
                              <span className="material-symbols-outlined !text-sm">{sc.icon}</span>
                              {sc.label}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4 mb-4">
                          {[
                            { id: 'weather', label: 'Thời tiết', min: -0.5, max: 0.1, step: 0.05 },
                            { id: 'disease', label: 'Dịch bệnh', min: -0.5, max: 0, step: 0.05 },
                            { id: 'market', label: 'Thị trường', min: -0.6, max: 0.2, step: 0.05 }
                          ].map(cfg => (
                            <div key={cfg.id} className="space-y-2">
                              <div className="flex justify-between text-[9px] font-black uppercase text-gray-400">
                                <span>{cfg.label}</span>
                                <span className={impacts[cfg.id as keyof CustomImpact] < 0 ? 'text-red-500' : 'text-primary'}>
                                  {impacts[cfg.id as keyof CustomImpact] > 0 ? '+' : ''}{(impacts[cfg.id as keyof CustomImpact] * 100).toFixed(0)}%
                                </span>
                              </div>
                              <input 
                                type="range" min={cfg.min} max={cfg.max} step={cfg.step} value={impacts[cfg.id as keyof CustomImpact]}
                                onChange={(e) => updateCustomImpact(item.id, cfg.id as keyof CustomImpact, parseFloat(e.target.value))}
                                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-red-500"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {isSimulating && (
                        <div className="space-y-3 animate-[fadeIn_0.3s_ease-out] pt-3 border-t border-white/5">
                          <div className="flex items-center justify-between text-[10px] font-black text-white/70 uppercase">
                            <span>Phân tích Tác động</span>
                            <span className={Number(simulatedRoi) < item.baseRoiNum ? 'text-red-500' : 'text-primary'}>
                              {Number(simulatedRoi) < item.baseRoiNum ? 'Rủi ro cao' : 'Khả quan'}
                            </span>
                          </div>
                          <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-white/10">
                            <div className={`h-full transition-all duration-700 ${Number(simulatedRoi) < item.baseRoiNum ? (isCritical ? 'bg-red-600 shadow-glow' : 'bg-orange-500') : 'bg-primary'}`} style={{ width: `${Math.min(100, (Number(simulatedRoi) / item.baseRoiNum) * 100)}%` }}></div>
                          </div>
                          <p className="text-[9px] text-gray-400 font-medium italic">Gemini Pro Prediction: <span className="text-orange-400 font-bold">12.5% Prob.</span></p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary Grid */}
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
                      <span className={`text-xs font-black transition-colors ${isCritical ? 'text-red-600' : isSimulating ? 'text-orange-500' : 'text-primary'}`}>
                        ~{isSimulating ? `${(Number(simulatedRoi) * 20000).toLocaleString()}k` : item.profit}
                      </span>
                    </div>
                  </div>

                  {/* Details View */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-800 animate-[slideDown_0.3s_ease-out] space-y-6">
                      
                      {/* Project Duration & Timeline */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                           <span className="material-symbols-outlined !text-sm">calendar_today</span>
                           Thời hạn dự án & Tiến độ
                        </h4>
                        <div className="bg-slate-50 dark:bg-black/20 rounded-2xl p-4">
                           <div className="flex justify-between items-center mb-4">
                              <div className="text-center flex-1">
                                 <p className="text-[8px] text-gray-400 uppercase font-black mb-1 tracking-widest">Bắt đầu</p>
                                 <p className="text-xs font-black dark:text-white">{item.startDate}</p>
                              </div>
                              <div className="flex flex-col items-center justify-center px-4 flex-1">
                                 <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full relative overflow-hidden">
                                    <div className="absolute left-0 top-0 h-full bg-primary shadow-glow" style={{ width: '65%' }}></div>
                                 </div>
                                 <span className="text-[8px] font-black text-primary uppercase mt-2">Active</span>
                              </div>
                              <div className="text-center flex-1">
                                 <p className="text-[8px] text-gray-400 uppercase font-black mb-1 tracking-widest">Kết thúc</p>
                                 <p className="text-xs font-black dark:text-white">{item.endDate}</p>
                              </div>
                           </div>
                           <p className="text-[9px] text-gray-400 text-center italic">Tổng thời gian: {item.duration}</p>
                        </div>
                      </div>

                      {/* Risk Assessment Breakdown */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                           <span className="material-symbols-outlined !text-sm">security</span>
                           Phân tích rủi ro chi tiết
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                           {Object.entries(item.riskBreakdown).map(([key, val]) => (
                             <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-800">
                               <div className="flex items-center gap-2">
                                 <span className="material-symbols-outlined !text-sm text-gray-400">
                                   {key === 'weather' ? 'wb_cloudy' : key === 'disease' ? 'coronavirus' : 'trending_down'}
                                 </span>
                                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest capitalize">
                                   {key === 'weather' ? 'Thời tiết' : key === 'disease' ? 'Dịch bệnh' : 'Thị trường'}
                                 </span>
                               </div>
                               <span className="text-[11px] font-black dark:text-white">{val}</span>
                             </div>
                           ))}
                        </div>
                      </div>

                      {/* Success Metrics */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                           <span className="material-symbols-outlined !text-sm">analytics</span>
                           Chỉ số thành công
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                           {[
                             { label: 'Tỉ lệ thành công', val: `${item.metrics.successRate}%`, icon: 'verified', color: 'text-primary' },
                             { label: 'ROI Lịch sử', val: item.metrics.historicalRoi, icon: 'history_edu', color: 'text-blue-500' },
                             { label: 'Nhu cầu TT', val: item.metrics.demand, icon: 'trending_up', color: 'text-orange-500' },
                             { label: 'Chất lượng', val: `${item.metrics.yieldQuality}/100`, icon: 'workspace_premium', color: 'text-purple-500' }
                           ].map(m => (
                             <div key={m.label} className="bg-gray-50 dark:bg-gray-900/40 p-3 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-3">
                                <div className={`size-8 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center ${m.color}`}>
                                   <span className="material-symbols-outlined !text-base font-bold">{m.icon}</span>
                                </div>
                                <div>
                                   <p className="text-[7px] text-gray-400 uppercase font-black tracking-widest">{m.label}</p>
                                   <p className="text-xs font-black dark:text-white">{m.val}</p>
                                </div>
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-5">
                    <button 
                      onClick={() => toggleSim(item.id)}
                      className={`flex-1 py-3.5 rounded-2xl border transition-all text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${isOpen ? 'bg-slate-900 text-white dark:bg-white dark:text-black border-transparent shadow-lg' : 'border-gray-100 dark:border-gray-800 text-text-main-light dark:text-white hover:bg-gray-50'}`}
                    >
                      {isOpen ? 'Đóng Lab' : 'Mô phỏng Rủi ro'}
                      <span className={`material-symbols-outlined !text-base transition-transform ${isOpen ? 'rotate-180' : ''}`}>science</span>
                    </button>
                    <button 
                      onClick={() => toggleExpand(item.id)}
                      className={`flex-1 py-3.5 rounded-2xl border transition-all text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${isExpanded ? 'bg-slate-900 text-white dark:bg-white dark:text-black border-transparent shadow-lg' : 'border-gray-100 dark:border-gray-800 text-text-main-light dark:text-white hover:bg-gray-50'}`}
                    >
                      {isExpanded ? 'Đóng chi tiết' : 'Xem chi tiết'}
                      <span className={`material-symbols-outlined !text-base transition-transform ${isExpanded ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                  </div>
                </div>
              );
            })}
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

      {/* Bottom Navigation */}
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
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .shadow-glow { box-shadow: 0 0 20px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Adoption;
