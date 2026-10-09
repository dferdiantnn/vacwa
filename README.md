# VAC (Video Auto Capture) 📥

Script JavaScript sederhana dan ringan untuk mengekstrak serta mengunduh video HTML5 berformat **Blob URL** langsung dari web browser tanpa ekstensi atau aplikasi pihak ketiga.

---

## 📌 Deskripsi
Banyak platform web modern memutar video menggunakan stream lokal (*Blob URL* atau *object URL*). Karena bukan link file langsung, video tersebut tidak memiliki tombol klik kanan "Simpan Sebagai...".

Utility ini membaca elemen `<video>` aktif di halaman web dan mengunduh datanya langsung ke folder Downloads sebagai file `.mp4`.

---

## 🚀 Cara Penggunaan

### **Metode 1: Unduh Video Aktif (1-Click)**

1. Buka halaman web tempat video sedang diputar.
2. Buka **Inspect Element / DevTools**:
   - **Mac:** Tekan `Cmd + Option + I`
   - **Windows:** Tekan `Ctrl + Shift + I` atau `F12`
3. Masuk ke tab **Console**.
4. Salin dan tempel kode berikut, lalu tekan **Enter**:

```javascript
(() => {
  const v = document.querySelector('video');
  if (v && v.src) {
    const a = document.createElement('a');
    a.href = v.src;
    a.download = `video_capture_${Date.now()}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    console.log("✅ Video berhasil diunduh!");
  } else {
    console.warn("⚠️ Elemen video belum terdeteksi. Pastikan video sudah diputar!");
  }
})();
```

---

### **Metode 2: Auto-Collector (Multi-Video)**

Gunakan metode ini jika terdapat beberapa playlist atau tayangan video berurutan yang ingin dikumpulkan:

1. Buka tab **Console**, tempel kode berikut sekali saja, lalu tekan **Enter**:

```javascript
window.mediaCollector = window.mediaCollector || [];
const _origCreateObjectURL = URL.createObjectURL;
URL.createObjectURL = function(blob) {
  const url = _origCreateObjectURL.call(URL, blob);
  if (blob.type && blob.type.includes('video')) {
    console.log("🎥 Video baru terdeteksi:", url);
    window.mediaCollector.push(url);
  }
  return url;
};
console.log("🚀 Collector aktif! Silakan putar video yang ingin dikumpulkan.");
```

2. Putar video-video yang ingin diambil.
3. Setelah selesai, unduh semua video yang terkumpul dengan perintah:

```javascript
window.mediaCollector.forEach((url, index) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = `video_capture_${index + 1}.mp4`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
console.log(`🎉 Berhasil mengunduh ${window.mediaCollector.length} video!`);
```

---

### **Metode 3: Bookmarklet (Tombol 1-Klik di Browser)**

1. Buat bookmark baru di browser (`Cmd + Shift + B`).
2. Beri nama: `📥 Download Web Video`
3. Di kolom **URL**, masukkan kode berikut:

```javascript
javascript:(function(){const v=document.querySelector('video');if(v&&v.src){const a=document.createElement('a');a.href=v.src;a.download='video_capture_'+Date.now()+'.mp4';document.body.appendChild(a);a.click();document.body.removeChild(a);}else{alert('Video belum diputar!');}})();
```

4. Setiap kali memutar video web yang terkunci, cukup klik bookmark tersebut sekali.

---

## 🔒 Keamanan & Privasi
- Berjalan 100% di sisi klien (*client-side*).
- Tidak mengirim data apa pun ke server luar.
- Bebas dari pelacak (*trackers*) atau dependensi eksternal.
