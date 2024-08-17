import { configureStore } from "@reduxjs/toolkit";
import {apiSlice} from './slices/apiSlice'
import carrinhoSliceReducer from './slices/carrinhoSlice'
import authSliceReducer from './slices/authSlice'
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        carrinho: carrinhoSliceReducer,
        auth: authSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
    
})

export default store