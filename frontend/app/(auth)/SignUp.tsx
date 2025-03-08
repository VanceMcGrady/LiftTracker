import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import TextInputField from "@/components/shared/TextInputField";
import Button from "@/components/shared/Button";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../configs/FirebaseConfig";
import { upload } from "cloudinary-react-native";
import { cld, options } from "@/configs/Cloudinary";
import Entypo from "@expo/vector-icons/Entypo";
import Colors from "@/colors/Colors";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { router } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const { user, setUser } = useContext(AuthContext) as any;

  const onButtonPress = () => {
    if (!email || !password || !firstName || !lastName) {
      alert("Please fill all the fields");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        const result = await axios
          .post(process.env.EXPO_PUBLIC_HOST_URL + "/user", {
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
          })
          .catch((error) => {
            alert(`POST error in signup
                  : ${error.message}`);
          });

        if (!result) {
          alert("Error in creating user");
          return;
        }
        setUser(result.data);
        router.push("/week-view");
      })
      .catch((error) => {
        alert(`error in signup: ${error.message}`);
      });
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

const styles = StyleSheet.create({
  profileImage: { width: 100, height: 100, borderRadius: 50 },
});
