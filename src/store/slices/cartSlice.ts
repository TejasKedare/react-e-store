import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/product.types";
import { getUserCart, addToCart as addToCartStorage, updateCartQuantity as updateQtyStorage, removeFromCart as removeFromCartStorage, clearCart as clearCartStorage } from "../../utils/cartStorage";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: getUserCart(), // hydrate once
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      addToCartStorage(action.payload); // persist
      state.items = getUserCart(); // sync redux
    },

    updateQuantity(
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) {
      updateQtyStorage(
        action.payload.productId,
        action.payload.quantity
      );
      state.items = getUserCart();
    },

    removeItem(state, action: PayloadAction<number>) {
      removeFromCartStorage(action.payload);
      state.items = getUserCart();
    },

    clearCart(state) {
      clearCartStorage();
      state.items = [];
    },
  },
});

export const {
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
