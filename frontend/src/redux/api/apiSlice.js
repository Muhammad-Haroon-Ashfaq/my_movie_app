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

// const authenticate = asyncHandler(async (req, res, next) => {
//     let token;

//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer")
//     ) {
//         token = req.headers.authorization.split(" ")[1];

//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = await User.findById(decoded.userId).select("-password");
//             next();
//         } catch (error) {
//             res.status(401);
//             throw new Error("Not authorized, token failed");
//         }
//     } else {
//         res.status(401);
//         throw new Error("No token");
//     }
// });


export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Movie", "Genre", "User"],
    endpoints: () => ({}),
});