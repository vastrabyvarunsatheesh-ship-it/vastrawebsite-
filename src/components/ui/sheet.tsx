"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  side?: "left" | "right";
  children: React.ReactNode;
  className?: string;
}

export const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  title,
  side = "right",
  children,
  className,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-obsidian/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-50 flex h-full w-full max-w-md flex-col bg-ivory text-obsidian shadow-2xl transition-transform duration-300 ease-in-out",
          side === "right" ? "ml-auto" : "mr-auto",
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-obsidian/10 px-6 py-4">
          {title && (
            <h2 className="font-serif text-lg font-semibold tracking-wider text-obsidian uppercase">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="rounded-full p-2 text-obsidian/60 transition-colors hover:bg-obsidian/5 hover:text-obsidian"
            aria-label="Close panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};
