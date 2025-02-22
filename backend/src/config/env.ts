import dotenv from "dotenv";

export const loadEnv = () => {
  dotenv.config();
};

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const PORT = process.env.PORT || 3000;
