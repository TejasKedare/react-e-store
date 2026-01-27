import { useState } from "react";
import { Link } from "react-router-dom";
import {
  getUserCart,
  updateCartQuantity,
  removeFromCart,
} from "../utils/cartStorage";
import type { CartItem } from "../utils/cartStorage";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    getUserCart()
  );

  const refreshCart = () => {
    setCartItems(getUserCart());
  };

  const handleIncrease = (productId: number, quantity: number) => {
    updateCartQuantity(productId, quantity + 1);
    refreshCart();
  };

  const handleDecrease = (productId: number, quantity: number) => {
    updateCartQuantity(productId, quantity - 1);
    refreshCart();
  };

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
    refreshCart();
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (!cartItems.length) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10 text-center">
        <h1 className="mb-4">Your Cart</h1>
        <p className="text-textMuted mb-6">Your cart is empty</p>
        <Link to="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.product.id} className="card flex gap-4 items-center" >
              <img src={item.product.image} alt={item.product.title} className="h-24 w-24 object-contain" />

              <div className="flex-1">
                <h3 className="text-sm font-medium">
                  {item.product.title}
                </h3>

                <p className="text-primary font-semibold mt-1">
                  ₹ {item.product.price}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    className="btn-outline px-3"
                    onClick={() =>
                      handleDecrease(
                        item.product.id,
                        item.quantity
                      )
                    }>
                    −
                  </button>

                  <span className="font-medium">
                    {item.quantity}
                  </span>

                  <button
                    className="btn-outline px-3"
                    onClick={() =>
                      handleIncrease(
                        item.product.id,
                        item.quantity
                      )
                    }>
                    +
                  </button>

                  <button className="text-danger text-sm ml-4" onClick={() => handleRemove(item.product.id) }>
                    Remove
                  </button>
                </div>
              </div>

              <p className="font-semibold">
                ₹ {item.product.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="card h-fit">
          <h3 className="mb-4">Order Summary</h3>

          <div className="flex justify-between mb-2">
            <span>Total Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Total Amount</span>
            <span className="font-semibold">
              ₹ {totalAmount}
            </span>
          </div>

          <button className="btn-primary w-full">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
