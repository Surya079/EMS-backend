import mongoose from "mongoose";
import env from "dotenv";

env.config();
const connectDB = async () => {
  const DB_connection = process.env.MONGODB_URL;

  try {
    const Db = await mongoose.connect(
      "mongodb+srv://suryavme005:FdAUM9hhitBUiQ9O@employeems.eyuhg.mongodb.net/?retryWrites=true&w=majority&appName=employeeMS"
    );
    console.log("MangoDB connected");
  } catch (error) {
    console.log(error);

    console.log("Error while connecting Database");
  }
};

export default connectDB;
