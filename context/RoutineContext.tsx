import React, { createContext, useState, useEffect } from "react";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import OpenAI from "openai";

// Create a context
export const WorkoutContext = createContext({});

export function WorkoutProvider({ children }: any) {
  const [schedule, setSchedule] = useState([]);

  console.log("process.env.OPENAI_API_KEY", process.env.OPENAI_API_KEY);
  const openai: any = new OpenAI({
    apiKey:
      "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",
  });

  useEffect(() => {
    const fetchWorkoutSchedule = async () => {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          store: true,
          messages: [
            { role: "user", content: "write a workout routine for this week" },
          ],
        });
        console.log("response: ", response.choices[0].message.content);
        const generatedSchedule = response.choices[0].message.content;
        // Parse the generated schedule and set it to the state
        setSchedule(JSON.parse(generatedSchedule));
        console.log("Generated workout schedule:", generatedSchedule);
      } catch (error) {
        console.error("Error fetching workout schedule:", error);
      }
    };

    fetchWorkoutSchedule();
  }, []);

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
