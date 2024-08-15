import {PRODUTOS_URL} from '../constants.js'
import {apiSlice} from './apiSlice.js'

export const produtosApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProdutos: builder.query({
            query: () => ({
                url: PRODUTOS_URL,
            }),
            keepUnusedDataFor: 5,
        })
    })
})

export const { useGetProdutosQuery } = produtosApiSlice