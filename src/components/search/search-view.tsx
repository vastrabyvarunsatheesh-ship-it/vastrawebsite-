"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/common/container";
import { ProductCard } from "@/components/product/product-card";
import { performFuzzySearch } from "@/lib/search/fuzzy-search";
import { Product } from "@/types/product";
import { EmptyState } from "@/components/ui/empty-state";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const MOCK_SEARCH_PRODUCTS: Product[] = [
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
        ],
      },
    ],
    tags: ["Saree", "Kanjeevaram", "Silk"],
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
];

export function SearchView() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = React.useState(initialQuery);

  const searchResults = React.useMemo(() => {
    return performFuzzySearch(MOCK_SEARCH_PRODUCTS, query);
  }, [query]);

  return (
    <div className="py-16 bg-ivory min-h-screen">
      <Container>
        <div className="max-w-xl mx-auto mb-12 text-center space-y-4">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-600 uppercase">
            Search Intelligence
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-wide text-obsidian uppercase">
            Search Results
          </h1>
          <div className="relative">
            <Input
              type="search"
              placeholder="Search Sarees, Kanjeevaram, Anarkali..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-sm py-3 pl-10"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian/40" />
          </div>
        </div>

        {query && (
          <div className="mb-6 border-b border-obsidian/10 pb-4 flex justify-between items-center text-xs">
            <span className="text-obsidian/70">
              Found <strong className="text-obsidian">{searchResults.totalMatches}</strong> results for &ldquo;{query}&rdquo;
            </span>
          </div>
        )}

        {searchResults.products.length === 0 ? (
          <EmptyState
            icon={<SearchIcon className="h-12 w-12 text-gold-400" />}
            title="No Matching Items Found"
            description="Try searching with terms like 'Saree', 'Silk', 'Kanjeevaram', or 'Anarkali'."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
