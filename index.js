import express from "express";
import cors from "cors";
import "dotenv/config.js";
import Routes from "./routes/index.js";
import connectDB from "./config/db.js";
const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(cors());
app.use(express.json());

app.use(Routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
