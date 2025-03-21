import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/colors/Colors";

interface ButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  secondary?: boolean;
}

const Button = ({
  text,
  onPress,
  disabled = false,
  secondary = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabledButton,
        secondary && styles.secondaryButton,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, secondary && styles.secondaryText]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.ORANGE,
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.ORANGE,
  },
  secondaryText: {
    color: Colors.ORANGE,
  },
});

export default Button;
