
import React, { useState } from 'react';
import { Page, TaskStatus } from '../types';

interface Props { onBack: () => void; onNavigate: (page: Page) => void; }

interface AreaTask {
  id: string;
  title: string;
  time: string;
  status: TaskStatus;
}

type AreaState = 'active' | 'warning' | 'critical' | 'harvest';

interface Area {
  id: string;
  name: string;
  crop: string;
  size: string;
  count: string;
  health: string;
  healthColor: 'green' | 'yellow' | 'red';
  state: AreaState;
  img: string;
  growthStage: string;
  daysToHarvest: number;
  totalCycleDays: number;
  recentTasks: AreaTask[];
  sensors: {
    temp?: string;
    hum?: string;
    ph?: string;
    soil?: string;
    sun?: string;
  };
}

const AREAS: Area[] = [
  {
    id: '1',
    name: 'Vườn Rau Thủy Canh',
    crop: 'Rau xà lách',
    size: '150 m²',
    count: '2.500 cây',
    health: '98% Tốt',
    healthColor: 'green',
    state: 'active',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5fmRypcuzJ07d9r9HNQGNpN3nA1ix9295k_Ydauu7vtxaLEj4A7IGPAqx9zX-lQBho3pmiOrloy5UFZ3zbMODzyPcn3f2dQYwOqgNCRO18YQIwzLj_dtvNOI6CPHzlVdpq7cYmrgWTClrGLa7cxMdELTYVn6kryutc9Vluc-uNzuReEVjoJzwppqH7zjJzuZ9yZgP-36YbimZgafxgf6mZP2yVJua0-l0ok4JFTbxBTUQ15YZXm9JrVyN0_0cWke58YIWFlGBP0Ax',
    growthStage: 'Phát triển lá',
    daysToHarvest: 12,
    totalCycleDays: 45,
    sensors: { temp: '28°C', hum: '75%', soil: '65%', ph: '6.5' },
    recentTasks: [
      { id: 't1', title: 'Kiểm tra dinh dưỡng', time: '08:00 AM', status: 'Completed' },
      { id: 't2', title: 'Vệ sinh máng thủy canh', time: '14:30 PM', status: 'Pending' }
    ]
  },
  {
    id: '2',
    name: 'Chuồng Heo Số 2',
    crop: 'Heo thịt',
    size: '80 m²',
    count: '45 con',
    health: '45% Nguy cấp',
    healthColor: 'red',
    state: 'critical',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuZaMNvoKzwEcybarEp4oDKa2NMMbHdDUn9_CnU6F5xEmwNhLCMLITHGDwlxFX0YttTbX9Khoa9dqkT6Rof5H7Ucn2na2DNsMAbLd0yzcRLKhITb_W4XTwZ1jT-KC1_YFAqCwK6kffq3h4bMw_ecjYQ3n0t8xO8fzwlY9Dh2HoiZesuy6Lx5iPbqpD932jm97Gcg5MQwermjsYD3Aw7ehadIgpvqxIjLlg66BXEFHFNJzYbJa_BCl34Lmw06wrf7GlH0_hVtFef6BOJ',
    growthStage: 'Giai đoạn vỗ béo',
    daysToHarvest: 30,
    totalCycleDays: 120,
    sensors: { temp: '35°C', hum: '80%', sun: 'Nóng' },
    recentTasks: [
      { id: 't3', title: 'Tiêm phòng đợt 2', time: '09:00 AM', status: 'Completed' },
      { id: 't4', title: 'Vệ sinh chuồng trại', time: '16:00 PM', status: 'In Progress' }
    ]
  },
  {
    id: '3',
    name: 'Vườn Xoài Cát',
    crop: 'Cây ăn quả',
    size: '2.000 m²',
    count: '120 gốc',
    health: '85% Cần chú ý',
    healthColor: 'yellow',
    state: 'warning',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC65dQ_vTeL2axAsePQnA2kLeFgMuK2pZNegOEqZhEdOrrVKvFtyoJdhIuLTMxxqNgfEXLF-g2C79lIWMEi3sMlVBilFLsMXwWL4lTzqNxB42ONYzQT1Tp3CR2lZk5_xwY-oC9N2_9tzzndxTfRQj1jY6uL5--q9X8rIzntvszXij67S7NT-7SSFqFWwRWXtsEq52UmdGr4IN16-DNLmgejkyGh5By-L2o1_tuK6kPiVj3Z5EsBt8XoY7B--NcslCpSw3cLmXh38jr4',
    growthStage: 'Chín bói',
    daysToHarvest: 5,
    totalCycleDays: 365,
    sensors: { temp: '30°C', soil: '55%', sun: 'Gắt' },
    recentTasks: [
      { id: 't5', title: 'Thu hoạch đợt 1', time: '06:00 AM', status: 'Completed' },
      { id: 't6', title: 'Phân loại quả', time: '10:00 AM', status: 'Pending' }
    ]
  }
];

const Areas: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Tất cả');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedId(expandedId === id ? null : id);
  };

  /**
   * Returns Tailwind CSS classes based on the current state of a farm area.
   */
  const getStatusStyles = (state: AreaState) => {
    switch (state) {
      case 'critical':
        return 'bg-red-50 dark:bg-red-900/20 border-red-500 ring-1 ring-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.25)] scale-[1.02] transition-all duration-300';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 ring-1 ring-yellow-500/40 shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-300';
      case 'active':
        return 'bg-green-50 dark:bg-green-900/10 border-green-500 ring-1 ring-green-500/20 shadow-[0_0_25px_rgba(19,236,73,0.1)] transition-all duration-300';
      default:
        return 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800 transition-all duration-300';
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-32">
      {/* Sticky Header with back navigation and page title */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <button onClick={onBack} className="size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="text-center flex-1">
          <h1 className="text-xl font-bold dark:text-white">Khu vực sản xuất</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quản lý trang trại</p>
        </div>
        <div className="size-10"></div>
      </header>

      {/* Navigation and filter tabs for different farm categories */}
      <div className="px-4 py-3 bg-white dark:bg-surface-dark border-b border-gray-50 dark:border-gray-800/50 overflow-x-auto no-scrollbar flex gap-2">
        {['Tất cả', 'Trồng trọt', 'Chăn nuôi', 'Cảnh báo'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              activeTab === tab ? 'bg-primary text-black' : 'bg-gray-100 dark:bg-white/5 text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {/* Iterate over the list of farm areas and render detailed cards */}
        {AREAS.map((area) => (
          <div 
            key={area.id}
            onClick={() => onNavigate('area-details')}
            className={`rounded-[2.5rem] p-5 border transition-all cursor-pointer ${getStatusStyles(area.state)}`}
          >
            <div className="flex gap-4">
              <div className="size-20 rounded-2xl bg-cover bg-center border border-gray-200 dark:border-gray-700" style={{ backgroundImage: `url("${area.img}")` }}></div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-black dark:text-white truncate">{area.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                    area.healthColor === 'green' ? 'bg-green-100 text-green-700 border-green-200' : 
                    area.healthColor === 'red' ? 'bg-red-100 text-red-700 border-red-200' : 
                    'bg-yellow-100 text-yellow-700 border-yellow-200'
                  }`}>
                    {area.health}
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-1">{area.crop} • {area.size}</p>
                <div className="flex gap-4 mt-3">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-gray-400 uppercase">Giai đoạn</span>
                    <span className="text-[10px] font-bold dark:text-white">{area.growthStage}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-gray-400 uppercase">Thu hoạch</span>
                    <span className="text-[10px] font-bold dark:text-white">{area.daysToHarvest} ngày tới</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick sensor overview display */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-4 gap-2">
              {Object.entries(area.sensors).map(([key, val]) => (
                <div key={key} className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-gray-400 !text-base">{
                    key === 'temp' ? 'device_thermostat' :
                    key === 'hum' ? 'humidity_mid' :
                    key === 'ph' ? 'science' :
                    key === 'soil' ? 'water_drop' : 'wb_sunny'
                  }</span>
                  <span className="text-[10px] font-black mt-1 dark:text-white">{val}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Areas;
