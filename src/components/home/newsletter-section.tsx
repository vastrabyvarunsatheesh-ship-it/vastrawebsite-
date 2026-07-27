"use client";

import * as React from "react";
import { Container } from "../common/container";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/toast";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast("Invalid Email", "Please enter a valid email address.", "error");
      return;
    }
    toast("Welcome to the Private Circle", "You will now receive private couture drop invitations.", "success");
    setEmail("");
  };

  return (
    <section className="bg-obsidian py-20 text-ivory">
      <Container className="flex flex-col items-center text-center">
        <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-400 uppercase mb-2">
          Private Circle Privilege
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-wide text-ivory uppercase">
          JOIN THE COUTURE ATELIER
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-ivory/70 max-w-lg leading-relaxed font-sans">
          Subscribe to receive exclusive invitations to private drops, heritage silk showcases, and personalized styling consultations.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-md flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-gold-400/30 bg-obsidian-light text-ivory placeholder:text-ivory/40 focus:border-gold-400"
          />
          <Button type="submit" variant="gold" size="lg" className="whitespace-nowrap">
            Subscribe
          </Button>
        </form>

        <p className="mt-4 text-[10px] text-ivory/40 tracking-wider">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </Container>
    </section>
  );
};
