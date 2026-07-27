import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="inline-flex items-center space-x-3 cursor-pointer select-none">
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            "h-4 w-4 rounded border-obsidian/30 text-gold-500 focus:ring-gold-400 accent-gold-500",
            className
          )}
          {...props}
        />
        {label && <span className="text-xs uppercase tracking-wider text-obsidian">{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
