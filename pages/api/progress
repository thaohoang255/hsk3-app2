import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // dùng service key ở server
);

export default async function handler(req, res) {
  const { method, body, headers } = req;
  const token = headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  // Verify user từ token
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) return res.status(401).json({ error: "Invalid token" });

  if (method === "GET") {
    const { data, error } = await supabase
      .from("progress")
      .select("data")
      .eq("user_id", user.id)
      .single();
    if (error && error.code !== "PGRST116") return res.status(500).json({ error: error.message });
    return res.status(200).json({ data: data?.data || {} });
  }

  if (method === "POST") {
    const { data, error } = await supabase
      .from("progress")
      .upsert({ user_id: user.id, data: body.data, updated_at: new Date() }, { onConflict: "user_id" });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true });
  }

  res.status(405).end();
}
