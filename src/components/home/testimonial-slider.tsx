import * as React from "react";
import { Star, Quote } from "lucide-react";
import { Container } from "../common/container";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "The Kanjeevaram silk saree I ordered for my daughter's wedding was exquisite. The zari work and richness of the silk rival high-end heritage boutiques.",
    author: "Rukmini V.",
    location: "Chennai, Tamil Nadu",
    rating: 5,
  },
  {
    id: "t2",
    quote: "Vastra by Varun has set a new benchmark in online luxury ethnic shopping. Fast delivery, pristine packaging, and unmatched fabric quality.",
    author: "Ananya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
  },
  {
    id: "t3",
    quote: "The Anarkali suit set fit like custom bespoke couture! Outstanding stitching details and premium Chanderi fabric.",
    author: "Priya Reddy",
    location: "Hyderabad, Telangana",
    rating: 5,
  },
];

export const TestimonialSlider: React.FC = () => {
  return (
    <section className="py-20 bg-ivory">
      <Container>
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-600 uppercase">
            Client Reflections
          </span>
          <h2 className="font-serif text-3xl font-semibold tracking-wide text-obsidian uppercase">
            Stories of Elegance
          </h2>
          <div className="h-0.5 w-12 bg-gold-400 mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between border border-gold-400/20 bg-ivory-warm p-8 shadow-sm transition-all duration-300 hover:shadow-luxury"
            >
              <div className="space-y-4">
                <Quote className="h-8 w-8 text-gold-400/60" />
                <div className="flex space-x-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-xs leading-relaxed text-obsidian/80 italic font-sans">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-obsidian/10">
                <p className="font-serif text-sm font-semibold text-obsidian uppercase tracking-wider">
                  {t.author}
                </p>
                <p className="text-[10px] text-gold-600 uppercase tracking-widest mt-0.5">
                  {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
