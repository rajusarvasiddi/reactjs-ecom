import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { loadState, saveState } from "./localStorage";

// Combine reducers to ensure proper typing
const rootReducer = combineReducers({
  cart: cartReducer,
});

// Load persisted state
const preloadedState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

// Persist cart slice only
store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
