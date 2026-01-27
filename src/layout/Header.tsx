import { Link, NavLink } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import { useState } from "react";
import { getAuthUser, logout } from "../utils/localAuth";
import { getUserCart } from "../utils/cartStorage";

interface AuthUser {
  username: string;
  email: string;
}

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(() => getAuthUser());
  const cartCount = getUserCart().reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <>
      <header className="bg-surface shadow-soft sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="text-2xl font-heading font-bold text-primary">
            React<span className="text-secondary">E-Store</span>
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
                to="/profile"
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
            <Link to="/checkout" className="relative">
              <span className="text-textPrimary font-medium">Cart</span>
              <span className="absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Modals */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => {
          setShowLogin(false);
          setUser(getAuthUser()); // refresh user after login
        }}
      />

      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
      />
    </>
  );
};

export default Header;
