import { useEffect, useState } from "react";
import type { Product, ProductsResponse } from "../types/product.types";
import { get } from "../helpers/axios-helpers";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await get<ProductsResponse>("/products");
        setProducts(data);
      } catch (error) {
        setError("Failed to load products");
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-20">Loading products...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">Shop</h1>
        <p className="text-textMuted">{products.length} products</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
            <ProductCard product={product} />
        ))}
      </div>
    </section>
  );
};

export default Shop;
