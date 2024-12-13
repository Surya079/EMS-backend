import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addLeave,
  getActionsLeave,
  getLeave,
  getLeaves,
  getViewdetailsLeave,
  getEmpLeave,
} from "../controllers/leaveController.js";

const router = express.Router();

router.get("/", authMiddleware, getLeaves);
router.get("/:id", authMiddleware, getLeave);
router.post("/add", authMiddleware, addLeave);
router.get("/views/:id", authMiddleware, getViewdetailsLeave);
router.put("/:id", authMiddleware, getActionsLeave);
router.get("/employee/:id", authMiddleware, getEmpLeave);

export default router;
