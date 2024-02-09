import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/supabase";

export default defineEventHandler(async (event) => {
  const { assistant_id } = getQuery(event);
  const client = await serverSupabaseClient<Database>(event);
  let query = client
    .from("threads")
    .select("object_id, type, name, assistant_id")
    .eq("type", "file");

  if (assistant_id === "none") {
    query = query.is("assistant_id", null);
  } else if (assistant_id) {
    query = query.eq("assistant_id", assistant_id);
  }

  return (await query).data;
});
