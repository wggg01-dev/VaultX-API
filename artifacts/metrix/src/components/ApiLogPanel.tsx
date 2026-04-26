import { useState, useEffect, useRef } from "react";
import { Terminal, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useApiLog, type HttpMethod } from "../context/ApiLogContext";

const METHOD_STYLE: Record<HttpMethod, { bg: string; text: string }> = {
  GET:    { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  POST:   { bg: "bg-blue-500/20",    text: "text-blue-400" },
  PUT:    { bg: "bg-yellow-500/20",  text: "text-yellow-400" },
  DELETE: { bg: "bg-red-500/20",     text: "text-red-400" },
  PATCH:  { bg: "bg-orange-500/20",  text: "text-orange-400" },
};

function statusColor(s: number) {
  if (s < 300) return "text-emerald-400";
  if (s < 500) return "text-yellow-400";
  return "text-red-400";
}

function hhmmss(d: Date) {
  return d.toTimeString().slice(0, 8);
}

export function ApiLogPanel() {
  const { logs, clear } = useApiLog();
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);
  const prevLen = useRef(0);

  useEffect(() => {
    if (logs.length > prevLen.current) {
      setPulse(true);
      prevLen.current = logs.length;
      const t = setTimeout(() => setPulse(false), 800);
      return () => clearTimeout(t);
    }
  }, [logs.length]);

  return (
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col items-end gap-2 select-none">
      {open && (
        <div
          className="w-[360px] rounded-2xl overflow-hidden shadow-2xl border border-white/8"
          style={{ background: "#070b14" }}
        >
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${pulse ? "animate-ping bg-emerald-400" : "bg-emerald-500"}`} />
              <span className="text-xs font-bold text-white/90 font-mono tracking-widest">VAULTX API</span>
              <span className="text-[10px] text-white/25 font-mono bg-white/5 px-1.5 py-0.5 rounded">v1</span>
            </div>
            <button
              onClick={clear}
              className="text-white/20 hover:text-white/50 transition-colors p-1"
              title="Clear logs"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-[280px] overflow-y-auto p-2 space-y-px" style={{ fontFamily: "ui-monospace, 'Cascadia Code', monospace" }}>
            {logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 opacity-30">
                <Terminal className="w-8 h-8 text-white/40" />
                <p className="text-[11px] text-white/40">Waiting for API calls…</p>
              </div>
            ) : (
              logs.map((log, idx) => {
                const m = METHOD_STYLE[log.method];
                return (
                  <div
                    key={log.id}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] transition-colors ${
                      idx === 0 ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className="text-white/20 flex-shrink-0 text-[9px] w-16">{hhmmss(log.time)}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold flex-shrink-0 w-10 text-center ${m.bg} ${m.text}`}>
                      {log.method}
                    </span>
                    <span className="text-white/75 flex-1 truncate">{log.endpoint}</span>
                    <span className="text-white/25 text-[10px] flex-shrink-0">→</span>
                    <span className={`font-bold flex-shrink-0 ${statusColor(log.status)}`}>{log.status}</span>
                    <span className="text-white/30 flex-shrink-0 text-[10px] w-12 text-right">{log.ms}ms</span>
                  </div>
                );
              })
            )}
          </div>

          <div className="px-4 py-2 border-t border-white/8 flex items-center justify-between">
            <span className="text-[10px] text-white/20 font-mono">{logs.length} req{logs.length !== 1 ? "s" : ""}</span>
            <span className="text-[10px] text-white/20 font-mono">TLS 1.3 · AES-256-GCM</span>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl shadow-2xl border border-white/10 backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-150"
        style={{ background: "rgba(7,11,20,0.92)" }}
      >
        <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${
          pulse ? "bg-emerald-400 animate-ping" : logs.length > 0 ? "bg-emerald-500" : "bg-white/15"
        }`} />
        <span className="text-xs font-bold text-white/80 font-mono tracking-wider">API</span>
        {logs.length > 0 && (
          <span className="text-[10px] font-bold bg-blue-500/25 text-blue-300 rounded-full px-1.5 font-mono min-w-[18px] text-center">
            {logs.length}
          </span>
        )}
        {open
          ? <ChevronDown className="w-3 h-3 text-white/30" />
          : <ChevronUp className="w-3 h-3 text-white/30" />
        }
      </button>
    </div>
  );
}
