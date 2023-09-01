import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../settings/settings';

export const menuApi = createApi({
    reducerPath: 'menuApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/menus`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.accessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '');
            return headers;
        }
    }),
    tagTypes: ['Menu'],
    endpoints: (builder) => ({
        createMenu: builder.mutation({
            query: (formData) => ({
                url: ``,
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Menu']
        }),
        getAllMenu: builder.query({
            query: () => ``,
            providesTags: ['Menu']
        }),
        getMenuById: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['Menu']
        }),
        updateMenu: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['Menu']
        }),
        deleteMenu: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Menu']
        })
    })
});

export const {
    useCreateMenuMutation,
    useGetAllMenuQuery,
    useGetMenuByIdQuery,
    useDeleteMenuMutation,
    useUpdateMenuMutation
} = menuApi;