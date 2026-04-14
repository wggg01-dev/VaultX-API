import { useEffect, useState } from "react";

interface FingerprintScannerProps {
  onComplete: () => void;
  isScanning: boolean;
}

export function FingerprintScanner({ onComplete, isScanning }: FingerprintScannerProps) {
  const [progress, setProgress] = useState(0);
  const [fillColor, setFillColor] = useState("hsl(221 83% 47% / 0.1)");

  useEffect(() => {
    if (!isScanning) return;
    let p = 0;
    const interval = setInterval(() => {
      p += 1.5;
      setProgress(Math.min(p, 100));
      setFillColor(`hsl(221 83% 47% / ${p / 100 * 0.6})`);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [isScanning, onComplete]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {isScanning && (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: "1.5s" }} />
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
          </>
        )}
        <div className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${isScanning ? "bg-primary/10 shadow-lg shadow-primary/30" : "bg-muted"}`}>
          <svg
            viewBox="0 0 100 100"
            className="w-20 h-20"
            style={{ filter: isScanning ? "drop-shadow(0 0 8px hsl(221 83% 47% / 0.5))" : "none" }}
          >
            <defs>
              <clipPath id="fill-clip">
                <rect x="0" y={100 - progress} width="100" height={progress} />
              </clipPath>
            </defs>
            <path
              d="M50 10 C30 10 15 25 15 45 C15 65 30 80 50 80 C70 80 85 65 85 45"
              fill="none"
              stroke="hsl(221 83% 47% / 0.2)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M50 10 C30 10 15 25 15 45 C15 65 30 80 50 80 C70 80 85 65 85 45"
              fill="none"
              stroke="hsl(221 83% 47%)"
              strokeWidth="3"
              strokeLinecap="round"
              clipPath="url(#fill-clip)"
            />
            {[20, 28, 36, 44, 52, 60].map((offset, i) => (
              <ellipse
                key={i}
                cx="50"
                cy="50"
                rx={8 + i * 6}
                ry={6 + i * 5}
                fill="none"
                stroke="hsl(221 83% 47% / 0.2)"
                strokeWidth="1.5"
              />
            ))}
            {[20, 28, 36, 44, 52, 60].map((offset, i) => (
              <ellipse
                key={`fill-${i}`}
                cx="50"
                cy="50"
                rx={8 + i * 6}
                ry={6 + i * 5}
                fill="none"
                stroke="hsl(221 83% 47%)"
                strokeWidth="1.5"
                clipPath="url(#fill-clip)"
                style={{ transition: "all 0.1s" }}
              />
            ))}
            <circle cx="50" cy="50" r="3" fill={isScanning ? "hsl(221 83% 47%)" : "hsl(221 83% 47% / 0.3)"} />
            <path d="M35 30 C35 30 40 20 50 20 C60 20 65 30 65 30" fill="none" stroke="hsl(221 83% 47% / 0.2)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M30 40 C30 40 32 28 50 28 C68 28 70 40 70 40" fill="none" stroke="hsl(221 83% 47% / 0.2)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M25 50 C25 50 25 35 50 35 C75 35 75 50 75 50" fill="none" stroke="hsl(221 83% 47% / 0.2)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M35 30 C35 30 40 20 50 20 C60 20 65 30 65 30" fill="none" stroke="hsl(221 83% 47%)" strokeWidth="1.5" strokeLinecap="round" clipPath="url(#fill-clip)" />
            <path d="M30 40 C30 40 32 28 50 28 C68 28 70 40 70 40" fill="none" stroke="hsl(221 83% 47%)" strokeWidth="1.5" strokeLinecap="round" clipPath="url(#fill-clip)" />
            <path d="M25 50 C25 50 25 35 50 35 C75 35 75 50 75 50" fill="none" stroke="hsl(221 83% 47%)" strokeWidth="1.5" strokeLinecap="round" clipPath="url(#fill-clip)" />
          </svg>
        </div>
      </div>

      {isScanning && (
        <div className="w-48 animate-fade-up">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full gradient-primary rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">{Math.round(progress)}% verified</p>
        </div>
      )}
    </div>
  );
}
