import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/common/types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isAddToCartModalVisible: boolean;
  isPaymentModalVisible: boolean;
  isPaymentSuccessModalVisible: boolean;
}

const initialState: CartState = {
  items: [],
  isAddToCartModalVisible: false,
  isPaymentModalVisible: false,
  isPaymentSuccessModalVisible: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }

      state.isPaymentModalVisible = false;
      state.isPaymentSuccessModalVisible = false;
      state.isAddToCartModalVisible = true;
    },
    setAddToCartModalVisible: (state, action: PayloadAction<boolean>) => {
      if (!action.payload) {
        state.isAddToCartModalVisible = false;
      } else {
        state.isPaymentModalVisible = false;
        state.isPaymentSuccessModalVisible = false;
        state.isAddToCartModalVisible = true;
      }
    },
    setPaymentModalVisible: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.isAddToCartModalVisible = false;
        state.isPaymentSuccessModalVisible = false;
      }
      state.isPaymentModalVisible = action.payload;
    },
    setPaymentSuccessModalVisible: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.isAddToCartModalVisible = false;
        state.isPaymentModalVisible = false;
      }
      state.isPaymentSuccessModalVisible = action.payload;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setAddToCartModalVisible,
  setPaymentModalVisible,
  setPaymentSuccessModalVisible,
} = cartSlice.actions;

export default cartSlice.reducer;
