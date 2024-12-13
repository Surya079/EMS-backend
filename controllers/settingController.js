import { User } from "../models/User.js";
import bcrypt from "bcrypt";

const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, error: "Old Password not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while changing password",
    });
  }
};

export default changePassword;
