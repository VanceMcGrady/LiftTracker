import { Text, View } from "react-native";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "@/configs/FirebaseConfig";
import { router } from "expo-router";
import TextInputField from "@/components/shared/TextInputField";
import Button from "@/components/shared/Button";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function SignIn() {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const { user, setUser } = useContext(AuthContext) as any;

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
          const result = await axios.get(
            process.env.EXPO_PUBLIC_HOST_URL + "/user?email=" + email
          );

          //console.log("result: ", result.data);
          // Save to Context to share across the app
          setUser(result.data);

          // route to home-view
          setLoading(false);
          router.push("/home-view");
        }
      })
      .catch((error) => {
        alert(`error in signin: ${error.message}`);
        setLoading(false);
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
      <Button text="Sign In" onPress={onSignInBtnClick} loading={loading} />
    </View>
  );
}
