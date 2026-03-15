import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { Mic, MicOff, MessageSquare, X, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SolarAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>("");
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sessionRef = useRef<any>(null);
  const audioQueue = useRef<Int16Array[]>([]);
  const isPlayingRef = useRef(false);

  const toggleAssistant = () => setIsOpen(!isOpen);

  const startSession = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const sessionPromise = ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-09-2025",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: "You are a helpful solar energy expert for Dharmdhari Sons. Your goal is to explain the benefits of switching from LPG to solar-powered induction cooking. Mention the PM Surya Ghar scheme, ₹78,000 subsidy, and 30 years of free electricity. Be encouraging and professional. Speak in a mix of Hindi and English as appropriate for an Indian audience.",
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            startAudioCapture();
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.modelTurn?.parts[0]?.inlineData?.data) {
              const base64Audio = message.serverContent.modelTurn.parts[0].inlineData.data;
              const binaryString = atob(base64Audio);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
              }
              const pcmData = new Int16Array(bytes.buffer);
              audioQueue.current.push(pcmData);
              if (!isPlayingRef.current) {
                playNextInQueue();
              }
            }

            if (message.serverContent?.interrupted) {
              audioQueue.current = [];
              isPlayingRef.current = false;
            }

            if (message.serverContent?.modelTurn?.parts[0]?.text) {
                setAiResponse(prev => prev + message.serverContent?.modelTurn?.parts[0]?.text);
            }
          },
          onclose: () => {
            setIsConnected(false);
            stopAudioCapture();
          },
          onerror: (error) => {
            console.error("Live API Error:", error);
            setIsConnected(false);
          }
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (error) {
      console.error("Failed to connect to Live API:", error);
    }
  };

  const startAudioCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;
      
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        // Convert Float32 to Int16 PCM
        const pcmData = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
        }
        
        if (sessionRef.current && isConnected) {
          const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
          sessionRef.current.sendRealtimeInput({
            media: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
          });
        }
      };

      source.connect(processor);
      processor.connect(audioContext.destination);
      setIsListening(true);
    } catch (error) {
      console.error("Error capturing audio:", error);
    }
  };

  const stopAudioCapture = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    processorRef.current?.disconnect();
    audioContextRef.current?.close();
    setIsListening(false);
  };

  const playNextInQueue = async () => {
    if (audioQueue.current.length === 0) {
      isPlayingRef.current = false;
      return;
    }

    isPlayingRef.current = true;
    const pcmData = audioQueue.current.shift()!;
    
    if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext({ sampleRate: 24000 });
    }
    
    const buffer = audioContextRef.current.createBuffer(1, pcmData.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < pcmData.length; i++) {
      channelData[i] = pcmData[i] / 0x7FFF;
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    source.onended = playNextInQueue;
    source.start();
  };

  const handleConnect = () => {
    if (isConnected) {
      sessionRef.current?.close();
    } else {
      startSession();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden border border-orange-100"
          >
            <div className="bg-orange-500 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <h3 className="font-semibold">Solar Expert Assistant</h3>
              </div>
              <button onClick={toggleAssistant} className="hover:bg-orange-600 p-1 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4 h-96 overflow-y-auto bg-orange-50/30">
              {!isConnected ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="bg-orange-100 p-4 rounded-full">
                    <MessageSquare size={32} className="text-orange-500" />
                  </div>
                  <p className="text-gray-600 text-sm">
                    Have questions about Solar Panels or Induction Cooking? Talk to our AI expert!
                  </p>
                  <button
                    onClick={handleConnect}
                    className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition-colors"
                  >
                    Start Conversation
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className={`p-6 rounded-full ${isListening ? 'bg-orange-500 animate-pulse' : 'bg-gray-200'} text-white mb-4`}>
                      <Mic size={32} />
                    </div>
                    <p className="text-orange-600 font-medium">
                      {isListening ? "Listening..." : "Connecting..."}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl border border-orange-100 shadow-sm">
                    <p className="text-xs text-orange-400 uppercase font-bold mb-2 tracking-wider">AI Expert</p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {aiResponse || "I'm ready to help you switch to solar! Ask me anything about subsidies or induction cooking."}
                    </p>
                  </div>

                  <button
                    onClick={handleConnect}
                    className="w-full bg-red-500 text-white px-6 py-2 rounded-full font-medium hover:bg-red-600 transition-colors"
                  >
                    End Call
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleAssistant}
        className="bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && <span className="font-medium pr-2">Ask Solar Expert</span>}
      </motion.button>
    </div>
  );
}
