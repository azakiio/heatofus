import { serverSupabaseClient } from "#supabase/server";
import OpenAI from "openai";
import { Database } from "~/types/supabase";

export default defineEventHandler(async (event) => {
  const { assistant_id } = getQuery(event);
  const openai = new OpenAI();
  const client = await serverSupabaseClient<Database>(event);
  const thread = await openai.beta.threads.create();
  const { statusText } = await client.from("threads").insert({
    object_id: thread.id,
    type: thread.object,
    assistant_id: assistant_id as string,
    name: `Conversation - ${thread.id.slice(6, 10)}`,
  });
  console.log(statusText, thread.id);

  return thread;
});
