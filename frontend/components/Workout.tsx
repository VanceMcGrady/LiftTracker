import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, Dimensions, StyleSheet } from "react-native";
import { WorkoutContext } from "@/context/WorkoutContext";
import { useContext } from "react";
import Set from "./Set";

const { width } = Dimensions.get("window");

function Workout(passedsWorkout: any) {
  const { workout, updateWorkout } = useContext(WorkoutContext) as any;
  const { thisWorkout } = passedsWorkout;
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Update workout when props change
  useEffect(() => {
    updateWorkout(thisWorkout);
  }, [passedsWorkout]);

  // Handle viewable items change to track current exercise
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setExerciseIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  // Render pagination indicators
  const renderPaginationDots = () => {
    if (!workout.exercises) return null;

    return (
      <View style={styles.paginationContainer}>
        {workout.exercises.map((_: any, index: number) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === exerciseIndex ? styles.activeDot : {},
            ]}
          />
        ))}
      </View>
    );
  };

  // Render a single exercise card
  const renderExercise = ({ item: exercise }: any) => {
    return (
      <View style={styles.exerciseCard}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <View style={styles.setsContainer}>
          {Array.from({ length: exercise.sets }, (_, i) => (
            <Set
              key={i}
              weight={exercise.weight}
              reps={exercise.reps}
              onComplete={() => {
                console.log("complete");
              }}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {workout.exercises ? (
        <>
          <FlatList
            ref={flatListRef}
            data={workout.exercises}
            renderItem={renderExercise}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            keyExtractor={(item, index) => `exercise-${index}`}
          />
          {renderPaginationDots()}
        </>
      ) : (
        <Text>Loading workout...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  exerciseCard: {
    width: width,
    padding: 20,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  setsContainer: {
    marginTop: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#007AFF",
  },
});

export default Workout;
