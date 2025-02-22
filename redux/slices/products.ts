import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from "@/core/products/application/productService";
import { testProductsRepository } from "@/core/products/infrastructure/testProducts.repository";
import { RootState } from "../store";
import { Product } from '@/core/products/domain/product';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await productService(testProductsRepository()).getProducts();
    return products;
  }
);

const initialState = {
  items: [] as Product[],
  status: 'idle',
  error: undefined as string | undefined
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectProducts = (state: RootState) => state.products;
export default productsSlice.reducer;