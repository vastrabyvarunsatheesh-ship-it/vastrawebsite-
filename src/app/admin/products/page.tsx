"use client";

import * as React from "react";
import { Container } from "@/components/common/container";
import { formatCurrency } from "@/lib/utils";
import { Plus, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/product";
import { ProductStore } from "@/lib/products/product-store";
import { Sheet } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/toast";
import { LuxuryImage } from "@/components/common/luxury-image";

export default function AdminProductsPage() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const { toast } = useToast();

  // Form Fields
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("sarees");
  const [fabric, setFabric] = React.useState("Kanjeevaram Silk");
  const [craftDetails, setCraftDetails] = React.useState("Pure Zari Weave");
  const [basePrice, setBasePrice] = React.useState("");
  const [compareAtPrice, setCompareAtPrice] = React.useState("");
  const [color, setColor] = React.useState("Crimson Red");
  const [size, setSize] = React.useState("");
  const [stock, setStock] = React.useState("10");
  const [imageUrl, setImageUrl] = React.useState("");

  const refreshProducts = () => {
    setProducts(ProductStore.getProducts());
  };

  React.useEffect(() => {
    refreshProducts();
  }, []);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !basePrice) {
      toast("Incomplete Fields", "Please enter product title and base price.", "error");
      return;
    }

    ProductStore.addProduct({
      title,
      subtitle,
      description,
      category,
      fabric,
      craftDetails,
      basePrice: Number(basePrice),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
      color,
      size,
      stock: Number(stock),
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800",
    });

    toast("Product Created", `'${title}' added to your store catalogue.`, "success");
    setIsAddModalOpen(false);

    // Reset Form
    setTitle("");
    setSubtitle("");
    setDescription("");
    setBasePrice("");
    setCompareAtPrice("");
    setImageUrl("");

    refreshProducts();
  };

  const handleDeleteProduct = (id: string, prodTitle: string) => {
    if (confirm(`Are you sure you want to delete '${prodTitle}'?`)) {
      ProductStore.deleteProduct(id);
      toast("Product Removed", `'${prodTitle}' removed from store.`, "info");
      refreshProducts();
    }
  };

  const handleClearAll = () => {
    if (confirm("Clear all products from store?")) {
      ProductStore.clearAll();
      refreshProducts();
      toast("Store Cleared", "All products cleared.", "info");
    }
  };

  return (
    <div className="py-12 bg-ivory min-h-screen">
      <Container>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-obsidian/10 pb-6 mb-8 gap-4">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-600 uppercase">
              Product Catalogue
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-wide text-obsidian uppercase mt-1">
              Products Management ({products.length})
            </h1>
          </div>
          <div className="flex space-x-3">
            {products.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                Clear All Products
              </Button>
            )}
            <Button variant="gold" size="sm" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-1" /> Add New Product
            </Button>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="border border-dashed border-gold-400/40 bg-ivory-warm p-12 text-center space-y-4">
            <Package className="h-12 w-12 text-gold-500 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-obsidian uppercase">Your Store is Ready for Products</h3>
            <p className="text-xs text-obsidian/60 max-w-md mx-auto">
              All initial sample products have been cleared. Click &ldquo;Add New Product&rdquo; above to start listing your real inventory.
            </p>
            <Button variant="gold" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-1" /> Add Your First Product
            </Button>
          </div>
        ) : (
          <div className="border border-obsidian/10 bg-ivory-warm overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-obsidian/10 bg-ivory uppercase tracking-wider text-obsidian/60 font-semibold">
                  <th className="p-4">Product</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Fabric</th>
                  <th className="p-4">Base Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-obsidian/10 text-obsidian">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-ivory/50">
                    <td className="p-4 flex items-center space-x-3">
                      <div className="relative h-10 w-8 bg-ivory-soft shrink-0 overflow-hidden border border-obsidian/10">
                        <LuxuryImage
                          src={prod.variants[0]?.images[0] || "/images/placeholder-saree.jpg"}
                          alt={prod.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif font-semibold text-obsidian">{prod.title}</h4>
                        <span className="text-[10px] text-obsidian/50">{prod.subtitle}</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold text-gold-700">
                      {prod.variants[0]?.sku}
                    </td>
                    <td className="p-4 uppercase text-[10px] tracking-wider font-semibold">
                      {prod.category}
                    </td>
                    <td className="p-4">{prod.fabric}</td>
                    <td className="p-4 font-serif font-bold">{formatCurrency(prod.basePrice)}</td>
                    <td className="p-4 font-semibold text-green-700">{prod.variants[0]?.stock} units</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteProduct(prod.id, prod.title)}
                        className="p-1.5 hover:text-red-500 transition-colors"
                        aria-label="Delete product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Product Modal Drawer */}
        <Sheet
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          side="right"
          title="ADD NEW PRODUCT"
        >
          <form onSubmit={handleAddProduct} className="space-y-4 text-left pr-1 overflow-y-auto max-h-[80vh]">
            <div>
              <label className="text-xs font-semibold uppercase text-obsidian block mb-1">
                Product Title *
              </label>
              <Input
                type="text"
                placeholder="e.g. Royal Kanjeevaram Silk Saree"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-obsidian block mb-1">
                Subtitle
              </label>
              <Input
                type="text"
                placeholder="e.g. Handcrafted Zari Weave"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase text-obsidian block mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-obsidian/20 bg-ivory p-2.5 text-xs text-obsidian rounded"
                >
                  <option value="sarees">Sarees</option>
                  <option value="kurtis">Kurtis & Suits</option>
                  <option value="dress-materials">Dress Materials</option>
                  <option value="womens-fashion">Women&apos;s Fashion</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-obsidian block mb-1">
                  Fabric Type
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kanjeevaram Silk"
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  className="w-full border border-obsidian/20 bg-ivory p-2.5 text-xs text-obsidian rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase text-obsidian block mb-1">
                  Price (₹) *
                </label>
                <Input
                  type="number"
                  placeholder="28999"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-obsidian block mb-1">
                  Compare At Price (₹)
                </label>
                <Input
                  type="number"
                  placeholder="35999"
                  value={compareAtPrice}
                  onChange={(e) => setCompareAtPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs font-semibold uppercase text-obsidian block mb-1">
                  Color
                </label>
                <Input
                  type="text"
                  placeholder="Crimson Red"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-obsidian block mb-1">
                  Size
                </label>
                <Input
                  type="text"
                  placeholder="Free Size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-obsidian block mb-1">
                  Stock
                </label>
                <Input
                  type="number"
                  placeholder="10"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-obsidian block mb-1">
                Image URL
              </label>
              <Input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-obsidian block mb-1">
                Description
              </label>
              <textarea
                placeholder="Enter detailed description..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-obsidian/20 bg-ivory p-2 text-xs text-obsidian rounded"
              />
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full mt-4">
              Add Product to Store
            </Button>
          </form>
        </Sheet>
      </Container>
    </div>
  );
}
