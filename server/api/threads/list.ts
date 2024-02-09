import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/supabase";

export default defineEventHandler(async (event) => {
  const { assistant_id } = getQuery(event);

  const client = await serverSupabaseClient<Database>(event);
  const { data } = await client
    .from("threads")
    .select()
    .eq("type", "thread")
    .eq("assistant_id", assistant_id as string);

  return data;
});

// const data = await $fetch("https://api.openai.com/v1/threads?limit=100", {
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer sess-sCOGv6gIiQyLnbLeSlDa9k8ohtnuq1TcAwTV6Y8U`,
//     "OpenAI-Beta": "assistants=v1",
//   },
// });
// console.log(data);
