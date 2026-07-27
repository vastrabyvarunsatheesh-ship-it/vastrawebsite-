"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextType {
  toast: (title: string, description?: string, type?: ToastType) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const toast = React.useCallback(
    (title: string, description?: string, type: ToastType = "info") => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "flex items-start justify-between p-4 shadow-luxury border backdrop-blur-md transition-all duration-300 animate-fade-in",
              t.type === "success" && "bg-ivory border-gold-400 text-obsidian",
              t.type === "error" && "bg-obsidian border-red-500 text-ivory",
              t.type === "info" && "bg-ivory border-obsidian/20 text-obsidian"
            )}
          >
            <div className="flex items-start space-x-3">
              {t.type === "success" && <CheckCircle2 className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />}
              {t.type === "error" && <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />}
              {t.type === "info" && <Info className="h-5 w-5 text-obsidian/60 shrink-0 mt-0.5" />}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider">{t.title}</h4>
                {t.description && <p className="text-xs opacity-80 mt-1">{t.description}</p>}
              </div>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="opacity-60 hover:opacity-100 transition-opacity p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
