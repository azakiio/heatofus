import OpenAI from "openai";
import { Database } from "~/types/supabase";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();
  const files = await openai.files.list();

  const client = await serverSupabaseClient<Database>(event);
  return files;
});
