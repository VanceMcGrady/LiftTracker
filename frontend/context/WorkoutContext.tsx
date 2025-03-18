import React, { createContext, useContext, useState } from "react";

// Create the context
export const WorkoutContext = createContext({});

// Create a provider component
export const WorkoutProvider = ({ children }: any) => {
  const [workout, setWorkout] = useState({});

  // Function to update the entire workout object
  const updateWorkout = (newWorkoutData: any) => {
    setWorkout(newWorkoutData);
  };
  const completeExercise = (exerciseId: any) => {
    console.log("exerciseId: ", exerciseId);
    setWorkout((prevWorkout: any) => ({
      ...prevWorkout,
      exercises: prevWorkout.exercises.map((ex: any) => {
        if (ex.id === exerciseId) {
          return { ...ex, completed: true };
        }
        return ex;
      }),
    }));
  };

  const completeSet = (exerciseId: any, setId: any) => {
    console.log("exerciseId: ", exerciseId);
    console.log("setId: ", setId);

    setWorkout((prevWorkout: any) => ({
      ...prevWorkout,
      exercises: prevWorkout.exercises.map((ex: any) => {
        if (ex.id === exerciseId) {
          return {
            ...ex,
            sets: ex.sets.map((set: any) => {
              if (set.id === setId) {
                return { ...set, completed: true };
              }
              return set;
            }),
          };
        }
        return ex;
      }),
    }));
  };
  // Function to update specific properties of the workout
  const updateWorkoutProperty = (property: any, value: any) => {
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      [property]: value,
    }));
  };

  // Function to add an exercise to the workout
  const addExercise = (exercise: any) => {
    setWorkout((prevWorkout: any) => ({
      ...prevWorkout,
      exercises: [...prevWorkout.exercises, exercise],
    }));
  };

  // Function to remove an exercise from the workout
  const removeExercise = (exerciseId: any) => {
    setWorkout((prevWorkout: any) => ({
      ...prevWorkout,
      exercises: prevWorkout.exercises.filter(
        (ex: any) => ex.id !== exerciseId
      ),
    }));
  };

  // Function to mark workout as completed
  const completeWorkout = () => {
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      completed: true,
    }));
  };

  // All the values and functions we want to expose to components
  const value = {
    workout,
    updateWorkout,
    updateWorkoutProperty,
    addExercise,
    removeExercise,
    completeWorkout,
    completeExercise,
    completeSet,
  };

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
};

// Custom hook to access the context
export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
};
