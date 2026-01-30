import { Link, NavLink } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import { useState } from "react";
import { logout } from "../utils/localAuth";
import { logout as logoutAction } from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";



const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    )
  );
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
    logout();
  };

  return (
    <>
      <header className="bg-surface shadow-soft sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="text-2xl font-heading font-bold text-primary">
            React <span className="text-secondary">E-Store</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium ${isActive ? "text-primary" : "text-textMuted"
                } hover:text-primary transition`
              } >
              Home
            </NavLink>

            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `font-medium ${isActive ? "text-primary" : "text-textMuted"
                } hover:text-primary transition`
              } >
              Shop
            </NavLink>

            {user && (
              <NavLink
                to="/profile/account"
                className={({ isActive }) =>
                  `font-medium ${isActive ? "text-primary" : "text-textMuted"
                  } hover:text-primary transition`
                } >
                Profile
              </NavLink>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Auth State */}
            {!user ? (
              <>
                <button onClick={() => setShowLogin(true)} className="btn-outline hidden md:block" >
                  Login
                </button>

                <button onClick={() => setShowSignup(true)} className="btn-primary hidden md:block" >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <span className="hidden md:block text-textPrimary font-medium">
                  Hi, {user.username}
                </span>

                <button onClick={handleLogout} className="btn-outline hidden md:block" >
                  Logout
                </button>
              </>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative">
              <span className="text-textPrimary font-medium">Cart</span>
              <span className="absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Modals */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onOpenSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />

      <SignupModal isOpen={showSignup} onClose={() => setShowSignup(false)} onOpenLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />

    </>
  );
};

export default Header;
