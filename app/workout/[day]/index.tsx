import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSearchParams, useLocalSearchParams } from "expo-router/build/hooks";

export default function Workout() {
  const { day } = useLocalSearchParams();

  console.log("params", useLocalSearchParams());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout for {day}</Text>
      {/* Add your workout details here based on the day */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
