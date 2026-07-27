import * as React from "react";
import { Header } from "./header";
import { FooterShell } from "./footer-shell";
import { MiniCartDrawer } from "../cart/mini-cart-drawer";

export const RootLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-ivory font-sans text-obsidian antialiased selection:bg-gold-400 selection:text-obsidian">
      <Header />
      <main className="flex-1">{children}</main>
      <FooterShell />
      <MiniCartDrawer />
    </div>
  );
};
