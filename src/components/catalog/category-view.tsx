"use client";

import * as React from "react";
import { Container } from "@/components/common/container";
import { ProductCard } from "@/components/product/product-card";
import { ProductFilters, FilterState } from "@/components/catalog/product-filters";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Product } from "@/types/product";

const INITIAL_FILTERS: FilterState = {
  fabrics: [],
  colors: [],
  occasions: [],
  minPrice: 0,
  maxPrice: 100000,
  inStockOnly: false,
};

const SAMPLE_CATALOG_PRODUCTS: Product[] = [
  {
    id: "prod_kanjeevaram_1",
    slug: "royal-crimson-kanjeevaram-pure-silk-saree",
    title: "Royal Crimson Kanjeevaram Pure Silk Saree",
    subtitle: "Artisanal Zari Woven Border",
    description: "Handcrafted pure mulberry silk saree featuring intricate pure zari brocade weave.",
    category: "sarees",
    fabric: "Kanjeevaram Silk",
    craftDetails: "Pure Zari Weave",
    basePrice: 28999,
    compareAtPrice: 35999,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: true,
    variants: [
      {
        id: "var_1",
        sku: "SAR-KAN-001-RED",
        color: "Crimson Red",
        stock: 10,
        price: 28999,
        images: [
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800",
          "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800",
        ],
      },
    ],
    tags: ["Saree", "Kanjeevaram"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod_banarasi_1",
    slug: "varanasi-gold-brocade-banarasi-silk-saree",
    title: "Varanasi Gold Brocade Banarasi Silk Saree",
    subtitle: "Heritage Mughal Motifs",
    description: "Pure Banarasi Katan silk woven with silver and gold zari kadwa technique.",
    category: "sarees",
    fabric: "Banarasi Silk",
    craftDetails: "Kadwa Weave",
    basePrice: 24499,
    compareAtPrice: 29999,
    isFeatured: true,
    isNewArrival: false,
    isBestseller: true,
    variants: [
      {
        id: "var_2",
        sku: "SAR-BAN-001-GLD",
        color: "Royal Gold",
        stock: 8,
        price: 24499,
        images: [
          "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800",
        ],
      },
    ],
    tags: ["Saree", "Banarasi"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod_anarkali_1",
    slug: "ivory-gold-embellished-anarkali-suit-set",
    title: "Ivory Gold Embellished Anarkali Suit Set",
    subtitle: "Includes Dupatta & Churidar",
    description: "Floor-length chanderi silk Anarkali featuring hand-embroidered Gota Patti work.",
    category: "kurtis",
    fabric: "Chanderi Silk",
    craftDetails: "Gota Patti",
    basePrice: 14999,
    compareAtPrice: 18999,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: false,
    variants: [
      {
        id: "var_3",
        sku: "KRT-ANK-001-IVR",
        color: "Ivory White",
        size: "M",
        stock: 15,
        price: 14999,
        images: [
          "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800",
        ],
      },
    ],
    tags: ["Kurti", "Anarkali"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod_dress_mat_1",
    slug: "handblock-chanderi-silk-dress-material-set",
    title: "Handblock Chanderi Silk Dress Material Set",
    subtitle: "3-Piece Unstitched Set",
    description: "Unstitched kurta, bottom, and organza handblock printed dupatta.",
    category: "dress-materials",
    fabric: "Chanderi & Organza",
    craftDetails: "Handblock Print",
    basePrice: 6499,
    compareAtPrice: 8999,
    isFeatured: true,
    isNewArrival: false,
    isBestseller: true,
    variants: [
      {
        id: "var_4",
        sku: "MAT-CHN-001-GRN",
        color: "Emerald Green",
        stock: 20,
        price: 6499,
        images: [
          "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800",
        ],
      },
    ],
    tags: ["Dress Material"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function CategoryView({ slug }: { slug: string }) {
  const [filters, setFilters] = React.useState<FilterState>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = React.useState("featured");
  const [isFilterSheetOpen, setIsFilterSheetOpen] = React.useState(false);

  const filteredProducts = React.useMemo(() => {
    let list = SAMPLE_CATALOG_PRODUCTS.filter((p) => p.category === slug || slug === "all");

    if (filters.fabrics.length > 0) {
      list = list.filter((p) => p.fabric && filters.fabrics.includes(p.fabric));
    }
    if (filters.colors.length > 0) {
      list = list.filter((p) =>
        p.variants.some((v) => filters.colors.includes(v.color))
      );
    }
    if (filters.inStockOnly) {
      list = list.filter((p) => p.variants.some((v) => v.stock > 0));
    }

    if (sortBy === "price-low") {
      list.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === "newest") {
      list.sort((a, b) => (a.isNewArrival ? -1 : 1));
    }

    return list;
  }, [slug, filters, sortBy]);

  const categoryTitle = slug.replace("-", " ").toUpperCase();

  return (
    <div className="py-12 bg-ivory">
      <Container>
        <div className="mb-10 text-center border-b border-obsidian/10 pb-8">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-600 uppercase">
            Couture Catalogue
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-wide text-obsidian uppercase mt-1">
            {categoryTitle}
          </h1>
          <p className="mt-2 text-xs text-obsidian/60 max-w-xl mx-auto">
            Explore handcrafted luxury {categoryTitle.toLowerCase()} woven with pure silk and gold zari accents.
          </p>
        </div>

        <div className="flex items-center justify-between border-b border-obsidian/10 pb-4 mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFilterSheetOpen(true)}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <span className="text-xs text-obsidian/60">
              Showing <strong className="text-obsidian">{filteredProducts.length}</strong> items
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs uppercase tracking-wider text-obsidian/60 hidden sm:inline">
              Sort By:
            </span>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-44 text-xs"
              options={[
                { label: "Featured Couture", value: "featured" },
                { label: "Price: Low to High", value: "price-low" },
                { label: "Price: High to Low", value: "price-high" },
                { label: "New Arrivals", value: "newest" },
              ]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="hidden lg:block lg:col-span-1 border-r border-obsidian/10 pr-6">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={() => setFilters(INITIAL_FILTERS)}
            />
          </div>

          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-obsidian/20 bg-ivory-warm p-8">
                <SlidersHorizontal className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                <h3 className="font-serif text-xl text-obsidian uppercase">No Products Found</h3>
                <p className="text-xs text-obsidian/60 mt-2">Try clearing your filters to explore our full collection.</p>
                <Button
                  variant="gold"
                  className="mt-6"
                  onClick={() => setFilters(INITIAL_FILTERS)}
                >
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>

      <Sheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        side="left"
        title="FILTER CATALOGUE"
      >
        <ProductFilters
          filters={filters}
          onFilterChange={setFilters}
          onResetFilters={() => setFilters(INITIAL_FILTERS)}
        />
      </Sheet>
    </div>
  );
}
