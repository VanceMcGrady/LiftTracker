import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const exerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  sets: z.number(),
  reps: z.number(),
  weight: z.number(),
  rest: z.number(),
});

const workoutSchema = z.object({
  id: z.string(),
  name: z.string(),
  exercises: z.array(exerciseSchema),
});

const scheduleSchema = z.object({
  id: z.string(),
  name: z.string(),
  workouts: z.array(workoutSchema),
  dateRange: z.tuple([z.date(), z.date()]),
});
