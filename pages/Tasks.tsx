
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
    }
  ]);

  const [viewMode, setViewMode] = useState<ViewMode>('Tuần');
  const [selectedDate, setSelectedDate] = useState<string>('2023-10-24');
  const [filter, setFilter] = useState('Tất cả');
  const [detailTask, setDetailTask] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => {
    let result = tasks.filter(t => t.dueDate === selectedDate);
    if (filter === 'Chưa làm') result = result.filter(t => t.status !== 'Completed');
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

  const getStatusConfig = (status: TaskStatus) => {
    switch(status) {
      case 'Completed': 
        return { 
          label: 'Hoàn tất', 
          color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300', 
          icon: 'check_circle', 
          borderColor: 'border-green-100 dark:border-green-900/30' 
        };
      case 'In Progress': 
        return { 
          label: 'Đang làm', 
          color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', 
          icon: 'progress_activity', 
          borderColor: 'border-blue-100 dark:border-blue-900/30',
          animate: 'animate-spin-slow'
        };
      default: 
        return { 
          label: 'Đang chờ', 
          color: 'bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-400', 
          icon: 'schedule', 
          borderColor: 'border-gray-100 dark:border-white/10' 
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

  const updateTaskStatus = (id: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    if (detailTask?.id === id) {
      setDetailTask(prev => prev ? { ...prev, status: newStatus } : null);
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
            {[21, 22, 23, 24, 25, 26, 27].map((d) => {
              const dateStr = `2023-10-${d}`;
              const isSelected = selectedDate === dateStr;
              return (
                <button 
                  key={d}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`flex flex-col items-center justify-center h-11 rounded-xl transition-all relative ${isSelected ? 'bg-primary text-black font-black shadow-glow' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                >
                  <span className="text-sm font-bold">{d}</span>
                </button>
              );
            })}
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
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {['Tất cả', 'Chưa làm', 'Ưu tiên cao', 'Của tôi'].map((f) => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`shrink-0 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-text-main-light text-white dark:bg-white dark:text-black shadow-lg' : 'bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-gray-500'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        <div className="px-4 flex flex-col gap-0">
          {filteredTasks.map((task, i) => {
            const statusCfg = getStatusConfig(task.status);
            return (
              <div key={task.id} className="flex gap-4 group">
                <div className="flex flex-col items-center w-12 pt-2 gap-1 shrink-0">
                  <span className="text-sm font-black text-text-main-light dark:text-white leading-none">{task.time}</span>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">AM</span>
                  {i < filteredTasks.length - 1 && <div className="w-[1.5px] h-full bg-gray-200 dark:bg-white/10 my-1 rounded-full"></div>}
                </div>

                <div 
                  onClick={() => setDetailTask(task)}
                  className={`flex-1 relative mb-6 rounded-3xl p-4 shadow-sm border transition-all cursor-pointer active:scale-[0.98] ${task.status === 'Completed' ? 'bg-white/60 dark:bg-surface-dark/60 opacity-60' : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800 hover:shadow-md'}`}
                >
                  <div className={`absolute -right-1 -top-1 size-8 rounded-full flex items-center justify-center z-10 ${statusCfg.color} border-2 border-white dark:border-surface-dark`}>
                    <span className={`material-symbols-outlined !text-[18px] ${statusCfg.animate || ''}`}>{statusCfg.icon}</span>
                  </div>
                  
                  <div className={`absolute left-0 top-5 bottom-5 w-1.5 rounded-r-full ${getPriorityColor(task.priority)}`}></div>
                  
                  <div className="pl-3 pr-2">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`size-9 rounded-xl flex items-center justify-center ${getIconBg(task.type)}`}>
                        <span className="material-symbols-outlined !text-xl">{getIcon(task.type)}</span>
                      </div>
                      <h4 className={`font-black text-sm text-text-main-light dark:text-white ${task.status === 'Completed' ? 'line-through decoration-gray-400' : ''}`}>
                        {task.title}
                      </h4>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 mt-2">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <span className="material-symbols-outlined !text-base">location_on</span>
                        <span className="text-[11px] font-bold tracking-tight truncate">{task.area}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${statusCfg.color}`}>
                          {statusCfg.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Task Detail Modal */}
      {detailTask && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm transition-opacity p-4">
          <div className="absolute inset-0" onClick={() => setDetailTask(null)}></div>
          <div className="w-full max-w-md bg-white dark:bg-surface-dark rounded-[2.5rem] shadow-2xl overflow-hidden animate-[slideUp_0.3s_ease-out] relative z-10">
            <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`size-10 rounded-2xl flex items-center justify-center ${getIconBg(detailTask.type)}`}>
                  <span className="material-symbols-outlined !text-2xl">{getIcon(detailTask.type)}</span>
                </div>
                <div>
                  <h3 className="text-base font-black dark:text-white uppercase tracking-tight">Chi tiết nhiệm vụ</h3>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Mã vụ: #G-2023-OCT-{detailTask.id}</p>
                </div>
              </div>
              <button onClick={() => setDetailTask(null)} className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-gray-400">close</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h1 className="text-2xl font-black text-text-main-light dark:text-white leading-tight mb-2">{detailTask.title}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{detailTask.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2">Khu vực thực hiện</span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary !text-lg">location_on</span>
                    <span className="text-xs font-black dark:text-white">{detailTask.area}</span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2">Độ ưu tiên</span>
                  <div className="flex items-center gap-2">
                    <div className={`size-2 rounded-full ${getPriorityColor(detailTask.priority)} shadow-glow`}></div>
                    <span className="text-xs font-black dark:text-white">{detailTask.priority}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Cập nhật trạng thái</h4>
                <div className="flex gap-2">
                  {(['Pending', 'In Progress', 'Completed'] as TaskStatus[]).map((st) => {
                    const cfg = getStatusConfig(st);
                    const isActive = detailTask.status === st;
                    return (
                      <button
                        key={st}
                        onClick={() => updateTaskStatus(detailTask.id, st)}
                        className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${isActive ? 'bg-primary/10 border-primary ring-1 ring-primary/20' : 'bg-gray-50 dark:bg-black/20 border-transparent text-gray-400'}`}
                      >
                        <span className={`material-symbols-outlined !text-xl ${isActive ? 'text-primary font-black' : ''} ${st === 'In Progress' && isActive ? 'animate-spin-slow' : ''}`}>
                          {cfg.icon}
                        </span>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-text-main-light dark:text-white' : ''}`}>
                          {cfg.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-4 pb-4">
                <button className="flex-1 h-14 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 transition-all active:scale-95 font-black uppercase text-[11px] tracking-widest">
                  <span className="material-symbols-outlined !text-xl">edit</span>
                  Chỉnh sửa
                </button>
                <button 
                  onClick={() => {
                    if (confirm('Bạn có chắc chắn muốn xóa nhiệm vụ này?')) {
                      setTasks(tasks.filter(t => t.id !== detailTask.id));
                      setDetailTask(null);
                    }
                  }}
                  className="size-14 rounded-2xl border border-red-100 dark:border-red-900/30 flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined !text-2xl">delete_sweep</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-[60]">
        <button 
          onClick={() => onNavigate('add-task')}
          className="size-16 rounded-full bg-primary text-black shadow-xl shadow-primary/40 flex items-center justify-center active:scale-90 transition-all border-4 border-background-light dark:border-background-dark"
        >
          <span className="material-symbols-outlined text-3xl font-black">add</span>
        </button>
      </div>

      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .animate-spin-slow { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Tasks;
