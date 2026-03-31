import { apiSlice } from './apiSlice';
import { GENRE_URL } from '../constants';

export const genreApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Naya Genre banane ke liye
        createGenre: builder.mutation({
            query: (newGenre) => ({
                url: `${GENRE_URL}`,
                method: "POST",
                body: newGenre,
            }),
            // Is se 'Genre' list refresh ho jayegi
            invalidatesTags: ["Genre"], 
        }),

        // Genre update karne ke liye
        updateGenre: builder.mutation({
            query: ({ id, updateGenre }) => ({
                url: `${GENRE_URL}/${id}`,
                method: "PUT",
                body: updateGenre,
            }),
            invalidatesTags: ["Genre"],
        }),

        // Genre delete karne ke liye
        deleteGenre: builder.mutation({
            query: (id) => ({
                url: `${GENRE_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Genre"],
        }),

        // Saare Genres fetch karne ke liye
        fetchGenre: builder.query({
            query: () => `${GENRE_URL}/genres`,
            // Is se ye data cache ho jata hai aur 'Genre' tag se pehchana jata hai
            providesTags: ["Genre"],
        }),
    }),
});

export const {
    useCreateGenreMutation,
    useUpdateGenreMutation,
    useDeleteGenreMutation,
    useFetchGenreQuery,
} = genreApiSlice;