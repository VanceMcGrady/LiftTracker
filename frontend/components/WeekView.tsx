import { useState, useContext } from "react";
import { View, Text } from "react-native";
import DayCard from "./DayCard"; // Ensure this path is correct
import { Link } from "expo-router";
import { RoutineContext } from "@/context/RoutineContext";

function WeekView(props: any) {
  const { routine, setRoutine } = useContext(RoutineContext) as any;

  const [weekSchedule, setWeekSchedule] = useState(routine || ["hello"]);

  console.log("schedule in WeekView: ", routine);
  if (!weekSchedule.length) {
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
      {weekSchedule.map((routine: any) => (
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
