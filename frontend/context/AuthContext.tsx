import { createContext } from "react";
import { useState, useEffect } from "react";
import { Context } from "react";
export const AuthContext = createContext({});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    // setSchedule() to the value of the schedule retreived from the backend
    // try {
    //   axios
    //     .post("http://localhost:3000/workoutSchedule/create", { new: true })
    //     .then((res) => {
    //       console.log("res.data: ", res.data);
    //       const schedule = res.data;
    //       console.log("schedule in Context: ", schedule);
    //       setSchedule(schedule.workouts);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
  }, []);

  // Value to be shared
  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
