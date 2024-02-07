import OpenAI from "openai";
import { Database } from "~/types/supabase";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler<{ query: { file_id: string } }>(
  async (event) => {
    const openai = new OpenAI();
    const { file_id } = getQuery(event);
    const deleted = await openai.files.del(file_id);
    const client = await serverSupabaseClient<Database>(event);
    client.from("threads").delete().eq("object_id", deleted.id);
    console.log(deleted);
  }
);
