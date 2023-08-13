import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../settings/settings';

export const reservationApi = createApi({
    reducerPath: 'reservationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/reservations`,
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState();
            const token = auth?.user?.accessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '');
            return headers;
        }
    }),
    tagTypes: ['Reservation'],
    endpoints: (builder) => ({
        createReservation: builder.mutation({
            query: (formData) => ({
                url: ``,
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Reservation']
        }),
        getAllReservation: builder.query({
            query: (qString) => `/${qString}`,
            providesTags: ['Reservation']
        }),
        getUserReservations: builder.query({
            query: (qString) => `/user/${qString}`,
            providesTags: ['Reservation']
        }),
        cancelReservation: builder.mutation({
            query: (id) => ({
                url: `/${id}/cancel`,
                method: 'PATCH'
            }),
            invalidatesTags: ['Reservation']
        }),
        confirmReservation: builder.mutation({
            query: (id) => ({
                url: `/${id}/confirm`,
                method: 'PUT'
            }),
            invalidatesTags: ['Reservation']
        }),
        hasReservation: builder.query({
            query: (id) => `/user-has-reservation`,
            providesTags: ['Reservation']
        })
    })
});

export const {
    useCreateReservationMutation,
    useGetAllReservationQuery,
    useCancelReservationMutation,
    useHasReservationQuery,
    useGetUserReservationsQuery,
    useConfirmReservationMutation
} = reservationApi;