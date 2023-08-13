import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../settings/settings';

export const tableApi = createApi({
    reducerPath: 'tableApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/tables`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.accessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '');
            return headers;
        }
    }),
    tagTypes: ['Table'],
    endpoints: (builder) => ({
        createTable: builder.mutation({
            query: (formData) => ({
                url: ``,
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Table']
        }),
        getAllTables: builder.query({
            query: () => ``,
            providesTags: ['Table']
        }),
        getTableById: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['Table']
        }),
        updateTable: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/${id}`,
                method: 'PATCH',
                body: formData
            }),
            invalidatesTags: ['Table']
        }),
        deleteTable: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Table']
        })
    })
});

export const {
    useCreateTableMutation,
    useDeleteTableMutation,
    useGetAllTablesQuery,
    useGetTableByIdQuery,
    useUpdateTableMutation
} = tableApi;