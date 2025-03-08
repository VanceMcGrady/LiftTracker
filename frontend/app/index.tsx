import { Text } from "react-native";
import { Redirect, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/configs/FirebaseConfig";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";

export default function Index() {
  const { user, setUser } = useContext(AuthContext) as any;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (userData) => {
      if (userData && userData.email) {
        const result = await axios.get(
          process.env.EXPO_PUBLIC_HOST_URL + "/user?email=" + userData.email
        );
        console.log("User is signed in");
        setUser(result.data);
        router.push("/week-view");
      } else {
        console.log("User is signed out");
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return <Redirect href={"/landing"} />;
}
