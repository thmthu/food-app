import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import restaurantSlice from "./slices/restaurantSlice"
export const store = configureStore({
    reducer: {
        restaurant: restaurantSlice,
        cart: cartSlice
    }
})