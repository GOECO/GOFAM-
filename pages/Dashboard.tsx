
import React, { useState, useEffect } from 'react';
import { Page, SensorData } from '../types';

interface Props { onNavigate: (page: Page) => void; }

interface DiscoveryItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
  longDesc: string;
  requirement: string;
}

const DISCOVERY_ITEMS: DiscoveryItem[] = [
  {
    id: 'ai-farm',
    title: 'AI Farm',
    desc: 'Trí tuệ nhân tạo tối ưu năng suất',
    icon: 'psychology',
    color: 'text-purple-500',
    longDesc: 'Hệ thống AI Farm tự động phân tích dữ liệu từ hàng ngàn cảm biến để đưa ra quyết định tưới tiêu và bón phân chính xác đến từng ml, giúp tăng 30% sản lượng.',
    requirement: 'Yêu cầu: Cấp độ Farm 15 & Gói Pro'
  },
  {
    id: 'blockchain-scan',
    title: 'Quét Blockchain',
    desc: 'Truy xuất nguồn gốc minh bạch',
    icon: 'qr_code_scanner',
    color: 'text-blue-500',
    longDesc: 'Mỗi sản phẩm từ trang trại của bạn sẽ được gắn một ID duy nhất trên chuỗi khối (Blockchain), cho phép người tiêu dùng truy xuất toàn bộ nhật ký canh tác.',
    requirement: 'Yêu cầu: Chứng nhận VietGAP/GlobalGAP'
  },
  {
    id: 'token-wallet',
    title: 'Ví Token',
    desc: 'Quản lý tài sản số nông nghiệp',
    icon: 'account_balance_wallet',
    color: 'text-yellow-500',
    longDesc: 'Tích hợp ví Web3 để nhận thưởng GFM Token sau mỗi vụ mùa thành công. Bạn có thể dùng Token để mua vật tư cao cấp hoặc rút về ví cá nhân.',
    requirement: 'Yêu cầu: Xác thực danh tính (KYC) cấp 2'
  },
  {
    id: 'invest-adoption',
    title: 'Đầu tư - Nhận nuôi',
    desc: 'Kết nối nhà đầu tư và trang trại',
    icon: 'handshake',
    color: 'text-primary',
    longDesc: 'Mô hình đầu tư cộng đồng cho phép người dùng từ xa sở hữu và theo dõi quá trình sinh trưởng của một cây trồng hoặc vật nuôi cụ thể thông qua camera 24/7.',
    requirement: 'Yêu cầu: Tài khoản Nhà đầu tư uy tín'
  }
];

const Dashboard: React.FC<Props> = ({ onNavigate }) => {
  const [sensors, setSensors] = useState<SensorData>({
    temp: 28,
    humidity: 65,
    soilMoisture: 65,
    ph: 6.5,
    lux: 12000
  });

  const [selectedDiscovery, setSelectedDiscovery] = useState<DiscoveryItem | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => ({
        ...prev,
        temp: +(prev.temp + (Math.random() - 0.5) * 0.2).toFixed(1),
        humidity: +(prev.humidity + (Math.random() - 0.5) * 0.5).toFixed(0),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const zones = [
    { 
      id: '1', 
      name: 'Vườn Ổi', 
      desc: '120 Cây • Đang ra hoa', 
      status: 'good', 
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLXArEVl7PI8hLTtcO-S6z0KfGYQ4ZUBIYe4wrybFRthoyAIhUjaTkNe6Q9Q5HlVNcmYIv1mgdEdrKv5ZIng4_bX_rjiplTB8dXjOM7dEXbC5jjKSNaJuDPY_ZYeRD2zihzgZyJKr3vHCCori-3vSGEFzG6rMnPIAk1dpF4oayzKivWPIS9Xf0P8PGAXRMrS3Y8RAfOg331Yg1h9RyJBII7aq3IbQtZU9CUVE15PQwGdfQEwZ5OSAddPyYniVjfmZ7RsjG8vTXxCon' 
    },
    { 
      id: '2', 
      name: 'Chuồng Gà', 
      desc: '500 Con • Ăn dặm', 
      status: 'warning', 
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs46jIDn1rWA8LmwCK-jBz375KK7yyGPdQ5eC7aF5KiHgKm6p8nBKh-m4_-yAsDRRMlEAAFtqLRFQNgbNzaHaiwxnStPLeKz7W6LWbV9lUTKd1DA5zybf2LMaX9jckJYNZSNkjet13PWbLvpwHmHihcAApwwvDdYiQ2giVtPOOgL9ZAbSiOQPnvwqxYk3RcgSWIR-2YBOpzFAHjblNtIcb5dIfsUABhniuVpJMmD3GP1BTqsCiGJdQ1BzZMc18vqAfTQkDUTXlCJ9q' 
    },
    { 
      id: '3', 
      name: 'Ao Cá', 
      desc: '2 Ao • Đang lớn', 
      status: 'good', 
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2JQUr7IwZBsA5zaH_Dlnaf2HjKR7WJVStzXg9-U__iIed1RWisIfLVndMLGFJThNfsAf-ydRVh6Gwju2PdjSLnfn9NAeiu4jTUvBgPJsytsvHRjQHo5rU7BfhjcKM8iK3XUh-PjHQu0YTLMbBTFPTVPzHVcZhL9ESqQ3AohjwnDL0uNhM1HU6n0XPQ4fYofEUMe_Qui1Z9fS6H0c2pyzvES6ir13VLHZ8oWQPek-Gz5PsBc8vghSiWXUaSWNgCPKcxGwy6i2P8swC' 
    }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-[#111714] pb-24 transition-colors duration-300">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md pt-safe-top">
        <div className="flex items-center px-5 py-4 justify-between gap-4">
          <div className="flex flex-1 flex-col justify-center">
            <span className="text-[10px] font-black text-primary tracking-[0.2em] uppercase mb-0.5">GOFAM</span>
            <div className="flex items-center gap-1 cursor-pointer group active:scale-95 transition-transform">
              <h1 className="text-2xl font-bold leading-none text-[#111714] dark:text-white truncate">Nông trại Ba Vì</h1>
              <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">expand_more</span>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('notifications')}
            className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[#111714] dark:text-white" style={{ fontSize: '28px' }}>notifications</span>
            <span className="absolute top-3 right-3 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-surface-dark"></span>
          </button>
        </div>
      </header>

      <main className="flex flex-col gap-6 px-5 pt-2">
        {/* Urgent Alert Banner - COMPACT VERSION */}
        <section 
          onClick={() => onNavigate('area-details')}
          className="w-full rounded-[1.5rem] bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-500/20 p-3.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer group overflow-hidden relative"
        >
          <div className="flex items-center gap-3 relative z-10">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>warning</span>
            </div>
            <div className="flex flex-col gap-0.5 flex-1">
              <h3 className="text-sm font-black text-orange-900 dark:text-orange-200 leading-tight uppercase tracking-tight">Cảnh báo: Độ ẩm thấp</h3>
              <p className="text-[11px] font-bold text-orange-800/80 dark:text-orange-300/80 leading-none">Vườn 1 thiếu nước nghiêm trọng.</p>
            </div>
            <button className="flex items-center justify-center gap-1.5 rounded-lg bg-orange-500 px-3 py-1.5 text-white font-black text-[10px] uppercase tracking-widest shadow-sm hover:bg-orange-600 active:scale-95 transition-all">
              Tưới ngay
            </button>
          </div>
        </section>

        {/* Dự báo thời tiết Section - COMPACT 50% HEIGHT & 60% OPACITY */}
        <section 
          onClick={() => onNavigate('weather')}
          className="w-full rounded-[2rem] bg-gradient-to-br from-blue-500 to-blue-700 p-5 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all opacity-60 h-32"
        >
          <div className="absolute top-0 right-0 -mr-6 -mt-6 opacity-20 transform group-hover:scale-110 transition-transform duration-700">
             <span className="material-symbols-outlined !text-[100px] material-symbols-filled">cloud</span>
          </div>
          
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                   <h3 className="text-base font-black uppercase tracking-tight">Dự báo thời tiết</h3>
                   <span className="bg-white/20 backdrop-blur-md px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-widest border border-white/10">AI</span>
                </div>
                <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest opacity-80">Ba Vì • Nắng nhẹ</p>
              </div>
              <span className="material-symbols-outlined text-3xl material-symbols-filled text-yellow-300">wb_sunny</span>
            </div>

            <div className="flex items-end justify-between">
              <div className="flex items-end gap-3">
                <h2 className="text-4xl font-black tracking-tighter leading-none">{sensors.temp}°</h2>
                <div className="flex flex-col gap-0.5 pb-0.5">
                  <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-blue-100">
                    <span className="material-symbols-outlined !text-[10px]">arrow_upward</span> 31°
                  </div>
                  <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-blue-200 opacity-60">
                    <span className="material-symbols-outlined !text-[10px]">arrow_downward</span> 22°
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-[0.2em] text-blue-100/60 group-hover:text-blue-100 transition-colors">
                Xem chi tiết
                <span className="material-symbols-outlined !text-sm">arrow_forward_ios</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hệ sinh thái Nông nghiệp Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#111714] dark:text-white">Quản trị & Giải trí</h2>
            <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-md">Mới</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onNavigate('attendance')}
              className="flex items-center gap-4 rounded-3xl bg-blue-600 p-4 shadow-xl active:scale-[0.97] transition-all group overflow-hidden relative"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined !text-2xl font-bold">fact_check</span>
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-black text-white uppercase tracking-tight">Chấm công</span>
                <span className="text-[9px] font-bold text-white/70 uppercase">Nhân sự Pro</span>
              </div>
            </button>
            <button 
              onClick={() => onNavigate('virtual-farm')}
              className="flex items-center gap-4 rounded-3xl bg-primary p-4 shadow-xl active:scale-[0.97] transition-all group overflow-hidden relative"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-black/10 text-black backdrop-blur-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined !text-2xl font-bold">videogame_asset</span>
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-black text-[#0a3f21] uppercase tracking-tight">Game Farm</span>
                <span className="text-[9px] font-bold text-[#0a3f21]/70 uppercase">Trại ảo IoT</span>
              </div>
            </button>
          </div>
        </section>

        {/* Khám phá GOFAM Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#111714] dark:text-white">Khám phá GOFAM</h2>
            <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined !text-sm font-bold">rocket_launch</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {DISCOVERY_ITEMS.map((item) => (
              <button 
                key={item.id}
                onClick={() => setSelectedDiscovery(item)}
                className="flex flex-col items-start gap-3 rounded-[2rem] bg-white dark:bg-surface-dark p-5 shadow-sm border border-gray-100 dark:border-gray-800 active:scale-[0.97] transition-all text-left hover:border-primary/40 group overflow-hidden relative"
              >
                <div className={`size-11 rounded-2xl bg-gray-50 dark:bg-black/20 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined !text-2xl font-bold">{item.icon}</span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#111714] dark:text-white uppercase tracking-tight">{item.title}</h4>
                  <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest leading-tight">{item.desc}</p>
                </div>
                <div className="absolute -right-4 -bottom-4 size-16 bg-gray-50 dark:bg-black/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            ))}
          </div>
        </section>

        {/* Key Metrics */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-[#111714] dark:text-white">Chỉ số quan trọng</h2>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-widest text-[10px]">Cập nhật 5p trước</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Temperature Card */}
            <div className="flex flex-col gap-3 rounded-[2rem] bg-white dark:bg-surface-dark p-5 shadow-sm border border-gray-100 dark:border-gray-800 active:scale-95 transition-transform">
              <div className="flex items-center gap-2 text-gray-500">
                <span className="material-symbols-outlined text-orange-500">thermostat</span>
                <span className="text-sm font-bold">Nhiệt độ</span>
              </div>
              <p className="text-4xl font-bold text-[#111714] dark:text-white tracking-tighter">{sensors.temp}°C</p>
              <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/30 self-start px-2 py-1 rounded-lg uppercase tracking-widest">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>trending_up</span>
                Ổn định
              </div>
            </div>
            {/* Humidity Card */}
            <div className="flex flex-col gap-3 rounded-[2rem] bg-white dark:bg-surface-dark p-5 shadow-sm border border-gray-100 dark:border-gray-800 active:scale-95 transition-transform">
              <div className="flex items-center gap-2 text-gray-500">
                <span className="material-symbols-outlined text-blue-500">humidity_percentage</span>
                <span className="text-sm font-bold">Độ ẩm đất</span>
              </div>
              <p className="text-4xl font-bold text-[#111714] dark:text-white tracking-tighter">{sensors.humidity}%</p>
              <div className="flex items-center gap-1 text-xs font-bold text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30 self-start px-2 py-1 rounded-lg uppercase tracking-widest">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_downward</span>
                Hơi thấp
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-bold text-[#111714] dark:text-white mb-3">Thao tác nhanh</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onNavigate('scan')}
              className="col-span-2 flex items-center gap-4 rounded-[2rem] bg-primary p-5 shadow-md active:scale-[0.98] transition-all hover:bg-primary-dark group"
            >
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/25 text-[#0a3f21] backdrop-blur-sm">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform" style={{ fontSize: '32px' }}>center_focus_weak</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl font-bold text-[#0a3f21] uppercase tracking-tight">Quét sâu bệnh AI</span>
                <span className="text-sm font-medium text-[#0a3f21]/80">Chụp ảnh để chẩn đoán ngay</span>
              </div>
            </button>
            <button 
              onClick={() => onNavigate('messages')}
              className="flex flex-col items-center justify-center gap-3 rounded-[2rem] bg-blue-600 p-6 shadow-xl active:scale-95 transition-all h-40 group border border-blue-400/20"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-white/20 text-white group-hover:scale-110 transition-transform backdrop-blur-md">
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>chat_bubble</span>
              </div>
              <span className="text-base font-black text-white uppercase tracking-widest text-center">Chat Kỹ Thuật</span>
            </button>
            <button 
              onClick={() => onNavigate('add-task')}
              className="flex flex-col items-center justify-center gap-3 rounded-[2rem] bg-white dark:bg-surface-dark p-6 shadow-sm border border-gray-100 dark:border-gray-800 active:scale-95 transition-all h-40 group"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>add_task</span>
              </div>
              <span className="text-base font-bold text-[#111714] dark:text-white text-center">Tạo nhiệm vụ</span>
            </button>
          </div>
        </section>

        {/* Zones List */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-[#111714] dark:text-white">Khu vực sản xuất</h2>
            <button onClick={() => onNavigate('areas')} className="text-sm font-bold text-primary hover:underline">Xem tất cả</button>
          </div>
          <div className="flex flex-col gap-3">
            {zones.map(zone => (
              <div 
                key={zone.id}
                onClick={() => onNavigate('area-details')}
                className="flex items-center justify-between rounded-[2rem] bg-white dark:bg-surface-dark p-4 shadow-sm border border-gray-100 dark:border-gray-800 active:scale-[0.99] transition-all cursor-pointer hover:border-primary/40"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="h-16 w-16 shrink-0 rounded-2xl bg-gray-200 bg-cover bg-center border border-gray-100 dark:border-gray-700" 
                    style={{ backgroundImage: `url('${zone.img}')` }}
                  ></div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-[#111714] dark:text-white">{zone.name}</h3>
                    <p className="text-sm text-gray-500 font-medium">{zone.desc}</p>
                  </div>
                </div>
                <div className={`flex items-center justify-center size-9 rounded-full ${zone.status === 'good' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                  <span className="material-symbols-outlined !text-[20px] material-symbols-filled">
                    {zone.status === 'good' ? 'check_circle' : 'warning'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Discovery Detail Modal */}
      {selectedDiscovery && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-md bg-white dark:bg-surface-dark rounded-[2.5rem] shadow-2xl overflow-hidden animate-[slideUp_0.3s_ease-out]">
            <header className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`size-10 rounded-2xl bg-gray-50 dark:bg-black/20 flex items-center justify-center ${selectedDiscovery.color}`}>
                  <span className="material-symbols-outlined !text-xl font-black">{selectedDiscovery.icon}</span>
                </div>
                <h3 className="text-base font-black dark:text-white uppercase tracking-tight">Khám phá: {selectedDiscovery.title}</h3>
              </div>
              <button onClick={() => setSelectedDiscovery(null)} className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Giới thiệu tính năng</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                  {selectedDiscovery.longDesc}
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl p-5 flex items-start gap-4">
                <div className="size-10 rounded-xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-500">
                  <span className="material-symbols-outlined !text-xl">lock</span>
                </div>
                <div>
                  <h5 className="text-xs font-black text-red-700 dark:text-red-400 uppercase tracking-widest mb-1">Chưa đủ điều kiện</h5>
                  <p className="text-[11px] font-bold text-red-600/70 dark:text-red-300/70 leading-relaxed">
                    {selectedDiscovery.requirement}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => {
                  alert("Tính năng đang được chuẩn bị!");
                  setSelectedDiscovery(null);
                }}
                className="w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-sm uppercase tracking-widest active:scale-95 transition-all shadow-xl"
              >
                Yêu cầu mở khóa
              </button>
            </div>
            <div className="h-4"></div>
          </div>
        </div>
      )}

      {/* Persistent AI Chat Button */}
      <div className="fixed bottom-24 right-6 z-[60]">
        <button 
          onClick={() => onNavigate('ai-chat')}
          className="size-16 rounded-full bg-primary text-black shadow-glow flex items-center justify-center active:scale-90 transition-all border-4 border-white dark:border-background-dark animate-bounce-slow"
        >
          <span className="material-symbols-outlined text-3xl font-black">smart_toy</span>
        </button>
      </div>

      {/* Modern Navigation Bottom */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-[60] bg-white/95 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 px-6 h-20 pb-6 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-colors">
        <button className="flex flex-col items-center gap-1.5 text-primary scale-110 relative">
          <span className="material-symbols-outlined material-symbols-filled !text-[28px]">grid_view</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Tổng quan</span>
          <div className="absolute -top-1 -right-1 size-1.5 bg-primary rounded-full shadow-glow"></div>
        </button>
        <button onClick={() => onNavigate('tasks')} className="flex flex-col items-center gap-1.5 text-slate-400 group active:scale-95 transition-transform">
          <span className="material-symbols-outlined !text-[26px] group-hover:scale-110 transition-transform">calendar_month</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Lịch vụ</span>
        </button>
        <button onClick={() => onNavigate('messages')} className="flex flex-col items-center gap-1.5 text-slate-400 group active:scale-95 transition-transform relative">
          <span className="material-symbols-outlined !text-[26px] group-hover:scale-110 transition-transform">chat_bubble</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Tin nhắn</span>
          <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border border-white dark:border-surface-dark"></span>
        </button>
        <button onClick={() => onNavigate('reports')} className="flex flex-col items-center gap-1.5 text-slate-400 group active:scale-95 transition-transform">
          <span className="material-symbols-outlined !text-[26px] group-hover:scale-110 transition-transform">bar_chart</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Báo cáo</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1.5 text-slate-400 group active:scale-95 transition-transform">
          <span className="material-symbols-outlined !text-[26px] group-hover:scale-110 transition-transform">person</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Cá nhân</span>
        </button>
      </nav>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default Dashboard;
