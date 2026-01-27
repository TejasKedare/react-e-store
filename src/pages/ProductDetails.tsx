import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../helpers/axios-helpers";
import type { Product } from "../types/product.types";
import { addToCart, getUserCart, updateCartQuantity, removeFromCart } from "../utils/cartStorage";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartItem, setCartItem] = useState<{
    quantity: number;
  } | null>(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await get<Product>(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const item = getUserCart().find(
      (i) => i.product.id === product.id
    );

    setCartItem(item ? { quantity: item.quantity } : null);
  }, [product]);


  const handleAddToCart = () => {
    if (!product) return;

    try {
      addToCart(product);

      const item = getUserCart().find(
        (i) => i.product.id === product.id
      );

      setCartItem(item ? { quantity: item.quantity } : null);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "NOT_LOGGED_IN") {
        alert("Please login to add items to cart");
      }
    }
  };

  const handleIncrease = () => {
    if (!product || !cartItem) return;

    updateCartQuantity(product.id, cartItem.quantity + 1);

    const item = getUserCart().find(
      (i) => i.product.id === product.id
    );

    setCartItem(item ? { quantity: item.quantity } : null);
  };

  const handleDecrease = () => {
    if (!product || !cartItem) return;

    updateCartQuantity(product.id, cartItem.quantity - 1);

    const item = getUserCart().find(
      (i) => i.product.id === product.id
    );

    setCartItem(item ? { quantity: item.quantity } : null);
  };

  const handleRemove = () => {
    if (!product) return;

    removeFromCart(product.id);
    setCartItem(null);
  };


  if (loading) {
    return <p className="p-6">Loading product...</p>;
  }

  if (!product) {
    return <p className="p-6">Product not found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">

        {/* Image */}
        <div className="bg-white rounded-2xl shadow-card p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-80 object-contain"
          />
        </div>

        {/* Details */}
        <div className="space-y-4">
          <h1 className="text-3xl">{product.title}</h1>

          <p className="text-textMuted">
            Category: {product.category}
          </p>

          <p className="text-xl font-semibold text-primary">
            ₹ {product.price}
          </p>

          <p className="text-textMuted leading-relaxed">
            {product.description}
          </p>

          {/* Actions */}
          <div className="flex gap-4 mt-6 items-center">
            {!cartItem ? (
              <button className="btn-primary" onClick={handleAddToCart}>
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button className="btn-outline" onClick={handleDecrease}>
                  −
                </button>

                <span className="font-medium">{cartItem.quantity}</span>

                <button className="btn-outline" onClick={handleIncrease}>
                  +
                </button>

                <button
                  className="text-danger text-sm ml-4"
                  onClick={handleRemove}
                >
                  Remove
                </button>
              </div>
            )}
          </div>


        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
