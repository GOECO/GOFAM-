/** Browser-only typed client. Calls the GOFAM authenticated same-origin BFF.
 * NEVER use a Vision admin, device or integration secret in Vite environment vars.
 */
export interface VisionBatch {
  schema_version: '1.0';
  session_id: string;
  batch_id: string;
  batch_name: string;
  crop: 'coffee';
  device_id: string;
  started_at: string;
  finished_at: string;
  uploaded_at: string;
  ripe_count: number;
  other_count: number;
  total_count: number;
  model_version: string | null;
}
export interface VisionSummary {
  schema_version: '1.0';
  org_id: string;
  crop: 'coffee';
  ripe_count: number;
  other_count: number;
  total_count: number;
  total_sessions: number;
  active_device_count: number;
}

async function request<T>(path: string, fetcher: typeof fetch): Promise<T> {
  const response = await fetcher(path, { credentials: 'same-origin', cache: 'no-store' });
  if (!response.ok) throw new Error(response.status === 401 ? 'Bạn cần đăng nhập GOFAM.' :
    response.status === 403 ? 'Tài khoản không được truy cập đơn vị này.' :
    `Kết nối GOFAM Vision chưa khả dụng (HTTP ${response.status}).`);
  return await response.json() as T;
}
export function createVisionWebClient(fetcher: typeof fetch = fetch) {
  return {
    summary: () => request<VisionSummary>('/api/gofam-vision/summary', fetcher),
    sessions: (limit = 25, offset = 0) => {
      if (!Number.isInteger(limit) || limit < 1 || limit > 100 ||
          !Number.isInteger(offset) || offset < 0 || offset > 100000) {
        throw new RangeError('Invalid pagination');
      }
      return request<{ schema_version: '1.0'; items: VisionBatch[]; limit: number; offset: number }>(
        `/api/gofam-vision/sessions?limit=${limit}&offset=${offset}`, fetcher);
    },
    getSession: (id: string) => {
      if (!/^[a-f0-9-]{36}$/i.test(id)) throw new Error('Invalid session ID');
      return request<VisionBatch>(`/api/gofam-vision/sessions/${id}`, fetcher);
    },
  };
}