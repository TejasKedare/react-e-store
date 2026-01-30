import { useState } from "react";
import Modal from "../../components/Modal";
import AddressForm from "../../components/AddressModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteAddress, setDefaultAddress } from "../../store/slices/addressSlice";
import ConfirmModal from "../../components/ConfirmModal";

const ProfileAddresses = () => {
  const dispatch = useAppDispatch();

  const addresses = useAppSelector((state) => state.address.list);
  const defaultAddressId = useAppSelector((state) => state.address.defaultId);

  const [showModal, setShowModal] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);


  const openDeleteConfirm = (id: string) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedId) return;
    dispatch(deleteAddress(selectedId));
    setConfirmOpen(false);
    setSelectedId(null);
  };


  const handleMakeDefault = (id: string) => {
    dispatch(setDefaultAddress(id));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1>Saved Addresses</h1>
        <button
          onClick={() => setShowModal(true)}
          className="btn-outline text-sm"
        >
          Add Address
        </button>
      </div>

      <div className="card">
        {addresses.length ? (
          addresses.map((addr) => {
            const isDefault = addr.id === defaultAddressId;

            return (
              <div
                key={addr.id}
                className={`border-b pb-3 mb-3 text-sm flex justify-between gap-4 ${isDefault
                    ? "bg-background rounded-lg p-3"
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

                <div className="flex flex-col gap-2 text-right">
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

                  <button
                    onClick={() => openDeleteConfirm(addr.id)}
                    className="text-danger text-sm hover:underline"
                  >
                    Delete
                  </button>

                </div>
              </div>
            );
          })
        ) : (
          <p className="text-textMuted">
            No addresses saved
          </p>
        )}
      </div>

      <ConfirmModal
        isOpen={confirmOpen}
        title="Delete Address"
        message="This address will be permanently removed."
        confirmText="Delete"
        danger
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* -------- Address Modal -------- */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <AddressForm onSuccess={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default ProfileAddresses;
