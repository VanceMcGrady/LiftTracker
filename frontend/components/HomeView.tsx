import { useState, useContext, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import DayCard from "./DayCard"; // Ensure this path is correct
import { Link } from "expo-router";
import { RoutineContext } from "@/context/RoutineContext";
import ScrollableDateBanner from "./ScrollableDateBanner";
import Workout from "@/app/workout/[day]";
import WorkoutSummaryCard from "./WorkoutSummaryCard";
import { date } from "drizzle-orm/mysql-core";

function HomeView(props: any) {
  const { routine, setRoutine } = useContext(RoutineContext) as any;

  const [weekSchedule, setWeekSchedule] = useState(routine || ["hello"]);

  const [currentDay, setCurrentDay] = useState(
    new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(Date.now())
  );
  console.log("HomeView currentDay: ", currentDay);
  const [currentWorkout, setCurrentWorkout] = useState(
    weekSchedule.find((day: any) => day.dayOfWeek === currentDay)
  );

  // Add effect to update currentWorkout when currentDay changes
  useEffect(() => {
    const workout = weekSchedule.find(
      (day: any) => day.dayOfWeek === currentDay
    );
    setCurrentWorkout(workout);
  }, [currentDay, weekSchedule]);

  if (!weekSchedule.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Creating your workout schedule...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, paddingTop: 55 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: 10,
          paddingHorizontal: 10,
        }}
      >
        <ScrollableDateBanner
          currentDay={currentDay}
          onDateSelect={(date) => setCurrentDay(date)}
        />
        <WorkoutSummaryCard
          day={currentDay}
          restDay={false}
          workout={currentWorkout}
        />
      </View>
    </ScrollView>
  );
}

export default HomeView;
