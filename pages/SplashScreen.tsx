
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-background-light dark:bg-background-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
      
      <div className="z-10 flex flex-col items-center gap-6 animate-pulse">
        <div className="relative w-28 h-28 bg-white dark:bg-surface-dark shadow-2xl rounded-3xl flex items-center justify-center border border-gray-100 dark:border-gray-800">
           <span className="material-symbols-outlined text-primary !text-[4.5rem]">spa</span>
           <div className="absolute -top-2 -right-3 bg-gradient-to-r from-primary to-primary-dark text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg tracking-wider border border-white dark:border-background-dark uppercase">
              Pro
           </div>
        </div>
        <div className="text-center">
          <h1 className="text-text-main-light dark:text-white text-4xl font-bold tracking-tight">GOFAM</h1>
          <p className="text-text-sub-light dark:text-gray-400 text-sm mt-2">Quản trị Nông trại Thông minh</p>
        </div>
      </div>

      <div className="absolute bottom-12 w-full px-12 space-y-4">
        <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-[grow_2.5s_ease-out_forwards]"></div>
        </div>
        <p className="text-[10px] text-center text-text-sub-light dark:text-gray-500 uppercase tracking-widest font-medium">Đang tải dữ liệu...</p>
      </div>
      
      <style>{`
        @keyframes grow { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </div>
  );
};

export default SplashScreen;
