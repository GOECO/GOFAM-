
import React from 'react';
import { DiagnosisResult, Page } from '../types';

interface Props { 
  data: DiagnosisResult; 
  onBack: () => void; 
  onDone: () => void; 
  onFindNearby?: () => void;
  onNavigate?: (page: Page) => void;
}

const Diagnosis: React.FC<Props> = ({ data, onBack, onDone, onNavigate }) => {
  if (!data) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Báo cáo Chẩn đoán GOFAM: ${data.diseaseName}`,
        text: `Phát hiện ${data.diseaseName} với độ tin cậy ${data.confidence}%. Xem chi tiết tại GOFAM Pro.`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Đã sao chép liên kết báo cáo.");
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col max-w-md mx-auto overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-gray-100 transition-colors duration-200">
      {/* Top App Bar */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between">
        <button 
          onClick={onBack}
          className="text-text-main-light dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full active:bg-gray-200 dark:active:bg-gray-800 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-text-main-light dark:text-white text-xl font-bold leading-tight tracking-tight flex-1 text-center">Kết quả Chẩn đoán</h2>
        <button 
          onClick={handleShare}
          className="flex size-12 items-center justify-center rounded-full active:bg-gray-200 dark:active:bg-gray-800 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-text-main-light dark:text-white">share</span>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 flex flex-col px-4 gap-5 pb-12 overflow-y-auto no-scrollbar">
        {/* Header Image: Plant Photo */}
        <div className="w-full">
          <div 
            className="w-full aspect-[4/3] bg-center bg-no-repeat bg-cover rounded-[2rem] shadow-sm overflow-hidden relative group border border-gray-100 dark:border-gray-800"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDPjzqjkRGAjBskNENNpKsZiq7wsTQVlX-DLIHFNQnxREIKWJmWWklkI5VXu2YlYPsSsl2znjAFinezXL4G6S7SwYMq8YlxNwDFFWxhQNTEiDeHtp4CHgGT_7_K9oDVt8aBsIS0utSFWRhHSH3cLDa_ow9SDq-CGtprNmAP-DZ3y4AVMzi9oUCF7HtQoqTOhLhaYaqUs657Dti3-myQ6hhC50Hu9CCP_Tr51RyD2zVG3xaaUCH6PH2snkLtyDDo3nQng6MClFbQsuHP")' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Diagnosis Summary (Headline & Chips) */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-text-main-light dark:text-white tracking-tight text-4xl font-black leading-tight text-center uppercase">
            {data.diseaseName || "Bệnh Đạo Ôn"}
          </h1>
          <div className="flex flex-wrap justify-center gap-3">
            {/* Severity Badge */}
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/40 border border-red-200 dark:border-red-800/50">
              <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-[20px] font-black">warning</span>
              <span className="text-red-700 dark:text-red-300 font-black text-xs uppercase tracking-widest">
                Mức độ: {data.severity === 'Severe' ? 'Nặng' : data.severity === 'Moderate' ? 'Trung bình' : 'Nhẹ'}
              </span>
            </div>
            {/* Confidence Badge */}
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
              <span className="material-symbols-outlined text-green-800 dark:text-green-300 text-[20px] font-black">verified</span>
              <span className="text-green-800 dark:text-green-200 font-black text-xs uppercase tracking-widest">Tin cậy: {data.confidence}%</span>
            </div>
          </div>
        </div>

        {/* Simplified Analysis Cards */}
        <div className="grid gap-3">
          {/* Cause */}
          <div className="bg-white dark:bg-surface-dark p-5 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 flex items-start gap-4 transition-transform active:scale-[0.98]">
            <div className="size-11 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">water_drop</span>
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-widest mb-1 dark:text-white">Nguyên nhân</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                {data.causes?.[0] || "Độ ẩm không khí cao kéo dài, sương mù nhiều vào sáng sớm."}
              </p>
            </div>
          </div>
          {/* Recommendation */}
          <div className="bg-white dark:bg-surface-dark p-5 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 flex items-start gap-4 transition-transform active:scale-[0.98]">
            <div className="size-11 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">agriculture</span>
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-widest mb-1 dark:text-white">Khuyến nghị xử lý</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                Dừng bón đạm. Giữ mực nước ruộng 3-5cm. Phun thuốc đặc trị ngay.
              </p>
            </div>
          </div>
        </div>

        {/* Medicine Suggestion (Highlighted) */}
        <div className="bg-white dark:bg-surface-dark rounded-[2rem] overflow-hidden shadow-xl border-l-[6px] border-primary border border-gray-100 dark:border-gray-800">
          <div className="p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary font-black">medication</span>
                Thuốc đề xuất
              </h3>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Ưu tiên</span>
            </div>
            <div>
              <p className="text-2xl font-black text-text-main-light dark:text-white mb-1">Amistar Top 325SC</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Hoạt chất: Azoxystrobin + Difenoconazole</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-1">
              <div className="bg-gray-50 dark:bg-background-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Liều lượng</p>
                <p className="font-black text-lg text-primary">20ml / 16L</p>
              </div>
              <div className="bg-gray-50 dark:bg-background-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Cách dùng</p>
                <p className="font-black text-lg dark:text-gray-200">Phun ướt lá</p>
              </div>
            </div>
          </div>
        </div>

        {/* Large Action Buttons (Grid) */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          {/* Create Task Button */}
          <button 
            onClick={() => onNavigate?.('add-task')}
            className="bg-primary hover:bg-primary-dark active:scale-95 transition-all h-32 rounded-[2.5rem] flex flex-col items-center justify-center gap-2 shadow-lg shadow-primary/20 text-black group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="material-symbols-outlined text-4xl font-black mb-1">add_task</span>
            <span className="font-black text-xs uppercase tracking-[0.1em]">Tạo nhiệm vụ</span>
          </button>
          {/* Save Log Button */}
          <button 
            onClick={onDone}
            className="bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95 transition-all h-32 rounded-[2.5rem] flex flex-col items-center justify-center gap-2 shadow-sm border border-gray-100 dark:border-gray-800 text-text-main-light dark:text-white"
          >
            <span className="material-symbols-outlined text-4xl text-gray-600 dark:text-gray-300">save</span>
            <span className="font-black text-xs uppercase tracking-[0.1em]">Lưu nhật ký</span>
          </button>
          {/* Call Support Button (Full Width) */}
          <button className="col-span-2 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95 transition-all h-16 rounded-[1.5rem] flex items-center justify-center gap-3 shadow-sm border border-gray-100 dark:border-gray-800 text-text-main-light dark:text-white mt-1">
            <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl font-black">support_agent</span>
            </div>
            <span className="font-black text-xs uppercase tracking-widest">Gọi hỗ trợ kỹ thuật</span>
          </button>
        </div>

        {/* Safety Compliance Warning */}
        <div className="flex gap-4 p-5 bg-yellow-50 dark:bg-yellow-900/10 rounded-3xl border border-yellow-100 dark:border-yellow-900/30 mt-2 mb-8">
          <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-500 shrink-0 font-black">security</span>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
            <span className="font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest text-[10px]">Lưu ý an toàn:</span> Tuân thủ nguyên tắc "4 Đúng" và mang đồ bảo hộ khi phun thuốc. Thời gian cách ly thu hoạch: 7 ngày.
          </p>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Diagnosis;
