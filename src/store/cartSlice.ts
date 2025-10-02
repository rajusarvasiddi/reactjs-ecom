// src/store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Product = {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
  rating: number;
  quantity?: number;
};

export type CartItem = Product & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },
    replaceCart: (state, action: PayloadAction<CartState>) => {
      return action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, replaceCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
