
import React, { useState, useMemo } from 'react';
import { Task, Priority, Page, TaskStatus } from '../types';

interface Props { onBack: () => void; onNavigate: (page: Page) => void; }

type ViewMode = 'Tháng' | 'Tuần' | 'Ngày' | 'Agenda';

const Tasks: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: '1', 
      title: 'Tưới nước tự động', 
      description: 'Hệ thống thực hiện định kỳ theo lịch trình tối ưu hóa lượng nước dựa trên độ ẩm đất thực tế.', 
      dueDate: '2023-10-24', 
      time: '08:00', 
      area: 'Khu A • IoT Block 1', 
      priority: 'Medium', 
      status: 'Pending',
      type: 'irrigation'
    },
    { 
      id: '2', 
      title: 'Bón phân NPK', 
      description: 'Bón phân thúc giai đoạn ra hoa. Đã được thực hiện bởi Nguyễn Văn B.', 
      dueDate: '2023-10-24', 
      time: '10:30', 
      area: 'Nhà kính C1', 
      priority: 'Medium', 
      status: 'Completed',
      type: 'other'
    },
    { 
      id: '3', 
      title: 'Kiểm tra sâu bệnh (AI)', 
      description: 'Phát hiện khả nghi tại Khu vực C2. Mức độ lây lan dự báo: Cao. Cần kiểm tra thực địa và xác nhận lại với chuyên gia.', 
      dueDate: '2023-10-24', 
      time: '15:00', 
      area: 'Team: Kỹ thuật', 
      priority: 'High', 
      status: 'In Progress',
      type: 'inspection'
    },
    { 
      id: '4', 
      title: 'Thu hoạch Cà chua', 
      description: 'Thu hoạch đợt 2 cho đơn hàng siêu thị. Dự kiến sản lượng khoảng 500kg đạt chuẩn GlobalGAP.', 
      dueDate: '2023-10-24', 
      time: '16:30', 
      area: 'Nhà kính C1', 
      priority: 'Low', 
      status: 'Pending',
      type: 'harvest'
    },
    { 
      id: '5', 
      title: 'Tưới nước Vườn Ổi', 
      description: 'Nhiệm vụ tưới nước định kỳ theo lịch trình Pro Farming cho khu vực vườn ổi.', 
      dueDate: '2023-10-25', 
      time: '08:00', 
      area: 'Khu A - Vườn Ổi (300m²)', 
      priority: 'Medium', 
      status: 'Pending',
      type: 'irrigation'
    }
  ]);

  const [viewMode, setViewMode] = useState<ViewMode>('Tuần');
  const [selectedDate, setSelectedDate] = useState<string>('2023-10-24');
  
  // Filtering States
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All');
  
  const [detailTask, setDetailTask] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => {
    let result = tasks.filter(t => t.dueDate === selectedDate);
    
    if (priorityFilter !== 'All') {
      result = result.filter(t => t.priority === priorityFilter);
    }
    
    if (statusFilter !== 'All') {
      result = result.filter(t => t.status === statusFilter);
    }
    
    return result;
  }, [tasks, selectedDate, priorityFilter, statusFilter]);

  const getPriorityColor = (p: Priority) => {
    switch(p) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-orange-500';
      default: return 'bg-green-500';
    }
  };

  const getStatusConfig = (status: TaskStatus) => {
    switch(status) {
      case 'Completed': 
        return { 
          label: 'Hoàn tất', 
          color: 'bg-green-500/10 text-green-600 dark:text-green-400', 
          icon: 'check_circle', 
          borderColor: 'border-green-500/20' 
        };
      case 'In Progress': 
        return { 
          label: 'Đang làm', 
          color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400', 
          icon: 'cached', 
          borderColor: 'border-blue-500/20',
          animate: 'animate-spin-slow'
        };
      default: 
        return { 
          label: 'Đang chờ', 
          color: 'bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400', 
          icon: 'more_horiz', 
          borderColor: 'border-gray-200 dark:border-white/5' 
        };
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

  const updateTaskStatus = (id: string, newStatus: TaskStatus, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    if (detailTask?.id === id) {
      setDetailTask(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col font-display antialiased">
      {/* Header */}
      <header className="bg-white dark:bg-surface-dark shadow-sm z-30 shrink-0 sticky top-0">
        <div className="flex items-center px-4 py-2 justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="flex items-center justify-center size-9 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-text-main-light dark:text-white font-bold">arrow_back</span>
            </button>
            <div>
              <h2 className="text-text-main-light dark:text-white text-base font-black leading-tight tracking-tight uppercase">Lịch Công Việc</h2>
              <p className="text-[9px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest">Tháng 10, 2023</p>
            </div>
          </div>
          <button className="flex items-center justify-center size-9 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-text-main-light dark:text-white">
            <span className="material-symbols-outlined font-bold">tune</span>
          </button>
        </div>

        {/* View Switcher Tabs - COMPACT */}
        <div className="px-4 pb-2">
          <div className="flex bg-gray-100 dark:bg-black/20 p-0.5 rounded-xl">
            {['Tháng', 'Tuần', 'Ngày', 'Agenda'].map((m) => (
              <button 
                key={m} 
                onClick={() => setViewMode(m as ViewMode)}
                className={`flex-1 text-center text-[9px] font-black uppercase tracking-widest py-1.5 rounded-lg transition-all ${viewMode === m ? 'bg-white dark:bg-surface-dark shadow-sm text-text-main-light dark:text-white' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Day Picker - COMPACT */}
        <div className="border-t border-gray-50 dark:border-white/5 pt-2 pb-1">
          <div className="grid grid-cols-7 px-4">
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d, i) => (
              <div key={d} className={`text-center text-[8px] font-black uppercase mb-1 ${i === 3 ? 'text-primary' : 'text-gray-400'}`}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 px-2 pb-1 gap-1">
            {[21, 22, 23, 24, 25, 26, 27].map((d) => {
              const dateStr = `2023-10-${d}`;
              const isSelected = selectedDate === dateStr;
              return (
                <button 
                  key={d} 
                  onClick={() => setSelectedDate(dateStr)}
                  className={`flex flex-col items-center justify-center h-10 rounded-xl transition-all relative ${isSelected ? 'bg-primary text-black font-black shadow-glow' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                >
                  <span className="text-xs font-bold">{d}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Advanced Filters */}
        <div className="px-4 py-3 space-y-3">
          {/* Status Filter */}
          <div>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 px-1">Trạng thái</p>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {['All', 'Pending', 'In Progress', 'Completed'].map((s) => (
                <button 
                  key={s} 
                  onClick={() => setStatusFilter(s as any)}
                  className={`shrink-0 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${statusFilter === s ? 'bg-text-main-light text-white dark:bg-white dark:text-black shadow-md' : 'bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-gray-500'}`}
                >
                  {s === 'All' ? 'Tất cả' : s === 'Pending' ? 'Đang chờ' : s === 'In Progress' ? 'Đang làm' : 'Hoàn tất'}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Filter */}
          <div>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 px-1">Ưu tiên</p>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {['All', 'High', 'Medium', 'Low'].map((p) => (
                <button 
                  key={p} 
                  onClick={() => setPriorityFilter(p as any)}
                  className={`shrink-0 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${priorityFilter === p ? 'bg-text-main-light text-white dark:bg-white dark:text-black shadow-md' : 'bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-gray-500'}`}
                >
                  {p === 'All' ? 'Tất cả' : p === 'High' ? 'Cao' : p === 'Medium' ? 'Trung bình' : 'Thấp'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline View - 50% GAP REDUCTION */}
        <div className="px-4 flex flex-col pt-2">
          {filteredTasks.length > 0 ? filteredTasks.map((task, i) => {
            const statusCfg = getStatusConfig(task.status);
            return (
              <div key={task.id} className="flex gap-3 group">
                <div className="flex flex-col items-center w-10 pt-1.5 gap-0.5 shrink-0">
                  <span className="text-xs font-black text-text-main-light dark:text-white leading-none">{task.time}</span>
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">AM</span>
                  {i < filteredTasks.length - 1 && <div className="w-[1.5px] h-full bg-gray-200 dark:bg-white/10 my-1.5 rounded-full"></div>}
                </div>

                <div 
                  onClick={() => setDetailTask(task)}
                  className={`flex-1 relative mb-3 rounded-[2rem] p-3 shadow-sm border transition-all cursor-pointer active:scale-[0.99] ${task.status === 'Completed' ? 'bg-white/40 dark:bg-surface-dark/40 border-green-500/20 opacity-80' : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800 hover:shadow-md'}`}
                >
                  {/* Status Visual Indicator Floating Icon */}
                  <div className={`absolute -right-1 -top-1 size-8 rounded-full flex items-center justify-center z-10 ${statusCfg.color} border-2 border-white dark:border-surface-dark shadow-sm`}>
                    <span className={`material-symbols-outlined !text-[16px] font-black ${statusCfg.animate || ''}`}>{statusCfg.icon}</span>
                  </div>
                  
                  {/* Priority Bar Indicator */}
                  <div className={`absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full ${getPriorityColor(task.priority)} shadow-[0_0_10px_rgba(0,0,0,0.1)]`}></div>
                  
                  <div className="pl-3 pr-1">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className={`size-8 rounded-xl flex items-center justify-center shrink-0 ${getIconBg(task.type)} shadow-sm`}>
                        <span className="material-symbols-outlined !text-lg">{getIcon(task.type)}</span>
                      </div>
                      <h4 className={`font-black text-xs text-text-main-light dark:text-white uppercase tracking-tight truncate ${task.status === 'Completed' ? 'line-through opacity-50' : ''}`}>
                        {task.title}
                      </h4>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                        <span className="material-symbols-outlined !text-sm">location_on</span>
                        <span className="text-[10px] font-bold tracking-tight truncate uppercase opacity-80">{task.area}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        {/* Explicit Status Tag */}
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${statusCfg.borderColor} ${statusCfg.color}`}>
                           <span className="text-[9px] font-black uppercase tracking-widest">{statusCfg.label}</span>
                        </div>

                        {/* Quick Action Status Cycle */}
                        <div className="flex gap-1.5">
                           {task.status !== 'Completed' && (
                             <button 
                               onClick={(e) => updateTaskStatus(task.id, 'Completed', e)}
                               className="size-7 rounded-lg bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/20 active:scale-90 transition-all"
                             >
                               <span className="material-symbols-outlined !text-sm font-bold">check</span>
                             </button>
                           )}
                           {task.status === 'Pending' && (
                             <button 
                               onClick={(e) => updateTaskStatus(task.id, 'In Progress', e)}
                               className="size-7 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 active:scale-90 transition-all"
                             >
                               <span className="material-symbols-outlined !text-sm font-bold">play_arrow</span>
                             </button>
                           )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="py-20 text-center opacity-30">
              <span className="material-symbols-outlined !text-6xl mb-2">event_busy</span>
              <p className="font-black text-xs uppercase tracking-widest">Không có nhiệm vụ</p>
            </div>
          )}
        </div>
      </div>

      {/* Task Detail Modal */}
      {detailTask && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm transition-opacity p-4">
          <div className="absolute inset-0" onClick={() => setDetailTask(null)}></div>
          <div className="w-full max-w-md bg-white dark:bg-surface-dark rounded-[2.5rem] shadow-2xl overflow-hidden animate-[slideUp_0.3s_ease-out] relative z-10">
            <div className="p-5 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`size-10 rounded-2xl flex items-center justify-center ${getIconBg(detailTask.type)} shadow-sm`}>
                  <span className="material-symbols-outlined !text-2xl">{getIcon(detailTask.type)}</span>
                </div>
                <div>
                  <h3 className="text-sm font-black dark:text-white uppercase tracking-tight">Chi tiết nhiệm vụ</h3>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Mã: #T-{detailTask.id}</p>
                </div>
              </div>
              <button onClick={() => setDetailTask(null)} className="size-9 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-gray-400">close</span>
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <h1 className="text-xl font-black text-text-main-light dark:text-white leading-tight mb-2 uppercase tracking-tight">{detailTask.title}</h1>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{detailTask.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-black/20 p-3 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1.5">Vị trí</span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary !text-base">location_on</span>
                    <span className="text-[11px] font-black dark:text-white uppercase truncate">{detailTask.area}</span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-black/20 p-3 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1.5">Ưu tiên</span>
                  <div className="flex items-center gap-2">
                    <div className={`size-2 rounded-full ${getPriorityColor(detailTask.priority)} shadow-glow`}></div>
                    <span className="text-[11px] font-black dark:text-white uppercase">{detailTask.priority}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Trạng thái hiện tại</h4>
                <div className="flex gap-2">
                  {(['Pending', 'In Progress', 'Completed'] as TaskStatus[]).map((st) => {
                    const cfg = getStatusConfig(st);
                    const isActive = detailTask.status === st;
                    return (
                      <button
                        key={st}
                        onClick={() => updateTaskStatus(detailTask.id, st)}
                        className={`flex-1 flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border transition-all ${isActive ? 'bg-primary/10 border-primary ring-1 ring-primary/20' : 'bg-gray-50 dark:bg-black/20 border-transparent text-gray-400'}`}
                      >
                        <span className={`material-symbols-outlined !text-xl ${isActive ? 'text-primary font-black' : ''} ${st === 'In Progress' && isActive ? 'animate-spin-slow' : ''}`}>
                          {cfg.icon}
                        </span>
                        <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-text-main-light dark:text-white' : ''}`}>
                          {cfg.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2 pt-2 pb-2">
                <button className="flex-1 h-12 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 transition-all active:scale-95 font-black uppercase text-[10px] tracking-widest">
                  <span className="material-symbols-outlined !text-lg">edit</span>
                  Chỉnh sửa
                </button>
                <button 
                  onClick={() => {
                    if (confirm('Xóa nhiệm vụ này?')) {
                      setTasks(tasks.filter(t => t.id !== detailTask.id));
                      setDetailTask(null);
                    }
                  }}
                  className="size-12 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined !text-xl">delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAB - COMPACT */}
      <div className="fixed bottom-6 right-6 z-[60]">
        <button 
          onClick={() => onNavigate('add-task')}
          className="size-14 rounded-full bg-primary text-black shadow-xl shadow-primary/30 flex items-center justify-center active:scale-90 transition-all border-4 border-background-light dark:border-background-dark"
        >
          <span className="material-symbols-outlined text-2xl font-black">add</span>
        </button>
      </div>

      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .shadow-glow { box-shadow: 0 0 10px rgba(19, 236, 73, 0.4); }
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Tasks;
