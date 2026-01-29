import { Navigate } from "react-router-dom";
import { useState } from "react";
import { getUserAddresses, deleteUserAddress, getDefaultAddressId, setDefaultAddressId } from "../utils/addressStorage";
import { getUserOrders } from "../utils/orderStorage";
import Modal from "../components/Modal";
import AddressForm from "../components/AddressModal";
import { logout } from "../utils/localAuth";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

type ProfileSection = "account" | "addresses" | "orders";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();


  const [activeSection, setActiveSection] = useState<ProfileSection>("account");

  const [addresses, setAddresses] = useState(() => getUserAddresses());
  const [defaultAddressId, setDefaultAddressIdState] = useState<string | undefined>(() => getDefaultAddressId() || addresses[0]?.id);

  const [showAddressModal, setShowAddressModal] = useState(false);

  const orders = getUserOrders();

  /* ---------- Handlers ---------- */

  const handleDeleteAddress = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    deleteUserAddress(id);
    const updated = getUserAddresses();
    setAddresses(updated);
    setDefaultAddressIdState(getDefaultAddressId() || updated[0]?.id);
  };

  const handleSetDefault = (id: string) => {
    setDefaultAddressId(id);
    setDefaultAddressIdState(id);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };


  if (!user) return <Navigate to="/" replace />;



  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-4 gap-8">

        <aside className="md:col-span-1">
          <div className="card space-y-2">
            <button onClick={() => setActiveSection("account")} className={`w-full text-left px-3 py-2 rounded ${activeSection === "account"
                  ? "bg-primary text-white"
                  : "hover:bg-background"
                }`} >
              Account
            </button>

            <button onClick={() => setActiveSection("addresses")} className={`w-full text-left px-3 py-2 rounded ${activeSection === "addresses"
                  ? "bg-primary text-white"
                  : "hover:bg-background"
                }`} >
              Addresses
            </button>

            <button
              onClick={() => setActiveSection("orders")}
              className={`w-full text-left px-3 py-2 rounded ${activeSection === "orders"
                  ? "bg-primary text-white"
                  : "hover:bg-background"
                }`}
            >
              Orders
            </button>

            <hr className="my-2" />

            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded text-danger hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </aside>


        {/* ================= Content ================= */}
        <main className="md:col-span-3 space-y-10">

          {/* ---------- ACCOUNT ---------- */}
          {activeSection === "account" && (
            <>
              <h1>My Account</h1>

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
                  <label className="text-sm text-textMuted">
                    Account Status
                  </label>
                  <p className="font-medium text-accent">Active</p>
                </div>
              </div>
            </>
          )}

          {activeSection === "addresses" && (
            <>
              <div className="flex justify-between items-center">
                <h1>Saved Addresses</h1>

                <button
                  onClick={() => setShowAddressModal(true)}
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
                            {addr.city}, {addr.state} - {addr.pincode}
                          </p>
                          <p>{addr.phone}</p>
                        </div>

                        <div className="flex flex-col gap-2 text-right">
                          {!isDefault && (
                            <button
                              onClick={() =>
                                handleSetDefault(addr.id)
                              }
                              className="text-primary text-sm hover:underline"
                            >
                              Make Default
                            </button>
                          )}

                          <button
                            onClick={() =>
                              handleDeleteAddress(addr.id)
                            }
                            className="text-danger text-sm hover:underline"
                          >
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
            </>
          )}

          {activeSection === "orders" && (
            <>
              <h1>My Orders</h1>

              <div className="card">
                {orders.length ? (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border rounded-lg p-4 text-sm"
                      >
                        <p className="text-textMuted mb-2">
                          Order Date:{" "}
                          {new Date(
                            order.createdAt
                          ).toLocaleString()}
                        </p>

                        {order.items.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex justify-between py-2 border-b"
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
                              ₹{" "}
                              {item.product.price *
                                item.quantity}
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
            </>
          )}
        </main>
      </div>

      <Modal isOpen={showAddressModal} onClose={() => setShowAddressModal(false)} >
        <AddressForm
          onSuccess={() => {
            const updated = getUserAddresses();
            setAddresses(updated);
            setDefaultAddressIdState(
              getDefaultAddressId() || updated[0]?.id
            );
            setShowAddressModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Profile;
