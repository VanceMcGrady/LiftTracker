import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { Suspense, useState } from "react";
import { ActivityIndicator } from "react-native";
import { RoutineProvider } from "@/context/RoutineContext";

interface USER {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
export default function RootLayout() {
  const [user, setUser] = useState<USER | undefined>(undefined);
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <View style={styles.container}>
        <View style={styles.content}>
          <AuthProvider>
            <Header />
            <RoutineProvider>
              <Stack screenOptions={{ headerShown: false }} />
            </RoutineProvider>
          </AuthProvider>
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
