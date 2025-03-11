import { router } from "expo-router";
import { Text, View, Button } from "react-native";
import { getAuth, signOut } from "firebase/auth";
export default function Header() {
  const auth = getAuth();
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out", auth.currentUser);
        router.push("/landing");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View>
      <Button title="Back" onPress={() => router.back()} />
      <Button title="Sign Out" onPress={signOutUser} />
    </View>
  );
}
