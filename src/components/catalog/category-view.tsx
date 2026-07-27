"use client";

import * as React from "react";
import { Container } from "@/components/common/container";
import { ProductCard } from "@/components/product/product-card";
import { ProductFilters, FilterState } from "@/components/catalog/product-filters";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { Filter, SlidersHorizontal, Package } from "lucide-react";
import { Product } from "@/types/product";
import { ProductStore } from "@/lib/products/product-store";

const INITIAL_FILTERS: FilterState = {
  fabrics: [],
  colors: [],
  occasions: [],
  minPrice: 0,
  maxPrice: 100000,
  inStockOnly: false,
};

export function CategoryView({ slug }: { slug: string }) {
  const [filters, setFilters] = React.useState<FilterState>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = React.useState("featured");
  const [isFilterSheetOpen, setIsFilterSheetOpen] = React.useState(false);
  const [allProducts, setAllProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    setAllProducts(ProductStore.getProducts());
  }, []);

  const filteredProducts = React.useMemo(() => {
    let list = allProducts.filter((p) => p.category === slug || slug === "all");

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
  }, [slug, filters, sortBy, allProducts]);

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
              <div className="text-center py-16 border border-dashed border-obsidian/20 bg-ivory-warm p-8 space-y-3">
                <Package className="h-12 w-12 text-gold-400 mx-auto" />
                <h3 className="font-serif text-xl text-obsidian uppercase">No Products in {categoryTitle}</h3>
                <p className="text-xs text-obsidian/60 max-w-md mx-auto">
                  Sign in to the Admin Dashboard to start adding your real products to this category.
                </p>
                <Button
                  variant="gold"
                  onClick={() => (window.location.href = "/admin/login")}
                >
                  Go to Admin Panel
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
