import {configureStore} from "@reduxjs/toolkit";
import menuReducer from "../feature/menu/menuSlice";
import cartReducer from "../feature/cart/cartSlice";

const store = configureStore({

    reducer:{
        cart:cartReducer,
        menu:menuReducer,
    }
})

export default store;