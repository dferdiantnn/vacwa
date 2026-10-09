/**
 * VAC - Multi-Video Stream Collector
 * 
 * Penggunaan:
 * 1. Buka DevTools Console pada halaman web.
 * 2. Jalankan Bagian 1 untuk mengaktifkan listener.
 * 3. Putar video-video yang ingin dikoleksi.
 * 4. Panggil downloadAllVideos() untuk mengunduh semua.
 */

// ==========================================
// BAGIAN 1: AKTIFKAN LISTENER
// ==========================================
window.mediaCollector = window.mediaCollector || [];

const _origCreateObjectURL = URL.createObjectURL;
URL.createObjectURL = function(blob) {
  const url = _origCreateObjectURL.call(URL, blob);
  if (blob.type && blob.type.includes('video')) {
    console.log("🎥 [VAC] Video terdeteksi:", url);
    window.mediaCollector.push(url);
  }
  return url;
};

console.log("🚀 [VAC] Collector aktif!");

// ==========================================
// BAGIAN 2: UNDUH SEMUA
// ==========================================
function downloadAllVideos() {
  if (!window.mediaCollector || window.mediaCollector.length === 0) {
    console.warn("⚠️ Belum ada video yang terdeteksi.");
    return;
  }

  window.mediaCollector.forEach((blobUrl, index) => {
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `video_capture_${index + 1}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  console.log(`🎉 [VAC] Berhasil mengunduh ${window.mediaCollector.length} video!`);
}
