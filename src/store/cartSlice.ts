// src/store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Product = {
  id: number;
  title: string;
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
      console.log("REMOVE ITEM :: ", item);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        if (action.payload.quantity > 0) {
          item.quantity = action.payload.quantity;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        }
      }
    },
    replaceCart: (state, action: PayloadAction<CartState>) => {
      return action.payload;
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  replaceCart,
  updateQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
