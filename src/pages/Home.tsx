import { useEffect, useState } from "react";
import { get } from "../helpers/axios-helpers";
import { Link } from "react-router-dom";
import type { Product, ProductsResponse } from "../types/product.types";

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const data = await get<ProductsResponse>("/products?limit=4");
                setProducts(data);
            } catch (error) {
                console.error("Failed to load featured products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);


    return (
        <div className="space-y-20">
            {/* ---------------- Hero Section ---------------- */}
            <section className="bg-surface py-16">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h1 className="text-4xl mb-4">
                            Deep Autumn <span className="text-primary">E-Commerce</span>
                        </h1>
                        <p className="text-textMuted mb-6">
                            Discover premium products inspired by warm autumn tones and
                            timeless craftsmanship.
                        </p>

                        <Link to="/shop" className="btn-primary">
                            Shop Now
                        </Link>
                    </div>

                    <img
                        src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
                        alt="Autumn collection"
                        className="rounded-2xl shadow-card"
                    />
                </div>
            </section>

            {/* ---------------- Featured Products ---------------- */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-6">
                    <h2>Featured Products</h2>
                    <Link to="/shop" className="text-primary font-medium">
                        View all →
                    </Link>
                </div>

                {loading ? (
                    <p>Loading products...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="card">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-40 mx-auto object-contain"
                                />

                                <h3 className="mt-4 text-sm font-semibold line-clamp-2">
                                    {product.title}
                                </h3>

                                <p className="price mt-2">₹ {product.price}</p>

                                <Link
                                    to={`/product/${product.id}`}
                                    className="btn-outline mt-4 block text-center"
                                >
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ---------------- Categories ---------------- */}
            <section className="bg-background py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="mb-6">Shop by Category</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            "Men's Clothing",
                            "Women's Clothing",
                            "Electronics",
                            "Jewellery",
                        ].map((category) => (
                            <div
                                key={category}
                                className="card text-center cursor-pointer hover:shadow-soft transition"
                            >
                                <p className="font-medium">{category}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- Value Proposition ---------------- */}
            <section className="max-w-7xl mx-auto px-6 pb-16">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="card text-center">
                        <h3 className="mb-2">🚚 Free Shipping</h3>
                        <p className="text-textMuted">
                            On all orders above ₹999
                        </p>
                    </div>

                    <div className="card text-center">
                        <h3 className="mb-2">🔒 Secure Payments</h3>
                        <p className="text-textMuted">
                            100% safe and encrypted checkout
                        </p>
                    </div>

                    <div className="card text-center">
                        <h3 className="mb-2">⭐ Premium Quality</h3>
                        <p className="text-textMuted">
                            Curated products you can trust
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
