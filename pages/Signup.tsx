
import React from 'react';

interface Props { onSignup: () => void; onLogin: () => void; }

const Signup: React.FC<Props> = ({ onSignup, onLogin }) => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col p-4 overflow-y-auto pb-10">
      <header className="py-4 flex items-center gap-4">
        <button onClick={onLogin} className="size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex-1 flex justify-center -ml-14">
          <span className="text-xl font-bold text-primary">GOFAM PRO</span>
        </div>
      </header>

      <div className="flex justify-center py-4">
        <div className="w-full h-32 rounded-3xl overflow-hidden relative shadow-sm">
          <img alt="Smart farm" className="w-full h-full object-cover opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCth2fcX4ebUBc-2yfiSTTyjzm1XrscmEubvRC21GHqHkouQBI1Ti_3eK9e9cXHzsLXYhb1ixp91qiW8zTdMggs8zfRXXs2OHJxwQxONKKX9YrGIEYS_VCASFxgh4-DYBHoIMr2Vv2TpVf21IKqkmRB5PDqziJxRkbt1bLJjLUMcIxLn1S0OY3GWCW-Kfy-kueXO9gJMeNZ3WR68hPN_l8tGkDVvgyaUPmHsKKPXYYUa2Q6OiTJ-HvkfXN75G9jcOsVqL1VwYc2K5Fo"/>
          <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent opacity-80"></div>
        </div>
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight dark:text-white">Đăng ký</h1>
        <p className="text-gray-500 mt-1">Tạo tài khoản mới cho nông trại của bạn</p>
      </div>

      <form className="space-y-4" onSubmit={e => { e.preventDefault(); onSignup(); }}>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold pl-1">Họ và tên</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary">person</span>
            <input type="text" className="w-full h-14 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-2xl pl-12 pr-4 focus:ring-1 focus:ring-primary outline-none" placeholder="Nguyễn Văn A" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold pl-1">Số điện thoại / Email</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary">mail</span>
            <input type="text" className="w-full h-14 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-2xl pl-12 pr-4 focus:ring-1 focus:ring-primary outline-none" placeholder="0912... hoặc email" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold pl-1">Mật khẩu</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary">lock</span>
            <input type="password" placeholder="••••••••" className="w-full h-14 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-2xl pl-12 pr-12 focus:ring-1 focus:ring-primary outline-none" />
          </div>
        </div>

        <div className="flex items-start gap-3 py-2">
          <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" id="terms" />
          <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed">Tôi đồng ý với <span className="text-primary font-bold">Điều khoản</span> và <span className="text-primary font-bold">Chính sách bảo mật</span> của GOFAM.</label>
        </div>

        <button type="submit" className="w-full h-14 bg-primary hover:bg-primary-dark text-black rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 transition-all mt-4">Đăng ký ngay</button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-800"></div></div>
        <div className="relative flex justify-center"><span className="bg-background-light dark:bg-background-dark px-4 text-xs font-bold text-gray-400 uppercase">Hoặc</span></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="h-12 border border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-center gap-2 font-bold dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAe6nBTJBsfheD5VxY2ALs5SiRVdaAfZH8eOfNsrarS09w0ojyoIA98Od4MdduZ7D9dArywo7cjg5FI1fozJ8dv18ujP7ySn03kgO3NYzDxwUSD_Qvzuqrg9k1qGeNQbmgRdg_HgxqRtXmffg8DXj9P6Ptf2-9n6fXG-RI61By7XH7DZ1HR6JUkfakNi-BisUsAsJJ68lpg-tziRaFzXFEmZpPpuoCqu84SqtOJc0mVNUxbPSlCyPw5Pc2z5h5wYZs3Ovt4eHRUpmAc" className="size-5" alt="Google" />
          Google
        </button>
        <button className="h-12 border border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-center gap-2 font-bold dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtuqHcgDVSRp-TM3-3lL_U5LsMirQOQIXwgvAXSpEpgTScd6-v4tocTlBjSom_uchwOUtJWcxqs7XpXj-2MkaV8oRW9XVXW6pAZk56txJQZNFl_j8LwOtg8jvfwvhA5Px9qOPXvdS5Dca_lGUJMA1u7XsVR2BEIV13v0QeBQ8nalFKckfoaCXI5d9WOEik2IHzPSrR4_lU4yzNLMydLY3f16CpYUzZRQdNTYWPfs6gozvUndmSZ4BgOJYnEACzhTVRRin3JoZ6ncPO" className="size-5" alt="Facebook" />
          Facebook
        </button>
      </div>

      <div className="py-6 text-center">
        <p className="text-gray-500">
          Đã có tài khoản? 
          <button onClick={onLogin} className="ml-1 font-bold text-primary">Đăng nhập</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
