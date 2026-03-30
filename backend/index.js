// Packages
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors"; 

// Files 
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js';
import genreRoutes from './routes/genreRoutes.js';
import moviesRoutes from './routes/moviesRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// configuration 
dotenv.config();
connectDB();

const app = express();

// 2. Updated CORS Middleware
// Note: Yahan aakhir mein '/' ka khayal rakha gaya hai
app.use(cors({
  origin: [
    "https://mern-movie-project.socialrepublic.pk",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // OPTIONS lazmi hai pre-flight requests ke liye
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/genre', genreRoutes);
app.use('/api/v1/movies', moviesRoutes);
app.use('/api/v1/upload', uploadRoutes);

const __dirname = path.resolve();
// Static files serve karne ke liye
app.use('/uploads', express.static(path.join(__dirname, "/uploads")));

// Railway ke liye PORT handle karna
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));