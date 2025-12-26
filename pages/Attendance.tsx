
import React from 'react';

interface Props { onBack: () => void; }

const STAFF = [
  { name: 'Nguyễn Văn An', role: 'Bảo vệ • Cổng chính', status: 'Vị trí không khớp', time: '07:05', alert: true, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXbl_kOXiT6MlBXYy89kI_696EbgmPiJ5dCELfmmZyD_5DzOIC33gr726g6NVHkbSnPi4_cjwCW6cSacgrv32Z2Df-uPL5HDySTcuaI_WrwniPtsgT9dRW_9iZd1nmlSi4RKuSUtn52JSb3ClBg1IiuR4JId62uKjsk_m6q14HeOELmrQ00ZESQK8czZ966vLAFPRu1MNLrtWQ4pjXeSPli4tQVHcYJbIblm6mRvXTgQEpEki-6uoTzIdiTqVnzTWik7TqX2PUP7qx' },
  { name: 'Trần Thị Bích', role: 'Kỹ thuật • Nhà màng', status: 'Thiếu ảnh xác nhận', time: '08:00', alert: true, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5-yOTMzsuSfq_3GSsiAXqaQ4cpqRFemJEM1-I8aX1cnxmi_h9ctZCc1F3dGrF4wwscU0xJMH9ASRiD7748R7Ier9UZzDlFiOnnjJmKqyeDGX47mKIWpXK8ZGYURQXsKiuY0uIgT-iRvFZNGgF2qjX6jCruBcVtBHeCxAtbyK_zeosFExdPFtdxQwOl9hcW6NW3F2qa0on45BC3n0bpzAehEH1NGnSBh_f7e5R83THa3vG6R7pA6wF1l2co_QPBJPnOsbabj313JQe' },
  { name: 'Hoàng Thị Lan', role: 'Giám sát • Khu B', status: 'Đúng giờ', time: '06:45', working: false, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_T-EfrvEpHJ775CcbK0n4ZIgGzs7mXkPrCrtEum3wUBFqtfaX_ndBVUhA8cjgRXdWJDqB8ph2URVXtNSmsW6T-KSt5Qv18ZoVM-z9HSI4wd6eKx8INuieDSEY_sB4oiOvvVj7tnk5gTHTygIxiuik9cNcOxBg8axTOzk8zLE1qJ-Tr2J4f5oq2-4B3MRTcw5_s01fBPA6fnF0P-hClMF2DMgahyl87PQW2ZuE7NAC6mW3DlAiFxvpvViWpJu-xJYHHmnOdrBmHQQ7' },
  { name: 'Phạm Minh Đạt', role: 'Kỹ thuật • Khu A', status: 'Đang làm', time: '07:30', working: true, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEiGUluBgCyj-Sud4WXhW1T5bHbWBzTHRnxKxlVyD2pCAIA8tup7kLdKX3PQYNJsD1qNciqQIsJPO9WhIlwevOGWnRO8OKR1NbcbOUvHjSRD3MwtPQFcAQ9YAHauH70B3j2RF2g0rK0qwogG-Xqp3PHgYqKQWEzuwijIX_Mhxbmt_hAApZSuXkmlNmzV998iCfraTjj-4ZX3Yp0lGxeNrkLmwMKQCS8i8Igc4FisyCNFcYICB_eN_BcrGi70aQwqEAGJ_TLZxYEho6' },
];

const Attendance: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display overflow-hidden selection:bg-primary selection:text-black transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center bg-white dark:bg-surface-dark px-4 py-3 justify-between border-b border-gray-100 dark:border-gray-800 shrink-0 z-20 shadow-sm transition-colors">
        <button onClick={onBack} className="text-text-main-light dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full active-scale transition-all hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="material-symbols-outlined font-black scale-[0.8]">arrow_back</span>
        </button>
        <h2 className="text-text-main-light dark:text-white text-lg font-black leading-tight tracking-tight flex-1 text-center uppercase tracking-[0.1em]">Chấm Công Nhân Viên</h2>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-text-main-light dark:text-white active-scale transition-all">
          <span className="material-symbols-outlined scale-[0.8]">more_vert</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Check-in Interactive Module */}
        <div className="px-4 py-4">
          <div className="relative overflow-hidden rounded-card bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-700 shadow-xl transition-colors">
            <div className="absolute inset-0 map-pattern opacity-40 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/95 dark:to-surface-dark/95 z-0"></div>
            
            <div className="relative z-10 p-5">
              <div className="flex items-center justify-between mb-5 px-1">
                <div className="flex items-center gap-2 bg-white/80 dark:bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-100 dark:border-gray-700">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inset-0 rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                  </span>
                  <span className="text-[10px] font-black text-slate-800 dark:text-white uppercase tracking-widest">Định vị: Khu vực A</span>
                </div>
                <button className="flex items-center gap-1.5 bg-slate-900 text-white dark:bg-white dark:text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg active-scale hover:scale-105 transition-all">
                  <span className="material-symbols-outlined !text-base scale-[0.8]">photo_camera</span>
                  Xác nhận
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center gap-1.5 bg-primary text-black p-5 rounded-3xl shadow-xl shadow-primary/20 transition-all active-scale hover:bg-primary-dark">
                  <span className="material-symbols-outlined !text-[32px] font-black scale-[0.8]">login</span>
                  <span className="font-black text-xs uppercase tracking-[0.1em]">Vào Ca</span>
                  <span className="text-[9px] font-mono opacity-60 font-bold tracking-tighter uppercase">07:05:22 AM</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1.5 bg-white dark:bg-black/20 border-2 border-gray-100 dark:border-gray-800 text-gray-400 p-5 rounded-3xl active-scale hover:border-red-500/20 transition-all">
                  <span className="material-symbols-outlined !text-[32px] scale-[0.8]">logout</span>
                  <span className="font-black text-xs uppercase tracking-[0.1em]">Tan Ca</span>
                  <span className="text-[9px] font-mono opacity-60 font-bold tracking-tighter uppercase">--:--:--</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* List Content */}
        <div className="px-4 pt-2 flex flex-col gap-4">
           <div className="flex items-center gap-3 px-1">
              <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></span>
              <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-[0.2em]">Cần đối soát (2)</span>
              <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></span>
           </div>

           {STAFF.map((person, i) => (
              <div key={i} className={`group flex flex-col gap-4 rounded-3xl p-5 border transition-all active:scale-[0.98] ${
                person.alert ? 'bg-orange-50/50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800 shadow-sm' : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800 shadow-sm'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`size-12 shrink-0 rounded-2xl overflow-hidden border-2 shadow-sm transition-transform group-hover:scale-105 ${person.alert ? 'border-orange-300 ring-2 ring-orange-500/20' : 'border-gray-100 dark:border-gray-700'}`}>
                      <img className="size-full object-cover" src={person.img} alt={person.name} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase truncate tracking-tight leading-none mb-1.5">{person.name}</h4>
                      <div className="flex items-center gap-1.5">
                        {person.alert && <span className="material-symbols-outlined text-orange-600 !text-sm scale-[0.8]">warning</span>}
                        <p className={`text-[10px] font-bold uppercase tracking-widest truncate ${person.alert ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400'}`}>
                          {person.role}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shrink-0 border ${
                    person.alert ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 border-orange-200' : 'bg-green-50 dark:bg-primary/10 text-primary-dark border-primary/20'
                  }`}>
                    {person.status}
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-black/5 dark:bg-black/20 p-3 rounded-2xl transition-colors">
                   <div className="flex-1 flex items-center gap-4">
                      <div className="flex flex-col shrink-0">
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Vào</span>
                        <span className="text-sm font-black dark:text-white font-mono">{person.time}</span>
                      </div>
                      <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-1000 ${person.alert ? 'bg-orange-500 w-[70%]' : person.working ? 'bg-blue-500 w-[40%] animate-pulse' : 'bg-primary w-full'}`}></div>
                      </div>
                      <div className="flex flex-col text-right shrink-0">
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Ra</span>
                        <span className="text-sm font-black dark:text-white font-mono opacity-40">--:--</span>
                      </div>
                   </div>
                   {person.alert && (
                     <button className="bg-orange-500 text-white text-[9px] font-black px-3 py-2 rounded-xl shadow-lg shadow-orange-500/30 active-scale uppercase tracking-widest transition-all hover:bg-orange-600">Duyệt</button>
                   )}
                </div>
              </div>
           ))}
        </div>
      </div>

      {/* FAB - Enhanced interactivity */}
      <button className="absolute bottom-6 right-6 flex size-14 items-center justify-center rounded-full bg-primary text-black shadow-xl shadow-primary/30 active:scale-90 transition-all z-40 border-4 border-white dark:border-surface-dark group">
        <span className="material-symbols-outlined text-[28px] font-black group-hover:rotate-90 transition-transform duration-300">add</span>
      </button>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Attendance;
