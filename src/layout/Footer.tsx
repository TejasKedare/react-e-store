import { useAppMessage } from "../context/app-context";

const Footer = () => {
  const { setMessage } = useAppMessage();

  return (
    <footer className="bg-surface border-t mt-10 p-6 text-center space-y-4">
      <p className="text-textMuted text-sm">
        © 2026 React E-Store. All rights reserved.
      </p>

      {/* Demo buttons to change global message */}
      <div className="flex gap-3 justify-center">
        <button className="btn-outline text-xs" onClick={() => setMessage("🔥 Big Sale Today – Up to 50% OFF")} >
           Show Sale Message
        </button>

        <button className="btn-outline text-xs" onClick={() =>   setMessage("🚚 Free delivery on orders above ₹999") } >
          Show Delivery Message
        </button>

        <button className="btn-outline text-xs" onClick={() => setMessage("")} >
          Clear Message
        </button>
      </div>
    </footer>
  );
};

export default Footer;
