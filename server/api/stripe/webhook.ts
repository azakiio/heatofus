import { serverSupabaseServiceRole } from "#supabase/server";
import Stripe from "stripe";
import { Database } from "~/types/supabase";

const getSBTS = (stripeTimestamp?: number | null) => {
  if (stripeTimestamp) {
    return new Date(stripeTimestamp * 1000).toISOString();
  }
  return null;
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const client = serverSupabaseServiceRole<Database>(event);
  const stripe = new Stripe(config.STRIPE_SECRET, { apiVersion: "2023-10-16" });

  const sig = event.headers.get("stripe-signature") || "";
  let receivedEvent: Stripe.Event;

  const body = (await readRawBody(event)) || "";

  try {
    receivedEvent = stripe.webhooks.constructEvent(
      body,
      sig,
      config.STRIPE_WEBHOOK_SECRET
    );

    if (receivedEvent.type === "customer.created") {
      console.log(receivedEvent.data.object);
      const { id, name, email, created } = receivedEvent.data
        .object as Stripe.Customer;

      const { data, error } = await client
        .from("profiles")
        .update({
          stripe_id: id,
          name,
          created: getSBTS(created),
        })
        .eq("email", email || "");

      console.log(data);
      console.error(error);
    }

    if (
      receivedEvent.type === "customer.subscription.created" ||
      receivedEvent.type === "customer.subscription.updated" ||
      receivedEvent.type === "customer.subscription.deleted"
    ) {
      console.log(receivedEvent.data.object);

      let {
        customer,
        status,
        plan,
        cancel_at,
        canceled_at,
        current_period_start,
        current_period_end,
      } = receivedEvent.data.object as Stripe.Subscription & { plan: any };

      const { data, error } = await client
        .from("profiles")
        .update({
          status,
          plan,
          cancel_at: getSBTS(cancel_at),
          canceled_at: getSBTS(canceled_at),
          updated_at: new Date().toISOString(),
          current_period_start: getSBTS(current_period_start),
          current_period_end: getSBTS(current_period_end),
        })
        .eq("stripe_id", customer);

      console.log(data);
      console.error(error);
    }
  } catch (err: any) {
    return new Response(err?.message, { status: 400 });
  }

  return new Response();
});
