import { getAuthUser } from "./localAuth";
import type { Product } from "../types/product.types";

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_KEY = "userCart";

const getAllCarts = (): Record<string, CartItem[]> =>
  JSON.parse(localStorage.getItem(CART_KEY) || "{}");

const saveAllCarts = (data: Record<string, CartItem[]>) =>
  localStorage.setItem(CART_KEY, JSON.stringify(data));

export const getUserCart = (): CartItem[] => {
  const user = getAuthUser();
  if (!user) return [];
  return getAllCarts()[user.username] || [];
};

/* ---------- ADD / INCREMENT ---------- */
export const addToCart = (product: Product) => {
  const user = getAuthUser();
  if (!user) throw new Error("NOT_LOGGED_IN");

  const carts = getAllCarts();
  const userCart = carts[user.username] || [];

  const existing = userCart.find(
    (item) => item.product.id === product.id
  );

  const updatedCart = existing
    ? userCart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    : [...userCart, { product, quantity: 1 }];

  saveAllCarts({ ...carts, [user.username]: updatedCart });
};

/* ---------- UPDATE QUANTITY ---------- */
export const updateCartQuantity = (
  productId: number,
  quantity: number
) => {
  const user = getAuthUser();
  if (!user) return;

  const carts = getAllCarts();
  const userCart = carts[user.username] || [];

  const updatedCart = userCart
    .map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    )
    .filter((item) => item.quantity > 0); // auto-remove if 0

  saveAllCarts({ ...carts, [user.username]: updatedCart });
};

/* ---------- REMOVE ITEM ---------- */
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
