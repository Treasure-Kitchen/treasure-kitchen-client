import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../settings/settings';

export const userApi = createApi({ 
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/profile`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.accessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    tagTypes: ['UserProfile'],
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['UserProfile']
        }),
        signUp: builder.mutation({
            query: (credential) => ({
                url: '/signup',
                method: 'POST',
                body: credential
            }),
            invalidatesTags: ['UserProfile']
        }),
        updateName: builder.mutation({
            query: ({ id, data }) => ({
                url: `${id}/update-name`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['UserProfile']
        })
    })
});

export const {
    useSignUpMutation,
    useUpdateNameMutation,
    useGetProfileQuery
} = userApi;