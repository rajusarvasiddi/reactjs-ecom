import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    firstName: string;
    lastName: string;
    email: string;
}

interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    token: string | null;
    user: User | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.error = null;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
            state.token = null;
            state.user = null;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.error = null;
            state.token = null;
            state.user = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
