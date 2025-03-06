import { Text, View } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "@/configs/FirebaseConfig";
import { router } from "expo-router";
import TextInputField from "@/components/shared/TextInputField";
import Button from "@/components/shared/Button";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignInBtnClick = () => {
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        router.push("/week-view");
      })
      .catch((error) => {
        alert(`error in signin: ${error.message}`);
      });
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
      <Button text="Sign In" onPress={onSignInBtnClick} />
    </View>
  );
}
