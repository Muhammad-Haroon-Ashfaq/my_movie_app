import {createSlice} from '@reduxjs/toolkit';

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        moviesFilter: {
            searchTerm: "",
            selectedGenre:"",
            selectedYear: "",
            selectedSort: [],
        },

        filteredMovies: [],
        moviesYears: [],
        uniqueYear: [],
    },

    reducers: {
        setMoviesFilter: (state, action) => {
            state.moviesFilter = {...state.moviesFilter, ...action.payload}
        },

        setFilteredMovies: (state, action) => {
            state.filteredMovies = action.payload;
        },

        setMovieYears: (state, action) => {
            state.moviesYears = action.payload;
        },

        setUniqueYears: (state, action) => {
            state.uniqueYear = action.payload;
        },

    },
});

export const {
    setMoviesFilter,
    setFilteredMovies,
    setMovieYears,
    setUniqueYears,
} = movieSlice.actions;

export default movieSlice.reducer; 