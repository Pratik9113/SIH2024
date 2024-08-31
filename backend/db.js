import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// Define the MongoDB connection URL
const mongoURL = process.env.MONGODB_URL; // Ensure this environment variable is set

// Set up MongoDB connection
mongoose.connect(mongoURL);

// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Export the database connection
export default db;
