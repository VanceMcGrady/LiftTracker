import { Text, View } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "@/configs/FirebaseConfig";
import { router } from "expo-router";
import TextInputField from "@/components/shared/TextInputField";
import Button from "@/components/shared/Button";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const onSignInBtnClick = () => {
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        if (res.user) {
          // API call to get user data
          console.log("email: ", email);
          const result = await axios.get(
            process.env.EXPO_PUBLIC_HOST_URL + "/user?email=" + email
          );
          console.log("result: ", result.data);
          if (result.data.error) {
            alert("Error in fetching user data");
            return;
          }

          // Save to Context to share across the app

          // route to week-view
          router.push("/week-view");
        }
      })
      .catch((error) => {
        alert(`error in signin: ${error.message}`);
      });
    setLoading(false);
  };
  return (
    <View>
      <Text>Sign In</Text>
      <TextInputField
        label="Email"
        onChangeText={(v) => {
          setEmail(v);
        }}
      />
      <TextInputField
        label="Password"
        onChangeText={(v) => {
          setPassword(v);
        }}
        password={true}
      />
      <Button text="Sign In" onPress={onSignInBtnClick} loading={loading} />
    </View>
  );
}
