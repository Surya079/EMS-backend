import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Login = async (req, res) => {
  const JWT_SECRET = process.env.JWT_KEY;
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, error: "Password not match" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      token,
      user: { _id: user.id, name: user.name, role: user.role },
  
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

export { Login, verify };
