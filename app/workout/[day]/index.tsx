import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { WorkoutContext } from "@/context/RoutineContext";
import { useContext } from "react";
export default function Workout() {
  const { day } = useLocalSearchParams();

  const { schedule } = useContext(WorkoutContext) as any;

  const routine = schedule.find((routine: any) => routine.day === day).routine;

  console.log("routine: ", routine);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout for {day}</Text>
      {routine.map(
        (exercise: any) => (
          console.log("exercise: ", exercise),
          (<Text key={exercise.exercise}>{exercise.exercise}</Text>)
        )
      )}
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
