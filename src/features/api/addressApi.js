import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../settings/settings';

export const addressApi = createApi({
    reducerPath: 'addressApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/addresses`,
        prepareHeaders: (headers, { getState }) => {
            const {auth} = getState();
            const token = auth?.user?.accessToken;
            headers.set('Authorization', token ? `Bearer ${token}` : '');
            return headers;
        }
    }),
    tagTypes: ['Address'],
    endpoints: (builder) => ({
        getAllCountries: builder.query({
            query: (qString) => `/countries${qString}`,
            providesTags: ['Address']
        }),
        getAllStateByCountry: builder.query({
            query: (countryId) => `/countries/${countryId}/states`,
            invalidatesTags: ['Address']
        })
    })
});

export const {
    useGetAllCountriesQuery,
    useGetAllStateByCountryQuery
} = addressApi;