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
  dayOfWeek: z.string(),
  exercises: z.array(exerciseSchema),
});

export const scheduleSchema = z.object({
  workouts: z.array(workoutSchema),
});

export type Schedule = z.infer<typeof scheduleSchema>;
export const scheduleResponseFormat = zodResponseFormat(
  scheduleSchema,
  "schedule"
);

//  In the  ScheduleSchema.ts  file, we define the schema for a schedule. A schedule has an
// id ,  name ,  workouts , and  dateRange . Each workout has an  id ,  name , and an array
// of  exercises . Each exercise has an  id ,  name ,  sets ,  reps ,  weight , and  rest .
//  We also define a  Schedule  type that is the inferred type of the  scheduleSchema .
// We also define a  scheduleResponseFormat  that is used to format the response of
// the schedule schema.
//  Now that we have defined the schema for the schedule, we can use it to validate the data.
