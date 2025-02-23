import express from "express";
import createPOST from "./POST.js";
const router = express.Router();

router.get("/", (req, res) => {
  console.log("GET /workoutSchedule/create");
  res.send("create GET");
});
router.post("/", createPOST); // POST /workoutSchedule    Create a new workout schedule

export default router;
