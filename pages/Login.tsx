
import React from 'react';

interface Props { onLogin: () => void; onSignup: () => void; }

const Login: React.FC<Props> = ({ onLogin, onSignup }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark p-6">
      <div className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-3xl min-h-[180px] relative mb-8 mt-6 shadow-lg" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDNsQXQjBzRy6wtLGbycoWw-RDSS-S3vyHecO4-yeIsrB5PGoQT73v6FVNK5UD7Gjtc2ZT62-muBDVAffIQ-WDe7JrnBtVG29JDaqA7hcM4y7FeFLrq3WK12-hHiqa65kCLZw1ZYaY_rNPy6Vb_bXU5aoENT7UDT4xgDwqzV4Ga3TqXOmcXEp18LC9FAamJVsUt8M9nexkML5Q89Ps8JgVNdpmlDj9IAx7vKdGdKalVUf92yYYQF1Q04ToV_f5UdGLWEVefMbqIADgB")'}}>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/95 via-background-dark/20 to-transparent"></div>
        <div className="relative z-10 p-5">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="material-symbols-outlined text-primary text-3xl">agriculture</span>
            <span className="text-white text-2xl font-bold tracking-tight">GOFAM</span>
            <span className="bg-primary/20 text-primary border border-primary/30 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">Pro</span>
          </div>
          <p className="text-gray-300 text-xs font-medium opacity-90">Hệ thống quản lý nông nghiệp thông minh</p>
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold text-text-main-light dark:text-white">Đăng nhập</h1>
        
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-sub-light dark:text-gray-400 uppercase tracking-widest pl-1">Tài khoản</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary">person</span>
              <input type="text" className="w-full h-14 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-2xl pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Số điện thoại hoặc Email" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-sub-light dark:text-gray-400 uppercase tracking-widest pl-1">Mật khẩu</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary">lock</span>
              <input type="password" placeholder="••••••••" className="w-full h-14 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-2xl pl-12 pr-12 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                <span className="material-symbols-outlined">visibility_off</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary bg-white dark:bg-surface-dark" />
            <span className="text-sm text-gray-500">Ghi nhớ</span>
          </label>
          <button className="text-sm font-bold text-primary hover:underline">Quên mật khẩu?</button>
        </div>

        <div className="space-y-3 pt-4">
          <button onClick={onLogin} className="w-full h-14 bg-primary hover:bg-primary-dark text-black rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all">
            Đăng nhập
            <span className="material-symbols-outlined">login</span>
          </button>
          <button className="w-full h-14 bg-transparent border border-gray-300 dark:border-gray-700 rounded-2xl font-semibold text-text-main-light dark:text-white flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
            <span className="material-symbols-outlined text-gray-400">domain</span>
            Tài khoản doanh nghiệp
          </button>
        </div>
      </div>

      <div className="py-6 text-center">
        <p className="text-gray-500">
          Bạn chưa có tài khoản? 
          <button onClick={onSignup} className="ml-1 font-bold text-primary">Đăng ký ngay</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
