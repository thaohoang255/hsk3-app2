export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages, max_tokens = 1000 } = req.body;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001", 
        max_tokens,
        messages,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("ANTHROPIC API ERROR:", data);
      return res.status(response.status).json(data);
    }

    const rawText = data?.content?.[0]?.text || "";
    res.status(200).json({ content: [{ text: rawText }] });

  } catch (err) {
    console.error("SERVER ERROR:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
