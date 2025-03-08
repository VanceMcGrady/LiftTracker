import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { RoutineContext } from "@/context/RoutineContext";
import { useContext } from "react";
export default function Workout() {
  const { day } = useLocalSearchParams();

  const { routine } = useContext(RoutineContext) as any;

  const workout = routine.find((routine: any) => routine.dayOfWeek === day);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout for {day}</Text>
      {workout.exercises.map((exercise: any) => {
        return (
          <View
            key={exercise.name}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: "black",
              borderStyle: "solid",
              borderRadius: 5,
              width: "100%",
            }}
          >
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
