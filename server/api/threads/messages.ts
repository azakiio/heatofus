import OpenAI from "openai";

export default eventHandler<{ query: { thread_id: string } }>(async (event) => {
  const openai = new OpenAI();
  const { thread_id } = getQuery(event);
  const messages = await openai.beta.threads.messages.list(thread_id, {
    order: "asc",
  });

  const finalMessages = messages.data.map((message) => {
    let content = "";
    message.content.forEach(
      (contentItem) => (content += contentItem?.text?.value || "")
    );

    return { role: message.role, content: content };
  });

  return finalMessages;
});
