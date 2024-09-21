import express from "express";
import "dotenv/config";
import cors from "cors";
import Routes from "./routes/index.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 8000;
const app = express();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(
  cors({
    origin: "https://your-netlify-deployment-url.netlify.app", // Add your Netlify URL here
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(express.json());

app.use(Routes);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
