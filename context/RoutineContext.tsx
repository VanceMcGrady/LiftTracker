import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import OpenAI from "openai";
// Create a context
export const WorkoutContext = createContext({});

export function WorkoutProvider({ children }: any) {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchWorkoutSchedule = async () => {
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/engines/davinci-codex/completions",
          {
            prompt: "Create a weekly workout schedule",
            max_tokens: 150,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
          }
        );

        const generatedSchedule = response.data.choices[0].text;
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

// {
//   day: "Monday",
//   workout: "Chest",
//   routine: [
//     { exercise: "Bench Press", sets: 3, reps: 12 },
//     { exercise: "Incline Bench Press", sets: 3, reps: 12 },
//     { exercise: "Decline Bench Press", sets: 3, reps: 12 },
//     { exercise: "Dumbbell Flyes", sets: 3, reps: 12 },
//   ],
// },
// {
//   day: "Tuesday",
//   workout: "Back",
//   routine: [
//     { exercise: "Deadlift", sets: 3, reps: 12 },
//     { exercise: "Pullups", sets: 3, reps: 12 },
//     { exercise: "Barbell Rows", sets: 3, reps: 12 },
//     { exercise: "Lat Pulldowns", sets: 3, reps: 12 },
//   ],
// },
// { day: "Wednesday", workout: null },
// { day: "Thursday", workout: null },
// {
//   day: "Friday",
//   workout: "Legs",
//   routine: [
//     { exercise: "Squats", sets: 3, reps: 12 },
//     { exercise: "Leg Press", sets: 3, reps: 12 },
//     { exercise: "Leg Curls", sets: 3, reps: 12 },
//     { exercise: "Leg Extensions", sets: 3, reps: 12 },
//   ],
// },
// {
//   day: "Saturday",
//   workout: "Shoulders",
//   routine: [
//     { exercise: "Military Press", sets: 3, reps: 12 },
//     { exercise: "Dumbbell Shoulder Press", sets: 3, reps: 12 },
//     { exercise: "Front Raises", sets: 3, reps: 12 },
//     { exercise: "Lateral Raises", sets: 3, reps: 12 },
//   ],
// },
// { day: "Sunday", workout: null },
