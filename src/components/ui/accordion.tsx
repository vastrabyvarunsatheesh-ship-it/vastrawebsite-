"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className,
}) => {
  const [openIds, setOpenIds] = React.useState<string[]>([]);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("divide-y divide-obsidian/10 border-t border-b border-obsidian/10", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-4">
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between text-left text-sm font-medium uppercase tracking-wider text-obsidian hover:text-gold-600 transition-colors"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-obsidian/60 transition-transform duration-300",
                  isOpen && "rotate-180 text-gold-500"
                )}
              />
            </button>
            {isOpen && (
              <div className="mt-3 text-xs leading-relaxed text-obsidian/70 animate-fade-in">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
