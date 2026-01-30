import { Outlet, NavLink, Navigate, useNavigate } from "react-router-dom";
import { getAuthUser, logout } from "../../utils/localAuth";
import { useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";

const ProfileLayout = () => {
  const user = getAuthUser();
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);


  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `w-full text-left px-3 py-2 rounded block ${isActive ? "bg-primary text-white" : "hover:bg-background"
    }`;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <div className="card space-y-2">
            <NavLink to="account" className={linkClass}>
              Account
            </NavLink>

            <NavLink to="addresses" className={linkClass}>
              Addresses
            </NavLink>

            <NavLink to="orders" className={linkClass}>
              Orders
            </NavLink>

            <hr className="my-2" />

            <button onClick={() => setConfirmLogout(true)} className="w-full text-left px-3 py-2 rounded text-danger hover:bg-red-50" >
              Logout
            </button>
          </div>
        </aside>

        <main className="md:col-span-3">
          <Outlet />
        </main>
      </div>


      <ConfirmModal isOpen={confirmLogout} title="Logout" message="Are you sure you want to logout?" confirmText="Logout" onCancel={() => setConfirmLogout(false)} onConfirm={handleLogout} />
    </div>
  );
};

export default ProfileLayout;
