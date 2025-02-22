import { combineReducers } from "@reduxjs/toolkit";
import cart from "./cart";
import products from "./products";

const rootReducer = combineReducers({
  cart,
  products
})

export default rootReducer;