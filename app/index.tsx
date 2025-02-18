import { Text, View } from "react-native";
import { Link } from "expo-router";
import { useContext } from "react";
import { WorkoutContext } from "@/context/RoutineContext";
import { parseQueryParams } from "expo-router/build/fork/getStateFromPath-forks";
import { useLocalSearchParams } from "expo-router/build/hooks";
WorkoutContext;

export default function Index() {
  const { day } = useLocalSearchParams();
  console.log("day", day);
  const { schedule } = useContext(WorkoutContext) as any;
  console.log("schedule", schedule);
  const routine = schedule.filter((routine: any) => routine.day === day);
  console.log("routine", routine);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is the Home Screen</Text>
      <Link href="./week-view">Week View</Link>
    </View>
  );
}
