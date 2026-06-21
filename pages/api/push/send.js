import webpush from 'web-push';
import { createClient } from '@supabase/supabase-js';

// Cấu hình VAPID keys cho web-push
webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Kết nối Supabase quyền admin
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ─── DANH SÁCH TỪ ────────────────────────────────────────────
import { WORDS } from '../../data/wordsnoti';
// ─── HANDLER ─────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Bảo mật: chỉ cron job biết secret này mới được gọi
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Chọn ngẫu nhiên một từ
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];

  // Format đúng theo layout đã chốt
  const payload = JSON.stringify({
    title: word.hanzi,
    body: `${word.pinyin} · ${word.meaning}\n💬 ${word.example}\n${word.example_pinyin}\n${word.example_meaning}`,
    url: '/'
  });

  // Lấy tất cả subscriptions
  const { data: subscriptions, error } = await supabase
    .from('push_subscriptions')
    .select('id, subscription');

  if (error) {
    return res.status(500).json({ error: 'Không lấy được subscriptions' });
  }

  if (subscriptions.length === 0) {
    return res.status(200).json({ message: 'Chưa có ai đăng ký' });
  }

  // Gửi cho từng thiết bị
  const results = await Promise.allSettled(
    subscriptions.map(async (row) => {
      try {
        await webpush.sendNotification(row.subscription, payload);
      } catch (err) {
        // Nếu thiết bị không còn hợp lệ (status 410) thì xoá khỏi DB
        if (err.statusCode === 410) {
          await supabase
            .from('push_subscriptions')
            .delete()
            .eq('id', row.id);
        }
        throw err;
      }
    })
  );

  const sent = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;

  return res.status(200).json({ sent, failed, total: subscriptions.length });
}
