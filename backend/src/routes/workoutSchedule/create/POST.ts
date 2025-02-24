import OpenAI from "openai";
import { Request, Response } from "express";

export default async function createPost(req: Request, res: Response) {
  console.log("POST /workoutSchedule/create", req.body);

  const openai: any = new OpenAI({
    apiKey:
      "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",
  });
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      store: true,
      messages: [
        { role: "user", content: "write a workout routine for this week" },
      ],
      //response_format: scheduleResponseFormat,
    });
    //console.log("response: ", response.choices[0].message.content);
    const generatedSchedule = response.choices[0].message.content;
    // Parse the generated schedule and set it to the state
    res.send(generatedSchedule);
    // console.log("Generated workout schedule:", generatedSchedule);
  } catch (error) {
    console.error("Error fetching workout schedule:", error);
    res.status(500).send(`Error fetching workout schedule: ${error}`);
  }
}
