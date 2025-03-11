import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ExerciseSummaryCard from "./ExerciseSumaryCard";

// Types for the component props
interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  weight?: number | string;
  rest?: number;
}

interface WorkoutInfo {
  title: string;
  targetMuscleGroups: string[];
  exercises: Exercise[];
  duration: number; // in minutes
}

interface WorkoutSummaryCardProps {
  day: string;
  workout?: WorkoutInfo;
  restDay: boolean;
  onPress?: () => void;
}

const WorkoutSummaryCard: React.FC<WorkoutSummaryCardProps> = ({
  day,
  workout,
  restDay,
  onPress,
}) => {
  // Format exercises list to a readable string
  const formatExercisesList = (exercises: Exercise[]): string => {
    return exercises.map((ex) => ex.name).join(", ");
  };
  console.log("workout", workout);
  // Format muscle groups to a readable string
  const formatMuscleGroups = (groups: string[]): string => {
    return groups.join(" | ");
  };

  // Format duration to a readable format
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, restDay ? styles.restDayCard : styles.workoutCard]}
      onPress={onPress}
      disabled={!onPress}
    >
      {/* Day indicator */}
      <Text style={styles.dayText}>{day}</Text>

      {restDay ? (
        // Rest day content
        <View style={styles.restDayContent}>
          <Text style={styles.restDayTitle}>Rest Day</Text>
          <Text style={styles.restDayDescription}>
            Recovery time for your muscles
          </Text>
        </View>
      ) : workout ? (
        // Workout content
        <View style={styles.workoutContent}>
          <Text style={styles.workoutTitle}>{workout.title}</Text>

          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Target</Text>
              <Text style={styles.detailText}>
                {formatMuscleGroups(workout.targetMuscleGroups)}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailText}>
                {formatDuration(workout.duration)}
              </Text>
            </View>
          </View>

          <View style={styles.exercisesContainer}>
            <Text style={styles.detailLabel}>Exercises</Text>
            <Text style={styles.exercisesText}>
              {workout.exercises.map((ex, idx) => {
                console.log("ex", ex);
                return (
                  <ExerciseSummaryCard
                    key={ex.id}
                    exerciseName={ex.name}
                    sets={ex.sets}
                    reps={ex.reps}
                    weight={ex.weight}
                  />
                );
              })}
            </Text>
          </View>
        </View>
      ) : (
        // No workout data case
        <View style={styles.noWorkoutContent}>
          <Text style={styles.noWorkoutText}>No workout scheduled</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: "100%",
    height: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  workoutCard: {
    backgroundColor: "#ffffff",
    height: "100%",
  },
  restDayCard: {
    backgroundColor: "#f8f9fa",
  },
  dayText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  workoutContent: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  exercisesContainer: {
    marginTop: 4,
  },
  exercisesText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  restDayContent: {
    alignItems: "flex-start",
  },
  restDayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 6,
  },
  restDayDescription: {
    fontSize: 14,
    color: "#888",
  },
  noWorkoutContent: {
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 8,
  },
  noWorkoutText: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  },
});

export default WorkoutSummaryCard;
