import { Cart, CartItem } from "@/core/cart/domain/cart"
import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit"
import { RootState } from "../store"

const cart = typeof window !== 'undefined' 
  ? localStorage.getItem("cart") !== null 
    ? JSON.parse(localStorage.getItem("cart") || "") 
    : null
  : null;

function saveCartToLocalStorage(cart: Cart) {
  if (typeof window !== 'undefined') {
    localStorage.setItem("cart", JSON.stringify(cart))
  }
}


const initialState: Cart = cart ?? {
  id: nanoid(),
  items: [],
  total: 0
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem["product"]>) => {
      const existingItem = state.items.find(item => item.product.id === action.payload.id)
      
      if (existingItem) {
        existingItem.quantity += 1
        existingItem.subtotal = existingItem.product.price * existingItem.quantity
      } else {
        const newItem: CartItem = {
          product: action.payload,
          quantity: 1,
          subtotal: action.payload.price
        }
        state.items = state.items.concat(newItem)
      }
      
      state.total = state.items.reduce((sum, item) => sum + item.subtotal, 0)
      saveCartToLocalStorage({ ...state })
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload)
      state.total = state.items.reduce((sum, item) => sum + item.subtotal, 0)
      saveCartToLocalStorage({ ...state })
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string, quantity: number }>) => {
      const item = state.items.find(item => item.product.id === action.payload.productId)
      if (item) {
        item.quantity = action.payload.quantity
        item.subtotal = item.product.price * item.quantity
        state.total = state.items.reduce((sum, item) => sum + item.subtotal, 0)
        saveCartToLocalStorage({ ...state })
      }
    },

    clearCart: (state) => {
      state.items = []
      state.total = 0
      saveCartToLocalStorage({ ...state })
    }
  }
})

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions
export const selectCart = (state: RootState) => state.cart

export default cartSlice.reducer;