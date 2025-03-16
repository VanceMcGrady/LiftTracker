import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { WorkoutContext } from "@/context/WorkoutContext";
import { useContext, useState } from "react";
import { index } from "drizzle-orm/mysql-core";

function Workout(passedsWorkout: any) {
  const { workout, updateWorkout } = useContext(WorkoutContext) as any;
  const { thisWorkout } = passedsWorkout;
  useEffect(() => {
    updateWorkout(thisWorkout);
  }, [passedsWorkout]);

  console.log("workout in Workout component: ", workout);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [exercise, setExercise] = useState({} as any);
  useEffect(() => {
    if (workout.exercises) {
      setExercise(workout.exercises[exerciseIndex]);
    }
  }, [exerciseIndex, workout]);
  console.log("exercise in Workout component: ", exercise);
  return (
    <View>
      <Text>{workout.dayOfWeek}</Text>
      {Array.from({ length: exercise.sets }, (_, i) => (
        <View key={i}>
          <Text>Set {i + 1}</Text>
          <Text>Reps: {exercise.reps}</Text>
          <Text>Weight: {exercise.weight}</Text>
        </View>
      ))}
    </View>
  );
}

export default Workout;
