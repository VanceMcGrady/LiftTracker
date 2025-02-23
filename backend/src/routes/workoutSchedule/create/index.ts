import exp from "constants";
import express from "express";
import { Router } from "express";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("GET /workoutSchedule");
  res.send("Workout Schedule GET");
});
router.post("/", (req, res) => {}); // POST /workoutSchedule    Create a new workout schedule

export default router;
