import OpenAI from "openai";
import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/supabase";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();
  const client = await serverSupabaseClient<Database>(event);
  const thread = await openai.beta.threads.create();
  const { statusText } = await client
    .from("threads")
    .insert({ object_id: thread.id, type: thread.object });
  console.log(statusText, thread.id);

  return { thread_id: thread.id };
});
