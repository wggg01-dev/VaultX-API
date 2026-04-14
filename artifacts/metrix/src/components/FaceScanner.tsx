import { useEffect, useState } from "react";

interface FaceScannerProps {
  onComplete: () => void;
  isScanning: boolean;
}

export function FaceScanner({ onComplete, isScanning }: FaceScannerProps) {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState<{ x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    const randomDots = Array.from({ length: 30 }, (_, i) => ({
      x: 20 + Math.random() * 60,
      y: 15 + Math.random() * 70,
      delay: i * 0.08,
    }));
    setDots(randomDots);
  }, []);

  useEffect(() => {
    if (!isScanning) return;
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isScanning, onComplete]);

  return (
    <div className="relative w-64 h-72 mx-auto">
      <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" style={{ borderRadius: "50% 50% 45% 45%" }} />
      <div className="absolute inset-2 rounded-full border border-primary/40" style={{ borderRadius: "50% 50% 45% 45%" }} />

      <div
        className="face-scanner relative w-full h-full flex items-center justify-center"
        style={{ borderRadius: "50% 50% 45% 45%", overflow: "hidden", background: "linear-gradient(180deg, hsl(221 83% 97%) 0%, hsl(221 83% 92%) 100%)" }}
      >
        <svg viewBox="0 0 100 110" className="w-48 h-52 opacity-20">
          <ellipse cx="50" cy="45" rx="28" ry="32" fill="hsl(221 83% 47%)" />
          <ellipse cx="50" cy="100" rx="38" ry="20" fill="hsl(221 83% 47%)" />
        </svg>

        {isScanning && dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              animation: `fade-up 0.3s ease-out ${dot.delay}s both`,
              opacity: progress > dot.delay * 100 ? 1 : 0,
              boxShadow: "0 0 4px hsl(221 83% 47%)",
            }}
          />
        ))}
      </div>

      <div className="absolute -inset-3 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" style={{ borderRadius: "50% 50% 45% 45%" }} />

      {isScanning && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full gradient-primary rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-xs text-muted-foreground mt-1">{progress}%</p>
        </div>
      )}

      <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-primary rounded-tl-sm" />
      <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-primary rounded-tr-sm" />
      <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-primary rounded-bl-sm" />
      <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-primary rounded-br-sm" />
    </div>
  );
}
