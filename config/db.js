// db.js
import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB Atlas");
    } else {
      console.log("MongoDB connection already established");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
