import { User } from "./models/User.js";
import bcrypt from "bcrypt";
import connectDB from "./Database/Db.js";

export const UserRegister = async () => {
  connectDB();
  try {
    const hashPwd = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "admin",
      email: "admin@gmail.com",
      password: hashPwd,
      role: "admin",
    });
    await newUser.save();
  } catch (error) {
    console.log("Error while register", error);
  }
};

UserRegister();
