import { View, Text, TextInput } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import Colors from "@/colors/Colors";

type textInputFieldProps = {
  label: string;
  onChangeText: (text: string) => void;
  password?: boolean;
};
export default function TextInputField({
  label,
  onChangeText,
  password = false,
}: textInputFieldProps) {
  return (
    <View>
      <Text style={{ color: Colors.GRAY }}>{label}</Text>
      <TextInput
        placeholder={label}
        style={styles.textInput}
        secureTextEntry={password}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 5,
    marginTop: 5,
    fontSize: 16,
  },
});
