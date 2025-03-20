import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useRef } from "react";
import TextInputField from "@/components/shared/TextInputField";
import Button from "@/components/shared/Button";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs/FirebaseConfig";

import Entypo from "@expo/vector-icons/Entypo";
import Colors from "@/colors/Colors";

import axios from "axios";
import { router } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const { user, setUser } = useContext(AuthContext) as any;

  // Create refs for each input field
  const lastNameRef = useRef(null) as any;
  const emailRef = useRef(null) as any;
  const passwordRef = useRef(null) as any;
  const confirmPasswordRef = useRef(null) as any;

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
        router.push("/home-view");
      })
      .catch((error) => {
        alert(`error in signup: ${error.message}`);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingTop: 60,
          padding: 20,
          paddingBottom: 120, // Increased bottom padding
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={20}
      >
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
          returnKeyType="next"
          onSubmitEditing={() => lastNameRef.current?.focus()}
          blurOnSubmit={false}
        />
        <TextInputField
          label="Last Name"
          onChangeText={(v) => setLastName(v)}
          ref={lastNameRef}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
          blurOnSubmit={false}
        />
        <TextInputField
          label="Email"
          onChangeText={(v) => setEmail(v)}
          ref={emailRef}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInputField
          label="Password"
          onChangeText={(v) => setPassword(v)}
          password={true}
          ref={passwordRef}
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
          blurOnSubmit={false}
        />
        <TextInputField
          label="Confirm Password"
          onChangeText={(v) => setConfirmPassword(v)}
          password={true}
          ref={confirmPasswordRef}
          returnKeyType="done"
          onSubmitEditing={() => onButtonPress()}
        />
        <Button text="Sign Up" onPress={() => onButtonPress()} />
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  profileImage: { width: 100, height: 100, borderRadius: 50 },
});
