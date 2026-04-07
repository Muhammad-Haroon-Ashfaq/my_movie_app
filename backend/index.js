// import express from "express";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import path from "path";
// import cors from "cors"; 
// import fs from "fs"; // Folder check karne ke liye

// // Files 
// import connectDB from "./config/db.js";
// import userRoutes from './routes/userRoutes.js';
// import genreRoutes from './routes/genreRoutes.js';
// import moviesRoutes from './routes/moviesRoutes.js';
// import uploadRoutes from './routes/uploadRoutes.js';

// dotenv.config();
// connectDB();

// const app = express();

// // Railway proxy trust (CORS aur Cookies ke liye zaroori hai)
// app.set("trust proxy", 1); 

// // CORS Configuration
// app.use(cors({
//   origin: [
//     "https://mern-movie-project.socialrepublic.pk",
//     "http://localhost:5173"
//   ],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Static Folder Setup (Uploads ke liye)
// const __dirname = path.resolve();
// const uploadDir = path.join(__dirname, "uploads");

// // Agar uploads folder nahi hai toh bana do (Railway fix)
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

// // Serve static files from the 'uploads' directory
// app.use("/uploads", express.static(uploadDir));

// // API Routes
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/genre', genreRoutes);
// app.use('/api/v1/movies', moviesRoutes);
// app.use('/api/v1/upload', uploadRoutes);

// // Port setup for Railway
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors"; 
import fs from "fs";

// Files 
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js';
import genreRoutes from './routes/genreRoutes.js';
import moviesRoutes from './routes/moviesRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Railway proxy trust
app.set("trust proxy", 1); 

// CORS Configuration
app.use(cors({
  origin: [
    "https://mern-movie-project.socialrepublic.pk",
    "http://localhost:5173",
    "https://mymovieapp-production.up.railway.app" // Apne backend URL ko bhi allow karein
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- STATIC FOLDER SETUP ---
const __dirname = path.resolve();
const uploadDir = path.join(__dirname, "uploads");

// Folder create karne ka logic
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ✨ Static files serve karne ka sahi tariqa (Path join ke sath)
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "/uploads"), {
    maxAge: "7d", // ✅ cache 7 din
  })
);
// ---------------------------

// API Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/genre', genreRoutes);
app.use('/api/v1/movies', moviesRoutes);
app.use('/api/v1/upload', uploadRoutes);

// Root route (Testing ke liye)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Port setup for Railway
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));