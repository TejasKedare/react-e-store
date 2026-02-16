import { useState, type ReactNode } from "react";
import { AppContext } from "./app-context";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState(
    "🔥 Free delivery on orders above ₹999"
  );

  return (
    <AppContext.Provider value={{ message, setMessage }}>
      {children}
    </AppContext.Provider>
  );
};
