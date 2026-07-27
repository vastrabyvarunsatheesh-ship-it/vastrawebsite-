import { ProductDetailView } from "@/components/product/product-detail-view";

export function generateStaticParams() {
  return [
    { slug: "royal-crimson-kanjeevaram-pure-silk-saree" },
    { slug: "varanasi-gold-brocade-banarasi-silk-saree" },
    { slug: "ivory-gold-embellished-anarkali-suit-set" },
    { slug: "handblock-chanderi-silk-dress-material-set" },
  ];
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <ProductDetailView slug={resolvedParams.slug} />;
}
