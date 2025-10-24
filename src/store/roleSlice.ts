import { createSlice } from "@reduxjs/toolkit";

interface RoleState {
  role: "admin" | "mechanic" | "customer" | null;
}

const initialState: RoleState = {
  role: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;
