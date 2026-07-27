import * as React from "react";
import Link from "next/link";
import { Container } from "../common/container";
import { Button } from "../ui/button";
import { LuxuryImage } from "../common/luxury-image";

export const PromoBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-obsidian py-24 text-ivory">
      <div className="absolute inset-0 z-0">
        <LuxuryImage
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600"
          alt="Artisanal Handwoven Heritage"
          fill
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-xl space-y-6">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-400 uppercase border-b border-gold-400/40 pb-1">
            Artisanal Heritage & Craftsmanship
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-wide text-ivory leading-tight">
            THE ART OF WEAVING SILK & ZARI
          </h2>
          <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-sans">
            Every Vastra creation is a testimony to centuries-old Indian weaving traditions. From pure mulberry silk yarns to hand-worked real gold zari borders, discover true timeless luxury.
          </p>
          <div className="pt-2">
            <Link href="/category/sarees?collection=heritage">
              <Button variant="gold" size="lg">
                Explore Heritage Collection
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
