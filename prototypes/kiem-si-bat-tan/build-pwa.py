"""Tạo sw.js: lưu sẵn trang game + toàn bộ sprites/ và âm thanh để mở lần sau gần như tức thì, chơi được khi không có mạng.

Chạy lại mỗi khi sửa prototype.html hoặc sprites/ (phiên bản cache đổi theo nội dung, máy người chơi tự cập nhật).
"""
import hashlib, json, pathlib

HERE = pathlib.Path(__file__).parent
files = ["prototype.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png"]
files += sorted(p.relative_to(HERE).as_posix() for p in (HERE / "sprites").rglob("*") if p.suffix in (".png", ".webp", ".mp3"))
h = hashlib.sha1()
for f in files:
    h.update((HERE / f).read_bytes())
ver = h.hexdigest()[:10]
sw = f"""// Tạo bởi build-pwa.py, đừng sửa tay. Phiên bản {ver}
const CACHE = 'ksbt-{ver}';
const FILES = {json.dumps(files, ensure_ascii=False)};
self.addEventListener('install', e => {{
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
}});
self.addEventListener('activate', e => {{
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('ksbt-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
}});
// trang game: lấy bản mới trên mạng trước, mất mạng thì dùng bản đã lưu; ảnh / âm thanh: dùng bản đã lưu trước
self.addEventListener('fetch', e => {{
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  const isPage = e.request.mode === 'navigate' || u.pathname.endsWith('.html');
  if (isPage) {{
    e.respondWith(fetch(e.request).then(r => {{ const c = r.clone(); caches.open(CACHE).then(ca => ca.put(e.request, c)); return r; }}).catch(() => caches.match(e.request).then(r => r || caches.match('prototype.html'))));
  }} else {{
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }}
}});
"""
(HERE / "sw.js").write_text(sw, encoding="utf-8")
print(f"Đã ghi sw.js ({len(files)} file, phiên bản {ver})")
