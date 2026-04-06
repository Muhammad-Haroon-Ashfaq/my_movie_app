// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import asyncHandler from "./asyncHandler.js";

// const authenticate = asyncHandler(async (req, res, next) => {
//     let token = req.cookies.jwt;
//     // console.log("Token received:", token);
//     if (token) {
//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             // .select('-password') zaroori hai security ke liye
//             req.user = await User.findById(decoded.userId).select("-password");
//             // console.log("User found:", req.user);
//             if (!req.user) {
//                 res.status(401);
//                 throw new Error("User not found");
//             }
//             next();
//         } catch (error) {
//             res.status(401);
//             throw new Error("Not authorized, token failed.");
//         }
//     } else {
//         res.status(401);
//         throw new Error("Not authorized, no token");
//     }
// });



// const authorizeAdmin = (req, res, next) => {
//     if (req.user && req.user.isAdmin) {
//         next();
//     } else {
//         res.status(403).json({ message: "Not authorized as an admin" });
//     }
// };

// export { authenticate, authorizeAdmin };

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
    let token;

    // 🔥 Authorization header se token lena
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // 🔥 verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 🔥 user find karo
            req.user = await User.findById(decoded.userId).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: "Token failed" });
        }
    } else {
        return res.status(401).json({ message: "No token, not authorized" });
    }
});

const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as an admin" });
    }
};

export { authenticate, authorizeAdmin };