import { serverSupabaseClient } from "#supabase/server";
import OpenAI from "openai";
import { Database } from "~/types/supabase";

export default defineEventHandler<{
  query: { assistant_id: string; file_id: string };
}>(async (event) => {
  const openai = new OpenAI();
  const { assistant_id, file_id } = getQuery(event);
  const deleted = await openai.beta.assistants.files.del(assistant_id, file_id);

  const client = await serverSupabaseClient<Database>(event);
  const { statusText } = await client
    .from("threads")
    .delete()
    .eq("object_id", deleted.id);

  console.log(statusText, deleted);
});
