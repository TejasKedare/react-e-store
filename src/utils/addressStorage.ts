import type { Address } from "../types/address.types";
import { getAuthUser } from "./localAuth";

const ADDRESS_KEY = "userAddresses";
const DEFAULT_ADDRESS_KEY = "defaultAddress";

/* ---------- Helpers ---------- */

const getAllAddresses = (): Record<string, Address[]> => {
  return JSON.parse(localStorage.getItem(ADDRESS_KEY) || "{}");
};

const saveAllAddresses = (data: Record<string, Address[]>) => {
  localStorage.setItem(ADDRESS_KEY, JSON.stringify(data));
};

/* ---------- Public APIs ---------- */

export const getUserAddresses = (): Address[] => {
  const user = getAuthUser();
  if (!user) return [];

  const all = getAllAddresses();
  return all[user.username] || [];
};

export const saveUserAddress = (address: Address) => {
  const user = getAuthUser();
  if (!user) throw new Error("User not logged in");

  const all = getAllAddresses();
  const userAddresses = all[user.username] || [];

  const updated = userAddresses.some(a => a.id === address.id)
    ? userAddresses.map(a => (a.id === address.id ? address : a))
    : [...userAddresses, address];

  saveAllAddresses({
    ...all,
    [user.username]: updated,
  });
};

export const deleteUserAddress = (id: string) => {
  const user = getAuthUser();
  if (!user) return;

  const all = getAllAddresses();
  saveAllAddresses({
    ...all,
    [user.username]: (all[user.username] || []).filter(a => a.id !== id),
  });
};


/* ---------- Default Address ---------- */

export const getDefaultAddressId = (): string | null => {
  const user = getAuthUser();
  if (!user) return null;

  const data = JSON.parse(
    localStorage.getItem(DEFAULT_ADDRESS_KEY) || "{}"
  );

  return data[user.username] || null;
};

export const setDefaultAddressId = (addressId: string) => {
  const user = getAuthUser();
  if (!user) return;

  const data = JSON.parse(
    localStorage.getItem(DEFAULT_ADDRESS_KEY) || "{}"
  );

  localStorage.setItem(
    DEFAULT_ADDRESS_KEY,
    JSON.stringify({
      ...data,
      [user.username]: addressId,
    })
  );
};