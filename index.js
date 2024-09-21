// index.js
import express from "express";
import cors from "cors";
import Routes from "./routes/index.js"; // Ensure this is correctly set up
import connectDB from "./config/db.js"; // Import the connection function

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(Routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
