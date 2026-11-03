# 🎂 Website Hadiah Ulang Tahun Romantis (7 Slides) ✨

Website interaktif dan estetik yang dibuat khusus sebagai kado ulang tahun romantis untuk pasangan.

---

## 🌟 Daftar 7 Slide yang Disediakan

1. **Slide 1 - Pembukaan Spesial (Special Delivery)**
   - Kotak kado 3D interaktif yang berayun lembut dengan pita emas.
   - Efek ledakan confetti saat kado disentuh atau diklik untuk memulai perjalanan.
2. **Slide 2 - Ucapan "Happy Birthday, My Love!"**
   - Mahkota emas beranimasi & tipografi elegan bertuliskan *"Happy Birthday, My Love ✨ Enji ✨"*.
   - Kartu ucapan romantis dengan efek glassmorphism dan badge cinta.
3. **Slide 3 - Kenangan Kita Berdua (Our Memories 📸)**
   - Galeri foto bergaya Polaroid realistis dengan washi tape dan tulisan tangan estetik.
   - Fitur klik foto untuk memperbesar (*Lightbox View*).
4. **Slide 4 - Alasan Aku Mencintaimu (Why I Love You ❤️)**
   - 6 Kartu flip interaktif 3D. Ketika disentuh/diklik kartu akan berputar memunculkan alasan manis.
5. **Slide 5 - Surat Cinta (Love Letter 💌)**
   - Amplop surat interaktif dengan stempel lilin hati (*wax seal*).
   - Saat diklik, kertas surat terbuka menampilkan pesan cinta yang tulus dan menyentuh hati.
6. **Slide 6 - Tiup Lilin Ulang Tahun (Interactive Birthday Cake 🎂🕯️)**
   - Kue ulang tahun dengan lilin menyala yang apinya bergoyang nyata.
   - Tombol atau ketukan untuk meniup lilin: api padam, keluar animasi asap, diiringi ledakan kembang api & confetti meriah, serta doa terbaik yang muncul otomatis.
7. **Slide 7 - Selamanya Bersamamu & Voucher Cinta (Forever & Always 🎁)**
   - Voucher interaktif yang bisa diklaim (*Pelukan Hangat*, *Free Date Dinner*, *Kartu Bebas Ngambek*, *Ice Cream & Sunset Walk*).
   - Tombol kirim pelukan virtual tak terbatas dengan balon hati berterbangan di layar!

---

## 🚀 Cara Membuka Website

1. Cukup klik ganda (double-click) file **`index.html`** di laptop / komputer.
2. Website akan langsung terbuka di browser seperti Google Chrome, Edge, Safari, atau Firefox tanpa perlu install aplikasi tambahan apapun!
3. Jika ingin dikirim ke pasangan melalui HP:
   - Kamu bisa mengunggah folder ini ke layanan gratis seperti **Netlify**, **Vercel**, atau **GitHub Pages** agar menghasilkan link web yang bisa langsung dibuka pacar di HP kapan saja!

---

## 🎨 Panduan Kustomisasi Mudah

Semua kustomisasi dilakukan di file `index.html`:

### 1. Mengganti Foto Berdua (Slide 3)
Buka `index.html`, cari bagian `<!-- SLIDE 3: FOTO KITA BERDUA -->`:
- Letakkan foto-fotomu di folder yang sama (misal namai `foto1.jpg`, `foto2.jpg`, dst).
- Ubah baris `src="..."` pada setiap polaroid:
  ```html
  <img src="foto1.jpg" alt="Memory 1" class="polaroid-img">
  ```
- Kamu juga bisa mengubah tulisan tangan / tanggal di bawah fotonya:
  ```html
  <p class="handwritten">Hari pertama kita jalan bareng ☕</p>
  ```

### 2. Mengganti Nama Panggilan / Pasangan
Buka `index.html`, cari teks:
```html
<h3 class="partner-name">✨ Enji ✨</h3>
```
Ganti `Enji` dengan nama panggilan kesayanganmu.

### 3. Mengganti Lagu Latar (Music Player)
Buka `index.html`, cari bagian:
```html
<audio id="bg-audio" loop preload="auto">
  <source src="lagu-kita.mp3" type="audio/mp3">
</audio>
```
Kamu bisa meletakkan file `.mp3` lagu romantis favorit kalian di folder ini dan mengganti namanya.

### 4. Mengubah Isi Surat Cinta (Slide 5)
Cari bagian `class="letter-paper"` di `index.html` untuk menulis pesan rahasia yang paling tulus dari hatimu.

---

Selamat merayakan ulang tahun pasanganmu! Semoga hubungan kalian semakin langgeng dan bahagia selalu! 💖

