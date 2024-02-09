import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/supabase";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const { data, error } = await client
    .from("threads")
    .select(
      "object_id, type, name, meta->instructions, meta->model"
    )
    .eq("type", "assistant");

  return data;
});
