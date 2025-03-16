import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { RoutineContext } from "@/context/RoutineContext";
import { useContext } from "react";
import { WorkoutProvider } from "@/context/WorkoutContext";
import Workout from "@/components/Workout";
export default function WorkoutView() {
  const { day } = useLocalSearchParams();

  const { routine } = useContext(RoutineContext) as any;

  const workout = routine.find((routine: any) => routine.dayOfWeek === day);
  //console.log("workout in index: ", workout);
  return (
    <WorkoutProvider>
      <Workout thisWorkout={workout} />
    </WorkoutProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
