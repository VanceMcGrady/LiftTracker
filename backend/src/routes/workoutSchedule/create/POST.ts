import OpenAI from "openai";
import { Request, Response } from "express";
import { gptConfig } from "../../../config/gptConfig.js";

export default async function createPost(req: Request, res: Response) {
  console.log("POST /workoutSchedule/create", req.body);

  const openai: any = new OpenAI({
    apiKey:
      "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",
  });
  try {
    const response = await openai.chat.completions.create(gptConfig);
    //console.log("response: ", response.choices[0].message.content);
    const generatedSchedule = response.choices[0].message.content;
    console.log("Generated workout schedule:", generatedSchedule);
    res.send(generatedSchedule);
    // console.log("Generated workout schedule:", generatedSchedule);
  } catch (error) {
    console.error("Error fetching workout schedule:", error);
    res.status(500).send(`Error fetching workout schedule: ${error}`);
  }
}
