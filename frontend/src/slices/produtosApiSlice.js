import {PRODUTOS_URL} from '../constants.js'
import {apiSlice} from './apiSlice.js'

export const produtosApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProdutos: builder.query({
            query: () => ({
                url: PRODUTOS_URL,
            }),
            keepUnusedDataFor: 5,
        }),

        getProduto: builder.query({
            query: (produtoId) => ({
                url: `${PRODUTOS_URL}/${produtoId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        criarProduto: builder.mutation({
            query: () => ({
                url: PRODUTOS_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Produto']
        }),

        atualizarProduto: builder.mutation({
            query: (data) => ({
                url: `${PRODUTOS_URL}/${data._id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Produto']
        })
    })
})

export const { useGetProdutosQuery, useGetProdutoQuery, useCriarProdutoMutation, useAtualizarProdutoMutation } = produtosApiSlice