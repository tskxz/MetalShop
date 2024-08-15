import {createSlice} from "@reduxjs/toolkit";
import { atualizarCarrinho } from "../utils/carrinhoUtils";

const initialState = localStorage.getItem('carrinho') ? JSON.parse(localStorage.getItem("carrinho")) : {carrinhoItens: []}



const carrinhoSlice = createSlice({
    name: "carrinho",
    initialState,
    reducers: {
         adicionarToCarrinho: (state, action) => {
            const item = action.payload
            const existItem = state.carrinhoItens.find((x) => x._id === item._id)
            if(existItem){
                state.carrinhoItens = state.carrinhoItens.map((x) => x._id === existItem._id ? item : x);
            } else {
                state.carrinhoItens = [...state.carrinhoItens, item]
            }
            
            return atualizarCarrinho(state)
        }
    }
})

export const {adicionarToCarrinho} = carrinhoSlice.actions

export default carrinhoSlice.reducer;