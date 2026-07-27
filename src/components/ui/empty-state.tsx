import * as React from "react";
import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <PackageOpen className="h-12 w-12 text-gold-400" />,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center border border-dashed border-obsidian/20 bg-ivory-warm",
        className
      )}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="font-serif text-xl font-medium tracking-wide text-obsidian uppercase">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-xs max-w-sm text-obsidian/60 leading-relaxed font-sans">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button variant="gold" className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
