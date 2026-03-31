export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { messages, max_tokens = 1000 } = req.body;
  const prompt = messages?.[0]?.content || "";

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: max_tokens,
          temperature: 0.7,
        },
      }),
    });

    const data = await response.json();
    // Log toàn bộ response để debug
    console.log("STATUS:", response.status);
    console.log("FULL RESPONSE:", JSON.stringify(data));
    
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("EXTRACTED TEXT:", text ? "OK" : "EMPTY");
    
    res.status(200).json({ content: [{ text }] });
  } catch (err) {
    console.error("FETCH ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
}
