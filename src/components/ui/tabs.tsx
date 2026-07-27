"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTabId, className }) => {
  const [activeTab, setActiveTab] = React.useState(defaultTabId || tabs[0]?.id);

  return (
    <div className={cn("w-full space-y-6", className)}>
      <div className="flex border-b border-obsidian/10 space-x-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-3 text-xs uppercase tracking-widest font-medium transition-all relative whitespace-nowrap",
                isActive
                  ? "text-gold-600 font-semibold"
                  : "text-obsidian/60 hover:text-obsidian"
              )}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400 animate-fade-in" />
              )}
            </button>
          );
        })}
      </div>
      <div>
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
};
