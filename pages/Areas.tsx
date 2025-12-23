
import React, { useState } from 'react';
import { Page } from '../types';

interface Props { onBack: () => void; onNavigate: (page: Page) => void; }

interface Task {
  id: string;
  title: string;
  time: string;
  status: 'pending' | 'completed';
}

interface Area {
  id: string;
  name: string;
  crop: string;
  size: string;
  count: string;
  health: string;
  healthColor: 'green' | 'yellow' | 'red';
  state: 'active' | 'warning' | 'harvest';
  img: string;
  growthStage: string;
  daysToHarvest: number;
  recentTasks: Task[];
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
    sensors: { temp: '28°C', hum: '75%', soil: '65%', ph: '6.5' },
    recentTasks: [
      { id: 't1', title: 'Kiểm tra dinh dưỡng', time: '08:00 AM', status: 'completed' },
      { id: 't2', title: 'Vệ sinh máng thủy canh', time: '14:30 PM', status: 'pending' }
    ]
  },
  {
    id: '2',
    name: 'Chuồng Heo Số 2',
    crop: 'Heo thịt',
    size: '80 m²',
    count: '45 con',
    health: '75% Khá',
    healthColor: 'yellow',
    state: 'warning',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuZaMNvoKzwEcybarEp4oDKa2NMMbHdDUn9_CnU6F5xEmwNhLCMLITHGDwlxFX0YttTbX9Khoa9dqkT6Rof5H7Ucn2na2DNsMAbLd0yzcRLKhITb_W4XTwZ1jT-KC1_YFAqCwK6kffq3h4bMw_ecjYQ3n0t8xO8fzwlY9Dh2HoiZesuy6Lx5iPbqpD932jm97Gcg5MQwermjsYD3Aw7ehadIgpvqxIjLlg66BXEFHFNJzYbJa_BCl34Lmw06wrf7GlH0_hVtFef6BOJ',
    growthStage: 'Giai đoạn vỗ béo',
    daysToHarvest: 30,
    sensors: { temp: '35°C', hum: '80%', sun: 'Nóng' },
    recentTasks: [
      { id: 't3', title: 'Tiêm phòng đợt 2', time: '09:00 AM', status: 'completed' },
      { id: 't4', title: 'Vệ sinh chuồng trại', time: '16:00 PM', status: 'pending' }
    ]
  },
  {
    id: '3',
    name: 'Vườn Xoài Cát',
    crop: 'Cây ăn quả',
    size: '2.000 m²',
    count: '120 gốc',
    health: '100% Tốt',
    healthColor: 'green',
    state: 'harvest',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC65dQ_vTeL2axAsePQnA2kLeFgMuK2pZNegOEqZhEdOrrVKvFtyoJdhIuLTMxxqNgfEXLF-g2C79lIWMEi3sMlVBilFLsMXwWL4lTzqNxB42ONYzQT1Tp3CR2lZk5_xwY-oC9N2_9tzzndxTfRQj1jY6uL5--q9X8rIzntvszXij67S7NT-7SSFqFWwRWXtsEq52UmdGr4IN16-DNLmgejkyGh5By-L2o1_tuK6kPiVj3Z5EsBt8XoY7B--NcslCpSw3cLmXh38jr4',
    growthStage: 'Chín bói',
    daysToHarvest: 5,
    sensors: { temp: '30°C', soil: '55%', sun: 'Gắt' },
    recentTasks: [
      { id: 't5', title: 'Thu hoạch đợt 1', time: '06:00 AM', status: 'completed' },
      { id: 't6', title: 'Phân loại quả', time: '10:00 AM', status: 'pending' }
    ]
  }
];

const Areas: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark pb-32 font-display transition-colors">
      {/* Sticky Top Header */}
      <div className="flex flex-col gap-2 bg-background-light dark:bg-background-dark p-4 pb-2 sticky top-0 z-20 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90 transition-colors">
        <div className="flex items-center h-12 justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Thứ Ba, 24/10</span>
            <span className="text-sm font-bold text-text-main-light dark:text-gray-100">Xin chào, Nguyễn Văn A</span>
          </div>
          <button onClick={() => onNavigate('settings')} className="flex size-10 items-center justify-center rounded-full bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-800 text-text-main-light dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <h1 className="text-text-main-light dark:text-white tracking-tight text-[24px] font-black leading-tight">Quản lý khu vực</h1>
          <button className="flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-black px-4 py-2 rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[20px] font-bold">add</span>
            <span className="text-xs font-black uppercase tracking-widest">Thêm mới</span>
          </button>
        </div>

        {/* Search Row */}
        <div className="flex gap-3 mt-2">
          <div className="relative flex-1 group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[20px] group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="w-full h-11 pl-10 pr-4 rounded-xl border-none bg-white dark:bg-surface-dark shadow-sm ring-1 ring-gray-100 dark:ring-gray-800 text-sm focus:ring-2 focus:ring-primary placeholder:text-gray-400 dark:text-white transition-all" 
              placeholder="Tìm theo tên, mã lô..." 
              type="text"
            />
          </div>
          <button className="h-11 w-11 shrink-0 flex items-center justify-center rounded-xl bg-white dark:bg-surface-dark shadow-sm ring-1 ring-gray-100 dark:ring-gray-800 text-gray-600 dark:text-gray-300 active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center justify-between px-4 pb-2">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
          {['Tất cả', 'Vườn', 'Chuồng', 'Ao'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 transition-all ${
                activeTab === tab 
                ? 'bg-primary/10 border border-primary/20 text-primary-dark dark:text-primary shadow-sm shadow-primary/5' 
                : 'bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-gray-400'
              }`}
            >
              <p className="text-[10px] font-black uppercase tracking-widest">{tab}</p>
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1 pl-3 text-gray-400 hover:text-primary transition-colors shrink-0">
          <span className="material-symbols-outlined text-[18px]">sort</span>
          <span className="text-[10px] font-black uppercase tracking-widest">Sắp xếp</span>
        </button>
      </div>

      {/* Area List */}
      <div className="flex flex-col gap-4 p-4 pt-2">
        {AREAS.map((area) => (
          <div 
            key={area.id}
            onClick={(e) => toggleExpand(area.id, e)}
            className={`group relative flex flex-col rounded-[2rem] bg-white dark:bg-surface-dark shadow-sm border transition-all duration-300 ${
              expandedId === area.id 
                ? 'border-primary ring-1 ring-primary/20 scale-[1.02] shadow-xl' 
                : 'border-gray-100 dark:border-gray-800 hover:border-primary/40'
            }`}
          >
            {/* Primary Info Row */}
            <div className="flex gap-4 p-4">
              <div 
                className="w-20 h-20 shrink-0 rounded-2xl bg-cover bg-center shadow-inner border border-gray-100 dark:border-gray-700" 
                style={{ backgroundImage: `url("${area.img}")` }}
              ></div>

              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-text-main-light dark:text-white text-base font-black leading-tight truncate tracking-tight">{area.name}</h3>
                  <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                    area.healthColor === 'green' 
                    ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-100 dark:border-green-800' 
                    : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-100 dark:border-yellow-800'
                  }`}>
                    {area.health}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 my-1.5 text-[9px] text-gray-400 font-black uppercase tracking-widest">
                  <span className="text-text-main-light dark:text-gray-200">{area.crop}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-200 dark:bg-gray-700"></span>
                  <span>{area.size}</span>
                </div>

                <div className="flex items-end justify-between">
                  <div className="flex items-center gap-1.5">
                    {area.state === 'active' && (
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[9px] font-black text-green-600 dark:text-green-400 uppercase tracking-widest">Ổn định</span>
                      </div>
                    )}
                    {area.state === 'warning' && (
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-red-500 font-bold">warning</span>
                        <span className="text-[9px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest">Chú ý</span>
                      </div>
                    )}
                    {area.state === 'harvest' && (
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-orange-500 font-bold">agriculture</span>
                        <span className="text-[9px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">Thu hoạch</span>
                      </div>
                    )}
                  </div>
                  <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${expandedId === area.id ? 'rotate-180 text-primary' : ''}`}>expand_more</span>
                </div>
              </div>
            </div>

            {/* Expandable Content Area */}
            {expandedId === area.id && (
              <div className="px-4 pb-5 animate-[slideDown_0.3s_ease-out] space-y-5 border-t border-gray-50 dark:border-gray-800/50 mt-1 pt-5">
                {/* 1. Quick Sensors */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Nhiệt độ', val: area.sensors.temp, icon: 'thermostat', color: 'text-red-500' },
                    { label: 'Độ ẩm', val: area.sensors.hum, icon: 'water_drop', color: 'text-blue-500' },
                    { label: 'Độ ẩm Đất', val: area.sensors.soil, icon: 'potted_plant', color: 'text-orange-500' },
                    { label: 'Độ pH', val: area.sensors.ph, icon: 'science', color: 'text-primary' }
                  ].filter(s => s.val).map((stat, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-black/20 rounded-2xl p-2.5 flex flex-col items-center border border-transparent hover:border-gray-100 dark:hover:border-white/5 transition-all">
                      <span className={`material-symbols-outlined !text-lg ${stat.color} mb-1.5`}>{stat.icon}</span>
                      <span className="text-xs font-black dark:text-white leading-none">{stat.val}</span>
                      <span className="text-[7px] text-gray-400 uppercase font-black tracking-tighter mt-1">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {/* 2. Crop Status Detail */}
                <div className="bg-gray-50/50 dark:bg-black/10 rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                  <div className="flex justify-between items-center mb-3 px-1">
                    <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Tình trạng cây trồng</h4>
                    <span className="text-[9px] font-bold text-primary uppercase">Ngày thứ 45</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between text-[11px] font-black">
                        <span className="text-gray-500 uppercase tracking-tight">Giai đoạn: {area.growthStage}</span>
                        <span className="text-primary">{100 - (area.daysToHarvest * 2)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary shadow-glow" style={{ width: `${100 - (area.daysToHarvest * 2)}%` }}></div>
                      </div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">Dự kiến thu hoạch sau {area.daysToHarvest} ngày</p>
                    </div>
                  </div>
                </div>

                {/* 3. Recent Tasks List */}
                <div>
                  <div className="flex justify-between items-center mb-3 px-1">
                    <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Nhiệm vụ gần đây</h4>
                    <button onClick={(e) => { e.stopPropagation(); onNavigate('tasks'); }} className="text-[9px] font-black text-primary uppercase hover:underline">Xem lịch</button>
                  </div>
                  <div className="space-y-2">
                    {area.recentTasks.map(task => (
                      <div key={task.id} className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className={`size-7 rounded-lg flex items-center justify-center ${task.status === 'completed' ? 'bg-green-50 dark:bg-green-900/20 text-green-500' : 'bg-orange-50 dark:bg-orange-900/20 text-orange-500'}`}>
                            <span className="material-symbols-outlined !text-base">{task.status === 'completed' ? 'check_circle' : 'schedule'}</span>
                          </div>
                          <span className={`text-xs font-bold ${task.status === 'completed' ? 'text-gray-400 line-through' : 'dark:text-white'}`}>{task.title}</span>
                        </div>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{task.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onNavigate('area-details'); }}
                    className="flex-1 h-11 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined !text-base">analytics</span>
                    Dữ liệu chi tiết
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onNavigate('add-task'); }}
                    className="size-11 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-primary transition-colors active:scale-90"
                  >
                    <span className="material-symbols-outlined">add_task</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-6 z-30">
        <button 
          onClick={() => onNavigate('add-task')}
          className="size-14 rounded-full bg-primary text-black shadow-xl shadow-primary/40 flex items-center justify-center active:scale-90 transition-all border-4 border-background-light dark:border-background-dark group"
        >
          <span className="material-symbols-outlined text-3xl font-black group-hover:rotate-90 transition-transform">add</span>
        </button>
      </div>

      {/* Navigation Footer */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 px-6 py-2 flex justify-between items-center h-20 pb-6 transition-colors shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">home</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Trang chủ</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-primary scale-105">
          <span className="material-symbols-outlined material-symbols-filled !text-[26px]">grid_view</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Vườn</span>
        </button>
        <button onClick={() => onNavigate('reports')} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">monitoring</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Thống kê</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">person</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Cá nhân</span>
        </button>
      </nav>

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .shadow-glow { box-shadow: 0 0 12px rgba(19, 236, 73, 0.4); }
      `}</style>
    </div>
  );
};

export default Areas;
