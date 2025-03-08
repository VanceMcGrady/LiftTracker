import WeekView from "@/components/WeekView";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import { RoutineProvider } from "@/context/RoutineContext";
export default function WeekViewScreen() {
  console.log("WeekViewScreen");
  return <WeekView />;
}
