import React, { createContext, useState } from "react";

// Create a context
export const WorkoutContext = createContext({});

// context/WorkoutContext.js
export function WorkoutProvider({ children }: any) {
  const [schedule, setSchedule] = useState([
    {
      day: "Monday",
      workout: "Chest",
      routine: [
        { excercise: "Bench Press", sets: 3, reps: 12 },
        { excercise: "Incline Bench Press", sets: 3, reps: 12 },
        { excercise: "Decline Bench Press", sets: 3, reps: 12 },
        { excercise: "Dumbbell Flyes", sets: 3, reps: 12 },
      ],
    },
    {
      day: "Tuesday",
      workout: "Back",
      routine: [
        { excercise: "Deadlift", sets: 3, reps: 12 },
        { excercise: "Pullups", sets: 3, reps: 12 },
        { excercise: "Barbell Rows", sets: 3, reps: 12 },
        { excercise: "Lat Pulldowns", sets: 3, reps: 12 },
      ],
    },
    { day: "Wednesday", workout: null },
    { day: "Thursday", workout: null },
    {
      day: "Friday",
      workout: "Legs",
      routine: [
        { excercise: "Squats", sets: 3, reps: 12 },
        { excercise: "Leg Press", sets: 3, reps: 12 },
        { excercise: "Leg Curls", sets: 3, reps: 12 },
        { excercise: "Leg Extensions", sets: 3, reps: 12 },
      ],
    },
    {
      day: "Saturday",
      workout: "Shoulders",
      routine: [
        { excercise: "Military Press", sets: 3, reps: 12 },
        { excercise: "Dumbbell Shoulder Press", sets: 3, reps: 12 },
        { excercise: "Front Raises", sets: 3, reps: 12 },
        { excercise: "Lateral Raises", sets: 3, reps: 12 },
      ],
    },
    { day: "Sunday", workout: null },
  ]);

  // Value to be shared
  const value = {
    schedule,
    setSchedule,
  };

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
}
