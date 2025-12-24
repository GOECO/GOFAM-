
import React, { useState, useRef } from 'react';
import { Page, Area, AreaState } from '../types';

interface Props { onBack: () => void; onNavigate: (page: Page) => void; }

const INITIAL_AREAS: Area[] = [
  {
    id: '1',
    name: 'Vườn Rau Thủy Canh',
    typeIcon: 'potted_plant',
    crop: 'Rau xà lách',
    size: '150 m²',
    count: '2.500 cây',
    health: '98% Tốt',
    healthColor: 'green',
    state: 'active',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5fmRypcuzJ07d9r9HNQGNpN3nA1ix9295k_Ydauu7vtxaLEj4A7IGPAqx9zX-lQBho3pmiOrloy5UFZ3zbMODzyPcn3f2dQYwObgNCRO18YQIwzLj_dtvNOI6CPHzlVdpq7cYmrgWTClrGLa7cxMdELTYVn6kryutc9Vluc-uNzuReEVjoJzwppqH7zjJzuZ9yZgP-36YbimZgafxgf6mZP2yVJua0-l0ok4JFTbxBTUQ15YZXm9JrVyN0_0cWke58YIWFlGBP0Ax',
    growthStage: 'Phát triển lá',
    daysToHarvest: 12,
    totalCycleDays: 45,
    sensors: { temp: '28°C', hum: '75%', soil: '65%', ph: '6.5' },
    mapPos: { x: 30, y: 40 }
  },
  {
    id: '2',
    name: 'Chuồng Heo Số 2',
    typeIcon: 'pets',
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
    mapPos: { x: 70, y: 25 }
  },
  {
    id: '3',
    name: 'Vườn Xoài Cát',
    typeIcon: 'park',
    crop: 'Cây ăn quả',
    size: '2.000 m²',
    count: '120 gốc',
    health: '85% Cần chú ý',
    healthColor: 'yellow',
    state: 'warning',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC65dQ_vTeL2axAsePQnA2kLeFgMuK2pZNegOEqZhEdOrrVKvFtyoJdhIuLTMxxqNgfEXLF-g2C79lIWMEi3sMlVKilFLsMXwWL4lTzqNxB42ONYzQT1Tp3CR2lZk5_xwY-oC9N2_9tzzndxTfRQj1jY6uL5--q9X8rIzntvszXij67S7NT-7SSFqFWwRWXtsEq52UmdGr4IN16-DNLmgejkyGh5By-L2o1_tuK6kPiVj3Z5EsBt8XoY7B--NcslCpSw3cLmXh38jr4',
    growthStage: 'Chín bói',
    daysToHarvest: 5,
    totalCycleDays: 365,
    sensors: { temp: '30°C', soil: '55%', sun: 'Gắt' },
    mapPos: { x: 50, y: 75 }
  }
];

const MOCK_RECENT_TASKS = [
  { id: 't1', title: 'Tưới nước định kỳ', time: '8:00 AM', status: 'Completed', icon: 'water_drop' },
  { id: 't2', title: 'Kiểm tra sâu bệnh', time: '10:30 AM', status: 'Pending', icon: 'bug_report' },
  { id: 't3', title: 'Bón phân thúc', time: 'Hôm qua', status: 'Completed', icon: 'compost' }
];

const Areas: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [areas, setAreas] = useState<Area[]>(INITIAL_AREAS);
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [expandedAreaId, setExpandedAreaId] = useState<string | null>(null);
  const [selectedMapArea, setSelectedMapArea] = useState<Area | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<Partial<Area> | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingAreaId, setUploadingAreaId] = useState<string | null>(null);

  const handleNativeShare = async (area: Area, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `[GOFAM ALERT] ${area.name.toUpperCase()}\n\n` +
      `📌 Khu vực: ${area.name}\n` +
      `🌱 Cây trồng/Vật nuôi: ${area.crop}\n` +
      `📊 Tình trạng: ${area.health}\n` +
      `⚠️ Cảnh báo: ${area.state === 'critical' ? 'KHẨN CẤP' : 'Cần chú ý'}\n\n` +
      `Vui lòng kiểm tra hệ thống ngay lập tức!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Cảnh báo Farm: ${area.name}`,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error("Native share failed", err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Đã sao chép nội dung cảnh báo.');
      } catch (clipErr) {
        console.error("Clipboard failed", clipErr);
        alert('Nội dung cảnh báo:\n\n' + shareText);
      }
    }
  };

  const openAddModal = () => {
    setEditingArea({
      name: '',
      crop: '',
      size: '',
      state: 'active',
      typeIcon: 'potted_plant',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      sensors: { temp: '25°C', hum: '60%' },
      mapPos: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 }
    });
    setIsModalOpen(true);
  };

  const openEditModal = (area: Area, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingArea(area);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Bạn có chắc chắn muốn xóa khu vực này?")) {
      setAreas(areas.filter(a => a.id !== id));
      if (selectedMapArea?.id === id) setSelectedMapArea(null);
    }
  };

  const handleSaveArea = () => {
    if (!editingArea?.name) return;

    if (editingArea.id) {
      setAreas(areas.map(a => a.id === editingArea.id ? (editingArea as Area) : a));
    } else {
      const newArea: Area = {
        ...(editingArea as Area),
        id: Math.random().toString(36).substr(2, 9),
        count: 'N/A',
        health: '100% Mới',
        healthColor: 'green',
        growthStage: 'Gieo hạt',
        daysToHarvest: 0,
        totalCycleDays: 0,
      };
      setAreas([...areas, newArea]);
    }
    setIsModalOpen(false);
    setEditingArea(null);
  };

  const handleTriggerUpload = (areaId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadingAreaId(areaId);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadingAreaId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setAreas(prev => prev.map(a => a.id === uploadingAreaId ? { ...a, img: base64 } : a));
        setUploadingAreaId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusStyles = (state: AreaState) => {
    switch (state) {
      case 'critical':
        return 'bg-red-50 dark:bg-red-900/20 border-red-500 ring-1 ring-red-500/20 shadow-xl scale-[1.02] border-red-500 ring-1 ring-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.25)]';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/40 border-yellow-500 ring-1 ring-yellow-500/50 shadow-lg scale-[1.02] hover:scale-[1.04] transition-all duration-300';
      case 'active':
        return 'bg-green-50 dark:bg-green-900/40 border-green-500 ring-1 ring-green-500/50 shadow-md scale-[1.02] hover:scale-[1.04] transition-all duration-300';
      default:
        return 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800 transition-all duration-300';
    }
  };

  const getStatusTextStyles = (state: AreaState) => {
    switch (state) {
      case 'critical': return 'text-red-600 dark:text-red-400 group:hover.1 transition-colors duration-300';
      case 'warning': return 'text-yellow-700 dark:text-yellow-300 group-hover:text-yellow-900 dark:group-hover:text-yellow-200 transition-colors duration-300';
      case 'active': return 'text-green-700 dark:text-green-300 group-hover:text-green-900 dark:group-hover:text-green-200 transition-colors duration-300';
      default: return 'text-gray-900 dark:text-white';
    }
  };

  const getIconBgStyles = (state: AreaState) => {
    switch (state) {
      case 'critical': return 'bg-red-200/50 dark:bg-red-800/30 border-red-300 dark:border-red-700';
      case 'warning': return 'bg-yellow-200/50 dark:bg-yellow-800/30 border-yellow-300 dark:border-yellow-700';
      case 'active': return 'bg-green-200/50 dark:bg-green-800/30 border-green-300 dark:border-green-700';
      default: return 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const getStatusLabel = (state: AreaState) => {
    switch (state) {
      case 'critical': return 'Nguy cấp';
      case 'warning': return 'Cần chú ý';
      case 'active': return 'Bình thường';
      default: return 'Khác';
    }
  };

  const toggleExpand = (areaId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedAreaId(expandedAreaId === areaId ? null : areaId);
  };

  const filteredAreas = areas.filter(a => {
    if (activeTab === 'Tất cả') return true;
    if (activeTab === 'Cảnh báo') return a.state === 'critical' || a.state === 'warning';
    if (activeTab === 'Trồng trọt') return a.typeIcon === 'potted_plant' || a.typeIcon === 'park';
    if (activeTab === 'Chăn nuôi') return a.typeIcon === 'pets';
    return true;
  });

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-32 font-display">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <button onClick={onBack} className="size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <div className="text-center flex-1">
          <h1 className="text-xl font-bold dark:text-white uppercase tracking-tight">Khu vực sản xuất</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Trạng thái Nông trại Pro</p>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
            className={`size-10 rounded-xl flex items-center justify-center transition-all ${viewMode === 'map' ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow-lg' : 'bg-gray-100 dark:bg-white/5 text-gray-500'}`}
          >
            <span className="material-symbols-outlined font-bold">{viewMode === 'list' ? 'map' : 'list'}</span>
          </button>
          <button onClick={openAddModal} className="size-10 rounded-xl bg-primary text-black flex items-center justify-center shadow-glow active:scale-90 transition-all">
            <span className="material-symbols-outlined font-bold">add</span>
          </button>
        </div>
      </header>

      {/* View Toggle Info Bar */}
      <div className="px-4 py-2 bg-white dark:bg-surface-dark border-b border-gray-50 dark:border-gray-800/50 overflow-x-auto no-scrollbar flex items-center justify-between gap-4">
        <div className="flex gap-1.5 no-scrollbar overflow-x-auto">
          {['Tất cả', 'Trồng trọt', 'Chăn nuôi', 'Cảnh báo'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-primary text-black shadow-glow shadow-primary/20' : 'bg-gray-100 dark:bg-white/5 text-gray-500 border border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="p-4 space-y-3 animate-fadeIn">
          {filteredAreas.map((area) => (
            <div 
              key={area.id}
              onClick={(e) => toggleExpand(area.id, e)}
              className={`rounded-[2.5rem] p-4 border transition-all cursor-pointer group relative ${getStatusStyles(area.state)}`}
            >
              {area.state === 'critical' && (
                <div className="flex items-center justify-between mb-3 text-red-600 dark:text-red-400">
                  <div className="flex items-center gap-2 animate-pulse">
                    <span className="material-symbols-outlined !text-base font-black">emergency_home</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">CẢNH BÁO KHẨN CẤP</span>
                  </div>
                  <button 
                    onClick={(e) => handleNativeShare(area, e)}
                    className="size-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl active:scale-90 transition-all hover:bg-red-700 ring-2 ring-red-100 dark:ring-red-900/30"
                  >
                    <span className="material-symbols-outlined !text-lg font-bold">share</span>
                  </button>
                </div>
              )}

              <div className="flex gap-4">
                <div className="relative shrink-0">
                  <div 
                    className="size-16 rounded-[1.25rem] bg-cover bg-center border border-white/20 dark:border-white/10 shadow-md relative overflow-hidden group/img" 
                    style={{ backgroundImage: `url("${area.img}")` }}
                  >
                     <button 
                      onClick={(e) => handleTriggerUpload(area.id, e)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[2px]"
                     >
                       <span className="material-symbols-outlined font-black !text-base">photo_camera</span>
                     </button>
                  </div>
                  <div className={`absolute -bottom-1.5 -right-1.5 size-8 rounded-xl border flex items-center justify-center shadow-lg transition-all duration-300 ${getIconBgStyles(area.state)}`}>
                    <span className={`material-symbols-outlined !text-base material-symbols-filled ${getStatusTextStyles(area.state)}`}>
                      {area.typeIcon}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col mb-0.5 min-w-0 flex-1 relative">
                      <h3 className={`1 text-base font-black truncate transition-colors uppercase tracking-tight ${getStatusTextStyles(area.state)}`}>
                        {area.name}
                        {/* Tooltip implementation for list items */}
                        {area.state === 'critical' && (
                          <div className="absolute -top-12 left-0 bg-red-600 text-white text-[9px] font-black px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-[100] shadow-2xl border border-red-400/30 translate-y-2 group-hover:translate-y-0 uppercase tracking-widest">
                            AI: Cần can thiệp ngay lập tức!
                            <div className="absolute -bottom-1 left-4 w-2 h-2 bg-red-600 rotate-45"></div>
                          </div>
                        )}
                      </h3>
                      <div className="flex items-center gap-1.5">
                         <p className={`text-[9px] font-black uppercase tracking-widest opacity-90 ${getStatusTextStyles(area.state)}`}>
                          {getStatusLabel(area.state)}
                        </p>
                        <span className="text-[9px] text-gray-300">•</span>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest opacity-70 truncate">
                           #{area.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button 
                        onClick={(e) => openEditModal(area, e)}
                        className="size-8 rounded-full bg-white/40 dark:bg-surface-dark/40 border border-white/20 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-primary transition-all shadow-sm flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined !text-base">edit</span>
                      </button>
                      {area.state !== 'critical' && (
                        <button 
                          onClick={(e) => handleNativeShare(area, e)}
                          className="size-8 rounded-full bg-white/40 dark:bg-surface-dark/40 border border-white/20 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-primary transition-all shadow-sm flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined !text-base">share</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-1 opacity-80 uppercase tracking-tight">{area.crop} • {area.size}</p>
                </div>
              </div>

              {!expandedAreaId && (
                <div className={`mt-4 pt-4 border-t border-black/5 dark:border-white/5 grid grid-cols-4 gap-1 animate-[fadeIn_0.3s_ease-out]`}>
                  {Object.entries(area.sensors).map(([key, val]) => (
                    <div key={key} className="flex flex-col items-center">
                      <span className={`material-symbols-outlined !text-base transition-colors ${getStatusTextStyles(area.state)} opacity-70`}>{
                        key === 'temp' ? 'thermostat' :
                        key === 'hum' ? 'humidity_mid' :
                        key === 'ph' ? 'science' :
                        key === 'soil' ? 'water_drop' : 'wb_sunny'
                      }</span>
                      <span className={`text-[9px] font-black mt-1 transition-colors ${getStatusTextStyles(area.state)}`}>{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {expandedAreaId === area.id && (
                <div className="mt-4 pt-4 border-t border-dashed border-black/10 dark:border-white/10 animate-[slideDown_0.3s_ease-out] space-y-6">
                  {/* Crop Status Section */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="material-symbols-outlined !text-xs text-primary">eco</span>
                        Tình trạng Sinh trưởng
                      </h4>
                      <span className="text-[10px] font-black text-primary uppercase">Ngày {area.totalCycleDays - area.daysToHarvest} / {area.totalCycleDays}</span>
                    </div>
                    <div className="bg-gray-50 dark:bg-black/20 rounded-2xl p-4 border border-white/5">
                      <div className="flex justify-between items-center mb-2">
                         <span className="text-sm font-black dark:text-white uppercase tracking-tight">{area.growthStage}</span>
                         <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-lg border border-primary/20">{area.health}</span>
                      </div>
                      <div className="h-2.5 w-full bg-black/10 dark:bg-white/5 rounded-full overflow-hidden mb-1">
                        <div className="h-full bg-primary shadow-glow transition-all duration-1000" style={{ width: `${((area.totalCycleDays - area.daysToHarvest) / area.totalCycleDays) * 100}%` }}></div>
                      </div>
                      <div className="flex justify-between text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2">
                        <span>Bắt đầu</span>
                        <span className="text-primary font-black animate-pulse">Còn {area.daysToHarvest} ngày thu hoạch</span>
                      </div>
                    </div>
                  </div>

                  {/* Sensors Grid */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5 pl-1">
                      <span className="material-symbols-outlined !text-xs text-primary">sensors</span>
                      Dữ liệu IoT Thời gian thực
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(area.sensors).map(([key, val]) => (
                        <div key={key} className="bg-white/40 dark:bg-black/20 p-3 rounded-2xl border border-white/20 dark:border-white/5 flex items-center gap-2.5 backdrop-blur-md">
                          <div className="size-8 rounded-xl bg-white dark:bg-surface-dark flex items-center justify-center border border-black/5 dark:border-white/5 text-primary shadow-sm">
                            <span className="material-symbols-outlined !text-base">
                              {key === 'temp' ? 'thermostat' : key === 'hum' ? 'humidity_mid' : key === 'ph' ? 'science' : key === 'soil' ? 'water_drop' : key === 'wb_sunny'}
                            </span>
                          </div>
                          <div>
                            <p className="text-[7px] text-gray-500 uppercase font-black tracking-widest">
                              {key === 'temp' ? 'Nhiệt độ' : key === 'hum' ? 'Độ ẩm KK' : key === 'ph' ? 'Độ pH' : key === 'soil' ? 'Độ ẩm đất' : 'Ánh sáng'}
                            </p>
                            <p className="text-xs font-black dark:text-white leading-none mt-0.5">{val}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Tasks Section */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5 pl-1">
                      <span className="material-symbols-outlined !text-xs text-primary">assignment</span>
                      Nhiệm vụ gần đây
                    </h4>
                    <div className="flex flex-col gap-2">
                      {MOCK_RECENT_TASKS.map((task) => (
                        <div key={task.id} className="flex items-center justify-between bg-white/40 dark:bg-black/20 p-3 rounded-2xl border border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                               <span className="material-symbols-outlined !text-base">{task.icon}</span>
                            </div>
                            <div>
                              <p className="text-xs font-black dark:text-white leading-none">{task.title}</p>
                              <p className="text-[9px] text-gray-400 font-bold uppercase mt-1 tracking-widest">{task.time}</p>
                            </div>
                          </div>
                          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-lg ${task.status === 'Completed' ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/20 text-orange-500'}`}>
                            {task.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button onClick={(e) => { e.stopPropagation(); onNavigate('area-details'); }} className="flex-1 h-12 bg-slate-900 text-white dark:bg-white dark:text-black rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl">
                      <span className="material-symbols-outlined !text-base">analytics</span>
                      Báo cáo Chi tiết
                    </button>
                    <button onClick={(e) => handleDelete(area.id, e)} className="size-12 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl flex items-center justify-center active:scale-95 transition-all">
                      <span className="material-symbols-outlined !text-xl">delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* MAP VIEW - Enhanced Mock Map */
        <div className="p-4 animate-fadeIn">
          <div className="relative w-full aspect-[3/4] bg-slate-100 dark:bg-black/40 rounded-[3rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-inner group">
             {/* Map Grid/Satellite Texture */}
             <div className="absolute inset-0 map-satellite opacity-50 dark:opacity-20 pointer-events-none"></div>
             
             {/* Coordinate Grid Overlay */}
             <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#13ec49 1px, transparent 1px), linear-gradient(90deg, #13ec49 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

             {/* Map Pins */}
             {filteredAreas.map((area) => (
                <div 
                  key={area.id}
                  onClick={() => setSelectedMapArea(area)}
                  className="absolute cursor-pointer transition-all duration-500 z-10"
                  style={{ left: `${area.mapPos?.x}%`, top: `${area.mapPos?.y}%` }}
                >
                  <div className="flex flex-col items-center group/pin">
                    {/* Pin Label */}
                    <div className={`mb-2 px-2 py-1 rounded-lg bg-white dark:bg-surface-dark border shadow-lg whitespace-nowrap transition-all group-hover/pin:scale-110 ${selectedMapArea?.id === area.id ? 'border-primary opacity-100' : 'border-gray-100 dark:border-gray-800 opacity-0 group-hover/pin:opacity-100'}`}>
                      <p className="text-[8px] font-black uppercase tracking-tight dark:text-white leading-none">{area.name}</p>
                    </div>
                    {/* Main Pin */}
                    <div className="relative">
                      <div className={`size-10 rounded-full border-[3px] border-white dark:border-surface-dark shadow-xl flex items-center justify-center transition-all ${
                        area.state === 'critical' ? 'bg-red-500 shadow-red-500/30' :
                        area.state === 'warning' ? 'bg-yellow-500 shadow-yellow-500/30' : 'bg-primary shadow-primary/30'
                      } ${selectedMapArea?.id === area.id ? 'scale-125 ring-4 ring-primary/20' : 'group-hover/pin:scale-110'}`}>
                        <span className="material-symbols-outlined !text-base text-white material-symbols-filled">{area.typeIcon}</span>
                      </div>
                      {/* Pulse effect for alerts */}
                      {(area.state === 'critical' || area.state === 'warning') && (
                        <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${area.state === 'critical' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                      )}
                    </div>
                  </div>
                </div>
             ))}

             {/* HUD Controls for Map */}
             <div className="absolute top-6 left-6 flex flex-col gap-2">
                <div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-100 dark:border-gray-800 flex items-center gap-2 shadow-lg">
                   <div className="size-2 rounded-full bg-primary animate-pulse"></div>
                   <span className="text-[9px] font-black uppercase tracking-widest">Satelite Sync: OK</span>
                </div>
             </div>

             <div className="absolute top-6 right-6 flex flex-col gap-2">
                <button className="size-10 rounded-xl bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 shadow-lg active:scale-90">
                   <span className="material-symbols-outlined">layers</span>
                </button>
                <button className="size-10 rounded-xl bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 shadow-lg active:scale-90">
                   <span className="material-symbols-outlined">my_location</span>
                </button>
             </div>

             {/* Bottom Selection Popup */}
             {selectedMapArea && (
                <div className="absolute bottom-6 left-6 right-6 animate-[slideUp_0.4s_ease-out] z-20">
                  <div 
                    onClick={() => { setExpandedAreaId(selectedMapArea.id); setViewMode('list'); }}
                    className="bg-white dark:bg-surface-dark rounded-[2rem] p-4 border border-primary/20 shadow-2xl flex gap-4 items-center cursor-pointer active:scale-[0.98] transition-all"
                  >
                    <div className="size-16 rounded-2xl bg-cover bg-center border border-gray-100 dark:border-gray-700 shrink-0" style={{ backgroundImage: `url("${selectedMapArea.img}")` }}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black uppercase tracking-tight truncate pr-4">{selectedMapArea.name}</h4>
                        <span className={`size-2 rounded-full ${selectedMapArea.state === 'critical' ? 'bg-red-500' : 'bg-primary'}`}></span>
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{selectedMapArea.crop} • {selectedMapArea.health}</p>
                      <div className="flex gap-4 mt-2">
                         <div className="flex items-center gap-1">
                           <span className="material-symbols-outlined !text-[14px] text-primary">thermostat</span>
                           <span className="text-[10px] font-black">{selectedMapArea.sensors.temp}</span>
                         </div>
                         <div className="flex items-center gap-1">
                           <span className="material-symbols-outlined !text-[14px] text-blue-500">water_drop</span>
                           <span className="text-[10px] font-black">{selectedMapArea.sensors.soil || selectedMapArea.sensors.hum}</span>
                         </div>
                      </div>
                    </div>
                    <button className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                       <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                </div>
             )}
          </div>
          <div className="mt-4 px-2 text-center">
             <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">Sử dụng tọa độ GPS thực địa • Độ lệch &lt; 1m</p>
          </div>
        </div>
      )}

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-md bg-white dark:bg-surface-dark rounded-[2.5rem] shadow-2xl overflow-hidden animate-[slideUp_0.3s_ease-out]">
            <header className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-black/20">
              <h2 className="font-black text-base uppercase tracking-tight">
                {editingArea?.id ? 'Chỉnh sửa khu vực' : 'Thêm khu vực mới'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="size-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Tên khu vực</label>
                <input 
                  type="text" 
                  value={editingArea?.name} 
                  onChange={e => setEditingArea({...editingArea, name: e.target.value})}
                  placeholder="VD: Nhà kính số 1" 
                  className="w-full h-12 bg-gray-50 dark:bg-background-dark border border-gray-100 dark:border-gray-800 rounded-2xl px-4 text-sm font-bold focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Loại cây / Vật nuôi</label>
                <input 
                  type="text" 
                  value={editingArea?.crop} 
                  onChange={e => setEditingArea({...editingArea, crop: e.target.value})}
                  placeholder="VD: Cà chua Cherry" 
                  className="w-full h-12 bg-gray-50 dark:bg-background-dark border border-gray-100 dark:border-gray-800 rounded-2xl px-4 text-sm font-bold focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Diện tích</label>
                  <input 
                    type="text" 
                    value={editingArea?.size} 
                    onChange={e => setEditingArea({...editingArea, size: e.target.value})}
                    placeholder="VD: 500 m2" 
                    className="w-full h-12 bg-gray-50 dark:bg-background-dark border border-gray-100 dark:border-gray-800 rounded-2xl px-4 text-sm font-bold focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Biểu tượng</label>
                  <select 
                    value={editingArea?.typeIcon} 
                    onChange={e => setEditingArea({...editingArea, typeIcon: e.target.value})}
                    className="w-full h-12 bg-gray-50 dark:bg-background-dark border border-gray-100 dark:border-gray-800 rounded-2xl px-4 text-sm font-bold focus:ring-1 focus:ring-primary outline-none appearance-none"
                  >
                    <option value="potted_plant">🌿 Cây cảnh/Rau</option>
                    <option value="park">🌳 Cây ăn quả</option>
                    <option value="pets">🐷 Chăn nuôi</option>
                    <option value="water_drop">💧 Thủy sản</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Link ảnh minh họa</label>
                <input 
                  type="text" 
                  value={editingArea?.img} 
                  onChange={e => setEditingArea({...editingArea, img: e.target.value})}
                  placeholder="URL hình ảnh" 
                  className="w-full h-12 bg-gray-50 dark:bg-background-dark border border-gray-100 dark:border-gray-800 rounded-2xl px-4 text-sm font-bold focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>
            <footer className="p-6 bg-gray-50 dark:bg-black/20 border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={handleSaveArea}
                className="w-full h-14 bg-primary text-black rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all"
              >
                Lưu khu vực
              </button>
            </footer>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .map-satellite {
          background-color: transparent;
          background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuFlkYuzlW4cXBh_HHtm8YnGcGUeATg_PO9PVrKv-XbDhz_J2lJkN0gqziEaukgJTfTdIPpxrlyANwRi_QzqI21nH9qG3DmIRQySeHWYmLbNbif_kMqIpMx5EtsY4K8qHf6eFBbB1MUtAaqpgoMmJEjxvhXfbc4EKg0ZoFy8kCs938rRr-chXJHmoJMUnHkxOvfaemREmMTelbe8eQCEPf8AFG_w97-FDgTON_Cl3_LKAqt9vHn8MrOn2WJkNl7TaWQd20jxsEGeT0O");
          background-size: cover;
          background-position: center;
        }
      `}</style>
    </div>
  );
};

export default Areas;
