import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../settings/settings';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/orders`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.accessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '');
            return headers;
        }
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (formData) => ({
                url: ``,
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Order']
        }),
        getAllOrders: builder.query({
            query: (queryString) => `/${queryString}`,
            providesTags: ['Order']
        }),
        getUserOrders: builder.query({
            query: (queryString) => `/user/${queryString}`,
            providesTags: ['Order']
        }),
        getOrderbyId: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['Order']
        }),
        updateOrder: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['Order']
        }),
        deleteOrder: builder.mutation({
            query: (id) => `/${id}`,
            invalidatesTags: ['Order']
        }),
        payForOrder: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/${id}/pay`,
                method: 'PATCH',
                body: formData
            }),
            invalidatesTags: ['Order']
        }),
        confirmOrder: builder.mutation({
            query: (id) => ({
                url: `/${id}/confirm`,
                method: 'PATCH'
            }),
            invalidatesTags: ['Order']
        }),
        completeOrder: builder.mutation({
            query: (id) => ({
                url: `/${id}/complete`,
                method: 'PATCH'
            }),
            invalidatesTags: ['Order']
        }),
        getOrderTracks: builder.query({
            query: (id) => `/${id}/tracks`,
            invalidatesTags: ['Order']
        })
    })
});

export const {
    useGetAllOrdersQuery,
    useCreateOrderMutation,
    useGetUserOrdersQuery,
    useGetOrderbyIdQuery,
    useUpdateOrderMutation,
    usePayForOrderMutation,
    useDeleteOrderMutation,
    useConfirmOrderMutation,
    useCompleteOrderMutation,
    useGetOrderTracksQuery
} = orderApi;