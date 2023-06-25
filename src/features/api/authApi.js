import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../settings/settings';

export const authApi = createApi({ 
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/api/users/`,
        prepareHeaders: (headers, { getState }) => {
            // const { auth } = getState();
            // const token = auth?.user?.AccessToken;
            // headers.set('Authorization', token ? `Bearer ${token}` : '')
            // return headers
        }
    }),
    endpoints: (builder) => ({
        loginWithGoogle: builder.mutation({
            query: (credential) => ({
                url: '/',
                method: 'POST',
                body: credential
            })
        }),
        loginWithFacebook: builder.mutation({
            query: (credential) => ({
                url: '/',
                method: 'POST',
                body: credential
            })
        }),
        loginWithTwitter: builder.mutation({
            query: (credential) => ({
                url: '/',
                method: 'POST',
                body: credential
            })
        }),
        getUserWithCookie: builder.query({
            query: () => 'profile'
        })
    })
});

export const {
    useLoginWithFacebookMutation,
    useLoginWithGoogleMutation,
    useLoginWithTwitterMutation
} = authApi;