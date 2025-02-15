import React from "react";
import { View, Text } from "react-native";

function DayCard(props: { day: string }) {
  return (
    <View>
      <Text>{props.day}</Text>
    </View>
  );
}

export default DayCard;
