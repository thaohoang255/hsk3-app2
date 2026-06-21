import { createClient } from '@supabase/supabase-js';

// Kết nối Supabase với quyền admin (service role)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // ← khác với anon key!
);

export default async function handler(req, res) {
  // Chỉ chấp nhận POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { subscription, userId } = req.body;

  // Kiểm tra có đủ data không
  if (!subscription || !userId) {
    return res.status(400).json({ error: 'Thiếu subscription hoặc userId' });
  }

  // Lưu vào Supabase (nếu đã có thì cập nhật, không tạo thêm)
  const { error } = await supabase
    .from('push_subscriptions')
    .upsert(
      { user_id: userId, subscription: subscription },
      { onConflict: 'user_id' }
    );

  if (error) {
    console.error('Lỗi lưu subscription:', error);
    return res.status(500).json({ error: 'Không lưu được' });
  }

  return res.status(200).json({ message: 'Đã lưu subscription!' });
}
