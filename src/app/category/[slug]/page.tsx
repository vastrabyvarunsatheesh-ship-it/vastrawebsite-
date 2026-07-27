import { CategoryView } from "@/components/catalog/category-view";

export function generateStaticParams() {
  return [
    { slug: "sarees" },
    { slug: "tshirts" },
    { slug: "kurtis" },
    { slug: "dress-materials" },
    { slug: "womens-fashion" },
    { slug: "all" },
  ];
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <CategoryView slug={resolvedParams.slug} />;
}
