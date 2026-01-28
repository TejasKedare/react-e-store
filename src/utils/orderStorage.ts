import { getAuthUser } from "./localAuth";
import type { CartItem } from "./cartStorage";
import type { Address } from "../types/address.types";

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  address: Address[];
  createdAt: string;
}

const ORDER_KEY = "userOrders";

const getAllOrders = (): Record<string, Order[]> => {
  return JSON.parse(localStorage.getItem(ORDER_KEY) || "{}");
};

const saveAllOrders = (data: Record<string, Order[]>) => {
  localStorage.setItem(ORDER_KEY, JSON.stringify(data));
};

/* ---------- Public APIs ---------- */
export const getUserOrders = (): Order[] => {
  const user = getAuthUser();
  if (!user) return [];

  return getAllOrders()[user.username] || [];
};

export const addOrder = (order: Order) => {
  const user = getAuthUser();
  if (!user) return;

  const all = getAllOrders();
  const userOrders = all[user.username] || [];

  saveAllOrders({
    ...all,
    [user.username]: [order, ...userOrders], // latest first
  });
};
