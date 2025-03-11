import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
// Create a context
const mockWorkoutSchedule: any = {
  workouts: [
    {
      id: "1",
      name: "Strength Training",
      dayOfWeek: "Monday",
      duration: 40,
      targetMuscleGroups: ["Legs", "Chest", "Back", "Shoulders"],
      exercises: [
        {
          id: "1-1",
          name: "Barbell Squat",
          sets: 4,
          reps: 6,
          weight: 100,
          rest: 120,
        },
        {
          id: "1-2",
          name: "Bench Press",
          sets: 4,
          reps: 6,
          weight: 65,
          rest: 90,
        },
        {
          id: "1-3",
          name: "Deadlift",
          sets: 4,
          reps: 6,
          weight: 120,
          rest: 120,
        },
        {
          id: "1-4",
          name: "Overhead Press",
          sets: 3,
          reps: 8,
          weight: 40,
          rest: 90,
        },
      ],
    },
    {
      id: "2",
      name: "Cardio and Core",
      dayOfWeek: "Tuesday",
      duration: 40,
      targetMuscleGroups: ["Legs", "Chest", "Back", "Shoulders"],
      exercises: [
        { id: "2-1", name: "Running", sets: 1, reps: 1, weight: 0, rest: 0 },
        { id: "2-2", name: "Plank", sets: 3, reps: 1, weight: 0, rest: 60 },
        {
          id: "2-3",
          name: "Russian Twists",
          sets: 4,
          reps: 15,
          weight: 10,
          rest: 45,
        },
        {
          id: "2-4",
          name: "Leg Raises",
          sets: 4,
          reps: 12,
          weight: 0,
          rest: 45,
        },
      ],
    },
    {
      id: "3",
      name: "Upper Body & Conditioning",
      dayOfWeek: "Wednesday",
      duration: 40,
      targetMuscleGroups: ["Legs", "Chest", "Back", "Shoulders"],
      exercises: [
        { id: "3-1", name: "Pull-Ups", sets: 3, reps: 8, weight: 0, rest: 90 },
        { id: "3-2", name: "Push-Ups", sets: 4, reps: 15, weight: 0, rest: 60 },
        {
          id: "3-3",
          name: "Dumbbell Rows",
          sets: 3,
          reps: 12,
          weight: 30,
          rest: 60,
        },
        { id: "3-4", name: "Burpees", sets: 3, reps: 10, weight: 0, rest: 90 },
      ],
    },
    {
      id: "4",
      name: "Rest Day",
      dayOfWeek: "Thursday",
      duration: 40,
      targetMuscleGroups: ["Legs", "Chest", "Back", "Shoulders"],
      exercises: [],
    },
    {
      id: "5",
      name: "Lower Body & Flexibility",
      dayOfWeek: "Friday",
      duration: 40,
      targetMuscleGroups: ["Legs", "Chest", "Back", "Shoulders"],
      exercises: [
        { id: "5-1", name: "Lunges", sets: 3, reps: 12, weight: 20, rest: 60 },
        {
          id: "5-2",
          name: "Calf Raises",
          sets: 4,
          reps: 15,
          weight: 50,
          rest: 45,
        },
        {
          id: "5-3",
          name: "Leg Press",
          sets: 3,
          reps: 10,
          weight: 140,
          rest: 90,
        },
        {
          id: "5-4",
          name: "Stretching Routine",
          sets: 1,
          reps: 1,
          weight: 0,
          rest: 0,
        },
      ],
    },
    {
      id: "6",
      name: "Active Recovery",
      dayOfWeek: "Saturday",
      duration: 40,
      targetMuscleGroups: ["Legs", "Chest", "Back", "Shoulders"],
      exercises: [
        { id: "6-1", name: "Yoga", sets: 1, reps: 1, weight: 0, rest: 0 },
        {
          id: "6-2",
          name: "Sauna or Steam",
          sets: 1,
          reps: 1,
          weight: 0,
          rest: 0,
        },
        { id: "6-3", name: "Walking", sets: 1, reps: 1, weight: 0, rest: 0 },
      ],
    },
    {
      id: "7",
      name: "Full Body",
      dayOfWeek: "Sunday",
      duration: 40,
      targetMuscleGroups: ["Legs", "Chest", "Back", "Shoulders"],
      exercises: [
        {
          id: "7-1",
          name: "Kettlebell Swings",
          sets: 4,
          reps: 12,
          weight: 20,
          rest: 60,
        },
        { id: "7-2", name: "TRX Rows", sets: 3, reps: 10, weight: 0, rest: 75 },
        { id: "7-3", name: "Box Jumps", sets: 4, reps: 8, weight: 0, rest: 90 },
        {
          id: "7-4",
          name: "Medicine Ball Slams",
          sets: 3,
          reps: 10,
          weight: 10,
          rest: 60,
        },
      ],
    },
  ],
};
export const RoutineContext = createContext({});

export function RoutineProvider({ children }: any) {
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    // setSchedule() to the value of the schedule retreived from the backend
    // try {
    //   axios
    //     .post("http://localhost:3000/workoutSchedule/create", { new: true })
    //     .then((res) => {
    //       console.log("res.data: ", res.data);
    //       const schedule = res.data;
    //       console.log("schedule in Context: ", schedule);
    //       setSchedule(schedule.workouts);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }

    setRoutine(mockWorkoutSchedule.workouts);
  }, []);

  // Value to be shared
  const value = {
    routine,
    setRoutine,
  };

  return (
    <RoutineContext.Provider value={value}>{children}</RoutineContext.Provider>
  );
}
