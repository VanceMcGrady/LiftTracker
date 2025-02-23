import React, { createContext, useState, useEffect } from "react";
import {
  scheduleSchema,
  scheduleResponseFormat,
} from "../../backend/schema/ScheduleSchema";

// Create a context
export const WorkoutContext = createContext({});

export function WorkoutProvider({ children }: any) {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // setSchedule() to the value of the schedule retreived from the backend
  });

  // Value to be shared
  const value = {
    schedule,
    setSchedule,
  };

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
}

// workout template:

const workoutFormat = [
  {
    day: "Monday",
    workoutName: "Chest",
    routine: [
      { exercise: "Bench Press", sets: 3, reps: 12 },
      { exercise: "Incline Bench Press", sets: 3, reps: 12 },
      { exercise: "Decline Bench Press", sets: 3, reps: 12 },
      { exercise: "Dumbbell Flyes", sets: 3, reps: 12 },
    ],
  },
  {
    day: "Tuesday",
    workout: "Back",
    routine: [
      { exercise: "Deadlift", sets: 3, reps: 12 },
      { exercise: "Pullups", sets: 3, reps: 12 },
      { exercise: "Barbell Rows", sets: 3, reps: 12 },
      { exercise: "Lat Pulldowns", sets: 3, reps: 12 },
    ],
  },
  { day: "Wednesday", workout: null },
  { day: "Thursday", workout: null },
  {
    day: "Friday",
    workout: "Legs",
    routine: [
      { exercise: "Squats", sets: 3, reps: 12 },
      { exercise: "Leg Press", sets: 3, reps: 12 },
      { exercise: "Leg Curls", sets: 3, reps: 12 },
      { exercise: "Leg Extensions", sets: 3, reps: 12 },
    ],
  },
  {
    day: "Saturday",
    workout: "Shoulders",
    routine: [
      { exercise: "Military Press", sets: 3, reps: 12 },
      { exercise: "Dumbbell Shoulder Press", sets: 3, reps: 12 },
      { exercise: "Front Raises", sets: 3, reps: 12 },
      { exercise: "Lateral Raises", sets: 3, reps: 12 },
    ],
  },
  { day: "Sunday", workout: null },
];
