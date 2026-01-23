import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
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
              `font-medium ${
                isActive ? "text-primary" : "text-textMuted"
              } hover:text-primary transition`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `font-medium ${
                isActive ? "text-primary" : "text-textMuted"
              } hover:text-primary transition`
            }
          >
            Shop
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `font-medium ${
                isActive ? "text-primary" : "text-textMuted"
              } hover:text-primary transition`
            }
          >
            Profile
          </NavLink>
        </nav>

        {/* Cart */}
        <Link to="/checkout" className="relative">
          <span className="text-textPrimary font-medium">Cart</span>

          {/* Cart Badge */}
          <span className="absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full px-1.5 py-0.5">
            2
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
