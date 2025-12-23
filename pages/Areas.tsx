
import React from 'react';

interface Props { onBack: () => void; }

const Areas: React.FC<Props> = ({ onBack }) => {
  const areas = [
    { 
      name: 'Vườn Rau Thủy Canh', 
      crop: 'Rau xà lách', 
      area: '150 m²', 
      status: '98% Tốt', 
      state: 'active', 
      typeIcon: 'eco',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5fmRypcuzJ07d9r9HNQGNpN3nA1ix9295k_Ydauu7vtxaLEj4A7IGPAqx9zX-lQBho3pmiOrloy5UFZ3zbMODzyPcn3f2dQYwOqgNCRO18YQIwzLj_dtvNOI6CPHzlVdpq7cYmrgWTClrGLa7cxMdELTYVn6kryutc9Vluc-uNzuReEVjoJzwppqH7zjJzuZ9yZgP-36YbimZgafxgf6mZP2yVJua0-l0ok4JFTbxBTUQ15YZXm9JrVyN0_0cWke58YIWFlGBP0Ax' 
    },
    { 
      name: 'Chuồng Heo Số 2', 
      crop: 'Heo thịt', 
      area: '80 m²', 
      status: '75% Khá', 
      state: 'warning', 
      typeIcon: 'agriculture',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZaMNvoKzwEcybarEp4oDKa2NMMbHdDUn9_CnU6F5xEmwNhLCMLITHGDwlxFX0YttTbX9Khoa9dqkT6Rof5H7Ucn2na2DNsMAbLd0yzcRLKhITb_W4XTwZ1jT-KC1_YFAqCwK6kffq3h4bMw_ecjYQ3n0t8xO8fzwlY9Dh2HoiZesuy6Lx5iPbqpD932jm97Gcg5MQwermjsYD3Aw7ehadIgpvqxIjLlg66BXEFHFNJzYbJa_BCl34Lmw06wrf7GlH0_hVtFef6BOJ' 
    },
    { 
      name: 'Vườn Xoài Cát', 
      crop: 'Cây ăn quả', 
      area: '2.000 m²', 
      status: 'Sắp thu hoạch', 
      state: 'info', 
      typeIcon: 'park',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC65dQ_vTeL2axAsePQnA2kLeFgMuK2pZNegOEqZhEdOrrVKvFtyoJdhIuLTMxxqNgfEXLF-g2C79lIWMEi3sMlVBilFLsMXwWL4lTzqNxB42ONYzQT1Tp3CR2lZk5_xwY-oC9N2_9tzzndxTfRQj1jY6uL5--q9X8rIzntvszXij67S7NT-7SSFqFWwRWXtsEq52UmdGr4IN16-DNLmgejkyGh5By-L2o1_tuK6kPiVj3Z5EsBt8XoY7B--NcslCpSw3cLmXh38jr4' 
    },
    { 
      name: 'Ao Cá Rô Phi', 
      crop: 'Thủy sản', 
      area: '500 m²', 
      status: '92% Tốt', 
      state: 'active', 
      typeIcon: 'water',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZH5VpVWA4ACEDiuH4A7Hx-hFNuS3q8LWUOAZewcAGtRf7SKokzDYXdgPxCi3Ieo4v9guARvyaTJYXxKN9oe8xFuq7TlmSZUj2MOvJRsvpMghnTTj6kC6k9-TOCF2jyEEX1qEweBODLWyU_rOZbbwX7Fs-CWCcmFbl1LlVcZWazhh2aRKmh5WQMkRjkiiuUvcliZvckiW1pgmagHfdWD_HPqqRL42VUHs7jT8EXbgIjSGsWHWWwkj6NLxNJqmo2hv1VEelh6tkdxsq' 
    },
  ];

  const getStateStyles = (state: string) => {
    switch(state) {
      case 'active': return { color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30', border: 'bg-green-500' };
      case 'warning': return { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30', border: 'bg-red-500' };
      default: return { color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30', border: 'bg-orange-500' };
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-32">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-6 pb-2 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="text-center flex-1 pr-10">
             <h1 className="text-2xl font-bold dark:text-white">Khu vực</h1>
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Danh sách quản lý</p>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
           {['Tất cả', 'Vườn', 'Chuồng', 'Ao'].map((f, i) => (
             <button key={f} className={`shrink-0 px-6 h-10 rounded-2xl font-bold text-sm transition-all ${i === 0 ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 text-gray-500 hover:border-primary/50'}`}>{f}</button>
           ))}
        </div>
      </header>

      <main className="p-6 space-y-4">
        {areas.map((area, i) => {
          const styles = getStateStyles(area.state);
          return (
            <div key={i} className="relative bg-white dark:bg-surface-dark rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4 group active:scale-[0.98] transition-all cursor-pointer overflow-hidden">
              {/* Vertical Status Indicator */}
              <div className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-full ${styles.border}`}></div>
              
              <div className="flex-1 pl-2">
                 <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold leading-tight dark:text-white group-hover:text-primary transition-colors">{area.name}</h3>
                 </div>
                 <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">{area.crop} • {area.area}</p>
                 <div className="mt-3 flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${styles.bg} ${styles.color}`}>
                      {area.status}
                    </span>
                 </div>
              </div>

              <div className="flex items-center gap-4">
                 <div className={`size-12 rounded-2xl flex items-center justify-center shadow-inner ${styles.bg} ${styles.color}`}>
                    <span className="material-symbols-outlined text-3xl">{area.typeIcon}</span>
                 </div>
                 <div className="size-20 rounded-2xl bg-cover bg-center shadow-md border border-white dark:border-gray-800" style={{backgroundImage: `url("${area.img}")`}}></div>
              </div>
            </div>
          );
        })}
      </main>

      <div className="fixed bottom-24 left-0 right-0 max-w-md mx-auto px-6 z-40">
        <button className="w-full h-16 bg-primary hover:bg-primary-dark text-black rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-xl shadow-primary/30 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-2xl font-bold">add</span>
          Thêm khu mới
        </button>
      </div>
    </div>
  );
};

export default Areas;
