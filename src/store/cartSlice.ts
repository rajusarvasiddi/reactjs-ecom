import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Product = {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    rating: number;
}

type CartState = {
    items: Product[];
}

const initialState: CartState = {
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            state.items.push(action.payload);
        }
    }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;