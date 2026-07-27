import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium tracking-wider uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.99]",
  {
    variants: {
      variant: {
        default:
          "bg-obsidian text-ivory shadow-md hover:bg-gold-400 hover:text-obsidian hover:shadow-luxury",
        gold:
          "bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 text-obsidian font-semibold shadow-luxury hover:brightness-110",
        outline:
          "border border-obsidian/20 bg-transparent text-obsidian hover:border-gold-400 hover:bg-gold-50/50 hover:text-gold-700",
        goldOutline:
          "border border-gold-400/60 bg-transparent text-gold-400 hover:bg-gold-400 hover:text-obsidian",
        ghost:
          "text-obsidian hover:bg-obsidian/5 hover:text-gold-600",
        link:
          "text-obsidian underline-offset-4 hover:underline hover:text-gold-500",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
