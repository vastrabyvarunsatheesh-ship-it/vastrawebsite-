import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse bg-obsidian/10 relative overflow-hidden", className)}
      {...props}
    />
  );
}

export { Skeleton };
