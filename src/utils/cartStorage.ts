import type { Product } from "../types/product.types";
import { getAuthUser } from "./localAuth";

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_KEY = "userCart";

/* ---------- helpers ---------- */
const getAllCarts = (): Record<string, CartItem[]> => {
  return JSON.parse(localStorage.getItem(CART_KEY) || "{}");
};

const saveAllCarts = (data: Record<string, CartItem[]>) => {
  localStorage.setItem(CART_KEY, JSON.stringify(data));
};

/* ---------- public APIs ---------- */
export const getUserCart = (): CartItem[] => {
  const user = getAuthUser();
  if (!user) return [];
  return getAllCarts()[user.username] || [];
};

export const addToCart = (product: Product) => {
  const user = getAuthUser();
  if (!user) throw new Error("NOT_LOGGED_IN");

  const carts = getAllCarts();
  const userCart = carts[user.username] || [];

  const existing = userCart.find(
    (item) => item.product.id === product.id
  );

  let updatedCart: CartItem[];

  if (existing) {
    updatedCart = userCart.map((item) =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    updatedCart = [...userCart, { product, quantity: 1 }];
  }

  saveAllCarts({
    ...carts,
    [user.username]: updatedCart,
  });
};

export const removeFromCart = (productId: number) => {
  const user = getAuthUser();
  if (!user) return;

  const carts = getAllCarts();
  saveAllCarts({
    ...carts,
    [user.username]: (carts[user.username] || []).filter(
      (item) => item.product.id !== productId
    ),
  });
};

export const clearCart = () => {
  const user = getAuthUser();
  if (!user) return;

  const carts = getAllCarts();
  saveAllCarts({
    ...carts,
    [user.username]: [],
  });
};
