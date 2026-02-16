import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { get } from "../helpers/axios-helpers";
import type { Product } from "../types/product.types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addItem, updateQuantity, removeItem } from "../store/slices/cartSlice";
import toast from "react-hot-toast";
import { getAuthUser } from "../utils/localAuth";
import { openLogin } from "../store/slices/uiSlice";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { data: product, isLoading, isError,
  } = useQuery<Product>({
    queryKey: ["product", id],  /// this is for unique idenfification
    queryFn: () => get<Product>(`/products/${id}`),
    enabled: !!id,  /// this is to prevenet api calls when id is undefined
  });

  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.product.id === Number(id))
  );

  const handleAddToCart = useCallback(() => {
    const user = getAuthUser();

    if (!user) {
      toast.error("Please login to add items to cart");
      dispatch(openLogin());
      return;
    }

    if (product) dispatch(addItem(product));
  }, [product, dispatch]);

  const handleIncrease = () => {
    if (!cartItem) return;
    dispatch(
      updateQuantity({
        productId: cartItem.product.id,
        quantity: cartItem.quantity + 1,
      })
    );
  };

  const handleDecrease = () => {
    if (!cartItem) return;
    dispatch(
      updateQuantity({
        productId: cartItem.product.id,
        quantity: cartItem.quantity - 1,
      })
    );
  };

  const handleRemove = () => {
    if (!cartItem) return;
    toast.success("Product removed from cart");
    dispatch(removeItem(cartItem.product.id));
  };

  /* ---------- UI ---------- */

  if (isLoading) {
    return <p className="p-6">Loading product...</p>;
  }

  if (isError || !product) {
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

          <p className="text-textMuted">Category: {product.category}</p>

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
