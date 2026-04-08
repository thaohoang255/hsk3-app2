export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { messages, max_tokens = 500 } = req.body;
  const prompt = messages?.[0]?.content || "";
  const strictPrompt = prompt + "\n\nChỉ trả về JSON thuần, không markdown, không text thừa.";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: strictPrompt }] }],
          generationConfig: {
            maxOutputTokens: max_tokens,
            temperature: 0.7,
          },
        }),
      }
    );
    const data = await response.json();
    console.log("STATUS:", response.status);
    console.log("RESPONSE:", JSON.stringify(data).slice(0, 300));
    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) text = jsonMatch[0];
    res.status(200).json({ content: [{ text }] });
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
}
