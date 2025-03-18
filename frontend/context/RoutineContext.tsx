import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
// Create a context
const mockWorkoutSchedule: any = {
  workouts: [
    {
      id: "1",
      name: "Strength Training",
      completed: false,
      dayOfWeek: "Monday",
      duration: 40,
      targetMuscleGroups: ["Legs", "Chest", "Back", "Shoulders"],
      exercises: [
        {
          completed: false,
          id: "1-1",
          name: "Barbell Squat",
          sets: [
            { id: 1, complete: false, reps: 4, weight: 100 },
            { id: 2, complete: false, reps: 4, weight: 100 },
            { id: 3, complete: false, reps: 4, weight: 100 },
            { id: 4, complete: false, reps: 4, weight: 100 },
          ],
        },
        {
          id: "1-2",
          name: "Bench Press",
          sets: [
            { id: 1, complete: false, reps: 4, weight: 100 },
            { id: 2, complete: false, reps: 4, weight: 100 },
            { id: 3, complete: false, reps: 4, weight: 100 },
            { id: 4, complete: false, reps: 4, weight: 100 },
          ],
        },
        {
          id: "1-3",
          name: "Deadlift",
          sets: [
            { id: 1, complete: false, reps: 4, weight: 100 },
            { id: 2, complete: false, reps: 4, weight: 100 },
            { id: 3, complete: false, reps: 4, weight: 100 },
            { id: 4, complete: false, reps: 4, weight: 100 },
          ],
        },
        {
          id: "1-4",
          name: "Overhead Press",
          sets: [
            { id: 1, complete: false, reps: 4, weight: 100 },
            { id: 2, complete: false, reps: 4, weight: 100 },
            { id: 3, complete: false, reps: 4, weight: 100 },
            { id: 4, complete: false, reps: 4, weight: 100 },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Cardio and Core",
      completed: false,
      dayOfWeek: "Tuesday",
      duration: 40,
      targetMuscleGroups: ["Legs", "Chest", "Back", "Shoulders"],
      exercises: [
        {
          completed: false,
          id: "2-1",
          name: "Running",
          sets: [
            { id: 1, complete: false, reps: 4, weight: 100 },
            { id: 2, complete: false, reps: 4, weight: 100 },
            { id: 3, complete: false, reps: 4, weight: 100 },
            { id: 4, complete: false, reps: 4, weight: 100 },
          ],
        },
        {
          id: "2-2",
          name: "Plank",
          sets: [
            { id: 1, complete: false, reps: 4, weight: 100 },
            { id: 2, complete: false, reps: 4, weight: 100 },
            { id: 3, complete: false, reps: 4, weight: 100 },
            { id: 4, complete: false, reps: 4, weight: 100 },
          ],
        },
        {
          id: "2-3",
          name: "Russian Twists",
          sets: [
            { id: 1, complete: false, reps: 4, weight: 100 },
            { id: 2, complete: false, reps: 4, weight: 100 },
            { id: 3, complete: false, reps: 4, weight: 100 },
            { id: 4, complete: false, reps: 4, weight: 100 },
          ],
        },
        {
          id: "2-4",
          name: "Leg Raises",
          sets: [
            { id: 1, complete: false, reps: 4, weight: 100 },
            { id: 2, complete: false, reps: 4, weight: 100 },
            { id: 3, complete: false, reps: 4, weight: 100 },
            { id: 4, complete: false, reps: 4, weight: 100 },
          ],
        },
      ],
    },
    {
      id: "3",
      name: "Upper Body & Conditioning",
      completed: false,
      dayOfWeek: "Wednesday",
      duration: 40,
      targetMuscleGroups: ["Legs", "Chest", "Back", "Shoulders"],
      exercises: [
        {
          completed: false,
          id: "3-1",
          name: "Pull-Ups",
          sets: [
            { id: 1, complete: false, reps: 4, weight: 100 },
            { id: 2, complete: false, reps: 4, weight: 100 },
            { id: 3, complete: false, reps: 4, weight: 100 },
            { id: 4, complete: false, reps: 4, weight: 100 },
          ],
        },
        {
          id: "3-2",
          name: "Push-Ups",
          sets: [
            { id: 1, complete: false, reps: 4, weight: 100 },
            { id: 2, complete: false, reps: 4, weight: 100 },
            { id: 3, complete: false, reps: 4, weight: 100 },
            { id: 4, complete: false, reps: 4, weight: 100 },
          ],
        },
        {
          id: "3-3",
          name: "Dumbbell Rows",
          sets: [
            { id: 1, complete: false, reps: 4, weight: 100 },
            { id: 2, complete: false, reps: 4, weight: 100 },
            { id: 3, complete: false, reps: 4, weight: 100 },
            { id: 4, complete: false, reps: 4, weight: 100 },
          ],
          reps: 12,
          weight: 30,
          rest: 60,
        },
        {
          id: "3-4",
          name: "Burpees",
          sets: [
            { id: 1, complete: false, reps: 4, weight: 100 },
            { id: 2, complete: false, reps: 4, weight: 100 },
            { id: 3, complete: false, reps: 4, weight: 100 },
            { id: 4, complete: false, reps: 4, weight: 100 },
          ],
        },
      ],
    },
    {
      id: "4",
      name: "Rest Day",
      completed: false,
      dayOfWeek: "Thursday",
      duration: 40,
      targetMuscleGroups: ["Legs", "Chest", "Back", "Shoulders"],
      exercises: [],
    },
    {
      completed: false,
      id: "5",
      name: "Lower Body & Flexibility",
      dayOfWeek: "Friday",
      duration: 40,
      targetMuscleGroups: ["Legs", "Chest", "Back", "Shoulders"],
      exercises: [
        {
          completed: false,
          id: "5-1",
          name: "Lunges",
          sets: [
            { id: 1, complete: false, reps: 4, weight: 100 },
            { id: 2, complete: false, reps: 4, weight: 100 },
            { id: 3, complete: false, reps: 4, weight: 100 },
            { id: 4, complete: false, reps: 4, weight: 100 },
          ],
        },
        {
          id: "5-2",
          name: "Calf Raises",
          sets: [
            { id: 1, complete: false, reps: 4, weight: 100 },
            { id: 2, complete: false, reps: 4, weight: 100 },
            { id: 3, complete: false, reps: 4, weight: 100 },
            { id: 4, complete: false, reps: 4, weight: 100 },
          ],
        },
        {
          id: "5-3",
          name: "Leg Press",
          sets: [
            { id: 1, complete: false, reps: 4, weight: 100 },
            { id: 2, complete: false, reps: 4, weight: 100 },
            { id: 3, complete: false, reps: 4, weight: 100 },
            { id: 4, complete: false, reps: 4, weight: 100 },
          ],
        },
        {
          id: "5-4",
          name: "Stretching Routine",
        },
      ],
    },
    {
      id: "6",
      name: "Active Recovery",
      completed: false,
      dayOfWeek: "Saturday",
      duration: 40,
      targetMuscleGroups: ["Legs", "Chest", "Back", "Shoulders"],
      exercises: [
        { id: "6-1", completed: false, name: "Yoga", sets: [] },
        {
          id: "6-2",
          completed: false,
          name: "Sauna or Steam",
          sets: 1,
          reps: 1,
          weight: 0,
          rest: 0,
        },
        { id: "6-3", name: "Walking", sets: [] },
      ],
    },
    {
      id: "7",
      name: "Full Body",
      completed: false,
      dayOfWeek: "Sunday",
      duration: 40,
      targetMuscleGroups: ["Legs", "Chest", "Back", "Shoulders"],
      exercises: [
        {
          completed: false,
          id: "7-1",
          name: "Kettlebell Swings",
          sets: [
            { id: 1, complete: false, reps: 4, weight: 100 },
            { id: 2, complete: false, reps: 4, weight: 100 },
            { id: 3, complete: false, reps: 4, weight: 100 },
            { id: 4, complete: false, reps: 4, weight: 100 },
          ],
        },
        { id: "7-2", name: "TRX Rows", sets: 3, reps: 10, weight: 0, rest: 75 },
        { id: "7-3", name: "Box Jumps", sets: 4, reps: 8, weight: 0, rest: 90 },
        {
          id: "7-4",
          name: "Medicine Ball Slams",
          sets: [
            { id: 1, complete: false, reps: 4, weight: 100 },
            { id: 2, complete: false, reps: 4, weight: 100 },
            { id: 3, complete: false, reps: 4, weight: 100 },
            { id: 4, complete: false, reps: 4, weight: 100 },
          ],
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
