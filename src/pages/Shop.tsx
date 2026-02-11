import { useEffect, useState } from "react";
import type { Product, ProductsResponse } from "../types/product.types";
import { get } from "../helpers/axios-helpers";
import ProductCard from "../components/ProductCard";

const ITEMS_PER_PAGE = 8;

const Shop = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------- Debounce ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // reset page on new search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  /* ---------------- Fetch once ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await get<ProductsResponse>("/products");
        setAllProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ---------------- Filter ---------------- */
  useEffect(() => {
    const filtered = allProducts.filter((p) =>
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [debouncedSearch, allProducts]);

  /* ---------------- Pagination slice ---------------- */
  useEffect(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    setVisibleProducts(filteredProducts.slice(start, end));
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  /* ---------------- UI States ---------------- */
  if (loading) return <p className="text-center py-20">Loading products...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">Shop</h1>
        <p className="text-textMuted">{filteredProducts.length} products</p>
      </div>

      {/* Search */}
      <div className="mb-10">
        <div className="search-box">
          <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />

          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="search-clear">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            className="btn-outline disabled:opacity-40"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button key={page} onClick={() => setCurrentPage(page)} className={`px-4 py-2 rounded-xl transition ${
                currentPage === page ? "bg-primary text-white shadow-soft" : "text-textMuted hover:text-primary"
              }`}>
              {page}
            </button>
          ))}

          <button
            className="btn-outline disabled:opacity-40"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Shop;
