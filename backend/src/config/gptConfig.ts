import { scheduleResponseFormat } from "../../src/schema/ScheduleSchema.js";

export const gptConfig = {
  model: "gpt-4.5-preview-2025-02-27",
  store: true,
  messages: [
    { role: "user", content: "write a workout routine for this week" },
  ],
  response_format: scheduleResponseFormat,
};
