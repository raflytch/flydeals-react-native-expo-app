import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slices";
import productReducer from "./slices/product.slice";
import favoritesReducer from "./slices/favorites.slices";
import cartReducer from "./slices/cart.slices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
