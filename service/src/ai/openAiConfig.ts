import OpenAI from "openai";
import dotnenv from "dotenv";

export const configureOpenAi = () => {
  dotnenv.config();

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return openai;
};
