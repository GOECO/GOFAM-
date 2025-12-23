
import React, { useState } from 'react';

const steps = [
  {
    title: 'Theo dõi IoT & Cảnh báo tức thời',
    desc: 'Giám sát các chỉ số môi trường 24/7. Nhận thông báo ngay lập tức khi có bất thường xảy ra.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCStYo8gzvCbJPmGYtEsn7E7fbxSZGFDvvSrbI9ux5lxuS2FVCvx2NVuN4Di1eVe58nTjobSBMOrMwLt9GPyU6oGQlSNs2neHZbprQGdGzexAgrR1vfLvNT8xl46OOOqRncuOBLSEHsXBZ_oJM_wbTbdrbcglbC7hxJtF6QyFxPGty6YRyQoVZfS0IHPyRJEVqV3c0pXBHNKq7HkEjilPlmpec_fM1mRkatsptj3pwUMhysLQA0DXu_agSRZsqCKLlLNr3_8mMdJf3B'
  },
  {
    title: 'Chẩn đoán Sâu bệnh Chính xác',
    desc: 'Tận dụng sức mạnh AI để phân tích hàng triệu điểm dữ liệu, nhận diện sâu bệnh với độ chính xác 99% và đề xuất giải pháp xử lý hiệu quả.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDizaS0wKE40w5KOd9VzUwc2xjR86J9IVGybwrwkROFPUo4mynbfYxgqFBmIVBSKz8sC4IQDLHR0vQcOoaoedUXLteVKErSj1FiN3GIIvCCZCkD2pVnaeGxKDU4qEZv25-SXjsBz9oMGWpidP6me6U43bmP0MLVhjQusqTPcjoT4AUyf0Z0D05qvDaKkLTREEooaXJOR2Z-FHfTTQy0_1zVvCTfqU84vaHwNsIln6TVIXsIM8p4mj-WzWlK4l23eN10QEMGD8TCtIbA'
  },
  {
    title: 'Quản trị & Số hóa Quy trình',
    desc: 'Chuẩn hóa SOP, tối ưu hóa nguồn lực nông trại dựa trên dữ liệu thời gian thực và AI.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW4syBykgQHRuIXLBESktXH4gaZjHD5svMevKOdt7O_PsfrAHisJLP7Yt6CyhlTFKqGsulKUyPCCooNLcU-ujk_ro2ifhWj0O8WPq2KpY-gvvi3gVxo3ktVdJ4CcEQPqJWr3-8pRVBAlDxeJVPMzeGXgdqhjM_rreULDQOjeI6rkg0L0FEEMFVKtUFE6gaDffndAVTKJE_kwei7vZJxfYX8IaErgVjxIdDElJqb13yHzd8djyCPWLe3cttTK_Kg-rfmFGcxvaX9qzf'
  }
];

interface Props { onComplete: () => void; }

const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    else onComplete();
  };

  return (
    <div className="h-screen flex flex-col bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Header Info */}
      <div className="flex-none pt-12 pb-2 px-6 flex justify-center items-center relative">
        <div className="px-3 py-1 rounded-full bg-gray-200 dark:bg-white/5 border border-gray-300 dark:border-white/10">
          <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Bước {currentStep + 1}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center -mt-8">
        {/* Visual Mockup Container */}
        <div className="w-full relative mb-10 flex justify-center">
          <div className="relative w-full max-w-[280px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-[4px] border-white dark:border-gray-800 bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 transition-all duration-500">
            <div 
              className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-90 transition-opacity duration-500" 
              style={{ backgroundImage: `url("${steps[currentStep].img}")` }}
            ></div>
            
            {/* HUD Effects for AI Scan Step (Step 2) */}
            {currentStep === 1 && (
              <>
                <div className="absolute inset-0 z-10 opacity-30 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#13ec49 1px, transparent 1px), linear-gradient(90deg, #13ec49 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 z-10 pointer-events-none"></div>
                <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-primary shadow-[0_0_10px_rgba(19,236,73,0.9)] z-20 scanner-line"></div>
                
                {/* HUD Labels */}
                <div className="absolute top-4 left-4 right-4 flex justify-between z-20">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-mono text-primary font-bold tracking-wider">AI_SCAN: ACTIVE</span>
                    <span className="text-[8px] font-mono text-white/70">ID: #G82-9921</span>
                  </div>
                  <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-[9px] font-mono text-white font-bold">LIVE</span>
                  </div>
                </div>

                {/* Focus Bracket */}
                <div className="absolute top-1/4 bottom-1/3 left-6 right-6 border border-white/30 rounded-lg z-10 flex flex-col justify-between p-1">
                  <div className="flex justify-between w-full">
                    <div className="w-3 h-3 border-t-2 border-l-2 border-primary"></div>
                    <div className="w-3 h-3 border-t-2 border-r-2 border-primary"></div>
                  </div>
                  <div className="self-center">
                    <span className="material-symbols-outlined text-white/40 text-2xl">filter_center_focus</span>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="w-3 h-3 border-b-2 border-l-2 border-primary"></div>
                    <div className="w-3 h-3 border-b-2 border-r-2 border-primary"></div>
                  </div>
                </div>

                {/* Analysis Result Card Mockup */}
                <div className="absolute bottom-4 left-3 right-3 z-30">
                  <div className="bg-gray-900/80 backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-lg text-left">
                    <div className="flex justify-between items-start mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                        <span className="text-[10px] font-bold text-white uppercase tracking-wide">Phân tích xong</span>
                      </div>
                      <div className="bg-primary/20 border border-primary/50 px-1.5 py-0.5 rounded text-[8px] font-bold text-primary font-mono">98.5%</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] border-b border-white/10 pb-1.5">
                        <span className="text-gray-400">Bệnh hại:</span>
                        <span className="font-semibold text-white">Rệp sáp (Planococcus)</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[8px] text-gray-400">
                          <span>Mức độ</span>
                          <span className="text-red-400 font-bold uppercase">Cao</span>
                        </div>
                        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full w-[85%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Text Content */}
        <div className="max-w-sm mx-auto">
          <h1 className="text-2xl font-bold dark:text-white leading-tight mb-3">
            {steps[currentStep].title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-relaxed px-4">
            {steps[currentStep].desc}
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex-none p-6 pb-12 bg-background-light dark:bg-background-dark">
        {/* Progress Dots */}
        <div className="flex w-full flex-row items-center justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-6 bg-primary shadow-glow' : 'w-1.5 bg-gray-300 dark:bg-gray-700'}`} 
            />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={handleNext} 
            className="w-full h-14 bg-primary text-[#102215] rounded-2xl font-bold text-lg shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>{currentStep === steps.length - 1 ? 'Bắt đầu ngay' : 'Tiếp tục'}</span>
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>
          <button 
            onClick={onComplete} 
            className="w-full py-2.5 rounded-lg text-gray-500 dark:text-gray-400 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            Bỏ qua
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
