import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ScrollViewProps,
} from "react-native";
import { getDayOfWeek } from "@/utils/dateUtils";

interface DateBannerProps {
  onDateSelect?: (day: string) => void;
  initialDate?: Date;
  startWeekOnMonday?: boolean;
  currentDay?: string;
}

const DateBanner: React.FC<DateBannerProps> = ({
  currentDay,
  onDateSelect,
  initialDate = new Date(),
  startWeekOnMonday = false,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const dateItemWidth: number = 60;

  // Generate the dates for the current week
  useEffect(() => {
    const dates: Date[] = [];
    const today: Date = new Date();

    // Get the current day of the week (0 = Sunday, 6 = Saturday)
    const currentDayOfWeek: number = today.getDay();

    // Calculate the first day of the week (Sunday or Monday depending on startWeekOnMonday)
    const firstDayOfWeek: Date = new Date(today);
    const offset: number = startWeekOnMonday
      ? currentDayOfWeek === 0
        ? 6
        : currentDayOfWeek - 1
      : currentDayOfWeek;

    firstDayOfWeek.setDate(today.getDate() - offset);

    // Generate 7 days starting from first day
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      dates.push(date);
    }

    setWeekDates(dates);
    setSelectedDate(initialDate || today);

    // Initial scroll to today's position after render
    setTimeout(() => {
      if (scrollViewRef.current) {
        const todayIndex: number = startWeekOnMonday
          ? currentDayOfWeek === 0
            ? 6
            : currentDayOfWeek - 1
          : currentDayOfWeek;

        scrollViewRef.current.scrollTo({
          x: todayIndex * dateItemWidth,
          animated: true,
        });
      }
    }, 100);
  }, []);

  // Format day name to show only the first 3 letters
  const formatDayName = (date: Date): string => {
    const days: string[] = startWeekOnMonday
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return startWeekOnMonday
      ? days[date.getDay() === 0 ? 6 : date.getDay() - 1]
      : days[date.getDay()];
  };

  // Format date to show only the day number
  const formatDayNumber = (date: Date): number => {
    return date.getDate();
  };

  // Check if a date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if a date is selected
  const isSelected = (date: Date): boolean => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Handle date selection
  const handleDateSelect = (date: Date): void => {
    const day = getDayOfWeek(date);
    console.log("Selected day: ", day);
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(day);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {weekDates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateItem,
              isSelected(date) && styles.selectedDateItem,
            ]}
            onPress={() => handleDateSelect(date)}
          >
            <Text
              style={[styles.dayName, isSelected(date) && styles.selectedText]}
            >
              {formatDayName(date)}
            </Text>
            <View
              style={[
                styles.dateCircle,
                isToday(date) && styles.todayCircle,
                isSelected(date) && styles.selectedCircle,
              ]}
            >
              <Text
                style={[
                  styles.dateNumber,
                  isToday(date) && styles.todayText,
                  isSelected(date) && styles.selectedDateNumber,
                ]}
              >
                {formatDayNumber(date)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    maxHeight: 75,
    paddingVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dateItem: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDateItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  dayName: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  todayCircle: {
    backgroundColor: "#e0e0e0",
  },
  selectedCircle: {
    backgroundColor: "#2196F3",
  },
  dateNumber: {
    fontSize: 16,
    color: "#333",
  },
  todayText: {
    fontWeight: "bold",
  },
  selectedText: {
    color: "#2196F3",
  },
  selectedDateNumber: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DateBanner;
