
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
    img: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=800&q=80',
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

const NearbySuppliers: React.FC<Props> = ({ onBack, onNavigate }) => {
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
    const shareData = {
      title: `Cảnh báo Farm: ${area.name}`,
      text: `[GOFAM PRO ALERT] CẢNH BÁO NGUY CẤP\n\n📍 Khu vực: ${area.name}\n🌱 Cây trồng/Vật nuôi: ${area.crop}\n📊 Sức khỏe: ${area.health}\n⚠️ Tình trạng: ${area.state === 'critical' ? 'NGUY CẤP' : 'Cần kiểm tra'}\n\nVui lòng xem chi tiết báo cáo tại hệ thống quản lý GOFAM ngay.`,
      url: window.location.origin,
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error("Native share failed", err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.text);
        alert('Đã sao chép nội dung cảnh báo vào bộ nhớ tạm.');
      } catch (clipErr) {
        alert(shareData.text);
      }
    }
  };

  const openAddModal = () => {
    setEditingArea({
      name: '', crop: '', size: '', state: 'active', typeIcon: 'potted_plant',
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
      case 'harvest':
        return 'bg-green-50 dark:bg-green-900/40 border-green-500 ring-1 ring-green-500/50 shadow-md scale-[1.02] hover:scale-[1.04] transition-all duration-300';
      default:
        return 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800 transition-all duration-300';
    }
  };

  const getStatusTextStyles = (state: AreaState) => {
    switch (state) {
      case 'critical': return 'text-red-600 dark:text-red-400 group-hover:text-red-700 transition-colors duration-300';
      case 'warning': return 'text-yellow-700 dark:text-yellow-300 group-hover:text-yellow-900 transition-colors duration-300';
      case 'active':
      case 'harvest': return 'text-green-700 dark:text-green-300 group-hover:text-green-900 transition-colors duration-300';
      default: return 'text-gray-900 dark:text-white';
    }
  };

  const getIconBgStyles = (state: AreaState) => {
    switch (state) {
      case 'critical': return 'bg-red-200/50 dark:bg-red-800/30 border-red-300 dark:border-red-700';
      case 'warning': return 'bg-yellow-200/50 dark:bg-yellow-800/30 border-yellow-300 dark:border-yellow-700';
      case 'active':
      case 'harvest': return 'bg-green-200/50 dark:bg-green-800/30 border-green-300 dark:border-green-700';
      default: return 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const getStatusLabel = (state: AreaState) => {
    switch (state) {
      case 'critical': return 'Nguy cấp';
      case 'warning': return 'Cần chú ý';
      case 'active': return 'Bình thường';
      case 'harvest': return 'Thu hoạch';
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
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-32 font-display transition-colors duration-300">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <button onClick={onBack} className="size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <div className="text-center flex-1">
          <h1 className="text-xl font-bold dark:text-white uppercase tracking-tight">Cơ sở dữ liệu Farm</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Live Management Pro</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')} className={`size-10 rounded-xl flex items-center justify-center transition-all ${viewMode === 'map' ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow-lg' : 'bg-gray-100 dark:bg-white/5 text-gray-500'}`}>
            <span className="material-symbols-outlined font-bold">{viewMode === 'list' ? 'map' : 'list'}</span>
          </button>
          <button onClick={openAddModal} className="size-10 rounded-xl bg-primary text-black flex items-center justify-center shadow-glow active:scale-90 transition-all">
            <span className="material-symbols-outlined font-bold">add</span>
          </button>
        </div>
      </header>

      <div className="px-4 py-2 bg-white dark:bg-surface-dark border-b border-gray-50 dark:border-gray-800/50 overflow-x-auto no-scrollbar flex items-center justify-between gap-4">
        <div className="flex gap-1.5 no-scrollbar overflow-x-auto">
          {['Tất cả', 'Trồng trọt', 'Chăn nuôi', 'Cảnh báo'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-primary text-black shadow-glow' : 'bg-gray-100 dark:bg-white/5 text-gray-500'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="p-4 space-y-3 animate-fadeIn">
          {filteredAreas.map((area) => (
            <div key={area.id} onClick={(e) => toggleExpand(area.id, e)} className={`rounded-[2.5rem] p-4 border transition-all cursor-pointer group relative ${getStatusStyles(area.state)}`}>
              <div className="flex gap-4">
                <div className="relative shrink-0">
                  <div className="size-16 rounded-[1.25rem] bg-cover bg-center border border-white/20 dark:border-white/10 shadow-md relative overflow-hidden group/img" style={{ backgroundImage: `url("${area.img}")` }}>
                     <button onClick={(e) => handleTriggerUpload(area.id, e)} className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[2px]">
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
                      <div className="flex items-center gap-2 transition-colors">
                        <span className={`text-base font-black truncate uppercase tracking-tight ${getStatusTextStyles(area.state)}`}>
                          {area.name}
                        </span>
                        {area.state === 'critical' && (
                          <button 
                            onClick={(e) => handleNativeShare(area, e)}
                            className="size-7 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-lg active:scale-90 transition-all hover:bg-red-700 pointer-events-auto ml-1"
                            title="Chia sẻ báo cáo khẩn cấp"
                          >
                            <span className="material-symbols-outlined !text-[16px] font-black">share</span>
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                         <p className={`text-[9px] font-black uppercase tracking-widest opacity-90 ${getStatusTextStyles(area.state)}`}>
                          {getStatusLabel(area.state)}
                        </p>
                        <span className="text-[9px] text-gray-300">•</span>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest opacity-70 truncate">#{area.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={(e) => openEditModal(area, e)} className="size-8 rounded-full bg-white/40 dark:bg-surface-dark/40 border border-white/20 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-primary transition-all flex items-center justify-center">
                        <span className="material-symbols-outlined !text-base">edit</span>
                      </button>
                      {area.state !== 'critical' && (
                        <button onClick={(e) => handleNativeShare(area, e)} className="size-8 rounded-full bg-white/40 dark:bg-surface-dark/40 border border-white/20 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-primary transition-all flex items-center justify-center">
                          <span className="material-symbols-outlined !text-base">share</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-1 opacity-80 uppercase tracking-tight">{area.crop} • {area.size}</p>
                </div>
              </div>

              {!expandedAreaId && (
                <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5 grid grid-cols-4 gap-1">
                  {Object.entries(area.sensors).map(([key, val]) => (
                    <div key={key} className="flex flex-col items-center">
                      <span className={`material-symbols-outlined !text-base transition-colors ${getStatusTextStyles(area.state)} opacity-70`}>{
                        key === 'temp' ? 'thermostat' : key === 'hum' ? 'humidity_mid' : key === 'ph' ? 'science' : key === 'soil' ? 'water_drop' : 'wb_sunny'
                      }</span>
                      <span className={`text-[9px] font-black mt-1 transition-colors ${getStatusTextStyles(area.state)}`}>{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {expandedAreaId === area.id && (
                <div className="mt-4 pt-4 border-t border-dashed border-black/10 dark:border-white/10 animate-[slideDown_0.3s_ease-out] space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="material-symbols-outlined !text-xs text-primary">eco</span>Tình trạng Sinh trưởng
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
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={(e) => { e.stopPropagation(); onNavigate('area-details'); }} className="flex-1 h-12 bg-slate-900 text-white dark:bg-white dark:text-black rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl">
                      <span className="material-symbols-outlined !text-base">analytics</span>Báo cáo Chi tiết
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
        <div className="p-4 animate-fadeIn">
          <div className="relative w-full aspect-[3/4] bg-slate-100 dark:bg-black/40 rounded-[3rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-inner group">
             <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#13ec49 1px, transparent 1px), linear-gradient(90deg, #13ec49 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
             {filteredAreas.map((area) => (
                <div key={area.id} onClick={() => setSelectedMapArea(area)} className="absolute cursor-pointer transition-all duration-500 z-10" style={{ left: `${area.mapPos?.x}%`, top: `${area.mapPos?.y}%` }}>
                  <div className={`size-10 rounded-full border-[3px] border-white dark:border-surface-dark shadow-xl flex items-center justify-center transition-all ${area.state === 'critical' ? 'bg-red-500 shadow-red-500/30' : area.state === 'warning' ? 'bg-yellow-500 shadow-yellow-500/30' : 'bg-primary shadow-primary/30'} ${selectedMapArea?.id === area.id ? 'scale-125 ring-4 ring-primary/20' : ''}`}>
                    <span className="material-symbols-outlined !text-base text-white material-symbols-filled">{area.typeIcon}</span>
                  </div>
                </div>
             ))}
          </div>
        </div>
      )}

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default NearbySuppliers;
