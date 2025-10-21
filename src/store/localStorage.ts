import { boolean } from "yup";

// src/store/localStorage.ts
type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type UIState = {
  sidebarOpen: boolean;
};

type PersistedState = {
  cart: CartState;
  ui: UIState;
};

export const loadState = (): Partial<PersistedState> | undefined => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState) as Partial<PersistedState>;
  } catch {
    return undefined;
  }
};

export const saveState = (state: Partial<PersistedState>) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch {
    // Ignore write errors
  }
};
