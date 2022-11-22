import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ICartState {
  totalPrice: number,
  items: CartItemType[],
}
export type CartItemType = {
  id: string 
  name: string 
  price: number 
  count: number 
  imageUrl: string 
  type: string 
  size: number
}

const initialState: ICartState  = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + (obj.price * obj.count);
      }, 0);
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0
    },

    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if(findItem){
        findItem.count--;
      }
    }
  },
});

export const cartSelector = (state: RootState) => state.cart

export const cartSelectorById = (id:string) => (state:RootState) => (
  state.cart.items.find((obj) => obj.id === id))


// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
