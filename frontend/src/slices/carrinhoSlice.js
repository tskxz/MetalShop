import {createSlice} from "@reduxjs/toolkit";

const initialState = localStorage.getItem('carrinho') ? JSON.parse(localStorage.getItem("carrinho")) : {carrinhoItens: []}

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

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
                state.carrinhoItens = [...state.cartItens, item]
            }

            // Calcular o preco dos itens
            state.precoItens = addDecimals(state.carrinhoItens.reduce((acc, item) => acc + item.preco * item.quantidade));
            
            // Calcular o preco do envio (se a encomenda for mais de 100 euros, é de graça, se não, 10 euros preco de envio)
            state.precoEnvio = addDecimals(state.precoItens > 100 ? 0: 10)

            // Calcular o preco da taxa
            state.precoTaxa = addDecimals(Number((0.15 * state.precoItens)))

            // Calcular preco total
            state.precoTotal = Number(state.precoItens) + Number(state.preocEnvio) + Number(state.precoTaxa) + Number(state.precoTotal).toFixed(2)

            localStorage.setItem('carrinho', JSON.stringify(state))
        }
    }
})

export const {adicionarToCarrinho} = carrinhoSlice.actions

export default carrinhoSlice.reducer;