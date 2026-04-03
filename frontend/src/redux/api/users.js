import {apiSlice} from './apiSlice';
import { USERS_URL } from '../constants';
import Register from '../../pages/Auth/Register';
import { logout } from '../feactures/auth/authSlice';
import Profile from '../../pages/User/Profile';
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
       Login: builder.mutation({
    query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
        credentials: 'include', // 🔥 ADD THIS
    }),
}),

    register: builder.mutation({
        query:(data) => ({
            url: `${USERS_URL}`,
            method: "POST",
            body: data,
        }),
    }),

    logout: builder.mutation({
    query: () => ({
        url:`${USERS_URL}/logout`,
        method: "POST",
        credentials: 'include', // 🔥 ADD THIS
   }),
}),

    Profile: builder.mutation({
    query: (data) => ({
        url: `${USERS_URL}/profile`,
        method:"PUT",
        body:data,
        credentials: 'include', // 🔥 ADD THIS
  }),
}),


    getUsers: builder.query({
        query: () => ({
            url: USERS_URL,
        }),
    }),

  }),        
}); 
export const {useLoginMutation, useRegisterMutation, useLogoutMutation, useProfileMutation, useGetUsersQuery} = userApiSlice;