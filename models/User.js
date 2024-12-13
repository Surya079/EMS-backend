import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "employee"], required: true },
  profileImage: { type: String },
  creatAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});

export const User = mongoose.model("User", Userschema);
