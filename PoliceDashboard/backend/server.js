import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import faceRouter from "./routes/faceRoute.js";
import getLocationRouter from "./routes/getLocationRoute.js";
import startCron from "./node-cron.js";
dotenv.config()
console.log('SECRET:', process.env.SECRET);
const app = express();
const port = 4000;
const allowedOrigins = ['http://localhost:5173'];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
connectDB();
app.use("/api/user", userRouter);
app.use("/api/location",getLocationRouter);
app.get("/", (req, res) => {
    res.send("server is working");
});
startCron();
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});