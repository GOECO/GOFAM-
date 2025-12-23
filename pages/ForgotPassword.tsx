
import React, { useState } from 'react';

interface Props { onBack: () => void; onResetSuccess: () => void; }

type Step = 'request' | 'otp' | 'reset' | 'success';
type AuthMethod = 'otp' | 'security_question';

const ForgotPassword: React.FC<Props> = ({ onBack, onResetSuccess }) => {
  const [step, setStep] = useState<Step>('request');
  const [authMethod, setAuthMethod] = useState<AuthMethod>('otp');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNextStep = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step === 'request') setStep('otp');
      else if (step === 'otp') setStep('reset');
      else if (step === 'reset') setStep('success');
      else onResetSuccess();
    }, 1200);
  };

  const renderStep = () => {
    switch (step) {
      case 'request':
        return (
          <div className="flex flex-col animate-fadeIn">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg inline-flex">
                  <span className="material-symbols-outlined text-primary text-2xl">lock_reset</span>
                </div>
                <span className="text-[10px] font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 tracking-wider">GOFAM PRO</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-text-main-light dark:text-white mb-3 font-display">Quên mật khẩu?</h1>
              <p className="text-sm text-text-sub-light dark:text-text-sub-dark leading-relaxed">
                Đừng lo lắng, chúng tôi sẽ giúp bạn lấy lại quyền truy cập vào nông trại số của mình. Hãy chọn phương thức xác thực phù hợp nhất.
              </p>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <h3 className="text-[10px] font-bold text-text-main-light dark:text-white uppercase tracking-widest mb-1">Chọn phương thức xác thực</h3>
              
              <label className="cursor-pointer group relative" onClick={() => setAuthMethod('otp')}>
                <input type="radio" name="auth_method" checked={authMethod === 'otp'} onChange={() => {}} className="sr-only" />
                <div className={`flex items-start p-4 rounded-xl border transition-all shadow-sm ${authMethod === 'otp' ? 'border-primary bg-primary/5' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-surface-dark'}`}>
                  <div className={`size-5 rounded-full border-2 mr-4 mt-0.5 flex items-center justify-center relative transition-colors ${authMethod === 'otp' ? 'border-primary bg-primary' : 'border-gray-300 dark:border-gray-600'}`}>
                    {authMethod === 'otp' && <div className="size-2 bg-white rounded-full shadow-sm"></div>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-text-main-light dark:text-white">Gửi mã xác thực</span>
                      <span className="material-symbols-outlined text-gray-400 text-sm">sms</span>
                    </div>
                    <p className="text-[11px] text-text-sub-light dark:text-text-sub-dark leading-snug">Nhận mã OTP 6 số qua số điện thoại hoặc email đã đăng ký tài khoản.</p>
                  </div>
                </div>
              </label>

              <label className="cursor-pointer group relative" onClick={() => setAuthMethod('security_question')}>
                <input type="radio" name="auth_method" checked={authMethod === 'security_question'} onChange={() => {}} className="sr-only" />
                <div className={`flex items-start p-4 rounded-xl border transition-all shadow-sm ${authMethod === 'security_question' ? 'border-primary bg-primary/5' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-surface-dark'}`}>
                  <div className={`size-5 rounded-full border-2 mr-4 mt-0.5 flex items-center justify-center relative transition-colors ${authMethod === 'security_question' ? 'border-primary bg-primary' : 'border-gray-300 dark:border-gray-600'}`}>
                    {authMethod === 'security_question' && <div className="size-2 bg-white rounded-full shadow-sm"></div>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-text-main-light dark:text-white">Câu hỏi bảo mật</span>
                      <span className="material-symbols-outlined text-gray-400 text-sm">security</span>
                    </div>
                    <p className="text-[11px] text-text-sub-light dark:text-text-sub-dark leading-snug">Trả lời câu hỏi bảo mật bạn đã thiết lập khi tạo tài khoản quản trị.</p>
                  </div>
                </div>
              </label>
            </div>

            <div className="flex flex-col gap-5 w-full">
              <label className="flex flex-col w-full group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-text-main-light dark:text-text-sub-dark uppercase tracking-widest pl-1">Thông tin định danh</span>
                  <span className="text-[10px] font-bold text-primary cursor-pointer hover:underline uppercase tracking-widest">Bạn quên ID?</span>
                </div>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-gray-400 group-focus-within:text-primary transition-colors pointer-events-none flex items-center">
                    <span className="material-symbols-outlined">person_search</span>
                  </div>
                  <input 
                    className="flex w-full rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-surface-dark px-4 pl-12 h-14 text-sm text-text-main-light dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all shadow-sm" 
                    placeholder="Nhập Email hoặc SĐT đăng ký" 
                    type="text" 
                  />
                </div>
                <p className="mt-3 text-[10px] text-text-sub-light dark:text-text-sub-dark flex items-center gap-1 font-medium italic">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  Chúng tôi sẽ kiểm tra thông tin trong hệ thống Farm Data.
                </p>
              </label>

              <button 
                onClick={handleNextStep}
                disabled={loading}
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 bg-primary hover:bg-primary-dark active:scale-[0.98] transition-all duration-200 shadow-glow mt-2 group relative disabled:opacity-50"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                <span className="text-black text-lg font-black tracking-wide relative z-10 flex items-center gap-2">
                  {loading ? 'Đang xử lý...' : 'Gửi yêu cầu xác thực'}
                  {!loading && <span className="material-symbols-outlined opacity-70 group-hover:translate-x-1 transition-transform">send</span>}
                </span>
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-6 tracking-[0.2em]">Quy trình khôi phục</h4>
              <div className="flex justify-between items-start relative">
                <div className="absolute top-3 left-0 w-full h-0.5 bg-gray-100 dark:bg-gray-800 -z-10"></div>
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <div className="size-6 rounded-full bg-primary text-black text-[10px] font-black flex items-center justify-center ring-4 ring-background-light dark:ring-background-dark shadow-glow">1</div>
                  <span className="text-[10px] font-bold text-text-main-light dark:text-white text-center leading-tight uppercase tracking-widest">Gửi yêu cầu</span>
                </div>
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <div className="size-6 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[10px] font-black flex items-center justify-center ring-4 ring-background-light dark:ring-background-dark">2</div>
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 text-center leading-tight uppercase tracking-widest">Xác thực</span>
                </div>
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <div className="size-6 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[10px] font-black flex items-center justify-center ring-4 ring-background-light dark:ring-background-dark">3</div>
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 text-center leading-tight uppercase tracking-widest">Mật khẩu mới</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'otp':
        return (
          <div className="flex flex-col animate-fadeIn px-2">
             <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-text-main-light dark:text-white mb-3">Xác thực OTP</h1>
              <p className="text-sm text-text-sub-light dark:text-text-sub-dark leading-relaxed">
                Chúng tôi đã gửi mã xác thực gồm 6 chữ số đến số điện thoại của bạn. Vui lòng nhập để tiếp tục.
              </p>
            </div>
            <div className="flex justify-between gap-3 mb-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <input 
                  key={i}
                  maxLength={1}
                  className="size-12 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 text-center text-xl font-black text-text-main-light dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all shadow-sm"
                  type="text"
                />
              ))}
            </div>
            <button 
              onClick={handleNextStep}
              className="w-full h-14 bg-primary text-black rounded-xl font-black text-lg shadow-glow active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Xác thực mã
              <span className="material-symbols-outlined">verified</span>
            </button>
            <p className="mt-6 text-center text-xs font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-widest">
              Gửi lại mã sau <span className="text-primary">59s</span>
            </p>
          </div>
        );
      case 'reset':
        return (
          <div className="flex flex-col animate-fadeIn px-2">
             <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-text-main-light dark:text-white mb-3">Mật khẩu mới</h1>
              <p className="text-sm text-text-sub-light dark:text-text-sub-dark leading-relaxed">
                Tạo một mật khẩu mới mạnh hơn để đảm bảo an toàn cho dữ liệu nông trại của bạn.
              </p>
            </div>
            <div className="space-y-4 mb-8">
               <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Mật khẩu mới</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
                    <input 
                      type={showPass ? "text" : "password"}
                      className="w-full h-14 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl pl-11 pr-12 text-sm dark:text-white focus:ring-1 focus:ring-primary outline-none"
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                       <span className="material-symbols-outlined">{showPass ? 'visibility' : 'visibility_off'}</span>
                    </button>
                  </div>
               </div>
               <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Xác nhận lại</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">lock_reset</span>
                    <input 
                      type="password"
                      className="w-full h-14 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl pl-11 pr-4 text-sm dark:text-white focus:ring-1 focus:ring-primary outline-none"
                      placeholder="••••••••"
                    />
                  </div>
               </div>
            </div>
            <button 
              onClick={handleNextStep}
              className="w-full h-14 bg-primary text-black rounded-xl font-black text-lg shadow-glow active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Cập nhật mật khẩu
              <span className="material-symbols-outlined">save</span>
            </button>
          </div>
        );
      case 'success':
        return (
          <div className="flex flex-col items-center text-center animate-bounceIn pt-10">
            <div className="size-24 rounded-full bg-primary/20 flex items-center justify-center mb-6 shadow-glow border border-primary/30">
                <span className="material-symbols-outlined !text-6xl text-primary animate-pulse">verified_user</span>
            </div>
            <h1 className="text-3xl font-black text-text-main-light dark:text-white mb-3">Thành công!</h1>
            <p className="text-text-sub-light dark:text-text-sub-dark text-sm max-w-[280px] mb-10 leading-relaxed">
              Mật khẩu của bạn đã được cập nhật. Hãy sử dụng mật khẩu mới để đăng nhập vào hệ thống.
            </p>
            <button 
              onClick={onResetSuccess}
              className="w-full h-14 bg-slate-900 text-white dark:bg-white dark:text-black rounded-xl font-black text-lg shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Đăng nhập ngay
              <span className="material-symbols-outlined">login</span>
            </button>
          </div>
        );
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark font-display antialiased">
      {/* Background Decorative Glows */}
      <div className="pointer-events-none fixed top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="pointer-events-none fixed bottom-1/3 left-0 -ml-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl"></div>

      {/* Sticky Header */}
      <header className="flex items-center justify-between px-4 pt-12 pb-4 sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <button 
          onClick={step === 'request' ? onBack : () => setStep('request')}
          className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200/50 dark:hover:bg-white/5 transition-colors cursor-pointer text-text-main-light dark:text-white"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
        </button>
        <div className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">Khôi phục tài khoản</div>
        <div className="size-10"></div> 
      </header>

      <main className="flex-1 flex flex-col px-6 pt-4 pb-12 overflow-y-auto no-scrollbar relative z-10">
        {renderStep()}
        
        {step === 'request' && (
          <div className="mt-auto pt-10 text-center">
            <p className="text-[11px] font-bold text-text-sub-light dark:text-gray-500 uppercase tracking-widest">
              Sự cố kỹ thuật? <a className="text-primary hover:text-primary-dark underline decoration-primary/30 underline-offset-2" href="#">Liên hệ hỗ trợ 24/7</a>
            </p>
          </div>
        )}
      </main>

      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-shimmer { animation: shimmer 1.5s infinite; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-bounceIn { animation: bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
