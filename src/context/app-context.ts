import { createContext, useContext } from "react";

export interface AppContextType {
  message: string;
  setMessage: (msg: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(
  undefined
);

export const useAppMessage = () => {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useAppMessage must be used inside AppProvider");
  }

  return ctx;
};
