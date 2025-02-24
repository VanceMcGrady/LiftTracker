import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
// Create a context
export const WorkoutContext = createContext({});

export function WorkoutProvider({ children }: any) {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // setSchedule() to the value of the schedule retreived from the backend
    try {
      axios
        .post("http://localhost:3000/workoutSchedule/create", { new: true })
        .then((res) => {
          const schedule = res.data;
          console.log("schedule: ", schedule, typeof schedule);
          setSchedule(schedule.workouts);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Value to be shared
  const value = {
    schedule,
    setSchedule,
  };

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
}
