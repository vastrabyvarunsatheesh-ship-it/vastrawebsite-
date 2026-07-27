"use client";

import * as React from "react";
import { Checkbox } from "../ui/checkbox";
import { Accordion } from "../ui/accordion";
import { Button } from "../ui/button";

export interface FilterState {
  fabrics: string[];
  colors: string[];
  occasions: string[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
}

const FABRIC_OPTIONS = ["Kanjeevaram Silk", "Banarasi Silk", "Chanderi Silk", "Cotton", "Georgette", "Organza"];
const COLOR_OPTIONS = ["Crimson Red", "Royal Gold", "Ivory White", "Emerald Green", "Peacock Blue"];
const OCCASION_OPTIONS = ["Bridal", "Festive", "Party Wear", "Daily Classic"];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const toggleFabric = (fabric: string) => {
    const updated = filters.fabrics.includes(fabric)
      ? filters.fabrics.filter((f) => f !== fabric)
      : [...filters.fabrics, fabric];
    onFilterChange({ ...filters, fabrics: updated });
  };

  const toggleColor = (color: string) => {
    const updated = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onFilterChange({ ...filters, colors: updated });
  };

  const toggleOccasion = (occasion: string) => {
    const updated = filters.occasions.includes(occasion)
      ? filters.occasions.filter((o) => o !== occasion)
      : [...filters.occasions, occasion];
    onFilterChange({ ...filters, occasions: updated });
  };

  const accordionItems = [
    {
      id: "fabric",
      title: "Fabric Type",
      content: (
        <div className="space-y-2 pt-1">
          {FABRIC_OPTIONS.map((fab) => (
            <div key={fab}>
              <Checkbox
                label={fab}
                checked={filters.fabrics.includes(fab)}
                onChange={() => toggleFabric(fab)}
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "color",
      title: "Color Palette",
      content: (
        <div className="space-y-2 pt-1">
          {COLOR_OPTIONS.map((col) => (
            <div key={col}>
              <Checkbox
                label={col}
                checked={filters.colors.includes(col)}
                onChange={() => toggleColor(col)}
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "occasion",
      title: "Occasion",
      content: (
        <div className="space-y-2 pt-1">
          {OCCASION_OPTIONS.map((occ) => (
            <div key={occ}>
              <Checkbox
                label={occ}
                checked={filters.occasions.includes(occ)}
                onChange={() => toggleOccasion(occ)}
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "availability",
      title: "Availability",
      content: (
        <div className="pt-1">
          <Checkbox
            label="In Stock Only"
            checked={filters.inStockOnly}
            onChange={(e) =>
              onFilterChange({ ...filters, inStockOnly: e.target.checked })
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-obsidian/10 pb-4">
        <h3 className="font-serif text-sm font-semibold tracking-wider text-obsidian uppercase">
          Filter By
        </h3>
        <Button variant="link" className="p-0 text-xs text-gold-600" onClick={onResetFilters}>
          Clear All
        </Button>
      </div>

      <Accordion items={accordionItems} allowMultiple />
    </div>
  );
};
