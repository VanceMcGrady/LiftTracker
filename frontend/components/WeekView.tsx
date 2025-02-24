import React from "react";
import { View, Text } from "react-native";
import DayCard from "./DayCard"; // Ensure this path is correct
import { Link } from "expo-router";
import { WorkoutContext } from "@/context/RoutineContext";

function WeekView(props: any) {
  const { schedule } = React.useContext(WorkoutContext) as any;

  if (!schedule.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Creating your workout schedule...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 10,
        paddingHorizontal: 10,
      }}
    >
      {schedule.map((routine: any) => (
        <Link
          href={{
            pathname: `./workout/${routine.dayOfWeek}`,
          }}
          key={routine.id}
        >
          <DayCard key={routine.id} routine={routine} />
        </Link>
      ))}
    </View>
  );
}

export default WeekView;
