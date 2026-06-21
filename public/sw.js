// ─── NHẬN NOTIFICATION TỪ SERVER ────────────────────────────
self.addEventListener('push', function (event) {
  // Nếu không có data thì bỏ qua
  if (!event.data) return;

  // Đọc dữ liệu server gửi lên (dạng JSON)
  const data = event.data.json();

  // Cấu hình notification sẽ hiển thị
  const options = {
    body: data.body,          // nội dung bên dưới tiêu đề
    icon: '/icon-192.png',    // icon app hiện ở góc trái notification
    badge: '/icon-192.png',   // icon nhỏ trên status bar (Android)
    vibrate: [100, 50, 100],  // rung 3 nhịp khi nhận
    data: {
      url: data.url || '/'    // đường dẫn sẽ mở khi tap vào
    }
  };

  // Hiện notification lên màn hình
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});


// ─── KHI USER TAP VÀO NOTIFICATION ─────────────────────────
self.addEventListener('notificationclick', function (event) {
  // Đóng notification
  event.notification.close();

  // Mở app (hoặc focus tab đang mở)
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(function (clientList) {
        // Nếu app đang mở rồi thì focus vào tab đó
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        // Nếu chưa mở thì mở tab mới
        return clients.openWindow(event.notification.data.url || '/');
      })
  );
});
