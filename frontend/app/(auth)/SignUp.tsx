import { View, Text } from "react-native";
import React from "react";
import TextInputField from "@/components/shared/TextInputField";
import Button from "@/components/shared/Button";
import { useState } from "react";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onButtonPress = () => {
    console.log("Sign Up Button Pressed");
  };
  return (
    <View style={{ paddingTop: 60, padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Create New Account</Text>
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
