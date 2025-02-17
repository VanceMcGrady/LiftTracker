import React from "react";
import { View, Text } from "react-native";
import DayCard from "./DayCard"; // Ensure this path is correct
import { Link } from "expo-router";
import Workout from "./Workout";

function WeekView(props: any) {
  const schedule = [
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
  ];
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {schedule.map((routine: any) => (
        <Link href="./Workout" key={routine.day}>
          <DayCard key={routine.day} routine={routine} />
        </Link>
      ))}
    </View>
  );
}

export default WeekView;
