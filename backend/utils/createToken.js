import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });

  // Set JWT as an HTTP_Only Cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    // LOCAL: testing ke liye false, PRODUCTION: true
    secure: process.env.NODE_ENV === "production", 
    // Cross-site cookie handling
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};

export default generateToken;