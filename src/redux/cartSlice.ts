import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { Product } from "../types/product";


 export type TCartItem = Omit<Product,"stock"|"category"> &{
    quantity:number;
}
export interface ICartState {
  cartItems: TCartItem[];
}

const initialState: ICartState = {
  cartItems: [],
};

const cartSlice: Slice<ICartState> = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemInCart: (state: ICartState, action: PayloadAction<TCartItem>) => {
      const existingItemInCart = state.cartItems.find((item) => item._id === action.payload._id);

      if (existingItemInCart){
        // manually garam, could have used immer as existingItemInCart.quantity += 1
      state.cartItems=  state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
      }
      else {
        action.payload.quantity=1;
        state.cartItems.push(action.payload);
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
      }
    },

    removeItemFromCart: (state: ICartState, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
      localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
    },

    clearCart:(state:ICartState)=>{
      state.cartItems=[];
      localStorage.removeItem("cartItems");
    },
    incrementQuantity:(state:ICartState,action:PayloadAction<string>)=>{
      state.cartItems = state.cartItems.map(item=>item._id===action.payload?{...item,quantity:item.quantity+1}:item);
      localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
    },
    decrementQuantity:(state:ICartState,action:PayloadAction<string>)=>{
      const cartItem = state.cartItems.find(item=>item._id===action.payload);
      if(cartItem?.quantity===1) return;
      state.cartItems = state.cartItems.map(item=>item._id===action.payload?{...item,quantity:item.quantity-1}:item);
      localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
    },
    addItemsFromLocalStorage:(state:ICartState,action:PayloadAction<TCartItem[]>)=>{
      state.cartItems = action.payload;
    }
  },
});

export const {addItemInCart,removeItemFromCart,clearCart,incrementQuantity,decrementQuantity,addItemsFromLocalStorage} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;