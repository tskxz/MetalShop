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

        register: builder.mutation({
            query: (data) => ({
                url: `${UTILIZADORES_URL}`,
                method: 'POST',
                body: data,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${UTILIZADORES_URL}/logout`,
                method: 'POST',
            })
        }),

        perfil: builder.mutation({
            query: (data) => ({
                url: `${UTILIZADORES_URL}/perfil`,
                method: 'PUT',
                body: data,
            })
        }),

        getUtilizadores: builder.query({
            query: (data) => ({
                url: UTILIZADORES_URL,
            }),
            providesTags: ['Utilizadores'],
            keepUnusedDataFor: 5
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, usePerfilMutation, useGetUtilizadoresQuery } = utilizadoresApiSlice