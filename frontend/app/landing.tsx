import { View, Text, Pressable } from "react-native";
import React from "react";
import Colors from "@/colors/Colors";
import Button from "@/components/shared/Button";
import { useRouter } from "expo-router";

export default function LandingScreen() {
  const router = useRouter();
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
            router.push("/(auth)/SignUp");
          }}
        />
        <Pressable onPress={() => router.push("/(auth)/SignIn")}>
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
        </Pressable>
      </View>
    </View>
  );
}
