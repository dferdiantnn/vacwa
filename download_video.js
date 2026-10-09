/**
 * VAC - Web HTML5 Video Blob Downloader
 * 
 * Penggunaan:
 * 1. Buka halaman pemutar video.
 * 2. Buka DevTools Console (Cmd + Option + I / F12).
 * 3. Jalankan script ini.
 */

(() => {
  const videoElement = document.querySelector('video');

  if (videoElement && videoElement.src) {
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = videoElement.src;
    downloadAnchor.download = `video_capture_${Date.now()}.mp4`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    console.log("✅ Video berhasil diunduh:", downloadAnchor.download);
  } else {
    console.warn("⚠️ Elemen video belum terdeteksi atau belum diputar.");
  }
})();
