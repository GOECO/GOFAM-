
import React, { useState } from 'react';

interface Props { onSignup: () => void; onLogin: () => void; }

const Signup: React.FC<Props> = ({ onSignup, onLogin }) => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark font-display antialiased">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 flex items-center bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md p-4 pb-2 justify-between">
        <button 
          onClick={onLogin}
          className="text-text-main-light dark:text-text-main-dark flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <div className="flex-1 text-center pr-12">
          <img 
            alt="GOFAM Logo" 
            className="h-8 mx-auto object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuACxjCARwZguIjcD19cnutCCwwJqHXNHKWt6Y_eQxBtD7r9FQ3S7B0DnkLV3Qb1A3k2Dxups7e1PFFKfMw7GaiI_zZ2XgjIqeePdR_ZAiXjoNs2GcivhKG1wJirp0JcAR78kUHFYeM-466uN3nvwKj2rYsy92nAmtIPF90ic_OpLyKANGpa3O_clJ92LZDOLPdzy76iKNhyTNGZbZbkpscQAhlu-6Bo337dkw5N3mnTX6QsEpmM8a8j8wk9gXZ-pgdJRgyZuqHgvvQ_"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col px-4 pb-8">
        {/* Hero Section */}
        <div className="w-full flex justify-center py-4">
          <div className="w-full h-40 rounded-2xl overflow-hidden relative shadow-sm">
            <img 
              alt="Smart farm" 
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCth2fcX4ebUBc-2yfiSTTyjzm1XrscmEubvRC21GHqHkouQBI1Ti_3eK9e9cXHzsLXYhb1ixp91qiW8zTdMggs8zfRXXs2OHJxwQxONKKX9YrGIEYS_VCASFxgh4-DYBHoIMr2Vv2TpVf21IKqkmRB5PDqziJxRkbt1bLJjLUMcIxLn1S0OY3GWCW-Kfy-kueXO9gJMeNZ3WR68hPN_l8tGkDVvgyaUPmHsKKPXYYUa2Q6OiTJ-HvkfXN75G9jcOsVqL1VwYc2K5Fo"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent opacity-80"></div>
          </div>
        </div>

        <div className="mb-6 text-center">
          <h1 className="text-text-main-light dark:text-text-main-dark tracking-tight text-[28px] font-bold leading-tight pb-2">
            Tạo tài khoản mới
          </h1>
          <p className="text-text-sub-light dark:text-text-sub-dark text-base font-normal leading-normal">
            Quản lý nông trại thông minh & hiệu quả
          </p>
        </div>

        {/* Signup Form */}
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSignup(); }}>
          <div className="flex flex-col gap-1.5">
            <label className="text-text-main-light dark:text-text-main-dark text-sm font-medium pl-1">Họ và tên</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-text-sub-light dark:text-text-sub-dark">person</span>
              <input 
                className="flex w-full rounded-xl text-text-main-light dark:text-text-main-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-14 placeholder:text-text-sub-light/70 dark:placeholder:text-text-sub-dark/50 pl-11 pr-4 text-base font-normal transition-all" 
                placeholder="Nguyễn Văn A" 
                type="text" 
                required 
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-text-main-light dark:text-text-main-dark text-sm font-medium pl-1">Số điện thoại / Email</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-text-sub-light dark:text-text-sub-dark">mail</span>
              <input 
                className="flex w-full rounded-xl text-text-main-light dark:text-text-main-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-14 placeholder:text-text-sub-light/70 dark:placeholder:text-text-sub-dark/50 pl-11 pr-4 text-base font-normal transition-all" 
                placeholder="0912... hoặc email@example.com" 
                type="text" 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-text-main-light dark:text-text-main-dark text-sm font-medium pl-1 truncate">Ngành nghề <span className="text-[10px] font-normal text-text-sub-light">(Tùy chọn)</span></label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-text-sub-light dark:text-text-sub-dark text-[20px]">work</span>
                <select className="flex w-full rounded-xl text-text-main-light dark:text-text-main-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-14 pl-10 pr-8 text-sm font-normal transition-all cursor-pointer appearance-none">
                  <option disabled value="">Chọn...</option>
                  <option value="crop">Trồng trọt</option>
                  <option value="livestock">Chăn nuôi</option>
                  <option value="aquaculture">Thủy sản</option>
                  <option value="other">Khác</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 text-text-sub-light pointer-events-none text-[20px]">expand_more</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-text-main-light dark:text-text-main-dark text-sm font-medium pl-1 truncate">Quy mô <span className="text-[10px] font-normal text-text-sub-light">(Tùy chọn)</span></label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-text-sub-light dark:text-text-sub-dark text-[20px]">landscape</span>
                <select className="flex w-full rounded-xl text-text-main-light dark:text-text-main-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-14 pl-10 pr-8 text-sm font-normal transition-all cursor-pointer appearance-none">
                  <option disabled value="">Chọn...</option>
                  <option value="small">&lt; 1 Ha</option>
                  <option value="medium">1 - 5 Ha</option>
                  <option value="large">5 - 20 Ha</option>
                  <option value="huge">&gt; 20 Ha</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 text-text-sub-light pointer-events-none text-[20px]">expand_more</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-text-main-light dark:text-text-main-dark text-sm font-medium pl-1">Mật khẩu</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-text-sub-light dark:text-text-sub-dark">lock</span>
              <input 
                className="flex w-full rounded-xl text-text-main-light dark:text-text-main-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-14 placeholder:text-text-sub-light/70 dark:placeholder:text-text-sub-dark/50 pl-11 pr-12 text-base font-normal transition-all" 
                placeholder="••••••••" 
                type={showPass ? "text" : "password"} 
                required 
              />
              <button 
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center text-text-sub-light dark:text-text-sub-dark hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">{showPass ? 'visibility' : 'visibility_off'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-text-main-light dark:text-text-main-dark text-sm font-medium pl-1">Xác nhận mật khẩu</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-text-sub-light dark:text-text-sub-dark">lock_reset</span>
              <input 
                className="flex w-full rounded-xl text-text-main-light dark:text-text-main-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-14 placeholder:text-text-sub-light/70 dark:placeholder:text-text-sub-dark/50 pl-11 pr-12 text-base font-normal transition-all" 
                placeholder="Nhập lại mật khẩu" 
                type={showConfirmPass ? "text" : "password"} 
                required 
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center text-text-sub-light dark:text-text-sub-dark hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">{showConfirmPass ? 'visibility' : 'visibility_off'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3 py-2 px-1">
            <div className="flex h-6 items-center">
              <input 
                className="h-5 w-5 rounded border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-primary focus:ring-primary/50 focus:ring-offset-0 cursor-pointer" 
                id="terms" 
                type="checkbox" 
                required 
              />
            </div>
            <label className="text-xs leading-tight text-text-sub-light dark:text-text-sub-dark select-none" htmlFor="terms">
              Tôi đồng ý với <a className="font-bold text-primary hover:text-primary-dark underline decoration-primary/30 underline-offset-2" href="#">Điều khoản sử dụng</a> và <a className="font-bold text-primary hover:text-primary-dark underline decoration-primary/30 underline-offset-2" href="#">Chính sách bảo mật</a> của GOFAM.
            </label>
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              className="flex w-full items-center justify-center rounded-full bg-primary py-3.5 px-4 text-background-dark text-lg font-bold shadow-lg shadow-primary/30 active:scale-[0.98] transition-all hover:bg-primary-dark"
            >
              Đăng ký ngay
            </button>
          </div>
        </form>

        <div className="relative my-8">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-light dark:border-border-dark"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background-light dark:bg-background-dark px-3 text-xs text-text-sub-light dark:text-text-sub-dark font-bold uppercase tracking-wider">Hoặc đăng ký bằng</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark py-3 px-4 shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <img alt="Google" className="h-5 w-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAe6nBTJBsfheD5VxY2ALs5SiRVdaAfZH8eOfNsrarS09w0ojyoIA98Od4MdduZ7D9dArywo7cjg5FI1fozJ8dv18ujP7ySn03kgO3NYzDxwUSD_Qvzuqrg9k1qGeNQbmgRdg_HgxqRtXmffg8DXj9P6Ptf2-9n6fXG-RI61By7XH7DZ1HR6JUkfakNi-BisUsAsJJ68lpg-tziRaFzXFEmZpPpuoCqu84SqtOJc0mVNUxbPSlCyPw5Pc2z5h5wYZs3Ovt4eHRUpmAc" />
            <span className="text-sm font-bold text-text-main-light dark:text-text-main-dark">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark py-3 px-4 shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <img alt="Facebook" className="h-5 w-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtuqHcgDVSRp-TM3-3lL_U5LsMirQOQIXwgvAXSpEpgTScd6-v4tocTlBjSom_uchwOUtJWcxqs7XpXj-2MkaV8oRW9XVXW6pAZk56txJQZNFl_j8LwOtg8jvfwvhA5Px9qOPXvdS5Dca_lGUJMA1u7XsVR2BEIV13v0QeBQ8nalFKckfoaCXI5d9WOEik2IHzPSrR4_lU4yzNLMydLY3f16CpYUzZRQdNTYWPfs6gozvUndmSZ4BgOJYnEACzhTVRRin3JoZ6ncPO" />
            <span className="text-sm font-bold text-text-main-light dark:text-text-main-dark">Facebook</span>
          </button>
        </div>

        <div className="mt-8 text-center pb-6">
          <p className="text-text-main-light dark:text-text-main-dark text-base">
            Đã có tài khoản? 
            <button onClick={onLogin} className="font-bold text-primary hover:text-primary-dark ml-1">Đăng nhập</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
