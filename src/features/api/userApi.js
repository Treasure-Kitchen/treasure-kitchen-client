import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../settings/settings';

export const userApi = createApi({ 
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}`,
        prepareHeaders: (headers, { getState }) => {
            // const { auth } = getState();
            // const token = auth?.user?.AccessToken;
            // headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    endpoints: (builder) => ({
        getUserWithCookie: builder.query({
            query: () => ''
        })
    })
});

export const {
    useGetUserWithCookieQuery
} = userApi;