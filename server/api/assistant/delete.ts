import { serverSupabaseClient } from "#supabase/server";
import OpenAI from "openai";
import { Database } from "~/types/supabase";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();
  const query = getQuery(event);
  const assistant_id = query.assistant_id as string;
  const deleted = openai.beta.assistants.del(assistant_id);

  const client = await serverSupabaseClient<Database>(event);
  await client.from("threads").delete().eq("object_id", assistant_id);
});
