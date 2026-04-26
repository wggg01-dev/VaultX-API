import { createContext, useContext, useState, useCallback } from "react";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface ApiLogEntry {
  id: string;
  method: HttpMethod;
  endpoint: string;
  status: number;
  ms: number;
  time: Date;
}

interface ApiLogContextValue {
  logs: ApiLogEntry[];
  addLog: (entry: Omit<ApiLogEntry, "id" | "time">) => void;
  clear: () => void;
}

const ApiLogContext = createContext<ApiLogContextValue>({
  logs: [],
  addLog: () => {},
  clear: () => {},
});

export function ApiLogProvider({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<ApiLogEntry[]>([]);

  const addLog = useCallback((entry: Omit<ApiLogEntry, "id" | "time">) => {
    setLogs(prev =>
      [{ ...entry, id: Math.random().toString(36).slice(2), time: new Date() }, ...prev].slice(0, 30)
    );
  }, []);

  const clear = useCallback(() => setLogs([]), []);

  return (
    <ApiLogContext.Provider value={{ logs, addLog, clear }}>
      {children}
    </ApiLogContext.Provider>
  );
}

export const useApiLog = () => useContext(ApiLogContext);

export function useApiEvent() {
  const { addLog } = useApiLog();

  const fire = useCallback(
    (method: HttpMethod, endpoint: string, delayMs = 0, fixedMs?: number): number => {
      const ms = fixedMs ?? Math.floor(Math.random() * 260 + 55);
      setTimeout(() => addLog({ method, endpoint, status: 200, ms }), delayMs);
      return ms;
    },
    [addLog]
  );

  return fire;
}
