import express from "express";
import cors from "cors";
import workoutScheduleRoutes from "./routes/workoutSchedule/index.js";
import { loadEnv } from "./config/env.js";

// Load environment variables
loadEnv();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/workoutSchedule", workoutScheduleRoutes);
// Routes
app.get("/", (req, res) => {
  res.send("Workout tracker / GET ");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
