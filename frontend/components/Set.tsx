import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface SetProps {
  weight: number;
  reps: number;
  completed?: boolean;
  onComplete: () => void;
}

const Set: React.FC<SetProps> = ({
  weight,
  reps,
  completed = false,
  onComplete,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <View style={styles.metricContainer}>
          <Text style={styles.metricValue}>{reps}</Text>
          <Text style={styles.metricLabel}>reps</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.metricContainer}>
          <Text style={styles.metricValue}>{weight}</Text>
          <Text style={styles.metricLabel}>lbs</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.completeButton, completed && styles.completedButton]}
        onPress={onComplete}
      >
        <Text style={styles.buttonText}>{completed ? "✓" : "DONE"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  metricContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginRight: 10,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "600",
    marginRight: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: "#666",
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 15,
  },
  completeButton: {
    backgroundColor: "#3498db",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    minWidth: 70,
    alignItems: "center",
  },
  completedButton: {
    backgroundColor: "#2ecc71",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default Set;
