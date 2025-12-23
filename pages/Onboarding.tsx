
import React, { useState } from 'react';

const steps = [
  {
    title: 'Theo dõi IoT & Cảnh báo tức thời',
    desc: 'Giám sát các chỉ số môi trường 24/7. Nhận thông báo ngay lập tức khi có bất thường xảy ra.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCStYo8gzvCbJPmGYtEsn7E7fbxSZGFDvvSrbI9ux5lxuS2FVCvx2NVuN4Di1eVe58nTjobSBMOrMwLt9GPyU6oGQlSNs2neHZbprQGdGzexAgrR1vfLvNT8xl46OOOqRncuOBLSEHsXBZ_oJM_wbTbdrbcglbC7hxJtF6QyFxPGty6YRyQoVZfS0IHPyRJEVqV3c0pXBHNKq7HkEjilPlmpec_fM1mRkatsptj3pwUMhysLQA0DXu_agSRZsqCKLlLNr3_8mMdJf3B'
  },
  {
    title: 'AI Chẩn đoán Sâu bệnh',
    desc: 'Chụp ảnh cây trồng. AI phát hiện bệnh và gợi ý cách xử lý ngay với độ chính xác 99%.',
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
    <div className="h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-none pt-12 pb-4 px-6 flex justify-between items-center">
        <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} className="p-2 -ml-2 rounded-full text-text-main-light dark:text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-8 bg-primary shadow-glow' : 'w-1.5 bg-gray-300 dark:bg-gray-600'}`} />
          ))}
        </div>
        <button onClick={onComplete} className="text-sm font-bold text-text-sub-light dark:text-text-sub-dark">Bỏ qua</button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-full aspect-[4/5] max-w-[320px] rounded-3xl overflow-hidden shadow-2xl relative mb-8 border border-white/50 dark:border-gray-800">
          <img src={steps[currentStep].img} className="w-full h-full object-cover" alt="Step" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        <h1 className="text-3xl font-bold text-text-main-light dark:text-white leading-tight mb-4">{steps[currentStep].title}</h1>
        <p className="text-lg text-text-sub-light dark:text-text-sub-dark font-normal leading-relaxed px-4">{steps[currentStep].desc}</p>
      </div>

      <div className="flex-none p-6 pb-12">
        <button onClick={handleNext} className="w-full h-16 bg-primary hover:bg-primary-dark text-black rounded-2xl font-bold text-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all">
          {currentStep === steps.length - 1 ? 'Bắt đầu ngay' : 'Tiếp tục'}
          <span className="material-symbols-outlined font-bold">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
