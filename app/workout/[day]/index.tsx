import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { WorkoutContext } from "@/context/RoutineContext";
import { useContext } from "react";
export default function Workout() {
  const { day } = useLocalSearchParams();

  const { schedule } = useContext(WorkoutContext) as any;

  const routine = schedule.find((routine: any) => routine.dayOfWeek === day);
  console.log("day: ", day);
  console.log("schedule: ", schedule);
  console.log("routine: ", routine);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout for {day}</Text>
      {routine.exercises.map((exercise: any) => {
        return (
          <View key={exercise.name}>
            <Text>{exercise.name}</Text>
            {Array.from({ length: exercise.sets }).map((_, index) => (
              <Text key={index}>
                Set: {index + 1} / Reps: {exercise.reps}
              </Text>
            ))}
          </View>
        );
      })}
    </View>
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
