import {UTILIZADORES_URL} from '../constants.js'
import {apiSlice} from './apiSlice.js'

export const utilizadoresApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${UTILIZADORES_URL}/login`,
                method: 'POST',
                body: data,
            }),
            keepUnusedDataFor: 5,
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${UTILIZADORES_URL}/logout`,
                method: 'POST',
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation } = utilizadoresApiSlice