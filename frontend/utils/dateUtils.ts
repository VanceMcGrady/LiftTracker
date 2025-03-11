export const getDayOfWeek = (date: Date) => {
  // Using Intl.DateTimeFormat for proper localization
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
};
