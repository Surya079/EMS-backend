import mongoose from "mongoose";
import env from "dotenv";

env.config();
const connectDB = async () => {
  const DB_connection = process.env.MONGODB_URL;
  try {
    const Db = await mongoose.connect(DB_connection);
    console.log("MangoDB connected");
  } catch (error) {
    console.log("Error while connecting Database");
  }
};

export default connectDB;
