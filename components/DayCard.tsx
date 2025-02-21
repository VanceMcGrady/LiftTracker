import React from "react";
import { View, Text } from "react-native";

function DayCard(props: any) {
  const { routine } = props;

  return (
    <View
      style={{
        backgroundColor: "lightblue",
        padding: 10,
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        borderRadius: 5,
        width: "100%",
      }}
    >
      <Text>{routine.dayOfWeek}</Text>
      <Text>{routine.name}</Text>
    </View>
  );
}

export default DayCard;
