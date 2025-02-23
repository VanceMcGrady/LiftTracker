import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  console.log("GET /workoutSchedule");
  res.send("Workout Schedule GET");
});
router.post("/", (req, res) => {});
export default router;
