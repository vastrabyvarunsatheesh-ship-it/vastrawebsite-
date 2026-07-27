import * as React from "react";

export const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ivory/90 backdrop-blur-md">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-2 border-gold-400/20" />
        <div className="absolute inset-0 rounded-full border-2 border-t-gold-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      <p className="mt-4 font-serif text-xs tracking-widest text-obsidian/70 uppercase">
        VASTRA BY VARUN
      </p>
    </div>
  );
};
