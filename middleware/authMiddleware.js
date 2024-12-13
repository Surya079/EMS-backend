import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token)
      return res
        .status(401)
        .json({ success: false, error: "Authorization token not provided" });
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (!decoded) {
      return res
        .status(403)
        .json({ success: false, error: "Token is invalid" });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, error: "Token expired, please relogin" });
    }

    return res.status(500).json({
      success: false,
      error: "Serverside error ",
      details: error.message,
    });
  }
};

export default verifyUser;
