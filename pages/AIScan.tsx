
import React, { useRef, useEffect, useState } from 'react';
import { DiagnosisResult } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

interface Props { onBack: () => void; onDiagnose: (data: DiagnosisResult) => void; }

const PLANT_TYPES = [
  { id: 'rice', name: 'Lúa', icon: 'grass' },
  { id: 'mango', name: 'Xoài', icon: 'park' },
  { id: 'lettuce', name: 'Rau xà lách', icon: 'eco' },
  { id: 'coffee', name: 'Cà phê', icon: 'coffee' },
  { id: 'fruit', name: 'Cây ăn quả', icon: 'bakery_dining' },
  { id: 'other', name: 'Loại khác', icon: 'Psychology' }
];

const AIScan: React.FC<Props> = ({ onBack, onDiagnose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedPlantType, setSelectedPlantType] = useState(PLANT_TYPES[0]);
  const [customPlantName, setCustomPlantName] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access error:", err);
      }
    }
    setupCamera();
  }, []);

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleScan = async () => {
    if (!videoRef.current || isScanning) return;
    setIsScanning(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(videoRef.current, 0, 0);

      const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, 'image/jpeg', 0.8));
      if (!blob) throw new Error("Failed to capture frame");

      const base64Data = await blobToBase64(blob);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // Build the plant context based on selection or custom input
      let plantContext = selectedPlantType.name;
      if (selectedPlantType.id === 'other' && customPlantName.trim()) {
        plantContext = customPlantName.trim();
      } else if (selectedPlantType.id === 'other') {
        plantContext = "một loại cây nông nghiệp chưa xác định";
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
            { 
              text: `Bạn là một chuyên gia bệnh lý thực vật (Plant Pathologist). 
              Hình ảnh này là của cây: ${plantContext}. 
              Nhiệm vụ:
              1. Phân tích các dấu hiệu bệnh lý, sâu hại hoặc thiếu hụt dinh dưỡng trên mẫu vật này.
              2. Sử dụng kiến thức chuyên sâu về loài cây ${plantContext} để đối chiếu các triệu chứng đặc trưng.
              3. Cung cấp chẩn đoán chính xác nhất, bao gồm tên bệnh, tên khoa học và mức độ nghiêm trọng.
              4. Đưa ra phác đồ điều trị cụ thể cho loài cây này.
              
              Trả về kết quả bằng tiếng Việt theo định dạng JSON.` 
            }
          ]
        },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              diseaseName: { type: Type.STRING },
              scientificName: { type: Type.STRING },
              severity: { type: Type.STRING, enum: ['Light', 'Moderate', 'Severe'] },
              confidence: { type: Type.NUMBER },
              causes: { type: Type.ARRAY, items: { type: Type.STRING } },
              protocol: {
                type: Type.OBJECT,
                properties: {
                  urgent: { type: Type.ARRAY, items: { type: Type.STRING } },
                  safe: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              }
            },
            required: ['diseaseName', 'scientificName', 'severity', 'confidence', 'causes', 'protocol']
          }
        }
      });

      const result = JSON.parse(response.text || "{}");
      onDiagnose(result);
    } catch (err) {
      console.error("AI Scan failed:", err);
      alert("Phân tích AI thất bại. Vui lòng thử lại.");
      setIsScanning(false);
    }
  };

  const activePlantDisplayName = (selectedPlantType.id === 'other' && customPlantName.trim()) 
    ? customPlantName 
    : selectedPlantType.name;

  return (
    <div className="h-screen w-full flex flex-col bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>
      </div>

      <header className="relative z-10 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={onBack} className="size-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="px-4 py-1.5 bg-primary/20 border border-primary/40 rounded-full flex items-center gap-2 backdrop-blur-md">
          <span className="text-[10px] font-black text-primary tracking-[0.2em] uppercase">Gofam Pro Vision</span>
          <div className="size-1.5 rounded-full bg-primary animate-pulse"></div>
        </div>
        <button className="size-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
          <span className="material-symbols-outlined">flash_on</span>
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="relative w-80 h-80 border border-white/10 rounded-[3rem] overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-3xl shadow-[0_0_15px_rgba(19,236,73,0.5)]"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-3xl shadow-[0_0_15px_rgba(19,236,73,0.5)]"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-3xl shadow-[0_0_15px_rgba(19,236,73,0.5)]"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-3xl shadow-[0_0_15px_rgba(19,236,73,0.5)]"></div>
          
          {isScanning && (
             <div className="absolute w-full h-[3px] bg-primary shadow-[0_0_20px_#13ec49] scanner-line z-20"></div>
          )}
          
          <div className="absolute inset-0 flex items-center justify-center text-white/10">
            <span className="material-symbols-outlined !text-[8rem]">filter_center_focus</span>
          </div>
        </div>
        
        {isScanning ? (
          <div className="mt-8 px-8 py-3 bg-primary text-black rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-glow animate-bounce">
             <span className="material-symbols-outlined animate-spin !text-lg">sync</span>
             Đang chẩn đoán {activePlantDisplayName}...
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-2">
            <p className="text-white font-bold text-sm tracking-wide">Căn chỉnh lá vào khung quét</p>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Đang sử dụng Gemini 2.5 Pro Vision</p>
          </div>
        )}
      </div>

      <div className="relative z-10 p-6 bg-gradient-to-t from-black via-black/95 to-transparent">
        {/* Plant Type Selection Chips */}
        <div className="mb-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 px-1">Loại cây trồng</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {PLANT_TYPES.map(type => (
              <button 
                key={type.id}
                onClick={() => setSelectedPlantType(type)}
                className={`shrink-0 px-4 py-2.5 rounded-2xl flex items-center gap-2 transition-all duration-300 border ${
                  selectedPlantType.id === type.id 
                    ? 'bg-primary border-primary text-black shadow-glow' 
                    : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                }`}
              >
                <span className={`material-symbols-outlined !text-lg ${selectedPlantType.id === type.id ? 'material-symbols-filled' : ''}`}>
                  {type.icon}
                </span>
                <span className="text-xs font-bold">{type.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Plant Name Input - Only visible when "Other" is selected */}
        {selectedPlantType.id === 'other' && (
          <div className="mb-6 animate-[slideDown_0.3s_ease-out]">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-lg">edit_note</span>
              <input 
                type="text" 
                value={customPlantName}
                onChange={(e) => setCustomPlantName(e.target.value)}
                placeholder="Tên cây trồng cụ thể (VD: Sầu riêng RI6...)"
                className="w-full h-12 bg-white/5 border border-primary/30 rounded-2xl pl-12 pr-4 text-xs font-bold text-white outline-none focus:ring-1 focus:ring-primary focus:bg-white/10 transition-all placeholder:text-white/20"
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-8 pb-4">
          <div className="size-14 rounded-2xl bg-white/5 overflow-hidden border border-white/10 group cursor-pointer active:scale-95 transition-all">
            <img src="https://picsum.photos/200/200" className="w-full h-full object-cover opacity-60 group-hover:opacity-100" alt="Gallery" />
          </div>

          <button 
            onClick={handleScan} 
            disabled={isScanning}
            className="size-24 rounded-full border-[8px] border-white/20 flex items-center justify-center p-1.5 transition-all active:scale-90"
          >
            <div className={`w-full h-full rounded-full transition-all duration-300 ${isScanning ? 'bg-primary scale-75' : 'bg-white'}`}></div>
          </button>

          <button className="size-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 active:scale-90 transition-all">
            <span className="material-symbols-outlined !text-2xl">cameraswitch</span>
          </button>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AIScan;
