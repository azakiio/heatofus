import {
  serverSupabaseServiceRole,
  serverSupabaseUser,
} from "#supabase/server";
import { Database } from "~/types/supabase";

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole<Database>(event);
  const user = await serverSupabaseUser(event);
  const { data } = await client
    .from("stripe_users")
    .select(
      "email, name, plan->product, status, current_period_start, current_period_end, cancel_at"
    )
    .eq("email", user?.email || "");

  return data?.at(0);
});
