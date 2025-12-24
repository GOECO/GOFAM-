
import React, { useState } from 'react';

interface Props { onLogin: () => void; onSignup: () => void; onForgotPassword: () => void; }

const Login: React.FC<Props> = ({ onLogin, onSignup, onForgotPassword }) => {
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulated auth flow
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => onLogin(), 800);
    }, 1500);
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark font-display antialiased transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full -ml-32 -mb-32"></div>

      <div className="sticky top-0 z-20 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-center border-b border-gray-100 dark:border-white/5">
        <img 
          alt="GOFAM Logo" 
          className="h-7 object-contain" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuACxjCARwZguIjcD19cnutCCwwJqHXNHKWt6Y_eQxBtD7r9FQ3S7B0DnkLV3Qb1A3k2Dxups7e1PFFKfMw7GaiI_zZ2XgjIqeePdR_ZAiXjoNs2GcivhKG1wJirp0JcAR78kUHFYeM-466uN3nvwKj2rYsy92nAmtIPF90ic_OpLyKANGpa3O_clJ92LZDOLPdzy76iKNhyTNGZbZbkpscQAhlu-6Bo337dkw5N3mnTX6QsEpmM8a8j8wk9gXZ-pgdJRgyZuqHgvvQ_"
        />
      </div>

      <div className="flex-1 flex flex-col px-6 pb-12 z-10">
        <div className="w-full flex justify-center py-6">
          <div className="w-full h-40 rounded-[2.5rem] overflow-hidden relative shadow-2xl border border-white dark:border-white/5">
            <img alt="Hero" className="w-full h-full object-cover opacity-90 transition-transform duration-[4000ms] hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNsQXQjBzRy6wtLGbycoWw-RDSS-S3vyHecO4-yeIsrB5PGoQT73v6FVNK5UD7Gjtc2ZT62-muBDVAffIQ-WDe7JrnBtVG29JDaqA7hcM4y7FeFLrq3WK12-hHiqa65kCLZw1ZYaY_rNPy6Vb_bXU5aoENT7UDT4xgDwqzV4Ga3TqXOmcXEp18LC9FAamJVsUt8M9nexkML5Q89Ps8JgVNdpmlDj9IAx7vKdGdKalVUf92yYYQF1Q04ToV_f5UdGLWEVefMbqIADgB" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent opacity-60"></div>
          </div>
        </div>

        <div className="mb-10 text-center px-4">
          <h1 className="text-text-main-light dark:text-text-main-dark tracking-tighter text-3xl font-black leading-tight pb-2 uppercase italic">
            Xác thực <span className="text-primary not-italic">Pro</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed">
            Hệ thống quản lý tích hợp AI
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Tài khoản quản trị</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">alternate_email</span>
              <input className="w-full rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-surface-dark h-14 pl-12 pr-4 text-sm font-bold focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm" placeholder="Email hoặc SĐT" type="text" required disabled={isLoading || isSuccess} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Mật khẩu</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">lock</span>
              <input className="w-full rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-surface-dark h-14 pl-12 pr-12 text-sm font-bold focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm" placeholder="••••••••" type={showPass ? "text" : "password"} required disabled={isLoading || isSuccess} />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors" disabled={isLoading || isSuccess}>
                <span className="material-symbols-outlined !text-[20px]">{showPass ? 'visibility' : 'visibility_off'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2.5 cursor-pointer select-none group" onClick={() => !isLoading && setRememberMe(!rememberMe)}>
              <div className={`size-5 rounded-lg border-2 flex items-center justify-center transition-all ${rememberMe ? 'bg-primary border-primary shadow-glow' : 'border-gray-200 dark:border-gray-800'}`}>
                {rememberMe && <span className="material-symbols-outlined text-black font-black !text-sm">check</span>}
              </div>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-primary">Ghi nhớ</span>
            </label>
            <button type="button" onClick={onForgotPassword} className="text-[10px] font-black text-primary hover:text-primary-dark uppercase tracking-widest underline underline-offset-4 decoration-primary/20" disabled={isLoading || isSuccess}>Quên?</button>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={isLoading || isSuccess}
              className={`group relative flex w-full items-center justify-center overflow-hidden rounded-2xl h-14 text-sm font-black uppercase tracking-[0.2em] shadow-xl transition-all active:scale-[0.98] ${isSuccess ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-primary text-black shadow-primary/20'}`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="size-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  <span>Đang xử lý...</span>
                </div>
              ) : isSuccess ? (
                <div className="flex items-center gap-2 animate-pop">
                  <span className="material-symbols-outlined font-black">verified</span>
                  <span>Thành công</span>
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  Đăng nhập hệ thống
                  <span className="material-symbols-outlined font-black">login</span>
                </span>
              )}
            </button>
          </div>
        </form>

        <div className="mt-12 text-center pb-6">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">Chưa có tài khoản?</p>
          <button onClick={onSignup} className="mt-4 text-[10px] font-black text-primary hover:text-primary-dark transition-all flex items-center justify-center gap-2 mx-auto uppercase tracking-[0.2em] bg-primary/5 px-6 py-3 rounded-xl border border-primary/20" disabled={isLoading || isSuccess}>
            Đăng ký tài khoản mới
            <span className="material-symbols-outlined !text-base">person_add</span>
          </button>
        </div>
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 15px rgba(19, 236, 73, 0.4); }
        @keyframes pop { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-pop { animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      `}</style>
    </div>
  );
};

export default Login;
