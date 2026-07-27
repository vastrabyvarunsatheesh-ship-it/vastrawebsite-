"use client";

import * as React from "react";
import { Container } from "@/components/common/container";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddressBookPage() {
  return (
    <div className="py-16 bg-ivory min-h-screen">
      <Container>
        <div className="flex justify-between items-center border-b border-obsidian/10 pb-6 mb-10">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-600 uppercase">
              Address Book
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-wide text-obsidian uppercase mt-1">
              Saved Shipping Addresses
            </h1>
          </div>
          <Button variant="gold" size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add New Address
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border border-gold-400 bg-ivory-warm p-6 space-y-3 relative">
            <span className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-gold-400 text-obsidian inline-block">
              DEFAULT ADDRESS
            </span>
            <h3 className="font-serif text-sm font-semibold text-obsidian">Varun Satheesh</h3>
            <p className="text-xs text-obsidian/70 leading-relaxed">
              Atelier Residence, Panampilly Nagar, Kochi, Kerala - 682036
            </p>
            <p className="text-xs text-obsidian/60">Phone: +91 98950 00000</p>
            <div className="pt-2 flex space-x-3 text-xs">
              <button className="text-gold-600 font-semibold hover:underline">Edit</button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
