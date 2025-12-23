
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-between items-center bg-background-light dark:bg-background-dark relative overflow-hidden p-6">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50"></div>
      
      {/* Top Branding */}
      <div className="z-10 mt-12 flex flex-col items-center">
        <div className="px-3 py-1 rounded-full bg-gray-200 dark:bg-white/5 border border-gray-300 dark:border-white/10 mb-2">
          <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">Khởi tạo hệ thống</span>
        </div>
        <h1 className="text-3xl font-bold text-text-main-light dark:text-white tracking-tighter">GOFAM <span className="text-primary">PRO</span></h1>
      </div>

      {/* Main Visual Mockup */}
      <div className="relative z-10 w-full max-w-[280px] aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border-[4px] border-white dark:border-gray-800 bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 scale-90">
        <div className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-90" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDizaS0wKE40w5KOd9VzUwc2xjR86J9IVGybwrwkROFPUo4mynbfYxgqFBmIVBSKz8sC4IQDLHR0vQcOoaoedUXLteVKErSj1FiN3GIIvCCZCkD2pVnaeGxKDU4qEZv25-SXjsBz9oMGWpidP6me6U43bmP0MLVhjQusqTPcjoT4AUyf0Z0D05qvDaKkLTREEooaXJOR2Z-FHfTTQy0_1zVvCTfqU84vaHwNsIln6TVIXsIM8p4mj-WzWlK4l23eN10QEMGD8TCtIbA")' }}></div>
        
        {/* HUD Elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 z-10"></div>
        <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-primary shadow-[0_0_10px_#13ec49] z-20 scanner-line"></div>
        
        <div className="absolute top-4 left-4 right-4 flex justify-between z-20">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-primary font-bold tracking-wider">AI_SCAN: LOADING...</span>
            <span className="text-[6px] font-mono text-white/50">VERSION: 2.5.0</span>
          </div>
          <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
            <span className="text-[8px] font-mono text-white font-bold uppercase">Ready</span>
          </div>
        </div>
      </div>

      {/* Bottom Loading Status */}
      <div className="w-full z-10 space-y-6 mb-12">
        <div className="flex flex-col items-center gap-2">
           <h2 className="text-xl font-bold dark:text-white">Precision Agriculture</h2>
           <p className="text-sm text-gray-500 dark:text-gray-400">Đang chuẩn bị dữ liệu trang trại...</p>
        </div>
        
        <div className="space-y-3">
          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-primary shadow-glow animate-[grow_3s_ease-out_forwards]"></div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span>Server: Cloud-Asia-1</span>
            <span>98.5% Accuracy Guaranteed</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes grow { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </div>
  );
};

export default SplashScreen;
