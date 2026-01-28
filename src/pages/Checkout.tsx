import { Navigate } from "react-router-dom";
import { useState } from "react";
import { getAuthUser } from "../utils/localAuth";
import { getUserCart } from "../utils/cartStorage";
import { getUserAddresses, getDefaultAddressId, setDefaultAddressId } from "../utils/addressStorage";
import Modal from "../components/Modal";
import AddressForm from "../components/AddressModal";

const Checkout = () => {
  const user = getAuthUser();
  const cartItems = getUserCart();
  const [addresses, setAddresses] = useState(() => getUserAddresses());
  const [defaultAddressId, setDefaultAddressIdState] = useState(
    () => getDefaultAddressId() || getUserAddresses()[0]?.id || null
  );
  const selectedAddress =
    addresses.find(a => a.id === defaultAddressId) || null;



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

  const handleMakeDefault = (id: string) => {
    setDefaultAddressId(id);
    setDefaultAddressIdState(id);
  };


  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">

          {/* -------- Address Section -------- */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3>Delivery Address</h3>

              <button onClick={() => setShowAddressModal(true)} className="btn-outline text-sm" >
                Add Address
              </button>
            </div>

            {addresses.length ? (
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {addresses.map((addr) => {
                  const isDefault = addr.id === defaultAddressId;

                  return (
                    <div key={addr.id} className={`border rounded-lg p-3 text-sm flex justify-between gap-4 ${isDefault ? "border-primary bg-background" : ""}`} >
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
                        <button onClick={() => handleMakeDefault(addr.id)} className="text-primary text-sm hover:underline" >
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

          {/* -------- Order Items -------- */}
          <div className="card">
            <h3 className="mb-4">Order Items</h3>

            {cartItems.map(item => (
              <div key={item.product.id} className="flex justify-between items-center border-b py-3 text-sm" >
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

        {/* -------- Summary -------- */}
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

          <button className="btn-primary w-full" disabled={!selectedAddress} onClick={() =>
            alert("Order placed successfully (mock)")
          } >
            Place Order
          </button>

          {!selectedAddress && (
            <p className="text-danger text-sm mt-3">
              Please add an address to continue
            </p>
          )}
        </div>
      </div>

      {/* -------- Address Modal -------- */}
      <Modal isOpen={showAddressModal} onClose={() => setShowAddressModal(false)} >
        <AddressForm
          onSuccess={() => {
            const updated = getUserAddresses();
            setAddresses(updated);
            setDefaultAddressIdState(
              getDefaultAddressId() || updated[0]?.id || null
            );
            setShowAddressModal(false);
          }}
        />
      </Modal>

    </div>
  );
};

export default Checkout;
