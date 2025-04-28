import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import updateRoute from "./routes/updateRoute.js";
import cors from 'cors'
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/data", questionRoutes);
app.use("/api/update",updateRoute);

app.listen(5000, () => console.log(" Server running on port 5000"));

