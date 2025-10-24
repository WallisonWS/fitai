"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Camera, Image as ImageIcon, HelpCircle } from 'lucide-react';
import { BottomNavigation } from '@/components/layout/BottomNavigation';

export default function ScannerPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setHasPermission(true);
      }
    } catch (err) {
      console.error('Erro ao acessar câmera:', err);
      setError('Não foi possível acessar a câmera. Verifique as permissões.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            // TODO: Enviar para API de reconhecimento
            alert('Foto capturada! Funcionalidade de reconhecimento em desenvolvimento.');
          }
        }, 'image/jpeg');
      }
    }
  };

  const selectFromGallery = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // TODO: Processar imagem da galeria
        alert('Imagem selecionada! Funcionalidade de reconhecimento em desenvolvimento.');
      }
    };
    input.click();
  };

  return (
    <div className="fixed inset-0 bg-black">
      {/* Vídeo da câmera */}
      <div className="absolute inset-0">
        {hasPermission ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-white text-center px-4">
              {error || 'Aguardando permissão da câmera...'}
            </p>
          </div>
        )}
      </div>

      {/* Canvas oculto para captura */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Overlay de scanner */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="relative w-full max-w-sm aspect-square">
            {/* Cantos do frame */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-white rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-white rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white rounded-br-2xl" />
          </div>
        </div>
      </div>

      {/* Botões superiores */}
      <div className="absolute top-0 left-0 right-0 safe-area-inset-top z-10 flex items-center justify-between p-4">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
        >
          <X className="w-6 h-6" />
        </button>
        <button
          onClick={() => alert('Ajuda: Posicione o alimento dentro do quadro e tire a foto.')}
          className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
        >
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Botões de ação inferiores */}
      <div className="absolute bottom-24 left-0 right-0 z-10 px-4">
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          <button
            onClick={capturePhoto}
            className="bg-[#FFE6F0] hover:bg-[#FFD6E6] active:scale-95 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-lg"
          >
            <Camera className="w-6 h-6 text-black" />
            <span className="text-sm font-medium text-black">
              Escanear Alimento
            </span>
          </button>
          <button
            onClick={selectFromGallery}
            className="bg-[#FFE6F0] hover:bg-[#FFD6E6] active:scale-95 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-lg"
          >
            <ImageIcon className="w-6 h-6 text-black" />
            <span className="text-sm font-medium text-black">
              Galeria
            </span>
          </button>
        </div>
      </div>

      {/* Navegação inferior */}
      <BottomNavigation />
    </div>
  );
}

