// src/store/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import uiReducer from "./uiSlice";
import { replaceCart } from "../store/cartSlice";
import { loadState, saveState } from "./localStorage";

const rootReducer = combineReducers({
  cart: cartReducer,
  ui: uiReducer,
});

const preloadedState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
    ui: store.getState().ui,
  });
});

// Sync across tabs
window.addEventListener("storage", (event) => {
  if (event.key === "reduxState") {
    const newState = JSON.parse(event.newValue || "{}");
    if (newState.cart) {
      store.dispatch(replaceCart(newState.cart));
    }
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
