import React from "react";
import { View, Text } from "react-native";
import DayCard from "./DayCard"; // Ensure this path is correct
import { Link } from "expo-router";
import { WorkoutContext } from "@/context/RoutineContext";

function WeekView(props: any) {
  const { schedule } = React.useContext(WorkoutContext) as any;
  console.log("schedule", schedule);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 10,
      }}
    >
      {schedule.map((routine: any) => (
        <Link
          href={{
            pathname: `./workout/${routine.day}`,
            params: { day: routine.day },
          }}
          key={routine.day}
        >
          <DayCard key={routine.day} routine={routine} />
        </Link>
      ))}
    </View>
  );
}

export default WeekView;
