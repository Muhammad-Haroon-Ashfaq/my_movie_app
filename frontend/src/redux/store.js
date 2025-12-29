import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query/react'
import { apiSlice } from './api/apiSlice';
import authReducer from './feactures/auth/authSlice';
import moviesReducer from '../redux/feactures/movies/movieSlice'

const store = configureStore ({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth : authReducer,
        movies: moviesReducer,
    },
    middleware:(getDefualtMiddleware) => getDefualtMiddleware().concat
    (apiSlice.middleware),
    devTools: true


})
setupListeners(store.dispatch)

export default store;