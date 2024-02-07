import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/supabase";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const { data } = await client
    .from("threads")
    .select("object_id, type, meta->name").eq('type', 'file');
  return data;
});
