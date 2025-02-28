import { View, Text, Image } from "react-native";
import React from "react";
import TextInputField from "@/components/shared/TextInputField";
import Button from "@/components/shared/Button";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs/FirebaseConfig";
import { upload } from "cloudinary-react-native";
import { cld, options } from "@/configs/Cloudinary";
import Entypo from "@expo/vector-icons/Entypo";
import Colors from "@/colors/Colors";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onButtonPress = () => {
    if (!email || !password || !firstName || !lastName) {
      alert("Please fill all the fields");
      return;
    }
    // console.log("auth: ", auth);
    createUserWithEmailAndPassword(auth, email, password).then(
      async (userCredendtials) => {
        await upload(cld, {
          options: options,
          file: "https://via.placeholder.com/150",
          callback: (error, result) => {
            if (error) {
              console.error(error);
            } else {
              console.log(result);
            }
          },
        }).catch((error) => {
          alert(`error in signup: ${error.message}`);
        });
      }
    );
  };

  return (
    <View style={{ paddingTop: 60, padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Create New Account</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ width: 100, height: 100 }}
          source={require("./../../assets/images/vecteezy_user-profile-icon-profile-avatar-user-icon-male-icon_20911740.png")}
        ></Image>
        <Entypo
          style={{ width: 160, position: "absolute", bottom: 0, right: 0 }}
          name="camera"
          size={24}
          color={Colors.ORANGE}
        />
      </View>

      <TextInputField
        label="First Name"
        onChangeText={(v) => setFirstName(v)}
      />
      <TextInputField label="Last Name" onChangeText={(v) => setLastName(v)} />
      <TextInputField label="Email" onChangeText={(v) => setEmail(v)} />
      <TextInputField
        label="Password"
        onChangeText={(v) => setPassword(v)}
        password={true}
      />
      <TextInputField
        label="Confirm Password"
        onChangeText={(v) => setConfirmPassword(v)}
        password={true}
      />
      <Button text="Sign Up" onPress={() => onButtonPress()} />
    </View>
  );
}
