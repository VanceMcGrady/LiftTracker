import { Text, View } from "react-native";
import WeekView from "../components/WeekView";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <WeekView />
    </View>
  );
}
