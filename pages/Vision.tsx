/// <reference types="vite/client" />
import React, { useEffect, useState } from 'react';
import { createVisionWebClient, type VisionBatch, type VisionSummary } from '../services/visionClient';

/** Read-only GOFAM Vision view. Auth is enforced by the same-origin host backend. */
const Vision: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [summary, setSummary] = useState<VisionSummary | null>(null);
  const [batches, setBatches] = useState<VisionBatch[]>([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // This public URL only opens the Vision application. NEVER include tokens in it.
  const configured = import.meta.env.VITE_GOFAM_VISION_APP_URL as string | undefined;
  const validUrl = (() => {
    try {
      const u = new URL(configured ?? '');
      return u.protocol === 'https:' ? u.origin : null;
    } catch { return null; }
  })();

  useEffect(() => {
    let disposed = false;
    const client = createVisionWebClient();
    Promise.all([client.summary(), client.sessions(20)])
      .then(([s, list]) => {
        if (disposed) return;
        setSummary(s);
        setBatches(list.items);
      })
      .catch((cause: unknown) => {
        if (!disposed) setError(cause instanceof Error ? cause.message : 'Không lấy được dữ liệu');
      })
      .finally(() => { if (!disposed) setBusy(false); });
    return () => { disposed = true; };
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24 text-text-main-light dark:text-white">
      <header className="sticky top-0 z-20 border-b border-emerald-100 bg-white dark:bg-surface-dark px-5 py-4 flex items-center justify-between">
        <button aria-label="Quay lại" type="button" onClick={onBack} className="font-bold text-emerald-800 dark:text-emerald-300">← Quay lại</button>
        <span className="font-bold">☕ GOFAM AI VISION</span>
      </header>
      <main className="px-5 py-6 space-y-5">
        <div className="rounded-3xl bg-emerald-800 p-6 text-white shadow-lg">
          <p className="text-sm opacity-80">Máy đếm quả cà phê · Dữ liệu đồng bộ</p>
          <h1 className="text-2xl font-extrabold mt-2">Vision Control Center</h1>
          <p className="text-xs mt-2 opacity-80">Đếm và phân loại thực hiện trong GOFAM Vision trên thiết bị. Đây là màn hình đọc kết quả, không phải camera trực tiếp.</p>
          {validUrl ? (
            <a href={validUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-5 rounded-xl bg-white text-emerald-800 px-4 py-3 font-bold">Mở ứng dụng GOFAM Vision ↗</a>
          ) : (
            <p className="mt-5 rounded-xl border border-white/30 px-3 py-2 text-sm">Chưa thiết lập VITE_GOFAM_VISION_APP_URL (địa chỉ HTTPS của ứng dụng).</p>
          )}
        </div>
        {busy && <p role="status">Đang tải báo cáo Vision…</p>}
        {error && <div role="alert" className="rounded-2xl border border-amber-300 bg-amber-50 text-amber-900 p-4 text-sm">
          <strong>Vision Cloud chưa kết nối:</strong> {error}<br />
          Cần backend GOFAM đã xác thực tài khoản và cấu hình API bridge. Không nhập mã bí mật vào trình duyệt.
        </div>}
        {summary && <div className="grid grid-cols-2 gap-3" aria-label="Thống kê kiểm đếm">
          {[
            ['Quả chín', summary.ripe_count],
            ['Tổng quả', summary.total_count],
            ['Lô đã đồng bộ', summary.total_sessions],
            ['Thiết bị có báo cáo', summary.active_device_count],
          ].map(([label, value]) => <div key={label} className="rounded-2xl bg-white dark:bg-surface-dark p-4 shadow-sm">
            <div className="text-xs text-gray-500">{label}</div><div className="text-2xl font-extrabold mt-2">{Number(value).toLocaleString('vi-VN')}</div>
          </div>)}
        </div>}
        {batches.length > 0 && <section>
          <h2 className="font-bold text-lg mb-3">Các lô gần đây</h2>
          <div className="space-y-2">
            {batches.map(b => <article key={b.session_id} className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center gap-2"><strong className="text-sm">{b.batch_name}</strong><span className="text-sm font-semibold text-emerald-700">{b.ripe_count.toLocaleString('vi-VN')} quả chín</span></div>
              <p className="text-xs opacity-60 mt-2">{new Date(b.finished_at).toLocaleString('vi-VN')} · {b.model_version ?? 'Model chưa được ghi trên server'}</p>
            </article>)}
          </div>
        </section>}
        <p className="text-xs text-gray-500">⚠️ Số đếm đang ở mức thử nghiệm, chưa đo độ chính xác trên băng chuyền thật; không dùng làm căn cứ thanh toán khi chưa nghiệm thu.</p>
      </main>
    </div>
  );
};
export default Vision;