import { router } from "expo-router";
import { Text, View, Button } from "react-native";

export default function Header() {
  return (
    <View>
      <Button title="Back" onPress={() => router.back()} />
    </View>
  );
}
