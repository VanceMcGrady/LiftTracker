import express from "express";
const router = express.Router();
import createRoutes from "./create/index.js";

router.get("/", (req, res) => {
  console.log("GET /workoutSchedule");
  res.send("Workout Schedule GET");
});

router.use("/create", createRoutes);

export default router;
