import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { WorkoutContext } from "@/context/WorkoutContext";
import { useContext } from "react";

function Workout(passedsWorkout: any) {
  const { workout, updateWorkout } = useContext(WorkoutContext) as any;
  const { thisWorkout } = passedsWorkout;
  useEffect(() => {
    updateWorkout(thisWorkout);
  }, [passedsWorkout]);

  console.log("workout in Workout component: ", workout);

  return (
    <View>
      <Text>{workout.dayOfWeek}</Text>
    </View>
  );
}

export default Workout;
