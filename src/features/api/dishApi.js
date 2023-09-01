import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../settings/settings';

export const dishApi = createApi({
    reducerPath: 'dishApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/dishes`,
        prepareHeaders: (headers, { getState }) => {
            const {auth} = getState();
            const token = auth?.user?.accessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '');
            return headers;
        }
    }),
    tagTypes: ['Dish'],
    endpoints: (builder) => ({
        getAllDishes: builder.query({
            query: (qString) => `/${qString}`,
            providesTags: ['Dish']
        }),
        getDishesByIds: builder.query({
            query: (ids) => `/${ids}/get-many`,
            invalidatesTags: ['Dish']
        })
    })
});

export const {
    useGetAllDishesQuery,
    useGetDishesByIdsQuery
} = dishApi;