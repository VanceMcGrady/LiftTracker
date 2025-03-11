import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ExerciseSummaryCardProps {
  exerciseName: string;
  sets: number | undefined;
  reps: number | undefined;
  weight: number | string | undefined; // Can be a number or '—' for bodyweight
  restTime?: number; // Optional rest time in seconds
  onPress?: () => void;
}

const ExerciseSummaryCard: React.FC<ExerciseSummaryCardProps> = ({
  exerciseName,
  sets,
  reps,
  weight,
  restTime,
  onPress,
}) => {
  // Format the weight for display
  const formattedWeight = typeof weight === "number" ? `${weight} kg` : weight;

  // Format rest time into a readable format
  const formatRestTime = (seconds?: number): string => {
    if (!seconds) return "—";
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.exerciseName}>{exerciseName}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.setsContainer}>
          <Text style={styles.setsLabel}>SETS</Text>
          <Text style={styles.setsValue}>{sets}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>REPS</Text>
          <Text style={styles.detailValue}>{reps}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>WEIGHT</Text>
          <Text style={styles.detailValue}>{formattedWeight}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>REST</Text>
          <Text style={styles.detailValue}>{formatRestTime(restTime)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  setsContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    minWidth: 50,
  },
  setsLabel: {
    fontSize: 10,
    color: "#666",
    fontWeight: "500",
  },
  setsValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    flex: 1,
    alignItems: "center",
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: "#f0f0f0",
  },
  detailLabel: {
    fontSize: 10,
    color: "#999",
    marginBottom: 4,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 15,
    color: "#333",
    fontWeight: "600",
  },
});

export default ExerciseSummaryCard;
