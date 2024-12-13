import express from "express";
import env from "dotenv";
import cors from "cors";
import authRouter from "../routes/auth.js";
import departmentRouter from "../routes/department.js";
import employeeRouter from "../routes/employee.js";
import salaryRouter from "../routes/salary.js";
import leaveRouter from "../routes/leaves.js";
import settingsRouter from "../routes/settings.js";
import connectDB from "../Database/Db.js";

env.config();
const app = express();
const port = process.env.PORT || 3000; // Default port if not specified in .env

connectDB();
app.use(cors());
app.use(express.json());
app.use("/images", express.static("public/images"));
app.get("/", (req, res) => {
  res.send("Welcome to Employee Management System");
});

app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/settings", settingsRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});