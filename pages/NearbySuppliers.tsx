
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Props { onBack: () => void; }

interface PlaceResult {
  title: string;
  uri: string;
}

const HISTORY_KEY = 'gofam_search_history';

const NearbySuppliers: React.FC<Props> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string>('');
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [query, setQuery] = useState('Cửa hàng vật tư nông nghiệp gần đây');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveHistory = (newQuery: string) => {
    if (!newQuery.trim()) return;
    const updated = [newQuery, ...searchHistory.filter(h => h !== newQuery)].slice(0, 5);
    setSearchHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const removeHistoryItem = (item: string) => {
    const updated = searchHistory.filter(h => h !== item);
    setSearchHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  const searchNearby = async (searchQuery?: string) => {
    const activeQuery = searchQuery || query;
    if (!activeQuery.trim()) return;

    setLoading(true);
    setResults('');
    setPlaces([]);
    saveHistory(activeQuery);
    if (searchQuery) setQuery(searchQuery);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let latLng = undefined;
      try {
        const position: any = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        latLng = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      } catch (err) {
        console.warn("Geolocation failed, using default search", err);
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${activeQuery}. Hãy liệt kê các địa điểm uy tín và cung cấp link bản đồ.`,
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: latLng ? {
            retrievalConfig: { latLng }
          } : undefined
        },
      });

      setResults(response.text || "Không tìm thấy kết quả.");
      
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingChunks) {
        const extractedPlaces = groundingChunks
          .filter((chunk: any) => chunk.maps)
          .map((chunk: any) => ({
            title: chunk.maps.title,
            uri: chunk.maps.uri
          }));
        setPlaces(extractedPlaces);
      }
    } catch (error) {
      console.error("Maps grounding error:", error);
      setResults("Có lỗi xảy ra khi tìm kiếm địa điểm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchNearby();
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-10">
      <header className="sticky top-0 z-50 bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between shadow-sm">
        <button onClick={onBack} className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold">Tìm kiếm Google Maps</h2>
        <div className="size-10"></div>
      </header>

      <main className="p-4 space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchNearby()}
              className="w-full h-14 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-2xl pl-4 pr-14 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white shadow-soft"
              placeholder="Bạn muốn tìm gì..."
            />
            <button 
              onClick={() => searchNearby()}
              disabled={loading}
              className="absolute right-2 top-2 size-10 bg-primary text-black rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-50 transition-transform"
            >
              <span className="material-symbols-outlined">{loading ? 'sync' : 'search'}</span>
            </button>
          </div>

          {/* Search History Chips */}
          {searchHistory.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tìm kiếm gần đây</span>
                <button onClick={clearHistory} className="text-[10px] font-bold text-primary uppercase">Xóa hết</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 py-1.5 pl-3 pr-1.5 rounded-full shadow-sm hover:border-primary/50 transition-colors group cursor-pointer" onClick={() => searchNearby(item)}>
                    <span className="text-xs font-medium dark:text-gray-300 max-w-[120px] truncate">{item}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeHistoryItem(item); }}
                      className="size-5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center text-gray-400 group-hover:text-red-500 transition-colors"
                    >
                      <span className="material-symbols-outlined !text-[14px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl flex items-center gap-3">
             <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
               <span className="material-symbols-outlined">location_on</span>
             </div>
             <p className="text-xs font-medium text-primary-dark dark:text-primary leading-tight flex-1">
               Dữ liệu Google Maps thời gian thực giúp bạn tìm kiếm nhà cung cấp vật tư nhanh chóng và chính xác.
             </p>
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="relative">
                <div className="size-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary animate-pulse">explore</span>
                </div>
              </div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest animate-pulse">Đang định vị dữ liệu...</p>
            </div>
          ) : (
            <>
              {results && (
                <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3">
                    <span className="material-symbols-outlined text-primary/20 !text-4xl">auto_awesome</span>
                  </div>
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Phân tích từ AI</h3>
                  <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap font-medium">
                    {results}
                  </div>
                </div>
              )}

              {places.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Địa điểm đề xuất ({places.length})</h3>
                  <div className="flex flex-col gap-3">
                    {places.map((place, i) => (
                      <a 
                        key={i} 
                        href={place.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between group active:scale-[0.98] transition-all shadow-sm hover:border-primary/30"
                      >
                        <div className="flex items-center gap-4">
                          <div className="size-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10">
                            <span className="material-symbols-outlined">store</span>
                          </div>
                          <div>
                            <h4 className="font-bold dark:text-white leading-tight group-hover:text-primary transition-colors">{place.title}</h4>
                            <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                              <span className="material-symbols-outlined !text-xs text-primary">directions</span>
                              Nhấn để chỉ đường
                            </div>
                          </div>
                        </div>
                        <div className="size-10 rounded-full flex items-center justify-center bg-gray-50 dark:bg-white/5 text-gray-400 group-hover:bg-primary group-hover:text-black transition-all">
                          <span className="material-symbols-outlined">open_in_new</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {!loading && results === '' && !places.length && (
                <div className="py-12 flex flex-col items-center justify-center text-center opacity-40">
                  <span className="material-symbols-outlined !text-6xl mb-4">search_off</span>
                  <p className="text-sm font-bold uppercase tracking-widest">Không có kết quả nào</p>
                  <p className="text-xs mt-1">Hãy thử tìm kiếm với từ khóa khác</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default NearbySuppliers;
