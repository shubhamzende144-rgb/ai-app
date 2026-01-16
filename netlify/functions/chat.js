import OpenAI from "openai";

export async function handler(event) {
  const { message } = JSON.parse(event.body || "{}");

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: message }]
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      reply: res.choices[0].message.content
    })
  };
}
