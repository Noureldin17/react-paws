import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, CartItem } from "../../types/types";

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push({ ...item });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && quantity > 0 && item.stockQuantity >= quantity) {
        item.quantity = quantity;
      } else if (item && quantity == 0) {
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
