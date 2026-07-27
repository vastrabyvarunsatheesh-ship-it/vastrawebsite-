import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "../common/container";

export const FooterShell: React.FC = () => {
  return (
    <footer className="border-t border-obsidian/10 bg-obsidian text-ivory/80 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Vision */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl tracking-[0.2em] text-gold-400">
              VASTRA BY VARUN
            </h3>
            <p className="text-xs leading-relaxed text-ivory/60 font-sans">
              Crafting timeless luxury Indian wear. Heritage Sarees, Designer Kurtis, & Artisanal Dress Materials engineered for pure elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-widest text-gold-300 uppercase">
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              {siteConfig.navCategories.map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href} className="hover:text-gold-400 transition-colors">
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-widest text-gold-300 uppercase">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-ivory/60">
              <li>Book an Atelier Appointment</li>
              <li>Shipping & Global Delivery</li>
              <li>Returns & Exchanges</li>
              <li>Size Guide & Bespoke Tailoring</li>
            </ul>
          </div>

          {/* Newsletter Stub */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-widest text-gold-300 uppercase">
              Private Circle
            </h4>
            <p className="text-xs text-ivory/60">
              Subscribe to receive exclusive access to private couture drops.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gold-400/30 bg-obsidian-light px-3 py-2 text-xs text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold-400"
              />
              <button className="bg-gold-400 px-4 py-2 text-xs font-semibold text-obsidian uppercase hover:bg-gold-300 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-ivory/10 pt-8 text-center text-[11px] text-ivory/40">
          © {new Date().getFullYear()} VASTRA BY VARUN. All Rights Reserved. Enterprise Architecture Ready.
        </div>
      </Container>
    </footer>
  );
};
