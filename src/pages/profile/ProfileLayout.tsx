import { Outlet, NavLink, Navigate, useNavigate } from "react-router-dom";
import { getAuthUser, logout } from "../../utils/localAuth";

const ProfileLayout = () => {
  const user = getAuthUser();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `w-full text-left px-3 py-2 rounded block ${
      isActive ? "bg-primary text-white" : "hover:bg-background"
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

            <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded text-danger hover:bg-red-50" >
              Logout
            </button>
          </div>
        </aside>

        <main className="md:col-span-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
