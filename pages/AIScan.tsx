
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
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const captureFrame = async () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0);

    const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, 'image/jpeg', 0.8));
    if (!blob) return;

    const base64Data = await blobToBase64(blob);
    setCapturedImages(prev => [...prev, base64Data]);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64 = await blobToBase64(file);
      newImages.push(base64);
    }
    setCapturedImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setCapturedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleScan = async () => {
    if (capturedImages.length === 0 || isScanning) return;
    setIsScanning(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      let plantContext = selectedPlantType.name;
      if (selectedPlantType.id === 'other' && customPlantName.trim()) {
        plantContext = customPlantName.trim();
      } else if (selectedPlantType.id === 'other') {
        plantContext = "một loại cây nông nghiệp chưa xác định";
      }

      // Create image parts for each captured image
      const imageParts = capturedImages.map(img => ({
        inlineData: { data: img, mimeType: 'image/jpeg' }
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            ...imageParts,
            { 
              text: `Bạn là một chuyên gia bệnh lý thực vật (Plant Pathologist). 
              Tôi cung cấp cho bạn ${capturedImages.length} hình ảnh về cùng một mẫu cây: ${plantContext}.
              Hãy quan sát kỹ từng góc độ để đưa ra chẩn đoán chính xác nhất.
              Nhiệm vụ:
              1. Phân tích tổng hợp các dấu hiệu bệnh lý, sâu hại hoặc thiếu hụt dinh dưỡng từ tất cả các hình ảnh.
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
          <span className="text-[10px] font-black text-primary tracking-[0.2em] uppercase">Gofam Pro Multi-Vision</span>
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
             Phân tích {capturedImages.length} ảnh {activePlantDisplayName}...
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-2">
            <p className="text-white font-bold text-sm tracking-wide">
              {capturedImages.length > 0 ? `Đã thêm ${capturedImages.length} ảnh` : 'Chụp các góc lá khác nhau để phân tích chính xác hơn'}
            </p>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Sử dụng đa góc nhìn - Gemini 2.5 Pro</p>
          </div>
        )}
      </div>

      <div className="relative z-10 p-6 bg-gradient-to-t from-black via-black/95 to-transparent">
        {/* Captured Images Preview */}
        {capturedImages.length > 0 && (
          <div className="mb-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {capturedImages.map((img, idx) => (
                <div key={idx} className="relative size-16 shrink-0 rounded-xl overflow-hidden border border-white/20 group">
                  <img src={`data:image/jpeg;base64,${img}`} className="w-full h-full object-cover" alt={`Capture ${idx}`} />
                  <button 
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 size-5 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-symbols-outlined !text-xs">close</span>
                  </button>
                </div>
              ))}
              {capturedImages.length > 0 && !isScanning && (
                <button 
                  onClick={handleScan}
                  className="shrink-0 size-16 rounded-xl bg-primary flex flex-col items-center justify-center text-black font-black text-[10px] uppercase gap-1 shadow-glow"
                >
                  <span className="material-symbols-outlined !text-xl">analytics</span>
                  Quét
                </button>
              )}
            </div>
          </div>
        )}

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

        {/* Custom Plant Name Input */}
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
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileUpload} 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="size-14 rounded-2xl bg-white/5 overflow-hidden border border-white/10 group cursor-pointer active:scale-95 transition-all flex items-center justify-center text-white/60"
          >
            <span className="material-symbols-outlined !text-2xl">upload_file</span>
          </button>

          <button 
            onClick={captureFrame} 
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
