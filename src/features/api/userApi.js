import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../settings/settings';

export const userApi = createApi({ 
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/profile`}),
    endpoints: (builder) => ({
        getUserWithCookie: builder.query({
            query: (userId) => `/${userId}`
        })
    })
});

export const {
    useGetUserWithCookieQuery
} = userApi;