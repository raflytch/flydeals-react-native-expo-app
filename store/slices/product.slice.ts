import { LayoutType } from "@/common/types/filter";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  layout: LayoutType;
  sortBy: string;
}

const initialState: ProductState = {
  layout: "grid",
  sortBy: "default",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLayout: (state, action: PayloadAction<LayoutType>) => {
      state.layout = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setLayout, setSortBy } = productSlice.actions;
export default productSlice.reducer;
