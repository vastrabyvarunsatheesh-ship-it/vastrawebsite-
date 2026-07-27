import { Product } from "@/types/product";

export interface SearchResult {
  products: Product[];
  totalMatches: number;
  matchedCategories: string[];
}

export function performFuzzySearch(products: Product[], query: string): SearchResult {
  const cleanQuery = query.toLowerCase().trim();

  if (!cleanQuery) {
    return {
      products: [],
      totalMatches: 0,
      matchedCategories: [],
    };
  }

  const queryTerms = cleanQuery.split(/\s+/);

  const matched = products.filter((product) => {
    const title = product.title.toLowerCase();
    const description = product.description.toLowerCase();
    const category = product.category.toLowerCase();
    const fabric = (product.fabric || "").toLowerCase();
    const craft = (product.craftDetails || "").toLowerCase();
    const tags = product.tags.map((t) => t.toLowerCase()).join(" ");
    const skus = product.variants.map((v) => v.sku.toLowerCase()).join(" ");

    const searchableText = `${title} ${description} ${category} ${fabric} ${craft} ${tags} ${skus}`;

    // Return true if every query term appears in searchable text
    return queryTerms.every((term) => searchableText.includes(term));
  });

  const categories = Array.from(new Set(matched.map((p) => p.category)));

  return {
    products: matched,
    totalMatches: matched.length,
    matchedCategories: categories,
  };
}
