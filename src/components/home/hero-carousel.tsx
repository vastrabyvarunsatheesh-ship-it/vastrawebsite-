"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { LuxuryImage } from "../common/luxury-image";

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  imageUrl: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: "slide_1",
    title: "ROYAL HERITAGE KANJEEVARAM",
    subtitle: "COUTURE SAREE COLLECTION",
    description: "Handcrafted pure mulberry silk woven with pure zari brocade by master weavers of Kanchipuram.",
    ctaText: "Shop Kanjeevaram",
    ctaHref: "/category/sarees?fabric=kanjeevaram",
    secondaryCtaText: "Explore Sarees",
    secondaryCtaHref: "/category/sarees",
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600",
  },
  {
    id: "slide_2",
    title: "ARTISANAL EMBELLISHED ANARKALIS",
    subtitle: "FESTIVE KURTIS & SUITS",
    description: "Floor-length Chanderi Silk Anarkalis with intricate Gota Patti & Zardozi hand-embroidery.",
    ctaText: "Shop Anarkali Suits",
    ctaHref: "/category/kurtis?style=anarkali",
    secondaryCtaText: "View All Kurtis",
    secondaryCtaHref: "/category/kurtis",
    imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1600",
  },
  {
    id: "slide_3",
    title: "UNSTITCHED CHANDERI FABRICS",
    subtitle: "LUXURY DRESS MATERIALS",
    description: "Pure silk & cotton dress material sets paired with handblock printed organza dupattas.",
    ctaText: "Shop Dress Materials",
    ctaHref: "/category/dress-materials",
    secondaryCtaText: "Bespoke Atelier",
    secondaryCtaHref: "/atelier",
    imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1600",
  },
];

export const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = HERO_SLIDES[currentIndex];

  return (
    <div className="relative h-[85vh] min-h-[550px] max-h-[800px] w-full overflow-hidden bg-obsidian text-ivory">
      {/* Background Image Display */}
      <div className="absolute inset-0 z-0">
        <LuxuryImage
          src={slide.imageUrl}
          alt={slide.title}
          fill
          priority
          className="object-cover object-top opacity-60 transition-transform duration-1000 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/60 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            <span className="inline-block text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase border-b border-gold-400/40 pb-1">
              {slide.subtitle}
            </span>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-wide text-ivory leading-tight">
              {slide.title}
            </h1>

            <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed max-w-lg font-sans">
              {slide.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href={slide.ctaHref}>
                <Button variant="gold" size="lg">
                  {slide.ctaText}
                </Button>
              </Link>
              <Link href={slide.secondaryCtaHref}>
                <Button variant="goldOutline" size="lg">
                  {slide.secondaryCtaText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-gold-400/30 bg-obsidian/40 p-3 text-gold-400 backdrop-blur-md hover:bg-gold-400 hover:text-obsidian transition-all"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-gold-400/30 bg-obsidian/40 p-3 text-gold-400 backdrop-blur-md hover:bg-gold-400 hover:text-obsidian transition-all"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Carousel Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 space-x-3">
        {HERO_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 transition-all duration-300 ${
              idx === currentIndex ? "w-8 bg-gold-400" : "w-3 bg-ivory/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
