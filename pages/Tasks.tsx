
import React, { useState, useMemo } from 'react';
import { Task, Priority } from '../types';
import { GoogleGenAI } from "@google/genai";

interface Props { onBack: () => void; }

const AREAS_LIST = [
  'Vườn Rau Thủy Canh',
  'Chuồng Heo Số 2',
  'Vườn Xoài Cát',
  'Ao Cá Rô Phi',
  'Khu vực chung'
];

type ViewMode = 'Agenda' | 'Week' | 'Month';

const Tasks: React.FC<Props> = ({ onBack }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: '1', 
      title: 'Tưới Nước & Bón Phân', 
      description: 'Sử dụng hệ thống tưới tự động khu A1', 
      dueDate: '2025-05-16', 
      time: '07:00', 
      area: 'Vườn Rau Thủy Canh', 
      priority: 'Medium', 
      completed: true,
      type: 'irrigation'
    },
    { 
      id: '2', 
      title: 'Kiểm tra sâu bệnh (AI)', 
      description: 'Quét định kỳ toàn bộ khu vực B2', 
      dueDate: '2025-05-16', 
      time: '09:00', 
      area: 'Chuồng Heo Số 2', 
      priority: 'High', 
      completed: false,
      type: 'inspection'
    },
    { 
      id: '3', 
      title: 'Vệ sinh chuồng heo', 
      description: 'Dọn dẹp khu vực chuồng số 2', 
      dueDate: '2025-05-17', 
      time: '11:30', 
      area: 'Chuồng số 2', 
      priority: 'Low', 
      completed: false,
      type: 'other'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [filterPriority, setFilterPriority] = useState<Priority | 'All'>('All');
  const [viewMode, setViewMode] = useState<ViewMode>('Week');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    priority: 'Medium',
    type: 'other',
    area: AREAS_LIST[0]
  });

  // Calendar Logic
  const currentMonth = new Date(selectedDate);
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay(); // 0 is Sun
  
  const calendarDays = useMemo(() => {
    const days = [];
    // Adjust for Monday start (T2 is index 1 in standard JS but we want it first)
    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    // Previous month filler
    for (let i = 0; i < startOffset; i++) days.push(null);
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({
        day: i,
        date: dateStr,
        hasTasks: tasks.some(t => t.dueDate === dateStr)
      });
    }
    return days;
  }, [selectedDate, tasks]);

  const filteredTasks = useMemo(() => {
    let result = tasks;
    
    // Date Filtering
    if (viewMode !== 'Agenda') {
      result = result.filter(t => t.dueDate === selectedDate);
    }

    // Priority Filtering
    if (filterPriority !== 'All') {
      result = result.filter(t => t.priority === filterPriority);
    }

    return result;
  }, [tasks, filterPriority, viewMode, selectedDate]);

  const counts = useMemo(() => ({
    All: tasks.length,
    High: tasks.filter(t => t.priority === 'High').length,
    Medium: tasks.filter(t => t.priority === 'Medium').length,
    Low: tasks.filter(t => t.priority === 'Low').length,
  }), [tasks]);

  const handleAiAssist = async () => {
    if (!newTask.title) return;
    setIsAiGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Hãy viết một hướng dẫn SOP ngắn gọn (3 bước) cho công việc nông trại: "${newTask.title}" tại khu vực "${newTask.area}". Trả lời bằng tiếng Việt.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      setNewTask(prev => ({ ...prev, description: response.text }));
    } catch (err) {
      console.error("AI Assist failed:", err);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleAddTask = () => {
    if (!newTask.title) return;
    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTask.title || '',
      description: newTask.description || '',
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      time: newTask.time || '08:00',
      area: newTask.area || 'Khu vực chung',
      priority: newTask.priority as Priority,
      completed: false,
      type: (newTask.type as any) || 'other'
    };
    setTasks([task, ...tasks]);
    setIsModalOpen(false);
    setNewTask({ priority: 'Medium', type: 'other', area: AREAS_LIST[0] });
  };

  const getPriorityColor = (p: Priority) => {
    switch(p) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-orange-500';
      default: return 'bg-blue-500';
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'irrigation': return 'water_drop';
      case 'inspection': return 'bug_report';
      case 'harvest': return 'agriculture';
      default: return 'assignment';
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24 relative overflow-x-hidden font-display">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md p-4 border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
           <button onClick={onBack} className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
           </button>
           <h2 className="text-lg font-bold dark:text-white">Lịch Công Việc</h2>
           <button className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined">tune</span>
           </button>
        </div>
        <div className="flex bg-gray-100 dark:bg-black/20 p-1 rounded-xl">
          {(['Agenda', 'Week', 'Month'] as ViewMode[]).map((m) => (
            <button 
              key={m} 
              onClick={() => setViewMode(m)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === m ? 'bg-white dark:bg-primary dark:text-black shadow-sm' : 'text-gray-500'}`}
            >
              {m === 'Agenda' ? 'Agenda' : m === 'Week' ? 'Tuần' : 'Tháng'}
            </button>
          ))}
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* VIEW SPECIFIC CALENDAR HEADERS */}
        {viewMode === 'Week' && (
          <div className="grid grid-cols-7 gap-1 animate-fadeIn">
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d, i) => {
              const dateObj = new Date();
              dateObj.setDate(dateObj.getDate() + (i - (dateObj.getDay() || 7) + 1));
              const dateStr = dateObj.toISOString().split('T')[0];
              const isSelected = selectedDate === dateStr;
              return (
                <button 
                  key={d} 
                  onClick={() => setSelectedDate(dateStr)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{d}</span>
                  <div className={`size-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${isSelected ? 'bg-primary text-black shadow-glow' : 'hover:bg-gray-100 dark:hover:bg-white/5 dark:text-white'}`}>
                    {dateObj.getDate()}
                  </div>
                  {tasks.some(t => t.dueDate === dateStr) && (
                    <div className="size-1 bg-primary rounded-full mt-1"></div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {viewMode === 'Month' && (
          <div className="bg-white dark:bg-surface-dark rounded-[2rem] p-4 border border-gray-100 dark:border-gray-800 shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="font-bold dark:text-white capitalize">
                Tháng {currentMonth.getMonth() + 1}, {currentMonth.getFullYear()}
              </h3>
              <div className="flex gap-2">
                <button className="size-8 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                <button className="size-8 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-y-2 text-center">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
                <span key={d} className="text-[10px] font-bold text-gray-400 uppercase mb-2">{d}</span>
              ))}
              {calendarDays.map((dayObj, i) => {
                if (!dayObj) return <div key={`empty-${i}`} className="h-10"></div>;
                const isSelected = selectedDate === dayObj.date;
                return (
                  <button 
                    key={dayObj.date}
                    onClick={() => setSelectedDate(dayObj.date)}
                    className="h-10 relative flex flex-col items-center justify-center group"
                  >
                    <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isSelected ? 'bg-primary text-black shadow-glow' : 'dark:text-white group-hover:bg-gray-50 dark:group-hover:bg-white/5'}`}>
                      {dayObj.day}
                    </div>
                    {dayObj.hasTasks && (
                      <div className={`absolute bottom-0 size-1 rounded-full ${isSelected ? 'bg-black' : 'bg-primary'}`}></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* PRIORITY FILTERS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ưu tiên: {filterPriority === 'All' ? 'Tất cả' : filterPriority}</span>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            <button 
              onClick={() => setFilterPriority('All')}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${filterPriority === 'All' ? 'bg-primary border-primary text-black shadow-glow' : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800 text-gray-500'}`}
            >
              Tất cả <span className="px-1.5 rounded-full bg-black/5 dark:bg-white/5">{counts.All}</span>
            </button>
            <button 
              onClick={() => setFilterPriority('High')}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${filterPriority === 'High' ? 'bg-red-500 border-red-500 text-white' : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800 text-red-500'}`}
            >
              Cao <span className="px-1.5 rounded-full bg-black/10">{counts.High}</span>
            </button>
            <button 
              onClick={() => setFilterPriority('Medium')}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${filterPriority === 'Medium' ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800 text-orange-500'}`}
            >
              Vừa <span className="px-1.5 rounded-full bg-black/10">{counts.Medium}</span>
            </button>
          </div>
        </div>

        {/* TASK LIST */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
            {viewMode === 'Agenda' ? 'Tất cả lịch trình' : `Công việc ngày ${selectedDate.split('-').reverse().join('/')}`}
          </h3>
          {filteredTasks.length > 0 ? filteredTasks.map((task) => (
            <div key={task.id} className="relative grid grid-cols-[50px_1fr] gap-4 group">
              <div className="flex flex-col items-center pt-2">
                <span className="text-sm font-bold dark:text-white">{task.time}</span>
                <div className="mt-2 flex-1 w-[2px] bg-primary/20 rounded-full group-last:bg-transparent"></div>
              </div>
              <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm relative cursor-pointer active:scale-[0.98] transition-all">
                <div className={`absolute left-0 top-4 bottom-4 w-1 rounded-r-full ${getPriorityColor(task.priority)}`}></div>
                <div className="flex items-center gap-3">
                  <div className={`size-10 rounded-xl flex items-center justify-center ${
                    task.priority === 'High' ? 'bg-red-50 dark:bg-red-900/20 text-red-600' :
                    task.priority === 'Medium' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600' :
                    'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                  }`}>
                    <span className="material-symbols-outlined">{getIcon(task.type)}</span>
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold dark:text-white text-sm">{task.title}</h4>
                     <p className="text-[10px] text-gray-500 font-medium">{task.area} • {task.time}</p>
                  </div>
                  {task.completed && <span className="material-symbols-outlined text-green-500">check_circle</span>}
                </div>
              </div>
            </div>
          )) : (
            <div className="py-12 flex flex-col items-center justify-center text-center opacity-40">
              <span className="material-symbols-outlined !text-5xl mb-3">event_available</span>
              <p className="text-xs font-bold uppercase tracking-widest dark:text-white">Không có lịch trình</p>
            </div>
          )}
        </div>
      </div>

      {/* CREATE TASK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-surface-dark rounded-t-[2.5rem] shadow-2xl animate-[slideUp_0.4s_ease-out] overflow-hidden">
            <div className="p-6 pb-2 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold dark:text-white">Thêm Công Việc Mới</h3>
              <button onClick={() => setIsModalOpen(false)} className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto no-scrollbar">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Tên công việc</label>
                <input 
                  type="text" 
                  value={newTask.title || ''}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="VD: Kiểm tra độ ẩm đất..." 
                  className="w-full h-14 bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-2xl px-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center pr-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Chi tiết hướng dẫn</label>
                  <button 
                    onClick={handleAiAssist}
                    disabled={!newTask.title || isAiGenerating}
                    className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline disabled:opacity-40"
                  >
                    <span className={`material-symbols-outlined !text-[14px] ${isAiGenerating ? 'animate-spin' : ''}`}>auto_awesome</span>
                    {isAiGenerating ? 'Đang viết...' : 'AI Soạn SOP'}
                  </button>
                </div>
                <textarea 
                  value={newTask.description || ''}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  rows={3}
                  placeholder="Nhập ghi chú hoặc dùng AI hỗ trợ..." 
                  className="w-full bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none dark:text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Ngày thực hiện</label>
                  <input 
                    type="date" 
                    value={newTask.dueDate || selectedDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    className="w-full h-14 bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-2xl px-4 text-sm font-medium outline-none dark:text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Giờ</label>
                  <input 
                    type="time" 
                    value={newTask.time || '08:00'}
                    onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                    className="w-full h-14 bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-2xl px-4 text-sm font-medium outline-none dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Khu vực</label>
                <select 
                  value={newTask.area || ''}
                  onChange={(e) => setNewTask({...newTask, area: e.target.value})}
                  className="w-full h-14 bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-2xl px-4 text-sm font-medium outline-none dark:text-white appearance-none"
                >
                  {AREAS_LIST.map(area => <option key={area} value={area}>{area}</option>)}
                </select>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-background-dark/50 flex gap-3">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 h-14 bg-white dark:bg-surface-dark border border-gray-200 rounded-2xl font-bold dark:text-white">Hủy</button>
              <button onClick={handleAddTask} className="flex-[2] h-14 bg-primary text-black rounded-2xl font-bold shadow-lg shadow-primary/20">Lưu công việc</button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={() => setIsModalOpen(true)} className="size-14 rounded-full bg-primary text-black shadow-xl shadow-primary/40 flex items-center justify-center active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-3xl font-bold">add</span>
        </button>
      </div>

      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Tasks;
