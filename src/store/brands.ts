import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IBrand {
  brandName: string | null;
  id: string | null;
  ownerPublicKey: string | null;
  tokens: [] | null;
  url: string | null;
}

// object brands : {[{[]},{}]}
export interface IBrands {
  brands: Array<IBrand>;
}

const initialState: IBrands = {
  brands: [],
};

export const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    updateBrands: (state, action: PayloadAction<IBrand[]>) => {
      state.brands = action.payload;
    },
  },
});

export const { updateBrands } = brandsSlice.actions;
export default brandsSlice.reducer;