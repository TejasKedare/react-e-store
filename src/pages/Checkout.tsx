import { Navigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setDefaultAddress } from "../store/slices/addressSlice";

import { getUserCart, clearCart } from "../utils/cartStorage";
import { loadRazorpay } from "../utils/razorpay";
import { addOrder } from "../utils/orderStorage";

import Modal from "../components/Modal";
import AddressForm from "../components/AddressModal";

const Checkout = () => {
  /* ---------- REDUX STATE ---------- */
  const user = useAppSelector((state) => state.auth.user);
  const addresses = useAppSelector((state) => state.address.list);
  const defaultAddressId = useAppSelector(
    (state) => state.address.defaultId
  );

  const dispatch = useAppDispatch();

  /* ---------- LOCAL UI STATE ---------- */
  const [showAddressModal, setShowAddressModal] = useState(false);

  /* ---------- CART (NEXT MIGRATION) ---------- */
  const cartItems = getUserCart();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!cartItems.length) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10 text-center">
        <h1 className="mb-4">Checkout</h1>
        <p className="text-textMuted">Your cart is empty</p>
      </div>
    );
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const selectedAddress =
    addresses.find((a) => a.id === defaultAddressId) ||
    addresses[0] ||
    null;

  /* ---------- HANDLERS ---------- */

  const handleMakeDefault = (id: string) => {
    dispatch(setDefaultAddress(id));
  };

  const handlePayment = async () => {
    if (!selectedAddress) return;

    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag",
      amount: totalAmount * 100,
      currency: "INR",
      name: "React E-Store",
      description: "Demo Order Payment",
      image: "https://reactjs.org/logo-og.png",

      handler: function () {
        addOrder({
          id: uuid(),
          items: cartItems,
          totalAmount,
          address: selectedAddress,
          createdAt: new Date().toISOString(),
        });

        clearCart();
        alert("Order placed successfully 🎉");
        window.location.href = "/profile/orders";
      },

      prefill: {
        name: selectedAddress.fullName,
        email: user.email,
        contact: selectedAddress.phone,
      },

      notes: {
        address: selectedAddress.addressLine,
      },

      theme: {
        color: "#7C2D12",
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  /* ---------- UI ---------- */

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">

          {/* ---------- Address Section ---------- */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3>Delivery Address</h3>

              <button
                onClick={() => setShowAddressModal(true)}
                className="btn-outline text-sm"
              >
                Add Address
              </button>
            </div>

            {addresses.length ? (
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {addresses.map((addr) => {
                  const isDefault =
                    addr.id === defaultAddressId;

                  return (
                    <div
                      key={addr.id}
                      className={`border rounded-lg p-3 text-sm flex justify-between gap-4 ${
                        isDefault
                          ? "border-primary bg-background"
                          : ""
                      }`}
                    >
                      <div>
                        <p className="font-medium flex items-center gap-2">
                          {addr.fullName}
                          {isDefault && (
                            <span className="text-xs bg-primary text-white px-2 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </p>

                        <p>{addr.addressLine}</p>
                        <p>
                          {addr.city}, {addr.state} -{" "}
                          {addr.pincode}
                        </p>
                        <p>{addr.phone}</p>
                      </div>

                      {!isDefault && (
                        <button
                          onClick={() =>
                            handleMakeDefault(addr.id)
                          }
                          className="text-primary text-sm hover:underline"
                        >
                          Make Default
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-textMuted">
                No address added yet
              </p>
            )}
          </div>

          {/* ---------- Order Items ---------- */}
          <div className="card">
            <h3 className="mb-4">Order Items</h3>

            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between items-center border-b py-3 text-sm"
              >
                <div>
                  <p className="font-medium">
                    {item.product.title}
                  </p>
                  <p className="text-textMuted">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-medium">
                  ₹ {item.product.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Summary ---------- */}
        <div className="card h-fit">
          <h3 className="mb-4">Price Summary</h3>

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

          <button
            className="btn-primary w-full"
            disabled={!selectedAddress}
            onClick={handlePayment}
          >
            Pay ₹ {totalAmount}
          </button>

          {!selectedAddress && (
            <p className="text-danger text-sm mt-3">
              Please add an address to continue
            </p>
          )}
        </div>
      </div>

      {/* ---------- Address Modal ---------- */}
      <Modal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
      >
        <AddressForm
          onSuccess={() => setShowAddressModal(false)}
        />
      </Modal>
    </div>
  );
};

export default Checkout;
