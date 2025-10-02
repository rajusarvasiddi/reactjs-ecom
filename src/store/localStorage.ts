type CartState = {
  items: {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    rating: number;
  }[];
};

type PersistedState = {
  cart: CartState;
};

export const loadState = (): Partial<PersistedState> | undefined => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
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
