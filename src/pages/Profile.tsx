import { Navigate } from "react-router-dom";
import { useState } from "react";
import { getAuthUser } from "../utils/localAuth";
import { getUserAddresses, deleteUserAddress } from "../utils/addressStorage";
import Modal from "../components/Modal";
import AddressForm from "../components/AddressModal";
import { getDefaultAddressId, setDefaultAddressId } from "../utils/addressStorage";
import { getUserOrders } from "../utils/orderStorage";

const Profile = () => {
  const user = getAuthUser();
  const [addresses, setAddresses] = useState(() => getUserAddresses());
  const [showAddressModal, setShowAddressModal] = useState(false);
  const defaultAddressId = getDefaultAddressId() || addresses[0]?.id;
  const orders = getUserOrders();


  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleDeleteAddress = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmDelete) return;

    deleteUserAddress(id);
    setAddresses(getUserAddresses());
  };

  const handleSetDefault = (id: string) => {
    setDefaultAddressId(id)
  };


  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="mb-6">My Profile</h1>

      {/* -------- Profile Info -------- */}
      <div className="card space-y-4">
        <div>
          <label className="text-sm text-textMuted">Username</label>
          <p className="font-medium">{user.username}</p>
        </div>

        <div>
          <label className="text-sm text-textMuted">Email</label>
          <p className="font-medium">{user.email}</p>
        </div>

        <div>
          <label className="text-sm text-textMuted">Account Status</label>
          <p className="font-medium text-accent">Active</p>
        </div>
      </div>

      {/* -------- Address Section -------- */}
      <div className="flex items-center justify-between mb-4 mt-12">
        <h2>Saved Addresses</h2>

        <button onClick={() => setShowAddressModal(true)} className="btn-outline text-sm" >
          Add Address
        </button>
      </div>

      <div className="card">
        {addresses.length ? (
          addresses.map((addr) => {
            const isDefault = addr.id === defaultAddressId;

            return (
              <div key={addr.id} className={`border-b pb-3 mb-3 text-sm flex justify-between gap-4 ${isDefault ? "bg-background rounded-lg p-3" : ""}`} >
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
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p>{addr.phone}</p>
                </div>

                <div className="flex flex-col gap-2 text-right">
                  {!isDefault && (
                    <button onClick={() => handleSetDefault(addr.id)} className="text-primary text-sm hover:underline" >
                      Make Default
                    </button>
                  )}

                  <button onClick={() => handleDeleteAddress(addr.id)} className="text-danger text-sm hover:underline" >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-textMuted">No addresses saved</p>
        )}
      </div>

      {/* -------- Order History -------- */}
      <div className="card mt-12">
        <h2 className="mb-4">My Orders</h2>

        {orders.length ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 text-sm" >
                <p className="text-textMuted mb-2">
                  Order Date:{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>

                {order.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between py-2 border-b" >
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

                <div className="flex justify-between mt-3 font-semibold">
                  <span>Total</span>
                  <span>₹ {order.totalAmount}</span>
                </div>
              </div>
            ))}
          </div>
         ) : (
          <p className="text-textMuted">
            No orders placed yet
          </p>
        )}
      </div>


      {/* -------- Address Modal -------- */}
      <Modal isOpen={showAddressModal} onClose={() => setShowAddressModal(false)} >
        <AddressForm
          onSuccess={() => {
            setAddresses(getUserAddresses());
            setShowAddressModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Profile;
