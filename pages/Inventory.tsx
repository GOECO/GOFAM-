
import React, { useState } from 'react';

interface Props { onBack: () => void; }

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  qty: number;
  unit: string;
  ncc: string;
  unitPrice: string;
  totalPrice: string;
  entryDate: string;
  expiryDate: string;
  status?: string;
  color: 'red' | 'orange' | 'green';
  img: string;
}

const INVENTORY_DATA: InventoryItem[] = [
  {
    id: 'vt1',
    name: 'Phân bón NPK 20-20-15',
    category: 'Phân bón',
    qty: 50,
    unit: 'bao',
    ncc: 'Công ty Phân bón Bình Điền',
    unitPrice: '500k/bao',
    totalPrice: '25.000.000đ',
    entryDate: '12/10/23',
    expiryDate: '12/10/24',
    color: 'green',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgR6t8eV9cEfq7vlTgV02heH-FzNd-OxMTLOE3u1Krsgyzdrdxa_XaSi229Lc5zLFehmED1jV85NY7I_SyzjWShnPcFPERjC3F2Vj8mWBwcBWUTGIJa2iHQsvBvHmfTsQu7qaUzT4SDoIWIi-1TQPwVV4dOPviH5FgB-aDeWKorETKzsqREW_FpSBeON7OV1mkgzK8d0oFpXEKc-B6y5BJcGfqjCMzJuv8G_NVTT--B2fWBzW85IWN20n_G8XIJ0wAvNI5W3eH-EOy'
  },
  {
    id: 'vt2',
    name: 'Thuốc trừ sâu sinh học',
    category: 'Thuốc BVTV',
    qty: 2,
    unit: 'chai',
    ncc: 'BioTech Global',
    unitPrice: '180k/chai',
    totalPrice: '360.000đ',
    entryDate: '05/01/24',
    expiryDate: '01/05/25',
    status: 'Sắp hết',
    color: 'red',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB4OkcRLlJLKwsiYgop-9rrTyxi2l9PKcaa4-eOqhQRumwKzbyNPREYJFBJZdAhnlAnu4Jf1QydIsnQ4_kXS2XyHAYOmHOCwNWvCjGw3lxqUeHT1F1d1kotSwG_doXSPcGh8_lwbePoDZvW7TIhuoxdpr0C5GZP7wuikpyjxn_RO2126qp1c3Mbe8ad1u-qTvtZhor33FswY2drmNteazhDNqFZJpezkFaFJoPSq1F82kyVlan6YHy0NTjdldheA4Z8sD4y7zhBN2P'
  },
  {
    id: 'vt3',
    name: 'Hạt giống Dưa lưới',
    category: 'Vật tư khác',
    qty: 10,
    unit: 'gói',
    ncc: 'Hạt giống Rạng Đông',
    unitPrice: '45k/gói',
    totalPrice: '450.000đ',
    entryDate: '20/05/23',
    expiryDate: '20/11/24',
    color: 'orange',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLTlKWrRm00vpmyEVhhl9BLI_l35SJ25Q1RAqj85DGuTZAcXwB1dKfJedgxYUz07aG8H8qTY_NIVi56qtEUbMgxoVbXQcfMToQj7A_x2kP-_ZFtiybn56IXgJKruRtqPz0P8-kxpqLQ7GlB87Lbuez3H_CVfWcJI2paCQRN_EDQNblM-dWkYREw8kIG_tqOhCIG5uEH9GnCfixVM-di7KRJbOxyKvLVPjzoIGO-wYtJ6SHWxe_Ps_RsvCLJwfvpBllcRczTI9n2xhL'
  },
  {
    id: 'vt4',
    name: 'Phân hữu cơ vi sinh',
    category: 'Phân bón',
    qty: 120,
    unit: 'kg',
    ncc: 'VinEco Farm',
    unitPrice: '30k/kg',
    totalPrice: '3.600.000đ',
    entryDate: '15/08/24',
    expiryDate: '15/08/25',
    color: 'green',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9EIUMBoAbwnlmJZNaJ6HYBOOd7GuO65WYDm27IB5KxUg9lKbyt47kyli3cz_4KjI6U-VQbZ1gkboXdba5MTx6dQMWNrcI1TCMWVqewaK_zbKaDXWVbZ_j7t_etOpJGyBtr8gB2o8ZjEXxHqSAX3xvNeuhV9AEIPnEe5bvrpVPHBzCmGV-HvdcZYKhxG87BvodzGneQu42oPZl6HEiR8BELLzaSbthCcx1_Hkopf-qH5dmXGgZe-YdTsf9Mi-FBTc9pWGyz85ZrU1k'
  }
];

const Inventory: React.FC<Props> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  const filteredItems = INVENTORY_DATA.filter(item => 
    activeCategory === 'Tất cả' || item.category === activeCategory
  );

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden pb-24 bg-background-light dark:bg-background-dark font-body">
      {/* Sticky Header */}
      <div className="flex flex-col gap-2 bg-white dark:bg-surface-dark p-4 pb-3 shadow-sm sticky top-0 z-20 border-b border-gray-100 dark:border-gray-800 transition-colors">
        <div className="flex items-center h-10 justify-between">
          <button onClick={onBack} className="text-text-main-light dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors -ml-2">
            <span className="material-symbols-outlined !text-2xl font-bold">arrow_back</span>
          </button>
          <div className="flex-1 text-center pr-8">
            <p className="text-text-main-light dark:text-white tracking-tight text-lg font-bold leading-tight">
              Kho Vật tư <span className="text-primary text-[10px] font-black bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20 align-top ml-1">PRO</span>
            </p>
          </div>
          <div className="flex items-center justify-end gap-3">
            <button className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined !text-2xl font-bold">settings</span>
            </button>
            <button className="flex items-center justify-center rounded-full h-9 w-9 bg-primary hover:bg-primary-dark text-black transition-colors shadow-sm active:scale-95">
              <span className="material-symbols-outlined !text-xl font-bold">add</span>
            </button>
          </div>
        </div>
        
        {/* Search & Scan */}
        <div className="flex gap-2 pt-1">
          <div className="flex flex-1 items-center rounded-xl h-10 bg-background-light dark:bg-background-dark border border-gray-100 dark:border-gray-800 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <div className="text-gray-400 flex items-center justify-center pl-3 pr-2">
              <span className="material-symbols-outlined !text-xl">search</span>
            </div>
            <input 
              className="flex w-full min-w-0 flex-1 bg-transparent text-text-main-light dark:text-white focus:outline-0 border-none h-full placeholder:text-gray-400 text-sm font-medium px-1" 
              placeholder="Tìm vật tư, mã lô, NCC..."
            />
            <div className="text-gray-400 flex items-center justify-center pr-3 pl-2 cursor-pointer hover:text-primary transition-colors border-l border-gray-100 dark:border-gray-800 h-6 my-auto">
              <span className="material-symbols-outlined !text-xl">qr_code_scanner</span>
            </div>
          </div>
          <button className="flex items-center justify-center h-10 w-10 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-gray-400 shadow-sm relative active:scale-95 transition-transform">
            <span className="material-symbols-outlined !text-xl">tune</span>
            <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-surface-dark"></div>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 px-4 py-4">
        <div className="bg-white dark:bg-surface-dark rounded-[1.5rem] p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between h-28">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tổng giá trị kho</span>
            <span className="material-symbols-outlined text-primary !text-lg">monetization_on</span>
          </div>
          <div>
            <p className="text-2xl font-black text-text-main-light dark:text-white tracking-tighter">1.25 Tỷ</p>
            <p className="text-[10px] text-green-500 flex items-center gap-1 font-bold mt-1 uppercase tracking-widest">
              <span className="material-symbols-outlined !text-[12px] font-bold">trending_up</span>
              +12% so với tháng trước
            </p>
          </div>
        </div>
        <div className="bg-red-50/50 dark:bg-red-900/10 rounded-[1.5rem] p-4 border border-red-100 dark:border-red-900/30 shadow-sm flex flex-col justify-between h-28">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest">Cần chú ý</span>
            <span className="material-symbols-outlined text-red-500 !text-lg">warning</span>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-black text-text-main-light dark:text-white leading-none">3</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">mục</p>
            </div>
            <div className="flex gap-2 mt-1.5">
              <span className="text-[8px] bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-1.5 py-0.5 rounded font-black uppercase tracking-widest">2 hết hạn</span>
              <span className="text-[8px] bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 px-1.5 py-0.5 rounded font-black uppercase tracking-widest">1 sắp hết</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar">
        {[
          { label: 'Tất cả (142)', val: 'Tất cả' },
          { label: 'Phân bón (45)', val: 'Phân bón' },
          { label: 'Thuốc BVTV (32)', val: 'Thuốc BVTV' },
          { label: 'Vật tư khác (65)', val: 'Vật tư khác' }
        ].map((cat) => (
          <button 
            key={cat.val}
            onClick={() => setActiveCategory(cat.val)}
            className={`flex h-9 shrink-0 items-center justify-center rounded-xl px-4 transition-all ${
              activeCategory === cat.val
                ? 'bg-text-main-light dark:bg-white text-white dark:text-black font-black shadow-md' 
                : 'bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-gray-400 font-bold hover:border-primary/40'
            }`}
          >
            <span className="text-[10px] uppercase tracking-widest">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* List Header */}
      <div className="flex items-center justify-between px-5 pt-2 pb-3">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Danh sách chi tiết</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-black uppercase tracking-widest cursor-pointer bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 px-2.5 py-1.5 rounded-lg">
            <span>Giá trị</span>
            <span className="material-symbols-outlined !text-[14px]">arrow_downward</span>
          </div>
          <div className="flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-widest cursor-pointer bg-primary/10 border border-primary/20 px-2.5 py-1.5 rounded-lg">
            <span>Mới nhất</span>
            <span className="material-symbols-outlined !text-[14px]">sort</span>
          </div>
        </div>
      </div>

      {/* Inventory List */}
      <div className="flex flex-col gap-4 px-4 pb-12">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className={`bg-white dark:bg-surface-dark rounded-[2rem] p-4 shadow-sm border transition-all active:scale-[0.98] group relative overflow-hidden ${
              item.color === 'red' ? 'border-red-100 dark:border-red-900/30' : 
              item.color === 'orange' ? 'border-yellow-100 dark:border-yellow-900/30' : 
              'border-gray-100 dark:border-gray-800'
            }`}
          >
            <div className="flex gap-4">
              <div className="relative size-16 shrink-0 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-inner">
                <img alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.img} />
                {item.status === 'Sắp hết' && (
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-red-600 flex items-center justify-center">
                    <span className="text-[7px] font-black text-white uppercase tracking-widest">Sắp hết</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-text-main-light dark:text-white font-black text-base truncate leading-tight tracking-tight">{item.name}</h4>
                  <span className="text-text-main-light dark:text-white font-black text-sm whitespace-nowrap">{item.totalPrice}</span>
                </div>
                <div className="flex justify-between items-center mt-1.5">
                  <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest truncate max-w-[140px]">NCC: {item.ncc}</p>
                  <p className="text-gray-400 font-bold text-[9px] uppercase tracking-widest">Đơn giá: {item.unitPrice}</p>
                </div>
              </div>
            </div>

            {/* Grid Status */}
            <div className={`grid grid-cols-3 gap-px rounded-2xl overflow-hidden border mt-4 ${
              item.color === 'red' ? 'bg-red-100 dark:bg-red-900/30 border-red-100 dark:border-red-900/30' : 
              item.color === 'orange' ? 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-100 dark:border-yellow-900/30' : 
              'bg-gray-100 dark:bg-gray-800 border-gray-100 dark:border-gray-800'
            }`}>
              <div className="bg-white dark:bg-surface-dark p-2.5 flex flex-col justify-center items-center">
                <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest mb-1">Tồn kho</span>
                <span className={`text-sm font-black mt-0.5 ${item.color === 'red' ? 'text-red-500' : item.color === 'orange' ? 'text-yellow-600' : 'text-primary'}`}>
                  {item.qty} <span className="text-[10px] font-bold text-gray-400 uppercase">{item.unit}</span>
                </span>
              </div>
              <div className="bg-white dark:bg-surface-dark p-2.5 flex flex-col justify-center items-center border-x border-inherit">
                <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest mb-1">Ngày nhập</span>
                <span className="text-xs font-bold text-text-main-light dark:text-white mt-0.5">{item.entryDate}</span>
              </div>
              <div className="bg-white dark:bg-surface-dark p-2.5 flex flex-col justify-center items-center relative">
                <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest mb-1">Hết hạn</span>
                <span className={`text-xs font-bold mt-0.5 ${item.color === 'orange' ? 'text-yellow-600' : 'text-text-main-light dark:text-white'}`}>{item.expiryDate}</span>
                {item.color === 'orange' && <div className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-yellow-500 animate-pulse"></div>}
              </div>
            </div>

            {/* Item Actions */}
            <div className="flex gap-2 mt-4">
              {item.color === 'red' ? (
                <button className="flex-1 flex items-center justify-center gap-2 h-10 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-colors border border-red-200 dark:border-red-800/30">
                  <span className="material-symbols-outlined !text-base">shopping_cart</span>
                  Đặt hàng ngay
                </button>
              ) : (
                <button className="flex-1 flex items-center justify-center gap-2 h-10 bg-gray-50 dark:bg-white/5 rounded-xl text-text-main-light dark:text-white text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors border border-gray-200 dark:border-gray-800">
                  <span className="material-symbols-outlined !text-base">input</span>
                  Nhập thêm
                </button>
              )}
              <button className="flex-1 flex items-center justify-center gap-2 h-10 bg-primary/10 rounded-xl text-primary-dark dark:text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/20 transition-colors border border-primary/20">
                <span className="material-symbols-outlined !text-base font-bold">output</span>
                {item.color === 'orange' ? 'Xuất ưu tiên' : 'Xuất sử dụng'}
              </button>
              <button className="size-10 flex items-center justify-center rounded-xl border border-gray-100 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span className="material-symbols-outlined !text-lg">more_horiz</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav Integration */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 flex items-center justify-around px-4 z-40 transition-colors">
        <button onClick={onBack} className="flex flex-col items-center justify-center w-full gap-1.5 text-gray-400 hover:text-primary transition-all group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">home</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Trang chủ</span>
        </button>
        <button className="flex flex-col items-center justify-center w-full gap-1.5 text-primary scale-105">
          <span className="material-symbols-outlined material-symbols-filled !text-[26px]">inventory_2</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Vật tư</span>
        </button>
        <button onClick={onBack} className="flex flex-col items-center justify-center w-full gap-1.5 text-gray-400 hover:text-primary transition-all group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">grass</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Canh tác</span>
        </button>
        <button onClick={onBack} className="flex flex-col items-center justify-center w-full gap-1.5 text-gray-400 hover:text-primary transition-all group">
          <span className="material-symbols-outlined !text-2xl group-hover:scale-110 transition-transform">person</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Cá nhân</span>
        </button>
      </nav>
    </div>
  );
};

export default Inventory;
