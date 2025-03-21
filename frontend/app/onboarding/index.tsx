import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Button from "@/components/shared/Button";
import { router } from "expo-router";
import { AuthContext } from "@/context/AuthContext";
import Colors from "@/colors/Colors";
import axios from "axios";

// Defined question data types
type ExperienceLevel = "beginner" | "intermediate" | "advanced";
type FitnessGoal =
  | "strength"
  | "hypertrophy"
  | "endurance"
  | "weight_loss"
  | "general_fitness";
type Equipment =
  | "full_gym"
  | "home_minimal"
  | "home_advanced"
  | "bodyweight_only";
type WorkoutFrequency = "2-3" | "3-4" | "5+";
type WorkoutDuration = "30min" | "45min" | "60min" | "90min+";

export default function OnboardingScreen() {
  const { user, setUser } = useContext(AuthContext) as any;
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({
    experienceLevel: "" as ExperienceLevel,
    fitnessGoals: [] as FitnessGoal[],
    equipment: "" as Equipment,
    workoutFrequency: "" as WorkoutFrequency,
    workoutDuration: "" as WorkoutDuration,
  });

  const updatePreference = <K extends keyof typeof preferences>(
    field: K,
    value: (typeof preferences)[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const toggleGoal = (goal: FitnessGoal) => {
    setPreferences((prev) => {
      const currentGoals = [...prev.fitnessGoals];
      if (currentGoals.includes(goal)) {
        return {
          ...prev,
          fitnessGoals: currentGoals.filter((g) => g !== goal),
        };
      } else {
        return { ...prev, fitnessGoals: [...currentGoals, goal] };
      }
    });
  };

  const isGoalSelected = (goal: FitnessGoal) =>
    preferences.fitnessGoals.includes(goal);

  const savePreferencesAndContinue = async () => {
    try {
      // Save workout preferences to backend
      console.log("Saving preferences", preferences);
      // const result = await axios.post(
      //   process.env.EXPO_PUBLIC_HOST_URL + "/user/preferences",
      //   {
      //     userId: user._id, // Assuming user object has an _id field
      //     ...preferences,
      //   }
      // );

      // Navigate to home screen or routine recommendation
      router.push("/home-view");
    } catch (error: any) {
      alert(`Error saving preferences: ${error.message}`);
    }
  };

  const renderExperienceLevel = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>What's your fitness experience level?</Text>
      <View style={styles.optionsContainer}>
        <OptionButton
          text="Beginner"
          selected={preferences.experienceLevel === "beginner"}
          onPress={() => updatePreference("experienceLevel", "beginner")}
          description="New to working out or returning after a long break"
        />
        <OptionButton
          text="Intermediate"
          selected={preferences.experienceLevel === "intermediate"}
          onPress={() => updatePreference("experienceLevel", "intermediate")}
          description="Consistent workouts for 6+ months"
        />
        <OptionButton
          text="Advanced"
          selected={preferences.experienceLevel === "advanced"}
          onPress={() => updatePreference("experienceLevel", "advanced")}
          description="Experienced with various training methods"
        />
      </View>
      <Button
        text="Next"
        onPress={() => setStep(1)}
        disabled={!preferences.experienceLevel}
      />
    </View>
  );

  const renderFitnessGoals = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>What are your fitness goals?</Text>
      <Text style={styles.subText}>Select all that apply</Text>
      <View style={styles.optionsContainer}>
        <OptionButton
          text="Build Strength"
          selected={isGoalSelected("strength")}
          onPress={() => toggleGoal("strength")}
          description="Increase overall strength and power"
        />
        <OptionButton
          text="Muscle Growth"
          selected={isGoalSelected("hypertrophy")}
          onPress={() => toggleGoal("hypertrophy")}
          description="Focus on muscle size and definition"
        />
        <OptionButton
          text="Endurance"
          selected={isGoalSelected("endurance")}
          onPress={() => toggleGoal("endurance")}
          description="Improve stamina and cardiovascular fitness"
        />
        <OptionButton
          text="Weight Loss"
          selected={isGoalSelected("weight_loss")}
          onPress={() => toggleGoal("weight_loss")}
          description="Shed fat and improve body composition"
        />
        <OptionButton
          text="General Fitness"
          selected={isGoalSelected("general_fitness")}
          onPress={() => toggleGoal("general_fitness")}
          description="Overall health and wellness"
        />
      </View>
      <View style={styles.navigationButtons}>
        <Button text="Back" onPress={() => setStep(0)} secondary />
        <Button
          text="Next"
          onPress={() => setStep(2)}
          disabled={preferences.fitnessGoals.length === 0}
        />
      </View>
    </View>
  );

  const renderEquipmentAccess = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>What equipment do you have access to?</Text>
      <View style={styles.optionsContainer}>
        <OptionButton
          text="Full Gym"
          selected={preferences.equipment === "full_gym"}
          onPress={() => updatePreference("equipment", "full_gym")}
          description="Access to commercial gym with standard equipment"
        />
        <OptionButton
          text="Home Gym (Basic)"
          selected={preferences.equipment === "home_minimal"}
          onPress={() => updatePreference("equipment", "home_minimal")}
          description="Minimal equipment (e.g., dumbbells, resistance bands)"
        />
        <OptionButton
          text="Home Gym (Advanced)"
          selected={preferences.equipment === "home_advanced"}
          onPress={() => updatePreference("equipment", "home_advanced")}
          description="Power rack, barbell, bench, etc."
        />
        <OptionButton
          text="Bodyweight Only"
          selected={preferences.equipment === "bodyweight_only"}
          onPress={() => updatePreference("equipment", "bodyweight_only")}
          description="No equipment available"
        />
      </View>
      <View style={styles.navigationButtons}>
        <Button text="Back" onPress={() => setStep(1)} secondary />
        <Button
          text="Next"
          onPress={() => setStep(3)}
          disabled={!preferences.equipment}
        />
      </View>
    </View>
  );

  const renderWorkoutFrequency = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>
        How many days per week can you work out?
      </Text>
      <View style={styles.optionsContainer}>
        <OptionButton
          text="2-3 days"
          selected={preferences.workoutFrequency === "2-3"}
          onPress={() => updatePreference("workoutFrequency", "2-3")}
        />
        <OptionButton
          text="3-4 days"
          selected={preferences.workoutFrequency === "3-4"}
          onPress={() => updatePreference("workoutFrequency", "3-4")}
        />
        <OptionButton
          text="5+ days"
          selected={preferences.workoutFrequency === "5+"}
          onPress={() => updatePreference("workoutFrequency", "5+")}
        />
      </View>
      <View style={styles.navigationButtons}>
        <Button text="Back" onPress={() => setStep(2)} secondary />
        <Button
          text="Next"
          onPress={() => setStep(4)}
          disabled={!preferences.workoutFrequency}
        />
      </View>
    </View>
  );

  const renderWorkoutDuration = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>
        How much time do you have per workout session?
      </Text>
      <View style={styles.optionsContainer}>
        <OptionButton
          text="30 minutes or less"
          selected={preferences.workoutDuration === "30min"}
          onPress={() => updatePreference("workoutDuration", "30min")}
        />
        <OptionButton
          text="45 minutes"
          selected={preferences.workoutDuration === "45min"}
          onPress={() => updatePreference("workoutDuration", "45min")}
        />
        <OptionButton
          text="60 minutes"
          selected={preferences.workoutDuration === "60min"}
          onPress={() => updatePreference("workoutDuration", "60min")}
        />
        <OptionButton
          text="90+ minutes"
          selected={preferences.workoutDuration === "90min+"}
          onPress={() => updatePreference("workoutDuration", "90min+")}
        />
      </View>
      <View style={styles.navigationButtons}>
        <Button text="Back" onPress={() => setStep(3)} secondary />
        <Button
          text="Create My Routine"
          onPress={savePreferencesAndContinue}
          disabled={!preferences.workoutDuration}
        />
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return renderExperienceLevel();
      case 1:
        return renderFitnessGoals();
      case 2:
        return renderEquipmentAccess();
      case 3:
        return renderWorkoutFrequency();
      case 4:
        return renderWorkoutDuration();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Let's customize your workout plan</Text>
        <Text style={styles.subtitle}>
          Answer a few questions so we can create a personalized routine for you
        </Text>

        <View style={styles.progressContainer}>
          {[0, 1, 2, 3, 4].map((i) => (
            <View
              key={i}
              style={[
                styles.progressDot,
                step >= i ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {renderCurrentStep()}
      </ScrollView>
    </SafeAreaView>
  );
}

// Option button component used in the questions
const OptionButton = ({
  text,
  selected,
  onPress,
  description,
}: {
  text: string;
  selected: boolean;
  onPress: () => void;
  description?: string;
}) => (
  <TouchableOpacity
    style={[styles.optionButton, selected && styles.selectedOption]}
    onPress={onPress}
  >
    <Text style={[styles.optionText, selected && styles.selectedOptionText]}>
      {text}
    </Text>
    {description && (
      <Text
        style={[
          styles.optionDescription,
          selected && styles.selectedOptionDescription,
        ]}
      >
        {description}
      </Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.GRAY,
    marginBottom: 24,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: Colors.ORANGE,
  },
  inactiveDot: {
    backgroundColor: "#E0E0E0",
  },
  stepContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: Colors.GRAY,
    marginBottom: 16,
  },
  optionsContainer: {
    marginVertical: 16,
  },
  optionButton: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 12,
    backgroundColor: "#F8F8F8",
  },
  selectedOption: {
    borderColor: Colors.ORANGE,
    backgroundColor: `${Colors.ORANGE}10`, // 10% opacity
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  selectedOptionText: {
    color: Colors.ORANGE,
  },
  optionDescription: {
    fontSize: 14,
    color: Colors.GRAY,
    marginTop: 4,
  },
  selectedOptionDescription: {
    color: Colors.ORANGE,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
});
