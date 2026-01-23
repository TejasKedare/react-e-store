const Footer = () => {
  return (
    <footer className="bg-surface border-t border-textMuted/20 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        
        {/* Brand */}
        <div>
          <h3 className="font-heading text-lg font-semibold text-primary">
            React E-Store
          </h3>
          <p className="text-textMuted mt-2">
            Premium products inspired by deep autumn tones.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-textMuted">
            <li>Home</li>
            <li>Shop</li>
            <li>Profile</li>
            <li>Checkout</li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-textMuted">support@reactestore.com</p>
          <p className="text-textMuted">© 2026 React E-Store</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
