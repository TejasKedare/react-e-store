import { Navigate } from "react-router-dom";
import { getAuthUser } from "../utils/localAuth";
import { getUserAddresses } from "../utils/addressStorage";
import Modal from "../components/Modal";
import { useState } from "react";
import AddressForm from "../components/AddressModal";

const Profile = () => {
  const user = getAuthUser();
  const addresses = getUserAddresses();
  const [showAddressModal, setShowAddressModal] = useState(false);

  if (!user) {
    return <Navigate to="/" replace />;
  }

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
      <h1 className="mt-12">Saved Addresses</h1>
      <div className="card mt-6">
        <div className="flex items-center justify-between mb-4">

          <button onClick={() => setShowAddressModal(true)} className="btn-outline text-sm" >
            Add Address
          </button>
        </div>

        {addresses.length ? (
          addresses.map((addr) => (
            <div key={addr.id} className="border-b pb-3 mb-3 text-sm">
              <p className="font-medium">{addr.fullName}</p>
              <p>{addr.addressLine}</p>
              <p>
                {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p>{addr.phone}</p>
            </div>
          ))
        ) : (
          <p className="text-textMuted">No addresses saved</p>
        )}
      </div>

      <Modal isOpen={showAddressModal} onClose={() => setShowAddressModal(false)} >
        <AddressForm
          onSuccess={() => setShowAddressModal(false)}
        />
      </Modal>
    </div>
  );
};

export default Profile;
