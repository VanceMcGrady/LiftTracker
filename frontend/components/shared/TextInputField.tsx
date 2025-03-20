import { View, Text, TextInput, TextInputProps } from "react-native";
import React, { forwardRef } from "react";
import { StyleSheet } from "react-native";
import Colors from "@/colors/Colors";

type TextInputFieldProps = TextInputProps & {
  label: string;
  onChangeText: (text: string) => void;
  password?: boolean;
};

const TextInputField = forwardRef<TextInput, TextInputFieldProps>(
  ({ label, onChangeText, password = false, ...rest }, ref) => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          placeholder={label}
          style={styles.textInput}
          secureTextEntry={password}
          onChangeText={onChangeText}
          ref={ref}
          {...rest}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    color: Colors.GRAY,
    marginBottom: 2,
  },
  textInput: {
    padding: 15,
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 5,
    marginTop: 5,
    fontSize: 16,
  },
});

export default TextInputField;
