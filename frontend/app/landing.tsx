import { View, Text } from "react-native";
import React from "react";
import Colors from "@/colors/Colors";
import Button from "@/components/shared/Button";

export default function LandingScreen() {
  return (
    <View>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center" }}>
          Welcome to WorkoutTracker
        </Text>
        <Text
          style={{
            fontSize: 17,
            textAlign: "center",
            marginTop: 10,
            color: Colors.GRAY,
          }}
        >
          The best way to track your workouts with AI
        </Text>
        <Button
          text="Get Started"
          onPress={() => {
            console.log("button pressed");
          }}
        />
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: Colors.GRAY,
            marginTop: 7,
          }}
        >
          Already Have An Account? Sign In Here
        </Text>
      </View>
    </View>
  );
}
