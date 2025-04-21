import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartItems.find((i) => i.id === item._id || i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // Normalize ID to `id` for consistency in cart
        state.cartItems.push({ ...item, id: item._id || item.id, quantity: 1 });
      }

      state.totalAmount = state.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;

      state.cartItems = state.cartItems.filter((item) => item.id !== id);

      state.totalAmount = state.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },

    increaseQty: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((i) => i.id === id);

      if (item) {
        item.quantity += 1;
      }

      state.totalAmount = state.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },

    decreaseQty: (state, action) => {
      const id = action.payload;
      const itemIndex = state.cartItems.findIndex((i) => i.id === id);

      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];

        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems.splice(itemIndex, 1);
        }
      }

      state.totalAmount = state.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
