import React from "react";
import { View, Text } from "react-native";
import DayCard from "./DayCard"; // Ensure this path is correct
import { Link } from "expo-router";

function WeekView(props: any) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <View>
      {days.map((day) => (
        <Link href="./Workout" key={day}>
          <DayCard key={day} day={day} />
        </Link>
      ))}
    </View>
  );
}

export default WeekView;
