
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';

interface Props { onBack: () => void; }

const LiveAssistant: React.FC<Props> = ({ onBack }) => {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking' | 'error'>('idle');
  const [transcript, setTranscript] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const aiRef = useRef<any>(null);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());
  const streamRef = useRef<MediaStream | null>(null);

  const startSession = async () => {
    setStatus('connecting');
    setErrorMsg('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      aiRef.current = ai;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputAudioContext;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setStatus('listening');
            const source = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            
            if (message.serverContent?.outputTranscription) {
              setTranscript(prev => prev + message.serverContent!.outputTranscription!.text);
            }

            if (base64EncodedAudioString) {
              setStatus('speaking');
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContext.currentTime);
              const audioBuffer = await decodeAudioData(
                decode(base64EncodedAudioString),
                outputAudioContext,
                24000,
                1,
              );
              const source = outputAudioContext.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputAudioContext.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setStatus('listening');
              });

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current = nextStartTimeRef.current + audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              for (const source of sourcesRef.current.values()) {
                source.stop();
                sourcesRef.current.delete(source);
              }
              nextStartTimeRef.current = 0;
              setStatus('listening');
            }
          },
          onerror: (e: any) => {
            console.error('Live API Error:', e);
            setStatus('error');
            setErrorMsg('Lỗi kết nối âm thanh.');
          },
          onclose: () => {
            setStatus('idle');
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: 'Bạn là chuyên gia tư vấn nông nghiệp rảnh tay GOFAM Pro. Trả lời người nông dân bằng giọng nói thân thiện, ngắn gọn và hữu ích. Bạn có thể tư vấn về thời tiết, sâu bệnh và điều khiển thiết bị IoT.',
          outputAudioTranscription: {},
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('Không thể truy cập Microphone.');
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setStatus('idle');
    setTranscript('');
  };

  function createBlob(data: Float32Array): Blob {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  }

  function encode(bytes: Uint8Array) {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }

  return (
    <div className="h-screen w-full flex flex-col bg-background-dark font-display text-white overflow-hidden relative">
      {/* Wave Background */}
      <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center">
         <div className={`w-[200%] h-[200%] border-[2px] border-primary rounded-full animate-ping ${status === 'idle' ? 'hidden' : ''}`}></div>
      </div>

      <header className="relative z-10 flex items-center p-6 pt-12 justify-between bg-gradient-to-b from-background-dark to-transparent">
        <button onClick={onBack} className="size-11 rounded-full bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-all">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="text-center">
           <h1 className="text-xl font-black uppercase tracking-tighter">Live AI Assistant</h1>
           <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] animate-pulse">{status === 'listening' ? 'Đang lắng nghe...' : status === 'speaking' ? 'Trợ lý đang nói...' : 'Sẵn sàng'}</p>
        </div>
        <div className="size-11"></div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 p-8">
        {/* Core Visualizer */}
        <div className="relative size-64 flex items-center justify-center">
           <div className={`absolute inset-0 rounded-full border-4 border-primary/20 shadow-glow transition-all duration-500 ${status === 'listening' ? 'scale-110 border-primary/40' : status === 'speaking' ? 'scale-125 border-primary animate-pulse' : 'scale-100'}`}></div>
           <div className="relative size-48 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
              <span className={`material-symbols-outlined !text-[100px] transition-all duration-500 ${status === 'speaking' ? 'text-primary scale-110 drop-shadow-glow' : 'text-gray-500'}`}>
                {status === 'speaking' ? 'graphic_eq' : status === 'listening' ? 'keyboard_voice' : 'smart_toy'}
              </span>
              
              {/* Waveform overlays */}
              <div className={`absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-primary/20 to-transparent flex items-end justify-center gap-1.5 pb-4 px-4 ${status === 'idle' ? 'opacity-0' : 'opacity-100'}`}>
                 {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className={`w-1 bg-primary rounded-full transition-all duration-200 ${status === 'speaking' ? 'animate-bounce h-12' : status === 'listening' ? 'h-4' : 'h-1'}`} style={{ animationDelay: `${i * 0.1}s` }}></div>
                 ))}
              </div>
           </div>
        </div>

        {/* Transcript Box */}
        <div className="mt-12 w-full max-w-sm bg-surface-dark/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 min-h-[120px] shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
           <p className="text-xs font-black text-primary uppercase tracking-widest mb-2 opacity-60">Transcript Live</p>
           <p className="text-sm font-medium leading-relaxed italic text-gray-300">
             {transcript || (status === 'listening' ? 'Nói gì đó để bắt đầu...' : status === 'idle' ? 'Nhấn nút mic bên dưới để bắt đầu hội thoại rảnh tay.' : '')}
           </p>
        </div>

        {errorMsg && (
          <div className="mt-4 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-[10px] font-black uppercase tracking-widest animate-shake">
            {errorMsg}
          </div>
        )}
      </main>

      {/* Control Area */}
      <div className="relative z-10 p-10 pb-16 flex flex-col items-center">
         {status === 'idle' || status === 'error' ? (
           <button 
             onClick={startSession}
             className="size-20 rounded-full bg-primary text-black shadow-glow flex items-center justify-center active:scale-90 transition-all hover:scale-110"
           >
             <span className="material-symbols-outlined !text-4xl font-black">mic</span>
           </button>
         ) : (
           <button 
             onClick={stopSession}
             className="size-20 rounded-full bg-red-500 text-white shadow-lg shadow-red-500/30 flex items-center justify-center active:scale-90 transition-all hover:scale-110"
           >
             <span className="material-symbols-outlined !text-4xl font-black">stop</span>
           </button>
         )}
         <p className="mt-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Hội thoại thời gian thực</p>
      </div>

      <style>{`
        .shadow-glow { box-shadow: 0 0 30px rgba(19, 236, 73, 0.4); }
        .drop-shadow-glow { filter: drop-shadow(0 0 10px rgba(19, 236, 73, 0.6)); }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default LiveAssistant;
