import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    // Ye option RTK Query mein built-in hoti hai jo har request ke saath cookies bhejti hai
    prepareHeaders: (headers) => {
        return headers;
    },
    // Is line se browser ko pata chalta hai ke cookies bhejni hain
    credentials: 'include', 
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Movie", "Genre", "User"],
    endpoints: () => ({}),
});