'use server'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/lib/supabase/server.supa"; 

const supabase = createClient();







export const initGeminiConversation = async (prompt, file) => {
  console.log("prompt: " + prompt + " file: " + file);

  return {message: prompt};
};
