import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_AUTH_BASE_URL } from '../../settings/settings';

export const authApi = createApi({ 
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${USER_AUTH_BASE_URL}/auth`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.accessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '')
            return headers
        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credential) => ({
                url: '/login',
                method: 'POST',
                body: credential
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST'
            })
        }),
        confirmEmail: builder.mutation({
            query: (data) => ({
                url: '/confirm-email',
                method: 'PATCH',
                body: data
            })
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: '/reset-password',
                method: 'PATCH',
                body: data
            })
        }),
        changeForgottonPassword: builder.mutation({
            query: (data) => ({
                url: '/change-password',
                method: 'PATCH',
                body: data
            })
        }),
        changePassword: builder.mutation({
            query: ({id, formData}) => ({
                url: `/${id}/change-password`,
                method: 'PATCH',
                body: formData
            })
        })
    })
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useConfirmEmailMutation,
    useChangeForgottonPasswordMutation,
    useChangePasswordMutation,
    useResetPasswordMutation
} = authApi;