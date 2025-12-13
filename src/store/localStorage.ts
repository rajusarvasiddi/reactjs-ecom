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

type SidebarState = {
  sidebarOpen: boolean;
};



type AuthState = {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role: "admin" | "garage-owner" | "customer";
  } | null;
};
type PersistedState = {
  cart: CartState;
  sidebar: SidebarState;

  auth: AuthState;
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
