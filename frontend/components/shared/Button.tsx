import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import Colors from "@/colors/Colors";

type ButtonProps = {
  text: string;
  onPress: () => void;
  loading?: boolean;
};
export default function Button({ text, onPress, loading }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 15,
        backgroundColor: Colors.PRIMARY,
        padding: 10,
        borderRadius: 10,
      }}
    >
      {loading ? (
        <ActivityIndicator size="large"></ActivityIndicator>
      ) : (
        <Text
          style={{ color: Colors.WHITE, textAlign: "center", fontSize: 18 }}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
