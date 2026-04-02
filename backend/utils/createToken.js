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
    secure: isProduction,                 // HTTPS pe hi cookie send hogi
    sameSite: isProduction ? "None" : "Lax", // Cross-origin handle
    maxAge: 30 * 24 * 60 * 60 * 1000,

    // 👇 IMPORTANT (optional but recommended)
    path: "/", 
  });

  return token;
};

export default generateToken;