
import React, { useState, useRef, useEffect } from 'react';

interface Props { onBack: () => void; }

interface InventoryItem {
  name: string;
  qty: string;
  ncc: string;
  code: string;
  status: string;
  color: 'red' | 'orange' | 'green';
}

const Inventory: React.FC<Props> = ({ onBack }) => {
  const [items, setItems] = useState<InventoryItem[]>([
    { name: 'Phân bón NPK 20-20-15', qty: '150 kg', ncc: 'VietFarm', code: '#VT-0982', status: 'Ổn định', color: 'green' },
    { name: 'Thuốc trừ sâu sinh học', qty: '2 chai', ncc: 'BioTech Global', code: '#VT-1102', status: 'Sắp hết', color: 'red' },
    { name: 'Hạt giống Dưa lưới', qty: '10 gói', ncc: 'SeedCo', code: '#VT-3321', status: 'Sắp hết hạn', color: 'orange' },
    { name: 'Vôi bột xử lý', qty: '45 kg', ncc: 'LimeVN', code: '#VT-1234', status: 'Ổn định', color: 'green' },
  ]);

  const [isScanning, setIsScanning] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [scannedResult, setScannedResult] = useState<InventoryItem | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Form State for new item
  const [newItem, setNewItem] = useState<InventoryItem>({
    name: '',
    qty: '',
    ncc: '',
    code: '',
    status: 'Ổn định',
    color: 'green'
  });

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (isScanning) {
      async function setupCamera() {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          if (videoRef.current) videoRef.current.srcObject = stream;
          
          // Simulate a successful scan after 2.5 seconds
          setTimeout(() => {
            handleSuccessfulScan();
          }, 2500);
        } catch (err) {
          console.error("Camera access error:", err);
          setIsScanning(false);
        }
      }
      setupCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isScanning]);

  const handleSuccessfulScan = () => {
    const foundItem = items[Math.floor(Math.random() * items.length)];
    setScannedResult(foundItem);
    setIsScanning(false);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.qty) return;
    
    setItems([newItem, ...items]);
    setIsAddModalOpen(false);
    setNewItem({
      name: '',
      qty: '',
      ncc: '',
      code: '',
      status: 'Ổn định',
      color: 'green'
    });
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold">Vật tư & Kho</h2>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      <div className="p-4 grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-surface-dark p-3 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Giá trị</span>
          <p className="text-lg font-bold dark:text-white">1.2 Tỷ</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-xl border border-yellow-100 dark:border-yellow-900/30 shadow-sm flex flex-col gap-1">
          <span className="text-[10px] font-bold text-yellow-600 uppercase">Cảnh báo</span>
          <p className="text-lg font-bold text-yellow-700 dark:text-yellow-400">5 mục</p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-xl border border-red-100 dark:border-red-900/30 shadow-sm flex flex-col gap-1">
          <span className="text-[10px] font-bold text-red-600 uppercase">Hết hạn</span>
          <p className="text-lg font-bold text-red-700 dark:text-red-400">12 mục</p>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="relative group flex gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input type="text" className="w-full h-12 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary outline-none dark:text-white" placeholder="Tìm kiếm vật tư, mã lô hàng..." />
          </div>
          <button 
            onClick={() => setIsScanning(true)}
            className="size-12 bg-primary text-black rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">qr_code_scanner</span>
          </button>
        </div>
      </div>

      <div className="px-4 space-y-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {['Tất cả', 'Phân bón', 'Thuốc BVTV', 'Dụng cụ', 'Giống'].map((f, i) => (
            <button key={f} className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${i === 0 ? 'bg-primary border-primary text-black' : 'bg-white dark:bg-surface-dark border-gray-200 dark:border-gray-700 text-gray-500'}`}>{f}</button>
          ))}
        </div>

        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden shadow-sm">
          {items.map((item, idx) => (
            <div key={`${item.code}-${idx}`} className="p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold dark:text-white">{item.name}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5">
                    <span>{item.code || 'Chưa có mã'}</span>
                    <span className="size-0.5 bg-gray-400 rounded-full"></span>
                    <span>{item.ncc || 'N/A'}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold dark:text-white">{item.qty}</p>
                  <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${item.color === 'red' ? 'bg-red-50 text-red-500 border-red-200 dark:bg-red-900/20 dark:border-red-800' : item.color === 'orange' ? 'bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' : 'bg-green-50 text-green-500 border-green-200 dark:bg-green-900/20 dark:border-green-800'}`}>
                    {item.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="flex-1 py-2 text-xs font-bold bg-primary text-black rounded-lg">Nhập thêm</button>
                <button className="flex-1 py-2 text-xs font-bold border border-gray-200 dark:border-gray-700 rounded-lg">Xuất dùng</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 z-[70] pb-6 flex gap-3">
        <button onClick={() => setIsAddModalOpen(true)} className="flex-1 h-12 bg-primary text-black rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined">download</span> Nhập kho
        </button>
        <button className="flex-1 h-12 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl font-bold flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">upload</span> Xuất kho
        </button>
      </div>

      {/* Manual Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-md bg-white dark:bg-surface-dark rounded-t-[2.5rem] shadow-2xl animate-[slideUp_0.3s_ease-out] overflow-hidden max-h-[90vh] flex flex-col">
            <header className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center shrink-0">
              <h3 className="text-xl font-bold dark:text-white">Thêm Vật Tư Mới</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>

            <form onSubmit={handleAddItem} className="p-6 space-y-4 overflow-y-auto no-scrollbar">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Tên vật tư</label>
                <input 
                  required
                  type="text" 
                  value={newItem.name}
                  onChange={e => setNewItem({...newItem, name: e.target.value})}
                  className="w-full h-12 bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl px-4 text-sm dark:text-white outline-none focus:ring-1 focus:ring-primary"
                  placeholder="VD: Phân bón Kali"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Số lượng</label>
                  <input 
                    required
                    type="text" 
                    value={newItem.qty}
                    onChange={e => setNewItem({...newItem, qty: e.target.value})}
                    className="w-full h-12 bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl px-4 text-sm dark:text-white outline-none focus:ring-1 focus:ring-primary"
                    placeholder="VD: 50 kg"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Mã vật tư</label>
                  <input 
                    type="text" 
                    value={newItem.code}
                    onChange={e => setNewItem({...newItem, code: e.target.value})}
                    className="w-full h-12 bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl px-4 text-sm dark:text-white outline-none focus:ring-1 focus:ring-primary"
                    placeholder="VD: #VT-123"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Nhà cung cấp</label>
                <input 
                  type="text" 
                  value={newItem.ncc}
                  onChange={e => setNewItem({...newItem, ncc: e.target.value})}
                  className="w-full h-12 bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl px-4 text-sm dark:text-white outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Tên công ty / Cửa hàng"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Trạng thái & Màu sắc</label>
                <div className="flex gap-2">
                  <select 
                    value={newItem.status}
                    onChange={e => setNewItem({...newItem, status: e.target.value})}
                    className="flex-1 h-12 bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl px-4 text-sm dark:text-white outline-none appearance-none cursor-pointer"
                  >
                    <option value="Ổn định">Ổn định</option>
                    <option value="Sắp hết">Sắp hết</option>
                    <option value="Sắp hết hạn">Sắp hết hạn</option>
                    <option value="Hết hàng">Hết hàng</option>
                  </select>
                  <div className="flex gap-2 bg-gray-50 dark:bg-background-dark p-1 rounded-xl border border-gray-200 dark:border-gray-700">
                    {(['green', 'orange', 'red'] as const).map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setNewItem({...newItem, color: c})}
                        className={`size-10 rounded-lg flex items-center justify-center transition-all ${newItem.color === c ? 'bg-white dark:bg-white/10 shadow-sm ring-2 ring-primary' : 'opacity-40'}`}
                      >
                        <div className={`size-4 rounded-full ${c === 'green' ? 'bg-green-500' : c === 'orange' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 h-14 bg-gray-100 dark:bg-white/5 rounded-2xl font-bold dark:text-white"
                >
                  Hủy
                </button>
                <button 
                  type="submit"
                  className="flex-[2] h-14 bg-primary text-black rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">save</span>
                  Thêm vào kho
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Scanner Interface */}
      {isScanning && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col">
          <div className="absolute inset-0 z-0">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
          </div>
          
          <header className="relative z-10 p-4 flex justify-between items-center">
            <button onClick={() => setIsScanning(false)} className="size-10 rounded-full bg-white/10 flex items-center justify-center text-white">
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="px-4 py-1.5 bg-primary/20 border border-primary/40 rounded-full flex items-center gap-2">
              <span className="text-xs font-bold text-primary tracking-widest uppercase">Quét mã QR vật tư</span>
            </div>
            <div className="size-10"></div>
          </header>

          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="relative w-64 h-64 border-2 border-white/20 rounded-[2rem] overflow-hidden">
              <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-primary rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-primary rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-primary rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-primary rounded-br-2xl"></div>
              
              <div className="absolute w-full h-[2px] bg-primary shadow-glow scanner-line"></div>
            </div>
            <p className="mt-8 text-white font-medium text-sm">Căn chỉnh mã QR vào khung để kiểm kê</p>
          </div>
        </div>
      )}

      {/* Scan Result Modal */}
      {scannedResult && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white dark:bg-surface-dark rounded-[2rem] overflow-hidden shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="p-6 text-center">
              <div className="size-16 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined !text-4xl">inventory_2</span>
              </div>
              <h3 className="text-xl font-bold dark:text-white mb-1">Đã nhận diện vật tư</h3>
              <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">{scannedResult.code}</p>
            </div>
            
            <div className="px-6 pb-6 space-y-4">
              <div className="bg-gray-50 dark:bg-background-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Tên sản phẩm</p>
                <p className="font-bold dark:text-white">{scannedResult.name}</p>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Tồn kho hiện tại</p>
                    <p className="text-xl font-black text-primary">{scannedResult.qty}</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${scannedResult.color === 'red' ? 'bg-red-50 text-red-500 border-red-200' : 'bg-green-50 text-green-500 border-green-200'}`}>
                    {scannedResult.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setScannedResult(null)} className="flex-1 h-12 bg-gray-100 dark:bg-white/5 rounded-xl font-bold dark:text-white">Đóng</button>
                <button className="flex-1 h-12 bg-primary text-black rounded-xl font-bold shadow-lg shadow-primary/20">Chi tiết</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Inventory;
