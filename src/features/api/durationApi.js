import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../settings/settings';

export const durationApi = createApi({
    reducerPath: 'durationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/durations`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.accessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '');
            return headers;
        }
    }),
    tagTypes: ['Duration'],
    endpoints: (builder) => ({
        createDuration: builder.mutation({
            query: (formData) => ({
                url: ``,
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Duration']
        }),
        getAllDuration: builder.query({
            query: () => ``,
            providesTags: ['Duration']
        }),
        updateDuration: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['Duration']
        }),
        deleteDuration: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Duration']
        })
    })
});

export const {
    useCreateDurationMutation,
    useDeleteDurationMutation,
    useGetAllDurationQuery,
    useUpdateDurationMutation
} = durationApi;