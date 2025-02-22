import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from "@/core/products/application/productService";
import { RootState } from "../store";
import { Product } from '@/core/products/domain/product';
import { excelProductsRepository } from '@/core/products/infrastructure/excelProducts.repository';
import { env } from '@/config/env.mjs';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await productService(excelProductsRepository(env.PRODUCTS_SHEET_URL)).getProducts();
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