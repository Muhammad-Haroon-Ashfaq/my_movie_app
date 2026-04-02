import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  // Check environment
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,      // Railway pe ye TRUE hona lazmi hai
    sameSite: "none",  // Cross-site ke liye ye NONE hona lazmi hai
    maxAge: 30 * 24 * 60 * 60 * 1000,
});
  return token;
};

export default generateToken;