import { Stack } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WorkoutProvider } from "@/context/RoutineContext";

import { Suspense } from "react";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <WorkoutProvider>
            <Stack
              screenOptions={{
                headerShown: false, // Disable the default header
              }}
            />
          </WorkoutProvider>
        </View>
        <Footer />
      </View>
    </Suspense>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBlockStart: 100,
    paddingBlockEnd: 100,
  },
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1, // Ensures the Stack takes up the remaining space
  },
  footer: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
});
