import * as React from "react";
import { ShieldCheck, Truck, RotateCcw, Scissors } from "lucide-react";
import { Container } from "../common/container";

const FEATURES = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-gold-500" />,
    title: "100% Authentic Handloom",
    description: "Certified Pure Silk Mark and authentic artisanal weaves.",
  },
  {
    icon: <Truck className="h-8 w-8 text-gold-500" />,
    title: "Complimentary Express Delivery",
    description: "Insured shipping across 20,000+ PIN codes in India and globally.",
  },
  {
    icon: <RotateCcw className="h-8 w-8 text-gold-500" />,
    title: "Hassle-Free Returns",
    description: "7-day easy return policy with dedicated concierge support.",
  },
  {
    icon: <Scissors className="h-8 w-8 text-gold-500" />,
    title: "Bespoke Blouse Tailoring",
    description: "Custom stitching services by our master atelier tailors.",
  },
];

export const TrustFeatures: React.FC = () => {
  return (
    <section className="border-t border-b border-obsidian/10 bg-ivory-warm py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-4 space-y-3 border-r last:border-r-0 border-obsidian/10"
            >
              <div className="p-3 rounded-full bg-gold-400/10 mb-1">{feat.icon}</div>
              <h3 className="font-serif text-sm font-semibold tracking-wider text-obsidian uppercase">
                {feat.title}
              </h3>
              <p className="text-xs text-obsidian/60 leading-relaxed max-w-xs font-sans">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
