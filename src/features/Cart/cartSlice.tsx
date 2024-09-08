import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const getCartItemFromStorage = localStorage.getItem("cart");
const getCartTotalFromStorage = localStorage.getItem("carttotal");

type cartTypeProp = {
  id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
};

const initialState: { cart: cartTypeProp[] | []; total: number | 0 } = {
  cart:
    getCartItemFromStorage === null
      ? []
      : [...JSON.parse(getCartItemFromStorage)],
  total:
    getCartTotalFromStorage === null ? 0 : JSON.parse(getCartTotalFromStorage),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        quantity: number;
        price: number;
        img: string;
        total: number;
      }>
    ) => {
      const founditem = state.cart.find(
        (item: { id: string }) => item.id === action.payload.id
      );

      if (founditem === undefined) {
        state.cart = [...state.cart, action.payload];

        let total = 0;
        state.cart.forEach((item: cartTypeProp) => {
          total += item.total;
        });

        state.total = Math.floor(total);

        // saving added item in localstorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("carttotal", JSON.stringify(state.total));
      }
    },
    incrementQuantity: (
      state,
      action: PayloadAction<{ id: string; qty: number }>
    ) => {
      const updatedcart = state.cart.map((item: cartTypeProp) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: action.payload.qty + 1,
            get total(): number {
              return this.quantity * this.price;
            },
          };
        }
        return item;
      });

      state.cart = updatedcart;

      let total = 0;
      state.cart.forEach((item: cartTypeProp) => {
        total += item.total;
      });

      state.total = Math.floor(total);

      // updating data in localstorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("carttotal", JSON.stringify(state.total));
    },
    decrementQuantity: (
      state,
      action: PayloadAction<{ id: string; qty: number }>
    ) => {
      const updatedcart = state.cart
        .map((item: cartTypeProp) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: action.payload.qty - 1,
              get total(): number {
                return this.quantity * this.price;
              },
            };
          }
          return item;
        })
        .filter((item: cartTypeProp) => item.quantity !== 0);

      state.cart = updatedcart;

      let total = 0;
      state.cart.forEach((item: cartTypeProp) => {
        total += item.total;
      });

      state.total = Math.floor(total);

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("carttotal", JSON.stringify(state.total));
    },
    clearCart: (state) => {
      state.cart = [];
      state.total = 0;

      localStorage.removeItem("cart");
      localStorage.removeItem("carttotal");
    },
  },
});

export default cartSlice.reducer;
export const { addItem, incrementQuantity, decrementQuantity, clearCart } =
  cartSlice.actions;
