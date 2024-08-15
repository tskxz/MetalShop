import {createSlice} from "@reduxjs/toolkit";

const initialState = localStorage.getItem('carrinho') ? JSON.parse(localStorage.getItem("carrinho")) : {carrinhoItens: []}

const carrinhoSlice = createSlice({
    name: "carrinho",
    initialState,
    reducers: {}
})

export default carrinhoSlice.reducer;