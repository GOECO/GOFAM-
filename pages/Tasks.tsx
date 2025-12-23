
import React, { useState, useMemo } from 'react';
import { Task, Priority, Page } from '../types';
import { GoogleGenAI } from "@google/genai";

interface Props { onBack: () => void; onNavigate: (page: Page) => void; }

const AREAS_LIST = [
  'Vườn Rau Thủy Canh',
  'Chuồng Heo Số 2',
  'Vườn Xoài Cát',
  'Ao Cá Rô Phi',
  'Khu vực chung'
];

type ViewMode = 'Tháng' | 'Tuần' | 'Ngày' | 'Agenda';

const Tasks: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: '1', 
      title: 'Tưới nước tự động', 
      description: 'Hệ thống thực hiện định kỳ', 
      dueDate: '2023-10-24', 
      time: '08:00', 
      area: 'Khu A • IoT Block 1', 
      priority: 'Medium', 
      completed: false,
      type: 'irrigation'
    },
    { 
      id: '2', 
      title: 'Bón phân NPK', 
      description: 'Đã xong bởi: Nguyễn Văn B', 
      dueDate: '2023-10-24', 
      time: '10:30', 
      area: 'Nhà kính C1', 
      priority: 'Medium', 
      completed: true,
      type: 'other'
    },
    { 
      id: '3', 
      title: 'Kiểm tra sâu bệnh (AI)', 
      description: 'Phát hiện khả nghi tại Khu vực C2. Mức độ lây lan dự báo: Cao.', 
      dueDate: '2023-10-24', 
      time: '15:00', 
      area: 'Team: Kỹ thuật', 
      priority: 'High', 
      completed: false,
      type: 'inspection'
    },
    { 
      id: '4', 
      title: 'Thu hoạch Cà chua', 
      description: 'Dự kiến: 500kg', 
      dueDate: '2023-10-24', 
      time: '16:30', 
      area: 'Nhà kính C1', 
      priority: 'Low', 
      completed: false,
      type: 'harvest'
    }
  ]);

  const [viewMode, setViewMode] = useState<ViewMode>('Tuần');
  const [selectedDate, setSelectedDate] = useState<string>('2023-10-24');
  const [filter, setFilter] = useState('Tất cả');

  const filteredTasks = useMemo(() => {
    let result = tasks.filter(t => t.dueDate === selectedDate);
    if (filter === 'Chưa làm') result = result.filter(t => !t.completed);
    if (filter === 'Ưu tiên cao') result = result.filter(t => t.priority === 'High');
    return result;
  }, [tasks, selectedDate, filter]);

  const getPriorityColor = (p: Priority) => {
    switch(p) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-orange-500';
      default: return 'bg-green-500';
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'irrigation': return 'water_drop';
      case 'inspection': return 'bug_report';
      case 'harvest': return 'agriculture';
      default: return 'compost';
    }
  };

  const getIconBg = (type: string) => {
    switch(type) {
      case 'irrigation': return 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'inspection': return 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      case 'harvest': return 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col font-display antialiased">
      {/* Header */}
      <header className="bg-white dark:bg-surface-dark shadow-sm z-30 shrink-0 sticky top-0">
        <div className="flex items-center px-4 py-3 justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-text-main-light dark:text-white font-bold">arrow_back</span>
            </button>
            <div>
              <h2 className="text-text-main-light dark:text-white text-lg font-black leading-tight tracking-tight">Lịch Công Việc</h2>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest">Tháng 10, 2023</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-text-main-light dark:text-white">
              <span className="material-symbols-outlined font-bold">tune</span>
            </button>
            <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-text-main-light dark:text-white">
              <span className="material-symbols-outlined font-bold">more_vert</span>
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="px-4 pb-3">
          <div className="flex bg-gray-100 dark:bg-black/20 p-1 rounded-xl">
            {['Tháng', 'Tuần', 'Ngày', 'Agenda'].map((m) => (
              <button 
                key={m} 
                onClick={() => setViewMode(m as ViewMode)}
                className={`flex-1 text-center text-[10px] font-black uppercase tracking-widest py-2 rounded-lg transition-all ${viewMode === m ? 'bg-white dark:bg-surface-dark shadow-sm text-text-main-light dark:text-white' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Day Picker */}
        <div className="border-t border-gray-100 dark:border-white/5 pt-3 pb-2">
          <div className="grid grid-cols-7 px-4">
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d, i) => (
              <div key={d} className={`text-center text-[9px] font-black uppercase mb-2 ${i === 3 ? 'text-primary' : 'text-gray-400'}`}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 px-3 pb-2 gap-1.5">
            {[21, 22, 23, 24, 25, 26, 27].map((d, i) => {
              const dateStr = `2023-10-${d}`;
              const isSelected = selectedDate === dateStr;
              return (
                <button 
                  key={d}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`flex flex-col items-center justify-center h-11 rounded-xl transition-all relative ${isSelected ? 'bg-primary text-black font-black shadow-glow' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                >
                  <span className="text-sm font-bold">{d}</span>
                  {d === 23 && <div className="absolute bottom-1.5 size-1 bg-red-500 rounded-full"></div>}
                  {d === 25 && <div className="absolute bottom-1.5 size-1 bg-blue-500 rounded-full"></div>}
                </button>
              );
            })}
          </div>
          <div className="flex justify-center pb-2">
            <div className="w-8 h-1 bg-gray-200 dark:bg-white/10 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Search & Filter Chips */}
        <div className="px-4 py-4 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1 group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px] group-focus-within:text-primary transition-colors">search</span>
              <input className="w-full h-11 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl pl-10 pr-4 text-xs font-bold dark:text-white focus:ring-2 focus:ring-primary/20 outline-none shadow-sm placeholder:text-gray-400" placeholder="Tìm nhiệm vụ, khu vực..." type="text"/>
            </div>
            <button className="relative flex items-center justify-center size-11 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl text-gray-600 dark:text-gray-300 shadow-sm active:scale-95 transition-transform">
              <span className="material-symbols-outlined">filter_list</span>
              <div className="absolute top-2.5 right-2.5 size-2 bg-primary rounded-full border-2 border-white dark:border-surface-dark"></div>
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {['Tất cả', 'Chưa làm', 'Ưu tiên cao', 'Của tôi'].map((f) => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`shrink-0 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-text-main-light text-white dark:bg-white dark:text-black shadow-lg' : 'bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-gray-500'}`}
              >
                {f} {f === 'Chưa làm' && <span className="ml-1 px-1.5 rounded-md bg-gray-100 dark:bg-white/10 text-[9px]">3</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        <div className="px-4 flex flex-col gap-0">
          {filteredTasks.map((task, i) => (
            <div key={task.id} className="flex gap-4 group">
              <div className="flex flex-col items-center w-12 pt-2 gap-1 shrink-0">
                <span className="text-sm font-black text-text-main-light dark:text-white leading-none">{task.time}</span>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">AM</span>
                {i < filteredTasks.length - 1 && <div className="w-[1.5px] h-full bg-gray-200 dark:bg-white/10 my-1 rounded-full"></div>}
              </div>

              <div className={`flex-1 relative mb-6 rounded-3xl p-4 shadow-sm border transition-all active:scale-[0.98] ${task.completed ? 'bg-white/60 dark:bg-surface-dark/60 opacity-60' : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800 hover:shadow-md'}`}>
                {task.completed && (
                  <div className="absolute -right-1 -top-1 bg-white dark:bg-surface-dark rounded-full">
                    <span className="material-symbols-outlined text-primary text-[24px] material-symbols-filled">check_circle</span>
                  </div>
                )}
                
                <div className={`absolute left-0 top-5 bottom-5 w-1.5 rounded-r-full ${getPriorityColor(task.priority)}`}></div>
                
                <div className="pl-3 pr-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`size-9 rounded-xl flex items-center justify-center ${getIconBg(task.type)}`}>
                      <span className="material-symbols-outlined !text-xl">{getIcon(task.type)}</span>
                    </div>
                    <h4 className={`font-black text-sm text-text-main-light dark:text-white ${task.completed ? 'line-through decoration-gray-400' : ''}`}>
                      {task.title}
                    </h4>
                  </div>

                  {task.type === 'inspection' && (
                    <div className="mb-3 bg-red-50 dark:bg-red-900/10 rounded-xl p-3 border border-red-100 dark:border-red-900/20 flex gap-3 items-start">
                      <span className="material-symbols-outlined text-base text-red-500 font-bold mt-0.5">bug_report</span>
                      <p className="text-[11px] text-red-700 dark:text-red-300 leading-relaxed font-bold italic">
                        Phát hiện khả nghi tại <span className="underline">Khu vực C2</span>. Mức độ lây lan dự báo: Cao.
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-y-2 mt-2">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <span className="material-symbols-outlined !text-base">location_on</span>
                      <span className="text-[11px] font-bold tracking-tight">{task.area}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <span className="material-symbols-outlined !text-base">{task.type === 'harvest' ? 'scale' : 'timer'}</span>
                      <span className="text-[11px] font-bold tracking-tight">{task.type === 'harvest' ? 'Dự kiến: 500kg' : '30 phút'}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {task.type === 'harvest' ? (
                        <div className="flex -space-x-2">
                          {[1, 2].map(u => (
                            <img key={u} alt="User" className="size-6 rounded-full border-2 border-white dark:border-surface-dark shadow-sm" src={`https://i.pravatar.cc/100?u=${u}`} />
                          ))}
                          <div className="size-6 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center border-2 border-white dark:border-surface-dark text-[8px] font-black text-gray-500">+3</div>
                        </div>
                      ) : (
                        <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center border-2 border-white dark:border-surface-dark text-[9px] font-black text-primary-dark">H</div>
                      )}
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {task.type === 'harvest' ? 'Đội thu hoạch 1' : 'Hệ thống thực hiện'}
                      </span>
                    </div>
                    {task.priority === 'High' ? (
                      <span className="px-2.5 py-1 rounded-lg text-[9px] font-black bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200 uppercase tracking-widest">Khẩn cấp</span>
                    ) : (
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${task.completed ? 'bg-gray-100 text-gray-500 dark:bg-white/10' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 animate-pulse'}`}>
                        {task.completed ? 'Done' : 'Running'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-6 right-6 z-[60]">
        <button 
          onClick={() => onNavigate('add-task')}
          className="size-16 rounded-full bg-primary text-black shadow-xl shadow-primary/40 flex items-center justify-center active:scale-90 transition-all border-4 border-background-light dark:border-background-dark"
        >
          <span className="material-symbols-outlined text-3xl font-black">add</span>
        </button>
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
      `}</style>
    </div>
  );
};

export default Tasks;
