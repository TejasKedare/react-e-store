import { Navigate } from "react-router-dom";
import { useState } from "react";
import { getAuthUser } from "../utils/localAuth";
import { getUserCart } from "../utils/cartStorage";
import { getUserAddresses } from "../utils/addressStorage";
import Modal from "../components/Modal";
import AddressForm from "../components/AddressModal";

const Checkout = () => {
  const user = getAuthUser();
  const cartItems = getUserCart();
  const addresses = getUserAddresses();

  const [showAddressModal, setShowAddressModal] = useState(false);

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

  const selectedAddress = addresses[0]; // first address for now

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* -------- LEFT: Address + Items -------- */}
        <div className="md:col-span-2 space-y-6">

          {/* Address Section */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3>Delivery Address</h3>

              <button onClick={() => setShowAddressModal(true)} className="btn-outline text-sm" >
                {selectedAddress ? "Change" : "Add Address"}
              </button>
            </div>

            {selectedAddress ? (
              <div className="text-sm space-y-1">
                <p className="font-medium">{selectedAddress.fullName}</p>
                <p>{selectedAddress.addressLine}</p>
                <p>
                  {selectedAddress.city}, {selectedAddress.state} -{" "}
                  {selectedAddress.pincode}
                </p>
                <p>{selectedAddress.phone}</p>
              </div>
            ) : (
              <p className="text-textMuted">No address selected</p>
            )}
          </div>

          {/* Cart Items */}
          <div className="card">
            <h3 className="mb-4">Order Items</h3>

            {cartItems.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center border-b py-3 text-sm" >
                <div>
                  <p className="font-medium">{item.product.title}</p>
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

        {/* -------- RIGHT: Summary -------- */}
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
            onClick={() =>
              alert("Order placed successfully (mock)")
            }>
            Place Order
          </button>

          {!selectedAddress && (
            <p className="text-danger text-sm mt-3">
              Please add an address to continue
            </p>
          )}
        </div>
      </div>

      {/* Address Modal */}
      <Modal isOpen={showAddressModal} onClose={() => setShowAddressModal(false)} >
        <AddressForm onSuccess={() => setShowAddressModal(false)} />
      </Modal>
    </div>
  );
};

export default Checkout;
