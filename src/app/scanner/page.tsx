'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Camera, Image as ImageIcon, HelpCircle, Loader2 } from 'lucide-react';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { useFoodContext } from '@/contexts/FoodContext';
import { useToast } from '@/hooks/use-toast';

export default function ScannerPage() {
  const router = useRouter();
  const { addMeal } = useFoodContext();
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
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

  const analyzeFood = async (imageData: string) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze-food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });

      if (!response.ok) {
        throw new Error('Erro ao analisar alimento');
      }

      const foodData = await response.json();

      // Criar objeto de refeição
      const meal = {
        id: Date.now().toString(),
        name: foodData.name,
        time: new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        image: imageData,
        calories: Math.round(foodData.calories),
        protein: Math.round(foodData.protein),
        carbs: Math.round(foodData.carbs),
        fat: Math.round(foodData.fat),
        healthScore: foodData.healthScore,
        ingredients: foodData.ingredients,
      };

      // Adicionar refeição ao contexto
      addMeal(meal);

      toast({
        title: 'Alimento analisado!',
        description: `${meal.name} - ${meal.calories} kcal`,
      });

      // Redirecionar para a página de detalhes
      setTimeout(() => {
        router.push(`/meal/${meal.id}`);
      }, 500);
    } catch (error) {
      console.error('Erro ao analisar alimento:', error);
      toast({
        title: 'Erro ao analisar',
        description: 'Tente novamente com outra foto',
        variant: 'destructive',
      });
      setCapturedImage(null);
      setIsAnalyzing(false);
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

        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
        stopCamera();
        analyzeFood(imageData);
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
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageData = event.target?.result as string;
          setCapturedImage(imageData);
          stopCamera();
          analyzeFood(imageData);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setIsAnalyzing(false);
    startCamera();
  };

  return (
    <div className="fixed inset-0 bg-black">
      {/* Vídeo da câmera ou imagem capturada */}
      <div className="absolute inset-0">
        {capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured food"
            className="w-full h-full object-cover"
          />
        ) : hasPermission ? (
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

      {/* Overlay de scanner (só aparece quando não está analisando) */}
      {!capturedImage && !isAnalyzing && (
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
      )}

      {/* Loading overlay */}
      {isAnalyzing && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
          <div className="bg-white rounded-3xl p-8 flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-pink-500" />
            <p className="text-lg font-semibold">Analisando alimento...</p>
            <p className="text-sm text-gray-600">Aguarde alguns segundos</p>
          </div>
        </div>
      )}

      {/* Botões superiores */}
      <div className="absolute top-0 left-0 right-0 safe-area-inset-top z-10 flex items-center justify-between p-4">
        <button
          onClick={() => {
            stopCamera();
            router.back();
          }}
          className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
          disabled={isAnalyzing}
        >
          <X className="w-6 h-6" />
        </button>
        <button
          onClick={() => toast({
            title: 'Ajuda',
            description: 'Posicione o alimento dentro do quadro e tire a foto.',
          })}
          className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
        >
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Botões de ação inferiores */}
      <div className="absolute bottom-24 left-0 right-0 z-10 px-4">
        {!capturedImage && !isAnalyzing && (
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            <button
              onClick={capturePhoto}
              disabled={!hasPermission}
              className="bg-[#FFE6F0] hover:bg-[#FFD6E6] active:scale-95 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50"
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
        )}

        {capturedImage && !isAnalyzing && (
          <div className="max-w-sm mx-auto">
            <button
              onClick={retakePhoto}
              className="w-full bg-[#FFE6F0] hover:bg-[#FFD6E6] active:scale-95 rounded-2xl p-4 font-semibold transition-all shadow-lg"
            >
              Tirar Outra Foto
            </button>
          </div>
        )}
      </div>

      {/* Navegação inferior */}
      <BottomNavigation />
    </div>
  );
}

