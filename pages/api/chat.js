export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { messages, max_tokens = 1000 } = req.body;
  const prompt = messages?.[0]?.content || "";

  // Thêm instruction bắt buộc trả về JSON thuần
  const strictPrompt = prompt + "\n\nQUAN TRỌNG: Chỉ trả về JSON thuần túy, không có text trước hoặc sau, không có markdown, không có ```json```.";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: strictPrompt }] }],
          generationConfig: { maxOutputTokens: max_tokens, temperature: 0.7 },
        }),
      }
    );

    const data = await response.json();
    console.log("STATUS:", response.status);
    console.log("FULL RESPONSE:", JSON.stringify(data));

    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // Extract JSON nếu bị bọc trong markdown hoặc có text thừa
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) text = jsonMatch[0];
    
    console.log("EXTRACTED TEXT:", text ? "OK" : "EMPTY");
    res.status(200).json({ content: [{ text }] });
  } catch (err) {
    console.error("FETCH ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
}
