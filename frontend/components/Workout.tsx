import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { WorkoutContext } from "@/context/WorkoutContext";
import { useContext } from "react";
import Set from "./Set";
import Button from "./shared/Button";
const { width } = Dimensions.get("window");

function Workout(passedsWorkout: any) {
  const { workout, updateWorkout, completeSet, completeExercise } = useContext(
    WorkoutContext
  ) as any;
  const { thisWorkout } = passedsWorkout;
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Update workout when props change
  useEffect(() => {
    updateWorkout(thisWorkout);
    // console.log("Workout component mounted");
  }, []);

  // Log updated exerciseIndex whenever it actually changes
  // useEffect(() => {
  //   // console.log("Updated exerciseIndex state:", exerciseIndex);
  //   if (workout.exercises) {
  //     console.log(
  //       "workout.exercises[exerciseIndex]: ",
  //       workout.exercises[exerciseIndex]
  //     );
  //   }
  // }, [exerciseIndex]);

  // Define the callback outside of useRef for better debugging
  const handleViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    // console.log("Viewable items changed:", viewableItems);

    if (viewableItems && viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      // console.log("Setting new index to:", newIndex);
      setExerciseIndex(newIndex);
    }
  }, []);

  // Create viewability config
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 0,
  }).current;

  // Create a callback pair for the FlatList
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged: handleViewableItemsChanged },
  ]).current;

  // Manual navigation functions to test state updates
  const goToNextExercise = () => {
    if (workout.exercises && exerciseIndex < workout.exercises.length - 1) {
      //console.log("going to next exercise");
      const newIndex = exerciseIndex + 1;
      setExerciseIndex(newIndex);
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    }
  };

  const goToPrevExercise = () => {
    if (workout.exercises && exerciseIndex > 0) {
      const newIndex = exerciseIndex - 1;
      setExerciseIndex(newIndex);
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    }
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
  const renderExercise = ({ item: exercise, index }: any) => {
    return (
      <View style={styles.exerciseCard}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <View style={styles.setsContainer}>
          {exercise.sets.map((set: any, i: number) => (
            <Set
              key={i}
              completed={set.completed}
              weight={set.weight}
              reps={set.reps}
              onComplete={() => completeSet(exercise.id, set.id, set.completed)}
            />
          ))}
        </View>
        <Button
          text={
            workout.exercises[exerciseIndex].completed
              ? "Done"
              : "Complete Exercise"
          }
          onPress={() => {
            completeExercise(exercise.id, exercise.completed);
            if (!exercise.completed) {
              goToNextExercise();
            }
          }}
        />
      </View>
    );
  };

  // Get initial layout for initialization
  const getItemLayout = (_: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

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
            viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
            getItemLayout={getItemLayout}
            initialNumToRender={1}
            keyExtractor={(item, index) => `exercise-${index}`}
          />
          {renderPaginationDots()}

          {/* Manual navigation controls for testing */}
          <View style={styles.navigationControls}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={goToPrevExercise}
              disabled={exerciseIndex === 0}
            >
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>

            <Text style={styles.indexDisplay}>
              {exerciseIndex + 1} / {workout.exercises.length}
            </Text>

            <TouchableOpacity
              style={styles.navButton}
              onPress={goToNextExercise}
              disabled={exerciseIndex === workout.exercises.length - 1}
            >
              <Text style={styles.navButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
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
  navigationControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  navButton: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  navButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  indexDisplay: {
    fontSize: 16,
  },
});

export default Workout;
