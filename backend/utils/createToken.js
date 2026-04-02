import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  // Check environment
  const isProduction = process.env.NODE_ENV === "production";

  // createToken.js mein res.cookie wala hissa aise update karein:
res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,      // HTTPS lazmi hai (Railway pe hota hai)
    sameSite: "none",  // Cross-site cookie save karne ke liye 'none' lazmi hai
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",         // Pori site ke liye accessible
});
  return token;
};

export default generateToken;